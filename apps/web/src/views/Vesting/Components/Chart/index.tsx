import { useTranslation } from '@pancakeswap/localization'
import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import { USD_DECIMALS } from 'config/constants/exchange'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getRaiseDailies } from 'services/presale'
import styled from 'styled-components'
import { timeStampOfNow } from 'views/Vesting'
import { useGetDataChartPreSale, useGetDataChartPreSaleAfter } from 'views/Vesting/hooks'
import ChartColumnSale from './ChartColumnSale'

const Wrapper = styled.div`
  position: relative;
  border-radius: 20px;
  margin-bottom: 40px;
  padding: 28px 64px;

  background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/ngu.png);
  background-repeat: no-repeat;
  height: 276px;
  background-size: contain;
  position: relative;

  .fake_blur {
    position: absolute;
    height: 194px;
    backdrop-filter: blur(10px);
    z-index: -1;
    bottom: 27px;
    left: 1px;
    right: 2px;
    border-radius: 20px !important;
  }
  #trapezoid {
    border-top: 53px solid transparent;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    background: transparent;
    height: 0;
    width: 166px;
    position: absolute;
    left: 50%;
    backdrop-filter: blur(10px);
    z-index: -1;
    top: 2px;
    border-radius: 25px;
  }

  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 1200px) {
    padding: 15px 22px 24px;
    height: 270px;
    margin-bottom: 20px;
    background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/char_bg_image.png);
    background-size: 100% 253px;

    .title {
      font-size: 16px;
      line-height: 24px;
      padding-top: 0px;
    }

    .fake_blur {
      position: absolute;
      height: 208px;
      bottom: 16px;
      border-radius: 20px !important;
    }
  }
`

interface IProps {
  infoRoundOne: any
}

const startDate = new Date()
startDate.setDate(startDate.getDate() - 14)
startDate.setHours(0, 0, 0, 0)
const endDate = new Date()
endDate.setHours(23, 59, 59, 999)
const time = {
  from: moment(startDate).unix(),
  to: moment(endDate).unix(),
}

function ChartSalePage({ infoRoundOne }: IProps) {
  const { t } = useTranslation()
  const [dataChart, setDataChart] = useState([])
  const [dataChartFifteenDay, setDataChartFifteenDay] = useState([])

  const isAfterFifteenDayAfterSaleOne = useMemo(() => {
    if (!infoRoundOne.startDate) return null
    const timeInit = moment.unix(infoRoundOne.startDate).add(14, 'days').unix()
    return timeStampOfNow < timeInit * 1000
  }, [infoRoundOne])

  const dateOfStartSaleOne = useMemo(() => {
    if (!infoRoundOne.startDate) return null
    return new Date(infoRoundOne.startDate)
  }, [infoRoundOne])

  const dataChartPreSale = useGetDataChartPreSale(time)
  function createDataChartDay(name: string, uv: number) {
    return { name, uv }
  }

  const getPointDataDays = (result: any, callBack: (data: any) => void, fromDate: any, toDate: any) => {
    try {
      if (result && result.raiseDailies && result.raiseDailies.length > 0) {
        const arr = Array.from(result.raiseDailies).map((item: any) => {
          return {
            ...item,
            id: String(item?.id).split('-')[1],
          }
        })
        const chartData = createArray(fromDate, toDate, arr)
        const data = chartData.map((item: any) => {
          const amount = new BigNumber(item.amount).div(10 ** 6).toNumber()
          return createDataChartDay(moment(item.date * 1000).format('DD MMM'), amount)
        })
        callBack(data)
      }
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
      dataByDay.amount = findData ? findData.volumeUSD : 0
      chartData.push(dataByDay)
    }
    return chartData
  }

  useEffect(() => {
    getPointDataDays(dataChartPreSale, setDataChart, startDate, endDate)
    if (!dateOfStartSaleOne) return
    const startDateFifteenDayAfterSaleOne = new Date(dateOfStartSaleOne)
    startDateFifteenDayAfterSaleOne.setHours(0, 0, 0, 0)
    const end = new Date(dateOfStartSaleOne)
    const endDateFifteenDayAfterSaleOne = new Date(end.setDate(end.getDate() + 14))
    endDateFifteenDayAfterSaleOne.setHours(23, 59, 59, 999)
    getPointDataDays(
      dataChartPreSale,
      setDataChartFifteenDay,
      startDateFifteenDayAfterSaleOne,
      endDateFifteenDayAfterSaleOne,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChartPreSale, dateOfStartSaleOne])

  return (
    <Wrapper>
      <div className="fake_blur" />
      <p className="title">{t('Daily Raise')}</p>
      {typeof isAfterFifteenDayAfterSaleOne === 'boolean' && isAfterFifteenDayAfterSaleOne ? (
        <ChartColumnSale data={dataChartFifteenDay} />
      ) : (
        <ChartColumnSale data={dataChart} />
      )}
    </Wrapper>
  )
}

export default ChartSalePage
