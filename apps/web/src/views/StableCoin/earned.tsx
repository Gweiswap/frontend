import { useEffect, useState } from 'react'
import { formatAmountNumber2, formatAmountStable } from '@pancakeswap/utils/formatBalance'

import { Flex, Button, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useStableCoinSWR } from 'state/info/hooks'
import { formatUnits } from '@ethersproject/units'
import { USD_DECIMALS } from 'config/constants/exchange'
import { useWeb3React } from '@pancakeswap/wagmi'
import { ChainId } from '@pancakeswap/sdk'
// eslint-disable-next-line import/no-cycle
import { formatNumberDecimal } from './index'
import { useTranslation } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'

const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    margin-bottom: 0;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.6);
    &.number {
      /* color: ${({ theme }) => theme.colors.violet}; */
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      color: rgba(255, 255, 255, 0.87);
    }
  }
  @media (max-width: 576px) {
    p {
      font-size: 16px;
      line-height: 19px;
      &.number {
        font-size: 24px;
        line-height: 24px;
      }
    }
  }
`

const Earned = ({ address }: { address?: string }) => {
  const { t } = useTranslation()
  const [priceUSDC, setPriceUSDC] = useState(0)
  const [priceUSDT, setPriceUSDT] = useState(0)
  const stablecoin: any = useStableCoinSWR(address)

  useEffect(() => {
    if (stablecoin?.infoUSDT || stablecoin?.infoUSDC) {
      const infopriceUSDC = stablecoin?.infoUSDC?.userInfo?.total_withdraw_earning || 0
      const infopriceUSDT = stablecoin?.infoUSDT?.userInfo?.total_withdraw_earning || 0
      setPriceUSDC(Number(formatUnits(infopriceUSDC, USD_DECIMALS[ChainId.ETHEREUM])))
      setPriceUSDT(Number(formatUnits(infopriceUSDT, USD_DECIMALS[ChainId.BSC])))
    }
  }, [stablecoin])

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" width="100%" style={{ marginBottom: 16 }}>
        <WrapText>
          <p>{t('%asset% Earned', { asset: 'USDT' })}</p>
          <p className="number">{priceUSDT ? formatAmountStable(Number(priceUSDT), 6) : 0}</p>
        </WrapText>
        <img
          src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.svg`}
          alt="icon"
        />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <WrapText>
          <p>{t('%asset% Earned', { asset: 'USDC' })}</p>
          <p className="number">{priceUSDC ? formatAmountStable(Number(priceUSDC), 6) : 0}</p>
        </WrapText>
        <img
          src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg`}
          alt="icon"
        />
      </Flex>
    </>
  )
}
export default Earned
