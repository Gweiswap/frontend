import { useTranslation } from '@pancakeswap/localization'
import { ChainId, NATIVE, NEO_EVM_TESTNET } from '@pancakeswap/sdk'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Box,
  Button,
  Flex,
  InfoIcon,
  Text,
  UserMenu,
  UserMenuDivider,
  UserMenuItem,
  useMatchBreakpoints,
  useTooltip,
} from '@pancakeswap/uikit'
import { useNetwork } from 'wagmi'
import { useActiveChainId, useLocalNetworkChain } from 'hooks/useActiveChainId'
import { useNetworkConnectorUpdater } from 'hooks/useActiveWeb3React'
import { useHover } from 'hooks/useHover'
import { useSessionChainId } from 'hooks/useSessionChainId'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useMemo } from 'react'
import { chains } from 'utils/wagmi'

import { ChainLogo } from './Logo/ChainLogo'
import { useRouter } from 'next/router'
import { MAINNET_CHAINS, TESTNET_CHAINS } from 'views/BridgeToken/networks'
import replaceBrowserHistory from '@pancakeswap/utils/replaceBrowserHistory'

const NetworkSelect = ({ switchNetwork, chainId, removeTxtHeader }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const activeChains = useMemo(() => {
    return process.env.NEXT_PUBLIC_TEST_MODE === '1'
      ? router.pathname === '/bridge-token' || (router.pathname === '/swap' && router.query.tab === 'kyberswap')
        ? [...MAINNET_CHAINS, ...TESTNET_CHAINS]
        : [...MAINNET_CHAINS.slice(0, 2), ...TESTNET_CHAINS.slice(0, 2),
        ...[NEO_EVM_TESTNET]]
      : router.pathname === '/bridge-token' || (router.pathname === '/swap' && router.query.tab === 'kyberswap')
        ? [...MAINNET_CHAINS]
        : [...MAINNET_CHAINS.slice(0, 2)]
  }, [chainId, router])

  return (
    <>
      {!removeTxtHeader && (
        <>
          <Box px="16px" py="8px">
            <Text color="textSubtle">{t('Select a Network')}</Text>
          </Box>
          <UserMenuDivider />
        </>
      )}
      {chains.map((chain) => {
        return activeChains.includes(chain.id) ? (
          <UserMenuItem
            key={chain.id}
            style={{ justifyContent: 'flex-start' }}
            onClick={() => {
              switchNetwork(chain.id).then((response) => {
                if (!response) return

                replaceBrowserHistory('chainId', chain.id)
              })
            }}
          >
            <ChainLogo chainId={chain.id} />
            <Text color={chain.id === chainId ? '#FB8618' : 'text'} bold={chain.id === chainId} pl="12px">
              {chain.name}
            </Text>
          </UserMenuItem>
        ) : null
      })}
    </>
  )
}

