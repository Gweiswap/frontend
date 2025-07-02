import { usePreloadImages } from '@pancakeswap/hooks'
import { useTranslation } from '@pancakeswap/localization'
import { AtomBox } from '@pancakeswap/ui/components/AtomBox'
import {
  Button,
  CloseIcon,
  Heading,
  HelpIcon,
  Image,
  LinkExternal,
  ModalV2,
  ModalV2Props,
  ModalWrapper,
  MoreHorizontalIcon,
  QuestionHelper,
  SvgProps,
  Tab,
  TabMenu,
  Text,
  useMatchBreakpoints,
  useTooltip,
  WarningIcon,
} from '@pancakeswap/uikit'
import { atom, useAtom } from 'jotai'
import { FC, lazy, PropsWithChildren, Suspense, useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'

import { StepIntro } from './components/Intro'
import {
  desktopWalletSelectionClass,
  walletIconClass,
  promotedGradientClass,
  walletSelectWrapperClass,
} from './WalletModal.css'

const Qrcode = lazy(() => import('./components/QRCode'))

type LinkOfTextAndLink = string | { text: string; url: string }

type DeviceLink = {
  desktop?: LinkOfTextAndLink
  mobile?: LinkOfTextAndLink
}

type LinkOfDevice = string | DeviceLink

export type WalletConfigV2<T = unknown> = {
  id: string
  title: string
  icon: string | FC<React.PropsWithChildren<SvgProps>>
  connectorId: T
  deepLink?: string
  installed?: boolean
  installed2?: boolean
  guide?: LinkOfDevice
  downloadLink?: LinkOfDevice
  mobileOnly?: boolean
  qrCode?: () => Promise<string>
}

interface WalletModalV2Props<T = unknown> extends ModalV2Props {
  wallets: WalletConfigV2<T>[]
  login: (connectorId: T) => Promise<any>
  docLink: string
  docText: string
  onDismiss: () => void
  setLoggedOut?: (b: boolean) => void
}

export class WalletConnectorNotFoundError extends Error {}

export class WalletSwitchChainError extends Error {}

const errorAtom = atom<string>('')

const selectedWalletAtom = atom<WalletConfigV2<unknown> | null>(null)

export function useSelectedWallet<T>() {
  // @ts-ignore
  return useAtom<WalletConfigV2<T> | null>(selectedWalletAtom)
}

// const TabContainer = ({ children, docLink, docText }: PropsWithChildren<{ docLink: string; docText: string }>) => {
//   const [index, setIndex] = useState(0)
//   const { t } = useTranslation()

//   return (
//     <AtomBox position="relative" zIndex="modal" className={modalWrapperClass}>
//       <AtomBox position="absolute" style={{ top: '-50px' }}>
//         <TabMenu activeIndex={index} onItemClick={setIndex} gap="0px" isColorInverse>
//           <Tab>{t('Connect Wallet')}</Tab>
//           <Tab>{t('What’s a Web3 Wallet?')}</Tab>
//         </TabMenu>
//       </AtomBox>
//       <AtomBox
//         display="flex"
//         position="relative"
//         background="gradientCardHeader"
//         borderRadius="card"
//         borderBottomRadius={{
//           xs: '0',
//           md: 'card',
//         }}
//         zIndex="modal"
//         width="full"
//       >
//         {index === 0 && children}
//         {index === 1 && <StepIntro docLink={docLink} docText={docText} />}
//       </AtomBox>
//     </AtomBox>
//   )
// }

const MOBILE_DEFAULT_DISPLAY_COUNT = 6

function MobileModal<T>({
  wallets,
  connectWallet,
  onDismiss,
}: Pick<WalletModalV2Props<T>, 'wallets' | 'docLink' | 'docText'> & {
  connectWallet: (wallet: WalletConfigV2<T>) => void
  onDismiss: () => void
}) {
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <Text
      fontSize="16px"
      fontFamily="Inter"
      fontStyle="normal"
      fontWeight="400"
      lineHeight="24px"
      color="rgba(255, 255, 255, 0.6)"
      style={{ lineHeight: '17px' }}
    >
      1.{' '}
      {t(
        'In case you already installed MetaMask and OKX extension, at the first connection, you have to choose MetaMask or OKX. Once you choose, the selected wallet will be connected after that no matter which wallet you choose is. To resolve the issue, you can disable the wallet which you do not want to connect, in the page chrome://extensions/',
      )}
      <br />
      <br />
      2.{' '}
      {t(
        'In case you installed OKX extension but MetaMask not yet, when clicking on MetaMask, you will be connected to OKX wallet.',
      )}
    </Text>,
    { placement: 'auto' },
  )

  const [selected] = useSelectedWallet()
  const [error] = useAtom(errorAtom)

  return (
    <AtomBox width="full" display="flex" flexDirection="column" style={{ padding: '32px 12px' }}>
      {error ? (
        <AtomBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ gap: '24px' }}
          textAlign="center"
          p="24px"
        >
          <div style={{ position: 'absolute', top: '11px', right: '11px', cursor: 'pointer' }} onClick={onDismiss}>
            <CloseIcon />
          </div>
          {selected && typeof selected.icon === 'string' && <Image src={selected.icon} width={108} height={108} />}
          <div style={{ maxWidth: '246px' }}>
            <ErrorMessage message={error} />
          </div>
        </AtomBox>
      ) : (
        <AtomBox px="32px">
          <div style={{ position: 'absolute', top: '11px', right: '11px', cursor: 'pointer' }} onClick={onDismiss}>
            <CloseIcon />
          </div>
          <Heading
            as="h4"
            fontSize="20px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="24px"
            color="rgba(255, 255, 255, 0.87)"
            textAlign="center"
            mb="8px"
          >
            {t('Connect Wallet')}
          </Heading>
          <Text
            fontSize="14px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="24px"
            color="rgba(255, 255, 255, 0.6)"
            textAlign="center"
            margin="0 auto 16px auto"
            style={{ width: '239px' }}
          >
            {t('Start by connecting with one of these wallets below.')}
          </Text>
          <Text
            fontSize="14px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="17px"
            color="rgba(255, 255, 255, 0.6)"
            textAlign="center"
            mb="40px"
          >
            {t('Reminder: Conflict between MetaMask and OKX')}
            {tooltipVisible && tooltip}
            <span ref={targetRef} style={{ position: 'relative', top: '5px' }}>
              <HelpIcon color="#515151" width={24} />
            </span>
          </Text>
        </AtomBox>
      )}
      <WalletSelect
        displayCount={MOBILE_DEFAULT_DISPLAY_COUNT}
        wallets={wallets}
        onClick={(wallet) => {
          connectWallet(wallet)
          if (wallet.deepLink && wallet.installed === false) {
            if (wallet.id !== 'okx') {
              window.open(wallet.deepLink)
            } else if (wallet.deepLink && wallet.installed2 === false) {
              var now = new Date().valueOf()
              setTimeout(() => {
                if (new Date().valueOf() - now > 1500) return
                if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
                  window.open('https://play.google.com/store/apps/details?id=com.okinc.okex.gp&hl=en&gl=US', '_blank')
                }
                if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
                  window.open('itms-apps://itunes.apple.com/app/okx-buy-bitcoin-eth-crypto/id1327268470?mt=8', '_blank')
                }
              }, 1000)
              window.location.href = wallet.deepLink
            }
          }
        }}
      />
    </AtomBox>
  )
}

