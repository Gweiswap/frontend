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
    width: 107px;
    height: 88px;
    border: 3px solid rgb(255, 252, 221);
    border-radius: 20px;
    position: relative;
    &::before {
      top: -5px;
      left: -5px;
      bottom: -5px;
      right: -5px;
      display: block;
      content: '';
      width: 107px;
      height: 88px;
      position: absolute;
      border: 6px solid #ff701f;
      filter: blur(10px);
      border-radius: 20px;
      /* overflow: hidden; */
      z-index: -1;
    }

    &::after {
      top: -5px;
      left: -5px;
      display: block;
      content: '';
      width: 107px;
      height: 88px;
      position: absolute;
      border: 9px solid #ff701f;
      filter: blur(10px);
      border-radius: 20px;
      /* overflow: hidden; */
      z-index: -1;
    }
  }

  .item_border {
    width: 130px;
    height: 98px;
    border: 8px solid #ff701f;
    filter: blur(12px);
    border-radius: 20px;
    position: absolute;
    top: -5px;
    left: -5px;
  }

  .time_item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    color: rgba(255, 255, 255, 0.87);
  }

  .two_dot {
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    color: #ffffff;
    margin: 0px 24px;
    padding-top: 25px;
  }

  .title_time {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 20px;
  }

  @media screen and (max-width: 900px) {
    .blur {
      width: 54px;
      height: 49.56px;
      border: 2px solid rgb(255, 252, 221);
      border-radius: 14px;
      position: relative;

      &::before {
        width: 63px;
        height: 56.56px;
        filter: blur(5px);
        border: 4px solid #ff701f;
      }

      &::after {
        width: 63px;
        height: 56.56px;
        filter: blur(5px);
        border: 4px solid #ff701f;
      }
    }

    .item_border {
      width: 54px;
      height: 49.56px;
      border: 8px solid #ff701f;
      filter: blur(12px);
      border-radius: 20px;
      position: absolute;
      top: -5px;
      left: -5px;
    }

    .time_item {
      font-size: 16px;
      line-height: 19px;
    }

    .title_time {
      font-size: 12px;
      line-height: 15px;
      margin-top: 14px;
    }

    .two_dot {
      font-size: 16px;
      margin-top: -23px !important;
      margin: 0px 10px;
    }
  }
`

interface Props {
  startTime: any
  setReachZero?: (isReach: boolean) => void
  oneHourBeforeStart?: number
  setisReachWhitelist?: (reach: boolean) => void
}

export const handleTime = (time: number) => {
  return time < 10 ? `0${time}` : time
}

// const timeStart = 1665892723
const CountDown = ({ startTime, setReachZero, setisReachWhitelist }: Props) => {
  const { t } = useTranslation()
  const [timeList, setTimeList] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const timeStart = Math.floor(new Date(startTime).getTime()) / 1000

  const NOW = Date.now() / 1000
  const periodTime = Math.floor(timeStart - NOW)

  const handleCountDown = () => {
    const days = Math.floor(periodTime / (3600 * 24))
    const hours = Math.floor((periodTime - days * 3600 * 24) / 3600)
    const minutes = Math.floor((periodTime % 3600) / 60)
    const seconds = periodTime - days * 3600 * 24 - hours * 3600 - minutes * 60
    setTimeList({ ...timeList, days, hours, minutes, seconds })
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (Math.floor(periodTime) >= 0) {
      const refreshInterval = setInterval(handleCountDown, 1000)
      return () => clearInterval(refreshInterval)
    }
    const timeStampAtNow = Date.now()

    if (setReachZero) {
      if (timeStampAtNow >= startTime) {
        setReachZero(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeList, timeStart, setReachZero, setisReachWhitelist])

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
