import {
  MenuItemsType,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  DropdownMenuItems,
  CompanyIcon,
  WhitepaperIcon,
  Tokenomics,
  TokenomicsFill,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import SwapIcon from 'components/Svg/SwapIcon'
import BridgeIcon from 'components/Svg/BridgeIcon'
import LiquidityIcon from 'components/Svg/LiquidityIcon'
import ReferralIcon from 'components/Svg/ReferralIcon'
import AssetIcon from 'components/Svg/AssetIcon'
import StableCoinIcon from 'components/Svg/StableCoinIcon'
import FarmingIcon from 'components/Svg/FarmingIcon'
import DexIcon from 'components/Svg/DexIcon'
import MobileIcon from 'components/Svg/MobileIcon'
import LaunchpadIcon from 'components/Svg/LaunchpadIcon'
import RankingIcon from 'components/Svg/RankingIcon'
import EnglishIcon from 'components/Svg/EnglishIcon'
import VietNamIcon from 'components/Svg/VietNamIcon'
import LotteryGame from 'components/Svg/LotteryGameIcon'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean; showTooltip?: string }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Assets'),
      href: '/info',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/decorations/pe2.png`,
      items: [],
    },
    {
      label: t('Trade'),
      href: ['/swap', '/bridge-token'],
      icon: CompanyIcon,
      fillIcon: SwapFillIcon,
      items: [
        {
          label: t('Swap'),
          href: '/swap',
          icon: SwapIcon,
          fillIcon: SwapIcon,
        },
        {
          label: t('Bridge'),
          icon: BridgeIcon,
          fillIcon: BridgeIcon,
          href: '/bridge-token',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Earn'),
      href: ['/liquidity', '/add', '/remove', '/pools'],
      icon: CompanyIcon,
      fillIcon: SwapFillIcon,
      items: [
        {
          label: t('Liquidity'),
          href: '/liquidity',
          icon: LiquidityIcon,
          fillIcon: LiquidityIcon,
        },
        {
          label: t('Farming'),
          href: '/pools',
          icon: FarmingIcon,
          fillIcon: FarmingIcon,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    // {
    //   label: t('Bridge'),
    //   href: '/bridge-token',
    //   icon: SwapIcon,
    //   fillIcon: SwapFillIcon,
    //   showItemsOnMobile: false,
    //   items: [],
    // },
    // {
    //   label: t('Liquidity'),
    //   icon: SwapIcon,
    //   fillIcon: SwapFillIcon,
    //   href: '/liquidity',
    //   activeHref: ['/liquidity', '/add', '/remove'],
    //   showItemsOnMobile: false,
    //   items: [],
    // },
    {
      label: t('Stable Coin'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/stable-coin',
      showItemsOnMobile: false,
      items: [],
    },
    // {
    //   label: t('Farming'),
    //   href: '/pools',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/decorations/pe2.png`,
    //   // supportChainIds: SUPPORT_ONLY_BSC,
    //   items: [],
    // },
    {
      label: t('Referral'),
      href: '/referral',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/decorations/pe2.png`,
      items: [],
    },
    {
      label: t('Pre-sales'),
      href: '/pre-sales',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/decorations/pe2.png`,
      items: [],
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export const configLanding: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Tokenomics'),
      href: '/tokenomics',
      icon: Tokenomics,
      fillIcon: TokenomicsFill,
      image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/decorations/pe2.png`,
      items: [],
    },
    // {
    //   label: t('Whitepaper'),
    //   href: '#',
    //   icon: WhitepaperIcon,
    //   fillIcon: SwapFillIcon,
    //   showItemsOnMobile: false,
    //   items: [
    //     {
    //       label: t('English'),
    //       href: '#',
    //       icon: EnglishIcon,
    //       fillIcon: EnglishIcon,
    //     },
    //     {
    //       label: t('Vietnamese'),
    //       icon: VietNamIcon,
    //       fillIcon: VietNamIcon,
    //       href: '#',
    //     },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    {
      label: t('Company'),
      icon: CompanyIcon,
      fillIcon: SwapFillIcon,
      href: '/company',
      showItemsOnMobile: false,
      items: [],
    },
    {
      label: t('Products'),
      icon: CompanyIcon,
      fillIcon: SwapFillIcon,
      href: ['/swap', '/bridge-token'],
      items: [
        {
          label: t('Swap'),
          href: '/swap',
          icon: SwapIcon,
          fillIcon: SwapIcon,
        },
        {
          label: t('Bridge'),
          icon: BridgeIcon,
          fillIcon: BridgeIcon,
          href: '/bridge-token',
        },
        {
          label: t('Liquidity'),
          icon: LiquidityIcon,
          fillIcon: LiquidityIcon,
          href: '/liquidity',
        },
        {
          label: t('Farming'),
          href: '/pools',
          icon: FarmingIcon,
          fillIcon: FarmingIcon,
          image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/decorations/pe2.png`,
        },
        {
          label: t('Referral'),
          href: '/referral',
          icon: ReferralIcon,
          fillIcon: ReferralIcon,
          image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/decorations/pe2.png`,
        },
        {
          label: t('Assets'),
          href: '/info',
          icon: AssetIcon,
          fillIcon: AssetIcon,
          image: `${process.env.NEXT_PUBLIC_ASSETS_URI}/decorations/pe2.png`,
        },
        {
          label: 'Stable Coin',
          icon: StableCoinIcon,
          fillIcon: StableCoinIcon,
          href: '/stable-coin',
        },
        {
          label: t('Lottery Game'),
          icon: LotteryGame,
          fillIcon: '',
          href: 'javascript:void(0)',
          showTooltip: t('Under Development'),
        },
        {
          label: t('XOX Dex V2'),
          icon: DexIcon,
          fillIcon: '',
          href: '/dex-v2',
        },
        {
          label: t('Mobile App'),
          icon: MobileIcon,
          fillIcon: '',
          href: 'javascript:void(0)',
          showTooltip: t('Under Development'),
        },
        {
          label: t('Launchpad'),
          icon: LaunchpadIcon,
          fillIcon: 'StableCoinIcon',
          href: 'javascript:void(0)',
          showTooltip: t('Under Development'),
        },
        {
          label: t('Coin Listing'),
          icon: RankingIcon,
          fillIcon: 'StableCoinIcon',
          href: 'javascript:void(0)',
          showTooltip: t('Under Development'),
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Dex V2'),
      href: '/dex-v2',
      icon: WhitepaperIcon,
      fillIcon: SwapFillIcon,
      showItemsOnMobile: false,
      items: [],
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
