import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const BallLeft = styled.img`
  position: absolute;
  left: 0;
  top: 16%;
  z-index: -1;
  background: radial-gradient(50% 50% at 50% 50%, rgba(5, 0, 255, 0.3) 0%, rgba(66, 0, 255, 0) 100%);
`
const BallRight = styled.img`
  position: absolute;
  right: 0;
  top: 16%;
  z-index: -1;
  background: radial-gradient(50% 50% at 50% 50%, rgba(5, 0, 255, 0.3) 0%, rgba(66, 0, 255, 0) 100%);
`
const BallMoon = styled.img`
  position: absolute;
  left: 0;
  top: 56%;
  z-index: -1;
  mix-blend-mode: overlay;
`

const BGMobile = styled.img`
  position: absolute;
  left: 0;
  top: 9%;
  z-index: -2;
  background: radial-gradient(50% 50% at 50% 50%, rgba(5, 0, 255, 0.3) 0%, rgba(66, 0, 255, 0) 100%);
`

const XOXMobile = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -2;
  mix-blend-mode: overlay;
  background: linear-gradient(180.35deg, #cb60ff 0.85%, #5b3c7e 101.93%);
`

const Backgroud = (): JSX.Element => {
  const { width } = useWindowSize()
  return (
    <>
      {width > 900 ? (
        <>
          <BallLeft src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/ball_left.svg`} alt="ball_left" />
          <BallRight src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/ball_right.svg`} alt="ball_left" />
          <BallMoon src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/comunity_xox_2.svg`} alt="ball_left" />
        </>
      ) : (
        <>
          <BGMobile src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/economy_bg.svg`} alt="ball_left" />
          <XOXMobile src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/economy_xox.svg`} alt="ball_left" />
        </>
      )}
    </>
  )
}

export default Backgroud
