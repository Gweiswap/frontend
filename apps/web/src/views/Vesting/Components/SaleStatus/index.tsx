import { formatEther } from '@ethersproject/units'
import { useTranslation } from '@pancakeswap/localization'
import { Box, Grid } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { RoundInfo } from 'views/Vesting'

interface IPropsWrapperItem {
  status?: boolean
  percent?: number
}

const WrapperItem = styled(Box)<IPropsWrapperItem>`
  position: relative;
  background: rgba(16, 16, 16, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 20px;

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 10;
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
    z-index: 10;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 10;
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
    z-index: 10;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .sold {
    position: relative;
    overflow: hidden;
    text-align: center;
    padding-top: 17px;
    padding-bottom: 18px;
    font-weight: 700;
    font-size: 16px;
    height: 54px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    border-radius: 0px 0px 20px 20px;
    overflow: hidden;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 1px;
      top: 0;
      left: 0;
      z-index: 11;
      background: rgba(255, 255, 255, 0.2);
    }

    .value {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      z-index: 9;
      background: transparent;
      border-radius: 0px 0px 20px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .background-gradient {
      background: ${({ percent }) =>
        percent === 0 ? 'none' : 'linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%)'};
      position: absolute;
      left: 1px;
      bottom: 1px;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
    }

    .background {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      background: ${({ percent }) => {
        return percent === 100
          ? 'transparent'
          : `linear-gradient(to right, rgba(16, 16, 16, 0) ${0}%, rgba(16, 16, 16) ${percent}%)`
      }};
      backdrop-filter: blur(10px);
      border-radius: ${({ percent }) => (percent >= 100 ? '0px 0px 20px 20px' : '0px 0px 20px 20px')};
    }
  }

  .status_name {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }
  .status_value {
    position: relative;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    margin-top: 5px;
    white-space: nowrap;

    .dollar_sign {
      position: absolute;
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.6);
    }

    .raised_dollar {
      margin-left: 8px;
    }

    .price_dollar {
      margin-left: 8px;
    }
  }
  .name {
    position: absolute;
    padding: 10px 20px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    background: ${({ status }) =>
      status ? ' linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%)' : '#0d0d0d'};
    border-radius: 30px;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);

    .corner_name_1 {
      position: absolute;
      left: 0;
      width: 33px;
      height: 100%;
      border-radius: 30px;
      z-index: 1;
      border-left: 1px solid #ffffff30;
      border-bottom: 1px solid #ffffff30;
      border-bottom-right-radius: unset;
      transform: translateY(-10px);
    }
    .corner_name_2 {
      position: absolute;
      right: 0;
      width: 33px;
      height: 100%;
      border-radius: 30px;
      z-index: 1;
      border-right: 1px solid #ffffff30;
      border-bottom: 1px solid #ffffff30;
      border-bottom-left-radius: unset;
      transform: translateY(-10px);
    }

    .edge_name_2 {
      position: absolute;
      bottom: 0;
      left: 33px;
      height: 1px;
      width: calc(100% - 66px);
      background: #ffffff30;
    }
  }

  .corner_active_1 {
    position: absolute;
    left: 0;
    width: 40px;
    height: 100%;
    border-radius: 20px;
    z-index: 99;
    border-bottom: 1px solid #b809b5;
    border-top: 1px solid #b809b5;
    border-left: 1px solid #b809b5;
    border-bottom-right-radius: unset;
    border-top-right-radius: unset;
  }

  .edge_active_1 {
    position: absolute;
    top: 0;
    left: 40px;
    z-index: 99;
    height: 1px;
    width: calc(100% - 80px);
    background: linear-gradient(95.32deg, #b809b5, #ed1c51, #ffb000);
  }

  .corner_active_2 {
    position: absolute;
    right: 0;
    width: 40px;
    height: 100%;
    border-radius: 20px;
    z-index: 99;
    border-bottom: 1px solid #ffb000;
    border-top: 1px solid #ffb000;
    border-right: 1px solid #ffb000;
    border-bottom-left-radius: unset;
    border-top-left-radius: unset;
  }

  .edge_active_2 {
    position: absolute;
    bottom: 0;
    left: 40px;
    z-index: 99;
    height: 1px;
    width: calc(100% - 80px);
    background: linear-gradient(95.32deg, #b809b5, #ed1c51, #ffb000);
  }

  .status {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;

    .ring-container {
      position: relative;
      flex: 1;
    }

    .circle {
      width: 7px;
      height: 7px;
      background-color: #64c66d;
      border-radius: 50%;
      position: absolute;
      left: 10px;
      top: 8px;
    }

    .ringring {
      border: 3px solid #64c66d;
      border-radius: 30px;
      height: 17px;
      width: 17px;
      position: absolute;
      left: 5px;
      top: 3px;
      animation: pulsate 1s ease-out;
      animation-iteration-count: infinite;
      opacity: 0;
    }
    @keyframes pulsate {
      0% {
        -webkit-transform: scale(0.1, 0.1);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        -webkit-transform: scale(1.2, 1.2);
        opacity: 0;
      }
    }
  }

  .live {
    color: #64c66d;
  }

  .ended {
    color: #ff5353;
  }

  .incoming {
    color: rgba(255, 255, 255, 0.38);
  }

  .dot_contain {
    position: relative;
    display: flex;
  }

  .dot {
    top: -7px;
    margin-left: 5px;
    position: absolute;
    font-weight: 700;
    font-size: 36px;
    line-height: 19px;
    color: #64c66d;
    @media screen and (max-width: 1200px) {
      top: -8px !important;
    }
  }

  @media screen and (max-width: 1200px) {
    .mbpadding {
      padding: 35px 24px !important;
    }
    .status_name {
      font-size: 12px;
      line-height: 15px;
    }

    .status_value {
      font-size: 14px;
      line-height: 17px;
    }

    .sold {
      font-size: 14px;
      line-height: 17px;
      height: 43px;
    }
  }
`

