import { multicallAddresses } from '@pancakeswap/multicall'
import { ChainId } from '@pancakeswap/sdk'

export default {
  masterChef: {
    [ChainId.BSC_TESTNET]: '0xB4A466911556e39210a6bB2FaECBB59E4eB7E43d',
    [ChainId.BSC]: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
  },
  masterChefV1: {
    [ChainId.BSC_TESTNET]: '0x1d32c2945C8FDCBc7156c553B7cEa4325a17f4f9',
    [ChainId.BSC]: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
  },
  sousChef: {
    [ChainId.BSC_TESTNET]: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
    [ChainId.BSC]: '0x6ab8463a4185b80905e05a9ff80a2d6b714b9e95',
  },
  lotteryV2: {
    [ChainId.BSC_TESTNET]: '0x5790c3534F30437641541a0FA04C992799602998',
    [ChainId.BSC]: '0x5aF6D33DE2ccEC94efb1bDF8f92Bd58085432d2c',
  },
  multiCall: multicallAddresses,
  pancakeProfile: {
    [ChainId.BSC]: '0xDf4dBf6536201370F95e06A0F8a7a70fE40E388a',
    [ChainId.BSC_TESTNET]: '0x4B683C7E13B6d5D7fd1FeA9530F451954c1A7c8A',
  },
  pancakeBunnies: {
    [ChainId.BSC]: '0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07',
    [ChainId.BSC_TESTNET]: '0x60935F36e4631F73f0f407e68642144e07aC7f5E',
  },
  bunnyFactory: {
    [ChainId.BSC]: '0xfa249Caa1D16f75fa159F7DFBAc0cC5EaB48CeFf',
    [ChainId.BSC_TESTNET]: '0x707CBF373175fdB601D34eeBF2Cf665d08f01148',
  },
  claimRefund: {
    [ChainId.BSC]: '0xE7e53A7e9E3Cf6b840f167eF69519175c497e149',
    [ChainId.BSC_TESTNET]: '',
  },
  pointCenterIfo: {
    [ChainId.BSC]: '0x3C6919b132462C1FEc572c6300E83191f4F0012a',
    [ChainId.BSC_TESTNET]: '0xd2Ac1B1728Bb1C11ae02AB6e75B76Ae41A2997e3',
  },
  bunnySpecial: {
    [ChainId.BSC]: '0xFee8A195570a18461146F401d6033f5ab3380849',
    [ChainId.BSC_TESTNET]: '0x7b7b1583De1DeB32Ce6605F6deEbF24A0671c17C',
  },
  tradingCompetitionEaster: {
    [ChainId.BSC]: '0xd718baa0B1F4f70dcC8458154042120FFE0DEFFA',
    [ChainId.BSC_TESTNET]: '0xC787F45B833721ED3aC46E99b703B3E1E01abb97',
  },
  tradingCompetitionFanToken: {
    [ChainId.BSC]: '0xA8FECf847e28aa1Df39E995a45b7FCfb91b676d4',
    [ChainId.BSC_TESTNET]: '',
  },
  tradingCompetitionMobox: {
    [ChainId.BSC]: '0x1C5161CdB145dE35a8961F82b065fd1F75C3BaDf',
    [ChainId.BSC_TESTNET]: '',
  },
  tradingCompetitionMoD: {
    [ChainId.BSC]: '0xbDd9a61c67ee16c10f5E37b1D0c907a9EC959f33',
    [ChainId.BSC_TESTNET]: '',
  },
  easterNft: {
    [ChainId.BSC]: '0x23c41D28A239dDCAABd1bb1deF8d057189510066',
    [ChainId.BSC_TESTNET]: '0x24ec6962dbe874F6B67B5C50857565667fA0854F',
  },
  cakeVault: {
    [ChainId.BSC]: '0x45c54210128a065de780C4B0Df3d16664f7f859e',
    [ChainId.BSC_TESTNET]: '0x683433ba14e8F26774D43D3E90DA6Dd7a22044Fe',
  },
  cakeFlexibleSideVault: {
    [ChainId.BSC]: '0x615e896A8C2CA8470A2e9dc2E9552998f8658Ea0',
    [ChainId.BSC_TESTNET]: '',
  },
  predictionsBNB: {
    [ChainId.BSC]: '0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA',
    [ChainId.BSC_TESTNET]: '',
  },
  predictionsCAKE: {
    [ChainId.BSC]: '0x0E3A8078EDD2021dadcdE733C6b4a86E51EE8f07',
    [ChainId.BSC_TESTNET]: '',
  },
  chainlinkOracleBNB: {
    [ChainId.BSC]: '0xD276fCF34D54A926773c399eBAa772C12ec394aC',
    [ChainId.BSC_TESTNET]: '',
  },
  chainlinkOracleCAKE: {
    [ChainId.BSC]: '0xB6064eD41d4f67e353768aA239cA86f4F73665a1',
    [ChainId.BSC_TESTNET]: '',
  },
  predictionsV1: {
    [ChainId.BSC]: '0x516ffd7d1e0ca40b1879935b2de87cb20fc1124b',
    [ChainId.BSC_TESTNET]: '',
  },
  bunnySpecialCakeVault: {
    [ChainId.BSC]: '0x5B4a770Abe7Eafb2601CA4dF9d73EA99363E60a4',
    [ChainId.BSC_TESTNET]: '',
  },
  bunnySpecialPrediction: {
    [ChainId.BSC]: '0x342c99e9aC24157657095eC69CB04b73257e7A9C',
    [ChainId.BSC_TESTNET]: '',
  },
  bunnySpecialLottery: {
    [ChainId.BSC]: '0x24ED31d31C5868e5a96aA77fdcB890f3511fa0b2',
    [ChainId.BSC_TESTNET]: '0x382cB497110F398F0f152cae82821476AE51c9cF',
  },
  bunnySpecialXmas: {
    [ChainId.BSC]: '0x59EdDF3c21509dA3b0aCCd7c5ccc596d930f4783',
    [ChainId.BSC_TESTNET]: '',
  },
  farmAuction: {
    [ChainId.BSC]: '0xb92Ab7c1edcb273AbA24b0656cEb3681654805D2',
    [ChainId.BSC_TESTNET]: '0x3F9602593b4f7C67ab045DB51BbDEa94E40fA9Fe',
  },
  AnniversaryAchievement: {
    [ChainId.BSC]: '0xF839286bD9D14b358496829F3BaB3145C16ad3C1',
    [ChainId.BSC_TESTNET]: '0x981aE96378e770DE44F89cD9175E708f9EDB70a9',
  },
  nftMarket: {
    [ChainId.BSC]: '0x17539cCa21C7933Df5c980172d22659B8C345C5A',
    [ChainId.BSC_TESTNET]: '0x7f9f37ddcaa33893f9beb3d8748c8d6bfbde6ab2',
  },
  nftSale: {
    [ChainId.BSC]: '0x29fE7148636b7Ae0b1E53777b28dfbaA9327af8E',
    [ChainId.BSC_TESTNET]: '0xe486De509c5381cbdBF3e71F57D7F1f7570f5c46',
  },
  pancakeSquad: {
    [ChainId.BSC]: '0x0a8901b0E25DEb55A87524f0cC164E9644020EBA',
    [ChainId.BSC_TESTNET]: '0xfC0c3F11fDA72Cb9A56F28Ec8D44C0ae4B3ABF86',
  },
  potteryDraw: {
    [ChainId.BSC]: '0x01871991587d5671f3A2d4E2BcDC22F4E026396e',
    [ChainId.BSC_TESTNET]: '0xDB9D365b50E62fce747A90515D2bd1254A16EbB9',
  },
  // TODO: multi
  zap: {
    [ChainId.BSC]: '0xD4c4a7C55c9f7B3c48bafb6E8643Ba79F42418dF',
    [ChainId.BSC_TESTNET]: '0xD85835207054F25620109bdc745EC1D1f84F04e1',
  },
  iCake: {
    [ChainId.BSC]: '0x3C458828D1622F5f4d526eb0d24Da8C4Eb8F07b1',
    [ChainId.BSC_TESTNET]: '',
  },
  bCakeFarmBooster: {
    [ChainId.BSC]: '0xE4FAa3Ef5A9708C894435B0F39c2B440936A3A52',
    [ChainId.BSC_TESTNET]: '',
  },
  bCakeFarmBoosterProxyFactory: {
    [ChainId.BSC]: '0x2C36221bF724c60E9FEE3dd44e2da8017a8EF3BA',
    [ChainId.BSC_TESTNET]: '',
  },
  nonBscVault: {
    [ChainId.BSC]: '0xE6c904424417D03451fADd6E3f5b6c26BcC43841', // Only for pass contracts test
    [ChainId.ETHEREUM]: '0x2e71B2688019ebdFDdE5A45e6921aaebb15b25fb',
    [ChainId.GOERLI]: '0xE6c904424417D03451fADd6E3f5b6c26BcC43841',
  },
  crossFarmingSender: {
    [ChainId.BSC]: '0x327d26dE30f92600620A99043034e0A5FD9402C8', // Only for pass contracts test
    [ChainId.ETHEREUM]: '0x8EA90Ef07f37c77137453C7A1B72B7886d51eCFb',
    [ChainId.GOERLI]: '0x327d26dE30f92600620A99043034e0A5FD9402C8',
  },
  crossFarmingReceiver: {
    [ChainId.BSC]: '0x0726a8C8206b9eC0AfB788df5adb36a8AEDB13c2',
    [ChainId.BSC_TESTNET]: '0xBab5d3B6bA24E185f216419f3ba07f03984bF983',
  },
  treasuryXOX: {
    [ChainId.BSC_TESTNET]: '0x6CABaceF0125173713d38C951f0a3a80a38b3Bca',
    [ChainId.GOERLI]: '0x053c0e72a9a68A1997138e338497dd68219f2580',
    [ChainId.ETHEREUM]: '',
    [ChainId.BSC]: '',
    [ChainId.NEO_EVM_TESTNET]: '0xEb2899a96f2017567e95ab9E7fDa3C0A216Ce8F9',
  },
  contractXOXToken: {
    [ChainId.BSC_TESTNET]: '0x6bb15Fd179539BFD6E78f18f5d91543142e0Ad9e',
    [ChainId.GOERLI]: '0x6441D45eBDB505df041F7ab702Eb7fDBcca5ed7C',
    [ChainId.ETHEREUM]: '', // TODO: change address
    [ChainId.BSC]: '',
    [ChainId.ARBITRUM]: '0x90fded525b5E613c9dc0fE600d9b52a648386e2E', // TODO: change address
    [ChainId.ARBITRUM_TESTNET]: '0x90fded525b5E613c9dc0fE600d9b52a648386e2E', // TODO: change address
    [ChainId.POLYGON]: '0x47869A5dcECd2593F02d27f65cB4A5278DE16CD2', // TODO: change address
    [ChainId.POLYGON_TESTNET]: '0x47869A5dcECd2593F02d27f65cB4A5278DE16CD2', // TODO: change address
    [ChainId.ZKSYNC]: '0x34a12190B65b684A5CC1ec27a6f8d924D1a317be', // TODO: change address
    [ChainId.ZKSYNC_TESTNET]: '0x34a12190B65b684A5CC1ec27a6f8d924D1a317be', // TODO: change address
    [ChainId.OPTIMISM]: '0xce221120F145B456ba41b370F11D5E536eCD2BcB', // TODO: change address
    [ChainId.OPTIMISM_TESTNET]: '0xce221120F145B456ba41b370F11D5E536eCD2BcB', // TODO: change address
    [ChainId.NEO_EVM_TESTNET]: '0x3B6dFC89760d5B6F64C043A74210ddF91264Beef'
  },
  contractXOXPool: {
    [ChainId.BSC_TESTNET]: '0xaAd96063144D0d7D9395db418A5060512f71d41F',
    [ChainId.GOERLI]: '0xc33810e51e44f00eae193d0694BddE909F78ae6c',
    [ChainId.NEO_EVM_TESTNET]: '0xFd8D6370eb37B62194d5CC0Dcdeb24A61878c8e7',
  },
  contractXOXSecondPool: {
    [ChainId.BSC_TESTNET]: '0xeBaA9Ab545de44F38170218082fE25ff30C69D7F',
    [ChainId.GOERLI]: '0x9ECCd81142Fe81D34169449d5616988A24763294',
    [ChainId.NEO_EVM_TESTNET]: '0xc08501Bc4031F559ac033C35e7Fa5850EDCb87Fa',
  },
  contractBridgeToken: {
    [ChainId.ETHEREUM]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
    [ChainId.GOERLI]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
    [ChainId.BSC]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
    [ChainId.BSC_TESTNET]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
    [ChainId.ARBITRUM]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
    [ChainId.ARBITRUM_TESTNET]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
    [ChainId.POLYGON]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
    [ChainId.POLYGON_TESTNET]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
    [ChainId.ZKSYNC]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
    [ChainId.ZKSYNC_TESTNET]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
    [ChainId.OPTIMISM]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
    [ChainId.OPTIMISM_TESTNET]: '0xc514D686B10dc976db474AA45E14642399C277C8', // TODO: change address
  },
  xoxToken: {
    [ChainId.BSC_TESTNET]: '0x6bb15Fd179539BFD6E78f18f5d91543142e0Ad9e',
    [ChainId.GOERLI]: '0x6441D45eBDB505df041F7ab702Eb7fDBcca5ed7C',
    [ChainId.ETHEREUM]: '', // TODO: change address
    [ChainId.BSC]: '',
    [ChainId.NEO_EVM_TESTNET]: '0x3B6dFC89760d5B6F64C043A74210ddF91264Beef'
  },
  farmingLP: {
    [ChainId.BSC_TESTNET]: '0xA5002aFA8B19a6B4A6040bB0b82a07dA56291E4d',
    [ChainId.GOERLI]: '0xB35A67a64aC6da4fB755Eb3913E60eD282eFf6c1',
    [ChainId.ETHEREUM]: '', // TODO: change address
    [ChainId.BSC]: '',
    [ChainId.NEO_EVM_TESTNET]: '0x20d51b9f4591713C6c6CE83bEf892a3FA09D560f',
  },
  preSaleContactAddress: {
    [ChainId.GOERLI]: '0xAe87f7f36735a66B16f4d700F3197f0AeBB76ad5',
    [ChainId.BSC_TESTNET]: '',
    [ChainId.BSC]: '',
    [ChainId.ETHEREUM]: '', // TODO: change address
  },
}
