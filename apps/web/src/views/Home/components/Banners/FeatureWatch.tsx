import { Box, Grid } from '@mui/material'
import { useTranslation } from '@pancakeswap/localization'
import { Application } from '@splinetool/runtime'
import useWindowSize from 'hooks/useWindowSize'
import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const LeftContent = styled.div`
  // display: flex;
  // justify-content: center;
  // width: 100%;
  // position: relative;
  // height: 343px;
  // @media screen and (min-width: 900px) {
  //   align-items: center;
  //   height: 100%;
  // }

  // #canvas3d_xoxs_logo_pc {
  //   position: absolute;
  //   transform: scale(1.3);

  //   @media screen and (max-width: 900px) {
  //     height: 100% !important;
  //     width: 100% !important;
  //     transform: scale(1);
  //     left: 50%;
  //     transform: translate(-53%, 0);
  //   }
  // }

  // @media screen and (max-width: 900px) {
  //   overflow-x: hidden;
  // }
`

const RightContent = styled.div`
  margin-left: 100px;

  @media (max-width: 560px) {
    margin-left: 0px;
  }
  .list {
    .main_content {
      display: flex;
      margin-bottom: 16px;
      align-items: center;
      .img-container {
        min-width: 23px;
      }
    }
  }

  .title_list_item {
    font-weight: 400;
    font-size: 16px;
    margin-left: 16px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 32px;
    @media screen and (max-width: 900px) {
      margin-left: 0px;
      font-size: 15px;
      line-height: 19px;
    }
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  color: rgba(255, 255, 255, 0.87);

  @media screen and (max-width: 900px) {
    font-size: 20px;
    line-height: 32px;
  }
`

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.6);

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 24px;
  }
`

const Wrapper = styled(Box)`
  margin-bottom: 100px;

  @media screen and (max-width: 900px) {
    margin-bottom: 40px;
  }
`

const Main = styled(Grid)`
  .first-box {
    height: 300px;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse important;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 576px) {
    .first-box {
      order: 1;
      height: 500px;
    }

    .second-box {
      order: 0;
    }

    .img-container,
    .title_list_item {
      order: unset;
    }
  }
`

const ImageWrapper = styled.video`
  width: 117%;
  height: 74vh;
  display: grid;
  place-content: center;
  transform: scale(2) translateY(-30px);

  ${({ theme }) => theme.mediaQueries.md} {
    img {
    }
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    img {
      transform: scale(5) translateY(-30px);
    }
  }
`
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
const Watch = styled.div`
  position: relative;

  .x3 {
    position: absolute;
    right: 5px;
    top: 200px;
    z-index: -1;
    animation: ${floatingAnim('4px', '12px')} 3s ease-in-out infinite;
    animation-delay: 0s;
  }
  .x2 {
    position: absolute;
    top: 90px;
    left: 20%;
    z-index: -2;
    animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
    animation-delay: 0.33s;

    @media screen and (max-width: 900px) {
      left: 0;
    }
  }
  .x1 {
    position: absolute;
    right: 10%;
    top: -20px;
    z-index: -3;
    animation: ${floatingAnim('6px', '10px')} 3s ease-in-out infinite;
    animation-delay: 0.66s;
  }
`

const FeatureWatch = () => {
  const { t } = useTranslation()
  const { width } = useWindowSize()

  // useEffect(() => {
  //   const canvas = document.getElementById('canvas3d_xoxs_logo_pc')
  //   if (canvas) {
  //     const app = new Application(canvas as any)
  //     app.load('https://prod.spline.design/eHWlbskKUlvFMGuG/scene.splinecode')
  //   }
  // }, [])

  return (
    <Wrapper sx={{ display: 'flex' }}>
      <Main container spacing={2} style={{ overflow: 'hidden' }} sx={{ display: 'flex' }}>
        <Grid item xs={12} md={5} className="first-box">
          <LeftContent data-aos="fade-right">
            <Watch>
              {width > 900 ? (
                <>
                  <img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/meet-xoxs/x3.svg`}
                    alt="x3"
                    className="x3"
                  />
                  <img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/meet-xoxs/x2.svg`}
                    alt="x2"
                    className="x2"
                  />
                  <img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/meet-xoxs/x1.svg`}
                    alt="x1"
                    className="x1"
                  />
                </>
              ) : (
                <>
                  <img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/meet-xoxs/mobile_x2.svg`}
                    alt="x3"
                    className="x3"
                  />
                  <img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/meet-xoxs/mobile_x3.svg`}
                    alt="x2"
                    className="x2"
                  />
                  <img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/meet-xoxs/mobile_x1.svg`}
                    alt="x1"
                    className="x1"
                  />
                </>
              )}
            </Watch>
          </LeftContent>
        </Grid>
        <Grid item xs={12} md={7} className="second-box">
          <RightContent data-aos="fade-left">
            <Title>
              {t('Meet XOXS')}
              <span style={{ color: '#FB8618' }}>.</span> {t('Our Hybrid Multichain Stable Coin')}
              <span style={{ color: '#FB8618' }}>.</span>
            </Title>
            <Paragraph style={{ margin: '24px 0' }}>
              {t(
                'Our XOXS token is specifically designed as a staking substitute for our governance token XOX. We have extensively studied staking behavior, chart patterns, and the impact of high APYs followed by high selling pressure from stakers. By implementing Stable Coins such as USDT and USDC, we have developed a passive income strategy that prevents supply inflation and selling pressure. Here are some facts about XOXS:',
              )}
            </Paragraph>

            <div className="list">
              {listTag.map(({ title }) => {
                return (
                  <div className="main_content" key={title}>
                    <div className="img-container">
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/icon-stone.svg`}
                        alt="icon-stone"
                        className="icon_stone"
                      />
                    </div>
                    <span className="title_list_item" style={{ lineHeight: '24px' }}>
                      {t(title)}
                    </span>
                  </div>
                )
              })}
            </div>
          </RightContent>
        </Grid>
      </Main>
    </Wrapper>
  )
}

const listTag = [
  {
    title:
      'XOXS can only be obtained by purchasing our governance token XOX, and is provided as a bonus with auto-staking functionalities and flexible APY.',
  },
  {
    title: 'XOXS can also be earned through community activities such as giveaways and completing tasks.',
  },
  {
    title:
      'XOXS ensures long-term sustainability, providing a risk-free and profitable experience for both token holders and the project.',
  },
  {
    title:
      'By implementing Stable Coins such as USDT and USDC, XOXS offers a stable and sustainable source of passive income for users.',
  },
]

export default FeatureWatch
