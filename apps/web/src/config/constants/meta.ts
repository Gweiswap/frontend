import memoize from 'lodash/memoize'
import { ContextApi } from '@pancakeswap/localization'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  siteName: "XOX Labs Swap",
  title: 'Building Decentralized Protocols for the masses. Earn & Trade like a Pro',
  description:
    'Wide range of apps, utilities, and solutions powering the protocol creating a True One-Stop Ecosystem for all your DeFi needs.',
  image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/seo/SEO-Dapp.png`,
}

interface PathList {
  paths: { [path: string]: { siteName?: string; title: string; basePath?: boolean; description?: string; image?: string } }
  defaultTitleSuffix: string
}

const getPathList = (t: ContextApi['t']): PathList => {
  return {
    paths: {
      '/': {
        siteName: "XOX Labs Protocol",
        title: t(
          'Swap, stake, store, bridge, refer, invest and earn with ease on the leading Decentralized Blockchain Ecosystem.',
        ),
        description:
          "Start your Defi Journey Now on XOX Labs, the world's leading one-stop decentralized multi-chain ecosystem. Trade and Earn Like a Pro.",
        image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/seo/SEO-Landing.png`,
      },
      '/company': {
        siteName: "XOX Labs Protocol",
        title: t(
          'Swap, stake, store, bridge, refer, invest and earn with ease on the leading Decentralized Blockchain Ecosystem.',
        ),
        description:
          "Start your Defi Journey Now on XOX Labs, the world's leading one-stop decentralized multi-chain ecosystem. Trade and Earn Like a Pro.",
        image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/seo/SEO-Landing.png`,
      },
      '/tokenomics': {
        siteName: "XOX Labs Protocol",
        title: t(
          'Swap, stake, store, bridge, refer, invest and earn with ease on the leading Decentralized Blockchain Ecosystem.',
        ),
        description:
          "Start your Defi Journey Now on XOX Labs, the world's leading one-stop decentralized multi-chain ecosystem. Trade and Earn Like a Pro.",
        image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/seo/SEO-Landing.png`,
      },
      '/dex-v2': {
        siteName: "XOX Dex V2",
        title: t(
          'XOX Dex V2 - The aggregator of aggregators. Save time and money by trading with the lowest rates and fastest transactions in the space.',
        ),
        basePath: true,
        description:
          'Why trade in a single Dex when you can Trade in all DEXs at Once? XOX Dex V2 finds you the best prices across 60+ Chains & 150+ DEXes and combines them into a single trade, all while giving you many other trades options to choose from, Ranking them by Lowest Fees, Best Rates, and Higher Liquidity.',
        image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/seo/SEO-DexV2.png`,
      },
      '/pre-sales': {
        siteName: "XOX Token Pre-Sales",
        title: t(
          'XOX Token Pre-Sale - Get XOX Tokens at the best prizes while earning up to 10% XOXS Stable Coin as a bonus for free. Get Involved!',
        ),
        description:
          'Launching with Cross-chain liquidity on 6 of the most popular blockchains (ETH, BSC, Polygon, zkSync, Arbitrum, Optimism) XOX Labs is already miles ahead of 90% of its competitors when it comes to accessibility and multi-chain capabilities.',
        image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/seo/SEO-Pre-sale.jpg`,
      },
    },
    defaultTitleSuffix: t('XOX'),
  }
}

export const getCustomMeta = memoize(
  (path: string, t: ContextApi['t'], _: string): PageMeta => {
    const pathList = getPathList(t)
    const pathMetadata =
      pathList.paths[path] ??
      pathList.paths[Object.entries(pathList.paths).find(([url, data]) => data.basePath && path.startsWith(url))?.[0]]

    if (pathMetadata) {
      return {
        title: pathMetadata.title,
        siteName: pathMetadata.siteName,
        ...(pathMetadata.description && { description: pathMetadata.description }),
        ...(pathMetadata.image && { image: pathMetadata.image }),
      }
    }
    return null
  },
  (path, t, locale) => `${path}#${locale}`,
)
