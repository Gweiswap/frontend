import styled from 'styled-components'
import { StyledS } from '../Company'

export const StyledContainer = styled(StyledS)`
  margin-top: 36px;
  color: rgba(255, 255, 255, 0.6);

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 89px;
  }
`

export const StyledHeader = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 58px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    margin-bottom: 0px;
  }

  > div:nth-child(1) {
    margin-bottom: 45px;
    > h1 {
      width: fit-content;
      font-weight: 700;
      font-size: 36px;
      line-height: 48px;
      margin-bottom: 16px;
      color: white;
      /* background: linear-gradient(82.42deg, #a73b7c 2.51%, #f34236 25.44%, #968470 44.85%, #6ee1d0 69.87%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent; */
    }

    > p {
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
    }

    ${({ theme }) => theme.mediaQueries.md} {
      display: flex;
      flex-direction: row;
      gap: 46px;

      > p {
        flex: 1;
        font-size: 16px;
        line-height: 28px;
      }
    }

    ${({ theme }) => theme.mediaQueries.lg} {
      display: block;
      flex-direction: initial;
      gap: initial;
      width: 100%;
      max-width: 500px;
      margin-bottom: 0;

      > h1 {
        font-size: 56px;
        line-height: 70px;
        margin-bottom: 18px;
      }
      > p {
        font-size: 18px;
        line-height: 32px;
      }
    }

    ${({ theme }) => theme.mediaQueries.xl} {
      max-width: 665px;

      > h1 {
        font-size: 64px;
        line-height: 88px;
      }
    }
  }

  > div:nth-child(2) {
    position: relative;
    display: flex;
    width: 100%;

    > div {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      width: 414px;
      height: 414px;
      background: radial-gradient(50% 50% at 50% 50%, rgba(237, 28, 81, 0.2) 0%, rgba(237, 28, 81, 0) 100%);
    }

    > video {
      margin: 0 auto;
      width: 725px;
      max-width: 100%;
    }

    ${({ theme }) => theme.mediaQueries.sm} {
      > div {
        width: 794px;
        height: 794px;
      }
    }

    ${({ theme }) => theme.mediaQueries.lg} {
      width: initial;
    }

    ${({ theme }) => theme.mediaQueries.xxl} {
      width: initial;

      > video {
        transform: translateY(-80px);
      }
    }
  }
`

export const StyledBG = styled('div')`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: -3;

  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -4;
    background-color: #0a0a0a;
  }

  > div {
    --w: 0px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    width: var(--w);
    height: var(--w);
  }

  /* > div:nth-child(1) {
    --w: 841px;
    left: -1170px;
    top: 190px;
    background: radial-gradient(50% 50% at 50% 50%, rgba(237, 28, 81, 0.2) 0%, rgba(237, 28, 81, 0) 100%);
  } */

  > div:nth-child(2) {
    --w: 729px;
    left: -1040px;
    top: 2650px;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(249, 124, 29, 0.2) 0%,
      rgba(246, 99, 42, 0.2) 0.01%,
      rgba(249, 124, 29, 0) 100%
    );
  }

  > div:nth-child(3) {
    --w: 729px;
    left: 400px;
    top: 3150px;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(249, 124, 29, 0.2) 0%,
      rgba(246, 99, 42, 0.2) 0.01%,
      rgba(249, 124, 29, 0) 100%
    );
  }
`

export const StyledTitle = styled('h1')`
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  margin-bottom: 8px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 28px;
    line-height: 40px;
    margin-bottom: 16px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 36px;
    line-height: 48px;
    margin-bottom: 24px;
  }
`

export const StyledDescription = styled('p')`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
    line-height: 28px;
    margin-bottom: 30px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 18px;
    line-height: 32px;
    margin-bottom: 24px;
  }
`

export const StyledF = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 36px;

  > * {
    flex: 1;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    margin-bottom: 60px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    margin-bottom: 80px;
  }
`

export const StyledCard = styled('div')`
  position: relative;
  background: rgba(16, 16, 16, 0.3);
  box-shadow: 0px 7px 20px rgba(255, 138, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 20px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 24px;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      180deg,
      rgba(184, 9, 181, 0) 0%,
      rgba(184, 9, 181, 0.25) 40%,
      rgba(237, 28, 81, 0.5) 60%,
      rgba(255, 176, 0, 0.5) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`