const WrongNetworkSelect = ({ switchNetwork, chainId }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const activeChains =
    process.env.NEXT_PUBLIC_TEST_MODE === '1'
      ? router.pathname === '/bridge-token' || (router.pathname === '/swap' && router.query.tab === 'kyberswap')
        ? [...MAINNET_CHAINS, ...TESTNET_CHAINS]
        : [...MAINNET_CHAINS.slice(0, 2), ...TESTNET_CHAINS.slice(0, 2),
        ...[NEO_EVM_TESTNET]
        ]
      : router.pathname === '/bridge-token' || (router.pathname === '/swap' && router.query.tab === 'kyberswap')
        ? [...MAINNET_CHAINS]
        : [...MAINNET_CHAINS.slice(0, 2)]

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(
      'The URL you are accessing (Chain id: %chainId%) belongs to %network%; mismatching your wallet’s network. Please switch the network to continue.',
      {
        chainId,
        network: chains.find((c) => activeChains.includes(chainId) && c.id === chainId)?.name ?? 'Unknown network',
      },
    ),
    {
      placement: 'auto-start',
      hideTimeout: 0,
    },
  )
  const { chain } = useNetwork()
  const localChainId = useLocalNetworkChain() || ChainId.BSC
  const [, setSessionChainId] = useSessionChainId()

  const localChainName = chains.find((c) => c.id === localChainId)?.name ?? 'BSC'

  const [ref1, isHover] = useHover<HTMLButtonElement>()

  return (
    <>
      <Flex ref={targetRef} alignItems="center" px="16px" py="8px">
        <InfoIcon color="textSubtle" />
        <Text color="textSubtle" pl="6px">
          {t('Please switch network')}
        </Text>
      </Flex>
      {tooltipVisible && tooltip}
      <UserMenuDivider />
      {chain && (
        <UserMenuItem ref={ref1} onClick={() => setSessionChainId(chain.id)} style={{ justifyContent: 'flex-start' }}>
          <ChainLogo chainId={chain.id} />
          <Text color="secondary" bold pl="12px">
            {chain.name}
          </Text>
        </UserMenuItem>
      )}
      <Box px="16px" pt="8px">
        {isHover ? <ArrowUpIcon color="text" /> : <ArrowDownIcon color="text" />}
      </Box>
      <UserMenuItem onClick={() => switchNetwork(localChainId)} style={{ justifyContent: 'flex-start' }}>
        <ChainLogo chainId={localChainId} />
        <Text pl="12px">{localChainName}</Text>
      </UserMenuItem>
      <Button mx="16px" my="8px" scale="sm" onClick={() => switchNetwork(localChainId)}>
        {t('Switch network in wallet')}
      </Button>
    </>
  )
}

export const NetworkSwitcher = (props: any) => {
  const { t } = useTranslation()
  const { chainId, isWrongNetwork, isNotMatched } = useActiveChainId()
  const { pendingChainId, isLoading, canSwitch, switchNetworkAsync } = useSwitchNetwork()
  // const router = useRouter()
  // const { address: account } = useAccount()

  const { isMobile } = useMatchBreakpoints()
  const router = useRouter()

  const disabled = useMemo(() => {
    const routerLink = ['/swap', '/bridge-token', '/pools', '/liquidity', '/referral', '/stable-coin']
    if (process.env.NEXT_PUBLIC_TEST_MODE !== '1' && routerLink.includes(router.pathname) && isMobile) return true

    return false
  }, [])

  useNetworkConnectorUpdater()

  const foundChain = useMemo(
    () => chains.find((c) => c.id === (isLoading ? pendingChainId || chainId : chainId)),
    [isLoading, pendingChainId, chainId],
  )
  const symbol = NATIVE[foundChain?.id]?.symbol ?? foundChain?.nativeCurrency?.symbol
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Unable to switch network. Please try it on your wallet'),
    { placement: 'bottom' },
  )

  const cannotChangeNetwork = !canSwitch

  // if (!chainId || (!account && router.pathname.includes('info'))) {
  //   return null
  // }

  return (
    <Box ref={cannotChangeNetwork ? targetRef : null} height="100%">
      {cannotChangeNetwork && tooltipVisible && tooltip}
      <UserMenu
        mr="16px"
        placement="bottom"
        variant={isLoading ? 'pending' : isWrongNetwork ? 'danger' : 'default'}
        avatarSrc={`/images/chains/${chainId}.svg`}
        disabled={cannotChangeNetwork || disabled}
        text={
          isLoading ? (
            t('Requesting')
          ) : isWrongNetwork ? (
            t('Network')
          ) : foundChain ? (
            <>
              <Box
                className={props?.removeTxtHeader ? 'menu-mobile-withdraw' : ''}
                display={['none', null, null, null, null, 'block']}
              >
                {foundChain.name}
              </Box>
              <Box display={['block', null, null, null, null, 'none']}>{symbol}</Box>
            </>
          ) : (
            t('Select a Network')
          )
        }
      >
        {
          () => (
            // isNotMatched ? (
            //   <WrongNetworkSelect switchNetwork={switchNetworkAsync} chainId={chainId} />
            // ) : (
            <NetworkSelect
              switchNetwork={switchNetworkAsync}
              chainId={chainId}
              removeTxtHeader={props?.removeTxtHeader}
            />
          )
          // )
        }
      </UserMenu>
    </Box>
  )
}
