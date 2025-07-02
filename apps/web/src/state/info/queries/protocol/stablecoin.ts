import { gql } from 'graphql-request'
import { mapBurns, mapMints, mapSwaps, mapSwapsUNI, mapSwapsXOX } from 'state/info/queries/helpers'
import { BurnResponse, MintResponse, SwapResponse, SwapResponseUNI } from 'state/info/queries/types'
import { Transaction, TransactionFrom } from 'state/info/types'

import axios from 'axios'
import { ChainId } from '@pancakeswap/sdk'
import {
  getMultiChainQueryEndPointWithChainId,
  getMultiChainQueryEndPointWithStableSwap,
  MultiChainName,
  multiChainQueryClientWithNR,
  multiChainQueryClientStableCoin,
} from '../../constant'

const QUERYTRANSACTION = `
  query overviewTransactions {
    swaps: swaps(first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      from
      amount0In
      amount1In
      amount0Out
      amount1Out
      amountUSD
    }
  }
`

const QUERYWITHDRAW = (address?: string) => `
  {
    userWithdrawHistories(first: 100, orderBy: date, orderDirection: desc ${
      !address ? '' : `, where: { address:"${address}" }`
    }) {
      address,
      amount,
      date,
      id,
      tx
    }
  }
`

const QUERYSTACK = (address?: string) => `
  {
    userStakeHistories(first: 100, orderBy: date, orderDirection: desc ${
      !address ? '' : `, where: { address:"${address}" }`
    }) {
      address,
      amount,
      apy,
      date,
      id,
      tx
    }
  }
`
const QUERYTOP = (address: string) => {
  return `
  {
    userInfo(id: "${address?.toLocaleLowerCase()}") {
      id,
      total_withdraw_earning
    }
  }
  `
}

const fetchTopStableCoin = async (address: string, chainId: any): Promise<{ infoUSDT: any; infoUSDC: any }> => {
  const result = { infoUSDT: null, infoUSDC: null }
  let endpoint1 = ChainId.BSC_TESTNET
  let endpoint2 = ChainId.GOERLI
  if (chainId === ChainId.ETHEREUM || chainId === ChainId.BSC) {
    endpoint1 = ChainId.BSC
    endpoint2 = ChainId.ETHEREUM
  }
  await Promise.all([
    multiChainQueryClientStableCoin(endpoint1).request<any>(QUERYTOP(address)),
    multiChainQueryClientStableCoin(endpoint2).request<any>(QUERYTOP(address)),
  ])
    .then(([res1, res2]) => {
      result.infoUSDT = res1
      result.infoUSDC = res2
    })
    .catch((error) => {
      console.log(error)
    })
  return result
}

const getChainName = (id: any) => {
  let name = 'ETH'
  switch (id) {
    case ChainId.BSC:
      name = 'BSC'
      break
    case ChainId.BSC_TESTNET:
      name = 'BSCTestNet'
      break
    case ChainId.GOERLI:
      name = 'Goerli'
      break
    default:
      name = 'ETH'
  }
  return name
}

export const fetchTransactionStableCoin = async (chainId: number) => {
  const result = { transactionsXOX: [] }
  const chainName = getChainName(chainId)
  const dataXOX = await multiChainQueryClientStableCoin(chainId).request<any>(QUERYTRANSACTION)
  if (dataXOX) {
    const swapsXOX = dataXOX.swaps.map(mapSwapsXOX)
    result.transactionsXOX = [...swapsXOX].sort((a, b) => {
      return parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)
    })
  }
  return result
}

export const fetchWithdrawStableCoin = async (chainId: number, address?: string) => {
  const result = { transactionsXOX: [] }
  const chainName = getChainName(chainId)
  const dataXOX = await multiChainQueryClientStableCoin(chainId).request<any>(QUERYWITHDRAW(address))
  if (dataXOX) {
    result.transactionsXOX = dataXOX?.userWithdrawHistories?.map((item) => {
      return {
        ...item,
        hash: item?.tx,
      }
    })
  }
  return result
}

export const fetchStakeStableCoin = async (chainId: number, address?: string) => {
  const result = { transactionsXOX: [] }
  const chainName = getChainName(chainId)
  const dataXOX = await multiChainQueryClientStableCoin(chainId).request<any>(QUERYSTACK(address))
  if (dataXOX) {
    result.transactionsXOX = dataXOX?.userStakeHistories?.map((item) => {
      return {
        ...item,
        hash: item?.tx,
      }
    })
  }
  return result
}

export default fetchTopStableCoin
