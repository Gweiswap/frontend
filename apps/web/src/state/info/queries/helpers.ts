import { ChainId } from '@pancakeswap/sdk'
import fromPairs from 'lodash/fromPairs'
import chunk from 'lodash/chunk'
import uniq from 'lodash/uniq'
import mapValues from 'lodash/mapValues'
import { ONE_DAY_UNIX } from 'config/constants/info'
import IPancakePairABI from 'config/abi/IPancakePair.json'
import bep20Abi from 'config/abi/erc20.json'
import { multicallv2 } from 'utils/multicall'
import { getUnixTime } from 'date-fns'
import { Transaction, TransactionType } from 'state/info/types'
import { ChartEntry } from '../types'
import { MultiChainName, multiChainStartTime } from '../constant'
import {
  MintResponse,
  SwapResponse,
  BurnResponse,
  TokenDayData,
  PairDayData,
  PancakeDayData,
  SwapResponseUNI,
  PairData,
} from './types'
import { formatAmountNumber } from '@pancakeswap/utils/formatBalance'

const calculatorAmountUSDMint = (mint: MintResponse) => {
  const token0Symbol = mint.pair.token0.symbol
  const amountToken0 = parseFloat(mint.amount0)
  const amountToken1 = parseFloat(mint.amount0)
  const abs0 = Math.abs(amountToken0)
  const abs1 = Math.abs(amountToken1)
  const symbolToken0 = token0Symbol === 'USDC' ? 'XOX' : token0Symbol

  const inputTokenSymbol = symbolToken0
  const amountUSD = inputTokenSymbol === 'USDC' || inputTokenSymbol === 'USDT' ? abs0 : abs1
  return amountUSD * 2
}

const calculatorAmountUSDBurn = (burn: BurnResponse) => {
  const token0Symbol = burn.pair.token0.symbol
  const amountToken0 = parseFloat(burn.amount0)
  const amountToken1 = parseFloat(burn.amount0)
  const abs0 = Math.abs(amountToken0)
  const abs1 = Math.abs(amountToken1)
  const symbolToken0 = token0Symbol === 'USDC' ? 'XOX' : token0Symbol

  const inputTokenSymbol = symbolToken0
  const amountUSD = inputTokenSymbol === 'USDC' || inputTokenSymbol === 'USDT' ? abs0 : abs1
  return amountUSD * 2
}

export const mapDataChartXOX = (pairData: PairData) => {
  return {
    date: pairData.hourStartUnix || pairData.date,
    priceUSD: formatAmountNumber(pairData.reserve1 / pairData.reserve0, 4),
    VolUSD: formatAmountNumber(pairData.hourlyVolumeToken1 || pairData.dailyVolumeToken1, 4),
  }
}

export const mapMints = (mint: MintResponse) => {
  return {
    type: TransactionType.MINT,
    hash: mint.id.split('-')[0],
    timestamp: mint.timestamp,
    sender: mint.to,
    token0Symbol: mint.pair.token0.symbol,
    token1Symbol: mint.pair.token1.symbol,
    token0Address: mint.pair.token0.id,
    token1Address: mint.pair.token1.id,
    amountUSD: calculatorAmountUSDMint(mint),
    amountToken0: parseFloat(mint.amount0),
    amountToken1: parseFloat(mint.amount1),
  }
}

export const mapBurns = (burn: BurnResponse) => {
  return {
    type: TransactionType.BURN,
    hash: burn.id.split('-')[0],
    timestamp: burn.timestamp,
    sender: burn.sender,
    token0Symbol: burn.pair.token0.symbol,
    token1Symbol: burn.pair.token1.symbol,
    token0Address: burn.pair.token0.id,
    token1Address: burn.pair.token1.id,
    amountUSD: calculatorAmountUSDBurn(burn),
    amountToken0: parseFloat(burn.amount0),
    amountToken1: parseFloat(burn.amount1),
  }
}

export const mapSwaps = (swap: SwapResponse) => {
  return {
    type: TransactionType.SWAP,
    hash: swap.id.split('-')[0],
    timestamp: swap.timestamp,
    sender: swap.from,
    token0Symbol: swap.pair.token0.symbol,
    token1Symbol: swap.pair.token1.symbol,
    token0Address: swap.pair.token0.id,
    token1Address: swap.pair.token1.id,
    amountUSD: parseFloat(swap.amountUSD),
    amountToken0: parseFloat(swap.amount0In) - parseFloat(swap.amount0Out),
    amountToken1: parseFloat(swap.amount1In) - parseFloat(swap.amount1Out),
  }
}

