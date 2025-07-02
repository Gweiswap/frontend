import { useTranslation } from '@pancakeswap/localization'
import { Flex, Grid, useTooltip } from '@pancakeswap/uikit'
import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

const Wrapper = styled.div`
  margin: 24px 0px 42px;

  @media screen and (max-width: 900px) {
    margin: 0px;
  }
`
const Content = styled(Grid)`
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const WrapperItem = styled(Flex)`
  position: relative;
  padding: 24px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;

  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.87);
  }
  .describe {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #fb8618 !important;
    margin-top: 16px;
    margin-bottom: 38px;
  }
  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-left: 1px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    bottom: 0;
    border-width: 1px;
    border-radius: inherit;
    border-color: white;
    border-style: solid;
    mask: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
  }

  .airbnb {
    margin-top: 35px;
  }

  &.secured .logos {
    > div {
      position: relative;
      display: inline-block;
    }

    > div a {
      display: block;
    }

    > div img {
      cursor: pointer;
      width: 120px;

      &.icon-short {
        position: absolute;
        z-index: 2;
      }

      &.icon-full {
        opacity: 0;
      }
    }

    > div:hover {
      img.icon-short {
        visibility: hidden;
      }

      img.icon-short + img {
        opacity: 1;
      }
    }
  }
  &.backed > div {
    > div:nth-child(1) {
      padding: 0px;
    }
    > div {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 100px));
      grid-column-gap: 24px;
      place-content: center;
      img {
        max-width: 100%;
        width: 100px;
        cursor: pointer !important;
      }
    }

    .group-partner {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-column-gap: 24px;
      place-content: center;
      img {
        max-width: 100%;
        width: 100px;
        cursor: pointer !important;
      }
    }
  }

  @media screen and (max-width: 900px) {
    padding: 24px 15px;

    .title {
      font-size: 16px;
      line-height: 24px;
    }
    .describe {
      font-size: 14px;
      line-height: 24px;
      margin-top: 10px;
      color: #fb8618 !important;
    }

    &.backed > div {
      .group-partner {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-column-gap: 24px;
        place-content: center;

        a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        img {
          max-width: 100%;
          width: 100px;
          cursor: pointer !important;
        }
      }

      // > div.list-logo {
      //   display: grid;
      //   grid-template-columns: repeat(2, minmax(0, 1fr));
      //   grid-column-gap: 58px;
      // }
      // > div:nth-child(1) {
      //   padding: 0px;
      // }
      // > div:nth-child(2) {
      //   padding-left: 0px;
      //   margin: 0px;
      // }

      // img {
      //   width: 100px;
      // }
    }
  }
  @media screen and (max-width: 560px) {
    &.secured .logos div img {
      max-width: 80px;
    }
  }
`

const SwiperWrapper = styled(Swiper)`
  .swiper-pagination {
    bottom: 0;
  }

  .swiper-pagination-bullet {
    background: white;
  }
  // .swiper-pagination-bullet-active {
  //   background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  // }
`

const SecuredByItem = ({ item }) => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(t('Coming Soon'), {
    placement: 'top',
  })

  const {
    targetRef: zellicRef,
    tooltip: zellicTooltip,
    tooltipVisible: zellicTooltipVisible,
  } = useTooltip(t('Coming Soon'), {
    placement: 'top',
  })

  const {
    targetRef: certikRef,
    tooltip: certikTooltip,
    tooltipVisible: certikTooltipVisible,
  } = useTooltip(<span style={{ whiteSpace: 'nowrap' }}>{t('Onboarding')}</span>, {
    placement: 'top',
  })

  return (
    <WrapperItem className="container secured" flexDirection="column" alignItems="center" position="relative">
      <p className="title">{t(item.title)}</p>
      <p className="describe">{t(item.describe)}</p>

      {certikTooltipVisible && certikTooltip}
      <div className="logos">
        <div ref={certikRef}>
          <a href="https://www.certik.com/" target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Certik-short.svg`}
              className="icon-short"
              alt="CertikLogo"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Certik-full.svg`}
              className="icon-full"
              alt="CertikLogo"
            />
          </a>
        </div>

        {zellicTooltipVisible && zellicTooltip}
        <div ref={zellicRef}>
          <a href="https://www.zellic.io/" target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Zellic-short.svg`}
              className="icon-short"
              alt="ZellicLogo"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Zellic-full.svg`}
              className="icon-full"
              alt="ZellicLogo"
            />
          </a>
        </div>

        {tooltipVisible && tooltip}
        <div ref={targetRef}>
          <a href="https://hacken.io/" target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Hacken-short.svg`}
              className="icon-short"
              alt="HackenLogo"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Hacken-full.svg`}
              className="icon-full"
              alt="HackenLogo"
            />
          </a>
        </div>
        {/* <div>
              <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/MicrosoftLogo.svg`} alt="MicrosoftLogo" />
              <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/WalmartLogo.svg`} alt="WalmartLogo" />
              <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/FedExLogo.svg`} alt="FedExLogo" />
            </div> */}
      </div>
    </WrapperItem>
  )
}

