/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { TranslateFunction, useTranslation } from '@pancakeswap/localization'
import { Box, useMatchBreakpoints, useToast } from '@pancakeswap/uikit'
import useWindowSize from 'hooks/useWindowSize'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { CardSocial, StyledS, StyledSubtitle } from 'views/Company'
import { StyledTitle } from 'views/Tokenomics/styled'
import BackedBy from 'views/Vesting/Components/BackedBy'
import axios from 'axios'
import anime from 'animejs'
import DexesComponent from './DexesComponent'
import Aggregators from './Aggregators'
import BlockChains from './BlockChains'
import Bridges from './Bridges'
import { useInView } from 'react-intersection-observer'

interface ISocial {
  icon: string
  name: string
  link: string
  heft: string
}

interface ISafeReliable {
  icon: string
  name: string
  describe: string
}

interface IValue {
  title: string
  value: string
}

const BG = styled.div`
  background: #0a0a0a;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
`

const StyledContainer = styled(StyledS)`
  margin: 0px auto 100px auto;
  .hight-light {
    color: rgba(255, 255, 255, 0.87) !important;
  }

  .describe {
    color: rgba(255, 255, 255, 0.6) !important;
  }

  .btn_learn_more_ecosystem {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .btn_learn_more_wycd {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 17px;

    ${({ theme }) => theme.mediaQueries.xl} {
      margin-top: 30px;
    }
  }

  button {
    background: unset;
    border: unset;
    cursor: pointer;
  }

  .subscription-form-container {
    display: flex;
    justify-content: center;

    .subscription-box {
      width: 100%;
      max-width: 680px;

      .subscription-form {
        background: #1d1c1c;
        display: flex;
        align-items: center;
        border-radius: 12px;
        padding: 6px;
        justify-content: center;
        border: unset;
        margin-bottom: 8px;
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
          -webkit-transition-delay: 9999s;
        }
        border: 2px solid transparent;

        input {
          background: transparent;
          flex: 1;
          border: 0;
          outline: none;
          padding: 12px 16px 12px 8px;
          font-size: 18px;
          line-height: 22px;
          color: rgba(255, 255, 255, 0.38);
          width: 100%;

          &:hover {
            .subscription-form {
              border: 1px solid #fb8618;
            }
          }
        }

        button {
          border: 0;
          width: auto;
          height: 100%;
          cursor: pointer;
          background: #1d1c1c;
          padding: 0;
        }

        .email-icon {
          width: 25px;
          margin-left: 16px;
        }

        &:hover {
          border: 2px solid #fb8618;
        }
      }

      .subscription-form.hover-form {
        border: 2px solid #fb8618;
      }

      .error {
        border: 2px solid #ff5353;

        .text-error {
          p {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: #f44336;
          }
        }
      }

      .hidden-text {
        display: none;
      }

      .text-error {
        display: block;

        p {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: #f44336;
        }
      }

      .hover-button:enabled {
        svg {
          path {
            stroke: #fb8618;
          }
        }
      }
    }
  }

  .subtitle {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 48px;

    @media screen and (max-width: 576px) {
      font-size: 14px;
    }
  }

  .privacy-link {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.87);
    text-decoration: underline;
    &:hover {
      -webkit-transition: 0.5s ease;
      transition: 0.5s ease;
      left: 6px;
      bottom: 5px;
    }
  }
`
const StyledHeader = styled.div`
  > div:nth-child(1) {
    display: block;
    position: relative;
    width: 1200px;
    max-width: 100%;
    margin: 0px auto 60px auto;
    height: 160px;
    > h1 {
      width: 100%;
      font-weight: 700;
      font-size: 24px;
      text-align: start;
      color: rgba(255, 255, 255, 0.6);
      line-height: 40px;
      display: inline-block;
      position: absolute;
      top: 0px;
      animation-timing-function: ease;

      div {
        display: inline-block;
      }
    }
  }
  > div:nth-child(2) {
    > img {
      display: block;
      margin: auto;
    }
    > svg,
    object {
      display: block;
      margin: auto;
      width: 100%;
      max-width: 1066px;
      height: auto;
    }
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    > div:nth-child(1) {
      > h1 {
        font-size: 64px;
        line-height: 88px;
        text-align: center;
        margin-bottom: 40px;
      }
    }
  }
`

const StyledSocial = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`

const StyledSaleAndReliable = styled(Box)`
  width: 1200px;
  max-width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`

const StyledCardSafeReliable = styled.div`
  padding: 17px 24px;
  position: relative;
  border-radius: 20px;
  > h3 {
    font-weight: 700;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.87);
    margin-top: 24px;
    margin-bottom: 16px;
    text-align: center;
  }

  > img {
    max-width: 100%;
    height: 150px;
    margin: auto;
    display: block;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-width: 1px;
    border-radius: inherit;
    border-color: white;
    border-style: solid;
    mask: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
  }

  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 24px;

    > h3 {
      font-size: 20px;
    }
    > p {
      line-height: 24px;
    }
  }
`

const ReStyledSubtitle = styled(StyledSubtitle)`
  color: rgba(255, 255, 255, 0.62);
