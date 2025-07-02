import { mapDataChartXOX } from 'state/info/queries/helpers'
import { PairData } from 'state/info/queries/types'
import { TransactionFrom } from 'state/info/types'
import { getMultiChainQueryEndPointWithChainId } from '../../constant'

/**
 * Transactions for Transaction table on the Home page
 */

const query_hour = () => {
  return `
    query fetchDataChartXOX {
      pairHourDatas(first: 24) {
        id
        hourStartUnix
        reserve0
        reserve1
        hourlyVolumeToken1
      }
    }
  `
}

const query_day = (filter) => {
  let day
  switch (filter) {
    case '7D':
      day = 7
      break
    case '1M':
      day = 30
      break
    case '3M':
      day = 90
      break
    case '1Y':
      day = 365
      break
    default:
      day = 1000
      break
  }
  return `
    query fetchDataChartXOX {
      pairDayDatas(first: ${day}) {
        id
        date
        reserve0
        reserve1
        dailyVolumeToken1
      }
    }
  `
}

interface ChartData {
  pairHourDatas?: PairData[]
  pairDayDatas?: PairData[]
}

const fetchDataChartXOX = async (chainId: number, filter: any): Promise<any> => {
  try {
    let dataChart
    dataChart = await getMultiChainQueryEndPointWithChainId(chainId, TransactionFrom.XOX).request<ChartData>(
      ['1D'].includes(filter) ? query_hour() : query_day(filter),
    )

    return (dataChart?.pairHourDatas || dataChart.pairDayDatas || []).map(mapDataChartXOX)
  } catch (e) {
    return []
  }
}

export default fetchDataChartXOX