function WalletSelect<T>({
  wallets,
  onClick,
  displayCount = 5,
}: {
  wallets: WalletConfigV2<T>[]
  onClick: (wallet: WalletConfigV2<T>) => void
  displayCount?: number
}) {
  const [selected] = useSelectedWallet()
  const recentlyWallet = typeof window !== undefined && window.localStorage.getItem('recently-wallet')
  const { isMobile } = useMatchBreakpoints()

  const marginX = isMobile ? '4px' : '10px'

  return (
    <AtomBox className={walletSelectWrapperClass}>
      {wallets.map((wallet) => {
        const isImage = typeof wallet.icon === 'string'
        const Icon = wallet.icon

        return (
          <Button
            key={wallet.id}
            variant="text"
            height="fit"
            as={AtomBox}
            display="flex"
            alignItems="center"
            style={{
              padding: '1px',
              height: isMobile ? 'fit-content' : '150px',
              width: isMobile ? 'fit-content' : '150px',
              maxWidth: '45%',
              margin: `0 ${marginX}`,
              background:
                wallet.id === selected?.id || (wallet.installed && !selected?.id && recentlyWallet === wallet.id)
                  ? 'linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%)'
                  : '#1D1C1C',
            }}
            flexDirection="column"
            onClick={() => {
              onClick(wallet)
              typeof window !== undefined && window.localStorage.setItem('recently-wallet', wallet.id)
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                letterSpacing: 'normal',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                background: '#1D1C1C',
                borderRadius: '8px',
                padding: `5px`,
                whiteSpace: 'nowrap',
              }}
            >
              <AtomBox
                style={{
                  borderRadius: '50%',
                  width: '62px',
                  height: '62px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isImage ? (
                  <Image src={Icon as string} width={60} height={60} />
                ) : (
                  <Icon width={24} height={24} color="textSubtle" />
                )}
                {/* {(wallet.id === selected?.id || (wallet.installed && !selected?.id)) && (
                <AtomBox
                  position="absolute"
                  inset="0"
                  opacity="0.5"
                  borderRadius="12px"
                  style={{
                    border: '1px solid red',
                  }}
                />
              )} */}
              </AtomBox>
              <Text
                fontSize={['14px', null, '18px']}
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="22px"
                color="rgba(255, 255, 255)"
                mt="16px"
              >
                {wallet.title}
              </Text>
            </div>
          </Button>
        )
      })}
    </AtomBox>
  )
}

