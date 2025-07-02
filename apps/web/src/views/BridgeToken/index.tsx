/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useCallback, useEffect, useMemo } from 'react'
import {
  Flex,
  Button as PancakeButton,
  useMatchBreakpoints,
  useModal,
  LinkExternal,
  useToast,
} from '@pancakeswap/uikit'
import Page from '../Page'
import { useTranslation } from '@pancakeswap/localization'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { StyledInputCurrencyWrapper, StyledSwapContainer, StyledHeader, StyledHeading1 } from './styles'
import AmountInput from './AmountInput'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { chainId, useAccount, useConnect } from 'wagmi'
import { ChainId } from '@pancakeswap/sdk'
import AddressInput from './AddressInput'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import { XOX_ADDRESS } from 'config/constants/exchange'
import { XOX } from '@pancakeswap/tokens'
import styled from 'styled-components'
import { formatEther, parseEther, parseUnits } from '@ethersproject/units'
import { getBridgeTokenAddress } from 'utils/addressHelpers'
import { useBridgeTokenContract, useXOXTokenContractPoolBridge } from '../../hooks/useContract'
import ModalBase from '../Referral/components/Modal/ModalBase'
import Reminder from './Reminder'
// eslint-disable-next-line import/no-cycle
import ModalTransactionHistory from './ModalTransactionHistory'
import { WalletModalV2 } from '@pancakeswap/ui-wallets'
import { createWallets, getDocLink } from 'config/wallet'
import { useActiveHandle } from 'hooks/useEagerConnect.bmp'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import useAuth from 'hooks/useAuth'
import { NETWORK_LABEL, NETWORK_LINK, SITE_NAME } from './networks'
import { GridLoader } from 'react-spinners'
import LiquidityBackgroundDesktop from 'components/Svg/LiquidityBackgroundDesktop'
import LiquidityBackgroundBorderDesktop from 'components/Svg/LiquidityBackgroundBorderDesktop'
import LiquidityBackgroundMobile from 'components/Svg/LiquidityBackgroundMobile'
import LiquidityBackgroundBorderMobile from 'components/Svg/LiquidityBackgroundBorderMobile'
import { ToastDescriptionWithTx } from 'components/Toast'
import { formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'
import { isAddress } from 'utils'
import { useXOXTokenContract } from '../../hooks/useContract'

const SwapButton = styled(PancakeButton)`
  background: ${({ disabled }) =>
    disabled
      ? 'rgba(255, 255, 255, 0.05) '
      : 'linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%)'};
  color: ${({ theme, disabled }) => (disabled ? 'rgba(255, 255, 255, 0.38)' : theme.colors.white)};
  width: 100%;
  border-radius: 12px;
  padding: 16px 20px;
  font-weight: 700;
  font-size: 18px;
  height: 54px;
  margin-bottom: 24px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  > span {
    margin-right: 8px;
  }
  @media (max-width: 576px) {
    padding: 12px 20px;
    font-size: 16px;
  }
`

const WapperHeight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* min-height: 820px; */
`

const WapperBg = styled.div`
  position: relative;
  .mobile {
    display: none;
  }
  @media (max-width: 576px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: block;
    }
  }
`

const Divider = styled.div`
  padding: 0 12px;
  margin: 5px 0;
  text-align: center;

  @media screen and (min-width: 576px) {
    padding: 0 25px;
    margin: 10px 0;
  }
`

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`

const WapperConnectBtn = styled(PancakeButton)`
  width: 100%;
  margin-top: 20px;
  height: 43px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 700;
  border-radius: 8px;
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  color: white;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 48px;
    font-size: 16px;
    line-height: 19px;
  }
`

