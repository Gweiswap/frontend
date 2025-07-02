import React from "react";
import styled from "styled-components";
import Flex from "../../components/Box/Flex";
import { MotionBox } from "../../components/Box";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton } from "../../components/Button";
import { ModalProps } from "./types";

export const mobileFooterHeight = 73;

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: transparent;
  // border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  padding: 32px 24px 24px 24px;
  border: none;

  & > div {
    display: block;
  }
  & > div button {
    left: 17px;

    svg {
      fill: #8e8e8e;
    }
  }
  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
  }

  button {
    position: absolute;
    top: 17px;
    right: 17px;
    background: 0;
    padding: 0;
    width: 20px;
    height: 20px;
  }

  button:hover {
    background: none !important;
  }
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(90vh - ${mobileFooterHeight}px);
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.87);
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    max-height: 90vh;
  }
`;

export const ModalCloseButton: React.FC<React.PropsWithChildren<{ onDismiss: ModalProps["onDismiss"] }>> = ({
  onDismiss,
}) => {
  return (
    <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="primary" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<React.PropsWithChildren<{ onBack: ModalProps["onBack"] }>> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon />
    </IconButton>
  );
};

interface IMotionBox {
  $minWidth?: string;
}

export const ModalContainer = styled(MotionBox)<IMotionBox>`
  overflow: hidden;
  width: calc(100% - 48px);
  max-height: calc(var(--vh, 1vh) * 100);
  z-index: ${({ theme }) => theme.zIndices.modal};
  position: absolute;
  min-width: ${({ $minWidth }) => $minWidth};
  background: #101010;
  max-width: calc(100vw - 48px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
    bottom: auto;
    max-height: 100vh;
  }
`;