`

const StyledRevenue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column-reverse;
  margin-bottom: 60px;
  > div:nth-child(1) {
    display: flex;
    position: relative;
    width: 100%;

    > video {
      width: 500px;
      max-width: 100%;
      transform: translateY(-30px);
    }

    ${({ theme }) => theme.mediaQueries.xl} {
      min-width: 500px !important;

      > video {
        transform: translateY(-67px);
      }
    }
  }

  > div:nth-child(2) {
    > h3 {
      font-weight: 700;
      font-size: 20px;
      line-height: 32px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 8px;
    }
    > p {
      font-weight: 400;
      font-size: 14px;
      line-height: 32px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 8px;
    }

    > ul {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    > ul li {
      font-weight: 400;
      font-size: 14px;
      line-height: 32px;
      color: rgba(255, 255, 255, 0.6);
    }

    > div {
      margin-top: 10px;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;

    > div:nth-child(2) {
      > h3 {
        font-size: 36px;
        line-height: 48px;
        margin-bottom: 24px;
      }
      > p {
        font-size: 18px;
        margin-bottom: 24px;
      }

      > ul li {
        font-size: 18px;
      }

      > div {
        margin-top: 24px;
      }
    }
  }
`

const StyledLearMore = styled.div`
  width: 100%;

  > div {
    display: flex;
    align-items: center;
    cursor: pointer;
    > span {
      font-weight: 500;
      font-size: 14px;
      text-decoration-line: underline;
      color: rgba(255, 255, 255, 0.6);
      margin-right: 7px;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    > div {
      > span {
        font-size: 18px;
      }
    }
  }
`

const StyledBLock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px 0px;

  > div:nth-child(1) {
    > h3 {
      font-weight: 700;
      font-size: 20px;
      line-height: 32px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 8px;
    }
    > p {
      font-weight: 400;
      font-size: 14px;
      line-height: 32px;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  > div:nth-child(2) {
    display: flex;
    position: relative;
    width: 100%;
    padding-top: 30px;

    > video {
      margin: 0 auto;
      width: 100%;
      max-width: 100%;
    }

    ${({ theme }) => theme.mediaQueries.xl} {
      min-width: 500px !important;
    }
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
    justify-content: space-between;
    margin: 80px 0px;

    > div:nth-child(1) {
      > h3 {
        font-size: 36px;
        line-height: 48px;
        margin-bottom: 24px;
      }
      > p {
        font-size: 18px;
      }
    }
  }
`

const StyledReferralProgram = styled(StyledBLock)`
  > div:nth-child(1) {
    > h3 {
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 8px !important;
    }
    > p:nth-child(3) {
      margin-top: 25px !important;
    }

    > div {
      margin-top: 10px;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    > div:nth-child(1) {
      > h3 {
        color: rgba(255, 255, 255, 0.6);
      }
      > p:nth-child(3) {
        margin-top: 40px !important;
      }

      > div {
        margin-top: 24px;
      }
    }
  }
`

const StyledWhatYouCanDo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: space-between;

  > div:nth-child(1) {
    width: 100%;
    > img {
      display: block;
      margin: auto;
      max-width: 100%;
    }
  }

  > div:nth-child(2) {
    width: 100% !important;
    > h3 {
      font-weight: 700;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 15px;
      font-size: 20px;
      line-height: 32px;
    }
    .tab_what_you_can_do_container {
      overflow: scroll;
      display: flex;
      background: #101010;
      border-radius: 30px;
      margin-bottom: 15px;
      gap: 16px;

      .tab_wycd_contain.wycd_active {
        position: relative;
        &::before {
          content: '';
          position: absolute;
          background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/prev-tab.png);
          top: 10px;
          left: -16px;
          color: rgba(255, 255, 255, 0.38);
          width: 8px;
          height: 10px;
        }
        &::after {
          content: '';
          position: absolute;
          background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/next-tab.png);
          top: 10px;
          right: -16px;
          color: rgba(255, 255, 255, 0.38);
          width: 8px;
          height: 10px;
        }
      }

      .tab_wycd_contain_0.wycd_active {
        &::before {
          height: 0px;
        }
      }
      .tab_wycd_contain_4.wycd_active {
        &::after {
          height: 0px;
        }
      }

      .tab_what_you_can_do {
        padding: 9px 25px;
        font-weight: 500;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        white-space: nowrap;
      }

      .tab_what_you_can_do.active {
        padding: 9px 25px;
        position: relative;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 30px;
        color: #ffffff;
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
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
    align-items: flex-start;

    > div:nth-child(1) {
      width: 500px;
    }
    > div:nth-child(2) {
      width: 700px !important;
      > h3 {
        font-size: 36px;
        line-height: 48px;
        margin-bottom: 24px;
      }
      .tab_what_you_can_do_container {
        overflow: unset;
        width: fit-content;
        border-radius: 30px;
        margin-bottom: 24px;
        gap: 16px;

        .tab_wycd_contain.wycd_active {
          position: relative;
          &::before {
            height: 0px;
          }
          &::after {
            height: 0px;
          }
        }
        .tab_what_you_can_do {
          padding: 16px 24px;
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
        }
        .tab_what_you_can_do.active {
          padding: 16px 24px;
        }
      }
    }
  }
`

const StyledEcosystem = styled.div`
  > p {
    text-align: center;
  }

  > p:nth-child(1) {
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 60px;
    margin-bottom: 16px;
  }

  p:nth-child(2) {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    > p:nth-child(1) {
      font-size: 36px;
      line-height: 48px;
      margin-top: 80px;
      margin-bottom: 24px;
    }

    p:nth-child(2) {
      font-size: 18px;
      line-height: 32px;
    }
  }
`

const StyledTabEcosystem = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 60px;
  max-width: 100%;
  overflow-x: auto;
  > div {
    display: flex;
    align-items: center;
    background: #101010;
    border-radius: 30px;

    .tab_ecosystem_contain {
      font-weight: 500;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.87);
      cursor: pointer;
    }
    .tab_ecosystem_contain.contain_active {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/prev-tab.png);
        top: 10px;
        left: -16px;
        color: rgba(255, 255, 255, 0.38);
        width: 8px;
        height: 10px;
      }
      &::after {
        content: '';
        position: absolute;
        background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/next-tab.png);
        top: 10px;
        right: -16px;
        color: rgba(255, 255, 255, 0.38);
        width: 8px;
        height: 10px;
      }
    }

    .tab_ecosystem_contain_0.contain_active {
      &::before {
        height: 0px;
      }
    }
    .tab_ecosystem_contain_3.contain_active {
      &::after {
        height: 0px;
      }
    }

    .tab_ecosystem {
      padding: 9px 25px;
    }

    .tab_ecosystem.active {
      padding: 9px 25px;
      position: relative;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 30px;
      color: #ffffff;
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
    }

    > div:nth-child(2) {
      margin: 0px 12px;
    }
    > div:nth-child(3) {
      margin-right: 12px;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    justify-content: center;
    margin-top: 40px;

    > div {
      .tab_ecosystem {
        padding: 15px 23px;
        font-size: 18px;
      }
      .tab_ecosystem_contain.contain_active {
        position: relative;
        &::before {
          height: 0px;
        }
        &::after {
          height: 0px;
        }
      }
      .tab_ecosystem.active {
        padding: 15px 23px;
      }
    }
  }
