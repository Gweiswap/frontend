/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { spawn } from 'child_process'
import React, { useState } from 'react'
import styled from 'styled-components'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional

// eslint-disable-next-line import/no-cycle
import { ISquareItem } from './FeatureSquare'

interface Iprops {
  item: ISquareItem
}

const Wrapper = styled.div`
  background: #242424;
  border-radius: 10px;
  width: 385px;
  padding: 24px 22px 32px;

  .main_container {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

    .get_xox {
      padding: 1px;
      width: fit-content;
      border-radius: 8px;
      background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);

      .boxed-child {
        width: 100%;
        height: 100%;
        background-color: #242424;
        padding: 10px 20px;
        border-radius: inherit;
        span {
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          font-weight: 700;
          font-size: 14px;
          width: 100%;
          height: 100%;
          background-color: #191a28;
          border-radius: inherit;
        }
      }
    }

    .expand {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      font-weight: 400;
      font-size: 16px;
      width: 100%;
      height: 100%;
      background-color: #191a28;
      border-radius: inherit;
    }
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.87);
  margin-top: 32px;
  line-height: 25px;

  @media screen and (max-width: 1546px) {
    font-size: 18px;
    line-height: 22px;
    margin-top: 24px;
  }
`

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 16px 0;
  line-height: 24px;
  @media screen and (max-width: 1546px) {
    font-size: 14px;
    line-height: 24px;
  }
`

const Icon = styled.div`
  background: linear-gradient(100.7deg, #6034ff 0%, #a35aff 100%);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const SquareItem = ({ item }: Iprops) => {
  const [isShowReadMore, setIsShow] = useState(item.description.length > 200)

  return (
    <Wrapper className="item">
      <div className="main_container">
        <div>
          <Icon>
            <img src={item.icon} alt="icon" />
          </Icon>
          <Title>{item.title}</Title>
          <Description>
            {isShowReadMore ? `${item.description.slice(0, 200)}...` : item.description}{' '}
            {item.description.length > 200 ? (
              <span onClick={() => setIsShow(!isShowReadMore)} style={{ cursor: 'pointer' }}>
                {isShowReadMore ? <span className="expand">Read more</span> : <span className="expand">Read less</span>}
              </span>
            ) : null}
          </Description>
        </div>
        <div className="get_xox">
          <div className="boxed-child">
            <span>Discover More</span>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SquareItem
