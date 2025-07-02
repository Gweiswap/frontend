import styled from 'styled-components'
import { Text, Spinner } from '@pancakeswap/uikit'
import { GridLoader } from 'react-spinners'
import { useTranslation } from '@pancakeswap/localization'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'
import { Trade, Currency, TradeType } from '@pancakeswap/sdk'
import { StableTrade } from '../StableSwap/hooks/useStableTradeExactIn'
import { formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'

const Wrapper = styled.div`
  width: 100%;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 5px 0 24px;
`

function ConfirmationPendingContent({ trade }: { trade: Trade<Currency, Currency, TradeType> | StableTrade }) {
  const { t } = useTranslation()

  // text to show while loading
  const pendingText = t('Swapping %amountA% %symbolA% for %amountB% %symbolB%', {
    amountA: formatAmountNumber2(Number(trade?.inputAmount?.toSignificant(6)), 4) ?? '',
    symbolA: trade?.inputAmount?.currency?.symbol ?? '',
    amountB: formatAmountNumber2(Number(trade?.outputAmount?.toSignificant(6)), 4) ?? '',
    symbolB: trade?.outputAmount?.currency?.symbol ?? '',
  })

  return (
    <Wrapper>
      <ConfirmedIcon>
        {/* <Spinner /> */}
        <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
        {/* <img src='/image-?/swap/confirm-loading.svg' alt='' /> */}
      </ConfirmedIcon>

      <AutoColumn gap="12px" justify="center">
        <Text fontSize="18px">{t('Waiting For Confirmation')}</Text>
        <AutoColumn gap="12px" justify="center">
          <Text bold small textAlign="center">
            {pendingText}
          </Text>
        </AutoColumn>
        <Text small color="textSubtle" textAlign="center" mb="32px">
          {t('Confirm this transaction in your wallet.')}
        </Text>
      </AutoColumn>
    </Wrapper>
  )
}

export default ConfirmationPendingContent