`

const StyledBtnStartTrading = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;

  > div {
    display: flex;
    align-items: center;

    button {
      padding: 12px 30px;
    }
    > div {
      > button {
        display: flex;
        align-items: center;
        margin-right: 16px;
        background: #ffffff;
        border-radius: 10px;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        border: 1px solid #fff;
        > span {
          margin-right: 10px;
        }

        &:hover {
          background: #000;
          color: #fff;
        }

        &:hover svg path {
          fill: #ffffff;
        }
      }
    }
    > button {
      border: 1px solid #ffffff;
      border-radius: 10px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.6);

      &:hover {
        background: #ffff;
        color: #000;
      }
    }
  }
`

const StyedValueMobile = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  row-gap: 24px;
  > div {
    position: relative;
    border-radius: 20px;
    background: rgba(16, 16, 16, 0.3);
    backdrop-filter: blur(10px);
    padding: 32px 0px;
    > p {
      text-align: center;
    }
    > p:nth-child(1) {
      position: relative;
      font-weight: 700;
      font-size: 40px;
      line-height: 48px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 12px;
      &::after {
        content: '+';
        position: absolute;
        font-weight: 700;
        font-size: 25px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.6);
        top: 50%;
        transform: translateY(-50%);
      }
    }
    > p:nth-child(2) {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.6);
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-width: 1px;
      border-radius: inherit;
      border-color: white;
      border-style: solid;
      mask: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
    }
  }
`

const StyledValue = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  > div {
    width: 1000px;
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: 31px 47px;
    border-radius: 10px;
    box-shadow: inset 0px 0px 6px rgba(255, 255, 255, 0.3);

    > div {
      > p:nth-child(1) {
        position: relative;
        font-weight: 700;
        font-size: 48px;
        line-height: 58px;
        color: rgba(255, 255, 255, 0.87);
        text-align: center;
        &::after {
          content: '+';
          position: absolute;
          font-weight: 700;
          font-size: 25px;
          line-height: 30px;
          color: rgba(255, 255, 255, 0.6);
          top: 50%;
          transform: translateY(-50%);
        }
      }

      > p:nth-child(2) {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.6);
        text-align: center;
      }
    }

    > div:nth-child(2) {
      border-left: 2px solid rgba(255, 255, 255, 0.38);
      border-right: 2px solid rgba(255, 255, 255, 0.38);
    }
    > div:nth-child(3) {
      border-right: 2px solid rgba(255, 255, 255, 0.38);
    }
  }
`

const StyledSwap = styled.div`
  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 32px;
    color: rgba(255, 255, 255, 0.6);
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    > p {
      font-size: 18px;
      line-height: 32px;
    }
  }
`

const ReStyledTitle = styled(StyledTitle)`
  font-size: 20px;
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 36px;
  }
`

const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  & .tooltiptext {
    visibility: hidden;
    width: 100%;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 5px;
    border-radius: 6px;

    position: absolute;
    z-index: 1;
    bottom: 130%;
    left: 25%;
    margin-left: -60px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;
  }
  & .tooltiptext::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`

export const AUTOHEIGHT = ['aggregators', 'bridges']

interface IPropsStyledAggregator {
  name?: string
}

export const StyleFixHeight = styled.div`
  height: 325px;
  ${({ theme }) => theme.mediaQueries.xl} {
    height: 520px;
  }
`

export const StyledDexes = styled.div`
  width: 1100px;
  max-width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: grid;
  margin: auto;
  margin-top: 32px;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-row-gap: 15px;
  grid-column-gap: 8px;

  > img {
    display: block;
    margin: auto;
    max-width: 100% !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-row-gap: 32px;
    grid-template-columns: repeat(14, minmax(0, 1fr));
  }
`

export const StyledAggregator = styled(StyledDexes)<IPropsStyledAggregator>`
  height: ${({ name }) => (name && AUTOHEIGHT.includes(name) ? 'auto' : '100%')};
  ${({ theme }) => theme.mediaQueries.xl} {
    height: auto;
  }
`

export const Overlay = styled.div`
  display: flex;
  margin: auto;
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: inset 0px 0px 6px rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  padding: 9px;
  img {
    display: block;
    margin: auto;
    width: 100%;
    max-width: 100%;
    padding: 5px;
  }

  @media screen and (max-width: 538px) {
    width: 34px;
    height: 34px;
    padding: 5px;
  }