const BackedByItem = ({ item }) => {
  const { width } = useWindowSize()
  const { t } = useTranslation()

  return (
    <WrapperItem
      className="container backed"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <p className="title">{t(item.title)}</p>
      <p className="describe">{t(item.describe)}</p>

      <div>
        <SwiperWrapper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={true}
          speed={1500}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {partnersList.map((partnerGroup1) => {
            return (
              <SwiperSlide key={JSON.stringify(partnerGroup1)}>
                <div className="group-partner">
                  {partnerGroup1.map((partner: any) => {
                    return (
                      <a href={partner.href} target="_blank" className="logo-link">
                        <img
                          src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/audit/${partner.image_name}.svg`}
                          alt={partner.image_name}
                        />
                      </a>
                    )
                  })}
                </div>
              </SwiperSlide>
            )
          })}
        </SwiperWrapper>

        {/* {width < 900 && (
          <div className="list-logo">
            <SwiperWrapper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              spaceBetween={50}
              slidesPerView={4}
              slidesPerGroup={4}
              loop={true}
              speed={1500}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              {partnersList.flat().map((partner) => {
                return (
                  <a href={partner.href} target="_blank" key={JSON.stringify(partner)}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/audit/${partner.image_name}.svg`}
                      alt={partner.image_name}
                    />
                  </a>
                )
              })}
            </SwiperWrapper>
          </div>
        )} */}
      </div>
    </WrapperItem>
  )
}

function BackedBy() {
  return (
    <Wrapper>
      <Content>
        <SecuredByItem
          item={{
            title: 'Secured By',
            describe: 'XOX has Industry Leading Security. Protected By The Best.',
          }}
        />
        <BackedByItem
          item={{
            title: 'Ecosystem Partners',
            describe: 'Partnered with the Best to deliver the Best.',
          }}
        />
      </Content>
    </Wrapper>
  )
}

export const partnersList = [
  [
    {
      image_name: 'BNBChain_logo',
      href: 'https://bnbchain.org/',
    },
    {
      image_name: 'zksync_logo',
      href: 'https://zksync.io/',
    },
    {
      image_name: 'Linea_logo',
      href: 'https://linea.build/',
    },
    {
      image_name: 'OKX_logo',
      href: 'https://www.okx.com/',
    },
    {
      image_name: 'KyberNetwork_logo',
      href: 'https://kyber.network/',
    },
    {
      image_name: 'Level_logo',
      href: 'https://level.finance/',
    },
  ],
  [
    {
      image_name: 'Syncswap_logo',
      href: 'https://syncswap.xyz/',
    },
    {
      image_name: 'Symbiosis_logo',
      href: 'https://symbiosis.finance/',
    },
    {
      image_name: 'Pangolin_logo',
      href: 'https://www.pangolin.exchange/',
    },
    {
      image_name: 'MummyFinance_logo',
      href: 'https://www.mummy.finance/',
    },
    {
      image_name: 'Orion_logo',
      href: 'https://www.orionprotocol.io/',
    },
    {
      image_name: 'Quickswap_logo',
      href: 'https://quickswap.exchange/',
    },
  ],
  [
    {
      image_name: 'Wombat_logo',
      href: 'https://www.wombat.exchange/',
    },
    {
      image_name: 'Rubic_logo',
      href: 'https://rubic.exchange/',
    },
    {
      image_name: 'Gnosis_logo',
      href: 'https://www.gnosis.io/',
    },
    {
      image_name: 'Swing_logo',
      href: 'https://swing.xyz/',
    },
    {
      image_name: 'Chainge_logo',
      href: 'https://www.chainge.finance/',
    },
    {
      image_name: 'iZumi_logo',
      href: 'https://izumi.finance/home',
    },
  ],
  [
    {
      image_name: 'Dexalot_logo',
      href: 'https://dexalot.com/',
    },
    {
      image_name: 'ODOS_logo',
      href: 'https://odos.xyz/',
    },
    {
      image_name: 'Orbiter_logo',
      href: 'https://www.orbiter.finance/',
    },
    {
      image_name: 'ElkFinance_logo',
      href: 'https://elk.finance/',
    },
    {
      image_name: 'Velocore_logo',
      href: 'https://app.velocore.xyz/',
    },
    {
      image_name: 'debridge_logo',
      href: 'https://debridge.finance/',
    },
  ],
  [
    {
      image_name: 'Bitgert_logo',
      href: 'https://bitgert.com/',
    },
    {
      image_name: 'KingPad_logo',
      href: 'https://kingpad.finance/',
    },
    {
      image_name: 'Xodex_logo',
      href: 'https://www.xo-dex.com/',
    },
  ],
]

export default BackedBy
