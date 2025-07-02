import {
  Box,
  Flex,
  UserMenu,
  UserMenuDivider,
  UserMenuItem,
  Button,
  Text,
  useMatchBreakpoints,
  useTooltip,
} from '@pancakeswap/uikit'
import { useCallback } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import { useTranslation } from '@pancakeswap/localization'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useGetChainName } from 'state/info/hooks'
import { multiChainId, multiChainPaths } from 'state/info/constant'
import { chains } from 'utils/wagmi'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { bsc, mainnet } from '@pancakeswap/wagmi/chains'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
// import GalaxyIcon from 'components/Svg/galaxy-desktop.svg'
// import GalaxyMobileIcon from 'components/Svg/galaxy.svg'

interface INavWrapper {
  hasPadding?: boolean
}

const NavWrapper = styled(Flex)<INavWrapper>`
  padding: ${({ hasPadding }) => (hasPadding ? '28px 24px 24px' : '0')};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 5fr 2fr;
    padding-left: ${({ hasPadding }) => (hasPadding ? '48px' : '0')};
    padding-right: ${({ hasPadding }) => (hasPadding ? '48px' : '0')};
  } ;
`

const MainContent = styled.div`
  width: 100%;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px 16px;
  position: relative;

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  & > svg,
  & > object {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 0;
    /* width: 397px;
    max-width: unset; */
    width: auto;
    height: auto;
    object-fit: cover;
  }

  .flex_container {
    display: block;
  }
  .get-xox {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    height: 37px;
    border-radius: 10px;
    padding: 10px 20px;
    box-shadow: none;
    position: relative;
    border: 1px solid #ffffff;
    color: #ffffff;
    background: #ffffff;
    color: #000000;
    width: calc(50% - 8px);
    :hover {
      border: 1px solid #ffffff;
      color: #ffffff;
      background: #000000;
    }
  }

  .learn-more {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    height: 37px;
    border: 1px solid #ffffff;
    border-radius: 10px;
    margin-left: 16px;
    background: transparent;
    padding: 10px 20px;
    box-shadow: none;
    position: relative;
    width: calc(50% - 8px);
  }

  .learn-more:hover {
    background: #ffffff;
    color: #000000;
    opacity: 1 !important;
  }
  .text_third {
    position: relative;
    border-radius: 10px;
    padding: 12px 20px;
    text-align: center;
    margin-top: 16px;

    > span {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0px;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(95.32deg, rgb(184, 9, 181) -7.25%, rgb(237, 28, 81) 54.2%, rgb(255, 176, 0) 113.13%);
      -webkit-mask: linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box,
        linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px);
      -webkit-mask-composite: xor;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    height: 200px;
    padding: 30px 40px;

    & > svg,
    & > object {
      position: absolute;
      transform: translate(0, -50%);
      top: 50%;
      left: unset;
      right: 0;

      width: 740px;
      height: 200px;
      object-fit: cover;
    }

    .corner1 {
      border-bottom: 1px solid #ffffff30;
      border-left: 1px solid #ffffff30;
    }

    .edge1 {
      width: 1px;
    }

    .corner2 {
      border-bottom: 1px solid #ffffff30;
      border-right: 1px solid #ffffff30;
    }

    .edge2 {
      width: 1px;
    }

    .title {
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 0.075em;
      color: rgba(255, 255, 255, 0.6);
    }

    .subtitle {
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      letter-spacing: 0.075em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.87);
    }

    .flex_container {
      display: flex;
    }
    .get-xox {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      width: 149px;
      height: 43px;
      border-radius: 10px;
      box-shadow: none;

      background: transparent;
      background: #ffffff;
      color: #000000;
      :hover {
        border: 1px solid #ffffff;
        color: #ffffff;
        background: #000000;
      }
    }

    .learn-more {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      width: 149px;
      height: 43px;
      border: 1px solid #ffffff;
      border-radius: 10px;
      margin: 0px 16px;
      background: transparent;
      box-shadow: none;
    }

    .text_third {
      margin-top: 0px;

      > span {
        font-size: 16px;
        line-height: 19px;
      }
    }
  }
`

