/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Avatar,
} from '@mui/material'
import { CopyButton, useToast } from '@pancakeswap/uikit'
import { ColumnCenter } from 'components/Layout/Column'
import { GridLoader } from 'react-spinners'
import { useTranslation } from '@pancakeswap/localization'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Trans from 'components/Trans'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useEffect, useMemo, useState } from 'react'
import { formatAmountNumber, formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'
import styled, { keyframes } from 'styled-components'
import useWindowSize from 'hooks/useWindowSize'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { USD_DECIMALS } from 'config/constants/exchange'
import { getUserFriend } from 'services/referral'
import { formatUnits } from '@ethersproject/units'
import axios from 'axios'
import HowToJoin from './HowToJoin'

// eslint-disable-next-line import/no-cycle
import LeaderBoardItem from './LearderBoardItem'
import PlatformStat from './PlatformStats'
import TotalEarned from './TotalEarned'
import { filterChain, FilterChain, filterTime, FilterTime, ListRankingByChain, RankingByChain } from '..'

const floatingAnim = (x: string, y: string) => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(${x}, ${y});
  }
  to {
    transform: translate(0, 0px);
  }
`

export interface IItemLeaderBoard {
  name: string
  point: string
  avatar: string
  rank: number
}

interface IItemLevel {
  icon: string
  point: number
  dollar: number
  lever: number
  isReach?: boolean
}

interface IPropsTotal {
  percentPoint?: number
  account?: string
  chainid?: number
  totalPoint?: number
  isMobileOrTablet?: boolean
}

interface IPropsContainer {
  subTabIndex?: number
}

export interface IMappingFormat {
  address: string
  amount: string
  avatar: string
  id: string
  point: number | null
  rank: number | null
  username: string
}

const First = styled.div<IPropsTotal>`
  width: 100%;
  height: 100%;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 24px;
  position: relative;

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 70px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-right: 1px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 1px;
    height: calc(100% - 70px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }
  .tab_filter {
    display: grid;
    grid-template-columns: repeat(4, auto) 1fr;
    gap: 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    align-items: center;
    color: #ffffff;

    .tab_item {
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 4px;
      &:hover {
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      }

      @media screen and (min-width: 1200px) and (max-width: 1401px) {
        padding: 10px 14px !important;
      }
    }

    .tab_item.active {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      &:hover {
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      }
    }
  }

  .learder_board {
    margin-top: 16px;
  }

  .dot {
    display: flex;
    justify-content: center;
    gap: 3px;
    margin-bottom: ${({ account }) => (account ? '18px' : '')};

    .dot_item {
      background: #fb8618;
      border: 2px solid #fb8618;
      border-radius: 50%;
    }
  }

  @media screen and (max-width: 900px) {
    padding: 22px;

    .tab_filter {
      font-size: 12px;
      line-height: 15px;

      .tab_item {
        padding: 10px;
      }
    }
  }
