/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
import { useContext, useEffect, useState } from 'react'
import { Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import Page from '../Page'
import SwapForm from './components/SwapForm'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'
import { SwapFeaturesContext } from './SwapFeaturesContext'
import { useAccount } from 'wagmi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components'
import LiquidityBackgroundMobile from 'components/Svg/LiquidityBackgroundMobile'
import LiquidityBackgroundBorderMobile from 'components/Svg/LiquidityBackgroundBorderMobile'
import LiquidityBackgroundDesktop from 'components/Svg/LiquidityBackgroundDesktop'
import LiquidityBackgroundBorderDesktop from 'components/Svg/LiquidityBackgroundBorderDesktop'
import { useRouter } from 'next/router'

const Wrapper = styled(Flex)`
  width: 100%;
  max-width: 591px;
  height: fit-content;
  z-index: 0;
  align-items: center;
  justify-content: center;
  margin: 50px 0 100px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 150px 0 100px;
  }
`

const WapperHeight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* min-height: 950px; */

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: 846px;
    position: relative;
    height: 100%;
  }
`

const SwapBackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 100%;
`

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100% - 35px);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  @media (max-width: 576px) {
    width: 98.5%;
    height: calc(100% - 25px);
    top: 25px;
  }
`

export default function Swap() {
  const { isMobile } = useMatchBreakpoints()
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()
  const { isChartExpanded } = useContext(SwapFeaturesContext)
  const { query } = useRouter()

  const [loadOk, setLoadOk] = useState(false)
  useEffect(() => {
    if (!chainId || !account) return
    // if (loadOk && query.tab != 'kyberswap') window.location.reload()
    // setLoadOk(true)
  }, [chainId, account])

  return (
    <Page removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded}>
      <WapperHeight>
        <Flex width={['328px', , '559px']}>
          <Wrapper flex="column" position="relative">
            {isMobile ? (
              <>
                <SwapBackgroundWrapper>
                  <LiquidityBackgroundMobile />
                </SwapBackgroundWrapper>
                <SwapBackgroundWrapper>
                  <LiquidityBackgroundBorderMobile />
                </SwapBackgroundWrapper>
              </>
            ) : (
              <>
                <SwapBackgroundWrapper>
                  <LiquidityBackgroundDesktop />
                </SwapBackgroundWrapper>

                <SwapBackgroundWrapper>
                  <LiquidityBackgroundBorderDesktop />
                </SwapBackgroundWrapper>
              </>
            )}
            <BackgroundWrapper />
            <StyledSwapContainer $isChartExpanded={isChartExpanded}>
              <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
                <SwapForm />
              </StyledInputCurrencyWrapper>
            </StyledSwapContainer>
          </Wrapper>
        </Flex>
      </WapperHeight>
    </Page>
  )
}
