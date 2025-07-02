import { ChainId } from '@pancakeswap/sdk'
import {
  BIT_QUERY,
  STABLESWAP_SUBGRAPH_CLIENT,
  INFO_CLIENT_UNI,
  ENDPOINT_GRAPHQL_WITH_CHAIN,
  INFO_CLIENT_PANCAKE,
} from 'config/constants/endpoints'
import { GraphQLClient } from 'graphql-request'
import { INFO_CLIENT_WITH_CHAIN } from '../config/constants/endpoints'

// Extra headers
// Mostly for dev environment
// No production env check since production preview might also need them
export const getGQLHeaders = (endpoint: string) => {
  if (endpoint === ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC]) {
    return {
      'X-Sf':
        process.env.NEXT_PUBLIC_SF_HEADER ||
        // hack for inject CI secret on window
        (typeof window !== 'undefined' &&
          // @ts-ignore
          window.sfHeader),
    }
  }
  return undefined
}

export const infoClient = new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC], {
  headers: getGQLHeaders(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC]),
})
export const infoClientXoxBsc = new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC], {
  headers: getGQLHeaders(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC]),
})
export const infoClientXoxBscTestnet = new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC_TESTNET], {
  headers: getGQLHeaders(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC_TESTNET]),
})

export const infoNRClient = new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC])
export const infoNRClientXoxBsc = new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC])
export const infoNRClientXoxBscTestnet = new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC_TESTNET])
export const infoClientBSCPANCAKE = new GraphQLClient(INFO_CLIENT_PANCAKE)

export const infoClientWithChain = (chainId: number) => {
  return new GraphQLClient(INFO_CLIENT_WITH_CHAIN[chainId], { headers: getGQLHeaders(INFO_CLIENT_WITH_CHAIN[chainId]) })
}

export const infoClientETH = new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.ETHEREUM])
export const infoClientXoxEth = new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.ETHEREUM])
export const infoClientXoxGoerli = new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.GOERLI])
export const infoClientETHUNI = new GraphQLClient(INFO_CLIENT_UNI)

export const stableCoinClientWithChain = (chainId: number) => {
  return new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[chainId])
}

export const infoStableSwapClient = new GraphQLClient(STABLESWAP_SUBGRAPH_CLIENT)

export const infoServerClient = new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[ChainId.BSC], {
  headers: {
    'X-Sf': process.env.SF_HEADER,
  },
  timeout: 5000,
})

export const stableSwapClient = new GraphQLClient(STABLESWAP_SUBGRAPH_CLIENT, {
  headers: getGQLHeaders(STABLESWAP_SUBGRAPH_CLIENT),
})

export const bitQueryServerClient = new GraphQLClient(BIT_QUERY, {
  headers: {
    // only server, no `NEXT_PUBLIC` not going to expose in client
    'X-API-KEY': process.env.BIT_QUERY_HEADER,
  },
  timeout: 5000,
})
