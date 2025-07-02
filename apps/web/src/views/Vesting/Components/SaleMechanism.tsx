/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-cycle */
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useWindowSize from 'hooks/useWindowSize'
import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { A11y, Navigation, Pagination } from 'swiper'
import { useTranslation } from '@pancakeswap/localization'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { IVestingTime } from '..'
import VestingSchedule from './MainInfoTab/VestingSchedule'
import YourInfo from './MainInfoTab/YourInfo'
import PrivateSale from './MechanismTab/PrivateSale'
import ReferralProgram from './MechanismTab/ReferralProgram'
import TokenMetrics from './MechanismTab/TokenMetrics'

interface IProps {
  tabSaleMechanism: string[]
  tabActiveMechansim: number
  setTabActiveMechansim: (tabActiveMechansim: number) => void
  initialTokenMetrics: any[]
  dataInfo: any[]
  dataRefInfo: any
  dataTransaction: any[]
  dataTransactionClaimOfUser: any[]
  dataVesting: IVestingTime[]
  handleClaim: (round: number, remainning: number) => void
  handleGetDataVesting: () => void
}

interface IPropsWrapper {
  isMore?: boolean
}

const Wrapper = styled.div<IPropsWrapper>`
  position: relative;
  padding: 24px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin-top: 24px;
  margin-bottom: 24px;

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-left: 1px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-right: 1px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .overlay_learmore {
    position: absolute;
    width: 100%;
    height: 290px;
    background: linear-gradient(360deg, #0a0a0a 16.15%, rgba(22, 20, 44, 0) 100%);
    border-radius: 0px 0px 20px 20px;
    bottom: 0;
    left: 0;
    z-index: 9;
  }

  .btn_learnmore {
    position: absolute;
    padding: 10px 20px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 8px;
    background: transparent;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
  }

  @keyframes MoveDown {
    0%,
    100% {
      bottom: 20px;
    }
    50% {
      bottom: 10px;
    }
  }

  @keyframes MoveUp {
    0%,
    100% {
      top: 0px;
    }
    50% {
      top: 10px;
    }
  }

  .fi_chevrons-down {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    animation: MoveDown 2s linear infinite;
  }

  .container_learnless {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    & > div {
      width: max-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        max-width: 24px;
        position: absolute;
        transform: rotate(180deg);
        top: 0;
        margin-bottom: 6px;
        animation: MoveUp 2s linear infinite;
      }
      button {
        padding: 10px 20px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 8px;
        background: transparent;
        margin-top: 40px;
      }
    }
  }

  @media screen and (max-width: 900px) {
    height: ${({ isMore }) => (isMore ? 'auto' : '540px')};
    overflow-y: hidden;
  }
`
const Content = styled.div`
  .item-tab-mechanism {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    padding: 10px 20px;
    color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    white-space: nowrap;
    &:hover {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      color: #ffffff;
      border-radius: 30px;
    }
  }

  .item-tab-mechanism.active {
    position: relative;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    border-radius: 30px;
    color: #ffffff;

    @media screen and (max-width: 900px) {
      &::before {
        content: '';
        position: absolute;
        background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/prev-tab.png);
        top: 12px;
        left: -14px;
        color: rgba(255, 255, 255, 0.38);
        width: 8px;
        height: 10px;
      }

      &::after {
        content: '';
        position: absolute;
        background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/next-tab.png);
        top: 12px;
        right: -14px;
        color: rgba(255, 255, 255, 0.38);
        width: 8px;
        height: 10px;
      }
    }
  }

  .item-tab-mechanism_0.active {
    &::before {
      height: 0px;
    }
  }

  .item-tab-mechanism_4.active {
    &::after {
      height: 0px;
    }
  }

  .tab-mechanism {
    display: flex;
    width: fit-content;
    cursor: pointer;
    justify-content: center;
    background: #131313;
    border-radius: 30px;

    > div:nth-child(even) {
      margin: 0px 8px;
    }

    @media screen and (max-width: 1200px) {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      > div:nth-child(even) {
        margin: 0px 17px;
      }
      &::-webkit-scrollbar {
        display: none;
      }
      .item-tab-mechanism {
        scroll-snap-align: center;
        font-size: 12px;
        line-height: 15px;
      }
    }

    @media screen and (max-width: 900px) {
      justify-content: flex-start;
    }
  }

  .swiper.swiper-initialized {
    background: #131313;
    border-radius: 30px;
  }

  .swiper-wrapper {
  }

  .swiper-button-next {
    z-index: 999;
    background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/new_next.svg);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    border-radius: 50%;
  }

  .swiper-button-next::after {
    display: none;
  }

  .swiper-button-prev {
    background-image: url(${process.env.NEXT_PUBLIC_ASSETS_URI}/images/new_prev.svg);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
  }

  .swiper-button-prev::after {
    display: none;
  }
`

