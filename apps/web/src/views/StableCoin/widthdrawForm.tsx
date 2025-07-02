/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useCallback, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Button, Text, Select, Dropdown, useToast, useModal, Input } from '@pancakeswap/uikit'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import { useWeb3React } from '@pancakeswap/wagmi'
import { ChainId } from '@pancakeswap/sdk'
import { useTokenContract, useTreasuryXOX } from 'hooks/useContract'
import { formatAmountNumber, getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { calculateGasMargin } from 'utils'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { TransactionResponse } from '@ethersproject/providers'
import { addTransaction } from 'state/transactions/actions'
import { ToastDescriptionWithTx } from 'components/Toast'
import { USD_ADDRESS } from 'config/constants/exchange'
import ConfirmSwapModal from '../Swap/components/ConfirmSwapModal'
import StableCoinModal from './StableCoinModal'
// eslint-disable-next-line import/no-cycle
import { formatNumberDecimal } from './index'
import { useTranslation } from '@pancakeswap/localization'

const WrapForm = styled.div`
  padding: 60px 0;
  width: 450px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 576px) {
    width: auto;
    > div {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    > div:last-child {
      align-items: end;
    }
    padding: 0;
  }
`
const TextStyle = styled(Text)`
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  line-height: 17px;
  &.primary {
    color: ${({ theme }) => theme.colors.violet};
  }
  &.color-white {
    color: rgba(255, 255, 255, 0.87);
  }
  &.error {
    color: #f44336;
    font-weight: 400;
    padding-left: 120px;
  }
  @media (max-width: 576px) {
    &.error {
      padding-left: 0;
    }
  }
`

const BoxRight = styled.div`
  width: calc(100% - 120px);
  min-height: 44px;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    background: none;
    padding: 0 15px;
    height: 44px;
    font-size: 16px;
    padding-right: 90px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    opacity: 1;

    &::placeholder {
      color: rgba(255, 255, 255, 0.38);
    }
    &:focus {
      outline: none;
    }
    &.no-border-text {
      width: auto;
      display: inline-flex;
      border: none;
      padding: 0;
      height: inherit;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.87);
      font-weight: 700;
    }
  }
  &.wrap-select {
    > div {
      height: 44px;
      > div:nth-child(1) {
        height: 44px;
        margin: 0;
      }
      > div > div {
        width: 100%;
        justify-content: flex-start;
        position: relative;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 12px 14px 13px;
        white-space: nowrap;
        > div {
          padding-right: 50px;
          width: 100%;
          @media (max-width: 576px) {
            > div {
              display: block !important;
              &:nth-child(2) {
                max-width: calc(100% - 25px);
                margin: 0px;
                > div {
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
            }
          }
          + div {
            max-width: 330px;
            padding-right: 0;
            position: absolute !important;
            top: 100% !important;
            transform: translate(0px) !important;
            > div {
              background: #1d1c1c;
              box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
              border-radius: 10px;
              > button {
                padding: 12px 14px 13px;
                > div {
                  padding-left: 8px;
                }
              }
            }
          }
          svg {
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }
  @media (max-width: 576px) {
    width: 100%;
    min-height: inherit;
    .menu-mobile-withdraw {
      margin-left: 10px;
      display: block;
      + div {
        display: none;
      }
    }
  }
`

const InputFill = styled.div`
  padding: 0 15px;
  border: 1px solid #444;
  border-radius: 6px;
  height: 44px;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.87);
  &.dropdown {
    cursor: pointer;
    + div {
      width: 100%;
      padding: 0;
      transform: translate(0);
      left: 0;
      background: ${({ theme }) => theme.colors.backgroundAlt};
      border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    }
  }
  & .icon-dropdown {
    position: absolute;
    right: 10px;
  }
  &.no-border {
    border: none;
    padding: 0;
  }
  img {
    max-width: 20px !important;
    margin-right: 10px;
  }
`
const MenuItem = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  padding: 0 20px;
  font-size: 16px;
  img {
    max-width: 20px !important;
    margin-right: 10px;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.tertiary};
    cursor: pointer;
  }
`

const ButtonRight = styled(Button)`
  position: absolute;
  right: 15px;
  top: 9px;
