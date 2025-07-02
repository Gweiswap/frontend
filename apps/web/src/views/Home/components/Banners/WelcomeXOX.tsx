/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import styled from 'styled-components'
import { Box, Grid, Tooltip } from '@mui/material'
import { useMatchBreakpoints, CopyButton, useTooltip } from '@pancakeswap/uikit'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
import { ChainId } from '@pancakeswap/sdk'
import { TooltipCustom } from 'components/ToolTipCustom'

const Wrapper = styled.div`
  width: 100%;

  .video-container {
    position: relative;
    outline: none;
    border: none !important;

    &:focus {
      outline: none;
    }
  }

  .btn_read_doc {
    box-sizing: border-box;
    border: 1px solid #fff;
    height: 52px;
  }

  .btn_read_doc:hover {
    background: #000;
    color: #fff;
  }

  .video-container {
    height: inherit;

    video {
      position: absolute;
      z-index: -1;
      top: 30%;
      left: 0;
      width: 100%;
      transform: scale(1.8);
      outline: none;
      border: none !important;
      clip-path: inset(1px 1px);
      max-width: 1040px;
      max-height: 520px;

      &:focus {
        outline: none;
      }

      @media screen and (max-width: 900px) {
        width: 100%;
        left: unset;
        top: unset;
      }

      @media screen and (max-width: 576px) {
        height: 280px;
        transform: scale(1.5);
      }
    }

    .overlay {
      height: 520px;
      width: 650px;
      border-radius: 50%;
      position: absolute;
      top: 0px;
      left: 0%;
      z-index: -2;
      background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(249, 124, 29, 0.5) 0%,
        rgba(246, 99, 42, 0.5) 0.01%,
        rgba(249, 124, 29, 0) 100%
      );
      opacity: 0.5;
      scale: 1.3;

      @media screen and (max-width: 900px) {
        width: 100%;
        left: unset;
      }

      @media screen and (max-width: 576px) {
        height: 230px;
      }
    }
  }

  @media screen and (max-width: 900px) {
    .title {
      font-size: 24px;
      line-height: 40px;
    }
    .feature {
      font-size: 18px;
      line-height: 22px;
    }
    .description {
      font-size: 14px;
      line-height: 24px;
    }

    .btn_read_doc {
      padding: 12px 18px;
      font-size: 16px;
    }

    width: 100%;
  }

  @media screen and (max-width: 530px) {
    margin-top: 50px;
  }

  @media screen and (max-width: 400px) {
    .btn_read_doc {
      padding: 12px 18px;
      font-size: 14px;
    }
  }

  #asset_3d {
    position: absolute;
  }
`

