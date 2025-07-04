import { Colors } from "../../theme";

export type MenuItemVariant = "default" | "subMenu";

export interface MenuItemProps {
  isActive?: boolean;
  isDisabled?: boolean;
  href?: string;
  variant?: MenuItemVariant;
  statusColor?: keyof Colors;
  scrollLayerRef?: React.RefObject<HTMLDivElement>;
  isHover?: boolean;
  label?: string;
}

export type StyledMenuItemProps = {
  $isActive?: boolean;
  $isDisabled?: boolean;
  $variant?: MenuItemVariant;
  $statusColor?: keyof Colors;
  $isHover?: boolean;
  $label?: string;
};
