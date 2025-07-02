/* eslint-disable no-unused-expressions */
import { useTranslation } from '@pancakeswap/localization'
import { Button } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ColumnCenter } from 'components/Layout/Column'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { GridLoader } from 'react-spinners'
import styled from 'styled-components'
import { IVestingTime } from 'views/Vesting'

const Wrapper = styled.div`
  .total_vested {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
    @media screen and (max-width: 1200px) {
      font-size: 14px;
      line-height: 17px;
    }
  }

  .btn_connect_container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: rgba(255, 255, 255, 0.87);
      margin-top: 180px;
      margin-bottom: 24px;
    }

    .btn_connect {
      width: 181px;
      height: 43px;
      margin-bottom: 200px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
    }

    .nodata {
      margin-bottom: 200px;
    }

    @media screen and (max-width: 1200px) {
      p {
        font-size: 12px;
        line-height: 20px;
        margin-top: 160px;
      }

      .btn_connect {
        width: 146px;
        height: 37px;
        font-size: 14px;
        line-height: 17px;
      }
    }
  }
`

const Content = styled.div`
  .sale-container-bottom {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 0.75fr 1fr 0.5fr;
    gap: 30px;
    .sale-schedule-item {
      display: flex;
      align-items: center;
      padding-top: 40px;

      .item_wrap {
        display: flex;
      }
    }

    .sale-schedule-item.flex-col {
      flex-direction: column;
      align-items: flex-start;
      padding-top: 0px;
    }
    .sale-schedule-item.no-padding {
      padding-top: 22px;
    }
  }

  .heading-sale {
    position: absolute;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #fb8618;
    top: 24px;
  }

  .sale_item {
    padding: 16px 24px;
    position: relative;
    gap: 10px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
  }

  .sale_item_1 {
    margin: 16px 0px;
  }
  .amount_vested {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
  }
  .title_vested {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 4px;
  }

  .next_day {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 16px;
  }

  .over_flow {
    min-width: 1300px;
  }

  overflow-x: scroll;

  @media screen and (max-width: 1200px) {
    .heading-sale {
      font-size: 14px;
      line-height: 17px;
      top: 18px;
    }

    .title_vested {
      font-size: 12px;
      line-height: 15px;
      margin-top: 8px;
    }

    .amount_vested {
      font-size: 12px;
      line-height: 15px;
      margin-bottom: 8px;
    }
    .next_day {
      font-size: 12px;
      line-height: 15px;
      margin-bottom: 12px;
    }
    .sale_item {
      padding: 16px;
    }
  }
`

const CustomButtom = styled(Button)`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  width: 105px;
  height: 43px;
  padding: 12px 30px;

  @media screen and (max-width: 1200px) {
    padding: 12px 20px;
    font-size: 14px;
    line-height: 17px;
    width: 80px;
    height: 37px;
  }
`

const Img = styled.img`
  object-fit: cover;
  border-radius: 50%;
  min-width: 31px;
  min-height: 30px;
  margin-right: 16px;
`

