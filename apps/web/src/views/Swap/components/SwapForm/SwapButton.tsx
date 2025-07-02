import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { Currency, CurrencyAmount, Percent } from '@pancakeswap/swap-sdk-core'
import { CircleLoader, useMatchBreakpoints, useModal, useToast } from '@pancakeswap/uikit'
import { CommitButton } from 'components/CommitButton'
import { AutoRow } from 'components/Layout/Row'
import { ApprovalState } from 'hooks/useApproveCallback'
import { parseEther } from '@ethersproject/units'
import ConfirmKyberSwapModal from './ConfirmKyberSwapModal'
import useBuildKyberswap from 'hooks/useBuildKyberswap'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSigner } from 'wagmi'
import { ToastDescriptionWithTx } from 'components/Toast'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTransactionAdder } from 'state/transactions/hooks'

type Props = {
  approval: ApprovalState
  currencyIn: Currency
  currencyOut: Currency
  balance: CurrencyAmount<Currency>
  tokenInImgUrl: string
  tokenOutImgUrl: string
  tokenInAmount: string
  summary: any
  allowedSlippage: number
  recipient: string | null
  routerAddress: string
  fullRoute: any
  attemptingTxn: boolean
  priceImpact: Percent
  setAttemptingTxn: (b: boolean) => void
  approveCallback: () => Promise<void>
}
const SwapButton = ({
  approval,
  currencyIn,
  currencyOut,
  balance,
  tokenInImgUrl,
  tokenOutImgUrl,
  tokenInAmount,
  summary,
  allowedSlippage,
  recipient,
  routerAddress,
  fullRoute,
  attemptingTxn,
  priceImpact,
  setAttemptingTxn,
  approveCallback,
}: Props) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()
  const { account } = useActiveWeb3React()
  const { buildSwap, data } = useBuildKyberswap({
    fullRoute,
    slippage: allowedSlippage,
    chainId,
    account,
  })
  const { toastSuccess, toastError } = useToast()
  const { data: signer } = useSigner()
  const [transaction, setTransaction] = useState<any>()
  const addTransaction = useTransactionAdder()

  const onSwap = useCallback(async () => {
    if (!data || attemptingTxn) return
    setAttemptingTxn(true)
    let transaction = {
      to: routerAddress,
      data: data,
    }
    if (currencyIn.isNative) {
      transaction['value'] = summary.amountIn
    }
    try {
      const transactionResponse = await signer.sendTransaction(transaction)
      toastSuccess(t('Transaction has succeeded!'), <ToastDescriptionWithTx txHash={transactionResponse.hash} />)
      const translatableWithRecipient = 'Swap %inputAmount% %inputSymbol% for %outputAmount% %outputSymbol%'
      addTransaction(transactionResponse, {
        summary: account,
        translatableSummary: {
          text: translatableWithRecipient,
          data: {
            inputAmount: CurrencyAmount.fromRawAmount(currencyIn, summary.amountIn).toSignificant(6),
            inputSymbol: currencyIn.symbol,
            outputAmount: CurrencyAmount.fromRawAmount(currencyOut, summary.amountOut).toSignificant(6),
            outputSymbol: currencyOut.symbol,
          },
        },
        type: 'kyber-swap',
      })
      setTransaction(transactionResponse)
    } catch (error) {
      setTransaction({ swapErrorMessage: error })
      toastError(t('Error'), t('Transaction failed'))
    }
    setAttemptingTxn(false)
  }, [data, account, currencyIn, currencyOut, routerAddress, attemptingTxn, summary])

  const onDismiss = useCallback(() => {
    setTransaction(undefined)
  }, [])

  const [onPresentConfirmModal] = useModal(
    <ConfirmKyberSwapModal
      currencyIn={currencyIn}
      currencyOut={currencyOut}
      tokenInImgUrl={tokenInImgUrl}
      tokenOutImgUrl={tokenOutImgUrl}
      tokenInAmount={tokenInAmount}
      summary={summary}
      allowedSlippage={allowedSlippage}
      recipient={recipient}
      routerAddress={routerAddress}
      attemptingTxn={attemptingTxn}
      txHash={transaction?.hash}
      swapErrorMessage={transaction?.swapErrorMessage}
      disabled={!data}
      priceImpact={priceImpact}
      onConfirm={onSwap}
      customOnDismiss={onDismiss}
    />,
    true,
    true,
    'confirmSwapModal',
  )

  const onSwapHandler = useCallback(() => {
    buildSwap()
    onPresentConfirmModal()
  }, [buildSwap])

  const isNotEnoughBalance = useMemo(() => {
    if (!tokenInAmount) return false

    return balance && parseEther(balance.toExact()).lt(parseEther(tokenInAmount))
  }, [balance, tokenInAmount])

  const isOverSlippage = () => {
    return allowedSlippage > 1999
  }

  return !account ? (
    <ConnectWalletButton width="100%" style={{ fontSize: isMobile ? '16px' : '18px', marginTop: '16px' }} />
  ) : isNotEnoughBalance ? (
    <CommitButton disabled width="100%" style={{ fontSize: isMobile ? '16px' : '18px' }}>
      {t('Insufficient Balance')}
    </CommitButton>
  ) : approval !== ApprovalState.APPROVED ? (
    <CommitButton
      variant={'primary'}
      onClick={approveCallback}
      disabled={process.env.NEXT_PUBLIC_TEST_MODE !== '1' || approval !== ApprovalState.NOT_APPROVED}
      width="100%"
      style={{ fontSize: isMobile ? '16px' : '18px' }}
    >
      {approval === ApprovalState.PENDING ? (
        <AutoRow gap="6px" justify="center">
          {t('Enabling')} <CircleLoader stroke="white" />
        </AutoRow>
      ) : (
        t('Enable %asset%', { asset: currencyIn?.symbol ?? '' })
      )}
    </CommitButton>
  ) : (
    <CommitButton
      onClick={() => {
        onSwapHandler()
      }}
      width="100%"
      id="swap-button"
      height={43}
      disabled={process.env.NEXT_PUBLIC_TEST_MODE !== '1' || isOverSlippage()}
      style={{ fontSize: isMobile ? '16px' : '18px' }}
    >
      {isOverSlippage() && !parseEther(tokenInAmount).isZero() ? t('Max slippage is 19.99') : t('Swap')}
    </CommitButton>
  )
}

export default SwapButton