const calculatorAmountUSDSwap = (swap: SwapResponse) => {
  const token0Symbol = swap.pair.token0.symbol
  const token1Symbol = swap.pair.token1.symbol
  const amountToken0 = parseFloat(swap.amount0In) - parseFloat(swap.amount0Out)
  const amountToken1 = parseFloat(swap.amount1In) - parseFloat(swap.amount1Out)
  const abs0 = Math.abs(amountToken0)
  const abs1 = Math.abs(amountToken1)
  const symbolToken0 = token0Symbol === 'xox' ? 'XOX' : token0Symbol
  const symbolToken1 = token1Symbol === 'xox' ? 'XOX' : token1Symbol

  const inputTokenSymbol = amountToken1 < 0 ? symbolToken0 : symbolToken1
  const amountUSD =
    inputTokenSymbol === 'USDC' || inputTokenSymbol === 'USDT'
      ? amountToken1 < 0
        ? abs0
        : abs1
      : amountToken0 < 0
      ? abs0 / 0.9
      : abs1 / 0.9
  return amountUSD
}

export const mapSwapsXOX = (swap: SwapResponse) => {
  return {
    type: TransactionType.SWAP,
    hash: swap.id.split('-')[0],
    timestamp: swap.timestamp,
    sender: swap.from,
    token0Symbol: swap.pair.token0.symbol,
    token1Symbol: swap.pair.token1.symbol,
    token0Address: swap.pair.token0.id,
    token1Address: swap.pair.token1.id,
    amountUSD: calculatorAmountUSDSwap(swap),
    amountToken0: parseFloat(swap.amount0In) - parseFloat(swap.amount0Out),
    amountToken1: parseFloat(swap.amount1In) - parseFloat(swap.amount1Out),
  }
}

export const mapSwapsUNI = (swap: SwapResponseUNI) => {
  return {
    type: TransactionType.SWAP,
    hash: swap.id.split('-')[0],
    timestamp: swap.timestamp,
    sender: swap.to,
    token0Symbol: swap.pair.token0.symbol,
    token1Symbol: swap.pair.token1.symbol,
    token0Address: swap.pair.token0.id,
    token1Address: swap.pair.token1.id,
    amountUSD: parseFloat(swap.amountUSD),
    amountToken0: parseFloat(swap.amount0In) - parseFloat(swap.amount0Out),
    amountToken1: parseFloat(swap.amount1In) - parseFloat(swap.amount1Out),
  }
}

export const mapDayData = (tokenDayData: TokenDayData | PancakeDayData): ChartEntry => ({
  date: tokenDayData.date,
  volumeUSD: parseFloat(tokenDayData.dailyVolumeUSD),
  liquidityUSD: parseFloat(tokenDayData.totalLiquidityUSD),
})

export const mapPairDayData = (pairDayData: PairDayData): ChartEntry => ({
  date: pairDayData.date,
  volumeUSD: parseFloat(pairDayData.dailyVolumeUSD),
  liquidityUSD: parseFloat(pairDayData.reserveUSD),
})

type PoolOrTokenFetchFn = (
  chainName: MultiChainName,
  skip: number,
  address: string,
) => Promise<{ data?: ChartEntry[]; error: boolean }>

type OverviewFetchFn = (chianName: MultiChainName, skip: number) => Promise<{ data?: ChartEntry[]; error: boolean }>
type OverviewFetchFnCustom = (id: string, days: number) => Promise<{ data?: any[]; error: boolean }>

