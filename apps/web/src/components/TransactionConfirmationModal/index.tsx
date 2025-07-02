import { ReactElement, useCallback, useEffect, useMemo } from 'react'
import { ChainId, Currency, Token } from '@pancakeswap/sdk'
import styled from 'styled-components'
import {
  Button,
  Text,
  Flex,
  Box,
  Modal,
  InjectedModalProps,
  ModalProps,
  useMatchBreakpoints,
  LinkExternal,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { WrappedTokenInfo } from '@pancakeswap/token-lists'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { GridLoader } from 'react-spinners'
import { AutoColumn, ColumnCenter } from '../Layout/Column'
import { getBlockExploreLink } from '../../utils'
import AddToWalletButton, { AddToWalletTextOptions } from '../AddToWallet/AddToWalletButton'
import { useAccount } from 'wagmi'
import { SITE_NAME } from 'views/BridgeToken/networks'

const Wrapper = styled.div`
  width: 100%;

  .waiting {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }

  .pending {
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }

  .confirm {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .waiting {
      font-size: 18px;
      line-height: 22px;
    }

    .pending {
      font-size: 14px;
      line-height: 17px;
    }
  }
`
const Section = styled(AutoColumn)``

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 14px 0 34px 0;
`
const ButtonFooters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 37px;
  margin-bottom: 32px;
  width: 100%;
  button {
    min-width: 200px;
  }
  @media screen and (max-width: 500px) {
    button {
      min-width: unset;
    }
  }
`
const ConfirmImg = styled.div`
  max-width: 171px;
  max-height: 160px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
`

function ConfirmationPendingContent({
  pendingText,
  iconGridLoader,
}: {
  pendingText: string | React.ReactNode
  iconGridLoader?: any
}) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ConfirmedIcon>
        <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
      </ConfirmedIcon>
      <AutoColumn gap="16px" justify="center">
        <Text className="waiting">{t('Waiting For Confirmation')}</Text>
        <AutoColumn gap="12px" justify="center">
          <Text className="pending">{pendingText}</Text>
        </AutoColumn>
        <Text className="confirm" mb="32px">
          {t('Confirm this transaction in your wallet.')}
        </Text>
      </AutoColumn>
    </Wrapper>
  )
}

export function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
}) {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { address } = useAccount()

  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  const isNeedAddToken = useMemo(() => {
    const tokensAdded = JSON.parse(window.localStorage.getItem('tokensAdded'))

    if (!token?.address) return false

    if (!tokensAdded || !tokensAdded[`${address}:${token.address}`]) return true

    return false
  }, [])

  return (
    <Wrapper style={{ maxWidth: '100%' }}>
      <Section>
        <ConfirmedIcon>
          <ConfirmImg>
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/swap/transaction-submited.png`} alt="" />
          </ConfirmImg>
        </ConfirmedIcon>
        <AutoColumn gap="8px" justify="center">
          <Text fontSize="20px" lineHeight="24px">
            {t('Transaction Submitted')}
          </Text>
          {chainId && hash && (
            <LinkExternal
              href={getBlockExploreLink(hash, 'transaction', chainId)}
              color="#FB8618"
              style={{ fontWeight: 400, marginBottom: '16px' }}
              hiddenIcon
            >
              {t('View on %site%', { site: SITE_NAME[chainId] })}
            </LinkExternal>
          )}
          <ButtonFooters style={{ width: isMobile ? 'auto' : '400px', maxWidth: '100%' }}>
            <Button onClick={onDismiss} maxWidth="200px" height={43} style={{ background: '#313131' }}>
              {t('Close')}
            </Button>
            {currencyToAdd && isNeedAddToken && (
              <AddToWalletButton
                variant="tertiary"
                maxWidth="200px"
                textOptions={AddToWalletTextOptions.TEXT_WITH_ASSET}
                tokenAddress={token.address}
                tokenSymbol={currencyToAdd.symbol}
                tokenDecimals={token.decimals}
                tokenLogo={token instanceof WrappedTokenInfo ? token.logoURI : undefined}
                style={{ fontSize: '16px', height: '43px', marginLeft: '16px' }}
              />
            )}
          </ButtonFooters>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  return (
    <Wrapper>
      <Box>{topContent()}</Box>
      <Box>{bottomContent()}</Box>
    </Wrapper>
  )
}

export function TransactionErrorContent({
  message,
  onDismiss,
}: {
  message: ReactElement | string
  onDismiss?: () => void
}) {
  const { t } = useTranslation()
  return (
    <Wrapper style={{ maxWidth: '800px' }}>
      <AutoColumn justify="center" style={{ width: '300px', maxWidth: '100%' }}>
        {/* <ErrorIcon color="failure" width="64px" /> */}
        <img
          alt=""
          src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/swap/icon-swap-error.svg`}
          style={{ padding: '10px 0' }}
        />
        <Text
          color="failure"
          style={{ textAlign: 'center', width: '85%', wordBreak: 'break-word', color: 'rgba(255, 255, 255, 0.6)' }}
        >
          {message}
        </Text>
      </AutoColumn>

      {onDismiss ? (
        <Flex justifyContent="center" pt="24px" mb="32px">
          <Button onClick={onDismiss} height={43}>
            {t('Dismiss')}
          </Button>
        </Flex>
      ) : null}
    </Wrapper>
  )
}
export function TransactionSwapErrorContent({
  message,
  onDismiss,
}: {
  message: ReactElement | string
  onDismiss?: () => void
}) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <AutoColumn justify="center">
        <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/swap/icon-swap-error.svg`} alt="" />
        <Text
          color="failure"
          style={{ textAlign: 'center', width: '85%', marginTop: '24px', color: '#FFFFFF99', wordBreak: 'break-word' }}
        >
          {message}
        </Text>
      </AutoColumn>

      {onDismiss ? (
        <Flex justifyContent="center" pt="24px" mb="32px">
          <Button onClick={onDismiss} height={43}>
            {t('Dismiss')}
          </Button>
        </Flex>
      ) : null}
    </Wrapper>
  )
}
interface ConfirmationModalProps {
  title: string
  customOnDismiss?: () => void
  hash?: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string | React.ReactNode
  currencyToAdd?: Currency | undefined
  iconGridLoader?: boolean
}

const TransactionConfirmationModal: React.FC<
  React.PropsWithChildren<InjectedModalProps & ConfirmationModalProps & ModalProps>
> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
  iconGridLoader,
  ...props
}) => {
  const { chainId } = useActiveChainId()
  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss?.()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <Modal title={title} {...props} onDismiss={handleDismiss}>
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} iconGridLoader={iconGridLoader} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={handleDismiss}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
    </Modal>
  )
}

export default TransactionConfirmationModal
