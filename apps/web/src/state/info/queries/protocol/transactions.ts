import { gql } from 'graphql-request'
import { mapBurns, mapMints, mapSwaps, mapSwapsUNI, mapSwapsXOX } from 'state/info/queries/helpers'
import { BurnResponse, MintResponse, SwapResponse, SwapResponseUNI } from 'state/info/queries/types'
import { Transaction, TransactionFrom } from 'state/info/types'
import axios from 'axios'
import {
  getMultiChainQueryEndPointWithChainId,
  getMultiChainQueryEndPointWithStableSwap,
  MultiChainName,
} from '../../constant'

/**
 * Transactions for Transaction table on the Home page
 */
const GLOBAL_TRANSACTIONS = gql`
  query overviewTransactions {
    mints: mints(first: 100, orderBy: timestamp, orderDirection: desc) {
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
      to
      amount0
      amount1
      amountUSD
    }
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
    burns: burns(first: 100, orderBy: timestamp, orderDirection: desc) {
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
      sender
      amount0
      amount1
      amountUSD
    }
  }
`

const QUERYPANCAKE = `
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

const QUERYUNI = `
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
      to
      amount0In
      amount1In
      amount0Out
      amount1Out
      amountUSD
    }
  }
`

interface TransactionResults {
  mints: MintResponse[]
  swaps: SwapResponse[]
  burns: BurnResponse[]
}
interface TransactionResultsUNI {
  swaps: SwapResponseUNI[]
}
interface TransactionResultsPANCAKE {
  swaps: SwapResponse[]
}

const fetchTopTransactions = async (
  chainId: number,
): Promise<{ transactionsXOX: Transaction[] | undefined; transactionsOther: Transaction[] | undefined }> => {
  const result = { transactionsXOX: [], transactionsOther: [] }
  try {
    const dataXOX = await getMultiChainQueryEndPointWithChainId(
      chainId,
      TransactionFrom.XOX,
    ).request<TransactionResults>(GLOBAL_TRANSACTIONS)
    let transactionsXOX: any
    if (dataXOX) {
      const mintsXOX = dataXOX.mints.map(mapMints)
      const burnsXOX = dataXOX.burns.map(mapBurns)
      const swapsXOX = dataXOX.swaps.map(mapSwapsXOX)

      transactionsXOX = [...mintsXOX, ...burnsXOX, ...swapsXOX].sort((a, b) => {
        return parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)
      })
    }
    result.transactionsXOX = transactionsXOX
  } catch (e) {
    result.transactionsXOX = []
  }

  try {
    let transactionsOther
    if (chainId === 1 || chainId === 5) {
      const dataUNI = await getMultiChainQueryEndPointWithChainId(
        chainId,
        TransactionFrom.UNI,
      ).request<TransactionResultsUNI>(QUERYUNI)

      if (dataUNI) {
        const swapsUNI = dataUNI.swaps.map(mapSwapsUNI)

        transactionsOther = [...swapsUNI].sort((a, b) => {
          return parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)
        })
      }
    } else {
      const dataPANCAKE = await getMultiChainQueryEndPointWithChainId(
        chainId,
        TransactionFrom.PANCAKE,
      ).request<TransactionResultsPANCAKE>(QUERYPANCAKE)
      // const dataPANCAKE = await getMultiChainQueryEndPointWithStableSwap(
      //   chainId,
      //   TransactionFrom.PANCAKE,
      // ).request<TransactionResults>(GLOBAL_TRANSACTIONS)
      if (dataPANCAKE) {
        const swapsPANCAKE = dataPANCAKE.swaps.map(mapSwaps)
        transactionsOther = [...swapsPANCAKE].sort((a, b) => {
          return parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)
        })
      }
    }
    result.transactionsOther = transactionsOther
  } catch (e) {
    result.transactionsOther = []
  }

  return result
}

export default fetchTopTransactions
