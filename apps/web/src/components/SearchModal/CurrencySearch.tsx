/* eslint-disable no-restricted-syntax */
import { Currency, Token } from '@pancakeswap/sdk'
import { Box, Input, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { KeyboardEvent, RefObject, useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useDebounce } from '@pancakeswap/hooks'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { FixedSizeList } from 'react-window'
import { useAllLists, useInactiveListUrls } from 'state/lists/hooks'
import { WrappedTokenInfo } from '@pancakeswap/token-lists'
import { useAudioModeManager } from 'state/user/hooks'
import styled from 'styled-components'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { isAddress } from 'utils'
import { useAllTokens, useCurrency, useIsUserAddedToken, useToken } from '../../hooks/Tokens'
import Column, { AutoColumn } from '../Layout/Column'
import Row from '../Layout/Row'
import CurrencyList from './CurrencyList'
import { createFilterToken, useSortedTokensByQuery } from './filtering'
// import useTokenComparator from './sorting'
import { getSwapSound } from './swapSound'
import ImportRow from './ImportRow'
import { USD_ADDRESS } from 'config/constants/exchange'
import { useRouter } from 'next/router'

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 54px;

  & input {
    width: 100%;
    height: 54px;
    background: #1d1c1c;
    border-radius: 8px;
    padding-left: 52px;
    outline: none;
    box-shadow: none !important;
    color: rgba(255, 255, 255, 0.87);
  }

  & input::placeholder {
    color: rgba(255, 255, 255, 0.38);
    font-size: 16px;
  }

  & svg {
    position: absolute;
    transform: translateY(-50%);
    left: 16px;
    top: 50%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    & input::placeholder {
      font-size: 18px;
    }
  }
`

interface CurrencySearchProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  commonBasesType?: string
  showImportView: () => void
  setImportToken: (token: Token) => void
  height?: number
  forLiquidity?: boolean
}

function useSearchInactiveTokenLists(search: string | undefined, minResults = 10): WrappedTokenInfo[] {
  const lists = useAllLists()
  const inactiveUrls = useInactiveListUrls()
  const { chainId } = useActiveChainId()
  const activeTokens = useAllTokens()

  return useMemo(() => {
    if (!search || search.trim().length === 0) return []
    const filterToken = createFilterToken(search)
    const exactMatches: WrappedTokenInfo[] = []
    const rest: WrappedTokenInfo[] = []
    const addressSet: { [address: string]: true } = {}
    const trimmedSearchQuery = search.toLowerCase().trim()
    for (const url of inactiveUrls) {
      const list = lists[url].current
      // eslint-disable-next-line no-continue
      if (!list) continue
      for (const tokenInfo of list.tokens) {
        if (
          tokenInfo.chainId === chainId &&
          !(tokenInfo.address in activeTokens) &&
          !addressSet[tokenInfo.address] &&
          filterToken(tokenInfo)
        ) {
          const wrapped: WrappedTokenInfo = new WrappedTokenInfo(tokenInfo)
          addressSet[wrapped.address] = true
          if (
            tokenInfo.name?.toLowerCase() === trimmedSearchQuery ||
            tokenInfo.symbol?.toLowerCase() === trimmedSearchQuery
          ) {
            exactMatches.push(wrapped)
          } else {
            rest.push(wrapped)
          }
        }
      }
    }
    return [...exactMatches, ...rest].slice(0, minResults)
  }, [activeTokens, chainId, inactiveUrls, lists, minResults, search])
}

function CurrencySearch({
  selectedCurrency,
  onCurrencySelect,
  otherSelectedCurrency,
  showCommonBases,
  commonBasesType,
  showImportView,
  setImportToken,
  height,
  forLiquidity,
}: CurrencySearchProps) {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  const { query } = useRouter()

  // refs for fixed size lists
  const fixedList = useRef<FixedSizeList>()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 200)

  // const [invertSearchOrder] = useState<boolean>(false)

  const allTokens = useAllTokens(query?.tab === 'kyberswap')

  // if they input an address, use it
  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)

  const { isMobile } = useMatchBreakpoints()
  const [audioPlay] = useAudioModeManager()

  const native = useNativeCurrency()

  const showNative: boolean = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()
    return native && native.symbol?.toLowerCase?.()?.indexOf(s) !== -1
  }, [debouncedQuery, native])

  const filteredTokens: Token[] = useMemo(() => {
    const filterToken = createFilterToken(debouncedQuery)
    return [...Object.values(allTokens).slice(0, 1), native as any, ...Object.values(allTokens).slice(1)]
      .filter((t) => !!t)
      .filter(filterToken)
  }, [allTokens, debouncedQuery])

  const filteredQueryTokens = useSortedTokensByQuery(filteredTokens, debouncedQuery)

  // const tokenComparator = useTokenComparator(invertSearchOrder)

  const filteredSortedTokens: Token[] = useMemo(() => {
    return [...filteredQueryTokens] //.sort(tokenComparator)
  }, [filteredQueryTokens])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
      if (audioPlay) {
        getSwapSound().play()
      }
    },
    [audioPlay, onCurrencySelect],
  )
  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (!isMobile && !forLiquidity) inputRef.current.focus()
  }, [isMobile])

  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    fixedList.current?.scrollTo(0)
  }, [])

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = debouncedQuery.toLowerCase().trim()
        if (s === native.symbol.toLowerCase().trim()) {
          handleCurrencySelect(native)
        } else if (filteredSortedTokens.length > 0) {
          if (
            filteredSortedTokens[0].symbol?.toLowerCase() === debouncedQuery.trim().toLowerCase() ||
            filteredSortedTokens.length === 1
          ) {
            handleCurrencySelect(filteredSortedTokens[0])
          }
        }
      }
    },
    [debouncedQuery, filteredSortedTokens, handleCurrencySelect, native],
  )

  // if no results on main list, show option to expand into inactive
  const filteredInactiveTokens = useSearchInactiveTokenLists(debouncedQuery)

  // useEffect(() => {
  //   const searchAddress = isAddress(debouncedQuery)
  //   if (chainId !== 1 || !searchAddress) return
  //   const tokenContract = getContract(debouncedQuery, ERC20_ABI)
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API}/coin-market-cap/pro/v2/cryptocurrency/info`, {
  //       params: { address: debouncedQuery },
  //     })
  //     .then(async (response) => {
  //       const tokenInfos = response.data.data
  //       if (Object.keys(tokenInfos).length === 0) return
  //       const tokenInfo = Object.values(tokenInfos)[0] as any
  //       const token = {
  //         name: tokenInfo.name,
  //         symbol: tokenInfo.symbol,
  //         address: debouncedQuery,
  //         chainId: 1,
  //         decimals: await tokenContract.decimals(),
  //         logoURI: `https://s2.coinmarketcap.com/static/img/coins/64x64/${tokenInfo.id}.png`,
  //       }
  //       filteredInactiveTokens.push(new WrappedTokenInfo(token))
  //     })
  //     .catch((error) => console.warn(error))
  // }, [chainId, debouncedQuery])

  const hasFilteredInactiveTokens = Boolean(filteredInactiveTokens?.length)
  const getCurrencyListRows = useCallback(() => {
    if (searchToken && !searchTokenIsAdded && !hasFilteredInactiveTokens) {
      return (
        <Column style={{ padding: '20px 0', height: '100%' }}>
          <ImportRow
            onCurrencySelect={handleCurrencySelect}
            token={searchToken}
            showImportView={showImportView}
            setImportToken={setImportToken}
          />
        </Column>
      )
    }
    return Boolean(filteredSortedTokens?.length > 0) || hasFilteredInactiveTokens ? (
      <Box>
        <CurrencyList
          height={isMobile ? (height ? height + 80 : 350) : 310}
          showNative={false}
          currencies={forLiquidity ? [native, useCurrency(USD_ADDRESS[chainId])] : filteredSortedTokens}
          inactiveCurrencies={filteredInactiveTokens}
          breakIndex={
            Boolean(filteredInactiveTokens?.length) && filteredSortedTokens ? filteredSortedTokens.length : undefined
          }
          onCurrencySelect={handleCurrencySelect}
          otherCurrency={otherSelectedCurrency}
          selectedCurrency={selectedCurrency}
          fixedListRef={fixedList}
          showImportView={showImportView}
          setImportToken={setImportToken}
        />
      </Box>
    ) : (
      <Column style={{ padding: '20px', height: '50px' }} className="no-result">
        <Text color="textSubtle" textAlign="center" mb="20px">
          {t('No results found.')}
        </Text>
      </Column>
    )
  }, [
    filteredInactiveTokens,
    filteredSortedTokens,
    handleCurrencySelect,
    hasFilteredInactiveTokens,
    otherSelectedCurrency,
    searchToken,
    searchTokenIsAdded,
    selectedCurrency,
    setImportToken,
    showNative,
    showImportView,
    t,
    showCommonBases,
    isMobile,
    height,
  ])

  return (
    <>
      <AutoColumn gap="16px">
        {!forLiquidity && (
          <Row>
            <InputWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M10.0833 17.4167C14.1334 17.4167 17.4167 14.1334 17.4167 10.0833C17.4167 6.03325 14.1334 2.75 10.0833 2.75C6.03325 2.75 2.75 6.03325 2.75 10.0833C2.75 14.1334 6.03325 17.4167 10.0833 17.4167Z"
                  stroke="#515151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.25 19.2502L15.2625 15.2627"
                  stroke="#515151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Input
                id="token-search-input"
                placeholder={isMobile ? t('Search name...') : t('Search name or paste address')}
                autoComplete="off"
                value={searchQuery}
                ref={inputRef as RefObject<HTMLInputElement>}
                onChange={handleInput}
                onKeyDown={handleEnter}
              />
            </InputWrapper>
          </Row>
        )}
        {/* {showCommonBases && (
          <CommonBases
            chainId={chainId}
            onSelect={handleCurrencySelect}
            selectedCurrency={selectedCurrency}
            commonBasesType={commonBasesType}
          />
        )} */}
        {getCurrencyListRows()}
      </AutoColumn>
    </>
  )
}

export default CurrencySearch
