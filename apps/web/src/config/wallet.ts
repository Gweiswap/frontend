import { WalletConfigV2 } from '@pancakeswap/ui-wallets'
// import { WalletFilledIcon } from '@pancakeswap/uikit'
import type { ExtendEthereum } from 'global'
// import { isFirefox } from 'react-device-detect'
import { metaMaskConnector, walletConnectNoQrCodeConnector } from '../utils/wagmi'

export enum ConnectorNames {
  MetaMask = 'metaMask',
  Injected = 'injected',
  WalletConnect = 'walletConnect',
  BSC = 'bsc',
  Blocto = 'blocto',
  WalletLink = 'coinbaseWallet',
}

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t))

const createQrCode = (chainId: number, connect) => async () => {
  connect({ connector: walletConnectNoQrCodeConnector, chainId })

  // wait for WalletConnect to setup in order to get the uri
  await delay(100)
  const { uri } = (await walletConnectNoQrCodeConnector.getProvider()).connector

  return uri
}

const walletsConfig = ({
  chainId,
  connect,
}: {
  chainId: number
  connect: (connectorID: ConnectorNames) => void
}): WalletConfigV2<ConnectorNames>[] => {
  const qrCode = createQrCode(chainId, connect)
  return [
    {
      id: 'metamask',
      title: 'Metamask',
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/wallets/metamask.svg`,
      installed: typeof window !== 'undefined' && Boolean(window.ethereum?.isMetaMask) && metaMaskConnector.ready,
      connectorId: ConnectorNames.Injected,
      deepLink: `https://metamask.app.link/dapp/${process.env.NEXT_PUBLIC_SITE_DOMAIN}/swap/`,
      qrCode,
      downloadLink: `https://metamask.app.link/dapp/${process.env.NEXT_PUBLIC_SITE_DOMAIN}/swap/`,
    },
    {
      id: 'trust',
      title: 'Trust Wallet',
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/wallets/trust.svg`,
      connectorId: ConnectorNames.Injected,
      installed:
        typeof window !== 'undefined' &&
        !(window.ethereum as ExtendEthereum)?.isSafePal && // SafePal has isTrust flag
        (Boolean(window.ethereum?.isTrust) || Boolean((window.ethereum as ExtendEthereum)?.isTrustWallet)),
      deepLink: `https://link.trustwallet.com/open_url?coin_id=20000714&url=https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/swap/`,
      downloadLink: {
        desktop: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph/related',
      },
      qrCode,
    },
    {
      id: 'okx',
      title: 'OKX Wallet',
      icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/wallets/okx.svg`,
      connectorId: ConnectorNames.Injected,
      installed2: typeof window !== 'undefined' && Boolean(window.ethereum),
      installed:
        typeof window !== 'undefined' &&
        Boolean((window as any).okxwallet) &&
        Boolean(window.ethereum?.isMetaMask) &&
        metaMaskConnector.ready,
      deepLink: `okx://wallet/dapp/details?dappUrl=https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/swap/`,
      downloadLink: {
        desktop: 'https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge',
      },
      qrCode,
    },
  ]
}

export const createWallets = (chainId: number, connect: any) => {
  return walletsConfig({ chainId, connect })
}

const docLangCodeMapping: Record<string, string> = {
  it: 'italian',
  ja: 'japanese',
  fr: 'french',
  tr: 'turkish',
  vi: 'vietnamese',
  id: 'indonesian',
  'zh-cn': 'chinese',
  'pt-br': 'portuguese-brazilian',
}

export const getDocLink = (code: string) =>
  docLangCodeMapping[code]
    ? `https://docs.xoxnet.io/v/${docLangCodeMapping[code]}/get-started/wallet-guide`
    : `https://docs.xoxnet.io/get-started/wallet-guide`