const SaleItem = ({
  item,
  index,
  handleClaim,
  handleGetDataVesting,
}: {
  item: IVestingTime
  index: number
  handleClaim: (round: number, remainning: any) => void
  handleGetDataVesting: () => void
}) => {
  const { t } = useTranslation()
  const [count, setCount] = useState<number>(null)
  const [itemVesting, setItem] = useState(item)

  useEffect(() => {
    const id = setTimeout(() => {
      index === 0 && handleGetDataVesting()
    }, 20000)
    return () => clearTimeout(id)
  }, [count])

  const handleCheckCount = (it: any) => {
    if (it.startTime.length === 0) return
    const NOW = Date.now()
    const i = Array.from(it.startTime).findIndex((value: any) => value > NOW)

    if (i === -1) {
      setCount(9)
    } else {
      setCount(i)
    }
  }

  useEffect(() => {
    setItem(item)
    handleCheckCount(item)
  }, [item])

  return (
    <div className={`sale_item sale_item_${index}`}>
      <div className="heading-sale">{t(itemVesting.title)}</div>
      <div className="sale-container-bottom ">
        <div className="sale-schedule-item ">
          <div className="item_wrap">
            <p>
              <Img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/xox_new_overlay.svg`}
                alt="icon"
                height={30}
                width={30}
                className="token_first"
              />
            </p>
            <div>
              <p className="amount_vested">{Number(itemVesting.remaining).toLocaleString()}</p>
              <p className="title_vested">{t('Unclaimed')}</p>
            </div>
          </div>
        </div>
        <div className="sale-schedule-item">
          <div className="item_wrap">
            <p>
              <Img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/xox_new.svg`}
                alt="icon"
                height={30}
                width={30}
                className="token_first"
              />
            </p>
            <div>
              <p className="amount_vested">{Number(itemVesting.amountVested).toLocaleString()}</p>
              <p className="title_vested">{t('Claimed')}</p>
            </div>
          </div>
        </div>
        <div className="sale-schedule-item">
          <div className="item_wrap">
            <p>
              <Img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/xox_new.svg`}
                alt="icon"
                height={30}
                width={30}
                className="token_first"
              />
            </p>
            <div>
              <p className="amount_vested">{Number(itemVesting.yourCurrentXOX).toLocaleString()}</p>
              <p className="title_vested">{t('Available To Claim')}</p>
            </div>
          </div>
        </div>
        <div className="sale-schedule-item flex-col">
          <p className="next_day">
            {t('Next unlocking date:')}{' '}
            {itemVesting.startTime.length !== 0
              ? moment.unix(itemVesting.startTime[count] / 1000).format('MM/DD/YYYY')
              : ' -/-/-'}
          </p>
          <p>
            <span>
              <CountDown startTime={itemVesting.startTime[count]} setCount={setCount} count={count} />
            </span>
          </p>
        </div>
        <div className="sale-schedule-item no-padding">
          <CustomButtom
            type="button"
            onClick={() => handleClaim(itemVesting.round, itemVesting.yourCurrentXOX)}
            disabled={Number(itemVesting.yourCurrentXOX) === 0}
          >
            {t('Claim')}
          </CustomButtom>
        </div>
      </div>
    </div>
  )
}

interface Props {
  startTime: any
  setCount?: (count: number) => void
  count: number
}

const handleTime = (time: number) => {
  return time < 10 ? `0${time}` : time
}

const WrapperTime = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px;
  .item_time {
    position: relative;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    width: 81px;
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .name_time {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.6);
    }

    .number_time {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);
    }
    .corner1 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50%;
      height: 20px;
      border-radius: 10px;
      z-index: 1;
      border-bottom: 2px solid #ffffff30;
      border-left: 2px solid #ffffff30;
      border-bottom-right-radius: unset;
      border-top-left-radius: unset;
    }

    .edge1 {
      width: 2px;
      height: calc(100% - 26px);
      position: absolute;
      bottom: 20px;
      left: 0;
      z-index: 1;
      background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
    }

    .corner2 {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50%;
      height: 20px;
      border-radius: 10px;
      z-index: 1;
      border-bottom: 2px solid #ffffff30;
      border-right: 2px solid #ffffff30;
      border-bottom-left-radius: unset;
      border-top-right-radius: unset;
    }

    .edge2 {
      width: 2px;
      height: calc(100% - 26px);
      position: absolute;
      bottom: 20px;
      right: 0;
      z-index: 1;
      background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
    }

    @media screen and (max-width: 1200px) {
      width: 66px;
      height: 59px;
      .number_time {
        font-size: 20px;
        line-height: 24px;
      }
      .name_time {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    gap: 8px;
  }
`

const CountDown = ({ startTime, setCount, count }: Props) => {
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
    const timeStampAtNow = Date.now()
    if (timeStampAtNow >= startTime) {
      // eslint-disable-next-line no-unused-expressions
      count < 9 && setCount(count + 1)
    }
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (Math.floor(periodTime) >= 0) {
      const refreshInterval = setInterval(handleCountDown, 1000)
      return () => clearInterval(refreshInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeList, timeStart])

  const renderTitleTime = (key: any) => {
    switch (key) {
      case 0:
        return 'Days'
      case 1:
        return 'Hours'
      case 2:
        return 'Minutes'
      default:
        return 'Seconds'
    }
  }

  return (
    <WrapperTime>
      {Array.from(Object.values(timeList)).map((item, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div className="item_time" key={index}>
            <div className="corner1" />
            <div className="edge1" />
            <div className="corner2" />
            <div className="edge2" />
            <div className="number_time">{handleTime(item)}</div>
            <div className="name_time">{t(renderTitleTime(index))}</div>
          </div>
        )
      })}
    </WrapperTime>
  )
}

function VestingSchedule({
  dataVesting,
  handleClaim,
  handleGetDataVesting,
}: {
  dataVesting: IVestingTime[]
  handleClaim: (round: number, remainning: number) => void
  handleGetDataVesting: () => void
}) {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const [newVesting, setNewVesting] = useState<IVestingTime[]>(dataVesting)

  useEffect(() => {
    setNewVesting(dataVesting)
  }, [dataVesting])

  const renderVestingSale = useMemo(() => {
    return (
      <>
        {Array.from(newVesting).map((item: IVestingTime, index) => {
          return (
            <SaleItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              item={item}
              index={index}
              handleClaim={handleClaim}
              handleGetDataVesting={handleGetDataVesting}
            />
          )
        })}
      </>
    )
  }, [handleClaim, handleGetDataVesting, newVesting])

  return (
    <Wrapper>
      {!account && (
        <div className="btn_connect_container">
          <p>{t('Connect to your wallet to view your vesting shedule.')}</p>
          <ConnectWalletButton scale="sm" style={{ whiteSpace: 'nowrap' }} className="btn_connect">
            <span>{t('Connect Wallet')}</span>
          </ConnectWalletButton>
        </div>
      )}
      {account && (
        <>
          <div className="total_vested">
            {t('Current XOX Tokens Vested:')}{' '}
            {Number(
              new BigNumber(newVesting[0]?.remaining)
                .plus(newVesting[1]?.remaining)
                .plus(newVesting[2]?.remaining)
                .toFixed(2),
            ).toLocaleString()}
          </div>
          <Content>
            <div className="over_flow">{renderVestingSale}</div>
          </Content>
        </>
      )}
    </Wrapper>
  )
}

export default VestingSchedule
