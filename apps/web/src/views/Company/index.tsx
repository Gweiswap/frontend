import { Tooltip } from '@mui/material'
import { useTranslation } from '@pancakeswap/localization'
import { Box, useTooltip } from '@pancakeswap/uikit'
import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'
import MenberMobile from './components/MenberMobile'
import MenberPC from './components/MenberPC'
import Advisors from './components/Advisors'

export const StyledS = styled('div')`
  margin: 48px auto 100px auto;
  padding: 0 24px;

  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 576px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 852px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    max-width: 968px;
    padding: 0;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    max-width: 1080px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    max-width: 1200px;
  }
  @media screen and (min-width: 1400px) {
    max-width: 1400px;
  }
`

const BG = styled.div`
  background: #0a0a0a;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
`

const StyledSectionText = styled('div')`
  text-align: center;
  width: 100%;

  > h3 {
    color: rgba(255, 255, 255, 0.87);
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 8px;
  }

  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    padding: 0px;
    color: rgba(255, 255, 255, 0.6);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    > h3 {
      line-height: 24px;
      margin-bottom: 18px;
    }
    > p {
      font-size: 18px;
      line-height: 32px;
      padding: 0px 36px;
    }
  }
`

const StyledHeader = styled('div')`
  position: relative;
  margin-bottom: 97px;
  > div:nth-child(1) {
    border: 1px solid rgba(242, 242, 242, 0.4);
    border-radius: 20px;
    margin-bottom: 30px;

    > video {
      width: 750px;
      max-width: 100%;
      margin-bottom: 0px;
    }
  }

  > div:nth-child(2) {
    > img {
      display: block;
      margin: 0px auto;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 116px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div:nth-child(1) {
      border: 1px solid rgba(242, 242, 242, 0.4);
      border-radius: 20px;
      margin-bottom: 0px;

      > video {
        margin-bottom: 30px;
      }
    }
  }
`

const StyledPreviewVideo = styled('div')``

export const StyledCard = styled('div')`
  position: relative;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 16px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-width: 1px;
    border-radius: inherit;
    border-color: white;
    border-style: solid;
    mask: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
  }
`

const StyledSocial = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`

const StyledCardSocial = styled(StyledCard)`
  text-align: center;
  padding: 22px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  > div:nth-child(1) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(95deg, rgba(184, 9, 181, 1) 0%, rgba(237, 28, 81, 1) 50%, rgba(255, 176, 0, 1) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    > img {
      width: 33px;
      height: 33px;
    }
  }

  > div:nth-child(2) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  h4 {
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    text-aligh: center;
    width: 100%;
  }

  p {
    position: relative;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: rgba(255, 255, 255, 0.6);
    text-aligh: center;
    width: 100%;

    > span {
      margin-right: 4px;
    }

    > img {
      width: 10px;
      transform: translateY(-5px);
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    gap: 24px;
    padding: 24px 32px;
    height: initial;

    > div:nth-child(1) {
      width: 90px;
      height: 90px;

      > img {
        width: 50px;
        height: 50px;
      }
    }

    h4 {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 16px;
      text-align: left;
    }

    .social_name {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: #ffffff;
    }

    p {
      font-size: 16px;
      line-height: 24px;
      text-align: left;

      > span {
        margin-left: 6px;
        margin-right: 6px;
      }

      > img {
        width: initial;
      }
    }
  }
`

const StyledTitle = styled('h1')`
  font-size: 20px;
  line-height: 32px;
  font-weight: 700;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  margin-bottom: 8px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 16px;
  }
`

export const StyledSubtitle = styled('p')`
  font-weight: 400;
  text-align: center;
  color: #fb8618;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 40px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 48px;
    font-size: 16px;
    line-height: 19px;
  }
`

const StyledLearnMore = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(95deg, rgba(184, 9, 181, 1) 0%, rgba(237, 28, 81, 1) 50%, rgba(255, 176, 0, 1) 100%);
  padding: 24px;
  border-radius: 20px;

  > h1 {
    max-width: 490px;
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 32px;
  }

  > a {
    padding: 12px 30px;
    background: #ffffff;
    border-radius: 12px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-transform: uppercase;
    color: #000000;

    &:hover {
      background: #000000;
      color: #ffffff;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > h1 {
      font-size: 20px;
      line-height: 32px;
      margin-bottom: initial;
      white-space: nowrap;
    }

    > a {
      padding: 16px 40px;
      font-size: 18px;
      line-height: 22px;
    }
  }
`

const StyledBG = styled('div')`
  position: relative;
  z-index: -1;

  > div {
    position: absolute;
    top: 0;
    left: 0;
  }
`

interface ISocial {
  icon: string
  name: string
  link: string
  heft: string
}

