/* eslint-disable consistent-return */
import { useTranslation } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { RoundInfo } from 'views/Vesting'
import CountDown from '../../CountDown'
import { TOKEN_IN_ROUND } from '../PricingInfo'

const Wrapper = styled.div`
  border-radius: 20px;
  position: relative;
  width: fit-content;
  height: 100%;
  margin: auto;

  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }
  .notice {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    margin-top: 12px;
    margin-bottom: 47px;
  }

  .notice_after {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    margin-top: 12px;
  }

  .percent_sale {
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
  }

  .processing {
    height: 12px;
    width: 350px;
    max-width: 100%;
    background: #d9d9d9;
    border-radius: 20px;
    margin-bottom: 17px;
    position: relative;
    border: 1px solid #d9d9d9;
    overflow: hidden;
  }

  .processing_child {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    height: 100%;
    background: #131313;
    border-radius: 20px;
  }

  @media screen and (max-width: 1200px) {
    .title {
      font-size: 16px;
      line-height: 24px;
    }

    .notice {
      font-size: 14px;
      line-height: 17px;
      margin-top: 10px;
      margin-bottom: 24px;
    }

    .notice_after {
      font-size: 14px;
      line-height: 17px;
      margin-top: 10px;
    }

    .processing {
      font-size: 14px;
      line-height: 17px;
      height: 9px;
      margin: auto;
      margin-bottom: 20px;
    }

    .percent_sale {
      font-size: 14px;
      line-height: 17px;
    }

    .processing_child {
      height: 100%;
    }
  }

  @media screen and (max-width: 560px) {
    .processing {
      height: 9px;
      width: 290px;
      max-width: 100%;
      margin-bottom: 20px;
    }
  }
`

interface IProps {
  currentRound: number
  infoRoundOne: RoundInfo
  infoRoundTow: RoundInfo
  infoRoundThree: RoundInfo
  totalXOXTokenInRound: number | string
  isInTimeRangeSale: boolean
  setReachZero: (isReach: boolean) => void
  reacheZero: boolean
  oneHourBeforeStart?: number
  setisReachWhitelist: (reach: boolean) => void
}

const now = new Date()
const timeStampOfNow = now.getTime()

function StartingSoon({
  infoRoundOne,
  infoRoundTow,
  infoRoundThree,
  totalXOXTokenInRound,
  currentRound,
  isInTimeRangeSale,
  reacheZero,
  setReachZero,
  setisReachWhitelist,
}: IProps) {
  const { t } = useTranslation()
  const [timeNow, setTimeNow] = useState(timeStampOfNow)

  const isNotSetDataForAll = !infoRoundOne.endDate && !infoRoundTow.endDate && !infoRoundThree.endDate
  const preVid = document.getElementById('presaleVideo') as any

  useEffect(() => {
    if (!preVid) return
    preVid.play()
  }, [preVid])

  const handleReturnPercent = useMemo(() => {
    switch (currentRound) {
      case 1: {
        const percent = new BigNumber(totalXOXTokenInRound)
          .multipliedBy(100)
          .dividedBy(TOKEN_IN_ROUND.ROUND_ONE)
          .toNumber()
        return (
          <>
            <p className="percent_sale">
              {`${Number(percent).toFixed(2)}%`} {t('SOLD')}
            </p>
            <div className="processing">
              <div className="processing_child" style={{ width: `${Number(percent).toFixed(2)}%` }} />
            </div>
          </>
        )
      }

      case 2: {
        const percent = new BigNumber(totalXOXTokenInRound)
          .multipliedBy(100)
          .dividedBy(TOKEN_IN_ROUND.ROUND_TOW)
          .toNumber()
        return (
          <>
            <p className="percent_sale">
              {`${Number(percent).toFixed(2)}%`} {t('SOLD')}
            </p>
            <div className="processing">
              <div className="processing_child" style={{ width: `${Number(percent).toFixed(2)}%` }} />
            </div>
          </>
        )
      }

      case 3: {
        const percent = new BigNumber(totalXOXTokenInRound)
          .multipliedBy(100)
          .dividedBy(TOKEN_IN_ROUND.ROUND_THREE)
          .toNumber()
        return (
          <>
            <div className="percent_sale">
              <p className="percent_sale">
                {`${Number(percent).toFixed(2)}%`} {t('SOLD')}
              </p>
            </div>
            <div className="processing">
              <div className="processing_child" style={{ width: `${Number(percent).toFixed(2)}%` }} />
            </div>
          </>
        )
      }
      default:
        break
    }
  }, [totalXOXTokenInRound, currentRound])

  const handleCountdownArg = (startDate: number) => {
    return <CountDown startTime={startDate} setReachZero={setReachZero} setisReachWhitelist={setisReachWhitelist} />
  }

  const handleRenderCountdown = (time: number) => {
    if (time < infoRoundOne.startDate) {
      return handleCountdownArg(infoRoundOne.startDate)
    }

    if (infoRoundOne.startDate < time && time < infoRoundOne.endDate) {
      return handleCountdownArg(infoRoundOne.endDate)
    }

    if (infoRoundTow.startDate && time >= infoRoundOne.endDate && time < infoRoundTow.endDate) {
      if (infoRoundOne.endDate <= time && time < infoRoundTow.startDate) {
        return handleCountdownArg(infoRoundTow.startDate)
      }

      if (infoRoundTow.startDate <= time && time < infoRoundTow.endDate) {
        return handleCountdownArg(infoRoundTow.endDate)
      }
    }
    if (infoRoundThree.startDate && time >= infoRoundTow.endDate && time <= infoRoundThree.endDate) {
      if (infoRoundTow.endDate <= time && time < infoRoundThree.startDate) {
        return handleCountdownArg(infoRoundThree.startDate)
      }

      if (infoRoundThree.startDate <= time && time < infoRoundThree.endDate) {
        return handleCountdownArg(infoRoundThree.endDate)
      }
    }

    if (infoRoundThree.endDate && infoRoundThree.endDate <= time) {
      return (
        <>
          <p className="title">{t('XOX Token pre-sale has Ended')}</p>
        </>
      )
    }
  }

  useEffect(() => {
    if (reacheZero) {
      // eslint-disable-next-line no-unused-expressions
      const timeStampAtNow = Date.now()
      setTimeNow(timeStampAtNow)
    }
    const id = setTimeout(() => setReachZero(false), 5000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reacheZero])

  return (
    <Wrapper>
      {handleReturnPercent}
      {!isNotSetDataForAll && handleRenderCountdown(timeNow)}
    </Wrapper>
  )
}

export default StartingSoon
