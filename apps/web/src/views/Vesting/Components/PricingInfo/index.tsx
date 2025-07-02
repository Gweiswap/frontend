import { useTranslation } from '@pancakeswap/localization'
import { Button, Flex, Text } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useWindowSize from 'hooks/useWindowSize'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TYPE_BY } from 'views/Vesting'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);

  .btn_group {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;

    .btn_get_eth {
      position: relative;
      cursor: pointer;

      .corner_btn_1 {
        position: absolute;
        left: 0;
        width: 40px;
        height: 100%;
        border-radius: 10px;
        z-index: 1;
        border-bottom: 1px solid #b809b5;
        border-top: 1px solid #b809b5;
        border-left: 1px solid #b809b5;
        border-bottom-right-radius: unset;
        border-top-right-radius: unset;
      }

      .edge_btn_1 {
        position: absolute;
        top: 0;
        left: 40px;
        height: 1px;
        width: calc(100% - 80px);
        background: linear-gradient(95.32deg, #b809b5, #ed1c51, #ffb000);
      }

      .corner_btn_2 {
        position: absolute;
        right: 0;
        width: 40px;
        height: 100%;
        border-radius: 10px;
        z-index: 1;
        border-bottom: 1px solid #ffb000;
        border-top: 1px solid #ffb000;
        border-right: 1px solid #ffb000;
        border-bottom-left-radius: unset;
        border-top-left-radius: unset;
      }

      .edge_btn_2 {
        position: absolute;
        bottom: 0;
        left: 40px;
        height: 1px;
        width: calc(100% - 80px);
        background: linear-gradient(95.32deg, #b809b5, #ed1c51, #ffb000);
      }

      span {
        position: absolute;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      @media screen and (max-width: 900px) {
        span {
          font-size: 16px;
          line-height: 19px;
          white-space: nowrap;
        }
      }
    }
  }
`

const Content = styled.div`
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 28px 18px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    z-index: -1;
  }

  .title {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.87);
  }

  @media screen and (max-width: 900px) {
    padding: 18px 12px;
    .title {
      font-size: 16px;
      line-height: 19px;
    }
  }
`

export const CustomTableWrapper = styled(Flex)`
  padding-top: 29px;
  flex-direction: column;
  /* gap: 16px; */
  overflow-x: auto;

  & > div:last-child {
    margin-bottom: 16px;
  }

  .active {
    width: 100%;
    background: linear-gradient(
      95.32deg,
      rgba(184, 9, 181, 0.2) -7.25%,
      rgba(237, 28, 81, 0.2) 54.2%,
      rgba(255, 176, 0, 0.2) 113.13%
    ) !important;
    border-radius: 30px;
  }

  .item_pricing_0 {
    margin-top: 10px;
  }

  @media screen and (max-width: 900px) {
    padding-top: 12px;
    .item_pricing_0 {
      margin-top: 3px;
    }
  }
`

const Table = styled.div`
  padding: 0px 24px;
  display: grid;
  gap: 10px;
  align-items: center;
  position: relative;
  grid-template-columns: 0.75fr 0.75fr 1.45fr repeat(2, 1fr);

  .corner_active1 {
    position: absolute;
    left: 0;
    width: 40px;
    height: 100%;
    border-radius: 30px;
    z-index: 1;
    border-bottom: 1px solid #ffb000;
    border-top: 1px solid #ffb000;
    border-left: 1px solid #ffb000;
    border-bottom-right-radius: unset;
    border-top-right-radius: unset;
  }
  .corner_active2 {
    position: absolute;
    right: 0;
    width: 40px;
    height: 100%;
    border-radius: 30px;
    z-index: 1;
    border-bottom: 1px solid #b809b5;
    border-top: 1px solid #b809b5;
    border-right: 1px solid #b809b5;
    border-bottom-left-radius: unset;
    border-top-left-radius: unset;
  }

  .edge_active1 {
    position: absolute;
    top: 0;
    left: 40px;
    height: 1px;
    width: calc(100% - 80px);
    background: linear-gradient(95.32deg, #ffb000, #ed1c51, #b809b5);
  }

  .edge_active2 {
    position: absolute;
    bottom: 0;
    left: 40px;
    height: 1px;
    width: calc(100% - 80px);
    background: linear-gradient(95.32deg, #ffb000, #ed1c51, #b809b5);
  }

  .table-header_col {
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.6);
  }

  .table-header {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.87);
  }

  .active_text {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #64c66d;
    display: flex;
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

  @media screen and (max-width: 900px) {
    padding: 0 14px;
    grid-template-columns: 0.75fr 0.75fr 2fr repeat(2, 1fr);

    .table-header_col {
      font-size: 12px;
      line-height: 15px;
    }

    .table-header {
      font-size: 12px;
      line-height: 15px;
    }

    .active_text {
      font-size: 12px !important;
      line-height: 15px !important;

      .circle {
        width: 6px;
        height: 6px;
        left: 6px;
        top: 5px;
      }

      .ringring {
        height: 16px;
        width: 16px;
        position: absolute;
        left: 1px;
        top: 0px;
      }
    }
  }
`

const CustomTable = styled(Table)`
  padding: 16px 24px;
  @media screen and (max-width: 900px) {
    grid-template-columns: 0.75fr 0.75fr 2fr repeat(2, 1fr);
    padding: 8px 14px;
  }
`

const CustomButton = styled(Button)`
  height: 54px;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;

  @media screen and (max-width: 900px) {
    height: 43px;
    font-size: 16px;
    line-height: 19px;
    padding: 12px 14px;
    white-space: nowrap;
  }
`

const ConnectWalletButtonCustom = styled(ConnectWalletButton)`
  height: 54px !important;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;

  @media screen and (max-width: 900px) {
    height: 43px !important;
    font-size: 16px;
    line-height: 19px;
  }
`

interface IPropsButtonETH {
  isInTimeRangeSale?: boolean
}

const ButtonETH = styled.div<IPropsButtonETH>``

interface dataRoundPricing {
  status: string | boolean | null
  round: string | number
  xOXCoin: string | number
  price: string
  xOXBonus: string
}

export enum TOKEN_IN_ROUND {
  ROUND_ONE = 2700000,
  ROUND_TOW = 3600000,
  ROUND_THREE = 4500000,
}

const dataPricing: dataRoundPricing[] = [
  {
    status: 'Live',
    round: 1,
    xOXCoin: TOKEN_IN_ROUND.ROUND_ONE,
    price: '0.044',
    xOXBonus: '8',
  },
  {
    status: null,
    round: 2,
    xOXCoin: TOKEN_IN_ROUND.ROUND_TOW,
    price: '0.045',
    xOXBonus: '6',
  },
  {
    status: null,
    round: 3,
    xOXCoin: TOKEN_IN_ROUND.ROUND_THREE,
    price: '0.046',
    xOXBonus: '4',
  },
]

interface IProps {
  onModalExchangeSale: () => void
  currentRound: number
  isInTimeRangeSale: boolean
  setTypeBuyPrice: (typeBuy: number) => void
  typeBuyPrice: number
}

function PricingInfo({ onModalExchangeSale, currentRound, isInTimeRangeSale, setTypeBuyPrice }: IProps) {
  const { account } = useActiveWeb3React()
  const [arrDataRound, setArrDataRound] = useState<dataRoundPricing[]>(dataPricing)
  const { width } = useWindowSize()
  const { t } = useTranslation()

  const handleCheckRound = (num: number) => {
    const dataUpdate = Array.from(dataPricing).map((item: dataRoundPricing) => {
      return {
        ...item,
        status: isInTimeRangeSale && item.round === num,
      }
    })
    setArrDataRound(dataUpdate)
  }

  useEffect(() => {
    handleCheckRound(currentRound)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound, isInTimeRangeSale])

  return (
    <Wrapper>
      <Content>
        <p className="title">{t('ROUNDS AND PRICING INFORMATION')}</p>
        <CustomTableWrapper>
          <Table>
            <Text className="table-header_col" />
            <Text className="table-header_col">{t('Round')}</Text>
            <Text className="table-header_col">{t('XOX Tokens')}</Text>
            <Text className="table-header_col">{t('Price')}</Text>
            {width > 900 && <Text className="table-header_col">{t('XOXS Bonus')}</Text>}
            {width <= 900 && <Text className="table-header_col"> {t('Bonus')}</Text>}
          </Table>

          {Array.from(arrDataRound).map((item: dataRoundPricing, index: number) => {
            return (
              <CustomTable
                // eslint-disable-next-line react/no-array-index-key
                key={`active item_pricing_${index}`}
                className={item.status ? `active item_pricing_${index}` : `item_pricing_${index}`}
              >
                {item.status && (
                  <>
                    <div className="corner_active1" />
                    <div className="edge_active1" />
                    <div className="corner_active2" />
                    <div className="edge_active2" />
                  </>
                )}

                {item.status ? (
                  <Text
                    fontSize="16px"
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="19px"
                    color="#64C66D"
                    className={!!item.status && `active_text`}
                  >
                    <>
                      <div>{t('Live')}</div>
                      <div className="ring-container">
                        <div className="ringring" />
                        <div className="circle" />
                      </div>
                    </>
                  </Text>
                ) : (
                  <Text className="table-header" />
                )}

                {width > 900 && (
                  <Text className="table-header">
                    {t('Round')} {item.round}
                  </Text>
                )}
                {width <= 900 && (
                  <Text className="table-header" textAlign="center">
                    R{item.round}
                  </Text>
                )}
                <Text className="table-header">{Number(item.xOXCoin).toLocaleString()} XOX</Text>
                <Text className="table-header">${item.price}</Text>
                <Text className="table-header">{item.xOXBonus}%</Text>
              </CustomTable>
            )
          })}
        </CustomTableWrapper>
        {!account && <ConnectWalletButtonCustom width="100%" />}
        {account && (
          <div className="btn_group">
            <CustomButton
              onClick={() => {
                onModalExchangeSale()
                setTypeBuyPrice(TYPE_BY.BY_ERC20)
              }}
              disabled={process.env.NEXT_PUBLIC_TEST_MODE !== '1' || !isInTimeRangeSale}
            >
              {t('Buy with USDT')}
            </CustomButton>

            {!isInTimeRangeSale ? (
              <CustomButton disabled={process.env.NEXT_PUBLIC_TEST_MODE !== '1' || !isInTimeRangeSale}>
                {t('Buy with ETH')}
              </CustomButton>
            ) : (
              <ButtonETH
                className="btn_get_eth"
                onClick={() => {
                  onModalExchangeSale()
                  setTypeBuyPrice(TYPE_BY.BY_ETH)
                }}
                aria-hidden="true"
              >
                <div className="corner_btn_1" />
                <div className="edge_btn_1" />
                <div className="corner_btn_2" />
                <div className="edge_btn_2" />
                <span>{t('Buy with ETH')}</span>
              </ButtonETH>
            )}
          </div>
        )}
      </Content>
    </Wrapper>
  )
}

export default PricingInfo
