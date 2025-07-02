import {
  BLOCKS_CLIENT,
  BLOCKS_CLIENT_ETH,
  ENDPOINT_GRAPHQL_WITH_CHAIN,
} from 'config/constants/endpoints'
import {
  infoClient,
  infoClientBSCPANCAKE,
  infoClientETH,
  infoClientETHUNI,
  infoClientXoxEth,
  infoClientXoxGoerli,
  infoNRClient,
  infoNRClientXoxBsc,
  infoNRClientXoxBscTestnet,
  infoStableSwapClient,
  stableCoinClientWithChain,
} from 'utils/graphql'

import { ChainId } from '@pancakeswap/sdk'
import {
  ETH_TOKEN_BLACKLIST,
  PCS_ETH_START,
  PCS_V2_START,
  TOKEN_BLACKLIST,
  INFO_BUCKETS_COOKIES,
} from 'config/constants/info'
import Cookies from 'js-cookie'
import { TransactionFrom } from './types'

export type MultiChainName = 'BSC' | 'ETH'

export const multiChainQueryMainToken = {
  BSC: 'BNB',
  ETH: 'ETH',
}

export const multiChainBlocksClient = {
  BSC: BLOCKS_CLIENT,
  ETH: BLOCKS_CLIENT_ETH,
}

export const multiChainStartTime = {
  BSC: PCS_V2_START,
  ETH: PCS_ETH_START,
}

export const multiChainId = {
  BSC: ChainId.BSC,
  ETH: ChainId.ETHEREUM,
}

export const multiChainPaths = {
  [ChainId.BSC]: '',
  [ChainId.ETHEREUM]: '/eth',
}

export const multiChainQueryClient = {
  BSC: infoClient,
  ETH: infoClientETH,
}

export const multiChainQueryClientWithFrom = {
  [TransactionFrom.XOX]: {
    [ChainId.BSC]: infoNRClientXoxBsc,
    [ChainId.BSC_TESTNET]: infoNRClientXoxBscTestnet,
    [ChainId.ETHEREUM]: infoClientXoxEth,
    [ChainId.GOERLI]: infoClientXoxGoerli,
  },
  [TransactionFrom.UNI]: {
    [ChainId.ETHEREUM]: infoClientETHUNI,
    [ChainId.GOERLI]: infoClientETHUNI,
  },
  [TransactionFrom.PANCAKE]: {
    [ChainId.BSC]: infoClientBSCPANCAKE,
    [ChainId.BSC_TESTNET]: infoClientBSCPANCAKE,
  },
}

export const multiChainQueryClientWithNR = {
  BSC: infoNRClient,
  ETH: infoClientETH,
}

export const multiChainQueryClientStableCoin = (chainId: number) => {
  return stableCoinClientWithChain(chainId)
}

export const multiChainQueryEndPoint = {
  BSC: ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC],
  ETH: ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.ETHEREUM],
}

export const multiChainQueryEndPointWithNR = {
  BSC: ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC],
  ETH: ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.ETHEREUM],
}

export const multiChainScan = {
  BSC: 'BscScan',
  ETH: 'EtherScan',
}

export const multiChainTokenBlackList = {
  BSC: TOKEN_BLACKLIST,
  ETH: ETH_TOKEN_BLACKLIST,
}

export const getMultiChainQueryEndPointWithStableSwap = (chainName: MultiChainName) => {
  const isStableSwap = checkIsStableSwap()
  const bucketInfo = Cookies.get(INFO_BUCKETS_COOKIES) // sf or nr
  if (isStableSwap) return infoStableSwapClient
  return bucketInfo === 'sf' ? multiChainQueryClient[chainName] : multiChainQueryClientWithNR[chainName]
}

export const getMultiChainQueryEndPointWithChainId = (chainId: number, transactionFrom: TransactionFrom) => {
  return multiChainQueryClientWithFrom[transactionFrom][chainId]
}

export const checkIsStableSwap = () => window.location.href.includes('stableSwap')