const LeftContent = styled.div`
  min-width: 600px;

  .metamask-icon {
    border-radius: 50%;
    background: #fff;
  }

  @media screen and (max-width: 530px) {
    min-width: unset;
  }

  z-index: 2;
  .btn_group {
    display: grid;
    gap: 19px;
    grid-template-columns: auto auto 1fr;
    .get_xox {
      border-radius: 12px;
      cursor: pointer;

      .boxed-child {
        width: 100%;
        height: 100%;
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
        padding: 17px 23.5px;
        border-radius: inherit;
        span {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          font-weight: 700;
          font-size: 18px;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          border-radius: inherit;
        }
      }
    }
    @media screen and (max-width: 900px) {
      min-width: unset;
      .get_xox {
        padding: 1px;
        .boxed-child {
          padding: 15px 20px;
          span {
            font-size: 15px;
          }
        }
      }
    }

    @media screen and (max-width: 530px) {
      .get_xox {
        .boxed-child {
          padding: 13px;
          span {
            font-size: 15px;
          }
        }
      }
    }

    @media screen and (max-width: 400px) {
      .get_xox {
        .boxed-child {
          padding: 12px;
          span {
            font-size: 14px;
          }
        }
      }
    }

    @media screen and (max-width: 375px) {
      .btn_read_doc {
        font-size: 13px;
      }
    }
  }

  .grid-button {
    display: grid;
    grid-template-columns: 0.5fr 0.25fr;
    grid-template-rows: repeat(3, 0.25fr);
    grid-column-gap: 26px;
    grid-row-gap: 0px;

    .get_xox_link {
      display: block;
      height: 100%;
    }

    .get_xox {
      border-radius: 12px;
      cursor: pointer;
      height: 100%;

      .boxed-child {
        width: 100%;
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
        border-radius: inherit;
        text-align: center;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          font-weight: 700;
          font-size: 18px;
          width: 100%;
          background-color: #ffffff;
          border-radius: inherit;
        }

        @media screen and (max-width: 400px) {
          padding: 13px 0px;

          span {
            font-size: 16px;
          }
        }
      }
    }

    .icon-box {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 10.5px 0px;
      margin-top: 22px;
      align-items: center;

      @media screen and (max-width: 682px) {
        & > .single-icon {
          img {
            max-width: 34px;
          }
        }
      }
    }

    .chart {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      padding: 15.5px 0px;
      border-radius: 12px;
      position: relative;
      text-align: center;
      margin-top: 22px;
      cursor: pointer;

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
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        -webkit-text-fill-color: transparent;
        background: linear-gradient(95.32deg, rgb(184, 9, 181) -7.25%, rgb(237, 28, 81) 54.2%, rgb(255, 176, 0) 113.13%)
          text;

        @media screen and (max-width: 400px) {
          font-size: 16px;
          line-height: 19px;
        }
      }

      @media screen and (max-width: 400px) {
        padding: 11.5px 0px;
      }
    }

    @media screen and (max-width: 576px) {
      grid-template-columns: 0.75fr 0.4fr;
      margin-bottom: 12px;
    }

    @media screen and (max-width: 400px) {
      grid-template-columns: 0.9fr 0.4fr;
      grid-column-gap: 12px;
    }

    .more-btn {
      display: flex;
      flex-direction: row;
      position: relative;
      margin-top: 22px;

      .bg-btn {
        padding: 12px 0px;
        border-radius: 12px;
        position: relative;
        text-align: center;
        display: flex;
        position: relative;
        width: 100%;
        justify-content: space-evenly;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.87);
        font-size: 14px;
        line-height: 17px;
        font-weight: 700;
        cursor: pointer;
        align-items: center;
      }

      button {
        background: transparent;
      }
    }

    .eth-box {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
      position: relative;
      display: flex;
      padding: 9px 6px;
      margin-top: 24px;
      justify-content: space-around;
      align-items: center;

      span {
        color: rgba(255, 255, 255, 0.87);
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
      }

      input {
        background: transparent;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        border: 0;
        outline: none;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.87);
        font-weight: 400;
        max-width: 150px;
      }

      input.active {
        text-decoration: underline;
      }

      @media screen and (max-width: 576px) {
        span {
          color: rgba(255, 255, 255, 0.87);
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
        }

        input {
          max-width: 70px;
          font-size: 14px;
          line-height: 17px;
        }
      }
    }
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 40px;
  line-height: 72px;
  color: rgba(255, 255, 255, 0.87);
`