`

const CardSafeReliable = ({ safe }: { safe: ISafeReliable }) => {
  return (
    <StyledCardSafeReliable>
      <img src={safe.icon} alt="icon" />
      <h3>{safe.name}</h3>
      <p>{safe.describe}</p>
    </StyledCardSafeReliable>
  )
}

export const BtnLearMore = ({ href }: { href?: string }) => {
  const { t } = useTranslation()

  return (
    <a href={href} target="_blank" rel="noreferrer">
      <StyledLearMore>
        <div>
          <span>{t('Learn more')}</span>
          <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/ArrowUpRight.png`} alt="ArrowUpRight" />
        </div>
      </StyledLearMore>
    </a>
  )
}

const Swap = ({ t }: { t: TranslateFunction }) => {
  return (
    <>
      <StyledSwap>
        <p>
          {t(
            'Trade any token on the supported networks by aggregating liquidity from hundreds of aggregators and DEXes that ensure the best swap rates for your trades.',
          )}
        </p>
      </StyledSwap>

      <div className="btn_learn_more_wycd">
        <BtnLearMore href="https://docs.xoxlabs.io/xox-product-roadmap/xox-dex-v2/supported-chains-dexs-and-aggregators" />
      </div>
    </>
  )
}

const LimitOrder = ({ t }: { t: TranslateFunction }) => {
  return (
    <>
      <StyledSwap>
        <p>
          {t(
            "Secure your position ahead of time at a specific price. A buy limit order can only be executed at the limit price or lower, and a sell limit order can only be executed at the limit price or higher. Don't miss a trade.",
          )}
        </p>
      </StyledSwap>

      <div className="btn_learn_more_wycd">
        <BtnLearMore href="https://docs.xoxlabs.io/xox-product-roadmap/xox-dex-v2/supported-chains-dexs-and-aggregators" />
      </div>
    </>
  )
}

const Earn = ({ t }: { t: TranslateFunction }) => {
  return (
    <>
      <StyledSwap>
        <p>
          {t(
            "Share your unique referral code with other users to earn a small % of the XOX Labs Protocol's revenue. It's simple, just copy and share your code, then enjoy the profits. No sharing links, no sign-up, no waste of time. 100% Decentralized and Simple.",
          )}
        </p>
      </StyledSwap>

      <div className="btn_learn_more_wycd">
        <BtnLearMore href="https://docs.xoxlabs.io/xox-product-roadmap/xox-dex-v2/supported-chains-dexs-and-aggregators" />
      </div>
    </>
  )
}

const Liquidity = ({ t }: { t: TranslateFunction }) => {
  return (
    <>
      <StyledSwap>
        <p>
          {t(
            'Provide liquidity to hundreds of liquidity pairs to receive a share in the transaction fees of the respective pools.',
          )}
        </p>
      </StyledSwap>

      <div className="btn_learn_more_wycd">
        <BtnLearMore href="https://docs.xoxlabs.io/xox-product-roadmap/xox-dex-v2/supported-chains-dexs-and-aggregators" />
      </div>
    </>
  )
}

const API = ({ t }: { t: TranslateFunction }) => {
  return (
    <>
      <StyledSwap>
        <p>
          {t(
            'XOX Dex V2 API provides high-tech API to fetch asset balances, fees, and liquidity-pool and route them to create the most efficient transaction for each trade + providing trade options as well for traders to choose from.',
          )}
        </p>
      </StyledSwap>

      <div className="btn_learn_more_wycd">
        <BtnLearMore href="https://docs.xoxlabs.io/xox-product-roadmap/xox-dex-v2/supported-chains-dexs-and-aggregators" />
      </div>
    </>
  )
}

