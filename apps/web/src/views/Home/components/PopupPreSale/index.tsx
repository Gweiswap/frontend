/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import { formatEther } from '@ethersproject/units'
import { ChainId, ERC20Token } from '@pancakeswap/sdk'
import { useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useXOXPreSaleContract } from 'hooks/useContract'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useProvider } from 'wagmi'
import CountDownBlock from './components/CountDownBlock'

export interface IRefInfo {
  id: number | string
  title: string
  amountInit: string
  account?: string
  rewardXOXS?: string
  totalTransactionApplyReferral?: string
}

export interface Start {
  id: number
  title: string
  amount: string
  icon?: string
  field?: string
  decimal?: number
}

export const tabSaleMechanism: string[] = [
  'Your Information',
  'Private Sale Mechanism',
  'Sale Referral Program',
  'Token Metrics',
  'Vesting Schedule',
]

export interface IVestingTime {
  title: string
  amountVested: number | string
  remaining: number | string
  yourCurrentXOX: number | string
  startTime: number[]
  statusClaim: boolean
  round?: number
}

export enum TYPE_BY {
  BY_ERC20,
  BY_ETH,
}

export const USDC_TEST = '0xD898D309dAb33130EA57E8F106238ae4b76329f4'
export const NATIVE_TOKEN = '0x0000000000000000000000000000000000000000'
export const ADDRESS_CODE = '0x0000000000000000000000000000000000000000'

export enum ROUND {
  NOT_START,
  ONE,
  TWO,
  THREE,
}

export enum SALE_ROUND {
  ONE,
  TWO,
  THREE,
}
export const vestingTiming: IVestingTime[] = [
  {
    title: 'Sale 1',
    amountVested: 0,
    remaining: 0,
    yourCurrentXOX: 0,
    startTime: [],
    statusClaim: false,
    round: ROUND.ONE,
  },
  {
    title: 'Sale 2',
    amountVested: 0,
    remaining: 0,
    yourCurrentXOX: 0,
    startTime: [],
    statusClaim: false,
    round: ROUND.TWO,
  },
  {
    title: 'Sale 3',
    amountVested: 0,
    remaining: 0,
    yourCurrentXOX: 0,
    startTime: [],
    statusClaim: false,
    round: ROUND.THREE,
  },
]

const now = new Date()
export const timeStampOfNow = now.getTime()

export const USDC_TESTNET = new ERC20Token(
  ChainId.GOERLI,
  USDC_TEST,
  6,
  'USDC',
  'USDC',
  'http://localhost:3001/pools?chainId=5',
)

export interface RoundInfo {
  totalDistribution: number | null
  startDate: number | null
  endDate: number | null
  bonusPercentage: number | null
  exchangeRate: number | null
}

const defaultRoundInfo = {
  totalDistribution: null,
  startDate: null,
  endDate: null,
  bonusPercentage: null,
  exchangeRate: null,
}

export const decimal = 6