const Feature = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 44px;
  background: linear-gradient(
    89deg,
    rgba(155, 243, 203, 1) 0%,
    rgba(62, 192, 166, 1) 25%,
    rgba(244, 66, 52, 1) 50%,
    rgba(159, 58, 131, 1) 75%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin: 24px 0;
`

const Description = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
`

const Button = styled.button`
  background: #ffffff;
  border-radius: 12px;
  border: none;
  // padding: 16px 92.5px;
  font-weight: 700;
  // height: 100%;
  font-size: 18px;
  color: #000000;
  cursor: pointer;
  padding: 16px 0px;
  width: 100%;

  &:hover {
    background: #ffffff;
  }

  @media screen and (max-width: 900px) {
    font-size: 16px;
  }
`

const GridLeft = styled(Grid)`
  @media screen and (min-width: 901px) {
    align-items: center;
    display: flex;
  }
  @media screen and (max-width: 900px) {
    margin-bottom: 66px;
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  overflow-x: hidden;

  #canvas3d_mobile {
    width: 670px !important;
    height: 458px !important;
  }

  @media screen and (max-width: 786px) {
    position: relative;
    #canvas3d_mobile {
      transform: scale(1.1);
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-30%, -50%);
    }
  }

  @media screen and (max-width: 450px) {
    position: relative;
    #canvas3d_mobile {
      left: 45%;
      top: 15%;
      width: 528px !important;
      height: 390px !important;
    }
  }
`

const CustomDropdown = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: calc(100% + 5px);
  left: 0;
  padding: 16px;
  background: #1d1c1c;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  min-width: 250px;

  .blur {
    position: absolute;
    left: 0;
    top: -5px;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .popover-coin {
    display: flex;
    background: #1d1c1c;
    flex-direction: row;
    justify-content: space-between;

    .coin-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px 8px 12px;
      gap: 8px;

      img {
        min-width: 22px;
      }

      img.zkSync-logo {
        background: #f3f6ff;
        border-radius: 50%;
        height: 22px;
        padding: 2px;
      }

      .coin-data {
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .title {
          font-weight: bold;
          font-size: 16px;
          line-height: 19px;
          text-align: center;
          color: rgba(255, 255, 255, 0.87);
          white-space: nowrap;
        }

        p {
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          color: rgba(255, 255, 255, 0.87);
        }

        .description {
          text-decoration: underline;
        }
      }
    }

    .coin-buttons {
      justify-content: center;
      display: flex;
      flex-direction: row;
      padding: 8px 12px 8px 12px;
      gap: 8px;
      min-width: 97px;
    }
  }

  @media screen and (max-width: 560px) {
    left: unset;
    right: 0;

    .popover-coin .coin-info .coin-data {
      width: 118px;
    }

    .popover-coin .coin-info .coin-data .title {
      white-space: pre-wrap;
    }
  }
`

const networks = [
  {
    title: 'BNB Chain',
    address: '',
    // address: XOX_ADDRESS[process.env.NEXT_PUBLIC_TEST_MODE === '1' ? ChainId.BSC_TESTNET : ChainId.BSC],
    image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/hero/bsc.svg`,
  },
  {
    title: 'Arbitrum',
    address: '',
    // address: XOX_ADDRESS[process.env.NEXT_PUBLIC_TEST_MODE === '1' ? ChainId.ARBITRUM_TESTNET : ChainId.ARBITRUM],
    image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/Arbitrum.svg`,
  },
  {
    title: 'Polygon',
    address: '',
    // address: XOX_ADDRESS[process.env.NEXT_PUBLIC_TEST_MODE === '1' ? ChainId.POLYGON_TESTNET : ChainId.POLYGON],
    image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/Polygon.svg`,
  },
  {
    title: 'zkSync',
    address: '',
    // address: XOX_ADDRESS[process.env.NEXT_PUBLIC_TEST_MODE === '1' ? ChainId.ZKSYNC_TESTNET : ChainId.ZKSYNC],
    image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/zkSync.svg`,
  },
  {
    title: 'Optimism',
    address: '',
    // address: XOX_ADDRESS[process.env.NEXT_PUBLIC_TEST_MODE === '1' ? ChainId.OPTIMISM_TESTNET : ChainId.OPTIMISM],
    image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/Optimism.svg`,
  },
]

// const ETH_ADDRESS = ETH_ADDRESS
const ETH_ADDRESS = '' as string

