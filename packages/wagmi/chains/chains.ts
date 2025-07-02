import { Chain } from 'wagmi'

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
}

export const avalandcheFuji: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche_fuji',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://testnet.snowtrace.io/',
    },
  },
  testnet: true,
}

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.ftm.tools',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
}

export const fantomTestnet: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom-testnet',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.testnet.fantom.network',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
    },
  },
  testnet: true,
}

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' }

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    public: 'https://bsc-dataseed1.binance.org',
    default: 'https://bsc-dataseed1.binance.org',
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 15921452,
  },
}

export const bscTest: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: 'https://nd-787-970-977.p2pify.com/f2e11722375ecc6933d0bc6d7ceb69a1',
    default: 'https://nd-787-970-977.p2pify.com/f2e11722375ecc6933d0bc6d7ceb69a1',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 17422483,
  },
  testnet: true,
}
export const mainnet: Chain = {
  id: 1,
  name: 'Ethereum',
  network: 'mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: 'https://eth-mainnet.g.alchemy.com/v2/OUbNK0UxmBbmI2_G7a1Ytrw1kGA1-wXm',
    default: 'https://eth-mainnet.g.alchemy.com/v2/OUbNK0UxmBbmI2_G7a1Ytrw1kGA1-wXm',
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io/' },
  },
}

export const goerli: Chain = {
  id: 5,
  name: 'Goerli',
  network: 'goerli',
  nativeCurrency: {
    decimals: 18,
    name: 'Etherium',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: 'https://eth-goerli.g.alchemy.com/v2/ihTj-Za_e4vpSsy3R65jobkf6vo7ZoND',
    default: 'https://eth-goerli.g.alchemy.com/v2/ihTj-Za_e4vpSsy3R65jobkf6vo7ZoND',
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://goerli.etherscan.io/' },
  },
  testnet: true,
}

export const arbitrum: Chain = {
  id: 42161,
  name: 'Arbitrum One',
  network: 'arbitrum',
  nativeCurrency: {
    decimals: 18,
    name: 'Etherium',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: 'https://arb1.arbitrum.io/rpc',
    default: 'https://arb1.arbitrum.io/rpc',
  },
  blockExplorers: {
    default: { name: 'Arbitrum', url: 'https://arbiscan.io/' },
  },
}

export const arbitrum_testnet: Chain = {
  id: 421613,
  name: 'Arbitrum Goerli',
  network: 'arbitrum-goerli',
  nativeCurrency: {
    decimals: 18,
    name: 'Etherium',
    symbol: 'AGOR',
  },
  rpcUrls: {
    public: 'https://endpoints.omniatech.io/v1/arbitrum/goerli/public',
    default: 'https://endpoints.omniatech.io/v1/arbitrum/goerli/public',
  },
  blockExplorers: {
    default: { name: 'Arbitrum', url: 'https://goerli-rollup-explorer.arbitrum.io/' },
  },
}

export const polygon: Chain = {
  id: 137,
  name: 'Polygon Mainnet',
  network: 'polygon',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    public: 'https://polygon.llamarpc.com',
    default: 'https://polygon.llamarpc.com',
  },
  blockExplorers: {
    default: { name: 'Polygon', url: 'https://polygonscan.com/' },
  },
}

export const poligon_testnet: Chain = {
  id: 80001,
  name: 'Mumbai Testnet',
  network: 'mumbai-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    public: 'https://rpc-mumbai.maticvigil.com',
    default: 'https://rpc-mumbai.maticvigil.com',
  },
  blockExplorers: {
    default: { name: 'Polygon', url: 'https://mumbai.polygonscan.com/' },
  },
}

export const zksync: Chain = {
  id: 324,
  name: 'zkSync Era Mainnet',
  network: 'zksync',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: 'https://mainnet.era.zksync.io',
    default: 'https://mainnet.era.zksync.io',
  },
  blockExplorers: {
    default: { name: 'zkSync', url: 'https://explorer.zksync.io/' },
  },
}

export const zksync_testnet: Chain = {
  id: 280,
  name: 'zkSync Era Testnet',
  network: 'zksync-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: 'https://testnet.era.zksync.dev',
    default: 'https://testnet.era.zksync.dev',
  },
  blockExplorers: {
    default: { name: 'zkSync', url: 'https://goerli.explorer.zksync.io/' },
  },
}

export const optimism: Chain = {
  id: 10,
  name: 'Optimism',
  network: 'optimism',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: 'https://mainnet.optimism.io',
    default: 'https://mainnet.optimism.io',
  },
  blockExplorers: {
    default: { name: 'Optimism', url: 'https://optimistic.etherscan.io/' },
  },
}

export const optimism_testnet: Chain = {
  id: 420,
  name: 'Optimism Goerli Testnet',
  network: 'optimism-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: 'https://endpoints.omniatech.io/v1/op/goerli/public',
    default: 'https://endpoints.omniatech.io/v1/op/goerli/public',
  },
  blockExplorers: {
    default: { name: 'Optimism', url: 'https://optimism.io/' },
  },
}

export const linea_testnet: Chain = {
  id: 59140,
  name: 'Linea Goerli Testnet',
  network: 'linea-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: 'https://rpc.goerli.linea.build',
    default: 'https://rpc.goerli.linea.build',
  },
  blockExplorers: {
    default: { name: 'Linea', url: 'https://goerli.lineascan.build' },
  },
}


export const neo_evm_testnet: Chain = {
  id: 2970385,
  name: 'NeoEVM Chain',
  network: 'Neo devnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Gas',
    symbol: 'GAS',
  },
  rpcUrls: {
    public: 'https://evm.ngd.network:32331',
    default: 'https://evm.ngd.network:32331',
  },
  blockExplorers: {
    default: { name: 'NeoEVM', url: 'https://evm.ngd.network' },
  },
}