// Common helper function to retrieve chart data
// Used for both Pool and Token charts
export const fetchChartData = async (
  chainName: MultiChainName,
  getEntityDayDatas: OverviewFetchFn,
): Promise<{ data?: ChartEntry[]; error: boolean }> => {
  let chartEntries: ChartEntry[] = []
  let error = false
  let skip = 0
  let allFound = false

  while (!allFound) {
    // eslint-disable-next-line no-await-in-loop
    const { data, error: fetchError } = await getEntityDayDatas(chainName, skip)
    skip += 1000
    allFound = data?.length < 1000
    error = fetchError
    if (data) {
      chartEntries = chartEntries.concat(data)
    }
  }

  if (error || chartEntries.length === 0) {
    return {
      error: true,
    }
  }

  const formattedDayDatas = fromPairs(
    chartEntries.map((dayData) => {
      // At this stage we track unix day ordinal for each data point to check for empty days later
      const dayOrdinal = parseInt((dayData.date / ONE_DAY_UNIX).toFixed(0))
      return [dayOrdinal, dayData]
    }),
  )

  const availableDays = Object.keys(formattedDayDatas).map((dayOrdinal) => parseInt(dayOrdinal, 10))

  const firstAvailableDayData = formattedDayDatas[availableDays[0]]
  // fill in empty days ( there will be no day datas if no trades made that day )
  let timestamp = firstAvailableDayData?.date ?? multiChainStartTime[chainName]
  let latestLiquidityUSD = firstAvailableDayData?.liquidityUSD ?? 0
  const endTimestamp = getUnixTime(new Date())
  while (timestamp < endTimestamp - ONE_DAY_UNIX) {
    timestamp += ONE_DAY_UNIX
    const dayOrdinal = parseInt((timestamp / ONE_DAY_UNIX).toFixed(0), 10)
    if (!Object.keys(formattedDayDatas).includes(dayOrdinal.toString())) {
      formattedDayDatas[dayOrdinal] = {
        date: timestamp,
        volumeUSD: 0,
        liquidityUSD: latestLiquidityUSD,
      }
    } else {
      latestLiquidityUSD = formattedDayDatas[dayOrdinal].liquidityUSD
    }
  }

  return {
    data: Object.values(formattedDayDatas),
    error: false,
  }
}

export const fetchChartDataCustom = async (
  id: string,
  days: number,
  chainName: MultiChainName,
  getEntityDayDatas: OverviewFetchFnCustom,
): Promise<{ data?: any[]; error: boolean }> => {
  let chartEntries = []
  let error = false
  let skip = 0
  let allFound = false

  while (!allFound) {
    // eslint-disable-next-line no-await-in-loop
    const { data, error: fetchError } = await getEntityDayDatas(id, days)
    skip += 1000
    allFound = data?.length < 1000
    error = fetchError
    if (data) {
      chartEntries = chartEntries.concat(data)
    }
  }

  if (error || chartEntries.length === 0) {
    return {
      error: true,
    }
  }

  const formattedDayDatas = fromPairs(
    chartEntries.map((dayData) => {
      // At this stage we track unix day ordinal for each data point to check for empty days later
      const dayOrdinal = parseInt((dayData.date / ONE_DAY_UNIX).toFixed(0))
      return [dayOrdinal, dayData]
    }),
  )

  const availableDays = Object.keys(formattedDayDatas).map((dayOrdinal) => parseInt(dayOrdinal, 10))

  const firstAvailableDayData = formattedDayDatas[availableDays[0]]
  // fill in empty days ( there will be no day datas if no trades made that day )
  let timestamp = firstAvailableDayData?.date ?? multiChainStartTime[chainName]
  const endTimestamp = getUnixTime(new Date())
  while (timestamp < endTimestamp - ONE_DAY_UNIX) {
    timestamp += ONE_DAY_UNIX
    const dayOrdinal = parseInt((timestamp / ONE_DAY_UNIX).toFixed(0), 10)
    if (!Object.keys(formattedDayDatas).includes(dayOrdinal.toString())) {
      formattedDayDatas[dayOrdinal] = {
        date: timestamp,
        priceUSD: 0,
      }
    }
  }

  return {
    data: Object.values(formattedDayDatas),
    error: false,
  }
}

