import styled, { DefaultTheme } from "styled-components";
import { Colors } from "../../theme";
import { Box } from "../Box";
import { Text } from "../Text";
import { StyledDropdownMenuItemProps } from "./types";

const getTextColor = ({
  $isActive,
  disabled,
  theme,
}: StyledDropdownMenuItemProps & { theme: DefaultTheme; $isActive: boolean }) => {
  if (disabled) return theme.colors.textDisabled;
  if ($isActive) return theme.colors.secondary;

  return theme.colors.textSubtle;
};

export const DropdownMenuItem = styled.button<StyledDropdownMenuItemProps & { $isActive: boolean }>`
  align-items: center;
  border: 0;
  background: ${({ $isActive }) => ($isActive ? "rgba(255, 255, 255, 0.05)" : "transparent")};
  color: ${({ theme, disabled, $isActive }) => getTextColor({ theme, disabled, $isActive })};
  cursor: pointer;
  font-weight: ${({ $isActive = false }) => ($isActive ? "600" : "400")};
  display: flex;
  font-size: 16px;
  line-height: 19px;
  height: 48px;
  outline: 0;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "inherit")};

  &.submenu {
    color: rgba(255, 255, 255, 0.87);
    width: 170px;
  }

  &.text-gradient {
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    display: block;
    height: 48px;
    padding: 10px 16px;
    position: relative;

    svg {
      width: 19px;
      position: relative;
      transform: translateY(-50%);
      top: 50%;
    }
  }

  svg {
    margin-right: 8px;
  }

  &:is(button) {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }

  &:hover:not(:disabled) {
    background-color: ${({ $hasLable }) => ($hasLable ? "rgba(255, 255, 255, 0.05)" : "unset")};
  }

  &:active:not(:disabled) {
    opacity: 0.85;
    transform: translateY(1px);
  }
`;

export const DropdownMenuDivider = styled.hr`
  border-color: ${({ theme }) => theme.colors.cardBorder};
  border-style: solid;
  border-width: 1px 0 0;
  margin: 4px 0;
`;

export const StyledDropdownMenu = styled.div<{ $isOpen: boolean; $isBottomNav: boolean; $isLanding: boolean }>`
  border-radius: 6px;
  pointer-events: auto;
  margin-bottom: 0;
  width: fit-content;
  /* width: ${({ $isBottomNav, $isLanding }) => ($isBottomNav ? "100%" : $isLanding ? "515px" : "160px")}; */
  visibility: visible;
  z-index: 1001;
  display: grid;
  grid-template-columns: ${({ $isLanding }) => ($isLanding ? "1fr 1fr 1fr" : "1fr")};
  height: auto;

  ${({ theme }) => theme.mediaQueries.xxl} {
    position: absolute;
    top: 45px;
    left: 0;
    /* transform: translate(451px, 64px); */
    background: #1d1c1c;
    padding-bottom: 4px;
    padding-top: 4px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }

  @media (max-width: 576px) {
    width: ${({ $isBottomNav, $isLanding }) => ($isBottomNav ? "100%" : $isLanding ? "515px" : "100%")};
    grid-template-columns: ${({ $isLanding }) => ($isLanding ? "1fr auto" : "1fr")};
    max-width: 100%;

    & > div:nth-child(3) {
      grid-column: 1 / 3;
    }
  }

  ${({ $isOpen }) =>
    !$isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
    height: 0;
    overflow: hidden;
  `}
`;

export const LinkStatus = styled(Text)<{ color: keyof Colors }>`
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 8px;
  border: 2px solid;
  border-color: ${({ theme, color }) => theme.colors[color]};
  box-shadow: none;
  color: ${({ theme, color }) => theme.colors[color]};
  margin-left: 8px;
`;

export const BoxDropdown = styled(Box)<{ isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.xxl} {
    justify-content: flex-start;

    & svg {
      margin-bottom: 4px;
    }
  }

  svg {
    ${({ isActive }) => (isActive ? "transform: rotate(0)" : "transform: rotate(180deg)")}
  }
  :hover .hover_active {
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;
