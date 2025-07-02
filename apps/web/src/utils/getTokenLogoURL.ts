import { getAddress } from '@ethersproject/address'
import { ChainId, Token } from '@pancakeswap/sdk'
import { XOX_ADDRESS } from 'config/constants/exchange'

const mapping = {
  [ChainId.BSC]: 'smartchain',
  [ChainId.ETHEREUM]: 'ethereum',
  [ChainId.GOERLI]: 'goerli',
  [ChainId.BSC_TESTNET]: 'bsc_testnet',
  [ChainId.OPTIMISM]: 'optimism',
  [ChainId.ARBITRUM]: 'arbitrum',
  [ChainId.ZKSYNC]: 'zksync',
  [ChainId.POLYGON]: 'polygon',
}

const getTokenLogoURL = (token?: Token, coinmarketcapId?: string) => {
  if (token && token.symbol.toLocaleUpperCase() === 'XOX') {
    return `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/tokens/xox-icon.svg`
  }
  if (token && token.symbol?.toUpperCase() === 'GAS') {
    return 'https://s2.coinmarketcap.com/static/img/coins/64x64/1785.png'
  }
  if (token && token.address?.toLowerCase() === XOX_ADDRESS[token.chainId]?.toLowerCase()) {
    return `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/tokens/xox-icon.svg`
  }
  if (token && token.symbol.toLocaleUpperCase() === 'XOXS') {
    return `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/tokens/xoxs-icon.svg`
  }
  if (token && token.chainId === 97 && token.symbol.toLocaleUpperCase() === 'USDT') {
    return `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.png`
  }
  if (token && token.chainId === 5 && token.symbol.toLocaleUpperCase() === 'TUSDC') {
    return `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg`
  }
  if (token && token.symbol.toLocaleUpperCase() === 'TBNB') {
    return `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/tokens/tbnb.png`
  }
  if (token && token.symbol.toLocaleUpperCase() === 'GOR') {
    return `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/tokens/gor.png`
  }

  if (coinmarketcapId !== '') return `https://s2.coinmarketcap.com/static/img/coins/64x64/${coinmarketcapId}.png`
  if (token && token.address && mapping[token.chainId]) {
    if (token.chainId === 56 && token.address === 'BNB')
      return 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
    return `https://assets-cdn.trustwallet.com/blockchains/${mapping[token.chainId]}/assets/${getAddress(
      token.address,
    )}/logo.png`
  }

  return null
}

export default getTokenLogoURL
