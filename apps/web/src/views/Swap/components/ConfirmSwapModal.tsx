import { useCallback, memo } from 'react'
import { Trade, Currency, TradeType, CurrencyAmount } from '@pancakeswap/sdk'
import { InjectedModalProps, LinkExternal, OpenNewIcon, Text } from '@pancakeswap/uikit'
import {
  TransactionErrorContent,
  TransactionSubmittedContent,
  TransactionSwapErrorContent,
} from 'components/TransactionConfirmationModal'
import { useTranslation } from '@pancakeswap/localization'
import { Field } from 'state/swap/actions'
import { useActiveChainId } from 'hooks/useActiveChainId'
import ConfirmationPendingContent from './ConfirmationPendingContent'
import TransactionConfirmSwapContent from './TransactionConfirmSwapContent'
import ConfirmSwapModalContainer from './ConfirmSwapModalContainer'
import { StableTrade } from '../StableSwap/hooks/useStableTradeExactIn'

const PancakeRouterSlippageErrorMsg =
  'This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.'

const SwapTransactionErrorContent = ({ onDismiss, message, openSettingModal }) => {
  const isSlippagedErrorMsg = message?.includes(PancakeRouterSlippageErrorMsg)

  const handleErrorDismiss = useCallback(() => {
    onDismiss?.()
    if (isSlippagedErrorMsg && openSettingModal) {
      openSettingModal()
    }
  }, [isSlippagedErrorMsg, onDismiss, openSettingModal])
  const { t } = useTranslation()

  return isSlippagedErrorMsg ? (
    <TransactionErrorContent
      message={
        <>
          <Text mb="16px">
            {t(
              'This transaction will not succeed either due to price movement or fee on transfer. Try increasing your',
            )}{' '}
            <Text bold display="inline" style={{ cursor: 'pointer' }} onClick={handleErrorDismiss}>
              <u>{t('slippage tolerance.')}</u>
            </Text>
          </Text>
          <p style={{ paddingBottom: 20 }} className="text_potential">
            {/* <span>
              <a
                href="https://docs.xoxnet.io/products/pancakeswap-exchange/trade-guide"
                target="_blank"
                rel="noreferrer"
                style={{ width: '100%', justifyContent: 'center', color: '#3D8AFF', marginBottom: '32px' }}
              >
                {t('What are the potential issues with the token?')}
                <span>
                  <OpenNewIcon color="#3D8AFF" ml="4px" className="open-icon" />
                </span>
              </a>
            </span> */}
          </p>
        </>
      }
    />
  ) : (
    <TransactionSwapErrorContent message={message} onDismiss={onDismiss} />
  )
}

interface ConfirmSwapModalProps {
  trade?: Trade<Currency, Currency, TradeType> | StableTrade
  originalTrade?: Trade<Currency, Currency, TradeType> | StableTrade
  currencyBalances: { [field in Field]?: CurrencyAmount<Currency> }
  attemptingTxn: boolean
  txHash?: string
  recipient: string | null
  allowedSlippage: number
  onAcceptChanges: () => void
  onConfirm: () => void
  swapErrorMessage?: string
  customOnDismiss?: () => void
  openSettingModal?: () => void
  isStable?: boolean
}

const ConfirmSwapModal: React.FC<React.PropsWithChildren<InjectedModalProps & ConfirmSwapModalProps>> = ({
  trade,
  originalTrade,
  currencyBalances,
  onAcceptChanges,
  allowedSlippage,
  onConfirm,
  onDismiss,
  customOnDismiss,
  recipient,
  swapErrorMessage,
  attemptingTxn,
  txHash,
  openSettingModal,
  isStable,
}) => {
  const { chainId } = useActiveChainId()

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss?.()
  }, [customOnDismiss, onDismiss])

  const confirmationContent = useCallback(
    () => (
      // swapErrorMessage ? (
      //   <SwapTransactionErrorContent
      //     openSettingModal={openSettingModal}
      //     onDismiss={onDismiss}
      //     message={swapErrorMessage}
      //   />
      // ) : (
      <TransactionConfirmSwapContent
        isStable={isStable}
        trade={trade}
        currencyBalances={currencyBalances}
        originalTrade={originalTrade}
        onAcceptChanges={onAcceptChanges}
        allowedSlippage={allowedSlippage}
        onConfirm={onConfirm}
        recipient={recipient}
      />
    ),
    [
      isStable,
      trade,
      originalTrade,
      onAcceptChanges,
      allowedSlippage,
      onConfirm,
      recipient,
      swapErrorMessage,
      onDismiss,
      openSettingModal,
      currencyBalances,
    ],
  )

  if (!chainId) return null
  return (
    <ConfirmSwapModalContainer handleDismiss={handleDismiss} hideCloseButton={!!txHash}>
      {attemptingTxn ? (
        <ConfirmationPendingContent trade={trade} />
      ) : txHash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={txHash}
          onDismiss={handleDismiss}
          currencyToAdd={trade?.outputAmount.currency}
        />
      ) : (
        confirmationContent()
      )}
    </ConfirmSwapModalContainer>
  )
}

export default memo(ConfirmSwapModal)
