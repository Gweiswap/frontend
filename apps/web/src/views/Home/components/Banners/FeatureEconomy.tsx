import { Box, Grid } from '@mui/material'
import useWindowSize from 'hooks/useWindowSize'
import styled, { keyframes } from 'styled-components'
import EconomyMobile from './EconomyMobile'
import { useTranslation } from '@pancakeswap/localization'

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

const Wrapper = styled(Box)`
  margin-bottom: 100px;

  .paragraph {
    .title {
      font-weight: 700;
      font-size: 36px;
      line-height: 48px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 24px;
    }

    .description {
      font-weight: 400;
      font-size: 18px;
      line-height: 32px;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .main_card_content {
    display: grid;
    gap: 32px;
    width: fit-content;
    grid-template-columns: 1fr 1fr 1fr;
    position: relative;
    align-items: center;

    .chain_4 {
      margin-top: -217px;
      animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
      animation-delay: 0.66s;
    }

    .chain_1 {
      margin-top: 117px;
      animation: ${floatingAnim('4px', '12px')} 3s ease-in-out infinite;
      animation-delay: 0s;
    }

    .chain_2 {
      animation: ${floatingAnim('4px', '12px')} 3s ease-in-out infinite;
      animation-delay: 0s;
    }
  }

  .card_container {
    display: flex;
    flex-direction: column;
    animation: ${floatingAnim('6px', '5px')} 3s ease-in-out infinite;
    animation-delay: 0.33s;
    .chain_3 {
      margin-bottom: 32px;
    }
  }
`
const WrapText = styled.div`
  @media (min-width: 900px) {
    transform: translate(-430px);
    width: 500px;
  }
  @media (min-width: 1400px) {
    transform: translate(-610px);
    width: 700px;
  }
`

const FeatureEconomy = () => {
  const { width } = useWindowSize()
  const { t } = useTranslation()
  return (
    <>
      {width < 900 ? (
        <EconomyMobile />
      ) : (
        <Wrapper sx={{ flexGrow: 1, display: 'flex' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={11}>
              <div className="main_card_content">
                <img
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/chain_4.svg`}
                  alt="token-card"
                  className="chain_4"
                />

                <div className="card_container">
                  <img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/chain_3.svg`}
                    alt="token-card"
                    className="chain_3"
                  />
                  <img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/chain_2.svg`}
                    alt="token-card"
                    className="chain_2"
                  />
                </div>
                <img
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/chain_1.svg`}
                  alt="token-card"
                  className="chain_1"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={1}>
              <WrapText className="paragraph">
                <p className="title">{t('Built and Available on every leading blockchain.')}</p>
                <p className="description">
                  {t(
                    'Creating A Truly Decentralized Multichain Ecosystem with Unlimited possibilities. Supporting Defi and Web3 global adoption for a better future.',
                  )}
                </p>
              </WrapText>
            </Grid>
          </Grid>
        </Wrapper>
      )}
    </>
  )
}

export default FeatureEconomy
