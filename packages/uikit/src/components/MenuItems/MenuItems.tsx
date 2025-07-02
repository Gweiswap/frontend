/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, memo, useState } from "react";
import { Flex } from "../Box";
import isTouchDevice from "../../util/isTouchDevice";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MenuItem from "../MenuItem/MenuItem";
import { MenuItemsProps } from "./types";
import { useMatchBreakpoints } from "../../contexts";
import { useTranslation } from "@pancakeswap/localization";
import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled(Flex)`
  @media screen and (max-width: 560px) {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: calc(100vh - 172px);
  }
`;

const MenuItems: React.FC<React.PropsWithChildren<MenuItemsProps>> = ({
  items = [],
  activeItem,
  activeSubItem,
  isLanding = false,
  setOpenHeader,
  ...props
}) => {
  const { currentLanguage, setLanguage, t } = useTranslation();
  const { isMobile } = useMatchBreakpoints();
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Wrapper {...props}>
      {items.map(({ label, items: menuItems = [], href, icon, disabled }) => {
        const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
        const isActive = activeItem === href;

        const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : { href };
        const Icon = icon;

        return (
          <DropdownMenu
            key={`${label}#${href}`}
            items={menuItems}
            py={1}
            activeItem={activeSubItem}
            isDisabled={disabled}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isLanding={isLanding}
          >
            <MenuItem
              {...linkProps}
              isActive={isActive}
              statusColor={statusColor}
              isDisabled={disabled}
              isHover={isHover}
              label={label}
            >
              {label || (icon && createElement(Icon as any, { color: isActive ? "secondary" : "textSubtle" }))}
            </MenuItem>
          </DropdownMenu>
        );
      })}
      {isMobile && (
        <DropdownMenu
          key={currentLanguage.language}
          items={[]}
          py={1}
          activeItem={activeSubItem}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          isLanding={isLanding}
          isLanguage
          setOpenHeader={setOpenHeader}
        >
          <MenuItem isHover={isHover} label={currentLanguage.language}>
            <div style={{ display: "flex" }}>
              <Image
                src={`/images/${currentLanguage.language}.svg`}
                alt={currentLanguage.language}
                width={19}
                height={19}
              />
              <span style={{ marginLeft: "10px" }}>{t(currentLanguage.language)}</span>
            </div>
          </MenuItem>
        </DropdownMenu>
      )}
    </Wrapper>
  );
};

export default memo(MenuItems);
