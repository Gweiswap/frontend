import { ChainId, LINEA_TESTNET, NEO_EVM_TESTNET } from '@pancakeswap/sdk'

const Bsc = `/images/chains/56.svg`
const Ethereum = `/images/chains/1.svg`
const Neo = `/images/chains/2970385.svg`
const Arbitrum = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/Arbitrum.svg`
const Polygon = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/Polygon.svg`
const zkSync = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/zkSync.svg`
const Optimism = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/Optimism.svg`

export const NETWORK_ICON = {
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
  [ChainId.ETHEREUM]: Ethereum,
  [ChainId.GOERLI]: Ethereum,
  [ChainId.RINKEBY]: Ethereum,
  [ChainId.ARBITRUM]: Arbitrum,
  [ChainId.ARBITRUM_TESTNET]: Arbitrum,
  [ChainId.POLYGON]: Polygon,
  [ChainId.POLYGON_TESTNET]: Polygon,
  [ChainId.ZKSYNC]: zkSync,
  [ChainId.ZKSYNC_TESTNET]: zkSync,
  [ChainId.OPTIMISM]: Optimism,
  [ChainId.OPTIMISM_TESTNET]: Optimism,
  [NEO_EVM_TESTNET]: Neo,
}

export const DAPP_CHAINS =
  process.env.NEXT_PUBLIC_TEST_MODE === '1'
    ? [ChainId.BSC, ChainId.ETHEREUM, ChainId.BSC_TESTNET, ChainId.GOERLI, ChainId.NEO_EVM_TESTNET]
    : [ChainId.BSC, ChainId.ETHEREUM]

export const MAINNET_CHAINS = [
  ChainId.BSC,
  ChainId.ETHEREUM,
  ChainId.ARBITRUM,
  ChainId.POLYGON,
  ChainId.ZKSYNC,
  ChainId.OPTIMISM,
]

export const TESTNET_CHAINS =
  process.env.NEXT_PUBLIC_TEST_MODE === '1'
    ? [
        ChainId.BSC_TESTNET,
        ChainId.GOERLI,
        ChainId.ARBITRUM_TESTNET,
        ChainId.POLYGON_TESTNET,
        ChainId.ZKSYNC_TESTNET,
        ChainId.OPTIMISM_TESTNET,
        LINEA_TESTNET,
        NEO_EVM_TESTNET
      ]
    : []

export const BRIDGE_CHAINS_ONLY =
  process.env.NEXT_PUBLIC_TEST_MODE === '1'
    ? [
        ChainId.ARBITRUM,
        ChainId.POLYGON,
        ChainId.ZKSYNC,
        ChainId.OPTIMISM,
        ChainId.ARBITRUM_TESTNET,
        ChainId.POLYGON_TESTNET,
        ChainId.ZKSYNC_TESTNET,
        ChainId.OPTIMISM_TESTNET,
        LINEA_TESTNET,
        NEO_EVM_TESTNET
      ]
    : [ChainId.ARBITRUM, ChainId.POLYGON, ChainId.ZKSYNC, ChainId.OPTIMISM]

export const NETWORK_LABEL =
  process.env.NEXT_PUBLIC_TEST_MODE === '1'
    ? {
        [ChainId.RINKEBY]: 'Rinkeby',
        [ChainId.BSC_TESTNET]: 'BSC Testnet',
        [ChainId.BSC]: 'BSC',
        [ChainId.ETHEREUM]: 'Ethereum',
        [ChainId.GOERLI]: 'Goerli',
        [ChainId.ARBITRUM]: 'Arbitrum',
        [ChainId.ARBITRUM_TESTNET]: 'ArbitrumTest',
        [ChainId.POLYGON]: 'Polygon',
        [ChainId.POLYGON_TESTNET]: 'PolygonTest',
        [ChainId.ZKSYNC]: 'zkSync',
        [ChainId.ZKSYNC_TESTNET]: 'zkSyncTest',
        [ChainId.OPTIMISM]: 'Optimism',
        [ChainId.OPTIMISM_TESTNET]: 'OptimismTest',
        [NEO_EVM_TESTNET]: 'NeoEVMTest',
      }
    : {
        [ChainId.BSC]: 'BSC',
        [ChainId.ETHEREUM]: 'Ethereum',
        [ChainId.ARBITRUM]: 'Arbitrum',
        [ChainId.POLYGON]: 'Polygon',
        [ChainId.ZKSYNC]: 'zkSync',
        [ChainId.OPTIMISM]: 'Optimism',
      }

