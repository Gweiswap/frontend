/* eslint-disable react-hooks/exhaustive-deps */
import NotificationBanner from 'components/NotificationBanner'
import BannerCloseX from 'components/NotificationBanner/components/BannerCloseX'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Wrapper = styled.div`
  position: relative;
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);

  .btn-close {
    position: absolute;
    right: 7px;
    top: 7px;
    cursor: pointer;
    z-index: 1;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .btn-close {
      right: 17px;
      top: 7px;
    }
  }
`

const currentTimestamp = () => Math.round(new Date().getTime() / 1000)

interface ITimeLineArr {
  id: number
  name: string
  discription: string
  start: number
  end: number
  show?: boolean
  btnText: string
  href?: string
  pages?: string[]
}

export function useNotificationHandle() {
  const [bannerAllowed, setBannerAllowed] = useState<ITimeLineArr[]>([])
  const route = useRouter()

  const bannerTimeLineArr = () => {
    const checkTimeAllow: ITimeLineArr[] = TIMELINEARRAY.map((item) => {
      if (item.start <= currentTimestamp() && currentTimestamp() <= item.end) {
        return {
          ...item,
          show: true,
        }
      }
      return item
    })
    const bannerTimeAllow: ITimeLineArr[] = checkTimeAllow.filter(
      (item) => item.show === true && item.pages.includes(route.pathname),
    )
    setBannerAllowed(bannerTimeAllow)
    return bannerTimeAllow
  }

  useEffect(() => {
    bannerTimeLineArr()
  }, [route])

  return bannerAllowed.length ? (
    <Wrapper>
      <Swiper slidesPerView={1} autoplay={{ delay: 3000 }}>
        {bannerAllowed.map((item) => {
          return (
            <SwiperSlide>
              <NotificationBanner
                title={item.name}
                description={item.discription}
                btnText={item.btnText}
                href={item.href}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <span aria-hidden="true" onClick={() => setBannerAllowed([])} className="btn-close">
        <BannerCloseX />
      </span>
    </Wrapper>
  ) : null
}

const TIMELINEARRAY: ITimeLineArr[] = [
  {
    id: 1,
    name: '$20K in XOX Tokens Airdrop + 20K XOXS Giveaway is Live!',
    discription: 'Total Prize $40,000',
    btnText: 'Participate Now',
    href: 'https://gleam.io/UCxGB/40000-xox-airdrop-xoxs-giveaway',
    start: 1688644800,
    end: 1690981200,
    pages: ['/', '/company', '/tokenomics', '/dex-v2'],
  },
  {
    id: 2,
    name: 'How to invest in Pre-sale.',
    discription: 'Step-by-Step Tutorial.',
    btnText: 'Watch Now',
    href: '/#',
    start: 1689930542,
    end: 1691991200,
    pages: ['/pre-sales'],
  },
  {
    id: 3,
    name: 'Partners Sale is Live!',
    discription: '$130k Raised on Seed-sale. Min.entry: 20,000 USDT - 10% XOXS Bonus.',
    btnText: 'Participate',
    href: '/#',
    start: 1688644800,
    end: 1690981200,
    pages: ['/', '/company', '/tokenomics', '/dex-v2'],
  },
  {
    id: 4,
    name: 'Pre-sale is Coming!',
    discription: '$130k Raised on Seed-sale. Min.entry: 50 USDT',
    btnText: 'Learn More',
    href: '/#',
    start: 1688644800,
    end: 1690981200,
    pages: ['/', '/company', '/tokenomics', '/dex-v2'],
  },
  {
    id: 5,
    name: 'Pre-sale Round 1 is live',
    discription: '$130k Raised on Seed-sale. Min.entry: 50 USDT - 8% XOXS Bonus',
    btnText: 'Participate',
    href: '/pre-sales',
    start: 1688644800,
    end: 1690981200,
    pages: ['/', '/company', '/tokenomics', '/dex-v2'],
  },
  {
    id: 6,
    name: 'Pre-sale Round 2 is live',
    discription: '$118k Raised on Round 1. Min.entry: 50 USDT - 6% XOXS Bonus',
    btnText: 'Participate',
    href: '/pre-sales',
    start: 1688644800,
    end: 1690981200,
    pages: ['/', '/company', '/tokenomics', '/dex-v2'],
  },
  {
    id: 7,
    name: 'Pre-sale Round 3 is live',
    discription: '$162k Raised on Round 2. Min.entry: 50 USDT - 4% XOXS Bonus',
    btnText: 'Participate',
    href: '/pre-sales',
    start: 1688644800,
    end: 1690981200,
    pages: ['/', '/company', '/tokenomics', '/dex-v2'],
  },
  {
    id: 8,
    name: 'Public ICO is Live!',
    discription: '$487k Raised on Pre-sales.',
    btnText: 'Participate',
    href: '/#',
    start: 1688644800,
    end: 1690981200,
    pages: ['/', '/company', '/tokenomics', '/dex-v2'],
  },
  {
    id: 9,
    name: 'Public Launch Incoming!',
    discription: '$2,683,800 Already Raised. Launching on 6 chains (ETH,BSC,ARB,POLYGON,OPT,zkSync)',
    btnText: 'Learn More',
    href: '/#',
    start: 1688644800,
    end: 1690981200,
    pages: ['/', '/company', '/tokenomics', '/dex-v2'],
  },
]
