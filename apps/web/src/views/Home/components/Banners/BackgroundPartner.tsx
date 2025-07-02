import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const BGLeft = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 23%;
`

const BGRight = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 800px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(249, 124, 29, 0.2) 0.01%, rgba(249, 124, 29, 0) 100%);
`

const BGXOX = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 34.5%;
  // mix-blend-mode: multiply;
`

const BGXOXMobile = styled.img`
  position: absolute;
  z-index: -2;
  right: 0;
  top: 27.5%;
  // mix-blend-mode: multiply;
`

const BGMobile = styled.img`
  position: absolute;
  z-index: -2;
  right: 0;
  top: 25%;
  // background: radial-gradient(50% 50% at 50% 50%, rgba(249, 124, 29, 0.2) 0.01%, rgba(249, 124, 29, 0) 100%);
`

const BGMobileTow = styled.img`
  position: absolute;
  z-index: -2;
  left: 0;
  top: 63%;
`

const DevelopmentMapBG = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 30%;
  // mix-blend-mode: multiply;
`

const BGMobileCube = styled.img`
  position: absolute;
  z-index: -2;
  left: 0;
  top: 62.5%;
`

const BGPartner = () => {
  const { width } = useWindowSize()
  return (
    <>
      {width > 900 ? (
        <>
          <BGLeft src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/pl.svg`} />
          <DevelopmentMapBG
            src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/bg-cubes/development_map_left.svg`}
          />
          <BGRight src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/pr.svg`} />
          <BGXOX src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/xoxs_secured.svg`} />
        </>
      ) : (
        <>
          <BGMobile src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/bg_mobile.svg`} alt="bg_mobile" />
          <BGXOXMobile src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/xox_mobile_change.svg`} alt="xox_mobile" />
          <BGMobileTow src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/bg_mobile_2.svg`} alt="bg_mobile" />
          <BGMobileCube src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/bg_cube_mobile_2.svg`} alt="bg_mobile" />
        </>
      )}
    </>
  )
}

export default BGPartner