`

const Second = styled.div<IPropsTotal>`
  margin-top: 16px;
  position: relative;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 20px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #7e5c19ad;
    border-left: 2px solid #7e5c19ad;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 20px;
    left: 0;
    z-index: -1;
    background: linear-gradient(0deg, #7e5c19ad 0%, #721430e5 40%, #76143020 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 20px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #7e5c19ad;
    border-right: 2px solid #7e5c19ad;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 20px;
    right: 0;
    z-index: -1;
    background: linear-gradient(0deg, #7e5c19ad 0%, #721430e5 40%, #76143020 100%);
  }
  .total_point {
    padding: 24px;
    position: relative;
    border-radius: 10px;

    .corner1 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50%;
      height: 50px;
      border-radius: 20px;
      z-index: -1;
      border-bottom: 2px solid #ffffff30;
      border-left: 2px solid #ffffff30;
      border-bottom-right-radius: unset;
      border-top-left-radius: unset;
    }

    .edge1 {
      width: 2px;
      height: calc(100% - 70px);
      position: absolute;
      bottom: 20px;
      left: 0;
      z-index: -1;
      background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
    }

    .corner2 {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50%;
      height: 50px;
      border-radius: 20px;
      z-index: -1;
      border-bottom: 2px solid #ffffff30;
      border-right: 1px solid #ffffff30;
      border-bottom-left-radius: unset;
      border-top-right-radius: unset;
    }

    .edge2 {
      width: 1px;
      height: calc(100% - 70px);
      position: absolute;
      bottom: 50px;
      right: 0;
      z-index: -1;
      background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
    }

    .title {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 27px;
      @media screen and (max-width: 900px) {
        font-size: 14px;
        line-height: 17px;
        margin-bottom: 16px;
      }
    }

    .total_point_bar {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 30px;
      padding: 3px;

      .current_point_bar {
        background: ${({ account, chainid, totalPoint }) =>
          account && chainid && totalPoint
            ? 'linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%)'
            : 'transparent'};
        border-radius: 30px;
        height: 18px;
        width: ${({ percentPoint }) => `${percentPoint}%`};

        span {
          font-weight: 700;
          font-size: 10px;
          line-height: 12px;
          text-align: center;
          margin-left: 6px;
          color: ${({ account }) => (account ? '#ffffff' : 'transparent')};
        }
      }
    }

    @media screen and (max-width: 900px) {
      padding: 22px;
      font-size: 14px;
      line-height: 17px;
    }
  }
  .unconnect {
    position: relative;
    .content_connect {
      position: absolute !important;
      top: 80%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

const WrapperRight = styled.div<IPropsContainer>`
  /* height: 100%; */

  .container {
    width: 100%;
    height: 600px;
    padding: 27px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    position: relative;
    background: rgba(16, 16, 16, 0.3);
    backdrop-filter: blur(10px);
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    border-radius: 20px;

    .corner1 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50%;
      height: 50px;
      border-radius: 20px;
      z-index: -1;
      border-bottom: 2px solid #ffffff30;
      border-left: 2px solid #ffffff30;
      border-bottom-right-radius: unset;
      border-top-left-radius: unset;
    }

    .edge1 {
      width: 2px;
      height: calc(100% - 70px);
      position: absolute;
      bottom: 50px;
      left: 0;
      z-index: -1;
      background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
    }

    .corner2 {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50%;
      height: 50px;
      border-radius: 20px;
      z-index: -1;
      border-bottom: 2px solid #ffffff30;
      border-right: 1px solid #ffffff30;
      border-bottom-left-radius: unset;
      border-top-right-radius: unset;
    }

    .edge2 {
      width: 1px;
      height: calc(100% - 70px);
      position: absolute;
      bottom: 50px;
      right: 0;
      z-index: -1;
      background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
    }

    .filter {
      width: fit-content;
      border-radius: 30px;
      display: flex;
      background: rgba(255, 255, 255, 0.03);
      gap: 8px;
      align-items: center;
      color: #ffffff;
      position: relative;
      z-index: 2;
      overflow: hidden;

      .subTab_item.active {
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
        border-radius: 30px;

        &:hover {
          background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
          border-radius: 30px;
        }
      }

      .subTab_item {
        padding: 10px 20px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        cursor: pointer;
        white-space: nowrap;
        border-radius: 4px;
        &:hover {
          background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
          border-radius: 30px;
        }
      }
    }

    @media screen and (max-width: 900px) {
      padding: 22px 22px 40px;
      overflow: hidden;
      height: ${({ subTabIndex }) => (subTabIndex !== 1 ? 'fit-content' : 'fit-content')};
      .filter {
        .subTab_item {
          padding: 8px;
          font-size: 12px;
          line-height: 15px;
        }
      }
    }
    @media screen and (max-width: 398px) {
      .filter {
        gap: 4px;
        .subTab_item {
          padding: 6px 5px;
          font-size: 10px;
        }
      }
    }
  }
`

const WrapperLeftV2 = styled(Box)`
  padding: 24px;
  border-radius: 20px;
  min-height: 240px;
  position: relative;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 80px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 80px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }
  /* &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    background: #242424;
    position: absolute;
    right: 23px;
    bottom: 23px;
  } */
  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;

    @media screen and (max-width: 900px) {
      font-size: 18px;
      line-height: 24px;
    }
  }
  .no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: fit-content;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);
  }
`

const FakeSwiper = styled.div`
  margin-top: 0 !important;
  position: relative;

  .item {
    position: relative;
    background-size: 192px 172px;
    background-repeat: no-repeat;
    background-position: center;
    height: auto;
    width: 100%;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    margin: auto;
    &:hover {
      transform: scale(1.11);
      .jewellery {
        animation: ${floatingAnim('0px', '10px')} 3s ease-in-out infinite !important;
      }
      .main-img .sec-img {
        opacity: 1;
      }
    }
  }
  .main-img {
    width: calc(100% + 20px);
    margin-left: -10px;
    position: relative;
    img {
      width: 100%;
      height: auto;
    }
    .sec-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      opacity: 0;
    }
  }
  .item > div.inner-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: -7px;

    .shadow {
      width: 110px;
      height: 17px;
      background: radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(48, 48, 48, 0) 100%);
    }

    .title {
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: rgba(255, 255, 255, 0.87);
      margin-top: 8px;
      white-space: nowrap;
    }

    .btn {
      background: transparent;
      border: none;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.38);
      margin-top: 12px;
      cursor: pointer;
    }

    button:disabled,
    button[disabled] {
      cursor: not-allowed;
    }

    .jewellery {
      animation: ${floatingAnim('0px', '5px')} 3s ease-in-out infinite;
    }
  }

  .current {
    & > div {
      .btn {
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      button:disabled,
      button[disabled] {
        cursor: not-allowed;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.384) 0%, rgba(255, 255, 255, 0.384) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }

  .swiper-button-next {
    z-index: 999;
    background: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/next.svg) no-repeat center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    border-radius: 50%;
    height: 47px;
    width: 47px;
    right: 0px;
    @media screen and (max-width: 555px) {
      background-size: contain;
    }
  }

  .swiper-button-next::after {
    display: none;
  }

  .swiper-button-prev {
    background: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/prev.svg) no-repeat center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center center;
    height: 47px;
    width: 47px;
    left: 0px;

    @media screen and (max-width: 555px) {
      background-size: contain;
    }
  }

  .swiper-button-prev::after {
    display: none;
  }

  .swiper.swiper-initialized {
    padding-top: 16px;
  }

  .claim_total {
    display: flex;
    justify-content: center;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      border-radius: 4px;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      padding: 8px 20px;
      &:hover {
        background: #5f35eb;
      }
    }

    button:disabled,
    button[disabled] {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.38);
      cursor: not-allowed;
    }

    .unclaim_reward_container {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      padding: 2px;
      border-radius: 4px;
      margin-right: 16px;

      .unclaim_reward {
        width: 100%;
        height: 100%;
        background: black;
        border-radius: 4px;
        div {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          padding: 8px 20px;
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          /* text-fill-color: transparent; */
        }
      }
    }

    @media screen and (max-width: 900px) {
      flex-direction: column;
      .unclaim_reward_container {
        width: 100%;
        margin-bottom: 16px;
        .unclaim_reward {
          div {
            text-align: center;
          }
        }
      }
    }
  }

  .claim {
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`

const ConnectBoxContainer = styled.div`
  margin-top: 20px;
  height: 100%;
  background: rgba(16, 16, 16, 0.3);
  position: relative;
  backdrop-filter: blur(10px);

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 70px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-right: 1px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 1px;
    height: calc(100% - 70px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  border-radius: 20px;
  .total_point_content {
    display: grid;
    place-content: center;
  }
`

const NoDataWraper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
`
const ConnectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const ConnectWalletButtonWraper = styled(ConnectWalletButton)`
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  max-width: 146px;
  margin-top: 16px;
  height: 37px;
`
const BoxWrapper = styled(Box)`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  align-items: center;

  button {
    max-width: 146px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 6px;
  }
`
const SubTitle = styled.div`
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
  max-width: 242px;
  margin: 0 auto;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 32px;
`

interface IPropsWrapperLeft {
  account?: boolean
}

const WrapperLeft = styled.div<IPropsWrapperLeft>`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const FilterChainWrap = styled.div`
  display: flex;
  justify-content: center;

  .tab_filter_chain_container {
    display: flex;
    padding: 3px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 30px;
    margin-bottom: 35px;
    .filter_chain {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      padding: 12px 30px;
    }

    .filter_chain.active,
    .filter_chain:hover {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      border-radius: 30px;
    }

    @media screen and (max-width: 900px) {
      margin-bottom: 24px;
      .filter_chain {
        padding: 12px 19.5px;
      }

      .filter_chain_active {
        padding: 12px 19.5px;
      }
    }
  }
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 14px 0 34px 0;
`

const StyledTable = styled.div`
  overflow-x: scroll;
  ::-webkit-scrollbar-corner {
    display: none;
  }
  .table {
    min-width: 400px;
    width: 100%;
    .table-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0 8px;
      margin-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-right: 8px;

      p:first-child {
        width: 40%;
      }
      p:last-child {
        text-align: end;
      }
      p {
        width: 25%;
        font-size: 14px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.6);
        font-family: 'Inter';
      }
    }
    .table-row {
      width: 100%;
      max-height: 128px;
      overflow: scroll;
      padding-right: 8px;
      ::-webkit-scrollbar-corner {
        display: none;
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 8px 0;
        .row-item:first-child {
          width: 40%;
        }
        .row-item {
          width: 25%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .name,
          .code,
          .point {
            color: rgba(255, 255, 255, 0.87);
            font-size: 14px;
            font-weight: 400;
            font-family: 'Inter';
          }
          .point {
            text-align: end;
            width: 100%;
          }
        }
      }
    }
  }
`

interface IProps {
  userCurrentPoint: number
  currentLevelReach: number
  listLever: IItemLevel[]
  volumnTotalEarn: string
  handleOnChangeRankTab: (tab: FilterTime) => void
  handleOnChangeChainTab: (tab: FilterChain) => void
  tabLeaderBoard: FilterTime
  tabChainLeaderBoard: FilterChain
  listUserRanks: ListRankingByChain
  rankOfUser: RankingByChain
  volumnData: any
  dataChart: any
  minAmount: any
  middleAmount: any
  maxAmount: any
  listPoint: any
  listLevelMustReach: any
  subTab: any
  subTabIndex: any
  setSubTabIndex: any
}

const MainInfo = ({
  userCurrentPoint,
  currentLevelReach,
  listLever,
  volumnTotalEarn,
  handleOnChangeRankTab,
  handleOnChangeChainTab,
  tabLeaderBoard,
  tabChainLeaderBoard,
  listUserRanks,
  rankOfUser,
  volumnData,
  dataChart,
  minAmount,
  middleAmount,
  maxAmount,
  listPoint,
  listLevelMustReach,
  subTab,
  subTabIndex,
  setSubTabIndex,
}: IProps) => {
  const [loadNetWork, setLoadNetWork] = useState(false)
  const { account, chainId, isWrongNetwork } = useActiveWeb3React()
  const totalPoint = listLever[currentLevelReach]?.point
  const currentPoint = userCurrentPoint
  const percentPoint = (currentPoint / totalPoint) * 100
  const { width } = useWindowSize()
  const [listFriends, setListFriends] = useState([])
  const { t } = useTranslation()

  const controlWidth = useMemo(() => {
    let slidesPerView = 5
    if (width < 1600) {
      slidesPerView = 5
    }
    if (width < 1400) {
      slidesPerView = 4
    }
    if (width < 1200) {
      slidesPerView = 4
    }
    if (width < 900) {
      slidesPerView = 3
    }
    if (width < 698) {
      slidesPerView = 3
    }
    if (width < 534) {
      slidesPerView = 2
    }
    if (width < 376) {
      slidesPerView = 2
    }
    if (width < 368) {
      slidesPerView = 1
    }
    return slidesPerView
  }, [width])

  const dataFriend = async (accountId: string) => {
    try {
      setListFriends([])
      const { userInfos } = await getUserFriend(chainId, accountId)
      const sortByPoints = userInfos[0]?.friends?.sort(function (a: any, b: any) {
        return Number(b.amount) - Number(a.amount)
      })
      if (Array.from(userInfos).length !== 0) {
        const dataUserFormatAmount = sortByPoints.map((item: any) => {
          return {
            ...item,
            id: item?.ref_address,
            point: Number(formatUnits(item.amount, USD_DECIMALS[chainId])),
          }
        })

        const dataMapping = await Promise.all(
          dataUserFormatAmount?.map(async (item: any): Promise<any> => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/users/address/mapping`, {
              wallets: [`${item.ref_address}`],
            })
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/users/${item.ref_address}`)
            const dataMap = response?.data[0]
            return {
              ...item,
              ...dataMap,
              name: dataMap?.username ?? null,
              avatar: dataMap?.avatar ?? null,
              refCode: data?.referralCode,
            }
          }),
        )
        setListFriends(dataMapping)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error >>>>`, error)
    }
  }

  const renderListUserRank = useMemo(() => {
    // return <NoDataWraper>{t('Coming Soon')}</NoDataWraper>

    if (!listUserRanks) {
      return (
        <NoDataWraper>
          <ConfirmedIcon>
            <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
          </ConfirmedIcon>
        </NoDataWraper>
      )
    }

    if (listUserRanks[tabChainLeaderBoard]?.length === 0) {
      return <NoDataWraper>{t('No Data')}</NoDataWraper>
    }

    return (
      <>
        {listUserRanks[tabChainLeaderBoard]?.slice(0, 5)?.map((item: IMappingFormat, index: number) => {
          // eslint-disable-next-line react/no-array-index-key
          return <LeaderBoardItem item={item} key={`learder_item_${index}`} />
        })}
      </>
    )
  }, [listUserRanks, tabChainLeaderBoard, t])

  useEffect(() => {
    if (account && chainId) {
      dataFriend(account)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account])

  return (
    <Box sx={{ marginTop: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <WrapperLeft>
            {/* <div className="border-gradient-style"> */}
            <First account={account}>
              <div className="corner1" />
              <div className="edge1" />
              <div className="corner2" />
              <div className="edge2" />
              <FilterChainWrap>
                <div className="tab_filter_chain_container">
                  {filterChain.map((item: FilterChain) => {
                    return (
                      <div
                        key={item}
                        className={tabChainLeaderBoard === item ? 'filter_chain active' : 'filter_chain'}
                        onClick={() => handleOnChangeChainTab(item)}
                      >
                        {t(item)}
                      </div>
                    )
                  })}
                </div>
              </FilterChainWrap>
              <div className="tab_filter">
                {filterTime.map((item: FilterTime) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      key={item}
                      onClick={() => handleOnChangeRankTab(item)}
                      className={tabLeaderBoard === item ? 'tab_item active' : 'tab_item'}
                    >
                      {t(item)}
                    </div>
                  )
                })}
              </div>

              <div className="learder_board">
                {renderListUserRank}
                {/* {listUserRanks &&
                    listUserRanks[tabChainLeaderBoard].length > 0 &&
                    listUserRanks[tabChainLeaderBoard]?.slice(0, 5)?.map((item: IMappingFormat, index: number) => {
                      // eslint-disable-next-line react/no-array-index-key
                      return <LeaderBoardItem item={item} key={`learder_item_${index}`} />
                    })}
                  {listUserRanks[tabChainLeaderBoard].length === 0 && <NoDataWraper>No data</NoDataWraper>} */}
              </div>

              {!rankOfUser || !rankOfUser[tabChainLeaderBoard]?.rank ? null : rankOfUser[tabChainLeaderBoard].rank <=
                6 ? null : (
                <div className="dot">
                  <div className="dot_item" />
                  <div className="dot_item" />
                  <div className="dot_item" />
                </div>
              )}

              {account && rankOfUser ? (
                rankOfUser[tabChainLeaderBoard]?.rank ? (
                  [1, 2, 3, 4, 5].includes(rankOfUser[tabChainLeaderBoard].rank) ? null : (
                    <LeaderBoardItem item={rankOfUser[tabChainLeaderBoard]} mb={false} />
                  )
                ) : null
              ) : null}
            </First>
            {/* </div> */}

            {account && (
              <Second
                percentPoint={percentPoint}
                account={account}
                chainid={chainId}
                totalPoint={totalPoint}
                // className="border-gradient-style"
              >
                <div className="corner1" />
                <div className="edge1" />
                <div className="corner2" />
                <div className="edge2" />
                <div className="total_point">
                  <p className="title">{t('Your Current Total Points')}</p>
                  <div className="total_point_bar">
                    <div className="current_point_bar">
                      {totalPoint ? (
                        <span>
                          {formatAmountNumber2(userCurrentPoint, 2)}/
                          {currentLevelReach === 9
                            ? formatAmountNumber2(listLever[currentLevelReach - 1]?.point)
                            : formatAmountNumber2(listLever[currentLevelReach]?.point)}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                </div>
              </Second>
            )}
            {!account && width > 1200 && (
              <ConnectBoxContainer>
                <div className="corner1" />
                <div className="edge1" />
                <div className="corner2" />
                <div className="edge2" />
                <div className="total_point_content " style={{ height: '100%', padding: '58px 0' }}>
                  <SubTitle className="please-connec">
                    {t('Please connect wallet to view your referral information')}
                  </SubTitle>
                  <ConnectBox>
                    <ConnectWalletButtonWraper scale="sm">
                      <BoxWrapper display={['flex', , , 'flex']}>
                        <Trans>{t('Connect Wallet')}</Trans>
                      </BoxWrapper>
                    </ConnectWalletButtonWraper>
                  </ConnectBox>
                </div>
              </ConnectBoxContainer>
            )}

            {!account && width <= 1200 && (
              <Second
                percentPoint={percentPoint}
                account={account}
                chainid={chainId}
                totalPoint={totalPoint}
                // className={`border-gradient-style ${width > 1200 && `border-gradient-style_expand`}`}
              >
                <div className="total_point" style={{ height: '203px', padding: '58px 0' }}>
                  <div className="corner1" />
                  <div className="edge1" />
                  <div className="corner2" />
                  <div className="edge2" />
                  <SubTitle className="please-connec">
                    {t('Please connect wallet to view your referral information')}
                  </SubTitle>
                  <ConnectBox>
                    <ConnectWalletButtonWraper scale="sm">
                      <BoxWrapper display={['flex', , , 'flex']}>
                        <Trans>{t('Connect Wallet')}</Trans>
                      </BoxWrapper>
                    </ConnectWalletButtonWraper>
                  </ConnectBox>
                </div>
              </Second>
            )}

            {width < 1200 && (
              <Grid item xs={12} lg={4} sx={{ zIndex: 7, marginTop: '16px' }}>
                {account && (
                  <WrapperLeftV2>
                    <div className="corner1" />
                    <div className="edge1" />
                    <div className="corner2" />
                    <div className="edge2" />
                    <p className="title">{t('Referral friends')}</p>
                    {listFriends.length !== 0 ? (
                      <StyledTable>
                        <div className="table">
                          <div className="table-head">
                            <p>{t('Username')}</p>
                            <p>{t('Referral Code')}</p>
                            <p>{t('Total Points')}</p>
                          </div>
                          <div className="table-row">
                            {[...listFriends].map((row) => (
                              <div className="row" key={row.name}>
                                <div className="row-item">
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={row.avatar}
                                    sx={{ marginRight: '8px', height: '24px', width: '24px' }}
                                  />
                                  <Tooltip title={row?.name}>
                                    <p className="name">
                                      {row.name?.length > 9
                                        ? `${row.name.substring(0, 7)}...${row.name.substring(row.name.length - 2)}`
                                        : row.name}
                                    </p>
                                  </Tooltip>
                                </div>
                                <div className="row-item">
                                  <p className="code">
                                    {row?.refCode?.length > 9
                                      ? `${row.refCode.substring(0, 7)}...${row.refCode.substring(
                                          row.refCode.length - 2,
                                        )}`
                                      : row.refCode}
                                  </p>
                                  <CopyButton
                                    width="24px"
                                    text={row?.refCode}
                                    tooltipMessage={t('Copied')}
                                    button={
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/copy_referral.svg`}
                                        alt="copy_purple"
                                        style={{ marginBottom: '-2px', marginLeft: '8px' }}
                                      />
                                    }
                                  />
                                </div>
                                <div className="row-item">
                                  <p className="point">{formatAmountNumber2(Number(row.point), 2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </StyledTable>
                    ) : (
                      <div className="no-data">{t('No Data')}</div>
                    )}
                  </WrapperLeftV2>
                )}
              </Grid>
            )}
          </WrapperLeft>
        </Grid>
        <Grid item xs={12} lg={8}>
          <WrapperRight subTabIndex={subTabIndex}>
            <div className="container">
              <div className="corner1" />
              <div className="edge1" />
              <div className="corner2" />
              <div className="edge2" />
              <div className="filter">
                {subTab.map((item, index) => {
                  return (
                    <div
                      key={item}
                      onClick={() => setSubTabIndex(index)}
                      className={subTabIndex === index ? 'subTab_item active' : 'subTab_item'}
                    >
                      {t(item)}
                    </div>
                  )
                })}
              </div>

              {subTabIndex === 0 && <TotalEarned volumnTotalEarn={volumnTotalEarn} />}
              {subTabIndex === 1 && (
                <PlatformStat
                  volumnData={volumnData}
                  dataChart={dataChart}
                  minAmount={minAmount}
                  middleAmount={middleAmount}
                  maxAmount={maxAmount}
                  listPoint={listPoint}
                />
              )}
              {subTabIndex === 2 && <HowToJoin />}
            </div>
          </WrapperRight>

          {!account && width > 1200 && (
            <FakeSwiper>
              <Swiper
                slidesPerView={controlWidth}
                modules={[Navigation, Pagination, A11y]}
                navigation
                scrollbar={{ draggable: true }}
              >
                {listLevelMustReach.map((item: IItemLevel) => {
                  return (
                    <SwiperSlide key={item.icon}>
                      <div
                        className={`item ${item.isReach && item.lever === currentLevelReach ? 'current' : ''}`}
                        key={item.icon}
                      >
                        <div className="main-img">
                          <img
                            className="first-img"
                            src={
                              item.lever === currentLevelReach
                                ? `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/current_item.svg`
                                : `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/item.svg`
                            }
                            alt="imgcur"
                          />
                          <img
                            className="sec-img"
                            src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/current_item.svg`}
                            alt="ima"
                          />
                        </div>
                        <div className="inner-text">
                          <img src={item.icon} alt="icons" className="jewellery" />

                          <div className="shadow" />

                          <p className="title">
                            {t('%num% points', { num: item.point.toLocaleString() })}
                            <br />
                            ~${item.dollar.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </FakeSwiper>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainInfo
