import { useTranslation } from '@pancakeswap/localization'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from './bg.svg'

const CountDownWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  div {
    color: white;
  }

  .blur {
    position: relative;
    width: 64px;
    height: 64px;

    .bg-1 {
      position: absolute;
      width: 64px;
      height: 64px;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      border: 6px solid #ffffff;
      filter: blur(5px);
      border-radius: 20px;
      z-index: 2;
    }

    .bg-2 {
      position: absolute;
      width: 62px;
      height: 62px;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      background: #0d0d0d;
      border: 3px solid #ffffff;
      border-radius: 20px;
      z-index: 1;
    }

    .bg-3 {
      position: absolute;
      width: 64px;
      height: 64px;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      background: #ffffff;
      border: 6px solid rgba(255, 255, 255, 0.6);
      filter: blur(1.5px);
      border-radius: 20px;
      z-index: 0;
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
    font-size: 24px;
    line-height: 29px;
    z-index: 2;
    display: flex;
    align-items: center;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }

  .two_dot {
    font-weight: 700;
    font-size: 36px;
    line-height: 64px;
    color: #ffffff;
    margin: 0px 9px;
    position: relative;
  }

  .title_time {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 14px;
  }

  @media screen and (max-width: 560px) {
    .blur {
      position: relative;
      width: 56px;
      height: 56px;

      .bg-1 {
        position: absolute;
        width: 56px;
        height: 56px;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        border: 6px solid #ffffff;
        filter: blur(5px);
        border-radius: 20px;
        z-index: 2;
      }

      .bg-2 {
        position: absolute;
        width: 54px;
        height: 54px;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        background: #0d0d0d;
        border: 3px solid #ffffff;
        border-radius: 20px;
        z-index: 1;
      }

      .bg-3 {
        position: absolute;
        width: 56px;
        height: 56px;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        background: #ffffff;
        border: 6px solid rgba(255, 255, 255, 0.6);
        filter: blur(1.5px);
        border-radius: 20px;
        z-index: 0;
      }
    }

    .item_border {
      width: 56px;
      height: 49.56px;
      border: 8px solid #ff701f;
      filter: blur(12px);
      border-radius: 20px;
      position: absolute;
      top: -5px;
      left: -5px;
    }

    .time_item {
      font-size: 24px;
      line-height: 29px;
    }

    .title_time {
      font-size: 14px;
      line-height: 24px;
      margin-top: 14px;
    }

    .two_dot {
      margin-top: 14px;
      font-size: 24px;
      line-height: 29px;
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
          <div className="bg-1" />
          <div className="bg-2" />
          <div className="bg-3" />
          <div className="time_item">{handleTime(timeList.days)}</div>
        </div>
        <div className="title_time">{t('Days')}</div>
      </div>
      <span className="two_dot">:</span>
      <div>
        <div className="blur">
          <div className="bg-1" />
          <div className="bg-2" />
          <div className="bg-3" />
          <div className="time_item">{handleTime(timeList.hours)}</div>
        </div>
        <div className="title_time">{t('Hours')}</div>
      </div>
      <span className="two_dot">:</span>
      <div>
        <div className="blur">
          <div className="bg-1" />
          <div className="bg-2" />
          <div className="bg-3" />
          <div className="time_item">{handleTime(timeList.minutes)}</div>
        </div>
        <div className="title_time">{t('Minutes')}</div>
      </div>
      <span className="two_dot">:</span>
      <div>
        <div className="blur">
          <div className="bg-1" />
          <div className="bg-2" />
          <div className="bg-3" />
          <div className="time_item">{handleTime(timeList.seconds)}</div>
        </div>
        <div className="title_time">{t('Seconds')}</div>
      </div>
    </CountDownWrapper>
  )
}

export default CountDown
