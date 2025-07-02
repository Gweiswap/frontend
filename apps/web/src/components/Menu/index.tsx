/* eslint-disable react/no-unescaped-entities */
import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import {
  Menu as UikitMenu,
  ModalV2,
  ModalWrapper,
  NextLinkFromReactRouter,
  NotificationIcon,
  Text,
  useMatchBreakpoints,
  useOnClickOutside,
  useTooltip,
} from '@pancakeswap/uikit'
import { useTranslation, languageList } from '@pancakeswap/localization'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import LangSelector from '@pancakeswap/uikit/src/components/LangSelector/LangSelector'
import useTheme from 'hooks/useTheme'
import io from 'socket.io-client'
import axios from 'axios'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import { useActiveChainId } from 'hooks/useActiveChainId'
import styled from 'styled-components'
import MenuItems from '@pancakeswap/uikit/src/components/MenuItems/MenuItems'
import { useAccount } from 'wagmi'
import { useNotificationHandle } from 'components/NotificationBannerHandler'
import UserMenu from './UserMenu'
import { useMenuItems } from './hooks/useMenuItems'
// import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'
import { configLanding } from './config/config'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { isMobile } from 'react-device-detect'
import Script from 'next/script'

const BTNLaunchApp = styled.button`
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  padding: 12px 30px;
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  border-radius: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  }
`

const HamburgerButton = styled.div`
  margin-left: 11px;

  @media (min-width: 1200px) {
    display: none;
  }
`

const CertikButton = styled.div`
  margin-right: 11px;
  width: 148px;
  height: 43px !important;
  position: relative;
  min-width: 148px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    padding: 4px;
    margin-top: -4px;
    z-index: -1;
  }

  .certik-emblem {
    margin-top: -4px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const ModalV2Wrapper = styled(ModalV2)`
  & > div:first-child {
    background: transparent;
  }
`

const CustomModalWrapper = styled(ModalWrapper)`
  border-radius: 0;
  top: 73px;
  left: 0;
  width: 100%;
  max-width: unset !important;
  padding-bottom: 0;
`

const MenuItemsWrapper = styled(MenuItems)`
  flex-direction: column;

  & > div {
    margin-right: 24px;
    margin-left: 24px;
    border-bottom: 1px solid #444444;
  }

  & > div:last-child {
    border-bottom: none;
  }
`
const NotificationField = styled.div`
  position: relative;
`

const NotificationMenu = styled.div`
  position: absolute;
  left: 0;
  display: block;
  top: 100%;
  background: #303030;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  width: 252px;
  color: rgba(255, 255, 255, 0.87);
  padding: 16px;
  h3 {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    border-bottom: 1px solid #444444;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  p {
    font-size: 16px;
    line-height: 20px;
    word-break: break-word;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const RedDot = styled.div`
  width: 10px;
  height: 10px;
  color: red;
  background: red;
  border-radius: 50px;
  position: absolute;
  top: 8px;
  right: 25px;
`
const IconAlert = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 43px;
  height: 43px;
  margin-right: 10px;
  border-radius: 50%;
  background: #303030;
  @media (max-width: 576px) {
    min-width: 25px;
    height: 25px;
    svg {
      width: 12px;
    }
  }
`
const IconAlertActive = styled.div`
  position: relative;
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: red;
    position: absolute;
    right: 28px;
    top: 10px;
    border-radius: 50%;
  }
  @media (max-width: 576px) {
    &::before {
      width: 5px;
      height: 5px;
      right: 23px;
      top: 5px;
    }
  }