const InfoNav: React.FC<{ textContentBanner?: any; hasPadding?: boolean; titleBtn1?: string; textThird?: string }> = ({
  textContentBanner,
  hasPadding = true,
  titleBtn1 = 'XOXS',
  textThird = '',
}) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(t('Deployment coming'), {
    placement: 'top-start',
    hideTimeout: 0,
  })

  return (
    <NavWrapper hasPadding={hasPadding}>
      <MainContent>
        <div className="corner1" />
        <div className="edge1" />
        <div className="corner2" />
        <div className="edge2" />
        {isMobile ? <object data="/images/galaxy.svg" /> : <object data="/images/galaxy-desktop.svg" />}
        {/* {isMobile ? <GalaxyMobileIcon /> : <GalaxyIcon />} */}

        <Text className="title" marginBottom="8px" mt={['118px', , '0']}>
          {t('Swap to get XOX & XOXS. Earn like a Pro')}
        </Text>
        <Text className="subtitle" mb={['16px', , '24px']}>
          {textContentBanner || t('Stake XOXS automatically to earn more')}
        </Text>
        <div className="flex_container">
          {tooltipVisible && tooltip}
          <a
            href={null}
            // href={`/swap?chainId=${chainId}&outputCurrency=${XOX_ADDRESS[chainId]}&inputCurrency=${USD_ADDRESS[chainId]}`}
            // target="_blank"
            ref={targetRef}
            rel="noreferrer"
          >
            <Button className="get-xox">{t('Get %sym%', { sym: titleBtn1 })}</Button>
          </a>
          <a href="https://docs.xoxlabs.io/" target="_blank" rel="noreferrer">
            <Button className="learn-more">{t('Learn More')}</Button>
          </a>
          {textThird && !isMobile && (
            <div className="text_third">
              <span>{textThird}</span>
            </div>
          )}
        </div>
        {textThird && isMobile && (
          <div className="text_third">
            <span>{textThird}</span>
          </div>
        )}
      </MainContent>
    </NavWrapper>
  )
}

const targetChains = [mainnet, bsc]

export const NetworkSwitcher: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const { t } = useTranslation()
  const chainName = useGetChainName()
  const foundChain = chains.find((d) => d.id === multiChainId[chainName])
  const symbol = foundChain?.nativeCurrency?.symbol
  const router = useRouter()
  const switchNetwork = useCallback(
    (chainPath: string) => {
      if (activeIndex === 0) router.push(`/info${chainPath}`)
      if (activeIndex === 1) router.push(`/info${chainPath}/pairs`)
      if (activeIndex === 2) router.push(`/info${chainPath}/tokens`)
    },
    [router, activeIndex],
  )

  return (
    <UserMenu
      alignItems="top"
      ml="8px"
      avatarSrc={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/chains/${multiChainId[chainName]}.svg`}
      text={
        foundChain ? (
          <>
            <Box display={['none', null, null, null, null, 'block']}>{foundChain.name}</Box>
            <Box display={['block', null, null, null, null, 'none']}>{symbol}</Box>
          </>
        ) : (
          t('Select a Network')
        )
      }
      recalculatePopover
    >
      {() => <NetworkSelect chainId={multiChainId[chainName]} switchNetwork={switchNetwork} />}
    </UserMenu>
  )
}

const NetworkSelect: React.FC<{ chainId: ChainId; switchNetwork: (chainPath: string) => void }> = ({
  switchNetwork,
  chainId,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Box px="16px" py="8px">
        <Text color="textSubtle">{t('Select a Network')}</Text>
      </Box>
      <UserMenuDivider />
      {targetChains.map((chain) => (
        <UserMenuItem
          key={chain.id}
          style={{ justifyContent: 'flex-start' }}
          onClick={() => {
            if (chain.id !== chainId) switchNetwork(multiChainPaths[chain.id])
          }}
        >
          <ChainLogo chainId={chain.id} />
          <Text color={chain.id === chainId ? 'secondary' : 'text'} bold={chain.id === chainId} pl="12px">
            {chain.name}
          </Text>
        </UserMenuItem>
      ))}
    </>
  )
}

export default InfoNav