export const walletLocalStorageKey = 'wallet'

const lastUsedWalletNameAtom = atom<string>('')

lastUsedWalletNameAtom.onMount = (set) => {
  const preferred = localStorage?.getItem(walletLocalStorageKey)
  if (preferred) {
    set(preferred)
  }
}

function sortWallets<T>(wallets: WalletConfigV2<T>[], lastUsedWalletName: string | null) {
  const sorted = [...wallets].sort((a, b) => {
    if (a.installed === b.installed) return 0
    return a.installed === true ? -1 : 1
  })

  if (!lastUsedWalletName) {
    return sorted
  }
  const foundLastUsedWallet = wallets.find((w) => w.title === lastUsedWalletName)
  if (!foundLastUsedWallet) return sorted
  return [foundLastUsedWallet, ...sorted.filter((w) => w.id !== foundLastUsedWallet.id)]
}

function DesktopModal<T>({
  wallets: wallets_,
  connectWallet,
  onDismiss,
}: Pick<WalletModalV2Props<T>, 'wallets' | 'docLink' | 'docText'> & {
  connectWallet: (wallet: WalletConfigV2<T>) => void
  onDismiss: () => void
}) {
  const wallets: WalletConfigV2<T>[] = wallets_.filter((w) => {
    return w.installed !== false || (!w.installed && (w.guide || w.downloadLink || w.qrCode))
  })

  const [selected] = useSelectedWallet<T>()
  const [error] = useAtom(errorAtom)
  const [qrCode, setQrCode] = useState<string | undefined>(undefined)
  const { t } = useTranslation()

  const connectToWallet = (wallet: WalletConfigV2<T>) => {
    connectWallet(wallet)
  }

  return (
    <>
      <AtomBox
        display="flex"
        flexDirection="column"
        bg="backgroundAlt"
        py="32px"
        zIndex="modal"
        borderRadius="card"
        className={desktopWalletSelectionClass}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
          background: '#101010',
        }}
      >
        <div style={{ position: 'absolute', top: '11px', right: '11px', cursor: 'pointer' }} onClick={onDismiss}>
          <CloseIcon />
        </div>

        <AtomBox px="64px">
          <Heading
            as="h4"
            fontSize="20px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="24px"
            color="rgba(255, 255, 255, 0.87)"
            textAlign="center"
            mb="8px"
          >
            {t('Connect Wallet')}
          </Heading>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="24px"
            color="rgba(255, 255, 255, 0.6)"
            textAlign="center"
            style={{ width: '239px' }}
            mb="16px"
            mx="auto"
          >
            {t('Start by connecting with one of these wallets below')}.
          </Text>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="24px"
            color="rgba(255, 255, 255, 0.6)"
            textAlign="center"
            mb="40px"
            display="flex"
          >
            {t('Reminder: Conflict between MetaMask and OKX')}
            <QuestionHelper
              text={
                <Text
                  fontSize="16px"
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="24px"
                  color="rgba(255, 255, 255, 0.6)"
                >
                  1.{' '}
                  {t(
                    'In case you already installed MetaMask and OKX extension, at the first connection, you have to choose MetaMask or OKX. Once you choose, the selected wallet will be connected after that no matter which wallet you choose is. To resolve the issue, you can disable the wallet which you do not want to connect, in the page chrome://extensions/',
                  )}
                  <br />
                  <br />
                  2.{' '}
                  {t(
                    'In case you installed OKX extension but MetaMask not yet, when clicking on MetaMask, you will be connected to OKX wallet.',
                  )}
                </Text>
              }
              placement="right-start"
              ml="4px"
            />
          </Text>
        </AtomBox>
        <WalletSelect
          wallets={wallets}
          onClick={(w) => {
            connectToWallet(w)
            setQrCode(undefined)
            if (w.qrCode) {
              w.qrCode().then((uri) => {
                setQrCode(uri)
              })
            }
          }}
        />
        <AtomBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ gap: '16px', paddingTop: '16px' }}
          textAlign="center"
        >
          {selected && selected.installed !== false && (
            <>
              {typeof selected.icon === 'string' && <Image src={selected.icon} width={108} height={108} />}
              <Heading
                as="h4"
                fontSize="20px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="24px"
                color="rgba(255, 255, 255, 0.87)"
                textAlign="center"
              >
                {t('Opening')} {selected.title}
              </Heading>
              {error ? (
                <ErrorContent message={error} onRetry={() => connectToWallet(selected)} />
              ) : (
                <Text
                  fontSize="16px"
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="24px"
                  color="rgba(255, 255, 255, 0.6)"
                  textAlign="center"
                >
                  {t('Please confirm in %wallet%', { wallet: selected.title })}
                </Text>
              )}
            </>
          )}
          {selected && selected.installed === false && <NotInstalled qrCode={qrCode} wallet={selected} />}
        </AtomBox>
      </AtomBox>
    </>
  )
}

