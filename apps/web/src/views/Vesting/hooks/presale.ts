import { ChainId } from '@pancakeswap/sdk'
import moment from 'moment'
import {
  getDataReferralPresale,
  getDataRoundStats,
  getRaiseDailies,
  getSaleStats,
  getUserPreSaleInfo,
} from 'services/presale'

export const fetchDataSaleStats = async (chainId?: number, address?: string) => {
  try {
    const result = { dataSaleStats: [] }
    const response = await getSaleStats()
    if (response && response?.saleStats) {
      result.dataSaleStats = response?.saleStats
    }
    return result
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const fetchDataChart = async (time: any, chainId = ChainId.GOERLI) => {
  try {
    const result = await getRaiseDailies(time.from, time.to, chainId)
    if (result && result.raiseDailies && result.raiseDailies.length > 0) {
      return result
    }
    return []
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const fetchDataSaleStatus = async (chainId = ChainId.GOERLI) => {
  try {
    const result = await getDataRoundStats(chainId)
    if (result && result.roundStats && result.roundStats.length > 0) {
      return result
    }
    return []
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const fetchDataInfo = async (account?: string, chainId = ChainId.GOERLI) => {
  try {
    const result = await getUserPreSaleInfo(account, chainId)
    if (result && result.userPreSaleDatas && result.userPreSaleDatas?.length > 0) {
      return result
    }
    return []
  } catch (error) {
    console.warn(error)
  }
  return null
}

export const fetchDataRefPresale = async (account: string, chainId = ChainId.GOERLI) => {
  try {
    const result = await getDataReferralPresale(account, chainId)
    if (result && result?.analysisSaleReferrals && result?.analysisSaleReferrals.length !== 0) {
      return result
    }
    return []
  } catch (error) {
    console.warn(error)
  }
  return null
}
