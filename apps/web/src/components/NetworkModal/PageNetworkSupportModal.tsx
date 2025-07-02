import { Button, Modal, Text, Grid, Box, Message, MessageText } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import Image from 'next/future/image'
import { useSwitchNetwork, useSwitchNetworkLocal } from 'hooks/useSwitchNetwork'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { chains } from 'utils/wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useMemo } from 'react'
import { useHistory } from 'contexts/HistoryContext'
import NextLink from 'next/link'
import { useMenuItems } from 'components/Menu/hooks/useMenuItems'
import { getActiveMenuItem, getActiveSubMenuItem } from 'components/Menu/utils'
import { useRouter } from 'next/router'
import useAuth from 'hooks/useAuth'
import styled from 'styled-components'

const BoxContainer = styled(Box)`
  display: flex;
  justify-content: center;
`

export function PageNetworkSupportModal() {
  const { t } = useTranslation()
  const { switchNetworkAsync, isLoading, canSwitch } = useSwitchNetwork()
  const switchNetworkLocal = useSwitchNetworkLocal()
  const { chainId, isConnected, isWrongNetwork } = useActiveWeb3React()
  const { logout } = useAuth()

  const foundChain = useMemo(() => chains.find((c) => c.id === chainId), [chainId])
  const historyManager = useHistory()

  const lastValidPath = historyManager?.history?.find((h) => ['/swap', 'liquidity', '/', '/info'].includes(h))

  const menuItems = useMenuItems()
  const { pathname, push } = useRouter()

  const { title, image } = useMemo(() => {
    const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
    const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

    return {
      title: activeSubMenuItem?.disabled ? activeSubMenuItem?.label : activeMenuItem?.label,
      image: activeSubMenuItem?.image || activeMenuItem?.image,
    }
  }, [menuItems, pathname])

  return (
    <Modal title={title || t('Check your network')} hideCloseButton headerBackground="gradientCardHeader">
      <Grid style={{ gap: '16px' }} maxWidth="360px" marginBottom="26px">
        <Text bold color="white">
          {t('Ethereum Only Feature')}
        </Text>

        {image && (
          <BoxContainer mx="auto" my="8px" width="100%" minHeight="250px">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/Group33047.png`}
              alt="ref_xox"
              className="ref_xox"
              style={{ width: '200px', height: '200px', marginTop: '25px' }}
            />
          </BoxContainer>
        )}
        {canSwitch ? (
          <Button
            variant={foundChain && lastValidPath ? 'secondary' : 'primary'}
            isLoading={isLoading}
            onClick={() => switchNetworkAsync(ChainId.GOERLI)}
          >
            {t('Switch to %chain%', { chain: 'Ethereum' })}
          </Button>
        ) : (
          <Message variant="danger">
            <MessageText>{t('Unable to switch network. Please try it on your wallet')}</MessageText>
          </Message>
        )}
      </Grid>
    </Modal>
  )
}
