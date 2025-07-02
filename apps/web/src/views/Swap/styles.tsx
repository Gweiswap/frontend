import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  top: 30px;
  left: 16px;
  width: 100%;
  max-width: 559px;
  z-index: 2;
  padding: 18px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 33px 28px 20px 28px;
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  width: 100%;
`
