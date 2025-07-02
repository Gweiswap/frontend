import { useTranslation } from '@pancakeswap/localization'
import { Button, Text, useMatchBreakpoints, useModal, useToast } from '@pancakeswap/uikit'
import { Currency, CurrencyAmount, Trade, TradeType } from '@pancakeswap/sdk'
import axios from 'axios'
import { GreyCard } from 'components/Card'
import { CommitButton } from 'components/CommitButton'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { WrapType } from 'hooks/useWrapCallback'
import { AutoRow, RowBetween } from 'components/Layout/Row'
import { ApprovalState } from 'hooks/useApproveCallback'
import CircleLoader from 'components/Loader/CircleLoader'
import { Field } from 'state/swap/actions'
import SettingsModal, { withCustomOnDismiss } from 'components/Menu/GlobalSettings/SettingsModal'
import { SettingsMode } from 'components/Menu/GlobalSettings/types'
import { useCallback, useEffect, useState } from 'react'
import Column from 'components/Layout/Column'
import { useUserSingleHopOnly } from 'state/user/hooks'
import { BIG_INT_ZERO } from 'config/constants/exchange'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/exchange'
import { useSwapCallback } from 'hooks/useSwapCallback'
import { useSwapCallArguments } from 'hooks/useSwapCallArguments'
import { useSwapXOXCallArguments } from 'hooks/useSwapXOXCallArguments'

import ConfirmSwapModal from './ConfirmSwapModal'
import ProgressSteps from './ProgressSteps'
import confirmPriceImpactWithoutFee from './confirmPriceImpactWithoutFee'
import { SwapCallbackError } from './styleds'

const SettingsModalWithCustomDismiss = withCustomOnDismiss(SettingsModal)

interface SwapCommitButtonPropsType {
  swapIsUnsupported: boolean
  account: string
  showWrap: boolean
  wrapInputError: string
  onWrap: () => Promise<void>
  wrapType: WrapType
  approval: ApprovalState
  approveCallback: () => Promise<void>
  approvalSubmitted: boolean
  currencies: {
    INPUT?: Currency
    OUTPUT?: Currency
  }
  isExpertMode: boolean
  trade: Trade<Currency, Currency, TradeType>
  swapInputError: string
  currencyBalances: {
    INPUT?: CurrencyAmount<Currency>
    OUTPUT?: CurrencyAmount<Currency>
  }
  recipient: string
  referral?: string
  isRouterNormal?: boolean
  allowedSlippage: number
  parsedIndepentFieldAmount: CurrencyAmount<Currency>
  onUserInput: (field: Field, typedValue: string) => void
}

