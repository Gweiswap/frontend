import React from "react";
import styled, { DefaultTheme } from "styled-components";
import CheckmarkCircleIcon from "../Svg/Icons/CheckmarkCircle";
import ErrorIcon from "../Svg/Icons/Error";
import BlockIcon from "../Svg/Icons/Block";
import InfoIcon from "../Svg/Icons/Info";
import { Text } from "../Text";
import { IconButton } from "../Button";
import { CloseIcon } from "../Svg";
import Flex from "../Box/Flex";
import { AlertProps, variants } from "./types";

interface ThemedIconLabel {
  variant: AlertProps["variant"];
  theme: DefaultTheme;
  hasDescription: boolean;
}

const getThemeColor = ({ theme, variant = variants.INFO }: ThemedIconLabel) => {
  switch (variant) {
    case variants.DANGER:
      return theme.colors.failure;
    case variants.WARNING:
      return theme.colors.warning;
    case variants.SUCCESS:
      return theme.colors.blue;
    case variants.INFO:
    default:
      return theme.colors.secondary;
  }
};

const getIcon = (variant: AlertProps["variant"] = variants.INFO) => {
  switch (variant) {
    case variants.DANGER:
      return BlockIcon;
    case variants.WARNING:
      return ErrorIcon;
    case variants.SUCCESS:
      return CheckmarkCircleIcon;
    case variants.INFO:
    default:
      return InfoIcon;
  }
};

const IconLabel = styled.div<ThemedIconLabel>`
  /* background-color: ${getThemeColor}; */
  border-radius: 16px 0 0 16px;
  color: ${({ theme }) => theme.alert.background};
  margin-top: 4px;
`;

const withHandlerSpacing = 32 + 12 + 8; // button size + inner spacing + handler position
const Details = styled.div<{ hasHandler: boolean }>`
  flex: 1;
  /* padding-bottom: 12px; */
  padding-left: 12px;
  padding-right: ${({ hasHandler }) => (hasHandler ? `${withHandlerSpacing}px` : "12px")};
  /* padding-top: 12px; */

  a {
    color: #fff !important;
  }
`;

const CloseHandler = styled.div`
  border-radius: 0 16px 16px 0;
  right: 8px;
  position: absolute;
  top: 8px;

  button {
    background: none !important;
  }
`;

const StyledAlert = styled(Flex)`
  position: relative;
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 14px;
`;

const Alert: React.FC<React.PropsWithChildren<AlertProps>> = ({ title, children, variant, onClick }) => {
  const Icon = getIcon(variant);

  return (
    <StyledAlert>
      <IconLabel variant={variant} hasDescription={!!children} style={{ display: "flex" }}>
        <Icon color="currentColor" width="24px" />
      </IconLabel>
      <Details hasHandler={!!onClick}>
        <Text bold fontSize="16px" style={{ color: "#FFFFFF" }}>
          {title}
        </Text>
        {typeof children === "string" ? (
          <Text style={{ wordBreak: "break-all", fontSize: "14px", color: "#FFFFFF" }} as="p">
            {children}
          </Text>
        ) : (
          children
        )}
      </Details>
      {/* {onClick && (
        <CloseHandler>
          <IconButton scale="sm" variant="text" onClick={onClick}>
            <CloseIcon width="24px" color="currentColor" />
          </IconButton>
        </CloseHandler>
      )} */}
    </StyledAlert>
  );
};

export default Alert;