const Content = styled.div`
  .discription {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    padding: 24px 0px;

    span {
      font-weight: 700;
    }
  }

  .btn-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    button {
      border: none;
      border-radius: 6px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      padding: 12px;
      cursor: pointer;
    }
    & > .cancel {
      background: #313131;
    }
    & > .confirm {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    }
  }

  .noti {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    margin-top: 8px;
    margin-bottom: 24px;
    span {
      color: #fb8618;
      font-weight: 700;
    }
  }
  .noti_claim_success {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }

  .x-close-icon {
    position: absolute;
    top: 11px;
    right: 11px;
    cursor: pointer;
  }

  .xox_loading {
    display: flex;
    justify-content: center;
  }

  .reject_xox {
    display: flex;
    justify-content: center;
    margin: 24px 0;
  }
  .noti_claim_pending_h1 {
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }

  .noti_claim_pending_h3 {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
    margin: 16px 0px;
  }
  .noti_claim_pending_h2 {
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }

  .noti_claim_pending_h4 {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }

  .btn_dismiss_container {
    display: flex;
    justify-content: center;
    margin-top: 24px;
    .btn_dismiss {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      border-radius: 6px;
      padding: 12px 30px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      border: none;
      cursor: pointer;

      &:hover {
        background: #fb8618;
      }
    }
  }

  .submitted {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin-top: 24px;
    margin-bottom: 8px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }
  .view_on {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #fb8618;
    margin-bottom: 24px;
  }

  .btn_close {
    text-align: center;
    width: 100%;
    padding: 12px 0px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    background: #313131;
    border-radius: 6px;
    cursor: pointer;
  }
`

const SwapBackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 100%;
`

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100% - 35px);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  @media (max-width: 576px) {
    width: 98.5%;
    height: calc(100% - 25px);
    top: 25px;
  }
`

const Wrapper = styled(Flex)`
  width: 100%;
  height: fit-content;
  z-index: 0;
  align-items: center;
  justify-content: center;
  margin: 50px 0 100px;
`

const MainBackground = styled.div`
  position: absolute;
  z-index: 0;
  top: -50px;
  left: 0;
  right: 0;
  bottom: 0;
  svg {
    width: 100vw;
    height: auto;
    object-fit: cover;
  }
`

export const defaultChainIdTo = (chainId: any) => {
  switch (chainId) {
    case ChainId.GOERLI:
      return ChainId.BSC_TESTNET
    case ChainId.BSC_TESTNET:
    case ChainId.ARBITRUM_TESTNET:
    case ChainId.POLYGON_TESTNET:
    case ChainId.ZKSYNC_TESTNET:
    case ChainId.OPTIMISM_TESTNET:
      return ChainId.GOERLI
    case ChainId.ETHEREUM:
      return ChainId.BSC
    default:
      return ChainId.ETHEREUM
  }
}

export const linkTransaction = (chainId) => {
  return `${NETWORK_LINK[chainId]}/tx/`
}