const WelcomeXOX = (): JSX.Element => {
  const { t } = useTranslation()
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()
  const [openDropdown, setOpenDropdown] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const lapTop = document.getElementById('laptopVideo') as any

  useEffect(() => {
    if (!lapTop) return
    lapTop.play()
  }, [lapTop])

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Wrapper>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} className="grid_welcome_container">
          <GridLeft item xs={12} md={6}>
            <LeftContent>
              <Title className="title">
                XOX<span style={{ color: '#FB8618' }}>: </span>
                {t('The Next Gen Multichain DeFi Dapps & Web3 Solutions Provider')}
              </Title>
              <Feature className="feature">{t('Revolutionary - Scalable - Sustainable')}</Feature>
              <Description className="description">
                {t('Swap, stake, store, bridge, refer, invest and earn with ease on the')}
                {isMobile || isTablet ? ' ' : <br />}
                {t('leading Decentralized Blockchain Ecosystem.')}
              </Description>
              <div className="grid-button">
                <div>
                  <Button className="btn_read_doc" onClick={() => window.open('https://docs.xoxlabs.io')}>
                    {t('Read Documentation')}
                  </Button>
                </div>
                <div>
                  <TooltipCustom title={t('Deployment Coming')}>
                    <a
                      // href={`/swap?chainId=${chainId}&outputCurrency=${XOX_ADDRESS[chainId]}&inputCurrency=${USD_ADDRESS[chainId]}`}
                      href="javascript:void(0)"
                      // target="_blank"
                      rel="noreferrer"
                      className="get_xox_link"
                    >
                      <div className="get_xox">
                        <div className="boxed-child">
                          <span>{t('Get %symbol%', { symbol: 'XOX' })}</span>
                        </div>
                      </div>
                    </a>
                  </TooltipCustom>
                </div>
                <div className="icon-box">
                  <div className="single-icon">
                    <a href="https://twitter.com/Xox_Labs" target="_blank">
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/hero/twitter.svg`}
                        alt="social_media"
                      />
                    </a>
                  </div>
                  <div className="single-icon">
                    <a href="https://t.me/xoxlabsofficial" target="_blank">
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/hero/telegram_2.svg`}
                        alt="social_media"
                      />
                    </a>
                  </div>
                  <div className="single-icon">
                    <a href="https://t.me/xoxlabsofficialchannel" target="_blank">
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/hero/telegram_channel.svg`}
                        alt="social_media"
                      />
                    </a>
                  </div>
                  <div className="single-icon">
                    <a href="https://discord.gg/xoxlabs" target="_blank">
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/hero/discord.svg`}
                        alt="social_media"
                      />
                    </a>
                  </div>
                  <div className="single-icon">
                    <a href="https://www.youtube.com/@XoxLabs" target="_blank">
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/hero/youtube.svg`}
                        alt="social_media"
                      />
                    </a>
                  </div>
                </div>

                <div>
                  <a href="/info" target="_blank">
                    <div className="chart">
                      <div className="bg-button">
                        <p>{t('Chart')}</p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="">
                  <div className="eth-box">
                    <img
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/hero/eth.svg`}
                      alt="email"
                      className="email-icon"
                    />
                    {(isMobile || isTablet) && (
                      <>
                        <span>ETH:</span>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder=""
                          value={
                            ETH_ADDRESS
                              ? `${ETH_ADDRESS.substring(0, 8)}...${ETH_ADDRESS.substring(ETH_ADDRESS.length - 4)}`
                              : t('Deployment Coming')
                          }
                          className={ETH_ADDRESS && 'active'}
                          required
                        />
                      </>
                    )}

                    {isDesktop && (
                      <>
                        <span style={{ display: 'flex', alignItems: 'center' }}>ETH:</span>
                        <input
                          type="text"
                          id=""
                          name=""
                          placeholder=""
                          value={
                            ETH_ADDRESS
                              ? `${ETH_ADDRESS.substring(0, 8)}...${ETH_ADDRESS.substring(ETH_ADDRESS.length - 4)}`
                              : t('Deployment Coming')
                          }
                          className={ETH_ADDRESS && 'active'}
                          required
                        />
                      </>
                    )}
                    <CopyButton
                      text={ETH_ADDRESS}
                      tooltipMessage={t('Copied')}
                      button={
                        <img
                          src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/hero/copy.svg`}
                          alt="copy"
                          style={{ marginTop: '3px' }}
                        />
                      }
                    />
                    <button
                      style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                      onClick={() => {
                        window.ethereum.request({
                          method: 'wallet_watchAsset',
                          params: {
                            type: 'ERC20',
                            options: {
                              address: ETH_ADDRESS,
                              symbol: 'XOX',
                              decimals: 18,
                              image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xox-icon.svg`,
                            },
                          },
                        })
                      }}
                    >
                      <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/shield.svg`} alt="shield" />
                    </button>
                    <button
                      style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                      onClick={() => {
                        window.ethereum.request({
                          method: 'wallet_watchAsset',
                          params: {
                            type: 'ERC20',
                            options: {
                              address: ETH_ADDRESS,
                              symbol: 'XOX',
                              decimals: 18,
                              image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xox-icon.svg`,
                            },
                          },
                        })
                      }}
                    >
                      <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/metamask-no-bg.svg`} alt="wolf" />
                    </button>
                  </div>
                </div>

                <div className="more-btn" style={{ position: 'relative' }} onMouseLeave={() => setOpenDropdown(false)}>
                  <Button aria-describedby={id} onMouseOver={() => setOpenDropdown(true)} className="bg-btn">
                    <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/hero/checklist.svg`} alt="checklist" />
                    {t('More')}
                    <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/hero/down.svg`} alt="down" />
                  </Button>
                  {openDropdown && (
                    <CustomDropdown tabIndex={0} id="dropdown-networks">
                      <div className="blur" onClick={() => setOpenDropdown(false)} />
                      {networks.map((network) => {
                        return (
                          <>
                            <div className="popover-coin">
                              <div className="coin-info">
                                <img
                                  src={network.image}
                                  alt="bsc"
                                  width={22}
                                  height={22}
                                  className={network.title === 'zkSync' && 'zkSync-logo'}
                                />
                                <div className="coin-data">
                                  <p className="title">{network.title}</p>
                                  {network.address ? (
                                    <p className="description">{`${network.address.substring(
                                      0,
                                      8,
                                    )}...${network.address.substring(network.address.length - 4)}`}</p>
                                  ) : (
                                    <p style={{ whiteSpace: 'nowrap' }}>{t('Deployment Coming')}</p>
                                  )}
                                </div>
                              </div>
                              <div className="coin-buttons">
                                <CopyButton
                                  text={network.address || ''}
                                  tooltipMessage={t('Copied')}
                                  button={
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/hero/copy.svg`}
                                      alt="copy"
                                      style={{ marginTop: '7px' }}
                                    />
                                  }
                                />
                                <button
                                  style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                                  onClick={() => {
                                    window.ethereum.request({
                                      method: 'wallet_watchAsset',
                                      params: {
                                        type: 'ERC20',
                                        options: {
                                          address: network.address,
                                          symbol: 'XOX',
                                          decimals: 18,
                                          image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xox-icon.svg`,
                                        },
                                      },
                                    })
                                  }}
                                >
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/shield-icon.svg`}
                                    alt="shield"
                                  />
                                </button>
                                <button
                                  style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                                  onClick={() => {
                                    window.ethereum.request({
                                      method: 'wallet_watchAsset',
                                      params: {
                                        type: 'ERC20',
                                        options: {
                                          address: network.address,
                                          symbol: 'XOX',
                                          decimals: 18,
                                          image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xox-icon.svg`,
                                        },
                                      },
                                    })
                                  }}
                                >
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/metamask-icon.svg`}
                                    alt="wolf"
                                  />
                                </button>
                              </div>
                            </div>
                          </>
                        )
                      })}
                    </CustomDropdown>
                  )}
                </div>
              </div>
            </LeftContent>
          </GridLeft>
          <Grid item xs={12} md={5} sx={{ height: '300px', minHeight: '300px', overflow: 'visible' }}>
            <div className="video-container">
              <div className="overlay" />
              <video
                autoPlay
                loop
                muted
                playsInline
                id="laptopVideo"
                controls={false}
                preload="yes"
                style={{ pointerEvents: 'none' }}
              >
                <source
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/home/laptop.mov`}
                  type='video/mp4; codecs="hvc1"'
                />
                <source src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/home/laptop.webm`} type="video/webm" />
              </video>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default WelcomeXOX
