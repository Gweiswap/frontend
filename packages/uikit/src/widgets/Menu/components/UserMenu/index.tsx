import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { Box, Flex } from "../../../../components/Box";
import { ChevronDownIcon } from "../../../../components/Svg";
import { UserMenuProps, variants } from "./types";
import MenuIcon from "./MenuIcon";
import { UserMenuItem } from "./styles";

export const StyledUserMenu = styled(Flex)`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  height: 24px;
  position: relative;
`;

export const FlexWrapper = styled(Flex)`
  height: 37px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 43px;
  }
`;

export const LabelText = styled.div`
  display: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.87);
  margin-right: 26px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 30px;
  }
`;

const Menu = styled.div<{ isOpen: boolean }>`
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 280px;
  visibility: visible;
  z-index: 1001;

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}

  ${UserMenuItem}:first-child {
    border-radius: 8px 8px 0 0;
  }

  ${UserMenuItem}:last-child {
    border-radius: 0 0 8px 8px;
  }

  & > div {
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    background-color: ${({ theme }) => theme.card.background};
  }
`;

const UserMenu: React.FC<UserMenuProps> = ({
  account,
  text,
  avatarSrc,
  avatarClassName,
  variant = variants.DEFAULT,
  children,
  disabled,
  placement = "bottom-end",
  recalculatePopover,
  uncloseWhenClick,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : null;
  const { styles, attributes, update } = usePopper(targetRef, tooltipRef, {
    strategy: "fixed",
    placement,
    modifiers: [{ name: "offset", options: { offset: [0, 0] } }],
  });

  // recalculate the popover position
  useEffect(() => {
    if (recalculatePopover && isOpen && update) update();
  }, [isOpen, update, recalculatePopover]);

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true);
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false);
        evt.stopPropagation();
      }
    };

    targetRef?.addEventListener("mouseenter", showDropdownMenu);
    targetRef?.addEventListener("mouseleave", hideDropdownMenu);

    return () => {
      targetRef?.removeEventListener("mouseenter", showDropdownMenu);
      targetRef?.removeEventListener("mouseleave", hideDropdownMenu);
    };
  }, [targetRef, tooltipRef, setIsOpen]);

  return (
    <Flex alignItems="center" height="100%" ref={setTargetRef} {...props}>
      <FlexWrapper
        alignItems="center"
        justifyContent="center"
        border="1px solid #444444"
        borderRadius="6px"
        padding="6px 8px"
      >
        <StyledUserMenu
          onTouchStart={() => {
            setIsOpen((s) => !s);
          }}
        >
          <MenuIcon className={avatarClassName} avatarSrc={avatarSrc} variant={variant} />
          <LabelText title={typeof text === "string" ? text || account : account}>{text || accountEllipsis}</LabelText>
          {!disabled && <ChevronDownIcon color="text" width="24px" style={{ marginLeft: "6px" }} />}
        </StyledUserMenu>
        {!disabled && (
          <Menu style={styles.popper} ref={setTooltipRef} {...attributes.popper} isOpen={isOpen}>
            <Box onClick={() => !uncloseWhenClick && setIsOpen(false)}>{children?.({ isOpen, setIsOpen })}</Box>
          </Menu>
        )}
      </FlexWrapper>
    </Flex>
  );
};

export default UserMenu;
