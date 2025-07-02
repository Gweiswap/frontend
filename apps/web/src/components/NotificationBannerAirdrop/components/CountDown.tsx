/* eslint-disable consistent-return */
import { useTranslation } from '@pancakeswap/localization'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const CountDownWrapper = styled.div`
  display: flex;
  justify-content: center;

  div {
    color: white;
  }

  .blur {
    width: 65px;
    height: 65px;
    border: 3px solid #ffffff;
    border-radius: 20px;
    position: relative;
    &::before {
      top: -2px;
      left: -2px;
      display: block;
      content: '';
      width: 65px;
      height: 65px;
      position: absolute;
      border: 6px solid #ffffff;
      filter: blur(5px);
      border-radius: 20px;
      z-index: -1;
    }

    &::after {
      top: -2px;
      left: -2px;
      display: block;
      content: '';
      width: 65px;
      height: 65px;
      position: absolute;
      border: 9px solid #ffffff;
      filter: blur(10px);
      border-radius: 20px;
      z-index: -1;
    }
  }

  .time_item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: rgba(255, 255, 255, 0.87);
  }

  .two_dot {
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    color: #ffffff;
    margin: 0px 24px;
    padding-top: 9px;
  }

  .title_time {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 14px;
  }

  @media screen and (max-width: 900px) {
    .blur {
      width: 55px;
      height: 55px;
      border: 3px solid #ffffff;
      border-radius: 14px;
      position: relative;

      &::before {
        width: 55px;
        height: 55px;
        filter: blur(5px);
        border: 4px solid #ffffff;
      }

      &::after {
        width: 55px;
        height: 55px;
        filter: blur(5px);
        border: 4px solid #ffffff;
      }
    }

    .time_item {
      font-size: 16px;
      line-height: 19px;
    }

    .title_time {
      margin-top: 14px;
      font-size: 14px;
      line-height: 24px;
    }

    .two_dot {
      font-size: 16px;
      margin-top: -4px !important;
      margin: 0px 10px;
    }
  }
`

interface Props {
  endTime: number
  stop: boolean
}

export const handleTime = (time: number) => {
  return time < 10 ? `0${time}` : time
}

function CountDown({ endTime, stop }: Props) {
  const { t } = useTranslation()
  const [timeList, setTimeList] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const timeStart = Math.floor(new Date(endTime).getTime()) / 1000

  const NOW = stop ? 1688734800 : Date.now() / 1000
  const periodTime = Math.floor(timeStart - NOW)

  const handleCountDown = () => {
    const days = Math.floor(periodTime / (3600 * 24))
    const hours = Math.floor((periodTime - days * 3600 * 24) / 3600)
    const minutes = Math.floor((periodTime % 3600) / 60)
    const seconds = periodTime - days * 3600 * 24 - hours * 3600 - minutes * 60
    setTimeList({ ...timeList, days, hours, minutes, seconds })
  }

  useEffect(() => {
    if (stop) return
    if (Math.floor(periodTime) >= 0) {
      const refreshInterval = setInterval(handleCountDown, 1000)

      return () => clearInterval(refreshInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeList, timeStart])

  useEffect(() => {
    handleCountDown()
  }, [])

  return (
    <CountDownWrapper>
      <div>
        <div className="blur">
          <div className="time_item">{handleTime(timeList.days)}</div>
        </div>
        <div className="title_time">{t('Days')}</div>
      </div>
      <span className="two_dot">:</span>
      <div>
        <div className="blur">
          <div className="time_item">{handleTime(timeList.hours)}</div>
        </div>
        <div className="title_time">{t('Hours')}</div>
      </div>
      <span className="two_dot">:</span>
      <div>
        <div className="blur">
          <div className="time_item">{handleTime(timeList.minutes)}</div>
        </div>
        <div className="title_time">{t('Minutes')}</div>
      </div>
      <span className="two_dot">:</span>
      <div>
        <div className="blur">
          <div className="time_item">{handleTime(timeList.seconds)}</div>
        </div>
        <div className="title_time">{t('Seconds')}</div>
      </div>
    </CountDownWrapper>
  )
}

export default CountDown
