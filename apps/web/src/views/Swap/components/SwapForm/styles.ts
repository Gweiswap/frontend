import styled from 'styled-components'

export const KyberSwapRouteWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 10px;
  min-width: 0px;
  flex-direction: column;
  width: 100%;
  display: flex;
  border-radius: 10px;
  background: var(--dark-2, #1d1c1c);
  padding: 20px;

  h2 {
    color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
    font-size: 18px;
    line-height: 1.5;
    font-weight: 400;
    margin-bottom: 0;
  }

  .btn-show-route {
    transition: all 0.3;
    transform: rotate(180deg);
  }

  .btn-show-route.active {
    transform: rotate(0);
  }

  .content {
    position: relative;
    min-height: 0px;
    overflow: hidden;
    display: none;

    &.active {
      display: block;
    }

    &:before {
      content: '';
      display: block;
      z-index: 3;
      pointer-events: none;
      position: absolute;
      height: 50px;
      width: 100%;
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.2s ease 0s;
      opacity: 0;
    }
  }

  .content__route {
    max-height: 100%;
    max-width: 100%;
    margin-left: 0px;
    // overflow: hidden scroll;

    .router__token {
      position: relative;
      padding-top: 30px;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
    }

    .from__token {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      justify-content: space-between;
      min-width: 100px;
      width: max-content;
      font-size: 16px;
      font-weight: 500;
      white-space: nowrap;
      min-height: 38px;
      border-radius: 0.5rem;
    }

    .direct {
      flex: 1 1 auto;
      min-width: 50px;
      border-bottom: 1px solid rgba(193, 193, 193, 0.2);
      height: 1px;
    }

    .to__token {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 100px;
      width: max-content;
      font-size: 16px;
      font-weight: 500;
      white-space: nowrap;
      min-height: 38px;
      border-radius: 0.5rem;
    }

    .token-logo {
      width: 100%;
      display: flex;
      align-items: center;
      white-space: nowrap;
      text-decoration: none;
      color: rgb(94, 94, 94);
      padding-bottom: 7px;

      img {
        width: 20px;
        height: auto;
        box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
      }

      span {
        margin-left: 4px;
        margin-right: 4px;
        color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
        font-size: 16px;
        font-weight: 400;
      }
    }

    .to__token .token-logo {
      flex-direction: row-reverse;
    }
  }

  @media screen and (max-width: 640px) {
    margin-bottom: 10px;

    h2 {
      font-size: 14px;
    }

    .content__route .to__token,
    .content__route .from__token {
      font-size: 14px;
    }

    .content__route .token-logo span {
      font-size: 14px;
    }
  }
`

export const KyberRouteStyles = styled.div`
  margin: auto;
  width: 100%;
  position: relative;
  padding: 20px 10px 0px;

  &:before {
    position: absolute;
    display: block;
    content: '';
    top: 0px;
    right: 0px;
  }

  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    position: absolute;
    top: 0px;
    z-index: 1;
    background-color: #fb8618;
  }

  .dot-left {
    left: 6.5px;
  }

  .dot-right {
    right: 6.5px;
  }

  .route-info {
    display: flex;
    justify-content: flex-end;
    position: relative;
    align-items: center;

    &:before {
      top: 0;
      content: '';
      display: block;
      border-left: 1px solid white;
      width: 100%;
      height: 100%;
      position: absolute;
      border-right: 1px solid white;
      box-sizing: border-box;
      pointer-events: none;
      opacity: 0.2;
    }

    &:last-child:before {
      height: 50%;
    }

    .start-percent {
      font-size: 12px;
      line-height: 14px;
      font-weight: 700;
      position: absolute;
      top: calc(50% - 15px);
      left: 8px;
      transform: translateY(50%);
      z-index: 2;
      color: var(--primary-secondary, #fb8618);
    }

    .hr {
      position: absolute;
      border-bottom: 1px solid white;
      width: calc(100% - 68px);
      left: 43px;
      opacity: 0.2;
    }

    .route-main {
      width: calc(100% - 68px);
      margin: 10px 0px 10px 6px;

      &:before {
        transition: all 0.1s ease 0s;
        content: '';
        display: block;
        z-index: 2;
        pointer-events: none;
        position: absolute;
        inset: 50% 0px auto auto;
        width: 40px;
        height: calc(100% - 20px);
        transform: translateY(-50%);
        opacity: 0;
        right: 24px;
      }

      &:after {
        transition: all 0.1s ease 0s;
        content: '';
        display: block;
        z-index: 2;
        pointer-events: none;
        position: absolute;
        inset: 50% 0px auto auto;
        width: 40px;
        height: calc(100% - 20px);
        transform: translateY(-50%);
        opacity: 0;
        left: 42px;
      }
    }

    .route-main__wrapper {
      display: flex;
      align-items: center;
    }

    .end-arrow {
      min-width: 24px;
      height: 24px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      z-index: 1;

      > div {
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid #fb8618;
      }
    }
  }

  .scroll-container {
    padding: 5px 20px;
  }

  @media screen and (max-width: 640px) {
    .route-info .route-main {
      margin-left: 0;
      padding: 0 10px;
    }

    .route-info {
      justify-content: center;
    }
  }
`

export const SearchInputWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 16px;
  background: #1d1c1c;
  border-radius: 12px;
  position: relative;
  margin-bottom: 30px;

  .blur {
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 100vh;
    z-index: 9;
  }

  .input-group {
    height: 28px;
    position: relative;
    z-index: 10;

    input {
      width: 100%;
      height: 100%;
      background: none;
      border: none;
      outline: none;
      color: rgba(255, 255, 255, 0.87);
      font-size: 18px;
      font-weight: 400;
      padding-left: 30px;
    }

    input:placeholder {
      color: rgba(255, 255, 255, 0.38);
    }

    button {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      right: 0;
      border: none;
      border-radius: 20px;
      background: #0a0a0a;
      padding: 5px 10px;
      color: var(--dark-text-disable, rgba(255, 255, 255, 0.38));
      font-size: 18px;
      font-weight: 400;
    }

    svg.search-icon {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      left: 0;
    }
  }

  .dropdown-items {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    border-radius: 12px;
    list-style-type: none;
    padding: 16px 0;
    z-index: 10;
    background: #171717;
    border: 1px solid rgba(255, 255, 255, 0.04);
    width: 100%;
    display: none;
  }

  .dropdown-items.active {
    display: block;
  }

  .title-trading-pair {
    color: rgba(255, 255, 255, 0.38);
    margin-bottom: 16px;
    padding: 0 16px;
  }

  .try-typing {
    color: rgba(255, 255, 255, 0.38);
    padding: 0 16px;
  }

  .not-found {
    color: rgba(255, 255, 255, 0.38);
    margin-bottom: 16px;
    padding: 0 16px;
    display: flex;

    svg {
      margin-right: 10px;
    }
  }

  .dropdown-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 16px;

    img {
      width: 25px;
      height: auto;
      margin-right: 10px;
    }

    p {
      font-size: 14px;
      font-weight: 400;
    }

    p:first-child {
      color: rgba(255, 255, 255, 0.87);
      font-weight: bold;
      margin-bottom: 5px;
    }

    p:last-child {
      color: rgba(255, 255, 255, 0.38);
    }
  }

  .dropdown-item:hover,
  .dropdown-item.active {
    background: #2d2c2c;
  }

  @media screen and (max-width: 640px) {
    .input-group input {
      font-size: 14px;
    }
  }
`

export const RouteBoxWrapper = styled.div`
  padding: 8px;
  height: fit-content;
  position: relative;
  flex: 0 0 auto;
  margin: auto 30px;
  transition: filter 0.15s ease 0s;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid var(--dark-outline, rgba(255, 255, 255, 0.2));
  background: var(--dark-background, #0a0a0a);

  .route-box__token {
    margin-right: 0px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    text-decoration: none;
    color: rgb(94, 94, 94);
    padding-bottom: 7px;
    border-bottom: 1px solid rgba(193, 193, 193, 0.4000000059604645);

    img {
      width: 19px;
      height: auto;
      margin-right: 5px;
    }

    span {
      color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
      font-size: 16px;
      font-weight: 400;
    }
  }

  .route-box__exchange {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    padding: 4px 0px;
    margin-top: 4px;
    font-size: 10px;
    border-radius: 8px;
    color: rgb(94, 94, 94);
    line-height: 20px;
    white-space: nowrap;
    text-decoration: none;

    img {
      width: 15px;
      height: auto;
      margin-right: 5px;
    }

    span {
      color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
      font-size: 12px;
      font-weight: 400;
      text-transform: capitalize;
    }
  }
`

export const ConfirmationKyberContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  border-radius: 20px;

  .swap-amount {
    display: grid;
    grid-auto-rows: auto;

    .in-out-token {
      margin-top: 16px;
      position: relative;
      display: grid;
      grid-auto-rows: auto;
      row-gap: 8px;

      .token-in,
      .token-out {
        flex-direction: column;
        gap: 8px;
        padding: 12px 16px;
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        display: flex;
        border-radius: 10px;
        background: var(--dark-2, #1d1c1c);

        .token-group {
          width: 100%;
          display: flex;
          padding: 0px;
          align-items: center;
          justify-content: space-between;
        }

        .token-amount {
          text-overflow: ellipsis;
          overflow: hidden;
          color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
          font-size: 18px;
          font-weight: 400;
        }

        .token-info {
          box-sizing: border-box;
          margin: 0px;
          gap: 8px;
          -webkit-box-align: center;
          align-items: center;
          min-width: fit-content;
          display: flex;
        }

        .token-amount-usd {
          box-sizing: border-box;
          margin: 0px;
          min-width: 0px;
          font-size: 14px;
          font-weight: 500;
          color: rgb(94, 94, 94);
        }

        .token-logo {
          width: 24px;
          height: auto;
          box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
          border-radius: 24px;
        }

        .token-symbol {
          box-sizing: border-box;
          margin: 0px;
          min-width: 0px;
          color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
          font-size: 18px;
          font-weight: 400;
        }
      }

      .to-arrow {
        width: 30px;
        height: 30px;
        margin: auto;
      }
    }
  }

  .swap-info {
    display: grid;
    grid-auto-rows: auto;
    row-gap: 0.5rem;
    padding: 12px 16px;
    border-radius: 10px;
    background: var(--dark-2, #1d1c1c);

    .info__group {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      height: 20px;
      width: 100%;
      display: flex;
      padding: 0px;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .left .text {
      color: var(--dark-text-secondary, rgba(255, 255, 255, 0.6));
      font-size: 16px;
      font-weight: 400;
    }

    .right {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      justify-content: center;
      align-items: center;
      text-align: right;
      display: flex;
      color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
      font-size: 16px;
      font-weight: 400;

      .price svg {
        width: 24px;
        height: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      .group {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        display: flex;
        font-weight: 500;
        white-space: nowrap;
        color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
        font-size: 16px;
        font-weight: 400;
      }

      .value,
      .symbol {
        color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
        font-size: 16px;
        font-weight: 400;
      }
    }
  }

  .swap-button .btn-swap {
    width: 100%;
    color: var(--default-white, #fff);
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 32px;
  }

  @media screen and (max-width: 640px) {
    .swap-info .info__group {
      .left .text {
        font-size: 12px;
      }

      .right {
        font-size: 12px;

        .price svg {
          width: 17px;
          height: 17px;
        }

        .group,
        .value,
        .symbol {
          font-size: 12px;
        }
      }
    }
  }
`
