/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Box, Grid } from '@mui/material'
import { ChainId } from '@pancakeswap/sdk'
import { USD_DECIMALS } from 'config/constants/exchange'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getUerRank, getUserPointDaily, getUserPointMonthly, getUserPointWeekly } from 'services/referral'
import styled from 'styled-components'
import axios from 'axios'
import LeaderBoardItemLP from 'views/Referral/components/LearderBoardItemForLandingPage'
import { filterChain, FilterChain, filterTime, FilterTime, ListRankingByChain } from 'views/Referral'
import { GridLoader } from 'react-spinners'
import { ColumnCenter } from 'components/Layout/Column'
import { useTranslation } from '@pancakeswap/localization'
import { useTooltip } from '@pancakeswap/uikit'

export interface IItemLeaderBoard {
  name: string
  point: string
  avatar: string
  rank: number
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

const Wrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 64px;
  margin-top: 100px;

  .leader_board {
    width: 689px;
    height: 529px;
    background: linear-gradient(100.7deg, rgba(96, 52, 255, 0.1) 0%, rgba(163, 90, 255, 0.1) 100%);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid #a35aff;
    padding: 32px;
  }

  .title_ref {
    font-weight: 700;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.87);

    @media screen and (max-width: 900px) {
      font-size: 20px;
      line-height: 32px;
    }
  }

  .ref_container {
  }

  .list {
    margin-bottom: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    row-gap: 16px;

    .icon_stone {
      margin-right: 16px;
    }

    p {
      display: flex;
      align-items: center;
    }

    @media screen and (max-width: 900px) {
      grid-template-columns: 0.75fr 1fr;
    }

    @media screen and (max-width: 370px) {
      grid-template-columns: 1fr;
    }
  }
  .title_list_item {
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.6);
    @media screen and (max-width: 900px) {
      font-size: 16px;
    }
  }

  .btn_join {
    padding: 16px 40px;
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
    border: none;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    border-radius: 12px;
    cursor: pointer;

    &:hover {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    }

    @media screen and (max-width: 900px) {
      padding: 12px 30px;
      font-size: 16px;
    }
  }

  .lead_board_container {
    @media screen and (max-width: 900px) {
      display: flex;
      justify-content: center;
    }
  }

  @media screen and (max-width: 900px) {
    margin-top: 16px;
  }
`

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  line-height: 32px;
  margin: 24px 0px;

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 24px;
  }
`

const First = styled.div`
  width: 100%;
  height: 100%;
  // background: linear-gradient(100.7deg, rgba(96, 52, 255, 0.1) 0%, rgba(163, 90, 255, 0.1) 100%);
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 24px;
  position: relative;

  @media screen and (max-width: 900px) {
    padding: 19px;
  }

  .tab_filter {
    display: flex;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    align-items: center;
    color: #ffffff;

    .tab_item {
      padding: 10px 20px;
    }

    .tab_item.active,
    .tab_item:hover {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      border-radius: 8px;
    }

    @media screen and (max-width: 900px) {
      font-size: 12px;
      line-height: 15px;
      .tab_item {
        padding: 8px;
      }
    }
  }

  .learder_board {
    margin-top: 16px;
  }

  .dot {
    display: flex;
    justify-content: center;
    gap: 3px;
    margin-bottom: 18px;

    .dot_item {
      background: #fb8618;
      border: 2px solid #fb8618;
      border-radius: 50%;
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(0deg, rgba(184, 9, 181, 0) 0%, rgba(237, 28, 81, 1) 80%, rgba(255, 176, 0, 1) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }
`

const WrapperLeft = styled.div``

const Container = styled(Box)`
  // background: linear-gradient(#6034ff, #a35aff, #111111);
  padding: 1px;
  border-radius: 20px;
`

const Overlay = styled(Box)`
  background: #111111;
  border-radius: 20px;
`

