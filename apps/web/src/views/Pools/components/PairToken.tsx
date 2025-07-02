import styled from 'styled-components'

interface IProps {
  width?: number | string
  height?: number | string
  linkTokenFirst?: string
  linkTokenSecond?: string
  symbolTokenFirst?: string
  symbolTokenSecond?: string
}

const ContainerPair = styled.div`
  width: 48px;
  height: 24px;
  position: relative;
  .token_first {
    position: absolute;
    left: 0;
    z-index: 2;
  }
  .token_second {
    position: absolute;
    right: 7px;
  }
`
const Img = styled.img`
  object-fit: cover;
  border-radius: 50%;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .pair {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.87);
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
  @media screen and (max-width: 576px) {
    margin-bottom: 16px;
  }
`

const PairToken = ({
  width = 24,
  height = 24,
  linkTokenFirst,
  linkTokenSecond,
  symbolTokenFirst = 'XOX',
  symbolTokenSecond = 'USDC',
}: IProps) => {
  return (
    <Wrapper>
      <ContainerPair>
        <Img
          src={linkTokenFirst || `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/xox_token_pair.svg`}
          alt="icon"
          height={height}
          width={width}
          className="token_first"
        />
        <Img
          src={
            linkTokenSecond ||
            `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg`
          }
          alt="icon"
          height={height}
          width={width}
          className="token_second"
        />
      </ContainerPair>
      <span className="pair">
        {symbolTokenFirst} - {symbolTokenSecond}
      </span>
    </Wrapper>
  )
}

export default PairToken
