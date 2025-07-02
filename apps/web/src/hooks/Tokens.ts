/* eslint-disable no-param-reassign */
import { arrayify } from '@ethersproject/bytes'
import { parseBytes32String } from '@ethersproject/strings'
import { Currency, ERC20Token, ChainId } from '@pancakeswap/sdk'
import { TokenAddressMap } from '@pancakeswap/token-lists'
import { GELATO_NATIVE } from 'config/constants'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { SUGGESTED_BASES } from 'config/constants/exchange'
import {
  combinedTokenMapFromActiveUrlsAtom,
  combinedTokenMapFromOfficialsUrlsAtom,
  useKyberTokenMapsWithDefault,
  useUnsupportedTokenList,
  useWarningTokenList,
} from '../state/lists/hooks'
import { NEVER_RELOAD, useDecimals, useSingleCallResult, useSymbol } from '../state/multicall/hooks'
import useUserAddedTokens from '../state/user/hooks/useUserAddedTokens'
import { isAddress } from '../utils'
import { useBytes32TokenContract, useTokenContract } from './useContract'
import useNativeCurrency from './useNativeCurrency'
import { useActiveChainId } from './useActiveChainId'
import { useRouter } from 'next/router'

const mapWithoutUrls = (tokenMap: TokenAddressMap<ChainId>, chainId: number) =>
  Object.keys(tokenMap[chainId] || {}).reduce<{ [address: string]: ERC20Token }>((newMap, address) => {
    newMap[address] = tokenMap[chainId][address].token
    return newMap
  }, {})

/**
 * Returns all tokens that are from active urls and user added tokens
 */
export function useAllTokens(kyber?: boolean): { [address: string]: ERC20Token } {
  const { chainId } = useActiveChainId()
  const { kyberDefaultTokens } = useKyberTokenMapsWithDefault(chainId)
  const tokenMap = useAtomValue(combinedTokenMapFromActiveUrlsAtom)
  const userAddedTokens = useUserAddedTokens()
  return useMemo(() => {
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: ERC20Token }>(
          (tokenMap_, token) => {
            tokenMap_[token.address] = token
            return tokenMap_
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          mapWithoutUrls(kyber ? kyberDefaultTokens ?? {} : tokenMap, chainId),
        )
    )
  }, [userAddedTokens, tokenMap, chainId, kyberDefaultTokens, kyber])
}

export function useAllCurrentTokens(): { [address: string]: ERC20Token } {
  const { chainId } = useActiveChainId()
  const tokenMap = useAtomValue(combinedTokenMapFromActiveUrlsAtom)
  const userAddedTokens = useUserAddedTokens()
  return useMemo(() => {
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: ERC20Token }>(
          (tokenMap_, token) => {
            tokenMap_[token.address] = token
            return tokenMap_
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          SUGGESTED_BASES[chainId],
        )
    )
  }, [userAddedTokens, tokenMap, chainId])
}

/**
 * Returns all tokens that are from officials token list and user added tokens
 */
export function useOfficialsAndUserAddedTokens(): { [address: string]: ERC20Token } {
  const { chainId } = useActiveChainId()
  const tokenMap = useAtomValue(combinedTokenMapFromOfficialsUrlsAtom)
  const userAddedTokens = useUserAddedTokens()
  return useMemo(() => {
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: ERC20Token }>(
          (tokenMap_, token) => {
            tokenMap_[token.address] = token
            return tokenMap_
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          mapWithoutUrls(tokenMap, chainId),
        )
    )
  }, [userAddedTokens, tokenMap, chainId])
}

export function useUnsupportedTokens(): { [address: string]: ERC20Token } {
  const { chainId } = useActiveChainId()
  const unsupportedTokensMap = useUnsupportedTokenList()
  return useMemo(() => mapWithoutUrls(unsupportedTokensMap, chainId), [unsupportedTokensMap, chainId])
}

export function useWarningTokens(): { [address: string]: ERC20Token } {
  const warningTokensMap = useWarningTokenList()
  const { chainId } = useActiveChainId()
  return useMemo(() => mapWithoutUrls(warningTokensMap, chainId), [warningTokensMap, chainId])
}

export function useIsTokenActive(token: ERC20Token | undefined | null): boolean {
  const activeTokens = useAllTokens()

  if (!activeTokens || !token) {
    return false
  }

  return !!activeTokens[token.address]
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(currency: Currency | undefined | null): boolean {
  const userAddedTokens = useUserAddedTokens()

  if (!currency) {
    return false
  }

  return !!userAddedTokens.find((token) => currency?.equals(token))
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): ERC20Token | undefined | null {
  const { chainId } = useActiveChainId()
  const { query } = useRouter()
  const tokens = useAllTokens(query?.tab === 'kyberswap')

  const address = isAddress(tokenAddress)

  const tokenContract = useTokenContract(address || undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address || undefined, false)
  const token: ERC20Token | undefined = address
    ? Object.values(tokens).filter((t) => t?.address?.toLowerCase() === address.toLowerCase())?.[0]
    : undefined

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD,
  )
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)
  const { symbol: preventiveSymbol } = useSymbol(tokenContract)
  const { decimals: preventiveDecimals } = useDecimals(tokenContract)

  return useMemo(() => {
    if (token) return token
    if (!chainId || !address) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result || (preventiveDecimals && preventiveSymbol)) {
      return new ERC20Token(
        chainId,
        address,
        decimals.result?.[0] || preventiveDecimals,
        parseStringOrBytes32(
          symbol.result?.[0] || preventiveSymbol,
          symbolBytes32.result?.[0] || preventiveSymbol,
          'UNKNOWN',
        ),
        parseStringOrBytes32(
          tokenName.result?.[0] || preventiveSymbol,
          tokenNameBytes32.result?.[0] || preventiveSymbol,
          'Unknown Token',
        ),
      )
    }
    return undefined
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
    preventiveDecimals,
    preventiveSymbol,
  ])
}

export function useCurrency(currencyId: string | undefined): Currency | ERC20Token | null | undefined {
  const native = useNativeCurrency()
  const isNative =
    currencyId?.toUpperCase() === native.symbol?.toUpperCase() || currencyId?.toLowerCase() === GELATO_NATIVE
  const token = useToken(isNative ? undefined : currencyId)
  return isNative ? native : token
}