export const fetchChartDataWithAddress = async (
  chainName: MultiChainName,
  getEntityDayDatas: PoolOrTokenFetchFn,
  address: string,
): Promise<{ data?: ChartEntry[]; error: boolean }> => {
  let chartEntries: ChartEntry[] = []
  let error = false
  let skip = 0
  let allFound = false

  while (!allFound) {
    // eslint-disable-next-line no-await-in-loop
    const { data, error: fetchError } = await getEntityDayDatas(chainName, skip, address)
    skip += 1000
    allFound = data?.length < 1000
    error = fetchError
    if (data) {
      chartEntries = chartEntries.concat(data)
    }
  }

  if (error || chartEntries.length === 0) {
    return {
      error: true,
    }
  }

  const formattedDayDatas = fromPairs(
    chartEntries.map((dayData) => {
      // At this stage we track unix day ordinal for each data point to check for empty days later
      const dayOrdinal = parseInt((dayData.date / ONE_DAY_UNIX).toFixed(0))
      return [dayOrdinal, dayData]
    }),
  )

  const availableDays = Object.keys(formattedDayDatas).map((dayOrdinal) => parseInt(dayOrdinal, 10))

  const firstAvailableDayData = formattedDayDatas[availableDays[0]]
  // fill in empty days ( there will be no day datas if no trades made that day )
  let timestamp = firstAvailableDayData?.date ?? multiChainStartTime[chainName]
  let latestLiquidityUSD = firstAvailableDayData?.liquidityUSD ?? 0
  const endTimestamp = getUnixTime(new Date())
  while (timestamp < endTimestamp - ONE_DAY_UNIX) {
    timestamp += ONE_DAY_UNIX
    const dayOrdinal = parseInt((timestamp / ONE_DAY_UNIX).toFixed(0), 10)
    if (!Object.keys(formattedDayDatas).includes(dayOrdinal.toString())) {
      formattedDayDatas[dayOrdinal] = {
        date: timestamp,
        volumeUSD: 0,
        liquidityUSD: latestLiquidityUSD,
      }
    } else {
      latestLiquidityUSD = formattedDayDatas[dayOrdinal].liquidityUSD
    }
  }

  return {
    data: Object.values(formattedDayDatas),
    error: false,
  }
}

export async function getPairTokenMap(poolAddresses: string[], chainName: 'ETH' | 'BSC') {
  let rawPairTokenResults: string[][]
  const calls = poolAddresses
    .map((poolAddress) => {
      return [
        { address: poolAddress, name: 'token0' },
        { address: poolAddress, name: 'token1' },
      ]
    })
    .flat()
  try {
    rawPairTokenResults = await multicallv2({
      abi: IPancakePairABI,
      calls,
      options: { requireSuccess: false },
      chainId: chainName === 'ETH' ? ChainId.ETHEREUM : ChainId.BSC,
    })
  } catch (error) {
    console.info('Error fetching tokenIds from pair')
  }
  const pairTokenResults = rawPairTokenResults
    ? rawPairTokenResults.map((rawPairTokenResult) => rawPairTokenResult[0].toLowerCase())
    : []
  const pairTokenMap: { [tokenAddress: string]: { token0: string; token1: string } } = chunk(
    pairTokenResults,
    2,
  ).reduce((acc, tokenResult, index) => {
    return { ...acc, [poolAddresses[index].toLowerCase()]: { token0: tokenResult[0], token1: tokenResult[1] } }
  }, {})
  let rawTokenResults
  const uniquePairTokenResults = uniq(pairTokenResults)
  const tokenCalls = uniquePairTokenResults
    .map((pairToken) => {
      return [
        { address: pairToken, name: 'name' },
        { address: pairToken, name: 'symbol' },
      ]
    })
    .flat()
  try {
    rawTokenResults = await multicallv2({
      abi: bep20Abi,
      calls: tokenCalls,
      options: { requireSuccess: false },
      chainId: chainName === 'ETH' ? ChainId.ETHEREUM : ChainId.BSC,
    })
  } catch (error) {
    console.info('Error fetching tokenIds from pair')
  }
  const tokenResults = rawTokenResults ? rawTokenResults.map((rawTokenResult) => rawTokenResult[0]) : []
  const tokenMap = chunk(tokenResults, 2).reduce((acc, tokenResult, index) => {
    return { ...acc, [uniquePairTokenResults[index].toLowerCase()]: { name: tokenResult[0], symbol: tokenResult[1] } }
  }, {})
  return mapValues(pairTokenMap, (pairTokenValue) => {
    return {
      token0: { id: pairTokenValue.token0, ...tokenMap[pairTokenValue.token0] },
      token1: { id: pairTokenValue.token1, ...tokenMap[pairTokenValue.token1] },
    }
  })
}
