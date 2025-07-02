import { Currency } from '@pancakeswap/aptos-swap-sdk'

export default function currencyId(currency: Currency): string {
  if (currency?.isToken) return currency.address
  throw new Error('invalid currency')
}
