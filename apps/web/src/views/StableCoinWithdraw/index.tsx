/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import { Flex, Text } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js'

import styled from 'styled-components'
import { useTreasuryXOX } from 'hooks/useContract'
import { formatUnits } from '@ethersproject/units'
import { USD_DECIMALS } from 'config/constants/exchange'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useMultiChainId } from 'state/info/hooks'
import Link from 'next/link'
import InfoNav from '../Info/components/InfoNav'
import WidthdrawForm from '../StableCoin/widthdrawForm'
import { useTranslation } from '@pancakeswap/localization'

const Row = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  & .btn-back {
    cursor: pointer;
  }
  @media (max-width: 576px) {
    flex-direction: column;
  }
`
const WrapperBorder = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 16px #00000080;
  flex: 1;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`

const Box = styled.div`
  border-radius: 10px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  flex: 1;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  position: relative;

  img {
    max-width: 60px;
  }
  &.wrap-table {
    align-items: flex-start;
    max-width: calc(50% - 15px);
  }
  &.h-190 {
    min-height: 190px;
  }
  @media (max-width: 576px) {
    &.h-190 {
      min-height: 193px;
    }
    img {
      max-width: 50px;
    }
    &.wrap-table {
      padding: 18px;
      max-width: 100%;
    }
    &.wrap-withdraw {
      padding: 18px;
    }
  }

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }
`

const Container = styled.div`
  padding: 0px 48px;
  margin-bottom: 24px;
  color: rgba(0, 0, 0, 0.87);
  justify-content: center;
  display: flex;
  @media (min-width: 1200px) {
    .content {
      width: 1200px;
    }
  }
  @media (min-width: 1400px) {
    .content {
      width: 1400px;
    }
  }
  @media (max-width: 576px) {
    padding: 0px 24px;

    .content {
      width: unset;
    }
  }
`

const ContainerBanner = styled.div`
  display: flex;
  justify-content: center;
  padding: 28px 0px 24px;

  @media (max-width: 576px) {
    padding: 28px 24px 24px;
  }
  @media (min-width: 1200px) {
    .banner {
      width: 1200px;
    }
  }
  @media (min-width: 1400px) {
    .banner {
      width: 1400px;
    }
  }
`

const TextStyle = styled(Text)`
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  line-height: 20px;
  &.primary {
    /* color: ${({ theme }) => theme.colors.violet}; */
    color: #fb8618;
  }
`

const FullWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

export default function WithDrawLayout() {
  const { t } = useTranslation()
  const { account, chainId } = useWeb3React()
  const contractTreasuryXOX = useTreasuryXOX()
  const [currentReward, setCurrentReward] = useState<number | string>(0)
  const chainIdLocal: any = useMultiChainId() || chainId
  const isUSDT = chainId === ChainId.BSC || chainId === ChainId.BSC_TESTNET
  const decimalCompare = isUSDT ? 18 : 6
  const [loadOk, setLoadOk] = useState(false)
  // eslint-disable-next-line consistent-return
  const handleCheckPendingRewardAll = async (accountId: any) => {
    if (!accountId) return null
    try {
      const [infosUser, res2] = await Promise.all([
        contractTreasuryXOX.userInfo(accountId),
        contractTreasuryXOX.pendingReward(accountId),
      ])
      const txPendingReward: any = res2
      const dataParse: any[] = infosUser.map((item) => {
        return formatUnits(item, USD_DECIMALS[chainIdLocal])
      })

      const amountPoint = new BigNumber(dataParse[1]).toNumber()
      const rewardPoint = new BigNumber(dataParse[2]).toNumber()
      if (rewardPoint === 0 || rewardPoint) {
        const numberReward = new BigNumber(formatUnits(txPendingReward._hex, USD_DECIMALS[chainIdLocal]))
          .plus(rewardPoint)
          .toFixed(decimalCompare)
        setCurrentReward(numberReward || 0)
        const totalCurrentXOXS = new BigNumber(amountPoint).plus(numberReward).toNumber()
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error>>>>>`, error)
      setCurrentReward(0)
    }
  }

  useEffect(() => {
    if (account) {
      handleCheckPendingRewardAll(account)
    }
  }, [account])

  useEffect(() => {
    if (!chainId || !account) return
    if (loadOk) window.location.reload()
    setLoadOk(true)
  }, [chainId, account])

  return (
    <FullWrapper>
      <ContainerBanner>
        <div className="banner">
          <InfoNav textContentBanner={t('Earn USDT/USDC from your XOXS Indefinitely')} hasPadding={false} />
        </div>
      </ContainerBanner>
      <Container style={{ marginBottom: 100 }} key={`container-stablecoin${chainId}`}>
        <div className="content">
          <Flex alignItems="center" style={{ gap: 10 }}>
            <Flex style={{ cursor: 'pointer', gap: 5 }} alignItems="center">
              <Link href="/stable-coin">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 11.9961H18"
                    stroke="#8E8E8E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18L6 12L12 6"
                    stroke="#8E8E8E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/stable-coin">
                <TextStyle>{t('Stable coin')}</TextStyle>
              </Link>
            </Flex>
            <TextStyle style={{ transform: 'translateY(1px)' }}>|</TextStyle>
            <TextStyle className="primary">{t('Withdraw reward')}</TextStyle>
          </Flex>
          <Row style={{ marginTop: 25 }}>
            <WrapperBorder>
              <Box className="wrap-withdraw">
                <div className="corner1" />
                <div className="edge1" />
                <div className="corner2" />
                <div className="edge2" />
                <WidthdrawForm priceAvailable={currentReward} />
              </Box>
            </WrapperBorder>
          </Row>
        </div>
      </Container>
    </FullWrapper>
  )
}
