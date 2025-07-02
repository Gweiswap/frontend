import { ChainId, Token } from "@pancakeswap/sdk";

export const TOKENS_SUPPORT = {
  [ChainId.BSC]: [
    new Token(
      ChainId.BSC,
      "0xd52aC302aADE798142C5AA11739FaD4f3de39755",
      18,
      "STAND",
      "TokenStand"
    ),
    new Token(
      ChainId.BSC,
      "0x55d398326f99059fF775485246999027B3197955",
      18,
      "USDT",
      "Tether USD"
    ),
    new Token(
      ChainId.BSC,
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      18,
      "USDC",
      "Binance-Peg USD Coin"
    ),
  ],

  [ChainId.RINKEBY]: [
    new Token(
      ChainId.RINKEBY,
      "0x9627D4E043aA4112BB3f6fAa957605565CC2650c",
      18,
      "STAND",
      "TokenStand"
    ),

    new Token(
      ChainId.RINKEBY,
      "0xd35d2e839d888d1cDBAdef7dE118b87DfefeD20e",
      6,
      "USDT",
      "USDT"
    ),

    new Token(
      ChainId.RINKEBY,
      // "0x8570c3592cceb7ebcd51dc13f3b95fe2f4f01c80",
      "0x8570c3592CCeb7ebCd51Dc13f3b95fE2f4f01C80",
      6,
      "USDC",
      "USD Coin"
    ),
  ],

  [ChainId.BSC_TESTNET]: [
    new Token(
      ChainId.BSC_TESTNET,
      "0xfb8cBD02fc2ff229712169424c743Cf846A115D2",
      18,
      "STAND",
      "TokenStand"
    ),
    new Token(
      ChainId.BSC_TESTNET,
      // "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
      "0x14ec6EE23dD1589ea147deB6c41d5Ae3d6544893",
      18,
      "USDT",
      "Tether USD"
    ),
    new Token(
      ChainId.BSC_TESTNET,
      "0x55174079d93F05ba8169F88b1A765B3Ac584c75D",
      18,
      "USDC",
      "USD Coin"
    ),
  ],
};