const NoDataWraper = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
`

const FilterChainWrapper = styled.div`
  display: flex;
  justify-content: center;

  .tab_filter_chain_container {
    display: flex;
    padding: 3px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 30px;
    margin-bottom: 35px;
    .filter_chain {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      padding: 12px 30px;
    }

    .filter_chain.active,
    .filter_chain:hover {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      border-radius: 30px;
    }

    @media screen and (max-width: 900px) {
      margin-bottom: 24px;
      .filter_chain {
        padding: 12px 19.5px;
      }

      .filter_chain_active {
        padding: 12px 19.5px;
      }
    }
  }
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 14px 0 34px 0;
`

const defaultListRankingByChain: ListRankingByChain = {
  General: [],
  Ethereum: [],
  BSC: [],
}

type FunctionList = {
  [key in typeof filterTime[number]]: [ListRankingByChain, (func: ListRankingByChain) => void]
}

const FeatureReferal = () => {
  const { t } = useTranslation()
  const startOfDay = moment().startOf('days').toString()
  const startOfMonth = moment().startOf('month').toString()
  const startOfWeek = moment().startOf('isoWeek').toString()
  const [tabLeaderBoard, setTabLeaderBoard] = useState<FilterTime>('All Time')
  const [tabChainLeaderBoard, setTabChainLeaderBoard] = useState<FilterChain>('General')
  const [listUserRanks, setListUserRanks] = useState<ListRankingByChain>()

  /// forBSC
  const [listUserRanksDaily, setListUserRanksDaily] = useState<ListRankingByChain>()
  const [listUserRanksWeekly, setListUserRanksWeekly] = useState<ListRankingByChain>()
  const [listUserRanksMonthly, setListUserRanksMonthly] = useState<ListRankingByChain>()
  const [listUserRanksAllTime, setListUserRanksAllTime] = useState<ListRankingByChain>()

  const functionList: FunctionList = useMemo(() => {
    return {
      'All Time': [listUserRanksAllTime, setListUserRanksAllTime],
      Monthly: [listUserRanksMonthly, setListUserRanksMonthly],
      Weekly: [listUserRanksWeekly, setListUserRanksWeekly],
      Daily: [listUserRanksDaily, setListUserRanksDaily],
    }
  }, [])

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

  const handleGetUserRanks = async (
    typeFilterChain: FilterChain,
    typeFilter: FilterTime,
    list: ListRankingByChain,
    setList: (arr: ListRankingByChain) => void,
  ) => {
    try {
      // for General
      let userPointBSC: any
      let userPointETH: any

      // TODO: fix to production
      const chainEthId = ChainId.GOERLI
      const chainBscId = ChainId.BSC_TESTNET

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
          const dataFormatETH = handleFormatData('Ethereum', dataUserPointETH)
          const dataFormatBSC = handleFormatData('BSC', dataUserPointBSC)
          dataUserFormatAmount = combineFormatData(dataFormatETH, dataFormatBSC)
          break
        case 'BSC':
        case 'Ethereum':
          const data = typeFilterChain === 'BSC' ? dataUserPointBSC : dataUserPointETH
          dataUserFormatAmount = handleFormatData(typeFilterChain, data)
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
    } catch (error) {
      setListUserRanks(defaultListRankingByChain)
    }
  }

  const handleFormatData = (filter: string, data: any[]) => {
    return data.map((item) => {
      return {
        ...item,
        id: item.id,
        point: new BigNumber(item.amount)
          .div(10 ** USD_DECIMALS[filter === 'BSC' ? ChainId.BSC_TESTNET : ChainId.GOERLI])
          .toNumber(),
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

    await handleGetUserRanks(tabChainLeaderBoard, item, functionList[item][0], functionList[item][1])
  }

  const handleOnChangeChainTab = async (item: FilterChain) => {
    setTabChainLeaderBoard(item)
    setListUserRanks(functionList[tabLeaderBoard][0])
    await handleGetUserRanks(item, tabLeaderBoard, functionList[tabLeaderBoard][0], functionList[tabLeaderBoard][1])
  }

  const renderListUserRank = useMemo(() => {
    // return <NoDataWraper>{t('Coming Soon')}</NoDataWraper>

    if (!listUserRanks) {
      return (
        <NoDataWraper>
          <ConfirmedIcon>
            <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
          </ConfirmedIcon>
        </NoDataWraper>
      )
    }
    if (listUserRanks[tabChainLeaderBoard].length === 0) {
      return <NoDataWraper>{t('No Data')}</NoDataWraper>
    }
    return (
      <>
        {listUserRanks[tabChainLeaderBoard]?.slice(0, 5).map((item: IMappingFormat, index: number) => {
          // eslint-disable-next-line react/no-array-index-key
          return <LeaderBoardItemLP item={item} key={`learder_item_${index}`} />
        })}
      </>
    )
  }, [listUserRanks, tabChainLeaderBoard, t])

  useEffect(() => {
    handleGetUserRanks('General', 'All Time', listUserRanksAllTime, setListUserRanksAllTime)
  }, [])

  return (
    <Wrapper sx={{ flexGrow: 1, display: 'flex' }}>
      <Grid container spacing={2} style={{ overflow: 'hidden' }}>
        <Grid item xs={12} md={5}>
          <WrapperLeft data-aos="fade-right">
            <Container>
              <Overlay>
                <First>
                  <FilterChainWrapper>
                    <div className="tab_filter_chain_container">
                      {filterChain.map((item) => {
                        return (
                          <div
                            key={item}
                            className={tabChainLeaderBoard === item ? 'filter_chain active' : 'filter_chain'}
                            onClick={() => handleOnChangeChainTab(item)}
                            role="button"
                          >
                            {t(item)}
                          </div>
                        )
                      })}
                    </div>
                  </FilterChainWrapper>
                  <div className="tab_filter">
                    {Array.from(filterTime).map((item) => {
                      return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <div
                          key={item}
                          onClick={() => handleOnChangeRankTab(item)}
                          className={tabLeaderBoard === item ? 'tab_item active' : 'tab_item'}
                          style={{ cursor: 'pointer' }}
                        >
                          {t(item)}
                        </div>
                      )
                    })}
                  </div>

                  <div className="learder_board">{renderListUserRank}</div>
                </First>
              </Overlay>
            </Container>
          </WrapperLeft>
        </Grid>
        <Grid item xs={12} md={1} />
        <Grid item xs={12} md={6}>
          <div className="ref_container" data-aos="fade-left">
            <p className="title_ref">
              {t('Gamified Referral Program')}
              <span style={{ color: '#FB8618' }}>.</span>
            </p>
            <Paragraph className="description">
              {t(
                'The XOX Gamified Referral Program is a unique incentive system that rewards both referees and referrers with USDT/USDC points for successful referrals. The program is designed to boost community engagement through gamification, with different levels and milestones that unlock greater rewards. By participating in our referral program, users can earn passive income while supporting the growth of the XOX Labs ecosystem.',
              )}
            </Paragraph>
            <div className="list">
              {listTag.map(({ title }) => {
                return (
                  <p key={title}>
                    <span>
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/icon-stone.svg`}
                        alt="icon-stone"
                        className="icon_stone"
                      />
                    </span>
                    <span className="title_list_item">{t(title)}</span>
                  </p>
                )
              })}
            </div>

            <a href="/referral" target="_blank">
              <button className="btn_join">{t('Join Now')}</button>
            </a>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

const listTag = [
  {
    title: 'Connect',
  },
  {
    title: 'Refer',
  },
  {
    title: 'Earn Points',
  },
  {
    title: 'Level Up',
  },
  {
    title: 'Claim',
  },
  {
    title: 'Get USDT/USDC',
  },
]

export default FeatureReferal
