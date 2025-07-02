import { ERC20Token } from './entities/token'

export enum ChainId {
  ETHEREUM = 1,
  RINKEBY = 4,
  GOERLI = 5,
  BSC = 56,
  BSC_TESTNET = 97,
  ARBITRUM = 42161,
  ARBITRUM_TESTNET = 421613,
  POLYGON = 137,
  POLYGON_TESTNET = 80001,
  ZKSYNC = 324,
  ZKSYNC_TESTNET = 280,
  OPTIMISM = 10,
  OPTIMISM_TESTNET = 420,
  NEO_EVM_TESTNET = 2970385
}

export const LINEA_TESTNET = 59140
export const NEO_EVM_TESTNET = 2970385

export const FACTORY_ADDRESS = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'

const FACTORY_ADDRESS_ETH = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'

export const FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: FACTORY_ADDRESS_ETH,
  [ChainId.RINKEBY]: FACTORY_ADDRESS_ETH,
  [ChainId.GOERLI]: FACTORY_ADDRESS_ETH,
  [ChainId.BSC]: FACTORY_ADDRESS,
  [ChainId.BSC_TESTNET]: '0x6725F303b657a9451d8BA641348b6761A6CC7a17',
  [ChainId.NEO_EVM_TESTNET]: '0xB0d08De7A9439a6d16d5b34ad8Ea6C8236Bd393b',
}

export const PAIR_XOX_BUSD: Record<number, string> = {
  // [ChainId.ETHEREUM]: FACTORY_ADDRESS_ETH,
  // [ChainId.RINKEBY]: FACTORY_ADDRESS_ETH,
  [ChainId.GOERLI]: '0xc33810e51e44f00eae193d0694BddE909F78ae6c',
  // [ChainId.BSC]: FACTORY_ADDRESS,
  [ChainId.BSC_TESTNET]: '0xaAd96063144D0d7D9395db418A5060512f71d41F',
  [ChainId.NEO_EVM_TESTNET]: '0xFd8D6370eb37B62194d5CC0Dcdeb24A61878c8e7',
}

export const XOX_ADDRESS: Record<number, string> = {
  // [ChainId.ETHEREUM]: '',
  // [ChainId.RINKEBY]: '',
  [ChainId.GOERLI]: '0x6441D45eBDB505df041F7ab702Eb7fDBcca5ed7C',
  // [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '0x6bb15Fd179539BFD6E78f18f5d91543142e0Ad9e',
  // [ChainId.BSC]: '',
  [ChainId.ARBITRUM_TESTNET]: '0xCc7283a00481de9AdBE379c3c2459691a6ee274a',
  // [ChainId.BSC]: '',
  [ChainId.POLYGON_TESTNET]: '0xCc7283a00481de9AdBE379c3c2459691a6ee274a',
  // [ChainId.BSC]: '',
  [ChainId.ZKSYNC_TESTNET]: '0xCc7283a00481de9AdBE379c3c2459691a6ee274a',
  // [ChainId.BSC]: '',
  [ChainId.OPTIMISM_TESTNET]: '0xCc7283a00481de9AdBE379c3c2459691a6ee274a',
  [ChainId.NEO_EVM_TESTNET]: '0x3B6dFC89760d5B6F64C043A74210ddF91264Beef',
}

export const USD_ADDRESS: Record<number, string> = {
  [ChainId.ETHEREUM]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [ChainId.RINKEBY]: '',
  [ChainId.GOERLI]: '0xD898D309dAb33130EA57E8F106238ae4b76329f4',
  [ChainId.BSC]: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  [ChainId.BSC_TESTNET]: '0xc60a52351918c13eF3B27F72e5E71877ca3cB13A',
  [ChainId.NEO_EVM_TESTNET]: '0xce221120F145B456ba41b370F11D5E536eCD2BcB',
}
export const INIT_CODE_HASH = '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5'

const INIT_CODE_HASH_ETH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
export const INIT_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: INIT_CODE_HASH_ETH,
  [ChainId.RINKEBY]: INIT_CODE_HASH_ETH,
  [ChainId.GOERLI]: INIT_CODE_HASH_ETH,
  [ChainId.BSC]: INIT_CODE_HASH,
  [ChainId.BSC_TESTNET]: '0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66',
  [ChainId.NEO_EVM_TESTNET]: '0x341a03f2b9cf74ef0c097b2765048edc7e200166b174a3934d8e04d606fc2cb0',
}

export const WETH9 = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.RINKEBY]: new ERC20Token(
    ChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.GOERLI]: new ERC20Token(
    ChainId.GOERLI,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.NEO_EVM_TESTNET]: new ERC20Token(
    ChainId.NEO_EVM_TESTNET,
    '0x07E56622aC709e2458dd5189e11e55A42e681fB6',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  )
}

export const WBNB = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0x418D75f65a02b3D53B2418FB8E1fe493759c7605',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.BSC]: new ERC20Token(
    ChainId.BSC,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.BSC_TESTNET]: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.NEO_EVM_TESTNET]: new ERC20Token(
    ChainId.NEO_EVM_TESTNET,
    '0x07E56622aC709e2458dd5189e11e55A42e681fB6',
    18,
    'WETH',
    'Wrapped ETHERIUM',
    'https://www.binance.org'
  ),
}

export const WNATIVE: Record<number, ERC20Token> = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  [ChainId.RINKEBY]: WETH9[ChainId.RINKEBY],
  [ChainId.GOERLI]: WETH9[ChainId.GOERLI],
  [ChainId.BSC]: WBNB[ChainId.BSC],
  [ChainId.BSC_TESTNET]: WBNB[ChainId.BSC_TESTNET],
  [ChainId.NEO_EVM_TESTNET]: WETH9[ChainId.NEO_EVM_TESTNET],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.ETHEREUM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.RINKEBY]: { name: 'Rinkeby Ether', symbol: 'RIN', decimals: 18 },
  [ChainId.GOERLI]: { name: 'Goerli Ether', symbol: 'GOR', decimals: 18 },
  [ChainId.BSC]: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  [ChainId.BSC_TESTNET]: {
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
    decimals: 18,
  },
  [ChainId.ARBITRUM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.ARBITRUM_TESTNET]: { name: 'AGOR', symbol: 'AGOR', decimals: 18 },
  [ChainId.POLYGON]: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  [ChainId.POLYGON_TESTNET]: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  [ChainId.ZKSYNC]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.ZKSYNC_TESTNET]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.OPTIMISM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.OPTIMISM_TESTNET]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [LINEA_TESTNET]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [NEO_EVM_TESTNET]: { name: 'GAS', symbol: 'GAS', decimals: 18 },
}
