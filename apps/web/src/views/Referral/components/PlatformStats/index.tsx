/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { USD_DECIMALS } from 'config/constants/exchange'
import styled from 'styled-components'
import ColumnChartRef from './components/ColumnChartRef'
import { userClaimedHistories } from '../../../../services/referral'
import { formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'
import { useTranslation } from '@pancakeswap/localization'

interface IVolumnDataItem {
  volumn: string
  title: string
  svg: string
}
interface IListPoint {
  reward: number
  point: number
}
interface IPropsItem {
  volumnData?: IVolumnDataItem[]
  userClaimHistories?: any[]
  dataChart?: any[]
  minAmount?: string
  middleAmount?: string
  maxAmount?: string
  listPoint?: IListPoint[]
}

const Wrapper = styled(Box)`
  .first {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 20px;

    .chart_container {
      display: flex;
      & > div:first-child {
        margin-right: 20px;
      }
    }

    .info_volumn {
      display: flex;
      width: 100%;
      justify-content: space-between;
      gap: 17px;
      .info_volumn_item {
        padding: 16px 17px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 16px;
        width: 100%;
        // height: 126px;

        .volumn {
          font-weight: 700;
          font-size: 20px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.87);
          margin: 14px 0 8px;
        }

        .title {
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
    @media screen and (max-width: 900px) {
      flex-direction: column;
      .chart_container {
        width: 100%;
        justify-content: space-between;
      }
      .info_volumn {
        flex-direction: column;
        width: 100%;

        .info_volumn_item {
          margin: 16px 0px;
          width: 100%;
          display: grid;
          grid-template-columns: auto;
          height: fit-content;
          .volumn {
            font-size: 18px;
            line-height: 22px;
          }
          .title {
            font-size: 12px;
            line-height: 15px;
          }
        }
      }
    }
  }

  .second {
    margin-top: 20px;
  }

  .third {
    .range_volumn {
      display: flex;
      justify-content: space-between;
      margin: 19px 0 5px;
      span {
        font-weight: 400;
        font-size: 10px;
        line-height: 12px;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .fourth {
    .noted {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.6);

      span {
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.87);
      }

      @media screen and (max-width: 900px) {
        text-align: center;

        span {
          font-size: 18px;
          line-height: 22px;
        }
      }
    }
  }
`
const Line = styled.div`
  position: absolute;
  top: 56px;
  background: #444444;
  width: 99%;
  height: 1px;
  z-index: 99;
  @media screen and (max-width: 425px) {
    width: 97%;
  }
`
const StyledTable = styled.div`
  overflow-x: scroll;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  padding: 16px 16px 8px 16px;
  backdrop-filter: blur(10px);

  ::-webkit-scrollbar-corner {
    display: none;
  }
  .table {
    min-width: 700px;
    width: 100%;
    .table-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-right: 8px;

      /* p:first-child {
        width: 40%;
      } */
      p:last-child {
        text-align: end;
      }
      p {
        /* width: 25%; */
        font-size: 14px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.6);
        font-family: 'Inter';
      }
    }
    .table-row {
      width: 100%;
      max-height: 120px;
      overflow: scroll;
      padding-right: 8px;
      ::-webkit-scrollbar-corner {
        display: none;
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 8px 0;

        .no-item {
          color: rgba(255, 255, 255, 0.87);
          font-size: 14px;
          font-weight: 400;
          font-family: 'Inter';
          text-align: center;
          width: 100%;
        }

        /* .row-item:first-child {
          width: 40%;
        } */
        .row-item:last-child {
          p {
            text-align: end;
            width: 100%;
          }
        }
        .row-item {
          /* width: 25%; */
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .name,
          .code,
          .point {
            color: rgba(255, 255, 255, 0.87);
            font-size: 14px;
            font-weight: 400;
            font-family: 'Inter';
          }
        }
      }
    }
  }

  @media screen and (max-width: 786px) {
    .table .table-row .row .no-item {
      text-align: left;
      margin-left: 20px;
    }
  }
`

const PlatformStat = (props: IPropsItem): JSX.Element => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { listPoint, volumnData, dataChart, minAmount, middleAmount, maxAmount } = props
  const [userClaimHistories, setUserClaimHistories] = useState([])

  const mapPoint = (amount: number) => {
    const amountParse = new BigNumber(new BigNumber(amount).multipliedBy(100).div(99).toFixed()).toNumber()
    if (listPoint && listPoint.length > 0) {
      for (let i = 0; i < listPoint.length; i++) {
        if (listPoint[i].reward <= amountParse && amountParse < listPoint[i + 1].reward) {
          return listPoint[i].point.toString()
        }
      }
    }
    return ''
  }
  const getUserClaimedHistories = async () => {
    const result = await userClaimedHistories(chainId)
    if (result) {
      const histories = result.userClaimedHistories.map(async (item: any, idx: number) => {
        const mappingUser = await mapingHistories(item.address)
        const userAvatar = mappingUser?.avatar
        const point = new BigNumber(item.amount).div(10 ** USD_DECIMALS[chainId]).toNumber()
        const claim = new BigNumber(item.amount).div(10 ** USD_DECIMALS[chainId]).toNumber()
        return createData(
          idx + 1,
          userAvatar,
          mappingUser?.username,
          moment(item.date * 1000).format('DD/MM/YYYY hh:mm:ss'),
          mapPoint(point),
          claim,
        )
      })

      const lastResponse = await Promise.all(histories)
      setUserClaimHistories(
        lastResponse.sort((a, b) => {
          if (a.time !== b.time) return b.time - a.time

          return b.point - a.point
        }),
      )
    }
  }
  function createData(no: number, avatar: string, name: string, time: string, point: string, claim: number) {
    return { no, avatar, name, time, point, claim }
  }
  const mapingHistories = async (address: string) => {
    const payload = {
      wallets: [`${address}`],
    }
    const result: any = await axios
      .post(`${process.env.NEXT_PUBLIC_API}/users/address/mapping`, payload)
      .catch((error) => {
        console.warn(error)
      })
    const data = result?.data[0]
    return data
  }

  useEffect(() => {
    if (!chainId) return
    getUserClaimedHistories()
  }, [chainId])
  return (
    <Wrapper sx={{}}>
      <div className="first">
        <div className="info_volumn">
          {Array.from(volumnData).map((item) => {
            return (
              <div className="info_volumn_item" key={item.title}>
                <div>
                  <img src={item.svg} alt="item" />
                </div>
                <div className="volumn">{formatAmountNumber2(Number(item.volumn))}</div>
                <div className="title">{t(item.title)}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="second" style={{ position: 'relative' }}>
        {/* <TableContainer component={Paper} sx={{ height: '165px', background: '#0d0d0d', borderRadius: '16px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#0d0d0d' }}>
              <TableRow
                sx={{
                  '& td, & th': {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    fontWeight: 700,
                    fontSize: 14,
                    color: ' rgba(255, 255, 255, 0.6)',
                  },
                }}
              >
                <TableCell>No</TableCell>
                <TableCell align="left">User Name</TableCell>
                <TableCell style={{ minWidth: '190px' }} align="left">
                  Time
                </TableCell>
                <TableCell style={{ minWidth: '120px' }} align="left">
                  Point Level
                </TableCell>
                <TableCell style={{ minWidth: '155px' }} align="right">
                  Claimed Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userClaimHistories.map((row, index) => (
                <TableRow
                  key={`${row.name}_${index}`}
                  sx={{
                    '& td, & th': {
                      border: 0,
                      fontWeight: 400,
                      fontSize: 14,
                      color: ' rgba(255, 255, 255, 0.87)',
                      padding: '6px 16px',
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={row.avatar}
                      sx={{ marginRight: '8px', height: '24px', width: '24px' }}
                    />
                    <Tooltip title={row?.name}>
                      <p>
                        {row.name?.length > 9
                          ? `${row.name.substring(0, 7)}...${row.name.substring(row.name.length - 2)}`
                          : row.name}
                      </p>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">{row.time}</TableCell>
                  <TableCell align="left">{row.point} points</TableCell>

                  <TableCell align="right">
                    <span>$</span>
                    {new BigNumber(row.claim).multipliedBy(100).div(99).toFixed(0, BigNumber.ROUND_DOWN)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        <StyledTable>
          <div className="table">
            <div className="table-head">
              <p style={{ width: '5%' }}>{t('No')}</p>
              <p style={{ width: '30%' }}>{t('Username')}</p>
              <p style={{ width: '25%' }}>{t('Time')}</p>
              <p style={{ width: '20%' }}>{t('Point Level')}</p>
              <p style={{ width: '20%' }}>{t('Claimed Amount')}</p>
            </div>
            <div className="table-row">
              {userClaimHistories.length > 0 ? (
                [...userClaimHistories].map((row, index) => (
                  <div className="row" key={`${row.name}_${index}`}>
                    <div className="row-item" style={{ width: '5%' }}>
                      <p className="point">{index + 1}</p>
                    </div>
                    <div className="row-item" style={{ width: '30%' }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={row.avatar}
                        sx={{ marginRight: '8px', height: '24px', width: '24px' }}
                      />
                      <Tooltip title={row?.name}>
                        <p className="name">
                          {row.name?.length > 9
                            ? `${row.name.substring(0, 7)}...${row.name.substring(row.name.length - 2)}`
                            : row.name}
                        </p>
                      </Tooltip>
                    </div>
                    <div className="row-item" style={{ width: '25%' }}>
                      <p className="code">{row.time}</p>
                    </div>

                    <div className="row-item" style={{ width: '20%' }}>
                      <p className="point">{t('%num% points', { num: formatAmountNumber2(Number(row.point)) })}</p>
                    </div>
                    <div className="row-item" style={{ width: '20%' }}>
                      <p className="point">
                        $
                        {formatAmountNumber2(
                          Number(new BigNumber(row.claim).multipliedBy(100).div(99).toFixed(0, BigNumber.ROUND_DOWN)),
                        )}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="row">
                  <div className="no-item">{t('No Transactions')}</div>
                </div>
              )}
            </div>
          </div>
        </StyledTable>
      </div>

      <div className="third" style={{ marginTop: '30px' }}>
        {/* <div className="range_volumn">
          <span className="min">{minAmount}</span>
          <span className="middle">{middleAmount}</span>
          <span className="max">{maxAmount}</span>
        </div> */}
        <ColumnChartRef data={dataChart} />
      </div>

      <div className="fourth">
        <p className="noted">{t('Daily reward points generated by users')}</p>
      </div>
    </Wrapper>
  )
}

export default PlatformStat