`

const IconAlertSvg = (
  <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 0.5C6.85787 0.5 3.5 3.85787 3.5 8V12.4208C3.5 12.4949 3.47809 12.5672 3.43702 12.6289L0.88232 16.4609C0.63302 16.8349 0.5 17.2742 0.5 17.7236C0.5 18.9809 1.51918 20 2.77639 20H19.2236C20.4809 20 21.5 18.9809 21.5 17.7236C21.5 17.2742 21.3669 16.8349 21.1176 16.4609L18.563 12.6289C18.5219 12.5672 18.5 12.4949 18.5 12.4208V8C18.5 3.85787 15.1421 0.5 11 0.5Z"
      fill="#8E8E8E"
    />
    <path
      d="M13.9769 21.8743C13.7927 23.3545 12.5301 24.5 11 24.5C9.46987 24.5 8.20732 23.3545 8.0231 21.8743C7.99753 21.6688 8.16788 21.5 8.37499 21.5H13.625C13.8321 21.5 14.0024 21.6688 13.9769 21.8743Z"
      fill="#8E8E8E"
    />
  </svg>
)

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, setTheme } = useTheme()
  const cakePriceUsd = useCakeBusdPrice({ forceMainnet: true })
  const { currentLanguage, setLanguage, t } = useTranslation()
  const route = useRouter()
  const menuItems = useMenuItems()
  const { address: account } = useAccount()
  const { isDesktop } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()
  const [openHeader, setOpenHeader] = useState<boolean>(false)
  const [activeNotifi, setActiveNotifi] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const host = process.env.NEXT_PUBLIC_SOCKET_API
  const menuLandingPath = ['/', '/company', '/tokenomics', '/dex-v2']
  const menuItemsLanding = useMemo(() => {
    return configLanding(t, isDark, currentLanguage.code, chainId)
  }, [t, isDark, currentLanguage.code, chainId])

  const menuElement = document.querySelector('#menu-root')

  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname: route.pathname })

  const activeMenuItemLanding = getActiveMenuItem({ menuConfig: menuItemsLanding, pathname: route.pathname })

  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname: route.pathname })

  const activeSubMenuItemLanding = getActiveSubMenuItem({ menuItem: activeMenuItemLanding, pathname: route.pathname })

  const bannerTop = useNotificationHandle()

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  const getFooterLinks = useMemo(() => {
    return footerLinks(t)
  }, [t])

  const handleHambergerBtnClicked = () => {
    return setOpenHeader(true)
  }

  const handleCloseHeaderMenu = () => {
    return setOpenHeader(false)
  }
  const getNotification = async () => {
    const params = {
      address: account?.toLocaleLowerCase(),
      page: 1,
      size: 20,
    }
    const result: any = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/notifications?address=${params.address}&page=${params.page}&size=${params.size}`,
      )
      .catch((error) => {
        console.warn(error)
      })
    if (result?.data?.data && result?.data?.data.length > 0) {
      setActiveNotifi(true)
    }
  }

  const handleReadAll = async () => {
    if (!activeNotifi) return
    setIsOpen(!isOpen)
    const params = { address: account?.toLocaleLowerCase() }
    const result: any = await axios
      .put(`${process.env.NEXT_PUBLIC_API}/notifications/read-all/${params.address}`)
      .catch((error) => {
        console.warn(error)
      })
    await setActiveNotifi(false)
  }

  useEffect(() => {
    if (account) {
      getNotification()
    }
  }, [account])

  useEffect(() => {
    setActiveNotifi(false)
    if (account) {
      const socket = io(host, {})
      socket.on('connect', () => {
        console.log('connected socket')
      })
      socket.on(account?.toLocaleLowerCase(), (...args) => {
        setActiveNotifi(true)
      })
    }
  }, [account])

  useOnClickOutside(
    ref?.current,
    useCallback(() => {
      setIsOpen(false)
    }, [setIsOpen]),
  )

  return createPortal(
    <>
      <ModalV2Wrapper closeOnOverlayClick isOpen={openHeader} onDismiss={handleCloseHeaderMenu}>
        <CustomModalWrapper onDismiss={handleCloseHeaderMenu} style={{ overflow: 'visible', border: 'none' }}>
          <MenuItemsWrapper
            items={menuLandingPath.includes(route.pathname) ? menuItemsLanding : menuItems}
            activeItem={menuLandingPath.includes(route.pathname) ? activeMenuItemLanding?.href : activeMenuItem?.href}
            activeSubItem={
              menuLandingPath.includes(route.pathname) ? activeSubMenuItemLanding?.href : activeSubMenuItem?.href
            }
            setOpenHeader={setOpenHeader}
            isLanding={menuLandingPath.includes(route.pathname)}
          />
        </CustomModalWrapper>
      </ModalV2Wrapper>
      <UikitMenu
        linkComponent={(linkProps) => {
          return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
        }}
        rightSide={
          menuLandingPath.includes(route.pathname) ? (
            <>
              {!isMobile && (
                <CertikButton className="certik-b">
                  <img
                    src="https://certik-project-logos.imgix.net/emblem/certik-logo-in-progress-animated-dark.svg"
                    alt=""
                  />
                  <div className="certik-emblem" data-id="d45e99eb">
                    <a href="https://skynet.certik.com/projects/xox-labs?utm_source=SkyEmblem&utm_campaign=xox-labs&utm_medium=link"></a>
                  </div>
                  <Script
                    defer
                    src={`https://emblem.certik-assets.com/script?pid=xox-labs&vid=d45e99eb&time=${new Date().getTime()}`}
                  />
                </CertikButton>
              )}
              {isDesktop && (
                <LangSelector
                  currentLang={currentLanguage.language}
                  langs={languageList}
                  setLang={setLanguage}
                  color="textSubtle"
                  hideLanguage
                />
              )}
              <Link href="/info" target="_blank" style={{ marginRight: '11px' }}>
                <BTNLaunchApp>{t('Enter App')}</BTNLaunchApp>
              </Link>

              {openHeader ? (
                <HamburgerButton>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" viewBox="0 0 14 15" fill="none">
                    <path
                      d="M7.0977 8.8998L2.1977 13.7998C2.01437 13.9831 1.78104 14.0748 1.4977 14.0748C1.21437 14.0748 0.981038 13.9831 0.797705 13.7998C0.614371 13.6165 0.522705 13.3831 0.522705 13.0998C0.522705 12.8165 0.614371 12.5831 0.797705 12.3998L5.69771 7.4998L0.797705 2.5998C0.614371 2.41647 0.522705 2.18314 0.522705 1.8998C0.522705 1.61647 0.614371 1.38314 0.797705 1.1998C0.981038 1.01647 1.21437 0.924805 1.4977 0.924805C1.78104 0.924805 2.01437 1.01647 2.1977 1.1998L7.0977 6.0998L11.9977 1.1998C12.181 1.01647 12.4144 0.924805 12.6977 0.924805C12.981 0.924805 13.2144 1.01647 13.3977 1.1998C13.581 1.38314 13.6727 1.61647 13.6727 1.8998C13.6727 2.18314 13.581 2.41647 13.3977 2.5998L8.4977 7.4998L13.3977 12.3998C13.581 12.5831 13.6727 12.8165 13.6727 13.0998C13.6727 13.3831 13.581 13.6165 13.3977 13.7998C13.2144 13.9831 12.981 14.0748 12.6977 14.0748C12.4144 14.0748 12.181 13.9831 11.9977 13.7998L7.0977 8.8998Z"
                      fill="#FB8618"
                    />
                  </svg>
                </HamburgerButton>
              ) : (
                <HamburgerButton onClick={handleHambergerBtnClicked}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="13" viewBox="0 0 19 13" fill="none">
                    <path
                      d="M1.09766 12.5C0.814323 12.5 0.57699 12.404 0.385656 12.212C0.193656 12.0207 0.0976562 11.7833 0.0976562 11.5C0.0976562 11.2167 0.193656 10.9793 0.385656 10.788C0.57699 10.596 0.814323 10.5 1.09766 10.5H17.0977C17.381 10.5 17.6183 10.596 17.8097 10.788C18.0017 10.9793 18.0977 11.2167 18.0977 11.5C18.0977 11.7833 18.0017 12.0207 17.8097 12.212C17.6183 12.404 17.381 12.5 17.0977 12.5H1.09766ZM1.09766 7.5C0.814323 7.5 0.57699 7.404 0.385656 7.212C0.193656 7.02067 0.0976562 6.78333 0.0976562 6.5C0.0976562 6.21667 0.193656 5.979 0.385656 5.787C0.57699 5.59567 0.814323 5.5 1.09766 5.5H17.0977C17.381 5.5 17.6183 5.59567 17.8097 5.787C18.0017 5.979 18.0977 6.21667 18.0977 6.5C18.0977 6.78333 18.0017 7.02067 17.8097 7.212C17.6183 7.404 17.381 7.5 17.0977 7.5H1.09766ZM1.09766 2.5C0.814323 2.5 0.57699 2.40433 0.385656 2.213C0.193656 2.021 0.0976562 1.78333 0.0976562 1.5C0.0976562 1.21667 0.193656 0.979 0.385656 0.787C0.57699 0.595667 0.814323 0.5 1.09766 0.5H17.0977C17.381 0.5 17.6183 0.595667 17.8097 0.787C18.0017 0.979 18.0977 1.21667 18.0977 1.5C18.0977 1.78333 18.0017 2.021 17.8097 2.213C17.6183 2.40433 17.381 2.5 17.0977 2.5H1.09766Z"
                      fill="url(#paint0_linear_11003_44445)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_11003_44445"
                        x1="-1.32809"
                        y1="0.5"
                        x2="21.9041"
                        y2="3.74266"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#B809B5" />
                        <stop offset="0.510417" stopColor="#ED1C51" />
                        <stop offset="1" stopColor="#FFB000" />
                      </linearGradient>
                    </defs>
                  </svg>
                </HamburgerButton>
              )}
            </>
          ) : (
            <>
              {/* <GlobalSettings mode={SettingsMode.GLOBAL} /> */}
              {account ? (
                <NotificationField onClick={() => handleReadAll()}>
                  {/* {argsMes?.length > 0 && <RedDot />} */}
                  {isDesktop ? (
                    activeNotifi ? (
                      <IconAlertActive>
                        <NotificationIcon />
                      </IconAlertActive>
                    ) : (
                      <IconAlert>{IconAlertSvg}</IconAlert>
                    )
                  ) : activeNotifi ? (
                    <IconAlertActive>
                      <NotificationIcon size={25} />
                    </IconAlertActive>
                  ) : (
                    <IconAlert>{IconAlertSvg}</IconAlert>
                  )}
                  {isOpen && (
                    <NotificationMenu ref={ref}>
                      <h3>{t('Notification')}</h3>
                      <p>{t('Your referral code has been applied in a ”Buy XOX” transaction')}</p>
                    </NotificationMenu>
                  )}
                </NotificationField>
              ) : (
                <></>
              )}
              {!isMobile && route.pathname === '/pre-sales' && (
                <CertikButton className="certik-b">
                  <img
                    src="https://certik-project-logos.imgix.net/emblem/certik-logo-in-progress-animated-dark.svg"
                    alt=""
                  />

                  <div className="certik-emblem" data-id="d45e99eb">
                    <a href="https://skynet.certik.com/projects/xox-labs?utm_source=SkyEmblem&utm_campaign=xox-labs&utm_medium=link" />
                  </div>
                  <Script
                    defer
                    src={`https://emblem.certik-assets.com/script?pid=xox-labs&vid=d45e99eb&time=${new Date().getTime()}`}
                  />
                </CertikButton>
              )}
              {isDesktop && (
                <LangSelector
                  currentLang={currentLanguage.language}
                  langs={languageList}
                  setLang={setLanguage}
                  buttonScale="xs"
                  color="textSubtle"
                  hideLanguage
                />
              )}
              <NetworkSwitcher />
              <UserMenu />
              {openHeader ? (
                <HamburgerButton>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" viewBox="0 0 14 15" fill="none">
                    <path
                      d="M7.0977 8.8998L2.1977 13.7998C2.01437 13.9831 1.78104 14.0748 1.4977 14.0748C1.21437 14.0748 0.981038 13.9831 0.797705 13.7998C0.614371 13.6165 0.522705 13.3831 0.522705 13.0998C0.522705 12.8165 0.614371 12.5831 0.797705 12.3998L5.69771 7.4998L0.797705 2.5998C0.614371 2.41647 0.522705 2.18314 0.522705 1.8998C0.522705 1.61647 0.614371 1.38314 0.797705 1.1998C0.981038 1.01647 1.21437 0.924805 1.4977 0.924805C1.78104 0.924805 2.01437 1.01647 2.1977 1.1998L7.0977 6.0998L11.9977 1.1998C12.181 1.01647 12.4144 0.924805 12.6977 0.924805C12.981 0.924805 13.2144 1.01647 13.3977 1.1998C13.581 1.38314 13.6727 1.61647 13.6727 1.8998C13.6727 2.18314 13.581 2.41647 13.3977 2.5998L8.4977 7.4998L13.3977 12.3998C13.581 12.5831 13.6727 12.8165 13.6727 13.0998C13.6727 13.3831 13.581 13.6165 13.3977 13.7998C13.2144 13.9831 12.981 14.0748 12.6977 14.0748C12.4144 14.0748 12.181 13.9831 11.9977 13.7998L7.0977 8.8998Z"
                      fill="#FFB000"
                    />
                  </svg>
                </HamburgerButton>
              ) : (
                <HamburgerButton onClick={handleHambergerBtnClicked}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="13" viewBox="0 0 19 13" fill="none">
                    <path
                      d="M1.09766 12.5C0.814323 12.5 0.57699 12.404 0.385656 12.212C0.193656 12.0207 0.0976562 11.7833 0.0976562 11.5C0.0976562 11.2167 0.193656 10.9793 0.385656 10.788C0.57699 10.596 0.814323 10.5 1.09766 10.5H17.0977C17.381 10.5 17.6183 10.596 17.8097 10.788C18.0017 10.9793 18.0977 11.2167 18.0977 11.5C18.0977 11.7833 18.0017 12.0207 17.8097 12.212C17.6183 12.404 17.381 12.5 17.0977 12.5H1.09766ZM1.09766 7.5C0.814323 7.5 0.57699 7.404 0.385656 7.212C0.193656 7.02067 0.0976562 6.78333 0.0976562 6.5C0.0976562 6.21667 0.193656 5.979 0.385656 5.787C0.57699 5.59567 0.814323 5.5 1.09766 5.5H17.0977C17.381 5.5 17.6183 5.59567 17.8097 5.787C18.0017 5.979 18.0977 6.21667 18.0977 6.5C18.0977 6.78333 18.0017 7.02067 17.8097 7.212C17.6183 7.404 17.381 7.5 17.0977 7.5H1.09766ZM1.09766 2.5C0.814323 2.5 0.57699 2.40433 0.385656 2.213C0.193656 2.021 0.0976562 1.78333 0.0976562 1.5C0.0976562 1.21667 0.193656 0.979 0.385656 0.787C0.57699 0.595667 0.814323 0.5 1.09766 0.5H17.0977C17.381 0.5 17.6183 0.595667 17.8097 0.787C18.0017 0.979 18.0977 1.21667 18.0977 1.5C18.0977 1.78333 18.0017 2.021 17.8097 2.213C17.6183 2.40433 17.381 2.5 17.0977 2.5H1.09766Z"
                      fill="url(#paint0_linear_11003_44445)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_11003_44445"
                        x1="-1.32809"
                        y1="0.5"
                        x2="21.9041"
                        y2="3.74266"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#B809B5" />
                        <stop offset="0.510417" stopColor="#ED1C51" />
                        <stop offset="1" stopColor="#FFB000" />
                      </linearGradient>
                    </defs>
                  </svg>
                </HamburgerButton>
              )}
            </>
          )
        }
        banner={bannerTop}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        cakePriceUsd={cakePriceUsd}
        links={menuLandingPath.includes(route.pathname) ? menuItemsLanding : menuItems}
        subLinks={activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav ? [] : []}
        footerLinks={getFooterLinks}
        activeItem={menuLandingPath.includes(route.pathname) ? activeMenuItemLanding?.href : activeMenuItem?.href}
        activeSubItem={
          menuLandingPath.includes(route.pathname) ? activeSubMenuItemLanding?.href : activeSubMenuItem?.href
        }
        buyCakeLabel={t('Buy CAKE')}
        isLanding={menuLandingPath.includes(route.pathname)}
        {...props}
      />
    </>,
    menuElement,
  )
}

export default Menu