function VestingPage() {
  const { t } = useTranslation()
  const [currentRound, setCurrentRound] = useState<number | null>(0)
  const [infoRoundOne, setInfoRoundOne] = useState<RoundInfo>(defaultRoundInfo)
  const [infoRoundTow, setInfoRoundTow] = useState<RoundInfo>(defaultRoundInfo)
  const [infoRoundThree, setInfoRoundThree] = useState<RoundInfo>(defaultRoundInfo)
  const { toastError } = useToast()
  const [totalXOXTokenInRound, setTotalXOXTokenInRound] = useState<number | string | null>(0)

  // const chainId = process.env.NEXT_PUBLIC_TEST_MODE === '1' ? 5 : 1

  const contractPreSale = useXOXPreSaleContract(ChainId.GOERLI)

  const [lanchTime, setLanchTime] = useState<number | null>(null)
  const provider = useProvider({ chainId: ChainId.GOERLI })
  const [isInTimeRangeSale, setIsInTimeRangeSale] = useState<boolean>(false)
  const [reacheZero, setReachZero] = useState<boolean>(null)
  const [_, setisReachWhitelist] = useState<boolean>(false)
  const [timeRecall, setTimeRecall] = useState(7)

  const handleGetInfoRound = async () => {
    try {
      const [dataROne, dataRTwo, dataRThree, launchTime] = await Promise.all([
        contractPreSale.saleRound(ROUND.ONE),
        contractPreSale.saleRound(ROUND.TWO),
        contractPreSale.saleRound(ROUND.THREE),
        contractPreSale.launchTime(),
      ])
      setInfoRoundOne({
        ...infoRoundOne,
        totalDistribution: 2700000,
        startDate: new BigNumber(dataROne.startDate._hex).multipliedBy(1000).toNumber(),
        endDate: new BigNumber(dataROne.endDate._hex).multipliedBy(1000).toNumber(),
        bonusPercentage: new BigNumber(dataROne.bonusPercentage._hex).toNumber(),
        exchangeRate: new BigNumber(dataROne.exchangeRate._hex).toNumber(),
      })

      setInfoRoundTow({
        ...infoRoundTow,
        totalDistribution: 3600000,
        startDate: new BigNumber(dataRTwo.startDate._hex).multipliedBy(1000).toNumber(),
        endDate: new BigNumber(dataRTwo.endDate._hex).multipliedBy(1000).toNumber(),
        bonusPercentage: new BigNumber(dataRTwo.bonusPercentage._hex).toNumber(),
        exchangeRate: new BigNumber(dataRTwo.exchangeRate._hex).toNumber(),
      })
      setInfoRoundThree({
        ...infoRoundThree,
        totalDistribution: 4500000,
        startDate: new BigNumber(dataRThree.startDate._hex).multipliedBy(1000).toNumber(),
        endDate: new BigNumber(dataRThree.endDate._hex).multipliedBy(1000).toNumber(),
        bonusPercentage: new BigNumber(dataRThree.bonusPercentage._hex).toNumber(),
        exchangeRate: new BigNumber(dataRThree.exchangeRate._hex).toNumber(),
      })
      setLanchTime(new BigNumber(launchTime._hex).toNumber())
    } catch (error) {
      console.warn(error)
    }
  }

  const handleGetCurrentRound = async (time: any) => {
    try {
      if (infoRoundOne.startDate && infoRoundOne.startDate <= time) {
        setCurrentRound(1)
      }
      if (infoRoundTow.startDate && infoRoundTow.startDate <= time) {
        setCurrentRound(2)
      }
      if (infoRoundThree.startDate && infoRoundThree.startDate <= time) {
        setCurrentRound(3)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const handleGetOneHourAfterSale = useMemo(() => {
    const timeStartWhiteList = moment
      .unix(infoRoundOne.startDate / 1000)
      .add(1, 'hour')
      .unix()
    return timeStartWhiteList * 1000
  }, [infoRoundOne])

  const handCheckInTimeRangeSale = (time: number) => {
    if (
      (infoRoundOne.startDate <= time && time <= infoRoundOne.endDate) ||
      (infoRoundTow.startDate <= time && time <= infoRoundTow.endDate) ||
      (infoRoundThree.startDate <= time && time <= infoRoundThree.endDate)
    ) {
      setIsInTimeRangeSale(true)
    } else {
      setIsInTimeRangeSale(false)
    }
  }

  const handleGetTotalTokenInvested = async (round: number) => {
    try {
      const data = await contractPreSale.totalRoundInvested(round)
      if (data) {
        setTotalXOXTokenInRound(new BigNumber(formatEther(data._hex)).toNumber())
      }
    } catch (error: any) {
      // if (error?.code !== 4001) {
      //   toastError('Error', t('Transaction failed'))
      // }
    }
  }

  useEffect(() => {
    handleGetInfoRound()
    handCheckInTimeRangeSale(timeStampOfNow)
    handleGetCurrentRound(timeStampOfNow)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const myId = setTimeout(() => {
      if (timeRecall > 0) {
        setTimeRecall(timeRecall - 1)
        return
      }
      setTimeRecall(7)
    }, 1000)
    return () => clearTimeout(myId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRecall])

  useEffect(() => {
    handleGetTotalTokenInvested(currentRound)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound])

  useEffect(() => {
    if (lanchTime === null) return
    // handleGetDataVesting()
    handCheckInTimeRangeSale(timeStampOfNow)
    handleGetCurrentRound(timeStampOfNow)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoRoundOne, infoRoundThree, infoRoundTow, lanchTime])

  useEffect(() => {
    if (reacheZero) {
      const timeStampAtNow = Date.now()
      handCheckInTimeRangeSale(timeStampAtNow)
      handleGetCurrentRound(timeStampAtNow)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reacheZero, infoRoundOne])

  return (
    <CountDownBlock
      currentRound={currentRound}
      infoRoundOne={infoRoundOne}
      infoRoundTow={infoRoundTow}
      infoRoundThree={infoRoundThree}
      isInTimeRangeSale={isInTimeRangeSale}
      totalXOXTokenInRound={totalXOXTokenInRound}
      reacheZero={reacheZero}
      setReachZero={setReachZero}
      oneHourBeforeStart={handleGetOneHourAfterSale}
      setisReachWhitelist={setisReachWhitelist}
    />
  )
}

export default VestingPage
