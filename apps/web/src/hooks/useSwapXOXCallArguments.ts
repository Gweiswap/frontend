import { Contract } from '@ethersproject/contracts'
import { JSBI, Percent, RouterXOX, Router, SwapParametersXOX, Trade, TradeType, Currency } from '@pancakeswap/sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { BIPS_BASE } from 'config/constants/exchange'
import { INITIAL_ALLOWED_SLIPPAGE } from 'config/constants'
import { useRouterContractXOX } from 'utils/exchange'
import useTransactionDeadline from './useTransactionDeadline'

const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export interface SwapCall {
  contract: Contract
  parameters: SwapParametersXOX
}

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName
 */
export function useSwapXOXCallArguments(
  trade: Trade<Currency, Currency, TradeType> | undefined, // trade to execute, required
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  recipientAddress: string | null, // the address of the recipient of the trade, or null if swap should be returned to sender
  referralAddress: string | null,
  isRouterNormal = true,
): SwapCall[] {
  const { account, chainId } = useActiveWeb3React()
  const recipient = recipientAddress === null ? account : recipientAddress
  const ref = referralAddress === null ? ADDRESS_ZERO : referralAddress
  const deadline = useTransactionDeadline()
  const contract = useRouterContractXOX(isRouterNormal)

  return useMemo(() => {
    if (!trade || !account || !chainId || !deadline || !recipient) return []

    if (!contract) {
      return []
    }

    const swapMethods = []
    if (isRouterNormal) {
      swapMethods.push(
        Router.swapCallParameters(trade, {
          feeOnTransfer: false,
          allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
          recipient,
          deadline: deadline.toNumber(),
        }),
      )
      if (trade.tradeType === TradeType.EXACT_INPUT) {
        swapMethods.push(
          Router.swapCallParameters(trade, {
            feeOnTransfer: true,
            allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
            recipient,
            deadline: deadline.toNumber(),
          }),
        )
      }
    } else {
      swapMethods.push(
        RouterXOX.swapCallParameters(trade, {
          feeOnTransfer: false,
          allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
          ref,
          deadline: deadline.toNumber(),
        }),
      )
      if (trade.tradeType === TradeType.EXACT_INPUT) {
        swapMethods.push(
          RouterXOX.swapCallParameters(trade, {
            feeOnTransfer: true,
            allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
            ref,
            deadline: deadline.toNumber(),
          }),
        )
      }
    }

    return swapMethods.map((parameters) => ({ parameters, contract }))
  }, [account, allowedSlippage, chainId, contract, deadline, ref, trade, isRouterNormal])
}
