import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { TOKENS_SUPPORT } from '../tokensSupport'

// images
export const TokenStandLogo = '/icons/tokenstand_circle_logo.png'

const ChevronDownIcon: any = (
  <svg
    viewBox="0 0 24 24"
    color="text"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
    className="Svg-sc-4ba21b47-0 GjBIu"
  >
    <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z" />
  </svg>
)

const ChevronUpIcon: any = (
  <svg
    viewBox="0 0 24 24"
    color="text"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
    className="Svg-sc-4ba21b47-0 GjBIu"
  >
    <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z" />
  </svg>
)

const FullyContainer = styled.div`
  width: 93px;
  position: relative;
  margin-left: 10px;
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  ${({ theme }) =>
    `background: none;
  border: 1px solid ${theme.colors.hr}`};
  width: 100%;
  color: ${({ theme }) => theme.colors.textSubTitle};
  .flex {
    display: flex;
  }
  .nested {
    width: 100%;
    align-items: center;
    text-align: left;
    padding: 10px 12px;
  }
  span {
    white-space: nowrap;
    margin-left: 8px;
  }
  @media (max-width: 576px) {
    font-size: 14px;
    img {
      width: 20px;
    }
    .nested {
      padding: 8px 12px;
    }
  }
`

const ImageWrapper = styled.div`
  position: relative;
  width: 20px;
  height: 20px;

  @media screen and (min-width: 576px) {
    width: 28px;
    height: 28px;
  }

  img {
    border-radius: 50%;
  }
`
const ChevronDownIconStyled = styled.div`
  stroke: #ccc;
  width: 16px;
  height: 16px;
  margin-left: auto;

  @media screen and (min-width: 576px) {
    width: 18px;
    height: 18px;
  }
`
const ChevronUpIconStyled = styled.div`
  stroke: #ccc;
  width: 16px;
  height: 16px;
  margin-left: auto;

  @media screen and (min-width: 576px) {
    width: 18px;
    height: 18px;
  }
`
const Select = styled.div`
  width: 100%;
  background: #0b0b0d;
  background: #f5f5f5;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 11px;
  position: absolute;
  top: 90%;
  left: 0;
  right: 0;
  transition: all 0.2s linear;
  button {
    width: 100%;
    height: 48px;
  }

  .title-token {
    color: #999;
    font-weight: 600;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 576px) {
      font-size: 16px;
    }
  }
  .active {
    background: #333;
    pointer-events: none;
  }
  div:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  div:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

const Option = styled.div`
  padding: 10px 0px;
  cursor: pointer;
`
type Props = {
  tokenSymbol?: any
  switchToken?: any
  isTokenFrom?: any
  inputChainId?: any
  isShowDrop?: any
  handleShowDrop?: any
}

const SelectTokenButton: React.FC<Props> = ({
  tokenSymbol,
  switchToken,
  isTokenFrom,
  inputChainId,
  isShowDrop,
  handleShowDrop,
}) => {
  const [listTokens, setListTokens] = useState(TOKENS_SUPPORT[inputChainId])

  useEffect(() => {
    setListTokens(TOKENS_SUPPORT[inputChainId])
  }, [inputChainId])

  return (
    <>
      <FullyContainer>
        {/* <Wrapper onClick={() => handleShowDrop()}> */}
        <Wrapper>
          <div className="flex nested" style={{ zIndex: 8 }}>
            <img
              className="rounded-full"
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/logo_xox_bridge.svg`}
              alt="XOX Logo"
              width={24}
              height={24}
            />
            <span>XOX</span>
          </div>
        </Wrapper>
      </FullyContainer>
    </>
  )
}

export default SelectTokenButton
