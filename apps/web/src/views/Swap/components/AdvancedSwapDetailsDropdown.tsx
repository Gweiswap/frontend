import styled from 'styled-components'
import useLastTruthy from 'hooks/useLast'
import { AdvancedSwapDetails, AdvancedSwapDetailsProps } from './AdvancedSwapDetails'

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  margin-top: ${({ show }) => (show ? '16px' : 0)};
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.invertedContrast};

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`
const AdvancedDetail = styled.div<{ show: boolean }>`
  // margin-top: ${({ show }) => (show ? '26px' : 0)};
  width: 100%;
  border-radius: 20px;

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
  @media(max-width: 576px){
    div[font-size="16px"]{
      font-size: 12px !important;
      +div{
        svg{
          width: 14px;
        }
      }
    }
  }
`

export default function AdvancedSwapDetailsDropdown({ trade, ...rest }: AdvancedSwapDetailsProps) {
  const lastTrade = useLastTruthy(trade)

  return (
    <AdvancedDetail show={Boolean(trade)}>
      <AdvancedSwapDetails {...rest} trade={trade ?? lastTrade ?? undefined} />
    </AdvancedDetail>
  )
}