function SaleMechanism({
  tabSaleMechanism,
  tabActiveMechansim,
  setTabActiveMechansim,
  initialTokenMetrics,
  dataInfo,
  dataRefInfo,
  dataTransaction,
  dataVesting,
  handleClaim,
  dataTransactionClaimOfUser,
  handleGetDataVesting,
}: IProps) {
  const { width } = useWindowSize()
  const { account } = useActiveWeb3React()
  const [isMore, setIsMore] = useState(false)
  const swiperRef = useRef(null)
  const { t } = useTranslation()

  const renderBody = useMemo(() => {
    switch (tabActiveMechansim) {
      case 2:
        return <ReferralProgram />
      case 3:
        return <TokenMetrics initialTokenMetrics={initialTokenMetrics} />
      case 4:
        return (
          <VestingSchedule
            dataVesting={dataVesting}
            handleClaim={handleClaim}
            handleGetDataVesting={handleGetDataVesting}
          />
        )
      case 0:
        return (
          <YourInfo
            dataInfo={dataInfo}
            dataRefInfo={dataRefInfo}
            dataTransaction={dataTransaction}
            dataTransactionClaimOfUser={dataTransactionClaimOfUser}
          />
        )
      default:
        return <PrivateSale />
    }
  }, [
    dataInfo,
    dataRefInfo,
    dataTransaction,
    dataTransactionClaimOfUser,
    dataVesting,
    handleClaim,
    handleGetDataVesting,
    initialTokenMetrics,
    tabActiveMechansim,
  ])

  const renderRemore = useMemo(() => {
    return (
      <>
        {width <= 900 && isMore && (
          <div className="container_learnless">
            <div>
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/fi_chevrons-down.png`}
                alt="fi_chevrons-down"
                className="fi_chevrons-up"
              />
              <button type="button" className="btn_learnless" onMouseDown={() => setIsMore(false)}>
                {t('Learn Less')}
              </button>
            </div>
          </div>
        )}

        {width <= 900 && !isMore && (
          <div className="overlay_learmore">
            <button type="button" className="btn_learnmore" onClick={() => setIsMore(true)}>
              {t('Learn More')}
            </button>
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/fi_chevrons-down.svg`}
              alt="fi_chevrons-down"
              className="fi_chevrons-down"
            />
          </div>
        )}
      </>
    )
  }, [width, isMore])

  useEffect(() => {
    const tabActiveMechansimTemp = tabActiveMechansim % 5
    document
      .getElementById('tab-mechanism-wrapper')
      .scrollTo({ left: 150 * tabActiveMechansimTemp, behavior: 'smooth' })
  }, [tabActiveMechansim])

  return (
    <Wrapper isMore={isMore}>
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <Content>
        {
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div className="tab-mechanism" id="tab-mechanism-wrapper">
              {Array.from(tabSaleMechanism).map((item, index) => {
                return (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className={
                      tabActiveMechansim === index
                        ? `item-tab-mechanism item-tab-mechanism_${index} active`
                        : `item-tab-mechanism item-tab-mechanism_${index}`
                    }
                    onClick={() => setTabActiveMechansim(index)}
                    aria-hidden="true"
                  >
                    {t(item)}
                  </div>
                )
              })}
            </div>
          </div>
        }
        <div className="body">{renderBody}</div>
      </Content>
      {!account && (tabActiveMechansim === 4 || tabActiveMechansim === 0)
        ? null
        : tabActiveMechansim === 4 && dataVesting.length === 0
        ? null
        : renderRemore}
    </Wrapper>
  )
}

export default SaleMechanism
