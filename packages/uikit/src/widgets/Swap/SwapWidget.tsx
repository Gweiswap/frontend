import { ButtonProps, IconButton } from "../../components/Button";
import { ArrowDownIcon, ArrowUpDownIcon } from "../../components/Svg";
import { switchButtonClass, iconDownClass, iconUpDownClass, iconSwapClass } from "./SwapWidget.css";
import { CurrencyInputPanel } from "./CurrencyInputPanel";
import { CurrencyInputHeader, CurrencyInputHeaderSubTitle, CurrencyInputHeaderTitle } from "./CurrencyInputHeader";
import { SwapPage } from "./Page";
import { SwapFooter } from "./Footer";
import { SwapInfo, SwapInfoLabel } from "./SwapInfo";
import { TradePrice } from "./TradePrice";

const SwapSwitchButton = (props: ButtonProps) => (
  <span {...props}>
     <ArrowDownIcon color="primary" className={iconSwapClass} />
  </span>
  // <IconButton className={iconDownClass} scale="sm" {...props}>
  //   <ArrowDownIcon color="primary" className={iconSwapClass} />
  //   {/* <ArrowUpDownIcon className={iconUpDownClass} color="primary" /> */}
  // </IconButton>
);

const Swap = {
  SwitchButton: SwapSwitchButton,
  CurrencyInputHeaderTitle,
  CurrencyInputHeaderSubTitle,
  CurrencyInputHeader,
  CurrencyInputPanel,
  Page: SwapPage,
  Footer: SwapFooter,
  Info: SwapInfo,
  InfoLabel: SwapInfoLabel,
  TradePrice,
};

export { Swap };