export const StyledCard1 = styled(StyledCard)`
  > h1 {
    width: fit-content;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    margin-bottom: 16px;
  }

  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    > h1 {
      font-size: 20px;
      line-height: 24px;
    }
  }
`

export const StyledCard2 = styled(StyledCard)`
  > h1 {
    width: fit-content;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 16px;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  > h2 {
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 8px;
  }

  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 8px;

    > span.hl {
      font-weight: 700;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    > span.white {
      font-weight: 700;
      color: #ffffffde;
    }

    &.center {
      text-align: center;
    }
  }

  > hr {
    border-color: #fb8618;
    margin: 14px 0;
  }

  .divide {
    width: 100%;
    height: 1px;
    background: #fb8618;
    margin: 14px 0;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    > h1 {
      font-size: 20px;
      line-height: 24px;
    }
  }
`

export const Dot = styled('span')`
  &:before {
    content: '• ';
    color: #fb8618;
  }
`

export const ContainnerStyledF2 = styled.div`
  display: flex;
  justify-content: center;
`

export const StyledF2 = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 64px;
  width: 1189px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 80px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 25px;
  }
`

export const StyledAddress = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;

  .zkSync-logo {
    background: #fff;
    border-radius: 50%;
    padding: 2px;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 12px;
    flex: 1;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    overflow: hidden;
    gap: 8px;
    position: relative;

    .copied_btn {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;

      white-space: nowrap;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;

      > p:nth-child(1),
      > p:nth-child(2) {
        margin-right: 4px;
      }

      > p:nth-child(1) {
        ${({ theme }) => theme.mediaQueries.lg} {
          display: none;
        }
      }
      > p:nth-child(2) {
        display: none;
        ${({ theme }) => theme.mediaQueries.lg} {
          display: initial;
        }
      }
      > div {
        display: flex;
        > p:nth-child(1) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    > img:nth-child(1) {
      width: 20px;
      height: 20px;
    }

    > img:nth-child(3) {
      margin-left: auto;
      width: 17px;
      height: 17px;
    }
  }

  > a {
    text-align: center;
    padding: 10px 0;
    position: relative;
    min-width: 86px;

    font-weight: 700;
    font-size: 14px;
    line-height: 17px;

    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;

    border-radius: 8px;
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(120deg, rgba(184, 9, 181, 1) 0%, rgba(237, 28, 81, 1) 50%, rgba(255, 176, 0, 1) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  }
`

export const StyledCertik = styled('div')`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 64px;
  margin-bottom: 64px;

  &:before {
    content: 'TRUSTED BY';
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
    font-size: 60px;
    line-height: 73px;
    text-align: center;
    color: rgba(255, 255, 255, 0.1);
  }

  img {
    width: 240px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    margin-top: 130px;
    margin-bottom: 130px;
    gap: 78px;

    &:before {
      white-space: nowrap;
      font-size: 130px;
      line-height: 157px;
    }

    img {
      width: 240px;
      cursor: pointer;
    }
  }
`