function DevV2() {
  const { t } = useTranslation()
  const [tabEcosystem, setTabEcosystem] = useState<number>(0)
  const [tabWHatYouCanDo, setTabWHatYouCanDo] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')
  const [emailBorderClass, setEmailBorderClass] = useState<string>('')
  const [btnHoverClass, setBtnHoverClass] = useState<string>('')
  const [emailErrorClass, setEmailErrorClass] = useState<string>('')
  const [textErrorClass, setTextErrorClass] = useState<string>('')
  const { toastSuccess, toastError } = useToast()
  const [timeRecall, setTimeRecall] = useState(5)
  const [timeRecall2, setTimeRecall2] = useState(7)
  const { width } = useWindowSize()
  const [newAggregatorsUrl, setNewAggregatorsUrl] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newRevenueUrl, setNewRevenueUrl] = useState('')
  const { ref: newAggregatorsRef, inView: newAggregatorsInView } = useInView({ threshold: 1 })
  const { ref: newRef, inView: newInView } = useInView({ threshold: 1 })
  const { ref: newRevenueRef, inView: newRevenueInView } = useInView({ threshold: 1 })

  useEffect(() => {
    if (newAggregatorsInView)
      setNewAggregatorsUrl(`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/new_aggregators`)
  }, [newAggregatorsInView])

  useEffect(() => {
    if (newInView) setNewUrl(`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/new_ref`)
  }, [newInView])

  useEffect(() => {
    if (newRevenueInView) setNewRevenueUrl(`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/new_revenue`)
  }, [newRevenueInView])

  const SOCIALS: Array<ISocial> = useMemo(() => {
    return [
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/1.svg`,
        name: t('XOX Dex V1'),
        link: t('Trade Now'),
        heft: '/swap',
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/2.svg`,
        name: t('Referral Program'),
        link: t('Earn Now'),
        heft: '/referral',
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/3.svg`,
        name: t('Bridge'),
        link: t('Bridge Now'),
        heft: '/bridge-token',
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/4.svg`,
        name: t('Stable Coin'),
        link: t('Stake Now'),
        heft: '/stable-coin',
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/5.svg`,
        name: t('Liquidity Mining'),
        link: t('Earn Now'),
        heft: '/liquidity',
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/6.svg`,
        name: t('Yield farming'),
        link: t('Earn Now'),
        heft: '/pools',
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/7.svg`,
        name: t('Assets Manager'),
        link: t('Explore Now'),
        heft: '/info',
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/1.svg`,
        name: t('XOX Dex V2'),
        link: t('Best Rates on DeFi'),
        heft: '/dex-v2',
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/8.svg`,
        name: t('XOX Mobile App'),
        link: t('Your Defi Key'),
        heft: '#',
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/9.svg`,
        name: t('XOX Launchpad'),
        link: t('Invest Now'),
        heft: '#',
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/10.svg`,
        name: t('Coin Listing Site'),
        link: t('Don’t Miss Out'),
        heft: '#',
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/11.svg`,
        name: t('Lottery Game'),
        link: t('Risk Small - Earn Big'),
        heft: '#',
      },
    ]
  }, [t])

  const TABECOSYSTEM: Array<string> = useMemo(() => ['DEXes', 'Aggregators', 'Blockchains', 'Bridges'], [])
  const TABWHATYOUCANDO: Array<string> = useMemo(
    () => [t('Swap'), t('Limit Order'), t('Earn'), t('Liquidity'), t('API')],
    [t],
  )

  const SAFERELIABLE: Array<any> = useMemo(() => {
    return [
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Non-cutodial.png`,
        name: t('Non-custodial'),
        describe: t('XOX Dex V2 is a Permissionless and Non-custodial Decentralized Protocol.'),
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Anonymous.png`,
        name: t('Anonymous'),
        describe: t('No KYC or Sign Up required. Just connect your wallets and start trading.'),
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/transparent.png`,
        name: t('Transparent'),
        describe: t(
          'Check every single transaction or smart contract before allowing it to access your funds, track the whole chain of events happening in every blockchain.',
        ),
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Permissionless.png`,
        name: t('Permissionless'),
        describe: t(
          'Every supported Blockchains is public and open for everyone to trade and own assets without the supervision of governments or financial institutions.',
        ),
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/audited.png`,
        name: t('Audited'),
        describe: t(
          `XOX Labs' smart contracts and platforms are fully audited by top-tier auditors to ensure the security of the users.`,
        ),
      },
      {
        icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Tested-02.png`,
        name: t('Tested'),
        describe: t(
          'Every new feature and protocol integration is heavily tested in every possible situation before making it accessible to the users to ensure performance and safety.',
        ),
      },
    ]
  }, [t])

  const VALUE: Array<IValue> = [
    {
      title: t('Integrated Aggregators'),
      value: '30',
    },
    {
      title: t('Supported Chains'),
      value: '60',
    },
    {
      title: t('Integrated DEXs'),
      value: '150',
    },
    {
      title: t('Liquidity Sources'),
      value: '540',
    },
  ]

  const renderTab = useMemo(() => {
    switch (tabEcosystem) {
      case 0:
        return <DexesComponent />
      case 1:
        return <Aggregators />
      case 2:
        return <BlockChains />
      case 3:
        return <Bridges />
      default:
        break
    }
    return null
  }, [tabEcosystem])

  const renderTabWhatYouCanDo = useMemo(() => {
    switch (tabWHatYouCanDo) {
      case 0:
        return <Swap t={t} />
      case 1:
        return <LimitOrder t={t} />
      case 2:
        return <Earn t={t} />
      case 3:
        return <Liquidity t={t} />
      case 4:
        return <API t={t} />
      default:
        break
    }
    return null
  }, [tabWHatYouCanDo, t])

  const renderImageWhatYouCando = useMemo(() => {
    switch (tabWHatYouCanDo) {
      case 0:
        return <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/s1.png`} alt="swap" />
      case 1:
        return <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/s2.png`} alt="limit_order" />
      case 2:
        return <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/s3.png`} alt="earn" />
      case 3:
        return <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/s4.png`} alt="liquidity" />
      case 4:
        return <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/s5.png`} alt="api" />
      default:
        break
    }
    return null
  }, [tabWHatYouCanDo])

  const handleChange = (event) => {
    const email = event.target.value
    const isValid = validateEmail(email)
    setInputValue(email)

    if (!isValid) {
      setEmailErrorClass(' error')
      setTextErrorClass(' text-error')
      setEmailBorderClass('')
    } else {
      setTextErrorClass('')
      setEmailErrorClass('')
      setEmailBorderClass(' hover-form')
    }
  }

  const validateEmail = (email) => {
    const reg =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  }

  const handleBlur = () => {
    setEmailBorderClass('')
    setBtnHoverClass('')
    if (inputValue.length === 0) {
      setTextErrorClass('')
      setEmailErrorClass('')
    }
  }

  const handleFocus = () => {
    setEmailBorderClass(' hover-form')
    setBtnHoverClass(' hover-button')
    if (textErrorClass) {
      setEmailErrorClass(' error')
      setTextErrorClass(' text-error')
      setEmailBorderClass('')
    }
  }

  const handleBtnSubmit = useCallback(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/subscribe`, { email: inputValue })
      .then(() => {
        toastSuccess(t('Subscribed successfully.'))
      })
      .catch((error) => {
        if (error.response.status === 400 && error.response.data.message === 'Email is already existed!') {
          toastError(t('The email is already registered.'))
          return
        }

        toastError(t('System error'))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, t])

  //   function elmYPosition(eID) {
  //     var elm = document.getElementById(eID);
  //     var y = elm.offsetTop;
  //     var node = elm;
  //     while (node.offsetParent && node.offsetParent != document.body) {
  //         node = node.offsetParent;
  //         y += node.offsetTop;
  //     } return y;
  // }

  useEffect(() => {
    const myId = setTimeout(() => {
      if (timeRecall >= 0) {
        setTimeRecall(timeRecall - 1)
        return
      }
      const tabEcosystemTemp = (tabEcosystem + 1) % 4
      setTabEcosystem(tabEcosystemTemp)
      document.getElementById('tab_ecosystem_wrapper').scrollTo({ left: 100 * tabEcosystemTemp, behavior: 'smooth' })

      setTimeRecall(4)
    }, 1000)
    return () => clearTimeout(myId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRecall])

  useEffect(() => {
    const myId = setTimeout(() => {
      if (timeRecall2 >= 0) {
        setTimeRecall2(timeRecall2 - 1)
        return
      }
      const tabWHatYouCanDoTemp = (tabWHatYouCanDo + 1) % 5
      setTabWHatYouCanDo(tabWHatYouCanDoTemp)
      document
        .getElementById('tab_what_you_can_do_wrapper')
        .scrollTo({ left: 100 * tabWHatYouCanDoTemp, behavior: 'smooth' })

      setTimeRecall2(7)
    }, 1000)
    return () => clearTimeout(myId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRecall2])

  useEffect(() => {
    const textHeaders = document.querySelectorAll('.text-header div')
    textHeaders.forEach((e) => {
      // eslint-disable-next-line no-param-reassign
      e.innerHTML = (e.textContent || '').replace(/\S/g, "<div class='letter'>$&</div>")
    })

    anime
      .timeline({ loop: true })
      .add({
        targets: '.header-1 .letter',
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: (el, i) => 500 + 30 * i,
      })
      .add({
        targets: '.header-1 .letter',
        translateX: [0, -30],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: 1100,
        delay: (el, i) => 100 + 30 * i,
      })
      .add({
        targets: '.header-2 .letter',
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: (el, i) => 500 + 30 * i,
      })
      .add({
        targets: '.header-2 .letter',
        translateX: [0, -30],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: 1100,
        delay: (el, i) => 100 + 30 * i,
      })
      .add({
        targets: '.header-3 .letter',
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: (el, i) => 500 + 30 * i,
      })
      .add({
        targets: '.header-3 .letter',
        translateX: [0, -30],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: 1100,
        delay: (el, i) => 100 + 30 * i,
      })
  }, [t])

  return (
    <>
      <BG />
      <StyledContainer>
        <StyledHeader>
          <div>
            <h1
              dangerouslySetInnerHTML={{
                __html: t(
                  '<div>Multi-Chain</div> <div class="hight-light">Decentralized</div> <div class="hight-light">Trading</div> <div class="hight-light">Solution</div> <div>Powering</div> <div>Web3.</div>',
                ),
              }}
              className="text-header header-1"
            />

            <h1
              dangerouslySetInnerHTML={{
                __html: t(
                  '<div>Cross-Chain</div> <div class="hight-light">Permissionless</div> <div>Trading</div> <div>Protocol</div> <div class="hight-light">Scaling</div> <div class="hight-light">Web3.</div>',
                ),
              }}
              className="text-header header-2"
            />

            <h1
              dangerouslySetInnerHTML={{
                __html: t(
                  '<div class="hight-light">One-Stop</div> <div class="hight-light">Non-Custodial</div> <div class="hight-light">Trading</div> <div class="hight-light">Ecosystem</div> <div>Supporting</div> <div>Web3.</div>',
                ),
              }}
              className="text-header header-3"
            />
          </div>

          <div>
            <object data="/images/new-top.svg" />
          </div>
        </StyledHeader>

        <StyledBtnStartTrading>
          <div>
            <Tooltip>
              <button type="button" onClick={() => window.open('/swap')} disabled>
                <span>{t('Start Trading')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
                  <path
                    d="M16.1873 4.35359L13.0206 1.18692C12.9468 1.11311 12.8592 1.05456 12.7627 1.01461C12.6663 0.974663 12.5629 0.954102 12.4585 0.954102C12.2477 0.954102 12.0455 1.03785 11.8964 1.18692C11.7474 1.336 11.6636 1.53819 11.6636 1.74901C11.6636 1.95983 11.7474 2.16202 11.8964 2.31109L13.7173 4.12401H4.54186C4.3319 4.12401 4.13053 4.20742 3.98207 4.35588C3.8336 4.50435 3.75019 4.70571 3.75019 4.91567C3.75019 5.12564 3.8336 5.327 3.98207 5.47547C4.13053 5.62393 4.3319 5.70734 4.54186 5.70734H15.6252C15.7815 5.70656 15.9341 5.65953 16.0637 5.57219C16.1933 5.48484 16.2941 5.36108 16.3535 5.21651C16.4141 5.07234 16.4307 4.91344 16.4011 4.75986C16.3715 4.60629 16.2971 4.46492 16.1873 4.35359ZM12.4585 7.29067H1.37519C1.2189 7.29145 1.06633 7.33848 0.936718 7.42583C0.807106 7.51318 0.706249 7.63693 0.646858 7.78151C0.586233 7.92568 0.569669 8.08458 0.599257 8.23815C0.628845 8.39173 0.703259 8.5331 0.813108 8.64442L3.97978 11.8111C4.05337 11.8853 4.14093 11.9442 4.2374 11.9844C4.33387 12.0246 4.43735 12.0453 4.54186 12.0453C4.64637 12.0453 4.74984 12.0246 4.84631 11.9844C4.94279 11.9442 5.03035 11.8853 5.10394 11.8111C5.17814 11.7375 5.23704 11.6499 5.27723 11.5535C5.31742 11.457 5.33812 11.3535 5.33812 11.249C5.33812 11.1445 5.31742 11.041 5.27723 10.9446C5.23704 10.8481 5.17814 10.7605 5.10394 10.6869L3.28311 8.87401H12.4585C12.6685 8.87401 12.8699 8.7906 13.0183 8.64213C13.1668 8.49367 13.2502 8.2923 13.2502 8.08234C13.2502 7.87238 13.1668 7.67101 13.0183 7.52255C12.8699 7.37408 12.6685 7.29067 12.4585 7.29067Z"
                    fill="black"
                  />
                </svg>
              </button>
              <span className="tooltiptext">{t('Under Development')}</span>
            </Tooltip>
            <button type="button" onClick={() => window.open('https://docs.xoxlabs.io')} style={{ height: '100%' }}>
              Docs
            </button>
          </div>
        </StyledBtnStartTrading>

        {width >= 1080 && (
          <StyledValue>
            <div>
              {VALUE.map((item: IValue, i) => (
                <div key={String(i + item.title)}>
                  <p>{item.value}</p>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </StyledValue>
        )}

        {width < 1080 && (
          <StyedValueMobile>
            {VALUE.map((item: IValue, i) => (
              <div key={String(i + item.title)}>
                <p>{item.value}</p>
                <p>{item.title}</p>
              </div>
            ))}
          </StyedValueMobile>
        )}

        <StyledEcosystem>
          <p dangerouslySetInnerHTML={{ __html: t('<span class="hight-light">XOX Dex V2</span> Ecosystem') }} />
          <p>
            {t(
              'Why trade in a single Dex when you can Trade in all DEXs at Once? XOX Dex V2 finds you the best prices across',
            )}
            <br />
            {t('60+ Chains & 150+ DEXes and combines them into a single trade, all while giving you many other trade')}
            <br />
            {t('options to choose from, Ranking them by Lowest Fees, Best Rates, and Higher Liquidity.')}
          </p>
        </StyledEcosystem>

        <StyledTabEcosystem id="tab_ecosystem_wrapper">
          <div>
            {TABECOSYSTEM.map((item, i) => (
              <div
                className={`${
                  i === tabEcosystem
                    ? `tab_ecosystem_contain tab_ecosystem_contain_${i} contain_active`
                    : `tab_ecosystem_contain tab_ecosystem_contain_${i}`
                }`}
                key={`tabEcosystem_${i}`}
                id={`tabEcosystem_${i}`}
              >
                <div
                  key={String(i + item)}
                  onClick={() => {
                    setTabEcosystem(i)
                    setTimeRecall(30)
                  }}
                  aria-hidden="true"
                  className={`${i === tabEcosystem ? 'tab_ecosystem active' : 'tab_ecosystem'}`}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </StyledTabEcosystem>

        {renderTab}

        <StyledBLock>
          <div>
            <h3>{t('How it works.')}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: t(
                  '<span class="hight-light">XOX Dex V2</span> is more than just another aggregator. We have taken a <span class="hight-light">revolutionary approach</span> by aggregating from all <span class="hight-light">DEXs</span>, <span class="hight-light">aggregators</span>, and <span class="hight-light">bridges</span> to provide users with the <span class="hight-light">most advanced and efficient aggregator service available</span> . <span class="hight-light">The XOX Dex V2</span> platform saves users both <span class="hight-light">Time and Money</span> , while also providing them with access to the most complex <span class="hight-light">in-chain and cross-chain</span> swap capabilities available on the <span class="hight-light">Defi Market.</span>',
                ),
              }}
            />
          </div>

          <div>
            <video
              loop
              playsInline
              autoPlay
              controls={false}
              preload="auto"
              style={{ pointerEvents: 'none' }}
              controlsList="nodownload"
              muted
              ref={newAggregatorsRef}
            >
              {newAggregatorsUrl && (
                <>
                  <source
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/new_aggregators.mov`}
                    type='video/mp4; codecs="hvc1"'
                  />
                  <source
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/new_aggregators.webm`}
                    type="video/webm"
                  />
                </>
              )}
            </video>
          </div>
        </StyledBLock>

        <StyledWhatYouCanDo>
          <div>{renderImageWhatYouCando}</div>

          <div>
            <h3>{t('What can you do.')}</h3>
            <div className="tab_what_you_can_do_container" id="tab_what_you_can_do_wrapper">
              {TABWHATYOUCANDO.map((item, i) => (
                <div
                  className={`${
                    tabWHatYouCanDo === i
                      ? `tab_wycd_contain tab_wycd_contain_${i} wycd_active`
                      : `tab_wycd_contain tab_wycd_contain_${i}`
                  }`}
                  key={`tab_wycd_contain_${i}`}
                  id={`tab_wycd_contain_${i}`}
                >
                  <div
                    key={String(i + item)}
                    onClick={() => setTabWHatYouCanDo(i)}
                    aria-hidden="true"
                    className={`${tabWHatYouCanDo === i ? 'tab_what_you_can_do active' : 'tab_what_you_can_do'}`}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
            {renderTabWhatYouCanDo}
          </div>
        </StyledWhatYouCanDo>

        <StyledReferralProgram>
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: t('Next Gen <span class="hight-light">Referral Program</span>') }} />
            <p
              dangerouslySetInnerHTML={{
                __html: t(
                  '<span class="hight-light">XOX Dex V1</span> has already one of the most advanced referral programs in the space, allowing <span class="hight-light">Dual Cash Back</span> and referral earning on every transaction that the code has been applied for both the <span class="hight-light">referee</span> & <span class="hight-light">referrer</span>). It is also gamified, implements leader-boards and milestones and users can withdraw their earnings in, <span class="hight-light">USDT/USDC</span>.',
                ),
              }}
            />

            <p
              dangerouslySetInnerHTML={{
                __html: t(
                  '<span class="hight-light">But</span>, in <span class="hight-light">XOX Dex V2</span> we are upgrading it by making it <span class="hight-light">Multi-Chain</span> and <span class="hight-light">Multi Token</span>. It\'s simple, just <span class="hight-light">Share Your Code</span> and <span class="hight-light">Earn</span> some <span class="hight-light">Free Cash</span> as <span class="hight-light">Passive Income</span>.',
                ),
              }}
            />

            <div>
              <BtnLearMore href="https://docs.xoxlabs.io/xox-product-roadmap/xox-dex-v2/business-case/platform-fees-and-distribution" />
            </div>
          </div>

          <div>
            <video
              loop
              playsInline
              autoPlay
              controls={false}
              preload="auto"
              style={{ pointerEvents: 'none' }}
              controlsList="nodownload"
              muted
              ref={newRef}
            >
              {newUrl && (
                <>
                  <source
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/new_ref.mov`}
                    type='video/mp4; codecs="hvc1"'
                  />
                  <source src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/new_ref.webm`} type="video/webm" />
                </>
              )}
            </video>
          </div>
        </StyledReferralProgram>

        <StyledRevenue>
          <div>
            <video
              loop
              playsInline
              autoPlay
              controls={false}
              preload="auto"
              style={{ pointerEvents: 'none' }}
              controlsList="nodownload"
              muted
              ref={newRevenueRef}
            >
              {newRevenueUrl && (
                <>
                  <source
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/new_revenue.mov`}
                    type='video/mp4; codecs="hvc1"'
                  />
                  <source
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/new_revenue.webm`}
                    type="video/webm"
                  />
                </>
              )}{' '}
            </video>
          </div>

          <div>
            <h3 dangerouslySetInnerHTML={{ __html: t('<span class="hight-light">Revenue Sharing</span> Program') }} />
            <p
              dangerouslySetInnerHTML={{
                __html: t(
                  'The key <span class="hight-light">Revenue Source</span> for <span class="hight-light">XOX Dex V2</span> is trading fees captured on every successful transaction performed in our protocol. Which is <span class="hight-light">automatically redistributed</span> among:',
                ),
              }}
            />

            <ul>
              <li>{t('XOX Token stakers')}</li>
              <li>{t('Liquidity providers')}</li>
              <li>{t('Referrals')}</li>
              <li>{t('Buyback and burn')}</li>
              <li>{t('Development')}</li>
              <li>{t('XOX Labs Treasury')}</li>
            </ul>

            <div>
              <BtnLearMore href="https://docs.xoxlabs.io/xox-product-roadmap/xox-dex-v2/business-case/platform-fees-and-distribution" />
            </div>
          </div>
        </StyledRevenue>

        <ReStyledTitle style={{ marginBottom: width < 1080 ? 30 : 48 }}>{t('Safe and Reliable.')}</ReStyledTitle>

        <StyledSaleAndReliable>
          {SAFERELIABLE.map((safe, i) => (
            <CardSafeReliable safe={safe} key={String(i + safe.name)} />
          ))}
        </StyledSaleAndReliable>

        <div
          style={{
            marginTop: width < 1080 ? 30 : 48,
            marginBottom: width < 1080 ? 60 : 80,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <BtnLearMore href="https://docs.xoxlabs.io/xox-product-roadmap/xox-dex-v2" />
        </div>

        <ReStyledTitle>{t('XOX Labs Ecosystem Products')}</ReStyledTitle>
        <ReStyledSubtitle style={{ marginBottom: 48 }}>
          {t('A true one Multi-chain stop for all your Defi Needs.')}
        </ReStyledSubtitle>

        <StyledSocial marginBottom={[60, null, null, 80]}>
          {SOCIALS.map((social, i) => (
            <CardSocial social={social} key={String(i + social.name)} />
          ))}
        </StyledSocial>

        <Box marginBottom={[60, null, null, null]}>
          <BackedBy />
        </Box>

        <ReStyledTitle style={{ marginBottom: 16 }}>{t('Join The Waitlist Here.')}</ReStyledTitle>
        <p className="subtitle">
          {t('Unsubscribe at any time.')}{' '}
          <a className="privacy-link" href="https://docs.xoxlabs.io/company/xox-labs-privacy-policy" target="_blank">
            {t('Privacy policy')}
            <span className="up-icon" style={{ marginLeft: 6 }}>
              <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 8L7.5 3" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.4375 3H7.5V7.0625" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </p>

        <div className="subscription-form-container">
          <div className="subscription-box">
            <form action="#" method="post" className={`subscription-form ${emailBorderClass} ${emailErrorClass}`}>
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/subscription/email.svg`}
                alt="email"
                className="email-icon"
              />
              <input
                type="text"
                id="email"
                name="email"
                placeholder={t('Your email')}
                required
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              <button
                onClick={handleBtnSubmit}
                disabled={!!textErrorClass || !inputValue}
                type="button"
                className={`btn-submit ${btnHoverClass}`}
              >
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.75 15.3066H24.25"
                    stroke="#515151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 6.55664L24.25 15.3066L15.5 24.0566"
                    stroke="#515151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
            <span className={`hidden-text ${textErrorClass}`}>
              <p>{t('Invalid email address')}</p>
            </span>
          </div>
        </div>
      </StyledContainer>
    </>
  )
}

export default DevV2
