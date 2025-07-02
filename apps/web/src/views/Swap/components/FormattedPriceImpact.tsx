import { Percent } from '@pancakeswap/sdk'
import styled from 'styled-components'
import { warningSeverity } from 'utils/exchange'
import { ONE_BIPS } from 'config/constants/exchange'
import { ErrorText } from './styleds'

/**
 * Formatted version of price impact text with warning colors
 */
export default function FormattedPriceImpact({ priceImpact }: { priceImpact?: Percent }) {
  const StyledErrorText = styled(ErrorText)`
    @media screen and (max-width: 500px) {
      font-size: 12px;
    }
  `
  return (
    <StyledErrorText fontSize="16px" severity={warningSeverity(priceImpact)}>
      {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-'}
    </StyledErrorText>
  )
}
