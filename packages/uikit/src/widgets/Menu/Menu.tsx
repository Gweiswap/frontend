import { useIsMounted } from "@pancakeswap/hooks";
import { AtomBox } from "@pancakeswap/ui/components/AtomBox";
import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import Footer from "../../components/Footer";
import MenuItems from "../../components/MenuItems/MenuItems";
import { SubMenuItems } from "../../components/SubMenuItems";
import { useMatchBreakpoints } from "../../contexts";
import Logo from "./components/Logo";
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from "./config";
import { MenuContext } from "./context";
import { NavProps } from "./types";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  z-index: 1;
`;

const StyledNav = styled.nav`
  display: flex;
  margin: 0px auto;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  height: ${MENU_HEIGHT}px;
  transform: translate3d(0, 0, 0);
  padding: 14px 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: ${MENU_HEIGHT}px;
    padding: 14px 24px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    height: ${MENU_HEIGHT}px;
    padding: 14px 0;
    max-width: 1200px;
  }

  @media screen and (min-width: 1400px) {
    max-width: 1400px;
  }
`;

const FixedContainer = styled.div<{ showMenu: boolean; height: number; isLanding?: boolean }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100vw;
  z-index: 20;
  background-color: ${({ theme, isLanding }) => (isLanding ? "#101010" : "#101010")};
  /* ${({ theme, isLanding }) => !isLanding && ` border-bottom: 1px solid ${theme.colors.cardBorder}`}; */
  /* display: flex; */
  justify-content: center;
`;

const TopBannerContainer = styled.div`
  height: fit-content;
  min-height: fit-content;
  width: 100%;
`;

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
  max-width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    overflow: unset;
  }
`;

const Inner = styled.div`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
  /* padding-left: 24px;
  padding-right: 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 48px;
    padding-right: 48px;
  } ; */
`;

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  banner,
  rightSide,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyCakeLabel,
  children,
  isLanding = false,
}) => {
  const { isMobile, isTablet } = useMatchBreakpoints();
  const isMounted = useIsMounted();
  const [showMenu, setShowMenu] = useState(true);
  const [windowSize, setWindowSize] = useState(0);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);

  const topBannerHeight = isMobile || isTablet ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = isMounted && banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  const subLinksWithoutMobile = subLinks?.filter((subLink) => !subLink.isMobileOnly);
  const subLinksMobileOnly = subLinks?.filter((subLink) => subLink.isMobileOnly);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MenuContext.Provider value={{ linkComponent }}>
      <AtomBox
        asChild
        minHeight={{
          xs: "auto",
          md: "100vh",
        }}
      >
        <Wrapper>
          <FixedContainer showMenu={showMenu} height={totalTopMenuHeight} isLanding={isLanding}>
            {banner && isMounted && <TopBannerContainer>{banner}</TopBannerContainer>}
            <StyledNav>
              <Flex>
                <Logo href={homeLink?.href ?? "/"} />
                <AtomBox display={{ xs: "none", xxl: "block" }}>
                  <MenuItems
                    items={links}
                    activeItem={activeItem}
                    activeSubItem={activeSubItem}
                    ml="24px"
                    isLanding={isLanding}
                  />
                </AtomBox>
              </Flex>
              <Flex alignItems="center" height="100%">
                {rightSide}
              </Flex>
            </StyledNav>
          </FixedContainer>
          {subLinks ? (
            <Flex justifyContent="space-around" overflow="hidden">
              <SubMenuItems
                items={subLinksWithoutMobile}
                mt={`${totalTopMenuHeight + 1}px`}
                activeItem={activeSubItem}
              />

              {subLinksMobileOnly && subLinksMobileOnly?.length > 0 && (
                <SubMenuItems
                  items={subLinksMobileOnly}
                  mt={`${totalTopMenuHeight + 1}px`}
                  activeItem={activeSubItem}
                  isMobileOnly
                />
              )}
            </Flex>
          ) : (
            <div />
          )}
          <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : "0"}>
            <Inner>{children}</Inner>
          </BodyWrapper>
        </Wrapper>
      </AtomBox>
      <Footer
        items={footerLinks}
        isDark={isDark}
        toggleTheme={toggleTheme}
        langs={langs}
        windowSize={windowSize}
        setLang={setLang}
        currentLang={currentLang}
        cakePriceUsd={cakePriceUsd}
        buyCakeLabel={buyCakeLabel}
        mb={[0, null, "0px"]}
      />
    </MenuContext.Provider>
  );
};

export default Menu;
