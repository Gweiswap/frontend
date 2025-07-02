import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber, FixedNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { getLanguageCodeFromLS } from '@pancakeswap/localization'
import { getFullDecimalMultiplier } from '@pancakeswap/utils/getFullDecimalMultiplier'

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: BigNumber | number, decimals = 18) => {
  return new BigNumber(amount).times(getFullDecimalMultiplier(decimals))
}

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(getFullDecimalMultiplier(decimals))
}

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18, displayDecimals?: number): string => {
  return getBalanceAmount(balance, decimals).toFixed(displayDecimals as number)
}

/**
 * Don't use the result to convert back to number.
 * It uses undefined locale which uses host language as a result.
 * Languages have different decimal separators which results in inconsistency when converting back this result to number.
 */
export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  }
  return number.toLocaleString(undefined, options)
}

/**
 * Method to format the display of wei given an EthersBigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (number: EthersBigNumber, displayDecimals = 18, decimals = 18) => {
  const remainder = number.mod(EthersBigNumber.from(10).pow(decimals - displayDecimals))
  return formatUnits(number.sub(remainder), decimals)
}

/**
 * Method to format the display of wei given an EthersBigNumber object with toFixed
 * Note: rounds
 */
export const formatBigNumberToFixed = (number: EthersBigNumber, displayDecimals = 18, decimals = 18) => {
  const formattedString = formatUnits(number, decimals)
  return (+formattedString).toFixed(displayDecimals)
}

/**
 * Formats a FixedNumber like BigNumber
 * i.e. Formats 9763410526137450427.1196 into 9.763 (3 display decimals)
 */
export const formatFixedNumber = (number: FixedNumber, displayDecimals = 18, decimals = 18) => {
  // Remove decimal
  const [leftSide] = number.toString().split('.')
  return formatBigNumber(EthersBigNumber.from(leftSide), displayDecimals, decimals)
}

export const formatLocalisedCompactNumber = (number: number): string => {
  const codeFromStorage = getLanguageCodeFromLS()

  const isClient = typeof window === 'object'
  const isSupported = window?.Intl

  // For clients do not support Intl, just return number
  if (isClient && !isSupported) {
    return `${number}`
  }

  return new Intl.NumberFormat(codeFromStorage, {
    notation: 'compact',
    compactDisplay: 'long',
    maximumSignificantDigits: 2,
  }).format(number)
}

export default formatLocalisedCompactNumber

export const formatLpBalance = (balance: BigNumber, decimals: number) => {
  const stakedBalanceBigNumber = getBalanceAmount(balance, decimals)
  if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.00001)) {
    return '< 0.00001'
  }
  return stakedBalanceBigNumber.toFixed(5, BigNumber.ROUND_DOWN)
}

export const formatAmountNumber = (number: number, decimals = 3) => {
  return parseInt((number * 10 ** decimals).toString()) / 10 ** decimals
}

export const roundingAmountNumber = (number: number, decimals = 2) => {
  try {
    return parseInt((parseFloat(number.toFixed(8)) * 10 ** decimals).toString()) / 10 ** decimals
  } catch (error) {
    return parseInt((parseFloat(number.toFixed()) * 10 ** decimals).toString()) / 10 ** decimals
  }
}

export const formatAmountString = (number: any, decimals = 2) => {
  if (!number) return '0'
  let result = 0
  try {
    result = parseInt((parseFloat(number.toFixed(8)) * 10 ** decimals).toString()) / 10 ** decimals
  } catch (error) {
    result = parseInt((parseFloat(number.toFixed()) * 10 ** decimals).toString()) / 10 ** decimals
  }
  const value = result?.toString()?.split('.')
  const firstNumber = value[0]?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  const lastNumber = value[1]

  if (!lastNumber) {
    return firstNumber
  }
  return `${firstNumber}.${lastNumber}`
}

export const formatAmountNumber2 = (number: number, decimals = 2) => {
  if (!number) return 0

  if (number < 1) {
    return number
  }
  const convest = new BigNumber(number).toString()
  const value = convest.toString().split('.')
  const firstNumber = value[0]?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  const lastNumber = value[1] ? value[1].slice(0, decimals) : undefined

  if (!lastNumber) {
    return firstNumber
  }
  return `${firstNumber}.${lastNumber}`
}

export const formatAmountStable = (number: number, decimals = 2) => {
  if (number > 0 && number <= 0.000001) {
    return `< 0.01`
  }
  const convest = new BigNumber(number).toString()
  const value = convest.toString().split('.')
  const firstNumber = value[0]?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  const lastNumber = value[1] ? value[1].slice(0, decimals) : undefined

  if (!lastNumber) {
    return firstNumber
  }
  return `${firstNumber}.${lastNumber}`
}

export const formatBalanceComma = (balance: string) => {
  if (Number(balance) <= 0.000001) {
    return `0.000000...`
  }
  const value = balance?.split('.')
  const firstNumber = value[0]?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  const lastNumber = value[1]
  let data
  if (!lastNumber) {
    data = firstNumber
    return data
  }
  data = `${firstNumber}.${lastNumber}`

  if (data.length <= 10) {
    return data
  }
  return `${data.slice(0, 10)}...`
}

export const formatBalance = (balance: string) => {
  if (Number(balance) <= 0.000001) {
    return `0.000000...`
  }
  const value = balance?.split('.')
  const firstNumber = value[0]?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  const lastNumber = value[1]
  let data
  if (!lastNumber || !Number(lastNumber)) {
    data = firstNumber
    return data
  }

  data = `${firstNumber}.${lastNumber}`

  if (data.length <= 10) {
    return data
  }
  return `${data.slice(0, 10)}`
}