export function WalletModalV2<T = unknown>(props: WalletModalV2Props<T>) {
  const { wallets, login, docLink, docText, setLoggedOut, ...rest } = props

  const [, setSelected] = useSelectedWallet<T>()
  const [, setError] = useAtom(errorAtom)
  const { t } = useTranslation()

  const imageSources = useMemo(
    () =>
      wallets
        .map((w) => w.icon)
        .filter((icon) => typeof icon === 'string')
        .concat('') as string[],
    [wallets],
  )

  usePreloadImages(imageSources.slice(0, MOBILE_DEFAULT_DISPLAY_COUNT))

  const connectWallet = (wallet: WalletConfigV2<T>) => {
    setSelected(wallet)
    setError('')
    if (wallet.installed !== false || wallet.installed2 !== false) {
      login(wallet.connectorId)
        .then((v) => {
          setLoggedOut && setLoggedOut(false)
          if (v) {
            localStorage.setItem(walletLocalStorageKey, wallet.title)
          }
        })
        .catch((err) => {
          if (err instanceof WalletConnectorNotFoundError) {
            setError(t('no provider found'))
          } else if (err instanceof WalletSwitchChainError) {
            setError(err.message)
          } else {
            setError(t('Error connecting, please authorize wallet to access.'))
          }
        })
    }
  }

  return (
    <ModalV2 closeOnOverlayClick {...rest}>
      <ModalWrapper onDismiss={props.onDismiss} style={{ overflow: 'visible', border: 'none' }}>
        <AtomBox position="relative">
          {isMobile ? (
            <MobileModal
              connectWallet={connectWallet}
              wallets={wallets}
              docLink={docLink}
              docText={docText}
              onDismiss={props.onDismiss}
            />
          ) : (
            <DesktopModal
              connectWallet={connectWallet}
              wallets={wallets}
              docLink={docLink}
              docText={docText}
              onDismiss={props.onDismiss}
            />
          )}
        </AtomBox>
      </ModalWrapper>
    </ModalV2>
  )
}

const NotInstalled = ({ wallet, qrCode }: { wallet: WalletConfigV2; qrCode?: string }) => {
  const { t } = useTranslation()
  return (
    <>
      <Heading
        as="h4"
        fontSize="20px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="700"
        lineHeight="24px"
        color="rgba(255, 255, 255, 0.87)"
        textAlign="center"
        mt="16px"
      >
        {t('%wallet% is not installed', { wallet: wallet.title })}
      </Heading>
      {qrCode && (
        <Suspense>
          <AtomBox overflow="hidden" borderRadius="card" style={{ width: '288px', height: '288px' }}>
            <Qrcode url={qrCode} image={typeof wallet.icon === 'string' ? wallet.icon : undefined} />
          </AtomBox>
        </Suspense>
      )}
      {!qrCode && (
        <Text maxWidth="246px" m="auto">
          {t('Please install the %wallet% browser extension to connect the %wallet% wallet.', {
            wallet: wallet.title,
          })}
        </Text>
      )}
      {wallet.guide && (
        <Button variant="subtle" as="a" href={getDesktopLink(wallet.guide)} external>
          {getDesktopText(wallet.guide, t('Setup Guide'))}
        </Button>
      )}
      {wallet.downloadLink && (
        <Button variant="subtle" as="a" href={getDesktopLink(wallet.downloadLink)} external>
          {getDesktopText(wallet.downloadLink, t('Install'))}
        </Button>
      )}
    </>
  )
}

const ErrorMessage = ({ message }: { message: string }) => (
  <Text bold color="failure">
    <WarningIcon width="16px" color="failure" style={{ verticalAlign: 'middle' }} /> {message}
  </Text>
)

const ErrorContent = ({ onRetry, message }: { onRetry: () => void; message: string }) => {
  const { t } = useTranslation()
  return (
    <>
      <ErrorMessage message={message} />
      <Button variant="subtle" onClick={onRetry}>
        {t('Retry')}
      </Button>
    </>
  )
}

const getDesktopLink = (linkDevice: LinkOfDevice) =>
  typeof linkDevice === 'string'
    ? linkDevice
    : typeof linkDevice.desktop === 'string'
    ? linkDevice.desktop
    : linkDevice.desktop?.url

const getDesktopText = (linkDevice: LinkOfDevice, fallback: string) =>
  typeof linkDevice === 'string'
    ? fallback
    : typeof linkDevice.desktop === 'string'
    ? fallback
    : linkDevice.desktop?.text ?? fallback
