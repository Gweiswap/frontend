import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import { ArrowForwardIcon, Button, Grid, Message, MessageText, Modal, Text, FlexGap } from '@pancakeswap/uikit'
import { ChainLogo } from 'components/Logo/ChainLogo'
import useAuth from 'hooks/useAuth'
import { useSessionChainId } from 'hooks/useSessionChainId'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { Chain, useAccount, useNetwork } from 'wagmi'
import Dots from '../Loader/Dots'
import { BRIDGE_CHAINS_ONLY, DAPP_CHAINS, MAINNET_CHAINS } from 'views/BridgeToken/networks'
import { useRouter } from 'next/router'
import { NETWORK_LABEL } from 'views/BridgeToken/networks'
import replaceBrowserHistory from '@pancakeswap/utils/replaceBrowserHistory'
import { useEffect, useState } from 'react'

// Where page network is not equal to wallet network
export function WrongNetworkModal({ currentChain, onDismiss }: { currentChain: Chain; onDismiss: () => void }) {
  const { switchNetworkAsync, isLoading, canSwitch } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { logout } = useAuth()
  const { isConnected } = useAccount()
  const [, setSessionChainId] = useSessionChainId()
  const chainId = currentChain.id || ChainId.BSC
  const { t } = useTranslation()
  const router = useRouter()
  const [isLoadingA, setLoadingA] = useState(false)
  const [isLoadingB, setLoadingB] = useState(false)

  const switchText = t('Switch to %network%', { network: NETWORK_LABEL[ChainId.ETHEREUM] })

  useEffect(() => {
    if (isLoading) return

    setLoadingA(false)
    setLoadingB(false)
  }, [isLoading])

  return (
    <Modal title={t('Unsupported Network')} headerBackground="gradientCardHeader" onDismiss={onDismiss}>
      <Grid style={{ gap: '16px', padding: '0 0 16px 0' }} maxWidth="336px">
        <Button
          isLoading={isLoading && isLoadingA}
          onClick={() => {
            switchNetworkAsync(ChainId.ETHEREUM)
            replaceBrowserHistory('chainId', ChainId.ETHEREUM)
            setLoadingA(true)
          }}
          height={43}
        >
          {isLoading && isLoadingA ? <Dots>{switchText}</Dots> : switchText}
        </Button>
        {isConnected && (
          <Button
            onClick={() =>
              logout().then(() => {
                setSessionChainId(chainId)
              })
            }
            height={43}
          >
            {t('Disconnect Wallet')}
          </Button>
        )}
      </Grid>
    </Modal>
  )
}
