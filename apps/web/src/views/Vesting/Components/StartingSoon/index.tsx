/* eslint-disable consistent-return */
import { useTranslation } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { RoundInfo } from 'views/Vesting'
import CountDown from '../CountDown'
import { TOKEN_IN_ROUND } from '../PricingInfo'

const Wrapper = styled.div`
  padding: 24px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  position: relative;
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
    text-align: center;
    margin-top: 27px;
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.87);
  }

  .processing {
    height: 10px;
    width: 100%;
    background: transparent;
    box-shadow: 0px 4px 20px rgba(255, 112, 31, 0.5);
    border-radius: 20px;
    overflow: hidden;
  }

  .processing_child {
    height: 100%;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    border-radius: inherit;
  }

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-left: 1px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-right: 1px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .rocket_container {
    display: flex;
    justify-content: center;
    width: 500px;
    margin: auto;
    video {
      max-width: 100% !important;
      height: auto;
      display: block;
      margin-top: 20px;
    }
  }

  @media screen and (max-width: 900px) {
    padding: 24px 18px;

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
      height: 6px;
    }

    .percent_sale {
      font-size: 14px;
      line-height: 17px;
    }

    .processing_child {
      height: 100%;
    }

    .rocket_container {
      width: 100%;
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
      return (
        <>
          <p className="title">{t('New sale will start soon')}</p>
          <p className="notice">
            {t('Sale 1 will start on')} {moment.unix(infoRoundOne.startDate / 1000).format('DD/MM/YYYY')}.
          </p>
          {handleCountdownArg(infoRoundOne.startDate)}
        </>
      )
    }
    if (infoRoundOne.startDate < time && time < infoRoundOne.endDate) {
      return (
        <>
          <p className="title">{t('XOX TOKEN SALE IS LIVE!')}</p>
          <p className="notice">
            {t('Sale 1 will end on')} {moment.unix(infoRoundOne.endDate / 1000).format('DD/MM/YYYY')}.
          </p>
          {handleCountdownArg(infoRoundOne.endDate)}
        </>
      )
    }

    if (infoRoundTow.startDate && time >= infoRoundOne.endDate && time < infoRoundTow.endDate) {
      if (infoRoundOne.endDate <= time && time < infoRoundTow.startDate) {
        return (
          <>
            <p className="title">{t('New sale will start soon')}</p>
            <p className="notice">
              {t('Sale 2 will start on')} {moment.unix(infoRoundTow.startDate / 1000).format('DD/MM/YYYY')}.
            </p>
            {handleCountdownArg(infoRoundTow.startDate)}
          </>
        )
      }

      if (infoRoundTow.startDate <= time && time < infoRoundTow.endDate) {
        return (
          <>
            <p className="title">{t('XOX TOKEN SALE IS LIVE!')}</p>
            <p className="notice">
              {t('Sale 2 will end on')} {moment.unix(infoRoundTow.endDate / 1000).format('DD/MM/YYYY')}.
            </p>
            {handleCountdownArg(infoRoundTow.endDate)}
          </>
        )
      }
    }
    if (infoRoundThree.startDate && time >= infoRoundTow.endDate && time <= infoRoundThree.endDate) {
      if (infoRoundTow.endDate <= time && time < infoRoundThree.startDate) {
        return (
          <>
            <p className="title">{t('New sale will start soon')}</p>
            <p className="notice">
              {t('Sale 3 will start on')} {moment.unix(infoRoundThree.startDate / 1000).format('DD/MM/YYYY')}.
            </p>
            {handleCountdownArg(infoRoundThree.startDate)}
          </>
        )
      }

      if (infoRoundThree.startDate <= time && time < infoRoundThree.endDate) {
        return (
          <>
            <p className="title">{t('XOX TOKEN SALE IS LIVE!')}</p>
            <p className="notice">
              {t('Sale 3 will end on')} {moment.unix(infoRoundThree.endDate / 1000).format('DD/MM/YYYY')}.
            </p>
            {handleCountdownArg(infoRoundThree.endDate)}
          </>
        )
      }
    }

    if (infoRoundThree.endDate && infoRoundThree.endDate <= time) {
      return (
        <>
          <p className="title">{t('XOX Token pre-sale has Ended')}</p>
          <div className="rocket_container">
            {/* <img src="/image-?/rocket_xox.png" alt="rocket_xox" /> */}
            <video
              autoPlay
              loop
              muted
              playsInline
              id="presaleVideo"
              controls={false}
              preload="yes"
              style={{ pointerEvents: 'none' }}
            >
              <source src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/presale/presale.mov`} type='video/mp4; codecs="hvc1"' />
              <source src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/presale/presale.webm`} type="video/webm" />
            </video>
          </div>
        </>
      )
    }

    return (
      <div className="rocket_container">
        {/* <img src="/image-?/rocket_xox.png" alt="rocket_xox" /> */}
        <video
          autoPlay
          loop
          muted
          playsInline
          id="presaleVideo"
          controls={false}
          preload="yes"
          style={{ pointerEvents: 'none' }}
        >
          <source src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/presale/presale.mov`} type='video/mp4; codecs="hvc1"' />
          <source src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/presale/presale.webm`} type="video/webm" />
        </video>
      </div>
    )
  }

  const handleRenderTitle = useMemo(() => {
    if (!infoRoundOne.startDate && !infoRoundTow.startDate && !infoRoundThree.startDate) {
      return <p className="title">{t('Pre-sale is coming soon')}</p>
    }

    if (infoRoundOne.endDate && infoRoundOne.endDate < timeNow && !infoRoundTow.startDate) {
      return (
        <>
          <p className="title"> {t('Round 1 Has Successfully Ended')}</p>
          <p className="notice_after">{t('Round 2 Starting Soon')}</p>
        </>
      )
    }

    if (infoRoundTow.endDate && infoRoundTow.endDate < timeNow && !infoRoundThree.startDate) {
      return (
        <>
          <p className="title"> {t('Round 2 Has Successfully Ended')}</p>
          <p className="notice_after">{t('Round 3 Starting Soon')}</p>
        </>
      )
    }
  }, [infoRoundOne, infoRoundTow, infoRoundThree, timeNow, t])

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
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      {handleRenderTitle}
      {isNotSetDataForAll ? (
        <div className="rocket_container">
          {/* <img src="/image-?/rocket_xox.png" alt="rocket_xox" /> */}
          <video
            autoPlay
            loop
            muted
            playsInline
            id="presaleVideo"
            controls={false}
            preload="yes"
            style={{ pointerEvents: 'none' }}
          >
            <source src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/presale/presale.mov`} type='video/mp4; codecs="hvc1"' />
            <source src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/presale/presale.webm`} type="video/webm" />
          </video>
        </div>
      ) : (
        handleRenderCountdown(timeNow)
      )}
      {isInTimeRangeSale && handleReturnPercent}
    </Wrapper>
  )
}

export default StartingSoon
