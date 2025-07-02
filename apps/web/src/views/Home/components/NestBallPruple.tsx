import styled from 'styled-components'

const MoonBall = styled.img`
  position: absolute;
  left: 0;
  top: 451px;
`

const BackgroundPurple = styled.img`
  position: absolute;
  left: 0;
  top: 200px;
`

const NestedBall = (): JSX.Element => {
  return (
    <>
      <BackgroundPurple src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/bg-purple.svg`} alt="bg-purple" />
      <MoonBall src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/moon-ball.svg`} alt="moon-ball" />
    </>
  )
}
export default NestedBall
