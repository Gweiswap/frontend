import styled from "styled-components";
import { StyledMenuItemProps } from "./types";

export const StyledMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;

  ${({ $isActive, $variant, theme }) =>
    $isActive &&
    $variant === "subMenu" &&
    `
      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        background-color: ${theme.colors.primary};
        border-radius: 2px 2px 0 0;
      }
    `};
`;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: inline-block;
  align-items: center;
  background: ${({ $isActive }) =>
    $isActive ? "linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%)" : "#1d1d1d"};
  font-family: "Inter";
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: ${({ $isActive }) => ($isActive ? "transparent" : "rgba(255, 255, 255, 0.6)")};
  background-clip: text;
  text-fill-color: ${({ $isActive }) => ($isActive ? "transparent" : "rgba(255, 255, 255, 0.6)")};
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "500")};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? "none" : "inherit")};
  color: rgba(255, 255, 255, 0.6);
  padding-top: 12px;
  padding-bottom: 12px;

  ${({ $statusColor, theme }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === "default"
      ? `
    padding: 12px 16px;
    height: 48px;
  `
      : `
    padding: 12px 4px 12px 4px;
    height: 42px;
  `}
  &:hover {
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

export default StyledMenuItem;
