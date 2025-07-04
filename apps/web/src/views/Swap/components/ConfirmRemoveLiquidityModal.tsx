import React, { useCallback } from 'react'
import { Currency, CurrencyAmount, Pair, Percent, Token } from '@pancakeswap/sdk'
import { AddIcon, Button, InjectedModalProps, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import TransactionConfirmationModal, {
  ConfirmationModalContent,
  TransactionErrorContent,
} from 'components/TransactionConfirmationModal'
import { AutoColumn } from 'components/Layout/Column'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import { Field } from 'state/burn/actions'
import { CurrencyLogo, DoubleCurrencyLogo } from 'components/Logo'
import { ApprovalState } from 'hooks/useApproveCallback'
import { ZapErrorMessages } from '../../AddLiquidity/components/ZapErrorMessage'
import { formatAmountString } from '@pancakeswap/utils/formatBalance'
import { TransactionState } from 'views/RemoveLiquidity'

interface ConfirmRemoveLiquidityModalProps {
  title: string
  customOnDismiss: () => void
  attemptingTxn: boolean
  pair?: Pair
  hash: string
  pendingText: string
  parsedAmounts: {
    [Field.LIQUIDITY_PERCENT]: Percent
    [Field.LIQUIDITY]?: CurrencyAmount<Token>
    [Field.CURRENCY_A]?: CurrencyAmount<Currency>
    [Field.CURRENCY_B]?: CurrencyAmount<Currency>
  }
  allowedSlippage: number
  onRemove: () => void
  liquidityErrorMessage: string
  approval: ApprovalState
  signatureData?: any
  tokenA: Token
  tokenB: Token
  currencyA: Currency | null | undefined
  currencyB: Currency | null | undefined
  isZap?: boolean
  toggleZapMode?: (value: boolean) => void
  transactionState?: TransactionState
}

const ConfirmRemoveLiquidityModal: React.FC<
  React.PropsWithChildren<InjectedModalProps & ConfirmRemoveLiquidityModalProps>
> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  pair,
  hash,
  approval,
  signatureData,
  pendingText,
  parsedAmounts,
  allowedSlippage,
  onRemove,
  liquidityErrorMessage,
  tokenA,
  tokenB,
  currencyA,
  currencyB,
  isZap,
  toggleZapMode,
  transactionState,
}) => {
  const { t } = useTranslation()

  const modalHeader = useCallback(() => {
    return (
      <AutoColumn gap="md">
        {parsedAmounts[Field.CURRENCY_A] && (
          <RowBetween align="flex-end" style={{ marginBottom: 0 }}>
            <Text fontSize="24px">{formatAmountString(parsedAmounts[Field.CURRENCY_A], 6)}</Text>
            <RowFixed gap="4px">
              <CurrencyLogo currency={currencyA} size="24px" />
              <Text fontSize="24px" ml="10px">
                {currencyA?.symbol}
              </Text>
            </RowFixed>
          </RowBetween>
        )}
        {parsedAmounts[Field.CURRENCY_A] && parsedAmounts[Field.CURRENCY_B] && (
          <RowFixed>
            <AddIcon width="16px" />
          </RowFixed>
        )}
        {parsedAmounts[Field.CURRENCY_B] && (
          <RowBetween align="flex-end" style={{ marginBottom: 0 }}>
            <Text fontSize="24px">{formatAmountString(parsedAmounts[Field.CURRENCY_B], 6)}</Text>
            <RowFixed gap="4px">
              <CurrencyLogo currency={currencyB} size="24px" />
              <Text fontSize="24px" ml="10px">
                {currencyB?.symbol}
              </Text>
            </RowFixed>
          </RowBetween>
        )}

        <Text small textAlign="left" py="12px">
          {t('Output is estimated. If the price changes by more than %slippage%% your transaction will revert.', {
            slippage: allowedSlippage / 100,
          })}
        </Text>
      </AutoColumn>
    )
  }, [allowedSlippage, currencyA, currencyB, parsedAmounts, t])

  const modalBottom = useCallback(() => {
    return (
      <>
        <RowBetween>
          <Text>
            {t('%assetA%/%assetB% Burned', { assetA: currencyA?.symbol ?? '', assetB: currencyB?.symbol ?? '' })}
          </Text>
          <RowFixed>
            <DoubleCurrencyLogo currency0={currencyA} currency1={currencyB} margin />
            <Text>{formatAmountString(parsedAmounts[Field.LIQUIDITY], 6)}</Text>
          </RowFixed>
        </RowBetween>
        {pair && (
          <>
            <RowBetween>
              <Text>{t('Price')}</Text>
              <Text>
                1 {currencyA?.symbol} = {tokenA ? formatAmountString(pair.priceOf(tokenA), 6) : '-'} {currencyB?.symbol}
              </Text>
            </RowBetween>
            <RowBetween>
              <Text>
                1 {currencyB?.symbol} = {tokenB ? formatAmountString(pair.priceOf(tokenB), 6) : '-'} {currencyA?.symbol}
              </Text>
            </RowBetween>
          </>
        )}
        <Button
          width="100%"
          mt="20px"
          mb="32px"
          height={43}
          disabled={!(approval === ApprovalState.APPROVED || signatureData !== null) || transactionState !== 'finished'}
          onClick={onRemove}
        >
          {t('Confirm')}
        </Button>
      </>
    )
  }, [currencyA, currencyB, parsedAmounts, approval, onRemove, pair, tokenA, tokenB, t, signatureData])

  const confirmationContent = useCallback(
    () =>
      liquidityErrorMessage ? (
        <>
          {isZap && (
            <ZapErrorMessages isSingleToken zapMode={isZap} toggleZapMode={toggleZapMode} onModalDismiss={onDismiss} />
          )}
          <TransactionErrorContent onDismiss={onDismiss} message={'Transaction rejected.'} />
        </>
      ) : (
        <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />
      ),
    [liquidityErrorMessage, isZap, toggleZapMode, onDismiss, modalHeader, modalBottom],
  )

  return (
    <TransactionConfirmationModal
      title={title}
      onDismiss={onDismiss}
      customOnDismiss={customOnDismiss}
      attemptingTxn={attemptingTxn}
      hash={hash}
      content={confirmationContent}
      pendingText={pendingText}
      hideCloseButton={Boolean(hash)}
    />
  )
}

export default ConfirmRemoveLiquidityModal