export function CardSocial({ social, ...props }: { social: ISocial }) {
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <span style={{ whiteSpace: 'nowrap' }}>{t('Under Development')}</span>,
    {
      placement: 'top',
      hideTimeout: 0,
    },
  )

  return (
    <a
      href={social.heft === '#' ? null : social.heft}
      target="_blank"
      rel="noreferrer"
      style={{ display: 'inline-block', cursor: 'pointer' }}
    >
      {tooltipVisible && tooltip}
      {social.heft === '#' ? (
        <StyledCardSocial {...props} ref={targetRef}>
          <div>
            <img src={social.icon} alt="" draggable="false" loading="lazy" />
          </div>
          <div>
            <h4 className="social_name">{social.name}</h4>
            <p style={{ whiteSpace: 'nowrap' }}>
              <span>•</span>
              {social.link}{' '}
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/ArrowUpRight.svg`}
                alt=""
                draggable="false"
                loading="lazy"
              />
            </p>
          </div>
        </StyledCardSocial>
      ) : (
        <StyledCardSocial {...props}>
          <div>
            <img src={social.icon} alt="" draggable="false" loading="lazy" />
          </div>
          <div>
            <h4 className="social_name">{social.name}</h4>
            <p style={{ whiteSpace: 'nowrap' }}>
              <span>•</span>
              {social.link}{' '}
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/ArrowUpRight.svg`}
                alt=""
                draggable="false"
                loading="lazy"
              />
            </p>
          </div>
        </StyledCardSocial>
      )}
    </a>
  )
}

export function BTNLearnMore() {
  const { t } = useTranslation()
  return (
    <StyledLearnMore>
      <h1>{t('Learn More about the XOX labs Multi-chain Ecosystem.')}</h1>

      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="https://docs.xoxlabs.io" target="_blank" rel="noreferrer">
        {t('Learn More')}
      </a>
    </StyledLearnMore>
  )
}

export default function CompanyPage() {
  const { t } = useTranslation()
  const { width } = useWindowSize()

  const SOCIALS: Array<ISocial> = [
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/1.svg`,
      name: t('XOX Dex V1'),
      link: t('Trade Now'),
      heft: '/swap',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/2.svg`,
      name: t('Referral Program'),
      link: t('Earn Now'),
      heft: '/referral',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/3.svg`,
      name: t('Bridge'),
      link: t('Bridge Now'),
      heft: '/bridge-token',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/4.svg`,
      name: t('Stable Coin'),
      link: t('Stake Now'),
      heft: '/stable-coin',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/5.svg`,
      name: t('Liquidity Mining'),
      link: t('Earn Now'),
      heft: '/liquidity',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/6.svg`,
      name: t('Yield farming'),
      link: t('Earn Now'),
      heft: '/pools',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/7.svg`,
      name: t('Assets Manager'),
      link: t('Explore Now'),
      heft: '/info',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/1.svg`,
      name: t('XOX Dex V2'),
      link: t('Best Rates on DeFi'),
      heft: '/dex-v2',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/8.svg`,
      name: t('XOX Mobile App'),
      link: t('Your Defi Key'),
      heft: '#',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/9.svg`,
      name: t('XOX Launchpad'),
      link: t('Invest Now'),
      heft: '#',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/10.svg`,
      name: t('Coin Listing Site'),
      link: t('Don’t Miss Out'),
      heft: '#',
    },
    {
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/11.svg`,
      name: t('Lottery Game'),
      link: t('Risk Small - Earn Big'),
      heft: '#',
    },
  ]

  return (
    <>
      <BG />
      <StyledS>
        <StyledBG>
          <div />
          <div />
        </StyledBG>

        <StyledHeader>
          <StyledPreviewVideo>
            <video
              loop
              playsInline
              autoPlay
              controls={false}
              preload="auto"
              style={{ pointerEvents: 'none' }}
              controlsList="nodownload"
              muted
            >
              <source
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/company_page.mov`}
                type='video/mp4; codecs="hvc1"'
              />
              <source
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Coding_footage.webm`}
                type="video/webm"
              />
            </video>
          </StyledPreviewVideo>

          <div>
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/bg-header.png`}
              alt=""
              draggable="false"
              loading="lazy"
              className="bg-header"
            />
          </div>
        </StyledHeader>

        <StyledSectionText style={{ marginBottom: 40 }}>
          <h3>{t('Build to Inspire')}</h3>
          <p>
            {t(
              'XOX Protocol is The Next Generation Multi-chain DeFi Dapps & Web3 Solutions Provider. An Ecosystem Built to Provide Sustainability, Decentralization, Scalability & Transparency to the Space.',
            )}
          </p>
        </StyledSectionText>

        <Box marginBottom={[64, null, null, 100]}>
          <img
            src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/bg-team.png`}
            alt=""
            draggable="false"
            loading="lazy"
            style={{ width: '100%' }}
          />
        </Box>

        <StyledSectionText style={{ marginBottom: 40 }}>
          <h3>{t('XOX Labs Core Team')}</h3>
          <p>
            {t(
              'A highly qualified and professional team built to deliver top class DeFi products and support Web 3.0 mass adoption. Our mission and vision is to create a self-sustainable decentralized ecosystem with multiple revenue sources in every leading Blockchain.',
            )}
          </p>
        </StyledSectionText>

        {width < 968 && <MenberMobile />}
        {!(width < 968) && <MenberPC />}

        <StyledSectionText style={{ marginBottom: 40 }}>
          <h3>{t('XOX Labs Advisors')}</h3>
        </StyledSectionText>

        {<Advisors />}

        <StyledTitle>{t('XOX Labs Ecosystem Products')}</StyledTitle>
        <StyledSubtitle style={{ marginBottom: 48 }}>
          {t('A true one Multi-chain stop for all your Defi Needs.')}
        </StyledSubtitle>

        <StyledSocial marginBottom={[64, null, null, 100]}>
          {SOCIALS.map((social, i) => (
            <CardSocial social={social} key={String(i + social.name)} />
          ))}
        </StyledSocial>

        <BTNLearnMore />
      </StyledS>
    </>
  )
}