const CustomGrid = styled(Grid)`
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 37px;
  }
`

enum StatusSale {
  LIVE = 'Live',
  END = 'Ended',
  INCOMING = 'Incoming',
}

const Item = ({ item }) => {
  const { t } = useTranslation()
  const percent = new BigNumber(
    new BigNumber(formatEther(item?.xox_amount_bought || '0')).multipliedBy(100).dividedBy(item.xOXforSale),
  ).toFixed(2)

  return (
    <WrapperItem status={item.status === StatusSale.LIVE} percent={parseFloat(percent)}>
      {item.status === StatusSale.LIVE && (
        <>
          <div className="corner_active_1" />
          <div className="edge_active_1" />
          <div className="corner_active_2" />
          <div className="edge_active_2" />
        </>
      )}

      {item.status !== StatusSale.LIVE && (
        <>
          <div className="corner1" />
          <div className="edge1" />
          <div className="corner2" />
          <div className="edge2" />
        </>
      )}

      <div className="name">
        {item.status !== StatusSale.LIVE && (
          <>
            <div className="corner_name_1" />
            <div className="edge_name_1" />
            <div className="corner_name_2" />
            <div className="edge_name_2" />
          </>
        )}
        {t(item.name)}
      </div>
      <Grid gridTemplateColumns="1.25fr 0.75fr" padding="35px 34px" gridGap="22px" className="mbpadding">
        <div>
          <p className="status_name">{t('Status')}</p>
          <div className={`status_value ${String(item.status).toLocaleLowerCase()} status`}>
            {item.status === StatusSale.LIVE ? (
              <span className="dot_contain">
                <div>{t(item.status)}</div>
                <div className="ring-container">
                  <div className="ringring" />
                  <div className="circle" />
                </div>
              </span>
            ) : (
              `${t(item.status)}`
            )}
          </div>
        </div>
        <div>
          <p className="status_name">{t('Current raise')}</p>
          <p className="status_value">
            {item?.total_raised_usd && <span className="dollar_sign">$</span>}
            <span className="raised_dollar">
              {item?.total_raised_usd
                ? new BigNumber(item?.total_raised_usd)
                    .div(10 ** 6)
                    .toNumber()
                    .toLocaleString()
                : item?.currentRaise}
            </span>
          </p>
        </div>
        <div>
          <p className="status_name">{t('Price')}</p>
          <p className="status_value">
            <span>1 XOX =</span> <span className="dollar_sign">$</span>
            <span className="price_dollar">{item.price}</span>
          </p>
        </div>
        <div>
          <p className="status_name">{t('XOX for Sale')}</p>
          <p className="status_value">{item.xOXforSale.toLocaleString()}</p>
        </div>
        <div>
          <p className="status_name">{t('Investors')}</p>
          <p className="status_value">{item?.total_investor ? item?.total_investor : item.investors}</p>
        </div>
        <div>
          <p className="status_name">{t('XOXS Rewarded')}</p>
          <p className="status_value">
            {item?.xox_amount_bought
              ? Number(
                  new BigNumber(new BigNumber(item?.xoxs_amount_reward).div(10 ** 6).toString()).toFixed(2, 1),
                ).toLocaleString()
              : item.xOXSRewarded}
          </p>
        </div>
      </Grid>
      <div className="sold">
        <div className="background-gradient" />
        <div className="background" />
        <div className="value">
          <span>
            {`${parseFloat(percent)}% `}
            {t('SOLD')}
          </span>
        </div>
      </div>
    </WrapperItem>
  )
}

