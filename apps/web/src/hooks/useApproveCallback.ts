import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { useTranslation } from '@pancakeswap/localization'
import { Currency, CurrencyAmount, Trade, TradeType, ERC20Token } from '@pancakeswap/sdk'
import { useToast } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { ROUTER_ADDRESS, ROUTER_XOX, XOX_ADDRESS, USD_ADDRESS } from 'config/constants/exchange'
import { useCallback, useMemo } from 'react'
import { logError } from 'utils/sentry'
import { Field } from '../state/swap/actions'
import { useHasPendingApproval, useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin } from '../utils'
import { computeSlippageAdjustedAmounts } from '../utils/exchange'
import useGelatoLimitOrdersLib from './limitOrders/useGelatoLimitOrdersLib'
import { useCallWithGasPrice } from './useCallWithGasPrice'
import { useTokenContract } from './useContract'
import useTokenAllowance from './useTokenAllowance'

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: CurrencyAmount<Currency>,
  spender?: string,
  kyber?: boolean,
): [ApprovalState, () => Promise<void>] {
  const { address: account } = useAccount()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const { toastError } = useToast()
  const token = amountToApprove?.currency?.isToken ? amountToApprove.currency : undefined
  const currentAllowance = useTokenAllowance(token, account ?? undefined, spender)
  const pendingApproval = useHasPendingApproval(token?.address, spender)

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    if (amountToApprove.currency?.isNative) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN
    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, pendingApproval, spender])

  const tokenContract = useTokenContract(token?.address)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      toastError(t('Error'), t('Approve was called unnecessarily'))
      console.error('approve was called unnecessarily')
      return undefined
    }
    if (!token) {
      toastError(t('Error'), t('No token'))
      console.error('no token')
      return undefined
    }

    if (!tokenContract) {
      toastError(t('Error'), t('Cannot find contract of the token %tokenAddress%', { tokenAddress: token?.address }))
      console.error('tokenContract is null')
      return undefined
    }

    if (!amountToApprove) {
      toastError(t('Error'), t('Missing amount to approve'))
      console.error('missing amount to approve')
      return undefined
    }

    if (!spender) {
      toastError(t('Error'), t('No spender'))
      console.error('no spender')
      return undefined
    }

    let useExact = false

    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true
      return tokenContract.estimateGas.approve(spender, amountToApprove.quotient.toString())
    })

    return callWithGasPrice(
      tokenContract,
      'approve',
      [spender, useExact ? amountToApprove.quotient.toString() : MaxUint256],
      {
        gasLimit: calculateGasMargin(estimatedGas),
      },
    )
      .then((response: TransactionResponse) => {
        kyber
          ? addTransaction(response, {
              summary: `Approve ${amountToApprove.currency.symbol}`,
              translatableSummary: { text: 'Approve %symbol%', data: { symbol: amountToApprove.currency.symbol } },
              approval: { tokenAddress: token.address, spender },
              type: 'kyber-approve',
            })
          : addTransaction(response, {
              summary: `Approve ${amountToApprove.currency.symbol}`,
              translatableSummary: { text: 'Approve %symbol%', data: { symbol: amountToApprove.currency.symbol } },
              approval: { tokenAddress: token.address, spender },
              type: 'approve',
            })
      })
      .catch((error: any) => {
        logError(error)
        console.error('Failed to approve token', error)
        if (error?.code === 'ACTION_REJECTED') {
          toastError(t('Error'), t('User rejected the request.'))
        }
        if (error?.code !== 4001) {
          toastError(t('Error'), t('Transaction failed'))
        }
      })
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction, callWithGasPrice, t, toastError])

  return [approvalState, approve]
}

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(
  trade?: Trade<Currency, Currency, TradeType>,
  allowedSlippage = 0,
  chainId?: number,
  isRouterNormal = true,
) {
  const amountToApprove = useMemo(
    () => (trade ? computeSlippageAdjustedAmounts(trade, allowedSlippage)[Field.INPUT] : undefined),
    [trade, allowedSlippage],
  )

  const routerAddress = isRouterNormal ? ROUTER_ADDRESS[chainId] : ROUTER_XOX[chainId]
  return useApproveCallback(amountToApprove, routerAddress)
}

export function useRouterNormal(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  chainId?: number,
): boolean {
  if (
    inputCurrency?.isToken &&
    String(inputCurrency?.address).toLowerCase() === XOX_ADDRESS[chainId]?.toLowerCase() &&
    outputCurrency?.isToken &&
    String(outputCurrency?.address).toLowerCase() === USD_ADDRESS[chainId]?.toLowerCase()
  )
    return false

  if (
    outputCurrency?.isToken &&
    outputCurrency?.address.toLowerCase() === XOX_ADDRESS[chainId]?.toLowerCase() &&
    inputCurrency?.isToken &&
    inputCurrency?.address.toLowerCase() === USD_ADDRESS[chainId]?.toLowerCase()
  )
    return false

  return true
}

export function useShowReferralCode(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  chainId?: number,
): boolean {
  if (
    outputCurrency?.isToken &&
    outputCurrency?.address.toLowerCase() === XOX_ADDRESS[chainId]?.toLowerCase() &&
    inputCurrency?.isToken &&
    inputCurrency?.address.toLowerCase() === USD_ADDRESS[chainId]?.toLowerCase()
  )
    return true

  return false
}
// Wraps useApproveCallback in the context of a Gelato Limit Orders
export function useApproveCallbackFromInputCurrencyAmount(currencyAmountIn: CurrencyAmount<Currency> | undefined) {
  const gelatoLibrary = useGelatoLimitOrdersLib()

  return useApproveCallback(currencyAmountIn, gelatoLibrary?.erc20OrderRouter.address ?? undefined)
}
