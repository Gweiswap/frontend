import { StyleFixHeight, StyledAggregator, BtnLearMore, Overlay } from '.'

const BlockChains = () => {
  return (
    <>
      <StyleFixHeight>
        <StyledAggregator>
          {blockchains.map((item) => (
            <Overlay>
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Blockchainsnew/${item}.svg`}
                key={item}
                alt="dex"
                loading="lazy"
                width="38px"
                height="38px"
              />
            </Overlay>
          ))}
        </StyledAggregator>
      </StyleFixHeight>

      <div className="btn_learn_more_ecosystem">
        <BtnLearMore href="https://docs.xoxlabs.io/xox-product-roadmap/xox-dex-v2/supported-chains-dexs-and-aggregators" />
      </div>
    </>
  )
}

const blockchains = [
  '1. ETH-logo',
  '2. BSC-logo',
  '3. Arbitrum-logo',
  '4. ZKsync-logo',
  '5. Polygon-logo',
  '6. Optimism-logo',
  '7. Avalanche-logo',
  '8 Fantom-logo',
  '9. Cronos-logo',
  '10. EthereumPOW-logo',
  '11. Solana-logo',
  '12. Algorand-logo',
  '13. Klaytn-logo',
  '14. Bitgert-logo',
  '15. Aptos-logo',
  '16. Acala-logo',
  '17. Canto-logo',
  '18. Osmosis-logo',
  '19. Hedera-logo',
  '20. Near-logo',
  '21. Thorchain-logo',
  '22. Bittorent-logo',
  '23. Wave-logo',
  '24. Aurora-logo',
  '25. Celo-golo',
  '26. Bitcoin-logo',
  '27. Gnosis-logo',
  '28. Moonbeam-logo',
  '29. EOS-logo',
  '30. Cardano-logo',
  '31. Elrond-logo',
  '32. Heco-logo',
  '33. Neo-logo',
  '34. Astar-logo',
  '35. Kucoin-logo',
  '36. OKExchain-logo',
  '37. Metis-logo',
  '38. Tezos-logo',
  '39. Stella-logo',
  '40. Velas-logo',
  '41. Harmony-logo',
  '42. Fusion-logo',
  '43. Kava-logo',
  '44. Cosmos-logo',
  '45. Kadena-logo',
  '46. Telos-logo',
  '47. Loopnetwork-logo',
  '48. Vechain',
  '49. Ronin-logo',
  '50. Icon-logo',
  '51. Moonriver-logo',
  '52. iotex-logo',
  '53. Oasis-logo',
  '54. Ontology-logo',
  '55. Boba-logo',
  '56. Polkadot-logo',
  '57. Xodex-logo',
  '58. Tomochain-logo',
  '59. Terra2-logo',
  '60. Evmos-logo',
  '61. Mixin-logo',
  '62. DefiChain',
  '63. Wanchain-logo',
  '64. Vision-logo',
  '65. TLchain-logo',
  '66. Conflux-logo',
  '67. Everscale-logo',
  '68. Zilliqa-logo',
  '69. Rootstock-logo',
]

export default BlockChains
