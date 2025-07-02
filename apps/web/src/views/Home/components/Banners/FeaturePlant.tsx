/* eslint-disable react/no-unescaped-entities */
import { Box, Grid } from '@mui/material'
import { useTranslation } from '@pancakeswap/localization'
import useWindowSize from 'hooks/useWindowSize'
import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useInView } from 'react-intersection-observer'

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

const Wrapper = styled.div`
  display: flex;
  gap: 64px;
  margin-top: 100px;
`

const LeftContent = styled.div`
  .list {
    display: grid;
    grid-template-columns: 370px 250px;
    column-gap: 40px;
    row-gap: 16px;

    .icon_stone {
      // margin-right: 16px;
    }

    p {
      display: flex;
      align-items: center;
    }

    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }
  .title_list_item {
    font-weight: 400;
    font-size: 18px;
    margin-left: 16px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 32px;
    @media screen and (max-width: 900px) {
      font-size: 16px;
      line-height: 19px;
    }
  }
`

const RightContent = styled.div`
  padding-left: 50px;

  .video-container {
    position: relative;
    outline: none;
    border: none;
    line-height: 0;

    &:focus {
      outline: none;
    }
    .overlay {
      height: 500px;
      width: 500px;
      border-radius: 50%;
      position: absolute;
      top: 0px;
      left: 99px;
      z-index: -2;
      background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(249, 124, 29, 0.5) 0%,
        rgba(246, 99, 42, 0.5) 0.01%,
        rgba(249, 124, 29, 0) 100%
      );
      opacity: 0.5;
      scale: 1.3;

      @media screen and (max-width: 900px) {
        width: 100%;
        left: unset;
      }

      @media screen and (max-width: 576px) {
        height: 260px;
      }
    }
  }

  .video-container video {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 45vw;
    height: auto;
    outline: none;
    border: none;
    max-height: 470px;
    max-width: 670px;

    &:focus {
      outline: none;
    }

    @media screen and (max-width: 900px) {
      width: 100%;
      height: auto;
      left: unset;
      padding-left: 0;
    }

    @media screen and (max-width: 576px) {
      height: 280px;
      transform: scale(1.5);
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
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  line-height: 32px;

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 24px;
  }
`

const Watch = styled.div`
  position: relative;

  .x3 {
    position: absolute;
    right: 0;
    z-index: -1;
    animation: ${floatingAnim('4px', '12px')} 3s ease-in-out infinite;
    animation-delay: 0s;
  }
  .x2 {
    position: absolute;
    top: 50px;
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
    left: 30%;
    top: -30px;
    z-index: -3;
    animation: ${floatingAnim('6px', '10px')} 3s ease-in-out infinite;
    animation-delay: 0.66s;
  }
`

const FeaturePlant = () => {
  const { t } = useTranslation()
  const [videoUrl, setVideoUrl] = useState('')
  const { ref, inView } = useInView({ threshold: 1 })

  useEffect(() => {
    if (inView) setVideoUrl(`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/home/3d_xox`)
  }, [inView])

  const dboxVideo = document.getElementById('3dboxVideo') as any

  useEffect(() => {
    if (!dboxVideo) return
    dboxVideo.play()
  }, [dboxVideo])

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LeftContent data-aos="fade-right">
            <Title>
              {t('XOX Dapp - An All-IN-One Solution')}
              <span style={{ color: '#FB8618' }}>.</span>
            </Title>
            <Paragraph style={{ margin: '24px 0' }}>
              {t(
                "The XOX Multi-chain Dapp is designed to offer user-friendly solutions to our XOX holders and users. We are continuously working on enhancing our Dapp's functionalities to make it a comprehensive one-stop solution for crypto traders. Our current features include:",
              )}
            </Paragraph>

            <div className="list">
              {listTag.map(({ title }) => {
                return (
                  <p key={title}>
                    <span>
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/icon-stone.svg`}
                        alt="icon-stone"
                        className="icon_stone"
                      />
                    </span>
                    <span className="title_list_item">{t(title)}</span>
                  </p>
                )
              })}
            </div>
          </LeftContent>
        </Grid>
        <Grid item xs={12} md={5} sx={{ height: '300px', minHeight: '300px', overflow: 'visible' }}>
          <RightContent data-aos="fade-left">
            <div className="video-container">
              <div className="overlay" />
              <video
                autoPlay
                loop
                muted
                playsInline
                id="3dboxVideo"
                controls={false}
                preload="yes"
                style={{ pointerEvents: 'none' }}
                ref={ref}
              >
                {videoUrl && (
                  <>
                    <source
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/home/3d_xox.mov`}
                      type='video/mp4; codecs="hvc1"'
                    />
                    <source src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/home/3d_xox.webm`} type="video/webm" />
                  </>
                )}
              </video>
            </div>
          </RightContent>
        </Grid>
      </Grid>
    </Box>
  )
}

const listTag = [
  {
    title: 'Multi Chain Hybrid Swap',
  },
  {
    title: 'XOXS Staking',
  },
  {
    title: 'Gamified Stable Coin Referral Program',
  },
  {
    title: 'Assets/Portfolio Tracker',
  },
  {
    title: 'Liquidity Farming',
  },
  {
    title: 'Bridge',
  },
  {
    title: 'Lottery',
  },
]

export default FeaturePlant
