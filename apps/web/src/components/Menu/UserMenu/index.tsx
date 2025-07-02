import { useTranslation } from '@pancakeswap/localization'
import {
  Box,
  Flex,
  Text,
  Skeleton,
  LinkExternal,
  CopyAddress,
  LogoutIcon,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  WalletFilledIcon,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Trans from 'components/Trans'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useAuth from 'hooks/useAuth'
import { useEffect, useMemo, useState } from 'react'
import { useProfile } from 'state/profile/hooks'
import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi'
import { parseUnits } from '@ethersproject/units'
import { formatAmountNumber, formatBigNumber } from '@pancakeswap/utils/formatBalance'
import { getBlockExploreLink, getBlockExploreName } from 'utils'
import { AppState, useAppDispatch } from 'state'
import { updateOpenFormReferral, updateUserProfileEdit } from 'state/user/actions'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { XOX_ADDRESS } from 'config/constants/exchange'
import { getBalancesForEthereumAddress } from 'ethereum-erc20-token-balances-multicall'
import { Tooltip } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { NETWORK_LABEL } from 'views/BridgeToken/networks'
import { useSelectedWallet } from '@pancakeswap/ui-wallets'
import { ConnectorNames } from 'config/wallet'

export const LOW_NATIVE_BALANCE = parseUnits('0.002', 'ether')

const TextBox = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.87);
`

const ConnectWalletButtonWrapper = styled(ConnectWalletButton)`
  height: 37px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 43px;
  }
`

const BoxWrapper = styled(Box)`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.87);
  align-items: center;

  button {
    height: 37px;
  }

  svg circle {
    fill: none;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
  }
`

const UserMenuStyle = styled.div`
  padding: 8px 14px;

  & .link-bnb {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #fb8618;
    margin-left: 10px;
  }
`

const MenuItemsStyle = styled.div`
  cursor: pointer;
  padding: 12px 0;

  &:hover {
    background-color: #ffffff10;
  }
