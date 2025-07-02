/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { formatUnits } from '@ethersproject/units'
import { Box } from '@mui/material'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import { USD_DECIMALS } from 'config/constants/exchange'
import { useTreasuryXOX } from 'hooks/useContract'
import useWindowSize from 'hooks/useWindowSize'
import moment from 'moment'
import axios from 'axios'
import { useEffect, useState, useMemo } from 'react'
import {
  getUerRank,
  getUserPointDaily,
  getUserPointMonthly,
  getUserPointWeekly,
  pointDataDays,
  userAmount,
  userPoint,
} from 'services/referral'
import styled from 'styled-components'
import { ChainId } from '@pancakeswap/sdk'
import Banner from './components/Banner'
import MainInfo from './components/MainInfo'
import ReferralFriend from './components/ReferralFriend'

export interface IItemLevel {
  icon: string
  point: number
  dollar: number
  lever: number
  isReach: boolean
}

interface IVolumnDataItem {
  volumn: string
  title: string
  svg: string
}

export interface IMappingFormat {
  address: string
  amount: string
  avatar: string
  id: string
  point: number | null
  rank: number | null
  username: string
}

interface IDataFormatUnit {
  id: string
  amount: string
  address: string
}

interface IListPoint {
  reward: number
  point: number
}

const Wrapper = styled(Box)`
  padding: 48px;
  padding-top: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media screen and (max-width: 1200px) {
    padding: 48px 24px;
    display: block;
  }
`

const MainBackground = styled.div`
  position: absolute;
  z-index: -1;
  top: -50px;
  left: 0;
  right: 0;
  bottom: 0;
  svg {
    width: 100vw;
    height: auto;
    object-fit: cover;
  }
`

const BoxStyled = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .content {
    width: 1400px;
    position: relative;
  }

  @media screen and (max-width: 1400px) {
    display: block;
    .content {
      width: 1200px;
    }
  }

  @media screen and (max-width: 1200px) {
    .content {
      width: 100%;
    }
  }
