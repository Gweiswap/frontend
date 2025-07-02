/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Grid } from '@mui/material'
import { useTranslation } from '@pancakeswap/localization'
import useWindowSize from 'hooks/useWindowSize'
import { useState } from 'react'
import styled from 'styled-components'

interface IPropsWI {
  isShowReadMore?: boolean
}

const Wrapper = styled.div`
  margin-bottom: 100px;
  .title {
    text-align: center;
    font-weight: 700;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .decoration {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: #fb8618;
    margin-bottom: 48px;
  }

  @media screen and (max-width: 900px) {
    .title {
      font-size: 20px;
      line-height: 32px;
    }

    .decoration {
      font-size: 14px;
      line-height: 24px;
    }

    margin-bottom: 64px;
  }
`

const WrapperItem = styled.div<IPropsWI>`
  height: 100%;
  padding: 24px 22px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  position: relative;
  // border-bottom: 1px solid #404040;
  // border-left: 1px solid #2e2e2e;
  // border-right: 1px solid #2e2e2e;

  .get_xox {
    padding: 1px;
    width: fit-content;
    margin-top: 26px;
    border-radius: 8px;
    // background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    cursor: pointer;

    .boxed-child {
      width: 100%;
      height: 100%;
      padding: 10px 20px;
      border-radius: inherit;
      border-radius: 8px;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
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
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        -webkit-mask-composite: exclude;
        mask-composite: exclude;
      }

      p {
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        background-clip: text;
      }
    }

    @media screen and (min-width: 900px) {
      position: absolute;
      left: 22px;
      bottom: 24px;
    }
  }

  .container_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${({ isShowReadMore }) => isShowReadMore && 'margin-bottom: 16px'};
    .title_item {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);
    }

    img {
      cursor: pointer;
    }
  }
  .describe {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);

    @media screen and (min-width: 900px) {
      margin-bottom: 55px;
    }
  }
  .expand {
    color: #fb8618;
    font-size: 14px;
    font-weight: 600;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 1px;
    z-index: -1;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    -webkit-mask-composite: exclude;
    mask-composite: exclude;
  }

  @media screen and (max-width: 900px) {
    .title_item {
      font-size: 18px;
      line-height: 22px;
    }
  }
`

const UpComingItem = ({ title, describe, link }) => {
  const { t } = useTranslation()
  const [isShowReadMore, setIsShow] = useState(false)
  const [readMore, setIsShowReadMore] = useState(describe.length > 260)
  const { width } = useWindowSize()

  return (
    <WrapperItem isShowReadMore={isShowReadMore}>
      <div className="container_title">
        <div className="title_item">{t(title)}</div>
        {width <= 900 ? (
          isShowReadMore ? (
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/up_coming.svg`}
              alt="down_coming"
              className="up_coming"
              onClick={() => setIsShow(!isShowReadMore)}
            />
          ) : (
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/down_coming.svg`}
              alt="down_coming"
              onClick={() => setIsShow(!isShowReadMore)}
            />
          )
        ) : null}
      </div>

      {width <= 900 ? (
        isShowReadMore ? (
          <>
            <p className="describe">{t(describe)}</p>
            <a href={link} target="_blank" rel="noreferrer">
              <div className="get_xox">
                <div className="boxed-child">
                  <p>{t('Discover More')}</p>
                </div>
              </div>
            </a>
          </>
        ) : null
      ) : (
        <>
          <p className="describe" style={{ marginTop: 16 }}>
            {readMore ? `${t(describe).slice(0, 260)}...` : t(describe)}{' '}
            {t(describe).length > 260 ? (
              <span onClick={() => setIsShowReadMore(!readMore)} style={{ cursor: 'pointer' }}>
                {readMore ? (
                  <span className="expand">{t('Read more')}</span>
                ) : (
                  <span className="expand">{t('Read less')}</span>
                )}
              </span>
            ) : null}
          </p>
          <div className="get_xox box_absolute">
            <a href={link} target="_blank" rel="noreferrer">
              <div className="boxed-child">
                <p>{t('Discover More')}</p>
              </div>
            </a>
          </div>
        </>
      )}
    </WrapperItem>
  )
}

const UpComing = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <div className="title" data-aos="fade-up">
        {t('Upcoming Developments')}
      </div>
      <p className="decoration" data-aos="fade-up" data-aos-duration="2300">
        {t(
          'Every utility is current under development and they are gonna be gradually implemented once ready. Adding massive value to the Ecosystem overtime.',
        )}
      </p>

      <Box sx={{ flexGrow: 1, display: 'flex' }} data-aos="fade-up">
        <Grid container spacing={2}>
          {listItem.map(({ title, describe, link }) => {
            return (
              <Grid item xs={12} md={3} key={title}>
                <UpComingItem describe={describe} title={title} link={link} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Wrapper>
  )
}

const listItem = [
  {
    title: 'XOX Dex V2',
    describe:
      'Why trade in a single Dex when you can Trade in all DEXs at Once. XOX Dex V2 finds you the best prices across 60+ Chains & 150+ DEXs and combines them into a single trade, all while giving you many other trade options to choose from, Ranking them by lowest fees, best rates and higher liquidity.',
    link: 'https://xoxlabs.io/dex-v2',
  },
  {
    title: 'XOX Multi-Chain Launchpad',
    describe:
      "XOX Labs is committed to developing the best web3 multi-chain launchpad in the market. With extensive research on over 50 launchpads, we'll provide seamless and secure access to profitable ICOs, fair launches, and pre-sales. Setting the industry standard and maximizing returns for investors.",
    link: 'https://docs.xoxlabs.io/xox-product-roadmap/xox-multi-chain-launchpad',
  },
  {
    title: 'XOX Mobile App/Wallet',
    describe:
      'In light of recent events, decentralized wallets such as Trust Wallet and Metamask have become increasingly important for investors who value the security of their assets. Our XOX Decentralized Wallet offers advanced multi-chain capabilities to users while ensuring the safety of their funds. With top-of-the-line security features and seamless chain management, our wallet provides a convenient and secure solution for navigating the complex world of cryptocurrency.',
    link: 'https://docs.xoxlabs.io/xox-product-roadmap/xox-mobile-wallet',
  },
  {
    title: 'XOX Coin Listing/Rating Site',
    describe:
      'Multiple Studies have shown that at least 80% of crypto holders check CoinMarketCap once a day. The problem is that there is no accurate ranking system dedicated to a specific community. So we will create our own one, fully dedicated and targeted towards the needs of the XOX Community. No more searching around multiple platforms.',
    link: 'https://docs.xoxlabs.io/xox-product-roadmap/xox-multi-chain-coin-listing-site',
  },
]

export default UpComing
