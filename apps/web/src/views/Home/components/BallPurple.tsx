import styled, { CSSProperties } from 'styled-components'

interface Iprops {
  src: string
  css?: CSSProperties
}

const StyledImage = styled.img`
  position: absolute;
  z-index: -1;

  @media screen and (max-width: 900px) {
    top: 40%;
  }
`

const BallPurple = ({ src }: Iprops): JSX.Element => {
  return (
    <>
      <StyledImage src={src} alt="ball_purple" style={{ right: 0 }} />
    </>
  )
}

export default BallPurple