export const StyledAAD = styled(StyledCard)`
  position: relative;
  padding: 24px 21px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-top: 40px;
  margin-bottom: 64px;
  min-width: 100%;

  > div.l,
  > div.r {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  > div.c {
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      position: relative;
      width: 271px;
      height: 271px;
      ${({ theme }) => theme.mediaQueries.sm} {
        width: 486px;
        height: 486px;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        width: 532px;
        height: 532px;
      }
      ${({ theme }) => theme.mediaQueries.xl} {
        width: 339px;
        height: 339px;
      }
      ${({ theme }) => theme.mediaQueries.xxl} {
        width: 532px;
        height: 532px;
      }

      > div:nth-child(2) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: rgba(255, 255, 255, 0.87);

        > h1 {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          margin-bottom: 8px;
        }
        > p {
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
        }
        ${({ theme }) => theme.mediaQueries.md} {
          > h1 {
            font-size: 24px;
            line-height: 29px;
            margin-bottom: 12px;
          }
          > p {
            font-size: 16px;
            line-height: 24px;
          }
        }
      }
    }
  }
  > div.bg {
    position: absolute;
    z-index: -2;
    top: 50%;
    left: 50%;

    > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      aspect-ratio: 1 / 1;

      --layer: 0;
      --r: 100px;
      --lv: 0;
      width: calc(180px + (var(--r) * var(--layer) * var(--lv)));
    }

    > div:nth-child(1) {
      --layer: 1.2;
      background: linear-gradient(
        88.83deg,
        rgba(246, 99, 42, 0.15) 0.96%,
        rgba(249, 124, 29, 0) 33.8%,
        rgba(249, 124, 29, 0) 64.3%,
        rgba(246, 99, 42, 0.15) 96.97%
      );
    }
    > div:nth-child(2) {
      --layer: 2;
      background: linear-gradient(
        90deg,
        rgba(246, 99, 42, 0.15) 2.31%,
        rgba(249, 124, 29, 0) 33.05%,
        rgba(249, 124, 29, 0) 61.61%,
        rgba(246, 99, 42, 0.15) 92.19%
      );
    }
    > div:nth-child(3) {
      --layer: 3;
      background: linear-gradient(
        90deg,
        rgba(246, 99, 42, 0.1) 0%,
        rgba(249, 124, 29, 0) 34.21%,
        rgba(249, 124, 29, 0) 65.98%,
        rgba(246, 99, 42, 0.1) 100%
      );
    }
    > div:nth-child(4) {
      --layer: 3.9;
      background: linear-gradient(
        90deg,
        rgba(246, 99, 42, 0.07) 0%,
        rgba(249, 124, 29, 0) 34.21%,
        rgba(249, 124, 29, 0) 65.98%,
        rgba(246, 99, 42, 0.07) 100%
      );
    }
    > div:nth-child(1),
    > div:nth-child(2),
    > div:nth-child(3),
    > div:nth-child(4) {
      --lv: 1;
      ${({ theme }) => theme.mediaQueries.sm} {
        --lv: 2;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        --lv: 3;
      }
      ${({ theme }) => theme.mediaQueries.lg} {
        --lv: 4;
      }
      ${({ theme }) => theme.mediaQueries.xl} {
        --r: 70px;
        --lv: 5;
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 24px;
    flex-direction: row;
    height: fit-content;
    width: fit-content;
    transform: translateX(-50%);
    left: 50%;
  }
`

export const StyledItemAAD = styled('div')`
  --color: #00000000;
  position: relative;
  padding: 9px 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  text-align: left;
  transition: all 0.4s ease;
  transform: translateX(0);

  ${({ theme }) => theme.mediaQueries.xl} {
    &.active,
    &:hover {
      transform: translateX(24px);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 12px;
    z-index: -1;
    background-color: var(--color);
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  &.b-l {
    text-align: right;
    &:before {
      right: initial;
      left: 0;
      border-top-right-radius: initial;
      border-bottom-right-radius: initial;
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
    }

    ${({ theme }) => theme.mediaQueries.xl} {
      &.active,
      &:hover {
        transform: translateX(-24px);
      }
    }
  }

  &.highLight {
    padding: 16px;
    box-shadow: 0px 7px 20px -10px rgba(255, 138, 0, 0.25);
    &:before {
      content: '';
      left: 0;
      right: 0;
      width: initial;
      z-index: -1;
      border-radius: inherit;
      padding: 2px;
      background: linear-gradient(
        125deg,
        rgba(184, 9, 181, 0.5) 0%,
        rgba(237, 28, 81, 0.5) 50%,
        rgba(255, 176, 0, 0.5) 100%
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    > h3 {
      margin-bottom: 8px;
    }

    > p {
      font-size: 14px;
      line-height: 17px;
    }
  }

  > h3 {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 6px;
  }

  > p {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 4px;
    white-space: wrap;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    > p {
      white-space: nowrap;
    }
  }
`

export const StyledTVS = styled(StyledCard)`
  position: relaitve;
  padding: 24px 18px;
  margin-top: 40px;
  margin-bottom: 64px;
  min-height: 545px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 40px 70px;
    margin-top: 48px;
    margin-bottom: 80px;
  }

  .tvs-chart {
    padding: 16px !important;
    background: rgba(16, 16, 16, 0.3) !important;
    backdrop-filter: blur(10px) !important;
    border-radius: 20px !important;
    border: unset !important;
    display: none;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    @media screen and (max-width: 900px) {
      background: #1e2127 !important;
    }
  }

  > div:nth-child(1) {
    height: 500px !important;
    @media screen and (min-width: 852px) {
      height: 400px !important;
    }
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;

    > div {
      --color: #ffffff;
      display: flex;
      align-items: center;
      gap: 7px;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.87);
      width: calc(50% - 8px);

      ${({ theme }) => theme.mediaQueries.md} {
        font-size: 14px;
        line-height: 17px;
        width: initial;
      }

      &:before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 2px;
        background-color: var(--color);
      }
    }
  }
`
