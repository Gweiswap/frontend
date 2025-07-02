/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-boolean-value */
import styled from 'styled-components'
import 'swiper/css'
import SwiperCore, { Autoplay } from 'swiper'
import { useState } from 'react'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Partner from './Partner'

SwiperCore.use([Autoplay])

const Wrapper = styled.div`
  .main {
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .swiper-wrapper {
    transition-timing-function: linear;
  }

  .title {
    text-align: center;
    font-weight: 700;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;

    @media screen and (max-width: 900px) {
      font-size: 20px;
      margin-top: 32px;
    }
  }

  .decoration {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: #fb8618;

    margin-bottom: 48px;

    @media screen and (max-width: 900px) {
      font-size: 14px;
    }
  }

  .btn_see_all {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 100px;

    @media screen and (max-width: 900px) {
      margin: 56px 0px 64px;
    }
  }

  .get_xox {
    cursor: pointer;
    padding: 1px;
    border-radius: 8px;
    background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);

    .boxed-child {
      width: 100%;
      height: 100%;
      background-color: black;
      padding: 16px 40px;
      border-radius: inherit;
      span {
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 700;
        font-size: 18px;
        width: 100%;
        height: 100%;
        background-color: #191a28;
        border-radius: inherit;
      }
    }

    @media screen and (max-width: 900px) {
      font-size: 14px;
      .boxed-child {
        padding: 12px 30px;
        span {
          font-size: 16px;
        }
      }
    }
  }

  .slide_container {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 117px;
      left: -1px;
      background: linear-gradient(90deg, #0a0a0a 0%, rgba(10, 10, 10, 0) 100%);
      z-index: 99;
    }

    &::after {
      content: '';
      position: absolute;
      height: 100%;
      right: -1px;
      top: 0;
      width: 117px;
      background: linear-gradient(90deg, #0a0a0a 0%, rgba(10, 10, 10, 0) 70.83%);
      transform: matrix(-1, 0, 0, 1, 0, 0);
      z-index: 99;
    }

    @media (max-width: 560px) {
      &::before {
        width: 70px;
      }

      &::after {
        width: 70px;
      }
    }
  }

  @media (max-width: 560px) {
    .slide_container {
      width: 100vw;
      max-width: 100%;
    }
  }
`

const Partners = () => {
  const { t } = useTranslation()
  const [isShowMore, setIsShowMore] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const { isMobile } = useMatchBreakpoints()

  const handleChangeShowMore = () => {
    setIsShowMore(!isShowMore)
  }

  return (
    <Wrapper>
      <div className="title" data-aos="fade-up">
        {t('Powered By')}
      </div>
      <p className="decoration" data-aos="fade-up" data-aos-duration="2300">
        {t('Powered by the Best to Deliver The Best.')}
      </p>

      <div className="slide_container">
        <Partner items={listPartners1} isMobile={isMobile} type="infinitetl" />
        <Partner items={listPartners2} type="infinitetr" />
        <Partner items={listPartners3} type="infinitetl" />
      </div>

      <div className="btn_see_all" data-aos="fade-up" style={{ display: 'none' }}>
        <div className="get_xox" onClick={handleChangeShowMore}>
          <div className="boxed-child">{isShowMore ? <span>See Less</span> : <span>See All</span>}</div>
        </div>
      </div>
    </Wrapper>
  )
}

const listPartners1 = [
  { iconName: 'Ethereum', href: 'https://ethereum.org/' },
  { iconName: 'Solidity', href: 'https://soliditylang.org/' },
  { iconName: 'BNB', href: 'https://bnbchain.org/en' },
  { iconName: 'Arbitrum', href: 'https://arbitrum.io/' },
  { iconName: 'Uniswap', href: 'https://uniswap.org/' },
  { iconName: 'Optimism', href: 'https://www.optimism.io/' },
  { iconName: 'zksync', href: 'https://zksync.io/' },
]

const listPartners2 = [
  { iconName: 'Polygon', href: 'https://polygon.technology/home' },
  { iconName: 'Pancakeswap', href: 'https://pancakeswap.finance/' },
  { iconName: 'GoogleCloud', href: 'https://cloud.google.com/' },
  { iconName: 'DaoMaker', href: 'https://daomaker.com/' },
  { iconName: 'Kingpad', href: 'https://kingpad.finance/' },
  { iconName: 'Chainlink', href: 'https://chain.link/' },
  { iconName: 'Tether', href: 'https://tether.to/' },
]

const listPartners3 = [
  { iconName: 'Circle', href: 'https://www.circle.com/en/usdc' },
  { iconName: 'CoinmarketcapAPI', href: 'https://coinmarketcap.com/api/' },
  { iconName: 'Metamask', href: 'https://metamask.io/' },
  { iconName: 'TrustWallet', href: 'https://trustwallet.com/' },
  { iconName: 'Coingecko', href: 'https://www.coingecko.com/' },
  { iconName: 'DefiLlama', href: 'https://defillama.com/' },
]

export default Partners
