import styled from "styled-components";
import { darkColors } from "../../theme/colors";
import { Box, Flex } from "../Box";
import SocialLinks from "./Components/SocialLinks";

export const StyledList = styled.ul`
  list-style: none;
`;

export const SubTitleStyle = styled.span`
  margin-bottom: 34px;
  position: relative;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.87);

  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  }
`;

export const FooterMainContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 92px 119px;
  background: #101010;
  position: relative;
  width: 100%;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    left: 0px;
    top: 0px;
    background: linear-gradient(89.21deg, #9bf3cb 0.16%, #3ec0a6 35.42%, #f44234 65.49%, #9f3a83 99.71%);
  }

  @media screen and (max-width: 560px) {
    padding: 0;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 123px;
  width: 1400px;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px 20px;
    padding: 40px;
    width: 100%;

    & > div:first-child {
      grid-column: 1 / 2 span;
    }

    br {
      display: none;
    }
  }

  @media screen and (max-width: 560px) {
    padding: 40px 24px;
    br {
      display: block;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 24px;
  position: relative;

  .blur {
    wiidth: 100%;
    height: 200px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  }

  @media screen and (max-width: 560px) {
    flex-direction: column;
  }
`;

export const StyledListItem = styled.li`
  margin-bottom: 12px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.87);
  display: flex;
  align-items: center;

  & a {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);

    div {
      position: relative;
      left: 3px;
      bottom: 2px;
    }

    :hover div {
      transition: 0.5s ease;
      left: 6px;
      bottom: 5px;
    }
  }

  & .iconx {
    width: 20px;
    min-width: 20px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
  }
`;

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const StyledToolsContainer = styled(Flex)`
  border-color: ${darkColors.cardBorder};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`;

export const StyledSocialLinks = styled(SocialLinks)``;

export const StyledText = styled.span`
  color: ${darkColors.text};
`;

export const StyleStaticPage = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;

  & li {
    padding: 0 4px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
  }

  & li:nth-child(even) {
    font-family: "Manrope";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    font-feature-settings: "liga" off;
    color: #444444;
  }
`;

export const ImagBGFooter = styled.img`
  position: absolute;
  right: 0;
  top: 40px;
  z-index: 1;
`;

export const ImagBGFooterTow = styled.img`
  position: absolute;
  right: 0;
  bottom: 130px;
  z-index: 1;
`;

export const StyledIconArrow = styled.div``;
