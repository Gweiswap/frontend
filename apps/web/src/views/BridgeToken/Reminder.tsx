import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { ChainId } from '@pancakeswap/sdk'
import { formatUnits, parseEther, parseUnits } from 'ethers/lib/utils'
import debounce from 'lodash/debounce'
import { fetchBridgeTokenFee } from '../../context/globalData'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@pancakeswap/localization'
import { formatAmountNumber } from '@pancakeswap/utils/formatBalance'

const Wrapper = styled.div`
  border-radius: 10px;
  padding: 16px 17px;
  margin-top: 25px;
  background: #1d1c1c;
`

const Heading = styled.h5`
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  margin-bottom: 10px;
  @media (max-width: 576px) {
    font-size: 14px;
  }
`

const ReminderList = styled.ul`
  color: rgba(255, 255, 255, 0.87);
  font-size: 14px;
  line-height: 1.4;
  li {
    display: flex;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.87);
    &::before {
      content: '-';
      display: block;
      margin-right: 5px;
    }
  }
  @media (max-width: 576px) {
    font-size: 12px;
  }
`

type Props = {
  chainId: ChainId
  amount: string
  onBridgeTokenFeeChange: (minAmount: string, maxAmount: string) => void
  setAmountTo: React.Dispatch<React.SetStateAction<string>>
  tokenInput: any
  tokenOutput: any
}

type BridgeTokenFee = {
  gasFee: string
  minCrossChainFee: string
  minAmount: string
  maxAmount: string
}

const initialBridgeTokenFee: BridgeTokenFee = {
  gasFee: '0.00',
  minCrossChainFee: '0.00',
  minAmount: '0.00',
  maxAmount: '0.00',
}

const Reminder: React.FC<Props> = ({
  chainId,
  amount,
  onBridgeTokenFeeChange,
  setAmountTo,
  tokenInput,
  tokenOutput,
}) => {
  const { t } = useTranslation()
  const [bridgeTokenFee, setBridgeTokenFee] = useState<BridgeTokenFee | undefined>(undefined)

  // const debounceFn = useCallback(debounce(fetchData, 800), [])

  // useEffect(() => {
  //   debounceFn(amount, chainId)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [chainId, amount, addressTokenOutput])

  useEffect(() => {
    if (!chainId) {
      setBridgeTokenFee(initialBridgeTokenFee)
      setAmountTo('')
      return
    }

    fetchBridgeTokenFee(chainId, '1')
      .then((res) => {
        const bridgeTokenFeeCurrent: BridgeTokenFee = res?.data
        if (!bridgeTokenFeeCurrent) return

        setBridgeTokenFee((prev) => ({
          ...prev,
          ...bridgeTokenFeeCurrent,
        }))
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error>>', error)
      })
  }, [chainId])

  useEffect(() => {
    if (!bridgeTokenFee) return

    const amountTo = getAmountTo(
      bridgeTokenFee.gasFee,
      bridgeTokenFee.minCrossChainFee,
      bridgeTokenFee.minAmount,
      amount,
    )
    setAmountTo(amountTo)
    onBridgeTokenFeeChange(bridgeTokenFee.minAmount, bridgeTokenFee.maxAmount)
  }, [bridgeTokenFee, amount])

  const formatNumberStr = (numberStr: string) => {
    if (!numberStr) {
      return '0.000'
    }

    return Number(numberStr).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    })
  }

  const getAmountTo = (gasFee: string, crosschainFee: string, minAmount: string, amountBri: any) => {
    if (
      amountBri &&
      amountBri !== ('.' || '') &&
      parseUnits(amountBri, tokenInput.decimals).lt(parseUnits(Number(minAmount).toFixed(3), tokenInput.decimals))
    ) {
      return '0'
    }
    // const decimals = Math.max(gasFee.split('.')[1]?.length || 0, crosschainFee.split('.')[1]?.length || 0)
    const decimals = 18
    const totalFeeParsed = parseUnits(gasFee, decimals).add(parseUnits(crosschainFee, decimals))
    const amountToParsed = amountBri && amountBri !== ('.' || '') && parseUnits(amountBri, decimals).sub(totalFeeParsed)
    return amountBri && amountBri !== ('.' || '') && !amountToParsed.isNegative()
      ? formatAmountNumber(
          parseFloat(new BigNumber(formatUnits(amountToParsed, decimals)).toFixed(6, BigNumber.ROUND_DOWN)),
          6,
        ).toString()
      : amountBri && amountBri !== ('.' || '')
      ? '0'
      : ''
  }

  return (
    <Wrapper>
      <Heading>{t('Reminder:')}</Heading>
      <ReminderList>
        <li>
          {t('Gas Fee is <%number%', {
            number:
              parseFloat(formatNumberStr(bridgeTokenFee?.gasFee)) >= 0.01
                ? formatNumberStr(bridgeTokenFee?.gasFee)
                : '0.01',
          })}{' '}
          {tokenInput?.symbol}
        </li>
        <li>
          {t('Minimum Crosschain Amount is %number%', { number: formatNumberStr(bridgeTokenFee?.minAmount) })}{' '}
          {tokenInput?.symbol}
        </li>
        {/* <li>Maximum Crosschain Amount is {formatNumberStr(bridgeTokenFee?.maxAmount)} STAND</li> */}
        <li>{t('Estimated Time of Crosschain Arrival is 0.5-3 mins')}</li>
        {/* <li>
          Crosschain amount larger than {bridgeTokenFee?.maxAmount}{" "}
          {tokenInput?.symbol} could take up to 24 hours
        </li> */}
      </ReminderList>
    </Wrapper>
  )
}

export default Reminder