`

const UserMenu = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId, isWrongNetwork } = useActiveChainId()
  const { logout, login, forceReloadPage, setForceReloadPage, loggedOut, setLoggedOut } = useAuth()
  const { profile } = useProfile()
  const avatarSrc = profile?.nft?.image?.thumbnail
  const native = useNativeCurrency()
  const [balanceNative, setBalanceNative] = useState<any>()
  const [balanceXOX, setBalanceXOX] = useState<any>()
  const provider = useProvider({ chainId })
  const { data: signer } = useSigner()
  const { isMobile } = useMatchBreakpoints()
  const router = useRouter()
  const { chain } = useNetwork()

  const disabled = useMemo(() => {
    const routerLink = ['/swap', '/bridge-token', '/pools', '/liquidity', '/referral', '/stable-coin']
    if (process.env.NEXT_PUBLIC_TEST_MODE !== '1' && routerLink.includes(router.pathname) && isMobile) return true

    return false
  }, [])

  // useEffect(() => {
  //   const handleChangeChainToBscTestnet = (hexChainId) => {
  //     if (parseInt(hexChainId, 16) !== chain?.id && parseInt(hexChainId, 16) === 97) {
  //       router
  //         .replace({
  //           pathname: router.pathname,
  //           query: {
  //             ...router.query,
  //             chainId: parseInt(hexChainId, 16),
  //           },
  //         })
  //         .then(() => router.reload())
  //     }
  //   }

  //   window.ethereum?.on('chainChanged', handleChangeChainToBscTestnet)

  //   return () => {
  //     window.ethereum?.removeListener('chainChanged', handleChangeChainToBscTestnet)
  //   }
  // }, [account])

  useEffect(() => {
    if (!account || !chainId) return
    const currentProvider = provider
    currentProvider.getBalance(account).then((balance) => {
      setBalanceNative(balance)
    })
    getBalancesForEthereumAddress({
      // erc20 tokens you want to query!
      contractAddresses: [XOX_ADDRESS[chainId]],
      // ethereum address of the user you want to get the balances for
      ethereumAddress: account,
      // your ethers provider
      providerOptions: {
        ethersProvider: currentProvider,
      },
    })
      .then((balance) => {
        setBalanceXOX(balance.tokens[0])
      })
      .catch((error) => {
        console.warn(error)
        setBalanceXOX(undefined)
      })
  }, [account, chainId, provider])

  const userProfile = useSelector<AppState, AppState['user']['userProfile']>((state) => state.user.userProfile)

  const setOpenFormReferral = async () => {
    signer
      ?.signMessage('Authentication')
      ?.then((res) => {
        axios
          .get(`${process.env.NEXT_PUBLIC_API}/users/${account}`, { headers: { signature: res } })
          .then((result) => {
            dispatch(updateUserProfileEdit({ userProfile: result.data }))
            dispatch(updateOpenFormReferral({ openFormReferral: true }))
          })
          .catch((error) => console.warn(error))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const renderAvataImage = () => {
    if (userProfile?.avatar) {
      return (
        <img
          src={userProfile.avatar}
          width="100%"
          height="100%"
          alt=""
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
      )
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" fill="#8E8E8E" />
        <path
          d="M50 86C37.5 86 26.45 79.6 20 70C20.15 60 40 54.5 50 54.5C60 54.5 79.85 60 80 70C76.6944 74.922 72.2293 78.9558 66.9978 81.7459C61.7663 84.536 55.929 85.9969 50 86ZM50 15C53.9782 15 57.7936 16.5804 60.6066 19.3934C63.4197 22.2064 65 26.0218 65 30C65 33.9782 63.4197 37.7936 60.6066 40.6066C57.7936 43.4197 53.9782 45 50 45C46.0218 45 42.2064 43.4197 39.3934 40.6066C36.5803 37.7936 35 33.9782 35 30C35 26.0218 36.5803 22.2064 39.3934 19.3934C42.2064 16.5804 46.0218 15 50 15ZM50 0C43.4339 0 36.9321 1.29329 30.8658 3.80602C24.7995 6.31876 19.2876 10.0017 14.6447 14.6447C5.26784 24.0215 0 36.7392 0 50C0 63.2608 5.26784 75.9785 14.6447 85.3553C19.2876 89.9983 24.7995 93.6812 30.8658 96.194C36.9321 98.7067 43.4339 100 50 100C63.2608 100 75.9785 94.7322 85.3553 85.3553C94.7322 75.9785 100 63.2608 100 50C100 22.35 77.5 0 50 0Z"
          fill="#444444"
        />
      </svg>
    )
  }

  useEffect(() => {
    if (account) {
      setForceReloadPage(true)
    } else if (!account && forceReloadPage) {
      // window.location.reload()
    }
  }, [account])

  useEffect(() => {
    if (loggedOut) return

    login(ConnectorNames.Injected)
  }, [chain])

  const UserMenuItems = ({ setOpen }) => {
    return disabled ? (
      <></>
    ) : (
      <UserMenuStyle>
        <div>
          <Flex flexDirection="row">
            <Flex width="45px" height="45px" minWidth="45px" mr="8px">
              {renderAvataImage()}
            </Flex>
            <Flex flexDirection="column" width="100%">
              <Flex flexDirection="row" justifyContent="space-between" mb="8px">
                <Tooltip title={userProfile?.username}>
                  <Text
                    fontSize="16px"
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="19px"
                    color="rgba(255, 255, 255)"
                  >
                    {userProfile?.username?.length > 9
                      ? `${userProfile?.username.substring(0, 7)}...${userProfile?.username.substring(
                          userProfile?.username.length - 2,
                        )}`
                      : userProfile?.username}
                  </Text>
                </Tooltip>
                {/* eslint-disable-next-line */}
                <div
                  style={{ cursor: 'pointer', borderRadius: '50%', overflow: 'hidden' }}
                  onClick={() => {
                    setOpenFormReferral()
                    setOpen(false)
                  }}
                  onKeyDown={() => {
                    setOpenFormReferral()
                    setOpen(false)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M0.374023 11.6573V14.626H3.34277L12.0986 5.87017L9.12986 2.90142L0.374023 11.6573ZM14.3944 3.57434C14.7032 3.26559 14.7032 2.76684 14.3944 2.45809L12.5419 0.605586C12.2332 0.296836 11.7344 0.296836 11.4257 0.605586L9.97694 2.05434L12.9457 5.02309L14.3944 3.57434Z"
                      fill="#8E8E8E"
                    />
                  </svg>
                </div>
              </Flex>
              <Text
                fontSize="12px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="15px"
                color="rgba(255, 255, 255)"
                marginBottom="6px"
              >
                {userProfile?.email}
              </Text>
              <Text
                fontSize="12px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="15px"
                color="rgba(255, 255, 255)"
                marginBottom="8px"
              >
                {userProfile?.telegram}
              </Text>
            </Flex>
          </Flex>
        </div>

        <UserMenuDivider />

        <Flex flexDirection="column" mb="12px" mt="12px">
          <CopyAddress tooltipMessage={t('Copied')} account={account} />
          {userProfile?.referralCode && (
            <Text fontSize="14px" fontWeight="500" lineHeight="17px" color="rgba(255, 255, 255, 0.87)" marginTop="8px">
              {/* eslint-disable react/jsx-boolean-value */}
              <CopyAddress tooltipMessage={t('Copied')} account={userProfile?.referralCode} referralCode={true} />
            </Text>
          )}
        </Flex>

        <UserMenuDivider />

        <Flex justifyContent="space-between" alignItems="center" mt="12px">
          <Flex
            borderRadius="200px"
            pl="4px"
            pr="8px"
            py="2px"
            border="1px solid #444444"
            padding="6px"
            alignItems="center"
          >
            {/* <ChainLogo chainId={ChainId.BSC} /> */}
            <Flex width="24px" height="24px">
              <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/chains/${chainId}.svg`} alt="BNB" />
            </Flex>
            <Text color="white" ml="4px" fontSize="12px" lineHeight="15px">
              {chainId !== 56 ? NETWORK_LABEL[chainId] : 'BNB Smart Chain'}
              {/* {chainName() === 'BNB' ? `${chainName()} Smart Chain` : chainName()} */}
            </Text>
          </Flex>
          <LinkExternal href={getBlockExploreLink(account, 'address', chainId)} className="link-bnb">
            {getBlockExploreName(chainId)}
          </LinkExternal>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" width="100%" mt="8px">
          <Text fontSize="14px" fontWeight="500" lineHeight="17px" color="rgba(255, 255, 255, 0.87)">
            {native.symbol} {t('Balance')}
          </Text>
          {!balanceNative ? (
            <Skeleton height="22px" width="60px" />
          ) : (
            <Text fontSize="14px" fontWeight="500" lineHeight="17px" color="rgba(255, 255, 255, 0.87)">
              {formatBigNumber(balanceNative, 6)}
            </Text>
          )}
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" width="100%" mb="12px" mt="8px">
          <Text fontSize="14px" fontWeight="500" lineHeight="17px" color="rgba(255, 255, 255, 0.87)">
            XOX {t('Balance')}
          </Text>
          {!balanceXOX ? (
            <Skeleton height="22px" width="60px" />
          ) : (
            <Text fontSize="14px" fontWeight="500" lineHeight="17px" color="rgba(255, 255, 255, 0.87)">
              {formatAmountNumber(balanceXOX.balance, 6)}
            </Text>
          )}
        </Flex>

        <UserMenuDivider />

        <MenuItemsStyle
          onClick={() => {
            logout()
            setLoggedOut(true)
          }}
        >
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <TextBox>{t('Disconnect')}</TextBox>
            <LogoutIcon />
          </Flex>
        </MenuItemsStyle>
      </UserMenuStyle>
    )
  }

  if (account) {
    return (
      <UIKitUserMenu
        disabled={disabled}
        account={account}
        avatarSrc={avatarSrc}
        text=""
        variant="default"
        uncloseWhenClick
      >
        {({ isOpen, setIsOpen }) => (isOpen ? <UserMenuItems setOpen={setIsOpen} /> : null)}
      </UIKitUserMenu>
    )
  }

  if (isWrongNetwork && userProfile) {
    return (
      <UIKitUserMenu disabled={disabled} text={t('Network')} variant="danger" uncloseWhenClick>
        {({ isOpen, setIsOpen }) => (isOpen ? <UserMenuItems setOpen={setIsOpen} /> : null)}
      </UIKitUserMenu>
    )
  }

  return (
    <ConnectWalletButtonWrapper scale="sm">
      <BoxWrapper display={['flex', , , 'flex']}>
        <WalletFilledIcon />
        <Trans>Connect</Trans>
      </BoxWrapper>
    </ConnectWalletButtonWrapper>
  )
}

export default UserMenu
