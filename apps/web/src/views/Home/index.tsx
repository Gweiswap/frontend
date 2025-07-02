import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { PageMeta } from 'components/Layout/Page'
import AOS from 'aos'
import { Application } from '@splinetool/runtime'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import useWindowSize from 'hooks/useWindowSize'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import BallPurple from './components/BallPurple'
import WelcomeXOX from './components/Banners/WelcomeXOX'
import FeatureWatch from './components/Banners/FeatureWatch'
import FeaturePlant from './components/Banners/FeaturePlant'
import RoadMap from './components/Banners/RoadMap'
import Partners from './components/Partners'
import Community from './components/Banners/Community'
// import FeatureEconomy from './components/Banners/FeatureEconomy'
import BackgroudWatch from './components/Banners/BackgroundWatch'
import FeatureReferal from './components/Banners/FeatureReferal'
import UpComing from './components/Banners/FeatureUpComing'
import SecuredBy from './components/Banners/SecuredBy'
import BGPartner from './components/Banners/BackgroundPartner'
import BGSecured from './components/Banners/BackgroundSecured'
import BGXOXDapp from './components/Banners/BackgroundXOXDapp'
import BGBlockchain from './components/Banners/BackgroundBlockchain'
import FeatureSquare from './components/Banners/FeatureSquare'
import Subscription from './components/Banners/Subscription'
import SupportedBlockchains from './components/Banners/SupportedBlockchains'
import PopupPreSale from './components/PopupPreSale'
import EcosystemPartners from './components/EcosystemPartners'

export const StyledSection = styled(PageSection)`
  padding-top: 16px;
  padding: 0px 21px;
  padding-left: 0;
  padding-right: 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0px 50px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 0px 130px;
  }
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { width: innerWidth, height: innerHeight } = useWindowSize()
  const { isDesktop } = useMatchBreakpoints()
  const widthResize = innerWidth > 1400 ? 1400 : innerWidth > 900 ? 1200 : '100%'
  useEffect(() => {
    AOS.init({ duration: 2000 })
  }, [])
  return (
    <>
      {/* <PageMeta /> */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        #home .page-bg {
          background: #0a0a0a;
        }

        #portal-root {
          z-index: 9999;
          position: fixed;
        }
      `}</style>
      <StyledSection
        innerProps={{
          style: {
            margin: '0',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            justifyContent: innerWidth > 900 ? 'space-around' : 'unset',
            width: widthResize,
            height: 'fit-content',
          },
        }}
        containerProps={{
          id: 'home',
          style: {
            height: 'fit-content',
          },
        }}
        innerClass="welcome"
        index={3}
        hasCurvedDivider={false}
      >
        <div>
          <WelcomeXOX />
        </div>
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: widthResize } }}
        containerProps={{
          id: 'home',
        }}
        index={1}
        hasCurvedDivider={false}
      >
        <BGBlockchain />
        <BGXOXDapp />
        <div style={{ width: widthResize }}>
          <SupportedBlockchains />
          <EcosystemPartners />
          <FeatureSquare />
          <FeatureWatch />
          <FeaturePlant />
          <FeatureReferal />
        </div>
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: widthResize } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <BGSecured />
        <BGPartner />
        <div style={{ width: widthResize }}>
          <Partners />
          <SecuredBy />
          <UpComing />
          <RoadMap />
          <Community />
          <Subscription />
        </div>
      </StyledSection>
      <PopupPreSale />
    </>
  )
}

export default Home