export const NETWORK_LINK =
  process.env.NEXT_PUBLIC_TEST_MODE === '1'
    ? {
        [ChainId.ETHEREUM]: 'https://etherscan.io',
        [ChainId.RINKEBY]: 'https://rinkeby.etherscan.io',
        [ChainId.GOERLI]: 'https://goerli.etherscan.io',
        [ChainId.BSC]: 'https://bscscan.com',
        [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
        [ChainId.ARBITRUM]: 'https://arbiscan.io',
        [ChainId.ARBITRUM_TESTNET]: 'https://goerli-rollup-explorer.arbitrum.io',
        [ChainId.POLYGON]: 'https://polygonscan.com',
        [ChainId.POLYGON_TESTNET]: 'https://mumbai.polygonscan.com',
        [ChainId.ZKSYNC]: 'https://zkscan.io',
        [ChainId.ZKSYNC_TESTNET]: 'https://goerli.explorer.zksync.io',
        [ChainId.OPTIMISM]: 'https://optimistic.etherscan.io',
        [ChainId.OPTIMISM_TESTNET]: 'https://goerli-optimism.etherscan.io',
        [LINEA_TESTNET]: 'https://goerli.lineascan.build',
        [NEO_EVM_TESTNET]: 'https://evm.ngd.network',
      }
    : {
        [ChainId.ETHEREUM]: 'https://etherscan.io',
        [ChainId.BSC]: 'https://bscscan.com',
        [ChainId.ARBITRUM]: 'https://arbiscan.io',
        [ChainId.POLYGON]: 'https://polygonscan.com',
        [ChainId.ZKSYNC]: 'https://zkscan.io',
        [ChainId.OPTIMISM]: 'https://optimistic.etherscan.io',
      }

export const SITE_NAME =
  process.env.NEXT_PUBLIC_TEST_MODE === '1'
    ? {
        [ChainId.ETHEREUM]: 'Etherscan',
        [ChainId.RINKEBY]: 'Etherscan',
        [ChainId.GOERLI]: 'Etherscan',
        [ChainId.BSC]: 'Bscscan',
        [ChainId.BSC_TESTNET]: 'Bscscan',
        [ChainId.ARBITRUM]: 'Arbiscan',
        [ChainId.ARBITRUM_TESTNET]: 'Arbiscan',
        [ChainId.POLYGON]: 'Polygonscan',
        [ChainId.POLYGON_TESTNET]: 'Polygonscan',
        [ChainId.ZKSYNC]: 'Zkscan',
        [ChainId.ZKSYNC_TESTNET]: 'Zkscan',
        [ChainId.OPTIMISM]: 'Optimismscan',
        [ChainId.OPTIMISM_TESTNET]: 'Optimismscan',
        [LINEA_TESTNET]: 'Lineascan',
        [NEO_EVM_TESTNET]: 'Neoscan',
      }
    : {
        [ChainId.ETHEREUM]: 'Etherscan',
        [ChainId.BSC]: 'Bscscan',
        [ChainId.ARBITRUM]: 'Arbiscan',
        [ChainId.POLYGON]: 'Polygonscan',
        [ChainId.ZKSYNC]: 'Zkscan',
        [ChainId.OPTIMISM]: 'Optimismscan',
      }

export const CONTRACT_BRIDGE_POOL = {
  [ChainId.GOERLI]: '0xc514D686B10dc976db474AA45E14642399C277C8',
}

export const KYBERSWAP_NETWORK_CHAIN = {
  [ChainId.BSC]: 'bsc',
  [ChainId.ETHEREUM]: 'ethereum',
  [ChainId.ARBITRUM]: 'arbitrum',
  [ChainId.POLYGON]: 'polygon',
  [ChainId.ZKSYNC]: 'zksync',
  [ChainId.OPTIMISM]: 'optimism',
  [LINEA_TESTNET]: 'linea-goerli',
  [NEO_EVM_TESTNET]: 'neo-evm',
}