interface IProps {
  isInTimeRangeSale?: boolean
  dataStatus: any[]
  infoRoundOne: RoundInfo
  infoRoundTow: RoundInfo
  infoRoundThree: RoundInfo
  totalXOXTokenInRound: any
  currentRound: number
}

function SaleStatus({
  isInTimeRangeSale,
  currentRound,
  dataStatus,
  infoRoundOne,
  infoRoundTow,
  infoRoundThree,
}: IProps) {
  const [dataFormat, setDataFormat] = useState<any[]>([])

  const arrStatus = useMemo(() => {
    const now = new Date()
    const timeStampOfNow = now.getTime()
    return [
      {
        name: 'Sale 1',
        status: infoRoundOne.startDate
          ? timeStampOfNow < infoRoundOne.startDate
            ? StatusSale.INCOMING
            : infoRoundOne.startDate <= timeStampOfNow && timeStampOfNow <= infoRoundOne.endDate && isInTimeRangeSale
            ? StatusSale.LIVE
            : StatusSale.END
          : StatusSale.INCOMING,
        currentRaise: '-',
        price: '0.044',
        xOXforSale: 2700000,
        investors: '-',
        xOXSRewarded: '-',
      },
      {
        name: 'Sale 2',
        status: infoRoundTow.startDate
          ? timeStampOfNow < infoRoundTow.startDate
            ? StatusSale.INCOMING
            : infoRoundTow.startDate <= timeStampOfNow && timeStampOfNow <= infoRoundTow.endDate && isInTimeRangeSale
            ? StatusSale.LIVE
            : StatusSale.END
          : StatusSale.INCOMING,
        currentRaise: '-',
        price: '0.045',
        xOXforSale: 3600000,
        investors: '-',
        xOXSRewarded: '-',
      },
      {
        name: 'Sale 3',
        status: infoRoundThree.startDate
          ? timeStampOfNow < infoRoundThree.startDate
            ? StatusSale.INCOMING
            : infoRoundThree.startDate <= timeStampOfNow &&
              timeStampOfNow <= infoRoundThree.endDate &&
              isInTimeRangeSale
            ? StatusSale.LIVE
            : StatusSale.END
          : StatusSale.INCOMING,
        currentRaise: '-',
        price: '0.046',
        xOXforSale: 4500000,
        investors: '-',
        xOXSRewarded: '-',
      },
    ]
  }, [infoRoundOne, infoRoundThree, infoRoundTow, isInTimeRangeSale])

  const handleFormatData = (roundArr: any[]) => {
    const newDataFormat = []
    let temp: any
    if (roundArr.length === 0) {
      setDataFormat(arrStatus)
    }
    for (let i = 0; i < 3; i++) {
      if (roundArr[i]) {
        temp = { ...roundArr[i], ...arrStatus[i] }
        newDataFormat.push(temp)
      } else {
        temp = arrStatus[i]
        newDataFormat.push(temp)
      }
    }
    if (newDataFormat) {
      setDataFormat(newDataFormat)
    }
  }
  useEffect(() => {
    handleFormatData(dataStatus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStatus, infoRoundOne, infoRoundTow, infoRoundThree, arrStatus])

  return (
    <CustomGrid>
      {dataFormat.map((item, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Item key={index} item={item} />
      })}
    </CustomGrid>
  )
}

export default SaleStatus
