import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const BGLeft = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 10%;
`

const BGRight = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 3%;
`
const BGMobileLeft = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 26%;
`

const BGMobileRight = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 14%;
`

const BGBlockchain = () => {
  const { width } = useWindowSize()
  return (
    <>
      {width > 900 ? (
        <>
          <BGLeft src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/bg-cubes/xoxdapp_left.svg`} />
          <BGRight src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/bg-cubes/xoxdapp_right.svg`} />
        </>
      ) : (
        <>
          <BGMobileLeft src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/bg-cubes/xoxdapp_mobile_left.svg`} />
          <BGMobileRight src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/home/bg-cubes/xoxdapp_mobile_right.svg`} />
        </>
      )}
    </>
  )
}

export default BGBlockchain
