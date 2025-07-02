import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import { GridLoader } from 'react-spinners'
import { useTranslation } from '@pancakeswap/localization'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'
import { Currency, CurrencyAmount, Percent } from '@pancakeswap/sdk'
import { formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'
import { useMemo } from 'react'

const Wrapper = styled.div`
  width: 100%;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 5px 0 24px;
`

type Props = {
  currencyIn: Currency
  tokenInAmount: string
  currencyOut: Currency
  tokenOutAmountWei: string
}

function ConfirmationPendingContent({ currencyIn, tokenInAmount, currencyOut, tokenOutAmountWei }: Props) {
  const { t } = useTranslation()

  // text to show while loading
  const pendingText = useMemo(() => {
    return t('Swapping %amountA% %symbolA% for %amountB% %symbolB%', {
      amountA: formatAmountNumber2(Number(tokenInAmount), 4) ?? '',
      symbolA: currencyIn?.symbol ?? '',
      amountB:
        formatAmountNumber2(Number(CurrencyAmount.fromRawAmount(currencyOut, tokenOutAmountWei).toSignificant(6)), 4) ??
        '',
      symbolB: currencyOut?.symbol ?? '',
    })
  }, [currencyIn, tokenInAmount, currencyOut, tokenOutAmountWei])

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
