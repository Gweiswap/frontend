import { useTranslation } from '@pancakeswap/localization'
import styled, { keyframes } from 'styled-components'

export const floatingAnim = (x: string, y: string) => keyframes`
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

const Wrapper = styled.div`
  padding-bottom: 15px;
  .title_container {
    .title {
      font-weight: 700;
      font-size: 20px;
      line-height: 32px;
      color: rgba(255, 255, 255, 0.87);
    }

    .description {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 40px;
      margin-top: 16px;
    }
  }
  .main {
    display: grid;
    gap: 19px;
    grid-template-columns: 1fr 1fr;
    position: relative;
    align-items: center;

    .couple {
      display: grid;
      gap: 19px;
      grid-template-columns: 1fr;
    }
    .mt {
      margin-top: 80px;
      justify-self: flex-end;
    }

    .eth {
      animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
      animation-delay: 0.66s;
    }
    .poly {
      animation: ${floatingAnim('-5px', '5px')} 3s ease-in-out infinite;
      animation-delay: 0.66s;
    }
    .bsc {
      animation: ${floatingAnim('2px', '10px')} 3s ease-in-out infinite;
      animation-delay: 0.66s;
    }
    .sol {
      animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
      animation-delay: 0.66s;
    }
  }
`

const EconomyMobile = () => {
  const { t } = useTranslation()

  return (
    <Wrapper style={{ overflow: 'hidden' }}>
      <div className="title_container">
        <p className="title" data-aos="fade-right">
          {t('Built and Available on every leading blockchain.')}
        </p>
        <p className="description" data-aos="fade-left">
          {t(
            'Creating A Truly Decentralized Multichain Ecosystem with Unlimited possibilities. Supporting Defi and Web3 global adoption for a better future.',
          )}
        </p>
      </div>
      <div className="chain_container" data-aos="fade-right">
        <div className="main">
          <div className="couple mt">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/ethers_chain.svg`}
              alt="eth_mobile"
              className="eth"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/polygon_chain.svg`}
              alt="poly_mobile"
              className="poly"
            />
          </div>

          <div className="couple">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/bsc_mobile.svg`}
              alt="poly_mobile"
              className="bsc"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/solana_chain.svg`}
              alt="poly_mobile"
              className="sol"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default EconomyMobile
