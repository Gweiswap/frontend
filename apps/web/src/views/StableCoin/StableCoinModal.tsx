import React, { useCallback } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import TransactionConfirmationModal, { TransactionErrorContent } from 'components/TransactionConfirmationModal'
import _toNumber from 'lodash/toNumber'
import { roundingAmountNumber } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'

const StableCoinModal = (props: any) => {
  const { t } = useTranslation()
  const { onDismiss, isUSDT, amount, txHas, pending, withdrawErrorMessage } = props
  const amountParse = new BigNumber(amount).toNumber()

  const confirmationContent = useCallback(
    () =>
      withdrawErrorMessage ? (
        <>
          <TransactionErrorContent message={withdrawErrorMessage} onDismiss={onDismiss} />
        </>
      ) : (
        <></>
      ),
    [withdrawErrorMessage, onDismiss],
  )

  return (
    <TransactionConfirmationModal
      title={t('Confirm Withdraw')}
      content={confirmationContent}
      pendingText={
        <>
          {t('Withdraw Amount')} ${roundingAmountNumber(amountParse, 6)}
          <br />
          {t('You will receive:')} {`${roundingAmountNumber(amountParse * 0.99, 6)} ${isUSDT ? 'USDT' : 'USDC'}`}
          <br />
          {t('Platform Fee:')} {`${roundingAmountNumber(amountParse * 0.01, 6)} ${isUSDT ? 'USDT' : 'USDC'}`}
        </>
      }
      attemptingTxn={pending}
      hash={txHas}
      onDismiss={onDismiss}
      iconGridLoader
      hideCloseButton={Boolean(txHas)}
    />
  )
}

export default StableCoinModal
