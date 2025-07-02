import React from "react";
import { Colors } from "../../theme";
import { BoxProps } from "../Box";

export interface DropdownMenuProps extends BoxProps {
  items?: DropdownMenuItems[];
  isDisabled?: boolean;
  activeItem?: string;
  /**
   * As BottomNav styles
   */
  isBottomNav?: boolean;
  /**
   * Show items on mobile when `isBottomNav` is true
   */
  showItemsOnMobile?: boolean;
  index?: number;
  setMenuOpenByIndex?: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
  setIsHover?: () => void;
  isLanding?: boolean;
  isLanguage?: boolean;
  setOpenHeader?: any;
}

export interface StyledDropdownMenuItemProps extends React.ComponentPropsWithoutRef<"button"> {
  disabled?: boolean;
  isActive?: boolean;
  $hasLable?: boolean;
}

export enum DropdownMenuItemType {
  INTERNAL_LINK,
  EXTERNAL_LINK,
  BUTTON,
  DIVIDER,
}

export interface LinkStatus {
  text: string;
  color: keyof Colors;
}

export interface DropdownMenuItems {
  label?: string | React.ReactNode;
  href?: string;
  onClick?: () => void;
  image?: string;
  type?: DropdownMenuItemType;
  status?: LinkStatus;
  disabled?: boolean;
  iconName?: string;
  icon?: React.ReactNode;
  isMobileOnly?: boolean;
  showTooltip?: boolean;
}
