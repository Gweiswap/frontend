import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react'
import 'tippy.js/dist/tippy.css' // optional
import { Box, Grid } from '@mui/material'
import { useTranslation } from '@pancakeswap/localization'
import axios from 'axios'
import { formatAmountNumber, formatNumber } from '@pancakeswap/utils/formatBalance'
import { useInView } from 'react-intersection-observer'
// eslint-disable-next-line import/no-cycle
interface ItemProps {
  item: CoinItem
}

interface DataItemProps {
  item: DataItem
}

export interface CoinItem {
  icon: string
}

export interface DataItem {
  currency: string
  dataEmpty: string
  description: string
  field?: string
  realData?: string
}

const WrapperI = styled.div`
  height: 100%;
  // padding: 24px 22px 32px;
  // background: rgba(16, 16, 16, 0.3);
  // backdrop-filter: blur(10px);
  // border-radius: 20px;

  .main_container {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

    .get_xox {
      padding: 1px;
      width: fit-content;
      margin-top: 40px;
      border-radius: 8px;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      cursor: pointer;

      .boxed-child {
        width: 100%;
        height: 100%;
        background: rgba(16, 16, 16, 1);
        padding: 10px 20px;
        border-radius: inherit;
        span {
          background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          font-weight: 700;
          font-size: 14px;
          width: 100%;
          height: 100%;
          background-color: #191a28;
          border-radius: inherit;
        }
      }
    }

    .expand {
      color: #fb8618;
      font-size: 14px;
      font-weight: 600;
    }

    .data-item {
      padding: 32px 68px;
      gap: 10px;
      margin-bottom: 32px;
      border-radius: 10px;
      background: rgba(16, 16, 16, 0.3);
      backdrop-filter: blur(10px);
      height: 100%;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        z-index: -1;
      }

      .data-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: inherit;

        .icon_dolla {
          font-size: 20px;
          line-height: 24px;
          vertical-align: top;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`

interface IPropsTitle {
  realData?: string
}

const Title = styled.p<IPropsTitle>`
  font-weight: bold;
  font-size: 40px;
  color: rgba(255, 255, 255, 0.87);
  line-height: 48px;

  @media screen and (max-width: 900px) {
    font-size: 18px;
    line-height: 22px;
    margin-top: 24px;
  }

  @media screen and (max-width: 576px) {
    font-size: 40px;
    line-height: 48px;
  }
`

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 16px 0 0;
  line-height: 24px;

  @media screen and (max-width: 576px) {
    font-size: 16px;
    line-height: 24px;
  }
`

const Icon = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 34px;

  @media screen and (min-width: 500px) and (max-width: 576px) {
    width: 48px;
    height: 48px;
  }

  @media screen and (max-width: 499px) {
    width: 32px;
    height: 32px;
  }
`

const DataItemDisplay = ({ item }: DataItemProps) => {
  const { t } = useTranslation()

  return (
    <WrapperI className="item list-coin">
      <div className="main_container">
        <div className="data-item">
          <div className="data-box">
            <Title>
              {/* {item.description !== 'Total Users' && item.description !== 'XOXS Staked' && item.realData && (
                <span className="icon_dolla">$</span>
              )} */}
              -
              {/* {item.realData
                ? item.description == 'Total Users'
                  ? item.realData
                  : formatNumber(formatAmountNumber(Number(item.realData)))
                : item.dataEmpty} */}
            </Title>
            <Description>{t(item.description)}</Description>
          </div>
        </div>
      </div>
    </WrapperI>
  )
}

const CoinItemDisplay = ({ item }: ItemProps) => {
  return (
    <WrapperI className="item list-coin">
      <div className="main_container">
        <Icon>
          <img
            src={item.icon}
            alt="icon"
            style={{ width: item.icon.includes('zkSync') || item.icon.includes('Solana') ? '36px' : 'auto' }}
          />
        </Icon>
      </div>
    </WrapperI>
  )
}

const Wrapper = styled.div`
  margin-bottom: 100px;
  .title {
    display: flex;
    justify-content: center;
    margin-bottom: 48px;

    .describe {
      font-size: 18px;
      line-height: 24px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .coin-item:last-child {
    .main_container div {
      border: 2px dashed orange;
    }
  }

  @media screen and (max-width: 900px) {
    margin-bottom: unset;
    margin-top: 20px;
    .title {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .heart {
        font-size: 20px;
        line-height: 32px;
      }
      .describe {
        font-size: 14px;
        line-height: 24px;
        width: unset;
      }
    }
  }

  @media screen and (max-width: 576px) {
    margin-top: 0px;
  }

  @media screen and (max-width: 376px) {
    // margin-top: 130px;
  }

  .coin-block {
    display: flex;
    justify-content: center;
    position: relative;

    .coin-box {
      display: grid;
      grid-template-columns: repeat(14, 1fr);
      grid-template-rows: repeat(5, 0.4fr);
      grid-column-gap: 16px;
      grid-row-gap: 0px;
      align-items: center;
      width: 95%;

      @media screen and (min-width: 500px) and (max-width: 576px) {
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(8, 0.4fr);
        width: 100%;

        img {
          width: 26px;
          height: auto;
          object-fit: contain;
        }
      }

      @media screen and (max-width: 499px) {
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(8, 0.4fr);
        width: 105%;

        img {
          width: 16px;
          height: auto;
          object-fit: contain;
        }
      }
    }
  }

  .instruction-video {
    width: 100%;
    margin-bottom: 0px;
    > p:nth-child(1) {
      font-weight: 700;
      font-size: 36px;
      line-height: 32px;
      text-align: center;
      color: rgba(255, 255, 255, 0.87);
      margin-top: 100px;
    }

    > p:nth-child(2) {
      font-weight: 400;
      font-size: 20px;
      line-height: 32px;
      text-align: center;
      color: rgba(255, 255, 255, 0.67);
      margin-top: 20px;
    }
    > div {
      width: 100%;
      > video {
        width: 100%;
        max-width: 100%;
      }
    }

    @media screen and (max-width: 682px) {
      margin-bottom: 64px;
      > p:nth-child(1) {
        font-size: 20px;
        line-height: 32px;
        margin-top: 40px;
      }
      > p:nth-child(2) {
        font-size: 14px;
        line-height: 24px;
        margin-top: 8px;
      }
    }
  }
`