export default function BridgeToken() {
  const {
    t,
    currentLanguage: { code },
  } = useTranslation()
  const { address: account } = useAccount()
  const { isMobile } = useMatchBreakpoints()
  const { toastWarning, toastError, toastSuccess } = useToast()
  const { switchNetworkAsync } = useSwitchNetwork()
  const { login } = useAuth()
  const userProfile = useSelector<AppState, AppState['user']['userProfile']>((state) => state.user.userProfile)
  const { chainId: chainIdFrom } = useActiveChainId()

  const [resetChainId, setResetChainId] = useState<boolean>(true)
  const [chainIdTo, setChainIdTo] = useState<ChainId>(defaultChainIdTo(chainIdFrom))
  const [tokenFrom, setTokenFrom] = useState(XOX[chainIdFrom])
  const [tokenTo, setTokenTo] = useState(XOX[chainIdTo])
  const [tokenFromAmount, setTokenFromAmount] = useState<any>('')
  const [tokenToAmount, setTokenToAmount] = useState<any>('')
  const tokenFromBalance = useCurrencyBalance(account ?? undefined, XOX[chainIdFrom])
  const tokenToBalance = useCurrencyBalance(account ?? undefined, XOX[chainIdTo])
  const [zkSyncBalance, setZkSyncBalance] = useState<string>('0')

  const contractXOX = useXOXTokenContractPoolBridge(false, chainIdFrom)
  const [defaultToken, setDefaultToken] = useState(XOX_ADDRESS[chainIdFrom])
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false)
  const [messageAddress, setMessageAddress] = useState('')
  const bridgeTokenContract = useBridgeTokenContract(chainIdFrom)
  const xoxTokenContract = useXOXTokenContract()
  const [addressTo, setAddressTo] = useState(account)
  const [pendingApprove, setPendingApprove] = useState(false)
  const [messageButton, setMessageButton] = useState(t('Enter an amount'))
  const [messageTx, setMessageTx] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalReject, setModalReject] = useState<boolean>(false)
  const [isOpenLoadingClaimModal, setIsOpenLoadingClaimModal] = useState<boolean>(false)
  const [txHash, setTxHash] = useState('')

  const [approvalState, approveCallback] = useApproveCallback(
    XOX_ADDRESS[chainIdFrom] && tryParseAmount(tokenToAmount, XOX[chainIdFrom]),
    chainIdFrom === 1 || chainIdFrom === 5 ? getBridgeTokenAddress(chainIdFrom) : tokenFrom?.address,
  )

  const [minAmount, setMinAmount] = useState<number>(0)
  const [_, setMaxAmount] = useState<number>(0)
  const handleActive = useActiveHandle()
  const { connectAsync } = useConnect()
  const [open, setOpen] = useState(false)
  const docLink = useMemo(() => getDocLink(code), [code])
  const wallets = useMemo(() => createWallets(chainIdFrom, connectAsync), [chainIdFrom, connectAsync])

  const [onHistoryTransactionsModal] = useModal(<ModalTransactionHistory />)

  const handleChangeNetwork = (currentChainId: ChainId, cid: ChainId) => {
    if (!account) return

    if (chainIdFrom === cid) {
      switchNetworkAsync(currentChainId).then((response) => {
        console.log(response)
        if (!response) return
        setTokenFromAmount('')
        setTokenFrom(XOX[currentChainId])

        setChainIdTo(cid)
        setTokenToAmount('')
        setTokenTo(XOX[cid])
        setResetChainId(false)
      })
      return
    }

    if (chainIdTo === cid) {
      switchNetworkAsync(cid).then((response) => {
        console.log(response)
        if (!response) return
        setTokenFromAmount('')
        setTokenFrom(XOX[cid])

        setChainIdTo(currentChainId)
        setTokenToAmount('')
        setTokenTo(XOX[currentChainId])
        setResetChainId(false)
      })
      return
    }

    if (currentChainId === chainIdFrom) {
      switchNetworkAsync(cid).then((response) => {
        if (!response) return
        console.log(response)
        setTokenFromAmount('')
        setTokenFrom(XOX[cid])
        setResetChainId(false)
      })
      return
    }

    setChainIdTo(cid)
    setTokenTo(XOX[cid])
  }

  // handle user type input
  const handleUserInputFrom = useCallback(
    (value: string) => {
      const decimalRegExp = new RegExp('^[+-]?([0-9]{0,20}([.][0-9]{0,18})?|[.][0-9]{0,18})$')
      if (!value || decimalRegExp.test(value) || tokenFromAmount.length > value.length) {
        setTokenFromAmount(value)
      }
    },
    [tokenFromAmount],
  )

  const handleAddressTo = (value: string) => {
    setAddressTo(value)
    const validAdress = isAddress(value)
    if (!validAdress) {
      setMessageAddress(t('Please enter a valid address.'))
    } else setMessageAddress('')
  }

  // handle click button Swap, approve or swap
  const handleSwapButtonClick = () => {
    if (
      (approvalState === ApprovalState.NOT_APPROVED || approvalState === ApprovalState.UNKNOWN) &&
      (chainIdFrom === 1 || chainIdFrom === 5)
    ) {
      approveCallback() //.finally(() => setPendingApprove(true))
      return
    }
    hanleConfirmSwap()
  }

  // handle deposit STAND to contract
  const hanleConfirmSwap = async () => {
    setLoading(true)
    setIsOpenLoadingClaimModal(true)
    try {
      if (chainIdFrom === 1 || chainIdFrom === 5) {
        const params = [addressTo, parseEther(tokenFromAmount), chainIdTo.toString()]
        const gasFee = await bridgeTokenContract.estimateGas.deposit(...params)
        const deposit = await bridgeTokenContract.deposit(...params, {
          gasLimit: gasFee,
        })
        const tx = await deposit.wait(1)
        setMessageTx(t('Swap %amount% %symbol%', { amount: tokenFromAmount, symbol: tokenFrom?.symbol }))
        if (tx?.transactionHash) {
          setIsOpenSuccessModal(true)
          setIsOpenLoadingClaimModal(false)
          setTxHash(tx?.transactionHash)
          setLoading(false)
          setTokenFromAmount('')
          toastSuccess(t('Transaction receipt'), <ToastDescriptionWithTx txHash={tx.transactionHash} />)
        }
        setLoading(false)
        return
      }

      const gasFee = await xoxTokenContract.estimateGas.burnBridge(
        addressTo,
        parseUnits(tokenFromAmount, tokenFrom?.decimals),
        chainIdTo,
      )
      const burnBridge = await xoxTokenContract.burnBridge(
        addressTo,
        parseUnits(tokenFromAmount, tokenFrom?.decimals),
        chainIdTo,
        {
          gasLimit: gasFee,
        },
      )
      const tx = await burnBridge.wait(1)
      setMessageTx(t('Swap %amount% %symbol%', { amount: tokenFromAmount, symbol: tokenFrom?.symbol }))
      if (tx?.transactionHash) {
        setIsOpenSuccessModal(true)
        setIsOpenLoadingClaimModal(false)
        setTxHash(tx?.transactionHash)
        setLoading(false)
        setTokenFromAmount('')
        toastSuccess(t('Transaction receipt'), <ToastDescriptionWithTx txHash={tx.transactionHash} />)
        if (chainIdFrom === ChainId.ZKSYNC || chainIdFrom === ChainId.ZKSYNC_TESTNET) {
          xoxTokenContract
            .balanceOf(account)
            .then((b) => {
              setZkSyncBalance(formatEther(b))
            })
            .catch((e) => console.log(e))
        }
      }
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      setIsOpenLoadingClaimModal(false)
      if (error?.message.includes('rejected')) {
        // setModalReject(true)
        toastWarning(t('Confirm Bridge'), t('Transaction rejected.'))
      } else {
        toastError(t('Confirm Bridge'), t('Transaction failed!.'))
      }
    }
  }

  const handleClick = () => {
    if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
      handleActive()
    } else {
      setOpen(true)
    }
  }

  useEffect(() => {
    if (!account) return
    setAddressTo(account)
  }, [account])

  useEffect(() => {
    if (!chainIdFrom) return
    setTokenFrom(XOX[chainIdFrom])
    if (chainIdFrom === chainIdTo) {
      const chainTo = defaultChainIdTo(chainIdFrom)
      setChainIdTo(chainTo)
      setTokenTo(XOX[chainTo])
    }
  }, [chainIdFrom])

  useEffect(() => {
    const bal =
      chainIdFrom === ChainId.ZKSYNC || chainIdFrom === ChainId.ZKSYNC_TESTNET
        ? zkSyncBalance
        : tokenFromBalance?.toExact()
    if (tokenFromAmount === '' || Number(tokenFromAmount) === 0 || tokenFromAmount === '.') {
      setMessageButton(t('Enter an amount'))
      return
    } else if (
      account &&
      bal &&
      tokenFromAmount &&
      // parseEther(amountInput).gt(parseEther(tokenFromAmount?.toExact())) &&
      parseUnits(tokenFromAmount, tokenFrom?.decimals).gt(parseUnits(bal, tokenFrom?.decimals))
    ) {
      setMessageButton(t('Insufficient Your %symbol% Balance', { symbol: tokenFrom?.symbol }))
      return
    }
    if (approvalState === ApprovalState.UNKNOWN || approvalState === ApprovalState.NOT_APPROVED) {
      setMessageButton(t('Approve %symbol%', { symbol: tokenFrom?.symbol }))
      if (pendingApprove || (chainIdFrom != 1 && chainIdFrom != 5)) {
        setMessageButton(t('Bridge'))
      } else {
        setMessageButton(t('Approve %symbol%', { symbol: tokenFrom?.symbol }))
      }
    } else if (approvalState === ApprovalState.PENDING) {
      setMessageButton(t('Approving...'))
    } else if (tokenToAmount === '0') {
      setMessageButton(t('Input Amount Not Allowed'))
    } else setMessageButton(t('Bridge'))
  }, [approvalState, tokenToAmount, chainIdFrom, tokenFrom, tokenFromAmount, tokenFromBalance, t])

  useEffect(() => {
    if (!resetChainId) {
      setResetChainId(true)
      return
    }

    setChainIdTo(defaultChainIdTo(chainIdFrom))
    setTokenTo(XOX[defaultChainIdTo(chainIdFrom)])
  }, [chainIdFrom])

  useEffect(() => {
    setMessageAddress('')
    if (!account || userProfile) return

    setOpen(false)
  }, [account, userProfile])

  useEffect(() => {
    if (approvalState !== ApprovalState.APPROVED) return

    setPendingApprove(false)
  }, [account, chainIdFrom, approvalState])

  useEffect(() => {
    if (!account || !xoxTokenContract || (chainIdFrom !== ChainId.ZKSYNC && chainIdFrom !== ChainId.ZKSYNC_TESTNET))
      return

    xoxTokenContract
      .balanceOf(account)
      .then((b) => {
        setZkSyncBalance(formatEther(b))
      })
      .catch((e) => console.log(e))
  }, [account, xoxTokenContract])

  return (
    <Page>
      <WapperHeight>
        <Flex width={['328px', , '559px']}>
          <Wrapper flex="column" position="relative">
            {isMobile ? (
              <>
                <SwapBackgroundWrapper>
                  <LiquidityBackgroundMobile />
                </SwapBackgroundWrapper>
                <SwapBackgroundWrapper>
                  <LiquidityBackgroundBorderMobile />
                </SwapBackgroundWrapper>
              </>
            ) : (
              <>
                <SwapBackgroundWrapper>
                  <LiquidityBackgroundDesktop />
                </SwapBackgroundWrapper>

                <SwapBackgroundWrapper>
                  <LiquidityBackgroundBorderDesktop />
                </SwapBackgroundWrapper>
              </>
            )}
            <BackgroundWrapper />
            <StyledSwapContainer>
              <StyledInputCurrencyWrapper>
                <StyledHeader>
                  <div>
                    <StyledHeading1>{t('Bridge')}</StyledHeading1>
                    <p>{t('Bridge tokens in an instant')} </p>
                  </div>
                  <Button onClick={onHistoryTransactionsModal}>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.90918 3.86377V7.50012H6.54556"
                        stroke="#515151"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12.5C2 18.0229 6.47715 22.5 12 22.5C17.5229 22.5 22 18.0229 22 12.5C22 6.97715 17.5229 2.5 12 2.5C8.299 2.5 5.06755 4.51056 3.33839 7.49905"
                        stroke="#515151"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.0026 6.5L12.002 12.5044L16.2417 16.7441"
                        stroke="#515151"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </StyledHeader>
                <AmountInput
                  isTokenFrom
                  currentToken={tokenFrom}
                  remainingToken={tokenTo}
                  currentBalance={tokenFromBalance}
                  zkSyncBalance={
                    chainIdFrom === ChainId.ZKSYNC || chainIdFrom === ChainId.ZKSYNC_TESTNET ? zkSyncBalance : undefined
                  }
                  currentAmount={tokenFromAmount}
                  handleChangeNetwork={handleChangeNetwork}
                  handleUserInput={handleUserInputFrom}
                  handleBalanceMax={(balance: string) => setTokenFromAmount(balance)}
                />
                <Divider>
                  <div>
                    <svg
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => handleChangeNetwork(chainIdFrom, chainIdTo)}
                      aria-hidden="true"
                      style={{ cursor: 'pointer' }}
                    >
                      <circle cx="15.5" cy="15" r="15" fill="#1D1C1C" />
                      <path
                        d="M15.5042 20.9498V9"
                        stroke="#FB8618"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21.5 15L15.5 21L9.5 15"
                        stroke="#FB8618"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Divider>
                <AmountInput
                  isTokenFrom={false}
                  currentToken={tokenTo}
                  remainingToken={tokenFrom}
                  currentBalance={tokenToBalance}
                  currentAmount={tokenToAmount}
                  handleChangeNetwork={handleChangeNetwork}
                />
                {account && (
                  <AddressInput address={addressTo} handleAddressTo={handleAddressTo} messageAddress={messageAddress} />
                )}
                {!account ? (
                  <WapperConnectBtn onClick={handleClick}>{t('Connect Wallet')}</WapperConnectBtn>
                ) : (
                  <SwapButton
                    disabled={
                      process.env.NEXT_PUBLIC_TEST_MODE !== '1' ||
                      (messageButton !== t('Bridge') &&
                        messageButton !== t('Approve %symbol%', { symbol: tokenFrom?.symbol })) ||
                      messageAddress !== '' ||
                      tokenToAmount === '' ||
                      loading ||
                      pendingApprove
                    }
                    onClick={handleSwapButtonClick}
                  >
                    <span>{messageButton}</span>
                    {approvalState === ApprovalState.PENDING}
                  </SwapButton>
                )}
                <Reminder
                  chainId={chainIdFrom}
                  tokenInput={tokenFrom}
                  tokenOutput={tokenTo}
                  amount={tokenFromAmount}
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  onBridgeTokenFeeChange={(minAmount, maxAmount) => {
                    setMinAmount(Number(minAmount))
                    setMaxAmount(Number(maxAmount))
                  }}
                  setAmountTo={setTokenToAmount}
                />
              </StyledInputCurrencyWrapper>
            </StyledSwapContainer>
            <ModalBase
              open={isOpenSuccessModal}
              handleClose={() => setIsOpenSuccessModal(false)}
              title={t('Confirm Bridge')}
            >
              <Content>
                <div className="noti_claim_success">
                  <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/success_claim.png`} alt="success_claim" />
                </div>
                <div className="submitted">{t('Transaction Submitted')}</div>
                <LinkExternal
                  href={`${linkTransaction(chainIdFrom)}${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  color="#FB8618"
                  fontWeight={400}
                  hiddenIcon
                  style={{ margin: '0 auto 24px' }}
                >
                  {t('View on %site%', { site: SITE_NAME[chainIdFrom] })}
                </LinkExternal>
                <div className="btn_close" onClick={() => setIsOpenSuccessModal(false)}>
                  {t('Close')}
                </div>
              </Content>
            </ModalBase>
            <WalletModalV2
              docText={t('Learn How to Connect')}
              docLink={docLink}
              isOpen={open}
              wallets={wallets}
              login={login}
              onDismiss={() => setOpen(false)}
            />
            <ModalBase open={modalReject} handleClose={() => setModalReject(false)} title={t('Confirm Bridge')}>
              <Content>
                <div className="noti_claim_pending_h1 xox_loading reject_xox" style={{ marginTop: '16px' }}>
                  <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/reject_xox.png`} alt="reject_xox" />
                </div>
                <div className="noti_claim_pending_h4">{t('Transaction rejected.')}</div>
                <div className="btn_dismiss_container">
                  <button className="btn_dismiss" type="button" onClick={() => setModalReject(false)}>
                    {t('Dismiss')}
                  </button>
                </div>
                <img
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/close-one.svg`}
                  alt="close-one"
                  className="x-close-icon"
                  aria-hidden="true"
                  onClick={() => setModalReject(false)}
                />
              </Content>
            </ModalBase>
            <ModalBase
              open={isOpenLoadingClaimModal}
              handleClose={() => setIsOpenLoadingClaimModal(false)}
              title={t('Confirm Bridge')}
            >
              <Content>
                <div className="xox_loading" style={{ margin: '24px 0px' }}>
                  <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
                </div>
                <div className="noti_claim_pending_h1">{t('Waiting For Confirmation')}</div>
                <div className="noti_claim_pending_h3">
                  {t('Bridging %number% XOX', { number: formatAmountNumber2(Number(tokenFromAmount), 6) })}{' '}
                  <span>(</span> {NETWORK_LABEL[chainIdFrom]} <span>)</span>{' '}
                  {t('to %number% XOX', { number: formatAmountNumber2(Number(tokenToAmount), 6) })} <span>(</span>{' '}
                  {NETWORK_LABEL[chainIdTo]} <span>)</span>
                </div>
                <div className="noti_claim_pending_h2">{t('Confirm this transaction in your wallet.')}</div>
                <img
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/close-one.svg`}
                  alt="close-one"
                  className="x-close-icon"
                  aria-hidden="true"
                  onClick={() => setIsOpenLoadingClaimModal(false)}
                />
              </Content>
            </ModalBase>
          </Wrapper>
        </Flex>
      </WapperHeight>
    </Page>
  )
}
