/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-boolean-value */
import styled from 'styled-components'
import 'swiper/css'
import SwiperCore, { Autoplay } from 'swiper'
import { useState } from 'react'

SwiperCore.use([Autoplay])

const SliderWrapper = styled.div<{ length: number }>`
  div.container {
    transition: all 0.3s ease;
  }
  div.container h1 {
    margin: 15px 0 0 0;
  }
  div.container h3 {
    margin: 0 0 25px 0;
  }
  @media (max-width: 992px) {
    padding: 0;
  }
  .slide-option {
    margin: 0 0 50px 0;
  }
  .slide-option .no-marg {
    margin: 0 0 0 0;
  }
  div.highway-slider-${({ length }) => length} {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 160px;

    @media (max-width: 560px) {
      height: 120px;
    }
  }
  div.highway-slider-${({ length }) => length} div.highway-barrier {
    overflow: hidden;
    position: relative;
  }
  div.highway-slider-${({ length }) => length} ul.highway-lane {
    display: flex;
    height: 100%;
  }
  div.highway-slider-${({ length }) => length} ul.highway-lane li.highway-car {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(${({ length }) => length * 3}, 1fr);
    gap: 64px;
    justify-content: center;
    align-items: center;
    color: #343434;

    a {
      display: block;
      width: 160px;
      height: 160px;
      position: relative;
    }
  }

  @keyframes translateinfinitetl {
    100% {
      transform: translateX(calc(-160px * ${({ length }) => length}));
    }
  }
  @keyframes translateinfinitetr {
    0% {
      transform: translateX(calc(-160px * ${({ length }) => length}));
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes scale1 {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  #infinite div.highway-barrier ul.highway-lane {
    width: calc(160px * ${({ length }) => length * 3});
    &:hover li.highway-car {
      animation-play-state: paused !important;
      position: relative;
    }

    img.icon-short {
      opacity: 1;
      height: 80px;
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
      z-index: 2;
    }

    img.icon-short:hover {
      opacity: 0;
    }

    img.icon-short + img {
      opacity: 0;
      height: 160px;
    }

    @media (max-width: 560px) {
      img.icon-short + img {
        opacity: 0;
        height: 120px;
      }
    }

    img.icon-short:hover + img {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      padding: 10px;
      opacity: 1;
    }

    // & img.partner:hover {
    //   animation: scale1 2.8s infinite;
    // }

    // & img {
    //   cursor: pointer;
    // }
  }
  #infinite.infinitetl div.highway-barrier ul.highway-lane li.highway-car {
    width: 160px;
    animation: translateinfinitetl 23s linear infinite;
  }
  #infinite.infinitetr div.highway-barrier ul.highway-lane li.highway-car {
    width: 160px;
    animation: translateinfinitetr 23s linear infinite;
  }
  #infinite.infinitetl.speed-20 div.highway-barrier ul.highway-lane li.highway-car {
    width: 160px;
    animation: translateinfinitetl 23s linear infinite;
  }
  #infinite.infinitetr.speed-20 div.highway-barrier ul.highway-lane li.highway-car {
    width: 160px;
    animation: translateinfinitetr 23s linear infinite;
  }
`

type Props = {
  items: any
  isMobile?: boolean
  type?: string
}

const Partner: React.FC<Props> = ({ items, isMobile, type }) => {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  return (
    <SliderWrapper length={items.length}>
      <div id="infinite" className={`${type} highway-slider highway-slider-${items.length}`}>
        <div className="container highway-barrier">
          <ul className="highway-lane">
            {[1, 2, 3].map(() =>
              items.map(({ iconName, href }) => {
                return (
                  <li className="highway-car" key={iconName}>
                    <a href={href} target="_blank">
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/${iconName}-short.svg`}
                        alt={iconName}
                        className="partner icon-short"
                      />
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/${iconName}-full.svg`}
                        alt={iconName}
                        className="partner icon-full"
                      />
                    </a>
                  </li>
                )
              }),
            )}
            {isMobile &&
              items.map(({ iconName, href }) => {
                return (
                  <li className="highway-car" key={iconName}>
                    <a href={href} target="_blank">
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/${iconName}-short.svg`}
                        alt={iconName}
                        className={isHovering ? 'partner' : ''}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      />
                    </a>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </SliderWrapper>
  )
}

export default Partner
