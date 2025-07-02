import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const BGLeft = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 10%;
`

const BGCubeLeft = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 17%;
  opacity: 0.3;
`

const BGRight = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 38%;
`

const BGCubeRight = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 48%;
  opacity: 0.3;
`

const BGMobileRight = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 53%;
  width: 100%;
`

const BGMobileCubeRight = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 54%;
`

const BGXOXDapp = () => {
  const { width } = useWindowSize()
  return (
    <>
      {width > 900 ? (
        <>
          <BGLeft src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/bg-cubes/xoxdapp_left.svg`} />
          <BGCubeLeft src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/bg-cubes/xoxdapp_cube_left.svg`} />
          <BGRight src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/bg-cubes/xoxdapp_right.svg`} />
          <BGCubeRight src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/bg-cubes/xoxdapp_cube_right.svg`} />
        </>
      ) : (
        <>
          <BGMobileRight
            src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/bg-cubes/xoxdapp_mobile_right_cube.svg`}
          />
          <BGMobileCubeRight
            src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/bg-cubes/xoxdapp_mobile_cube_right.svg`}
          />
        </>
      )}
    </>
  )
}

export default BGXOXDapp
