/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'
import React, { useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { TooltipCustom } from 'components/ToolTipCustom'

interface SecureProps {
  item: SecureItem
}

export interface SecureItem {
  imagePathDesktop: string
  imagePathMobile: string
  name: string
}

const Wrapper = styled.div`
  margin-bottom: 24px;
  margin-top: 32px;
  .title {
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;

    @media screen and (max-width: 900px) {
      font-size: 20px;
      margin-top: 36px;
    }
  }

  .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #fb8618;
    margin-top: 16px;
    margin-bottom: 40px;

    @media screen and (max-width: 900px) {
      font-size: 14px;
    }
  }

  .imgs {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 70px;
    margin-bottom: 100px;

    @media screen and (max-width: 900px) {
      margin-bottom: 40px;
    }

    .box {
      position: relative;
      width: 120px;
      height: 120px;
    }

    .box img {
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

    .box:hover {
      img.icon-short {
        visibility: hidden;
      }

      img.icon-short + img {
        opacity: 1;
      }
    }

    @media screen and (max-width: 900px) {
      gap: 16px;
    }
  }

  .certik-box,
  .hubspot-box,
  .google-box {
    position: relative;

    .airbnb-info {
      left: 0;
      position: absolute;
      z-index: 1;
      background: #1d1c1c;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      width: 450px;
      height: 230px;

      .popup-info {
        padding: 16px;

        .top {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;

          .coin-info {
            display: flex;
            flex-flow: row;
            align-items: center;
            gap: 12px;

            p {
              font-weight: 700;
              font-size: 20px;
              line-height: 24px;
              text-align: center;
              color: rgba(255, 255, 255, 0.87);
              font-style: normal;
            }
          }

          .status {
            display: flex;
            flex-flow: row;
            align-items: center;

            p {
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 15px;
              color: rgba(255, 255, 255, 0.87);

              &:before {
                content: '• ';
                color: #c20da3;
                font-size: 18px;
              }
            }
          }
        }

        .middle {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: flex-start;
          gap: 10px;
          margin: 12px 0;

          div {
            padding: 6px 10px;
            border-radius: 4px;
          }

          div:first-child {
            text-align: left;
            background: rgba(255, 255, 255, 0.1);
            opacity: 0.38;

            .title,
            .description {
              text-align: left;
            }
          }

          div:not(:first-child) {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }

          .coin-title {
            font-style: normal;
            font-weight: 400;
            font-size: 8px;
            line-height: 10px;
            color: rgba(255, 255, 255, 0.87);
          }

          .coin-description {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 15px;
            color: rgba(255, 255, 255, 0.87);
          }
        }

        .bottom {
          display: grid;
          grid-template-columns: 1fr 0.6fr;
          grid-template-rows: 0.33fr;
          grid-column-gap: 12px;
          grid-row-gap: 0px;

          .trust-score {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            width: 100%;
            height: 100%;
            padding: 10px;

            .trust-score-title {
              font-style: normal;
              font-weight: 700;
              font-size: 14px;
              line-height: 17px;
              text-align: left;
              color: rgba(255, 255, 255, 0.87);
            }

            .trust-score-box {
              display: grid;
              grid-template-columns: 1fr 0.8fr;
              grid-template-rows: 1fr;
              grid-column-gap: 0px;
              grid-row-gap: 0px;

              .trust-score-description {
                display: flex;
                flex-direction: column;
                justify-content: center;

                .trust-score-description-top {
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 15px;
                  color: rgba(255, 255, 255, 0.87);
                }

                .trust-score-description-bottom {
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 15px;
                  color: rgba(255, 255, 255, 0.87);

                  .up-arrow {
                    &:before {
                      content: '▲ ';
                      color: #c20da3;
                      font-size: 14px;
                    }
                  }

                  .down-arrow {
                    &:before {
                      content: '▼ ';
                      color: #c20da3;
                      font-size: 14px;
                    }
                  }
                }
              }

              .flex-wrapper {
                display: flex;
                flex-flow: row nowrap;
              }

              .single-chart {
                width: 80%;
                justify-content: space-around;
              }

              .circular-chart {
                display: block;
                margin: 10px auto;
                max-width: 80%;
                max-height: 250px;
              }

              .circle-bg {
                fill: none;
                stroke: #eee;
                stroke-width: 3.8;
              }

              .circle {
                fill: none;
                stroke-width: 2.8;
                stroke-linecap: round;
                animation: progress 1s ease-out forwards;
              }

              @keyframes progress {
                0% {
                  stroke-dasharray: 0 100;
                }
              }

              .circular-chart.orange .circle {
                stroke: #ff9f00;
              }

              .circular-chart.green .circle {
                stroke: #4cc790;
              }

              .circular-chart.blue .circle {
                stroke: #3c9ee5;
              }

              .percentage {
                fill: rgba(255, 255, 255, 0.87);
                font-weight: 700;
                font-size: 12px;
                line-height: 15px;
                text-anchor: middle;
              }
            }
          }

          .report {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            padding: 10px;

            .report-top {
              display: flex;
              flex-direction: row;
              justify-content: space-between;

              .report-title {
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 17px;
                color: rgba(255, 255, 255, 0.87);
              }

              .report-last-report {
                padding: 6px 10px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 15px;
                color: rgba(255, 255, 255, 0.87);
              }
            }

            .report-bottom {
              display: grid;
              grid-template-columns: 0.4fr 0.6fr;
              grid-template-rows: 1fr;
              grid-column-gap: 12px;
              grid-row-gap: 12px;
              margin-top: 12px;

              .delivery {
                p:first-child {
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 15px;
                  color: rgba(255, 255, 255, 0.87);
                }

                p:not(:first-child) {
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 15px;
                  color: rgba(255, 255, 255, 0.87);
                  margin-top: 6px;
                }
              }

              .finding {
                text-align: center;

                p:first-child {
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 15px;
                  color: rgba(255, 255, 255, 0.87);
                }

                p:not(:first-child) {
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 15px;
                  color: rgba(255, 255, 255, 0.87);
                  margin-top: 6px;
                }
              }
            }
          }
        }
      }
    }
  }
`

const HoverTextAirBnb = () => {
  return (
    <div className="airbnb-info">
      <div className="popup-info">
        <div className="top">
          <div className="coin-info">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/secure-by/xox.svg`} alt="xox" />
            <p>XOX</p>
          </div>
          <div className="status">
            <p>On Board</p>
          </div>
        </div>
        <div className="middle">
          <div>
            <p className="coin-title">Verified</p>
            <p className="coin-description">Contract</p>
          </div>
          <div>
            <p className="coin-title">Certik</p>
            <p className="coin-description">KYC</p>
          </div>
          <div>
            <p className="coin-title">Certik</p>
            <p className="coin-description">Skynet</p>
          </div>
        </div>
        <div className="bottom">
          <div className="report">
            <div className="report-top">
              <p className="report-title">Neon DEX- au...</p>
              <p className="report-last-report">Latest Report</p>
            </div>
            <div className="report-bottom">
              <div className="delivery">
                <p>Delivered Date</p>
                <p>20/9/2022</p>
              </div>
              <div className="finding">
                <p>Total Findings</p>
                <p>3 (2 Resolved)</p>
              </div>
            </div>
          </div>
          <div className="trust-score">
            <p className="trust-score-title">Trust Score</p>
            <div className="trust-score-box">
              <div className="flex-wrapper">
                <div className="single-chart">
                  <svg viewBox="0 0 36 36" className="circular-chart orange">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      stroke-dasharray="30, 100"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="22.35" className="percentage">
                      60
                    </text>
                  </svg>
                </div>
              </div>
              <div className="trust-score-description">
                <p className="trust-score-description-top">Last 24h</p>
                <p className="trust-score-description-bottom">
                  <span className="up-arrow"></span>0.00%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HoverTextHubspot = () => {
  return (
    <div className="airbnb-info">
      <div className="popup-info">
        <div className="top">
          <div className="coin-info">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/secure-by/xox.svg`} alt="xox" />
            <p>XOX</p>
          </div>
          <div className="status">
            <p>On Board</p>
          </div>
        </div>
        <div className="middle">
          <div>
            <p className="coin-title">Verified</p>
            <p className="coin-description">Contract</p>
          </div>
          <div>
            <p className="coin-title">Certik</p>
            <p className="coin-description">KYC</p>
          </div>
          <div>
            <p className="coin-title">Certik</p>
            <p className="coin-description">Skynet</p>
          </div>
        </div>
        <div className="bottom">
          <div className="report">
            <div className="report-top">
              <p className="report-title">Neon DEX- au...</p>
              <p className="report-last-report">Latest Report</p>
            </div>
            <div className="report-bottom">
              <div className="delivery">
                <p>Delivered Date</p>
                <p>20/9/2022</p>
              </div>
              <div className="finding">
                <p>Total Findings</p>
                <p>3 (2 Resolved)</p>
              </div>
            </div>
          </div>
          <div className="trust-score">
            <p className="trust-score-title">Trust Score</p>
            <div>
              <div className="flex-wrapper">
                <div className="single-chart">
                  <svg viewBox="0 0 36 36" className="circular-chart orange">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      // eslint-disable-next-line react/no-unknown-property
                      stroke-dasharray="30, 100"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="22.35" className="percentage">
                      60
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HoverTextGoogle = () => {
  return (
    <div className="airbnb-info">
      <div className="popup-info">
        <div className="top">
          <div className="coin-info">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/secure-by/xox.svg`} alt="xox" />
            <p>XOX</p>
          </div>
          <div className="status">
            <p>On Board</p>
          </div>
        </div>
        <div className="middle">
          <div>
            <p className="coin-title">Verified</p>
            <p className="coin-description">Contract</p>
          </div>
          <div>
            <p className="coin-title">Certik</p>
            <p className="coin-description">KYC</p>
          </div>
          <div>
            <p className="coin-title">Certik</p>
            <p className="coin-description">Skynet</p>
          </div>
        </div>
        <div className="bottom">
          <div className="report">
            <div className="report-top">
              <p className="report-title">Neon DEX- au...</p>
              <p className="report-last-report">Latest Report</p>
            </div>
            <div className="report-bottom">
              <div className="delivery">
                <p>Delivered Date</p>
                <p>20/9/2022</p>
              </div>
              <div className="finding">
                <p>Total Findings</p>
                <p>3 (2 Resolved)</p>
              </div>
            </div>
          </div>
          <div className="trust-score">
            <p className="trust-score-title">Trust Score</p>
            <div>
              <div className="flex-wrapper">
                <div className="single-chart">
                  <svg viewBox="0 0 36 36" className="circular-chart orange">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      // eslint-disable-next-line react/no-unknown-property
                      stroke-dasharray="30, 100"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="22.35" className="percentage">
                      60
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SecuredBy = () => {
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const [isHoveringAirBnb, setIsHoveringAirBnb] = useState(false)
  const [isHoveringHubspot, setIsHoveringHubspot] = useState(false)
  const [isHoveringGoogle, setIsHoveringGoogle] = useState(false)

  const handleMouseOverAirBnb = () => {
    if (width > 900) setIsHoveringAirBnb(true)
  }

  const handleMouseOutAirBnb = () => {
    setIsHoveringAirBnb(false)
  }

  const handleMouseOverHubspot = () => {
    if (width > 900) setIsHoveringHubspot(true)
  }

  const handleMouseOutHubspot = () => {
    setIsHoveringHubspot(false)
  }

  const handleMouseOverGoogle = () => {
    if (width > 900) setIsHoveringGoogle(true)
  }

  const handleMouseOutGoogle = () => {
    setIsHoveringGoogle(false)
  }

  return (
    <Wrapper>
      <p className="title" data-aos="fade-up">
        {t('Secured By')}
      </p>
      <p className="description" data-aos="fade-up" data-aos-duration="2300">
        {t('XOX has Industry Leading Security. Protected By The Best.')}
      </p>

      <div className="imgs">
        <div className="box certik-box" data-aos="fade-right">
          <a
            href="https://skynet.certik.com/projects/xox-labs?utm_source=SkyEmblem&utm_campaign=xox-labs&utm_medium=link"
            target="_blank"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Certik-short.svg`}
              alt="airbnb"
              className="icon-short"
              data-aos="fade-right"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Certik-full.svg`}
              alt="airbnb"
              className="icon-full"
              onMouseOver={handleMouseOverAirBnb}
              onMouseOut={handleMouseOutAirBnb}
            />
          </a>
        </div>

        {/* <div className="hubspot-box">
          <img
            src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/hubspot.svg`}
            alt="hubspot"
            data-aos="fade-down"
            onMouseOver={handleMouseOverHubspot}
            onMouseOut={handleMouseOutHubspot}
          />
          {isHoveringHubspot && <HoverTextAirBnb />}
        </div> */}
        <TooltipCustom title={t('Coming Soon')}>
          <div className="box zellic-box">
            <a href="https://www.zellic.io/" target="_blank">
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Zellic-short.svg`}
                alt="zellic"
                className="icon-short"
                data-aos="fade-up"
                // onMouseOver={handleMouseOverAirBnb}
                // onMouseOut={handleMouseOutAirBnb}
              />
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Zellic-full.svg`}
                alt="zellic"
                className="icon-full"
                // onMouseOver={handleMouseOverAirBnb}
                // onMouseOut={handleMouseOutAirBnb}
              />
            </a>
            {/* {isHoveringAirBnb && <HoverTextAirBnb />} */}
          </div>
        </TooltipCustom>
        <TooltipCustom title={t('Coming Soon')}>
          <div className="box google-box">
            <a href="https://hacken.io/" target="_blank">
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Hacken-short.svg`}
                alt="google"
                className="icon-short"
                data-aos="fade-left"
                // onMouseOver={handleMouseOverGoogle}
                // onMouseOut={handleMouseOutGoogle}
              />
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Hacken-full.svg`}
                alt="google"
                className="icon-full"
                // onMouseOver={handleMouseOverGoogle}
                // onMouseOut={handleMouseOutGoogle}
              />
            </a>
            {isHoveringGoogle && <HoverTextAirBnb />}
          </div>
        </TooltipCustom>
      </div>
    </Wrapper>
  )
}

export default SecuredBy
