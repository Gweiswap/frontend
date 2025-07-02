import { Language } from "../LangSelector/types";
import { FlexProps } from "../Box";

export type TFooterLinkItem = {
  label: string;
  href?: string;
  isHighlighted?: boolean;
  icon?: any;
  label2?: string;
  href2?: string;
  product?: boolean;
  inactive?: boolean;
};

export type FooterLinkType = {
  label: string;
  items: TFooterLinkItem[];
};

export type FooterProps = {
  items: FooterLinkType[];
  buyCakeLabel: string;
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
  cakePriceUsd?: number;
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
  windowSize: number;
} & FlexProps;