`

interface IPropsConnectBox {
  hasListUserRanks?: boolean
}

export const filterTime = ['All Time', 'Monthly', 'Weekly', 'Daily'] as const
export type FilterTime = typeof filterTime[number]

export const filterChain = ['General', 'Ethereum', 'BSC'] as const
export type FilterChain = typeof filterChain[number]

export type RankingByChain = {
  [key in typeof filterChain[number]]?: IMappingFormat
}

export type ListRankingByChain = {
  [key in typeof filterChain[number]]?: IMappingFormat[]
}

const defaultIMappingFormat = {
  address: '',
  amount: '',
  avatar: '',
  id: '',
  point: null,
  rank: null,
  username: '',
}

const defaultRankingByChain: RankingByChain = {
  General: defaultIMappingFormat,
  Ethereum: defaultIMappingFormat,
  BSC: defaultIMappingFormat,
}

const defaultListRankingByChain: ListRankingByChain = {
  General: [],
  Ethereum: [],
  BSC: [],
}

type FunctionList = {
  [key in typeof filterTime[number]]: [
    ListRankingByChain,
    RankingByChain,
    (func: ListRankingByChain) => void,
    (func: RankingByChain) => void,
  ]
}

export default function Refferal() {
  const { account, chainId } = useWeb3React()
  const contractTreasuryXOX = useTreasuryXOX()
  const [userCurrentPoint, setUserCurrentPoint] = useState<number>(0)
  const [currentLevelReach, setCurrentLevelReach] = useState<number>(0)
  const [listLevelMustReach, setListLevelMustReach] = useState<IItemLevel[]>(listLever)
  const [isClaimAll, setIsClaimAll] = useState<boolean>(true)
  const [volumnTotalEarn, setVolumnTotalEarn] = useState<string>('')
  const [totalAmountUnClaimOfUser, setTotalAmountUnClaimOfUser] = useState<number | string>(0)
  const { isMobile } = useMatchBreakpoints()
  const { width } = useWindowSize()
  const [tabLeaderBoard, setTabLeaderBoard] = useState<FilterTime>('All Time')
  const [tabChainLeaderBoard, setTabChainLeaderBoard] = useState<FilterChain>('General')

  const [listUserRanks, setListUserRanks] = useState<ListRankingByChain>()
  const [listUserRanksDaily, setListUserRanksDaily] = useState<ListRankingByChain>()
  const [listUserRanksWeekly, setListUserRanksWeekly] = useState<ListRankingByChain>()
  const [listUserRanksMonthly, setListUserRanksMonthly] = useState<ListRankingByChain>()
  const [listUserRanksAllTime, setListUserRanksAllTime] = useState<ListRankingByChain>()

  const [rankOfUser, setRankOfUser] = useState<RankingByChain>(defaultRankingByChain)
  const [rankOfUserDaily, setRankOfUserDaily] = useState<RankingByChain>(defaultRankingByChain)
  const [rankOfUserWeekly, setRankOfUserWeekly] = useState<RankingByChain>(defaultRankingByChain)
  const [rankOfUserMonthly, setRankOfUserMonthly] = useState<RankingByChain>(defaultRankingByChain)
  const [rankOfUserAllTime, setRankOfUserAllTime] = useState<RankingByChain>(defaultRankingByChain)

  const [loadOk, setLoadOk] = useState(false)
  const startOfDay = moment().startOf('days').toString()
  const startOfMonth = moment().startOf('month').toString()
  const startOfWeek = moment().startOf('isoWeek').toString()
  const [volumnData, setVolumnData] = useState<Array<IVolumnDataItem>>(listData)
  const [dataChart, setDataChart] = useState([])
  const [minAmount, setMinAmount] = useState('')
  const [middleAmount, setMiddleAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [listPoint, setListPoint] = useState<IListPoint[]>([])

  const [subTabIndex, setSubTabIndex] = useState(0)
  const subTab = ['Total Earned', 'Platform Stats', 'How to Join']

  const functionList: FunctionList = useMemo(() => {
    return {
      'All Time': [listUserRanksAllTime, rankOfUserAllTime, setListUserRanksAllTime, setRankOfUserAllTime],
      Monthly: [listUserRanksMonthly, rankOfUserMonthly, setListUserRanksMonthly, setRankOfUserMonthly],
      Weekly: [listUserRanksWeekly, rankOfUserWeekly, setListUserRanksWeekly, setRankOfUserWeekly],
      Daily: [listUserRanksDaily, rankOfUserDaily, setListUserRanksDaily, setRankOfUserDaily],
    }
  }, [])

  // eslint-disable-next-line consistent-return
  const handleGetCurrentPoint = async () => {
    let currentPoint
    try {
      const infosUser: any[] = await contractTreasuryXOX.userInfo(account)
      const dataParse: any[] = infosUser.map((item) => {
        return formatUnits(item, USD_DECIMALS[chainId])
      })
      setUserCurrentPoint(Number(dataParse[0]))
      currentPoint = Number(dataParse[0])
      return currentPoint
    } catch (error) {
      console.warn(error)
    }
  }

  const createArray = (from: Date, to: Date, subGraphData: any) => {
    const start = new Date(moment(from).format('MM/DD/YYYY'))
    const end = new Date(moment(to).format('MM/DD/YYYY'))
    const chartData = []
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const loopDay = new Date(d)
      loopDay.setHours(23)
      loopDay.setMinutes(59)
      loopDay.setSeconds(59)
      const dataByDay = { date: moment(loopDay).unix(), amount: 0 }
      const dateInterger = Math.trunc(moment(loopDay).unix() / 86400)

      const findData = subGraphData.find((x) => {
        return x.id === dateInterger.toString()
      })
      dataByDay.amount = findData ? findData.amount : 0
      chartData.push(dataByDay)
    }
    return chartData
  }

  // eslint-disable-next-line consistent-return
  const handleCheckPendingRewardAll = async (accountId: string) => {
    try {
      const txPendingReward = await contractTreasuryXOX.pendingRewardAll(accountId)
      setIsClaimAll(Number(formatUnits(txPendingReward._hex, USD_DECIMALS[chainId])) === 0)
      setTotalAmountUnClaimOfUser(Number(formatUnits(txPendingReward._hex, USD_DECIMALS[chainId])))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error>>>>>`, error)
    }
  }

  const handleCheckReachLevel = async (currentPoint: number) => {
    const arrAddIsReach: IItemLevel[] = listLevelMustReach.map((item: IItemLevel) => {
      const reached = currentPoint >= item.point
      return {
        ...item,
        isReach: reached,
        isClaimed: false,
      }
    })

    if (currentPoint < listLevelMustReach[0].point) {
      setCurrentLevelReach(0)
    } else {
      const findLastReach = arrAddIsReach.filter((item) => {
        return item.isReach === true
      })
      const currentLever = findLastReach.pop()?.lever
      setCurrentLevelReach(currentLever)
    }

    const arrCheckClaimed: IItemLevel[] = await Promise.all(
      arrAddIsReach?.map(async (item: IItemLevel): Promise<any> => {
        try {
          if (item.isReach) {
            const txPendingReward = await contractTreasuryXOX.pendingRewardByLevel(account, item.lever)
            if (Number(formatUnits(txPendingReward._hex, USD_DECIMALS[chainId])) === 0) {
              return {
                ...item,
                isClaimed: true,
              }
            }
            return {
              ...item,
              isClaimed: false,
            }
          }
          return item
        } catch (error) {
          console.log(`error >>>>`, error)
        }
      }),
    )
    setListLevelMustReach([...arrCheckClaimed])
  }

  const payloadPostForDaily = {
    date_gte: moment(startOfDay).unix(),
    date_lte: moment().unix(),
  }
  const payloadPostForMonth = {
    date_gte: moment(startOfMonth).unix(),
    date_lte: moment().unix(),
  }

  const payloadPostForWeek = {
    date_gte: moment(startOfWeek).unix(),
    date_lte: moment().unix(),
  }

  const getListPointConfig = async () => {
    const res: any = await axios.get(`${process.env.NEXT_PUBLIC_API}/point/config`).catch((error) => {
      console.warn(error)
    })

    if (res && res.data) {
      setListPoint(res.data)
    }
  }
  const getUserPoint = async () => {
    const result = await userPoint(chainId)
    if (result && result.analysisDatas && result.analysisDatas.length > 0) {
      const totalReward = new BigNumber(result.analysisDatas[0]?.total_reward)
        .div(10 ** USD_DECIMALS[chainId])
        .toNumber()
      const totalClaimedAmount = new BigNumber(result.analysisDatas[0]?.total_claimed_amount)
        .div(10 ** USD_DECIMALS[chainId])
        .toNumber()

      const totalClaimedAmountIn100Percent = new BigNumber(totalClaimedAmount)
        .multipliedBy(100)
        .div(99)
        .toFixed(0, BigNumber.ROUND_DOWN)

      const totalUnClaimed = new BigNumber(totalReward).minus(totalClaimedAmountIn100Percent).toString()
      listData[0].volumn = result.analysisDatas[0]?.number_of_referral
      listData[1].volumn = totalUnClaimed.toString()
      listData[2].volumn = totalClaimedAmountIn100Percent.toString()
      listData[3].volumn = result.analysisDatas[0]?.total_transactions.toString()
      listData[4].volumn = totalReward.toString()
      setVolumnData(listData)
    }
  }

  const getUserVolumn = async () => {
    try {
      const isDevEnv = chainId === ChainId.BSC_TESTNET || chainId === ChainId.GOERLI
      const [resBSC, resETH] = await Promise.all([userAmount(isDevEnv ? 97 : 56), userAmount(isDevEnv ? 5 : 1)])
      if (resBSC || resETH) {
        const volumnBSC = resBSC.analysisDatas[0]?.total_reward
          ? formatUnits(resBSC.analysisDatas[0]?.total_reward, 18)
          : 0
        const volumnETH = resETH.analysisDatas[0]?.total_reward
          ? formatUnits(resETH.analysisDatas[0]?.total_reward, 6)
          : 0

        // 99%

        const totalVolumn = new BigNumber(volumnBSC).plus(volumnETH).toString()

        // 100%
        // const totalVolumnIn100Percent = new BigNumber(totalVolumn)
        //   .multipliedBy(100)
        //   .div(99)
        //   .toFixed(0, BigNumber.ROUND_DOWN)

        setVolumnTotalEarn(totalVolumn)
      }
    } catch (error) {
      console.log(`error >>>>`, error)
    }
  }

  function createDataChartDay(name: string, uv: number) {
    return { name, uv }
  }

  const getPointDataDays = async () => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 14)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date()
    endDate.setHours(23, 59, 59, 999)
    const time = {
      from: moment(startDate).unix(),
      to: moment(endDate).unix(),
    }
    const result = await pointDataDays(time.from, time.to, chainId)
    if (result && result.pointDataDays && result.pointDataDays.length > 0) {
      const arr = result.pointDataDays
      const chartData = createArray(startDate, endDate, arr)
      const data = chartData.map((item: any) => {
        const amount = new BigNumber(item.amount).div(10 ** USD_DECIMALS[chainId]).toNumber()
        return createDataChartDay(moment(item.date * 1000).format('DD MMM'), amount)
      })
      setMinAmount(data[0].uv.toString())
      setMiddleAmount(data[Math.floor(data.length / 2)].uv.toString())
      setMaxAmount(data[data.length - 1].uv.toString())
      setDataChart(data)
    }
  }

  const handleReCallGetCurrentPoint = async () => {
    const currentPoint = await handleGetCurrentPoint()
    handleCheckReachLevel(currentPoint)
  }

  const handleGetUserRanks = async (
    typeFilterChain: FilterChain,
    typeFilter: FilterTime,
    list: ListRankingByChain,
    rank: RankingByChain,
    setList: (arr: ListRankingByChain) => void,
    setRank: (rank: RankingByChain) => void,
  ) => {
    try {
      // for General
      let userPointBSC: any
      let userPointETH: any

      const chainEthId = chainId === ChainId.ETHEREUM || chainId === ChainId.BSC ? ChainId.ETHEREUM : ChainId.GOERLI
      const chainBscId = chainId === ChainId.ETHEREUM || chainId === ChainId.BSC ? ChainId.BSC : ChainId.BSC_TESTNET

      let dataUserFormatAmount: IDataFormatUnit[]

      switch (typeFilter) {
        case 'All Time':
          userPointETH = await getUerRank(chainEthId)
          userPointBSC = await getUerRank(chainBscId)
          break
        case 'Monthly':
          userPointETH = await getUserPointMonthly(chainEthId, payloadPostForMonth)
          userPointBSC = await getUserPointMonthly(chainBscId, payloadPostForMonth)
          break
        case 'Weekly':
          userPointETH = await getUserPointWeekly(chainEthId, payloadPostForWeek)
          userPointBSC = await getUserPointWeekly(chainBscId, payloadPostForWeek)
          break
        default:
          userPointETH = await getUserPointDaily(chainEthId, payloadPostForDaily)
          userPointBSC = await getUserPointDaily(chainBscId, payloadPostForDaily)
          break
      }

      const dataUserPointETH =
        userPointETH.userPoints ||
        userPointETH.userPointMonthlies ||
        userPointETH.userPointWeeklies ||
        userPointETH.userPointDailies

      const dataUserPointBSC =
        userPointBSC.userPoints ||
        userPointBSC.userPointMonthlies ||
        userPointBSC.userPointWeeklies ||
        userPointBSC.userPointDailies

      switch (typeFilterChain) {
        case 'General':
          const dataFormatETH = handleFormatData(dataUserPointETH, chainEthId)
          const dataFormatBSC = handleFormatData(dataUserPointBSC, chainBscId)
          dataUserFormatAmount = combineFormatData(dataFormatETH, dataFormatBSC)
          break
        case 'BSC':
        case 'Ethereum':
          dataUserFormatAmount = handleFormatData(
            typeFilterChain === 'BSC' ? dataUserPointBSC : dataUserPointETH,
            typeFilterChain === 'BSC' ? chainBscId : chainEthId,
          )
          break
      }

      const listAddress = dataUserFormatAmount.map((item) => item.address)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/users/address/mapping`, {
        wallets: listAddress,
      })
      const dataMapping: IMappingFormat[] = dataUserFormatAmount.map((item, index) => {
        const dataUserInfos = response.data
        const userInfo = dataUserInfos?.find((user) => item.address === user.address)

        return {
          ...item,
          ...userInfo,
          rank: index + 1,
          username: userInfo?.username ?? null,
          avatar: userInfo?.avatar ?? null,
        }
      })

      const tempList = {
        General: typeFilterChain === 'General' ? [...dataMapping] : list?.General,
        Ethereum: typeFilterChain === 'Ethereum' ? [...dataMapping] : list?.Ethereum,
        BSC: typeFilterChain === 'BSC' ? [...dataMapping] : list?.BSC,
      }

      setList(tempList)
      setListUserRanks(tempList)
      // if (tabLeaderBoard === typeFilter) setListUserRanks([...dataMapping])

      const levelOfUSer: IMappingFormat[] = dataMapping.slice(0, 101).filter((item: any) => {
        return item.address === account?.toLowerCase()
      })

      if (levelOfUSer.length !== 0) {
        const tempLevel = {
          General: typeFilterChain === 'General' ? levelOfUSer[0] : rank.General,
          Ethereum: typeFilterChain === 'Ethereum' ? levelOfUSer[0] : rank.Ethereum,
          BSC: typeFilterChain === 'BSC' ? levelOfUSer[0] : rank.BSC,
        }
        setRank(tempLevel)
        setRankOfUser(tempLevel)
        // if (tabLeaderBoard === typeFilter) setRankOfUser(levelOfUSer[0])
      }
    } catch (error) {
      setListUserRanks(defaultListRankingByChain)
    }
  }

  const handleFormatData = (data: any[], chainId: number) => {
    return data.map((item) => {
      return {
        ...item,
        id: item.id,
        point: new BigNumber(item.amount).div(10 ** USD_DECIMALS[chainId]).toNumber(),
      }
    })
  }

  const combineFormatData = (dataETH: any[], dataBSC: any[]) => {
    const data = dataETH.map((itemETH) => {
      const itemBSC = dataBSC.find(({ address }) => itemETH.address === address)
      let point = itemETH.point
      if (itemBSC) {
        point += itemBSC.point
        const idx = dataBSC.indexOf(itemBSC)
        dataBSC.splice(idx, 1)
      }

      return {
        ...itemETH,
        id: itemETH.id,
        point: point,
      }
    })

    return [...data, ...dataBSC].sort((a, b) => b.point - a.point)
  }

  const handleOnChangeRankTab = async (item: FilterTime) => {
    setTabLeaderBoard(item)
    setListUserRanks(functionList[item][0])

    await handleGetUserRanks(
      tabChainLeaderBoard,
      item,
      functionList[item][0],
      functionList[item][1],
      functionList[item][2],
      functionList[item][3],
    )
  }

  const handleOnChangeChainTab = async (item: FilterChain) => {
    setTabChainLeaderBoard(item)
    setListUserRanks(functionList[tabLeaderBoard][0])
    await handleGetUserRanks(
      item,
      tabLeaderBoard,
      functionList[tabLeaderBoard][0],
      functionList[tabLeaderBoard][1],
      functionList[tabLeaderBoard][2],
      functionList[tabLeaderBoard][3],
    )
  }

  useEffect(() => {
    const tempLevel = {
      General: tabChainLeaderBoard === 'General' ? defaultIMappingFormat : rankOfUser.General,
      Ethereum: tabChainLeaderBoard === 'Ethereum' ? defaultIMappingFormat : rankOfUser.Ethereum,
      BSC: tabChainLeaderBoard === 'BSC' ? defaultIMappingFormat : rankOfUser.BSC,
    }
    setRankOfUser(tempLevel)
  }, [tabLeaderBoard])

  useEffect(() => {
    handleGetUserRanks(
      'General',
      'All Time',
      functionList['All Time'][0],
      functionList['All Time'][1],
      functionList['All Time'][2],
      functionList['All Time'][3],
    )
    if (!chainId || !account) return
    // if (loadOk) window.location.reload()
    setLoadOk(true)
    getListPointConfig()
    getUserPoint()
    getPointDataDays()
  }, [chainId, account])

  useEffect(() => {
    const fetchMyAPI = async () => {
      const currentPoint = await handleGetCurrentPoint()
      handleCheckReachLevel(currentPoint)
    }
    fetchMyAPI()
  }, [account, chainId])

  useEffect(() => {
    const myInterval = setInterval(() => {
      handleGetCurrentPoint()
    }, 10000)
    return () => clearInterval(myInterval)
  }, [])

  useEffect(() => {
    if (!chainId || !account) return
    getUserVolumn()
  }, [chainId, account, subTabIndex])

  useEffect(() => {
    if (account) {
      handleCheckPendingRewardAll(account)
    }
  }, [account])

  return (
    <>
      <Wrapper>
        <BoxStyled>
          <div className="content">
            <Banner />
            <MainInfo
              userCurrentPoint={userCurrentPoint}
              currentLevelReach={currentLevelReach}
              listLever={listLever}
              volumnTotalEarn={volumnTotalEarn}
              handleOnChangeRankTab={handleOnChangeRankTab}
              handleOnChangeChainTab={handleOnChangeChainTab}
              tabLeaderBoard={tabLeaderBoard}
              tabChainLeaderBoard={tabChainLeaderBoard}
              listUserRanks={listUserRanks}
              rankOfUser={rankOfUser}
              volumnData={volumnData}
              dataChart={dataChart}
              minAmount={minAmount}
              middleAmount={middleAmount}
              maxAmount={maxAmount}
              listPoint={listPoint}
              listLevelMustReach={listLevelMustReach}
              subTab={subTab}
              subTabIndex={subTabIndex}
              setSubTabIndex={setSubTabIndex}
            />
            <ReferralFriend
              currentLevelReach={currentLevelReach}
              isClaimAll={isClaimAll}
              listLevelMustReach={listLevelMustReach}
              volumnTotalEarn={volumnTotalEarn}
              getUserPoint={getUserPoint}
              handleCheckReachLevel={handleReCallGetCurrentPoint}
              handleCheckPendingRewardAll={handleCheckPendingRewardAll}
              totalUnClaimed={totalAmountUnClaimOfUser}
            />
          </div>
        </BoxStyled>
      </Wrapper>
    </>
  )
}

const listData = [
  {
    volumn: '',
    title: 'Number of Referral Participants',
    svg: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/icon-user.svg`,
  },
  {
    volumn: '',
    title: 'Total Money Unclaimed',
    svg: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/icon-unclaimed-money.svg`,
  },
  {
    volumn: '',
    title: 'Total Money Claimed',
    svg: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/icon-total-claim-money.svg`,
  },
  {
    volumn: '0',
    title: 'Number of referral transactions',
    svg: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/icon-number-of-referral.svg`,
  },
  {
    volumn: '0',
    title: 'Total reward earned',
    svg: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/icon-reward-earn.svg`,
  },
]

export const listLever: IItemLevel[] = [
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/lever_1.svg`,
    point: 50,
    dollar: 5,
    lever: 1,
    isReach: false,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/lever_2.svg`,
    point: 100,
    dollar: 10,
    lever: 2,
    isReach: false,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/lever_3.svg`,
    point: 500,
    dollar: 50,
    lever: 3,
    isReach: false,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/lever_4.svg`,
    point: 1000,
    dollar: 100,
    lever: 4,
    isReach: false,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/lever_5.svg`,
    point: 5000,
    dollar: 500,
    lever: 5,
    isReach: false,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/lever_6.svg`,
    point: 10000,
    dollar: 1200,
    lever: 6,
    isReach: false,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/lever_7.svg`,
    point: 50000,
    dollar: 7000,
    lever: 7,
    isReach: false,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/lever_8.svg`,
    point: 100000,
    dollar: 16000,
    lever: 8,
    isReach: false,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/lever_9.svg`,
    point: 500000,
    dollar: 90000,
    lever: 9,
    isReach: false,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/lever_10.svg`,
    point: 1000000,
    dollar: 200000,
    lever: 10,
    isReach: false,
  },
]
