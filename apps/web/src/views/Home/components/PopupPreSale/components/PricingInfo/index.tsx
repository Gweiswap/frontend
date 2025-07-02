import { useTranslation } from '@pancakeswap/localization'
import { Button, Flex, Text } from '@pancakeswap/uikit'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const Wrapper = styled.div`
  width: fit-content;
  position: relative;
  z-index: 1;
  margin: auto;
`

const Content = styled.div`
  border-radius: 20px;

  .title {
    width: 380px;
    margin: auto;
    font-weight: 700;
    font-size: 38px;
    line-height: 46px;
    text-align: center;
    color: #ffffff;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  @media screen and (max-width: 1200px) {
    .title {
      font-size: 16px;
      line-height: 19px;
    }
  }

  @media screen and (max-width: 560px) {
    .title {
      width: 100%;
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      text-align: center;
      color: #ffffff;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .buttons button:first-child {
      width: 60%;
    }

    .buttons button:last-child {
      width: calc(100% - 60% - 16px);
      margin: 0;
    }
  }
`

export const CustomTableWrapper = styled(Flex)`
  margin: 20px auto 0 auto;
  flex-direction: column;
  overflow-x: auto;
  position: relative;
  width: fit-content;
  min-height: 144px;
  padding: 0 10px;

  .item-blur {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .active {
    background: linear-gradient(
      95.32deg,
      rgba(255, 255, 255, 0.2) -7.25%,
      rgba(255, 255, 255, 0.2) 54.2%,
      rgba(255, 255, 255, 0.2) 113.13%
    );
    border-radius: 30px;
    width: 100%;
    border-radius: 30px;

    .live {
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.8);
      position: relative;
    }

    .table-header {
      color: rgba(255, 255, 255, 0.8);
      background: unset;
      -webkit-background-clip: unset;
      -webkit-text-fill-color: unset;
      background-clip: unset;
      text-fill-color: unset;
    }
  }

  .item_pricing_0 {
    margin-top: 10px;
  }

  .table-header {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.8);
    white-space: nowrap;
  }

  .upper .table-header {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .under .table-header {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.7) 20%, rgba(0, 0, 0, 0) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .hidden {
    display: none;
  }

  .circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    position: absolute;
    transform: translateY(-50%);
    right: 0;
    top: 50%;
    background: rgba(255, 255, 255, 0.8);
  }

  @media screen and (max-width: 560px) {
    padding-top: 10px;
    min-height: 108px;

    .item_pricing_0 {
      margin-top: 3px;
    }

    .table-header {
      font-size: 10px;
      line-height: 15px;
    }

    .active .live {
      font-size: 10px;
      line-height: 15px;
    }
  }
`

const Table = styled.div`
  padding: 0px 20px;
  display: grid;
  gap: 10px;
  align-items: center;
  position: relative;
  grid-template-columns: 41px 60px 120px 60px 83px;

  .table-header_col {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
  }

  @media screen and (max-width: 560px) {
    padding: 0 14px;
    grid-template-columns: 30px 35px 80px 35px 60px;

    .table-header_col {
      font-size: 10px;
      line-height: 15px;
    }
  }
`

const CustomTable = styled(Table)`
  padding: 11px 20px;
  @media screen and (max-width: 560px) {
    grid-template-columns: 30px 35px 80px 35px 60px;
    padding: 8px 14px;
  }
`

const ButtonGetInvolved = styled(Button)`
  display: flex;
  align-items: center;
  margin-right: 16px;
  background: #ffffff;
  border-radius: 10px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  border: none;
  border: 1px solid #fff;
  box-shadow: none;
  height: 43px;

  &:hover {
    background: #000;
    color: #fff;
  }

  @media screen and (max-width: 900px) {
    height: 43px;
    font-size: 16px;
    line-height: 19px;
    padding: 12px 14px;
    white-space: nowrap;
  }
`

const ButtonCertik = styled(Button)`
  display: flex;
  align-items: center;
  margin-right: 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  border: none;
  box-shadow: none;
  height: 43px;
  border: 1px solid #fff;
  color: #fff;
  background: #000;

  &:hover {
    background: #fff;
    color: #000000;
  }

  @media screen and (max-width: 900px) {
    height: 43px;
    font-size: 16px;
    line-height: 19px;
    padding: 12px 14px;
    white-space: nowrap;
  }
`

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
  currentRound: number
  isInTimeRangeSale: boolean
}

function PricingInfo({ currentRound, isInTimeRangeSale }: IProps) {
  const [arrDataRound, setArrDataRound] = useState<dataRoundPricing[]>(dataPricing)
  const { t } = useTranslation()
  const router = useRouter()

  const handleCheckRound = (num: number) => {
    const dataUpdate = Array.from(dataPricing).map((item: dataRoundPricing) => {
      return {
        ...item,
        status: isInTimeRangeSale && item.round === num,
      }
    })
    setArrDataRound(dataUpdate)
  }

  const roundClass = (index) => {
    switch (currentRound) {
      case 1:
        if (index === 0) return 'active'
        if (index === 1) return 'inactive under'
        return 'hidden'
      case 2:
        if (index === 0) return 'inactive upper'
        if (index === 1) return 'active'
        return 'inactive under'
      case 3:
        if (index === 0) return 'hidden'
        if (index === 1) return 'inactive upper'
        return 'active'
    }
  }

  useEffect(() => {
    handleCheckRound(currentRound)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound, isInTimeRangeSale])

  return (
    <Wrapper>
      <Content>
        <p className="title" dangerouslySetInnerHTML={{ __html: t('XOX Token Pre-Sale <br /> is Live.') }} />
        <CustomTableWrapper>
          <Table>
            <Text className="table-header_col" />
            <Text className="table-header_col">{t('Round')}</Text>
            <Text className="table-header_col">{t('XOX Tokens')}</Text>
            <Text className="table-header_col">{t('Price')}</Text>
            <Text className="table-header_col">{t('XOXS Bonus')}</Text>
          </Table>

          {Array.from(arrDataRound).map((item: dataRoundPricing, index: number) => {
            return (
              <CustomTable
                // eslint-disable-next-line react/no-array-index-key
                key={`active item_pricing_${index}`}
                className={`${roundClass(index)} item_pricing_${index}`}
              >
                {item.status ? (
                  <Text className={item.status && `live`}>
                    <div>{t('Live')}</div>
                    <div className="circle" />
                  </Text>
                ) : (
                  <Text className="table-header" />
                )}

                <Text className="table-header">
                  {t('Round')} {item.round}
                </Text>
                <Text className="table-header">{Number(item.xOXCoin).toLocaleString()} XOX</Text>
                <Text className="table-header">${item.price}</Text>
                <Text className="table-header">{item.xOXBonus}%</Text>
              </CustomTable>
            )
          })}
        </CustomTableWrapper>
        <div className="buttons">
          <ButtonGetInvolved onClick={() => router.push('/pre-sales')}>{t('Get Involved!')}</ButtonGetInvolved>

          <ButtonCertik className="btn_get_eth" onClick={() => {}} aria-hidden="true">
            {t('Certik')}
          </ButtonCertik>
        </div>
      </Content>
    </Wrapper>
  )
}

export default PricingInfo
