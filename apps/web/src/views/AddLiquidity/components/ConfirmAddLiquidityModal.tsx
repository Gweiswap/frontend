import React, { useCallback } from 'react'
import { Currency, CurrencyAmount, Fraction, Percent, Token } from '@pancakeswap/sdk'
import { InjectedModalProps, Button, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import TransactionConfirmationModal, {
  ConfirmationModalContent,
  TransactionErrorContent,
} from 'components/TransactionConfirmationModal'
import { Field } from 'state/burn/actions'
import _toNumber from 'lodash/toNumber'
import { AddLiquidityModalHeader, PairDistribution } from './common'
import { formatAmountString } from '@pancakeswap/utils/formatBalance'

interface ConfirmAddLiquidityModalProps {
  title: string
  customOnDismiss: () => void
  attemptingTxn: boolean
  hash: string
  pendingText: string
  currencies: { [field in Field]?: Currency }
  noLiquidity: boolean
  allowedSlippage: number
  liquidityErrorMessage: string
  price: Fraction
  parsedAmounts: { [field in Field]?: CurrencyAmount<Currency> }
  onAdd: () => void
  poolTokenPercentage: Percent
  liquidityMinted: CurrencyAmount<Token>
  currencyToAdd: Token
  isStable?: boolean
}

const ConfirmAddLiquidityModal: React.FC<
  React.PropsWithChildren<InjectedModalProps & ConfirmAddLiquidityModalProps>
> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  price,
  currencies,
  noLiquidity,
  allowedSlippage,
  parsedAmounts,
  liquidityErrorMessage,
  onAdd,
  poolTokenPercentage,
  liquidityMinted,
  currencyToAdd,
  isStable,
}) => {
  const { t } = useTranslation()

  let percent = 0.5

  // Calculate distribution percentage for display
  if (isStable && parsedAmounts[Field.CURRENCY_A] && parsedAmounts[Field.CURRENCY_B]) {
    const amountCurrencyA = _toNumber(formatAmountString(parsedAmounts[Field.CURRENCY_A], 6))
    const amountCurrencyB = _toNumber(formatAmountString(parsedAmounts[Field.CURRENCY_B], 6))

    percent = amountCurrencyA / (amountCurrencyA + amountCurrencyB)
  }

  const modalHeader = useCallback(() => {
    return (
      <AddLiquidityModalHeader
        allowedSlippage={allowedSlippage}
        currencies={currencies}
        liquidityMinted={liquidityMinted}
        poolTokenPercentage={poolTokenPercentage}
        price={price}
        noLiquidity={noLiquidity}
        currencyAValue={formatAmountString(parsedAmounts[Field.CURRENCY_A], 6)}
        currencyBValue={formatAmountString(parsedAmounts[Field.CURRENCY_B], 6)}
      >
        <PairDistribution
          title={t('Input')}
          percent={percent}
          currencyA={currencies[Field.CURRENCY_A]}
          currencyAValue={formatAmountString(parsedAmounts[Field.CURRENCY_A], 6)}
          currencyB={currencies[Field.CURRENCY_B]}
          currencyBValue={formatAmountString(parsedAmounts[Field.CURRENCY_B], 6)}
        />
      </AddLiquidityModalHeader>
    )
  }, [allowedSlippage, percent, currencies, liquidityMinted, noLiquidity, parsedAmounts, poolTokenPercentage, price, t])

  const modalBottom = useCallback(() => {
    return (
      <Button
        width="100%"
        onClick={onAdd}
        mt="24px"
        mb="32px"
        height={['37px', , '43px']}
        style={{
          // background: 'linear-gradient(100.7deg, #6473FF 0%, #A35AFF 100%)',
          borderRadius: '8px',
        }}
      >
        <Text lineHeight={['17px', , '19px']} fontSize={['14px', , '16px']} fontWeight="700" color="#FFFFFF">
          {noLiquidity ? t('Create Pool & Supply') : t('Confirm Supply')}
        </Text>
      </Button>
    )
  }, [noLiquidity, onAdd, t])

  const confirmationContent = useCallback(
    () =>
      liquidityErrorMessage ? (
        <TransactionErrorContent onDismiss={onDismiss} message={'Transaction rejected.'} />
      ) : (
        <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />
      ),
    [onDismiss, modalBottom, modalHeader, liquidityErrorMessage],
  )

  return (
    <TransactionConfirmationModal
      minWidth={['100%', , '420px']}
      title={title}
      onDismiss={onDismiss}
      customOnDismiss={customOnDismiss}
      attemptingTxn={attemptingTxn}
      hash={hash}
      content={confirmationContent}
      pendingText={pendingText}
      currencyToAdd={currencyToAdd}
      hideCloseButton={Boolean(hash)}
    />
  )
}

export default ConfirmAddLiquidityModal
