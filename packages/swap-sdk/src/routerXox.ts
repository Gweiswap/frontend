import { TradeType, Token, CurrencyAmount, Currency, Percent } from '@pancakeswap/swap-sdk-core'
import { Trade } from './entities'
import { validateAndParseAddress } from './utils'
import invariant from 'tiny-invariant'

/**
 * Options for producing the arguments to send call to the router.
 */
export interface TradeOptionsXOX {
  /**
   * How much the execution price is allowed to move unfavorably from the trade execution price.
   */
  allowedSlippage: Percent
  /**
   * How long the swap is valid until it expires, in seconds.
   * This will be used to produce a `deadline` parameter which is computed from when the swap call parameters
   * are generated.
   */
  ttl: number
  /**
   * The account that should receive the output of the swap.
   */
  ref: string

  /**
   * Whether any of the tokens in the path are fee on transfer tokens, which should be handled with special methods
   */
  feeOnTransfer?: boolean
}

export interface TradeOptionsXOXDeadline extends Omit<TradeOptionsXOX, 'ttl'> {
  /**
   * When the transaction expires.
   * This is an atlernate to specifying the ttl, for when you do not want to use local time.
   */
  deadline: number
}

/**
 * The parameters to use in the call to the Pancake Router to execute a trade.
 */
export interface SwapParametersXOX {
  /**
   * The method to call on the Pancake Router.
   */
  methodName: string
  /**
   * The arguments to pass to the method, all hex encoded.
   */
  args: (string | string[])[]
  /**
   * The amount of wei to send in hex.
   */
  value: string
}

function toHex(currencyAmount: CurrencyAmount<Currency>) {
  return `0x${currencyAmount.quotient.toString(16)}`
}

const ZERO_HEX = '0x0'

/**
 * Represents the Pancake Router, and has static methods for helping execute trades.
 */
export abstract class RouterXOX {
  /**
   * Cannot be constructed.
   */
  private constructor() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */
  public static swapCallParameters(
    trade: Trade<Currency, Currency, TradeType>,
    options: TradeOptionsXOX | TradeOptionsXOXDeadline
  ): SwapParametersXOX {
    const etherIn = trade.inputAmount.currency.isNative
    const etherOut = trade.outputAmount.currency.isNative
    // the router does not support both ether in and out
    invariant(!(etherIn && etherOut), 'ETHER_IN_OUT')
    invariant(!('ttl' in options) || options.ttl > 0, 'TTL')

    const ref: string = validateAndParseAddress(options.ref)
    const amountIn: string = toHex(trade.maximumAmountIn(options.allowedSlippage))
    const amountOut: string = toHex(trade.minimumAmountOut(options.allowedSlippage))
    const path: string[] = trade.route.path.map((token: Token) => token.address)
    const deadline =
      'ttl' in options
        ? `0x${(Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16)}`
        : `0x${options.deadline.toString(16)}`

    const useFeeOnTransfer = Boolean(options.feeOnTransfer)

    let methodName: string
    let args: (string | string[])[]
    let value: string
    
    switch (trade.tradeType) {
      case TradeType.EXACT_INPUT:
        methodName = 'swapExactTokensForTokens'
        // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        args = [amountIn, amountOut, path, ref, deadline]
        value = ZERO_HEX

        break
      case TradeType.EXACT_OUTPUT:
        invariant(!useFeeOnTransfer, 'EXACT_OUT_FOT')
        methodName = 'swapTokensForExactTokens'
        // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        args = [amountOut, amountIn, path, ref, deadline]
        value = ZERO_HEX

        break
    }
    return {
      methodName,
      args,
      value,
    }
  }
}