export default function SwapCommitButton({
  swapIsUnsupported,
  account,
  showWrap,
  wrapInputError,
  onWrap,
  wrapType,
  approval,
  approveCallback,
  approvalSubmitted,
  currencies,
  isExpertMode,
  trade,
  swapInputError,
  currencyBalances,
  recipient,
  referral,
  isRouterNormal,
  allowedSlippage,
  parsedIndepentFieldAmount,
  onUserInput,
}: SwapCommitButtonPropsType) {
  const { t } = useTranslation()
  const [singleHopOnly] = useUserSingleHopOnly()
  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)
  // the callback to execute the swap
  const swapCalls = useSwapXOXCallArguments(trade, allowedSlippage, recipient, referral, isRouterNormal)
  const { isMobile } = useMatchBreakpoints()

  const { toastWarning } = useToast()

  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    recipient,
    swapCalls,
  )
  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: Trade<Currency, Currency, TradeType> | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  // Handlers
  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee, t)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash })
      })
      .catch((error) => {
        let message = error?.message

        if (error?.message.length > 250) {
          message = 'Transaction failed.'
        }
        if (error?.message.includes('rejected transaction')) {
          message = 'Transaction rejected.'
        }

        toastWarning(t('Confirm Swap'), t(message))

        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: message,
          txHash: undefined,
        })
      })
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm, t, setSwapState])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn })
  }, [attemptingTxn, swapErrorMessage, trade, txHash, setSwapState])

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash, setSwapState])

  // End Handlers

  // Modals
  const [indirectlyOpenConfirmModalState, setIndirectlyOpenConfirmModalState] = useState(false)

  const [onPresentSettingsModal] = useModal(
    <SettingsModalWithCustomDismiss
      customOnDismiss={() => setIndirectlyOpenConfirmModalState(true)}
      mode={SettingsMode.SWAP_LIQUIDITY}
    />,
  )

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      currencyBalances={currencyBalances}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
      openSettingModal={onPresentSettingsModal}
    />,
    true,
    true,
    'confirmSwapModal',
  )
  // End Modals
  const getUserByReferral = async (ref: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/users?ref=${ref}`)
    if (response && response.data && response.data.address) {
      return response.data.address
    }
    return ''
  }

  const onSwapHandler = useCallback(() => {
    if (isExpertMode) {
      handleSwap()
    } else {
      setSwapState({
        tradeToConfirm: trade,
        attemptingTxn: false,
        swapErrorMessage: undefined,
        txHash: undefined,
      })
      onPresentConfirmModal()
    }
  }, [isExpertMode, handleSwap, onPresentConfirmModal, trade])

  // useEffect
  useEffect(() => {
    if (indirectlyOpenConfirmModalState) {
      setIndirectlyOpenConfirmModalState(false)
      setSwapState((state) => ({
        ...state,
        swapErrorMessage: undefined,
      }))
      onPresentConfirmModal()
    }
  }, [indirectlyOpenConfirmModalState, onPresentConfirmModal, setSwapState])

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)
  useEffect(() => {
    if (referral) {
      // TODO VUONG
      getUserByReferral(referral)
    }
  }, [referral])
  if (swapIsUnsupported) {
    return (
      <Button width="100%" disabled style={{ fontSize: isMobile ? '16px' : '18px' }}>
        {t('Unsupported Asset')}
      </Button>
    )
  }

  if (!account) {
    return <ConnectWalletButton width="100%" style={{ fontSize: isMobile ? '16px' : '18px' }} />
  }

  if (showWrap) {
    return (
      <CommitButton
        width="100%"
        disabled={Boolean(wrapInputError)}
        onClick={onWrap}
        style={{ fontSize: isMobile ? '16px' : '18px' }}
      >
        {wrapInputError ?? (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
      </CommitButton>
    )
  }

  const noRoute = !trade?.route

  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedIndepentFieldAmount?.greaterThan(BIG_INT_ZERO),
  )

  if (noRoute && userHasSpecifiedInputOutput) {
    return (
      <GreyCard style={{ textAlign: 'center', padding: '0.75rem' }}>
        <Text color="textSubtle">{t('Insufficient liquidity for this trade.')}</Text>
        {singleHopOnly && <Text color="textSubtle">{t('Try enabling multi-hop trades.')}</Text>}
      </GreyCard>
    )
  }

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const isValid = !swapInputError

  const isSwap = !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)

  if (showApproveFlow) {
    return (
      <>
        <RowBetween>
          {isSwap ? (
            <CommitButton
              variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
              onClick={approveCallback}
              // disabled
              disabled={
                process.env.NEXT_PUBLIC_TEST_MODE !== '1' ||
                approval !== ApprovalState.NOT_APPROVED ||
                approvalSubmitted
              }
              width="100%"
              style={{ fontSize: isMobile ? '16px' : '18px' }}
            >
              {approval === ApprovalState.PENDING ? (
                <AutoRow gap="6px" justify="center">
                  {t('Enabling')} <CircleLoader stroke="white" />
                </AutoRow>
              ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                t('Enabled')
              ) : (
                t('Enable %asset%', { asset: currencies[Field.INPUT]?.symbol ?? '' })
              )}
            </CommitButton>
          ) : (
            <CommitButton
              variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
              onClick={() => {
                onSwapHandler()
              }}
              width="100%"
              id="swap-button"
              height={43}
              // disabled
              disabled={process.env.NEXT_PUBLIC_TEST_MODE !== '1' || isSwap}
              style={{ fontSize: isMobile ? '16px' : '18px' }}
            >
              {priceImpactSeverity > 3 && !isExpertMode
                ? t('Price Impact High')
                : priceImpactSeverity > 2
                ? t('Swap Anyway')
                : t('Swap')}
            </CommitButton>
          )}
        </RowBetween>
        <Column style={{ marginTop: '1rem' }}>
          <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
        </Column>
        {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </>
    )
  }

  return (
    <>
      <CommitButton
        variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
        onClick={() => {
          onSwapHandler()
        }}
        id="swap-button"
        height={43}
        width="100%"
        // disabled
        disabled={
          process.env.NEXT_PUBLIC_TEST_MODE !== '1' ||
          !isValid ||
          (priceImpactSeverity > 3 && !isExpertMode) ||
          !!swapCallbackError
        }
        style={{ fontSize: isMobile ? '16px' : '18px' }}
      >
        {swapInputError ||
          (priceImpactSeverity > 3 && !isExpertMode
            ? t('Price Impact Too High')
            : priceImpactSeverity > 2
            ? t('Swap Anyway')
            : t('Swap'))}
      </CommitButton>

      {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
    </>
  )
}
