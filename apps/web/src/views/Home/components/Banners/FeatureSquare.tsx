import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { spawn } from 'child_process'
import React, { useState } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional
import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from '@pancakeswap/localization'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
import { useTooltip } from '@pancakeswap/uikit'

// eslint-disable-next-line import/no-cycle

interface Iprops {
  item: ISquareItem
}

export interface ISquareItem {
  icon: string
  title: string
  description: string
  link: string
}

const WrapperI = styled.div`
  height: 100%;
  padding: 24px 22px 32px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }

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

      a {
        border-radius: 8px;
      }

      .boxed-child {
        width: 100%;
        height: 100%;
        background: rgba(16, 16, 16, 1);
        padding: 10px 20px;
        border-radius: inherit;
        cursor: pointer;

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

      @media screen and (max-width: 576px) {
        margin-top: 16px;
      }
    }

    .expand {
      color: #fb8618;
      font-size: 14px;
      font-weight: 600;
    }
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.87);
  line-height: 32px;

  @media screen and (max-width: 900px) {
    font-size: 18px;
    line-height: 22px;
    margin-top: 24px;
  }
`

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 16px 0 0;
  line-height: 24px;
`

const Icon = styled.div`
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 32px;
`

const SquareItem = ({ item }: Iprops) => {
  const { t } = useTranslation()
  const [isShowReadMore, setIsShow] = useState(item.description.length > 330)

  return (
    <WrapperI className="item">
      <div className="main_container">
        <div>
          <Icon>
            <img src={item.icon} alt="icon" />
          </Icon>
          <Title>{t(item.title)}</Title>
          <Description>
            {/* {item.description} */}
            {isShowReadMore ? `${t(item.description).slice(0, 330)}...` : t(item.description)}{' '}
            {t(item.description).length > 330 ? (
              <span onClick={() => setIsShow(!isShowReadMore)} style={{ cursor: 'pointer' }}>
                {isShowReadMore ? (
                  <span className="expand">{t('Read more')}</span>
                ) : (
                  <span className="expand">{t('Read less')}</span>
                )}
              </span>
            ) : null}
          </Description>
        </div>
        <div className="get_xox">
          <a href={item.link} target="_blank" rel="noreferrer">
            <div className="boxed-child">
              <span>{t('Discover More')}</span>
            </div>
          </a>
        </div>
      </div>
    </WrapperI>
  )
}

const Wrapper = styled.div`
  margin-bottom: 100px;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 48px;

    .heart {
      font-weight: 700;
      font-size: 36px;
      line-height: 48px;
      color: rgba(255, 255, 255, 0.87);
    }

    .describe {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #fb8618;
      width: 409px;
    }
  }

  @media screen and (max-width: 900px) {
    margin-bottom: 70px;
    // margin-top: 32px;
    .title {
      flex-direction: column;
      .heart {
        font-size: 20px;
        line-height: 32px;
        text-align: center;
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 32px;
      }
      .describe {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        width: unset;
        text-align: center;
      }
    }
  }
`

const FeatureSquare = () => {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()

  const listSquare = [
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/exchange.svg`,
      title: 'Revolutionary Multi-chain DEX with Dual Cash Back Rewards',
      description:
        'Our Multi-chain DEX platform offers a unique opportunity for users to earn dual cash back rewards for every transaction performed. Through our multi-token ecosystem and revolutionary referral program, users receive XOXS Stable Coins and USDT or USDC not only from their own transactions but also from every user transaction using their Referral Code. This provides an unprecedented level of rewards and incentives for our users, setting our platform apart from traditional DEXs.',
      link: `/swap?chainId=${chainId}&outputCurrency=${XOX_ADDRESS[chainId]}&inputCurrency=${USD_ADDRESS[chainId]}`,
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/wallet.svg`,
      title: 'Liquidity Provision and Reward System',
      description:
        'Our Liquidity Pool rewards system provides a win-win situation for users by allowing them to add liquidity and earn rewards. By contributing liquidity to a Liquidity Pool, users receive Liquidity Provider (LP) tokens and a share in the fees generated by traders. This incentivizes users to hold their assets in our platform while also supporting the project. Users can easily remove their liquidity at any time.',
      link: '/liquidity',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/refferal.svg`,
      title: 'Gamified Referral Program with Dual USDT/USDC Rewards',
      description:
        'Our XOX Gamified Referral Program is the first of its kind and designed to give users cash-back rewards in USDT/USDC for every transaction performed using their referral code. The program is designed to be fun and interactive with a level system based on points. Users can earn points, level up, reach milestones, and claim their rewards in USDT or USDC. This innovative referral program sets our platform apart from traditional DEXs and provides an exciting way for users to earn additional rewards.',
      link: '/referral',
    },
  ]

  return (
    <Wrapper>
      <div className="title" style={{ overflow: 'hidden' }}>
        <p className="heart" data-aos="fade-right">
          {t('The Heart of the XOX Ecosystem')}
          <span style={{ color: '#FB8618' }}>.</span>
        </p>
        <p className="describe" data-aos="fade-left">
          {t(
            'Wide range of apps, utilities and solutions powering the protocol creating a True One-Stop Ecosystem for all your DeFi needs.',
          )}
        </p>
      </div>

      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Grid container spacing={2}>
          {listSquare.map((item: ISquareItem) => {
            return (
              <Grid item xs={12} md={4} key={item.title} data-aos="fade-up">
                <SquareItem item={item} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default FeatureSquare
