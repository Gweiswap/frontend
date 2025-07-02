import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import Flex from "../../../components/Box/Flex";
import { LogoIcon, LogoMobileIcon, LogoWithTextIcon } from "../../../components/Svg";
import { useMatchBreakpoints } from "../../../contexts";
import { MenuContext } from "../context";

interface Props {
  href: string;
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); }
  50% { transform:  scaleY(0.1); }
`;

const StyledLink = styled("a")`
  display: flex;
  align-items: center;
  .eye {
    animation-delay: 20ms;
  }
  &:hover {
    .eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`;

const Logo: React.FC<React.PropsWithChildren<Props>> = ({ href }) => {
  const { linkComponent } = useContext(MenuContext);
  const isAbsoluteUrl = href.startsWith("http");
  const { isMobile } = useMatchBreakpoints();
  const innerLogo = (
    <>
      {/* <LogoIcon className="mobile-icon" /> */}
      {isMobile ? <LogoMobileIcon className="mobile-icon" /> : <LogoWithTextIcon className="desktop-icon" />}
    </>
  );

  return (
    <Flex>
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="XOX home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink href={href} as={linkComponent} aria-label="XOX home page">
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  );
};

export default React.memo(Logo);