`

const WidthdrawForm = ({ priceAvailable, onSuccess }: { priceAvailable?: any; onSuccess?: any }) => {
  const { t } = useTranslation()
  const [withdrawErrorMessage, setWithdrawErrorMessage] = useState('')
  const [priceState, setPriceState] = useState<any>(priceAvailable)
  const inputRef = useRef(null)
  const priceRef = useRef(null)
  const [pending, setPending] = useState(false)
  const { chainId } = useWeb3React()
  const contractTreasuryXOX = useTreasuryXOX()
  const isUSDT = chainId === ChainId.BSC || chainId === ChainId.BSC_TESTNET
  const decimalCompare = isUSDT ? 18 : 6
  const [keyInput, setKeyInput] = useState(Math.random())
  const [amount, setAmount] = useState<any>()
  const [error, setError] = useState<any>()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastError, toastSuccess, toastWarning } = useToast()
  const symbol = 'USDT'
  const [txHas, setTxHas] = useState('')
  const [decimalError, setDecimalError] = useState(false)
  const tokenContract = useTokenContract(USD_ADDRESS[chainId], false)

  const [onPresentConfirmModal, onDismissModal] = useModal(
    <StableCoinModal
      isUSDT={isUSDT}
      amount={amount}
      txHas={txHas}
      pending={pending}
      withdrawErrorMessage={withdrawErrorMessage}
      iconGridLoader
    />,
    true,
    true,
    'transactionConfirmationModal',
  )

  useEffect(() => {
    if (priceAvailable) {
      priceRef.current.value = `${
        Number(priceAvailable) !== 0 ? formatNumberDecimal(parseFloat(priceAvailable)) : '0'
      } ${isUSDT ? 'USDT' : 'USDC'}`
      setPriceState(priceAvailable)
    }
  }, [priceAvailable])

  const handleSucess = (response: any) => {
    setPending(false)
    setTxHas(response?.hash)
    setWithdrawErrorMessage('')
    const priceAvailable = priceState > amount ? parseFloat(priceState) - parseFloat(amount) : 0
    priceRef.current.value = `${Number(priceAvailable) !== 0 ? formatNumberDecimal(priceAvailable) : '0'} ${
      isUSDT ? 'USDT' : 'USDC'
    }`
    setPriceState(priceAvailable)
    addTransaction(response)
    setTimeout(() => {
      toastSuccess(
        t('Transaction receipt'),
        <ToastDescriptionWithTx txHash={response?.hash} txChainId={response?.chainId} />,
      )
      inputRef.current.value = ''
      setAmount(0)
      onSuccess?.()
    }, 3000)
  }

  const handleWidthdraw = async () => {
    const tokenDecimals = await tokenContract.decimals()
    const fullDecimalWithdrawAmount = getDecimalAmount(new BigNumber(amount), tokenDecimals)
    const estimatedGas: any = await contractTreasuryXOX.estimateGas
      .claimFarmingReward(fullDecimalWithdrawAmount.toString())
      .catch((err) => {
        toastError('Error', t('Can not estimate gas'))
      })

    onPresentConfirmModal()
    setPending(true)
    return callWithGasPrice(contractTreasuryXOX, 'claimFarmingReward', [fullDecimalWithdrawAmount.toString()], {
      gasLimit: calculateGasMargin(estimatedGas),
    })
      .then((response: any) => {
        handleSucess(response)
      })
      .catch((error: any) => {
        setTxHas('')
        onDismissModal()
        setWithdrawErrorMessage(t('Transaction rejected.'))
        setPending(false)
        if (error?.code === 'ACTION_REJECTED' || error?.message?.includes('User rejected')) {
          toastWarning(t('Confirm Withdraw'), t('Transaction rejected.'))
        } else {
          toastError('Error', t('Transaction failed'))
        }
      })
  }

  const formatE = (numberTo: any) => {
    const stringTo = numberTo.toString()
    if (stringTo.indexOf('e') !== -1) {
      return formatNumberDecimal(numberTo, decimalCompare)
    }
    return numberTo
  }

  const handleValidateForm = (value: any) => {
    if (parseFloat(value) > priceState) {
      setError(t('Insufficient balance'))
    } else {
      setError('')
    }
    const stringE = value.toString()
    const parts = stringE.split('.')
    const decimalPlaces = parts[1]?.length
    if (decimalPlaces > decimalCompare) {
      setDecimalError(true)
    } else {
      setDecimalError(false)
    }
  }

  return (
    <WrapForm>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>{t('Network')}</TextStyle>
        <BoxRight className="wrap-select">
          <NetworkSwitcher removeTxtHeader />
        </BoxRight>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>{t('Interest')}</TextStyle>
        <BoxRight>
          <InputFill className="no-border">
            {isUSDT ? (
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.png`}
                alt="icon"
              />
            ) : (
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg`}
                alt="icon"
              />
            )}
            {isUSDT ? 'USDT' : 'USDC'}
          </InputFill>
        </BoxRight>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>{t('Available')}</TextStyle>
        <BoxRight>
          <Flex alignItems="center" height={44}>
            <TextStyle className="color-white">
              <input
                disabled
                className="no-border-text"
                ref={priceRef}
                defaultValue={`${Number(priceAvailable) !== 0 ? priceAvailable : '0'} ${isUSDT ? 'USDT' : 'USDC'}`}
              />
            </TextStyle>
          </Flex>
        </BoxRight>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>{t('Amount')}</TextStyle>
        <BoxRight>
          <input
            ref={inputRef}
            type="text"
            pattern="[0-9]*"
            inputMode="decimal"
            key={keyInput}
            value={amount}
            placeholder="0.00"
            onChange={(e: any) => {
              setAmount(formatE(e?.target?.value.replace(/,/g, '.')))
              handleValidateForm(formatE(e?.target?.value.replace(/,/g, '.')))
            }}
          />

          <ButtonRight
            height={27}
            disabled={!Number(priceState)}
            style={{ fontSize: 12, padding: '0 16px' }}
            onClick={() => {
              setAmount(formatE(priceState))
              handleValidateForm(formatE(priceState))
              setKeyInput(Math.random())
              setError('')
            }}
          >
            {t('All')}
          </ButtonRight>
        </BoxRight>
      </Flex>
      {error && <TextStyle className="error">{error}</TextStyle>}
      <Flex justifyContent="space-between" alignItems="center" mt="2">
        <TextStyle>{t('Platform Fee')}</TextStyle>
        <BoxRight style={{ minHeight: 'unset' }}>
          {amount === undefined || amount === '' ? (
            <TextStyle></TextStyle>
          ) : (
            <TextStyle className="color-white">
              {0.01 * amount < 0.01 ? '< 0.01' : formatAmountNumber(0.01 * amount)}$
            </TextStyle>
          )}
        </BoxRight>
      </Flex>
      <Flex justifyContent="end">
        <Button
          width={140}
          height={43}
          disabled={error || !amount || decimalError || Number(amount) === 0}
          onClick={handleWidthdraw}
        >
          {t('Withdraw')}
        </Button>
      </Flex>
    </WrapForm>
  )
}
export default WidthdrawForm
