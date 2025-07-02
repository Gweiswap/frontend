import { ChainId, NEO_EVM_TESTNET } from '@pancakeswap/sdk'
import { atom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useDeferredValue, useEffect } from 'react'
import { isBridgeChainSupported, isChainSupported } from 'utils/wagmi'
import { useNetwork } from 'wagmi'
import { useSessionChainId } from './useSessionChainId'
import { MAINNET_CHAINS, TESTNET_CHAINS } from 'views/BridgeToken/networks'

const queryChainIdAtom = atom(-1) // -1 unload, 0 no chainId on query
const WEB_LINK = ['/', '/company', '/tokenomics', '/white-paper', '/dex-v2']

queryChainIdAtom.onMount = (set) => {
  const params = new URL(window.location.href).searchParams
  const c = params.get('chainId')
  if (isChainSupported(+c)) {
    set(+c)
  } else {
    set(0)
  }
}

export function useLocalNetworkChain() {
  const [sessionChainId] = useSessionChainId()
  // useRouter is kind of slow, we only get this query chainId once
  const queryChainId = useAtomValue(queryChainIdAtom)

  const { query, pathname } = useRouter()

  const chainId = +(sessionChainId || query.chainId || queryChainId)

  if (
    (pathname !== '/bridge-token' &&
      !(pathname === 'swap' && query.tab === 'kyberswap') &&
      isChainSupported(chainId)) ||
    ((pathname === '/bridge-token' || (pathname === '/swap' && query.tab === 'kyberswap')) &&
      isBridgeChainSupported(chainId))
  ) {
    return chainId
  }

  return undefined
}

export const useActiveChainId = () => {
  const router = useRouter()

  const activeChains =
    process.env.NEXT_PUBLIC_TEST_MODE === '1'
      ? router.pathname === '/bridge-token' || (router.pathname === '/swap' && router.query.tab === 'kyberswap')
        ? [...MAINNET_CHAINS, ...TESTNET_CHAINS]
        : [...MAINNET_CHAINS.slice(0, 2), ...TESTNET_CHAINS.slice(0, 2),
        ...[NEO_EVM_TESTNET]]
      : router.pathname === 'bridge-token' || (router.pathname === '/swap' && router.query.tab === 'kyberswap')
        ? [...MAINNET_CHAINS]
        : [...MAINNET_CHAINS.slice(0, 2)]

  const localChainId = useLocalNetworkChain()
  const queryChainId = useAtomValue(queryChainIdAtom)

  const { chain } = useNetwork()
  // const chainId = localChainId ?? chain?.id ?? (queryChainId >= 0 ? ChainId.BSC : undefined)
  const chainId = chain?.id ?? ChainId.ETHEREUM

  const isNotMatched = useDeferredValue(chain && localChainId && chain.id !== localChainId)

  return {
    chainId,
    isWrongNetwork:
      // (chain?.unsupported ?? false) ||
      // isNotMatched ||
      !activeChains.includes(chainId) && !WEB_LINK.includes(router.pathname),
    isNotMatched,
  }
}
