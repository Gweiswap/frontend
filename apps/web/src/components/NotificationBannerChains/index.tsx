import { useTranslation } from '@pancakeswap/localization'
import XClose from 'components/NotificationBannerAirdrop/components/XClose'
import { useAppDispatch } from 'state'
import { hideBannerChains } from 'state/user/actions'
import styled from 'styled-components'
import TradeIcon from './components/TradeIcon'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000;
  background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/BlockchainsBGMobile.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 100;
  .line {
    height: 4px;
    width: 100%;
    background: linear-gradient(89.21deg, #9bf3cb 0.16%, #3ec0a6 35.42%, #f44234 65.49%, #9f3a83 99.71%);
  }
  .x_svg {
    position: absolute;
    top: 13px;
    right: 24px;
    cursor: pointer;
  }
  .outer {
    padding: 40px 24px 33px 24px;
    width: 100%;

    > p {
      font-size: 24px;
      line-height: 29px;
      text-align: center;
      color: #ffffff;
    }
    > p:nth-child(1) {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
    }
    > p:nth-child(2) {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 14px;
    }
    .dif {
      margin-top: 39px;
      button {
        border: none;
        background: #ffffff;
        border-radius: 10px;
        padding: 12px 21px;
        width: 160px;
        text-align: center;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        cursor: pointer;
        .svg {
          margin-left: 10px;
        }

        &:hover {
          background: #000;
          color: #fff;
        }

        &:hover .svg svg path {
          fill: #ffffff;
        }
      }
      > .btn-group {
        width: fit-content;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px;
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/BGBannerChain.png);
    .outer {
      > p {
        font-size: 24px;
        line-height: 29px;
      }

      > p:nth-child(2) {
        font-size: 16px;
        line-height: 17px;
        margin-top: 5px;
      }
      .dif {
        > .btn-group {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          column-gap: 24px;
        }
      }
    }
  }
`
function NotificationBannerChains() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const hideBanner = () => {
    dispatch(hideBannerChains())
  }
  const CHAINS = ['ETH', 'BSC', 'Arbitrum', 'zkSync', 'Polygon', 'Optimism']

  return (
    <Container>
      <div className="line" />
      <div className="outer">
        <p>{t('XOX Token is currently trading on the following chains!')}</p>
        <p>{t('Trade & Bridge XOX across multiple networks with ease.')}</p>
        <div className="dif">
          <div className="btn-group">
            {CHAINS.map((item) => {
              return (
                <button type="button">
                  {item}
                  <span className="svg">
                    <TradeIcon />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <span className="x_svg" aria-hidden="true" onClick={hideBanner}>
        <XClose />
      </span>
    </Container>
  )
}

export default NotificationBannerChains
