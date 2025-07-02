/* eslint-disable @typescript-eslint/no-unused-vars */
import { useActiveChainId } from 'hooks/useActiveChainId'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getRaiseDailies } from 'services/presale'
import { SWR_SETTINGS, useGetChainName } from 'state/info/hooks'
import useSWRImmutable from 'swr/immutable'
import { fetchDataChart, fetchDataInfo, fetchDataRefPresale, fetchDataSaleStats, fetchDataSaleStatus } from './presale'

export const useGetSaleStats = () => {
  const chainName = useGetChainName()
  const { chainId } = useActiveChainId()
  const type = 'pre-sale'
  const { data: saleStats } = useSWRImmutable(
    [`info/protocol/getDataSaleStarts/${type}`],
    () => fetchDataSaleStats(),
    SWR_SETTINGS,
  )
  return saleStats
}

export const useGetDataChartPreSale = (time) => {
  const type = 'pre-sale'
  const { data: dataChart } = useSWRImmutable(
    [`info/protocol/fetchDataChart/${type}`],
    () => fetchDataChart(time),
    SWR_SETTINGS,
  )
  return dataChart
}

export const useGetDataChartPreSaleAfter = (time) => {
  const type = 'pre-sale'
  const { data: dataChart } = useSWRImmutable(
    [`info/protocol/getDataChartPreSaleAfter/${type}`],
    () => fetchDataChart(time),
    SWR_SETTINGS,
  )
  return dataChart
}

export const useGetDataSaleStatus = () => {
  const chainName = useGetChainName()
  const { chainId } = useActiveChainId()
  const type = 'pre-sale'
  const { data: dataStatus } = useSWRImmutable(
    [`info/protocol/fetchDataSaleStart/${type}`],
    () => fetchDataSaleStatus(),
    SWR_SETTINGS,
  )
  return dataStatus
}

export const useGetDataInfo = () => {
  const { account } = useActiveWeb3React()
  const type = 'pre-sale'
  const { data: dataInfo } = useSWRImmutable(
    [`info/protocol/fetchDataInfo/${type}`],
    () => fetchDataInfo(account),
    SWR_SETTINGS,
  )
  return dataInfo
}

export const useGetDataInfoRef = () => {
  const { account } = useActiveWeb3React()
  const type = 'pre-sale'
  const { data: dataInfo } = useSWRImmutable(
    [`info/protocol/fetchDataRefPresale/${type}`],
    () => fetchDataRefPresale(account),
    SWR_SETTINGS,
  )
  return dataInfo
}
