import { InjectedModalProps } from '@pancakeswap/uikit'
import { useActiveChainId } from 'hooks/useActiveChainId'
import React, { useCallback } from 'react'
import ConfirmSwapModalContainer from '../ConfirmSwapModalContainer'
import ConfirmationKyberPendingContent from './ConfirmationKyberPendingContent'
import { TransactionSubmittedContent } from 'components/TransactionConfirmationModal'
import ConfirmationKyberContent from './ConfirmationKyberContent'
import { Currency, Percent } from '@pancakeswap/sdk'

interface ConfirmSwapModalProps {
  currencyIn: Currency
  currencyOut: Currency
  tokenInImgUrl: string
  tokenOutImgUrl: string
  tokenInAmount: string
  summary: any
  allowedSlippage: number
  recipient: string | null
  routerAddress: string
  attemptingTxn?: boolean
  txHash?: string
  swapErrorMessage?: string
  disabled: boolean
  priceImpact: Percent
  onConfirm?: () => void
  customOnDismiss?: () => void
}

const ConfirmKyberSwapModal: React.FC<React.PropsWithChildren<InjectedModalProps & ConfirmSwapModalProps>> = ({
  currencyIn,
  currencyOut,
  tokenInImgUrl,
  tokenOutImgUrl,
  tokenInAmount,
  summary,
  allowedSlippage,
  recipient,
  routerAddress,
  attemptingTxn,
  txHash,
  swapErrorMessage,
  disabled,
  priceImpact,
  onConfirm,
  onDismiss,
  customOnDismiss,
}) => {
  const { chainId } = useActiveChainId()

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss?.()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null
  return (
    <ConfirmSwapModalContainer handleDismiss={handleDismiss} hideCloseButton={!!txHash}>
      {attemptingTxn ? (
        <ConfirmationKyberPendingContent
          currencyIn={currencyIn}
          tokenInAmount={tokenInAmount}
          currencyOut={currencyOut}
          tokenOutAmountWei={summary.amountOut}
        />
      ) : txHash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={txHash}
          onDismiss={handleDismiss}
          currencyToAdd={currencyOut}
        />
      ) : (
        <ConfirmationKyberContent
          currencyIn={currencyIn}
          currencyOut={currencyOut}
          tokenInImgUrl={tokenInImgUrl}
          tokenOutImgUrl={tokenOutImgUrl}
          tokenInAmount={tokenInAmount}
          summary={summary}
          allowedSlippage={allowedSlippage}
          recipient={recipient}
          routerAddress={routerAddress}
          disabled={disabled}
          priceImpact={priceImpact}
          onConfirm={onConfirm}
        />
      )}
    </ConfirmSwapModalContainer>
  )
}

export default ConfirmKyberSwapModal