const SupportedBlockchains = () => {
  const { t } = useTranslation()
  const [dataAnalyst, setdataAnalyst] = useState<DataItem[]>(dataCollected)
  const [video, setVideo] = useState(false)
  const { ref, inView } = useInView({ threshold: 1 })

  useEffect(() => {
    if (inView) setVideo(true)
  }, [inView])

  const handleGetDataAnalyst = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/analyst`)
      .then((response) => {
        const { data: result } = response
        const data: DataItem[] = dataCollected.map((item: DataItem) => {
          return {
            ...item,
            realData: result[`${item?.field}`],
          }
        })
        setdataAnalyst(data)
      })
      .catch((e) => console.warn(e, 'analyst'))
  }

  useEffect(() => {
    handleGetDataAnalyst()
  }, [])

  return (
    <Wrapper>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Grid container spacing={2}>
          {dataAnalyst.map((item: DataItem, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Grid item xs={12} md={3} key={index} data-aos="fade-up">
                <DataItemDisplay item={item} />
              </Grid>
            )
          })}
        </Grid>
      </Box>

      <div className="title" style={{ overflow: 'hidden' }}>
        <p className="describe" data-aos="fade-left">
          {t('Supported blockchains')}
        </p>
      </div>

      <Box>
        <div className="coin-block">
          <div className="coin-box">
            {listCoin.map((item: CoinItem, index) => {
              return (
                <Grid
                  item
                  xs={1.71428571429}
                  md={0.85714285714}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index + 1}
                  data-aos="fade-up"
                  className="coin-item"
                >
                  <CoinItemDisplay item={item} />
                </Grid>
              )
            })}
          </div>
        </div>
      </Box>

      <div className="instruction-video">
        <p data-aos="fade-up">{t('Earn & Trade like a Pro')}</p>
        <p data-aos="fade-up">{t('Unlocking DeFi for millions of users.')}</p>
        <div>
          <video
            autoPlay
            loop
            muted
            playsInline
            id="laptopVideo"
            controls={false}
            preload="yes"
            style={{ pointerEvents: 'none' }}
            ref={ref}
          >
            {video && (
              <>
                <source
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/home/DappPromo.mov`}
                  type='video/mp4; codecs="hvc1"'
                />
                <source src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/home/DappPromo.webm`} type="video/webm" />
              </>
            )}
          </video>
        </div>
      </div>
    </Wrapper>
  )
}

const listCoin = [
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/1_eth.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/2_bsc.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/3_arbitrum.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/4_zkSync.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/5_polygon.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/6_optimism.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/7_avalanche.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/8_fantom.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/9_cronos.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/10_ethereumPOW.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/11_Solana.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/12_algorand.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/13_klaytn.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/14_bitgert.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/15_aptos.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/16_acala.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/17_canto.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/18_osmosis.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/19_hedera.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/20_near.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/21_thorchain.svg`,
  },
  {
    icon: `/images/home/coins/sui.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/23_wave.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/24_aurora.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/25_celo.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/26_bitcoin.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/27_gnosis.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/28_moonbeam.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/29_eos.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/30_cardano.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/31_elrond.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/32_heco.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/33_neo.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/34_astar.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/35_kucoin.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/36_OKExchain.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/37_Metis.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/38_Tezos.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/39_stella.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/40_velas.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/41.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/42_fusion.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/11_kava.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/44_cosmos.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/45_kadena.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/46_telos.svg`,
  },
  {
    icon: `/images/home/coins/loopnetwork.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/47_vechain.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/49_ronin.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/50_icon.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/51_moonriver.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/52_iotex.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/53.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/54_ontology.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/55_boba.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/56_polkadot.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/57_ICP.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/43_terra2.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/58_tomochain.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/60_evmos.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/61_mixin.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/62_DefiChain.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/63_subtract.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/64_Vision.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/65_TLchain.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/66_conflux.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/67_everscale.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/68_zilliqa.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/69_rootstock.svg`,
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/plus.svg`,
  },
]

const dataCollected = [
  {
    currency: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/1_eth.svg`,
    dataEmpty: '-',
    description: 'Market Cap',
    field: 'marketCap',
  },
  {
    currency: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/1_eth.svg`,
    dataEmpty: '-',
    description: 'Total Volume',
    field: 'volumn',
  },
  {
    currency: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/1_eth.svg`,
    dataEmpty: '-',
    description: 'Total Users',
    field: 'totalUsers',
  },
  {
    currency: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/coins/1_eth.svg`,
    dataEmpty: '-',
    description: 'XOXS Staked',
    field: 'stakedXOXS',
  },
]

export default SupportedBlockchains
