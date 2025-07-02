/* eslint-disable import/no-cycle */
import React, { useState } from 'react'
import { ChainId, ERC20Token } from '@pancakeswap/sdk'
import styled from 'styled-components'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { NumericalInput, useMatchBreakpoints } from '@pancakeswap/uikit'
import SelectNetworkButton from './SelectNetworkButton'
import SelectTokenButton from './SelectTokenButton'
import { NETWORK_LABEL } from '../networks'
import { formatAmountNumber, formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'
import { useTranslation } from '@pancakeswap/localization'

const Wrapper = styled.div`
  border-radius: 10px;
  background: #1d1c1c;
  padding: 12px;

  @media screen and (min-width: 576px) {
    border-radius: 15px;
    padding: 16px 24px;
  }
`

interface IPropsTextRow {
  isMobile?: boolean
}

const TextRow = styled.div<IPropsTextRow>`
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textSubtle};

  .label {
    min-width: ${({ isMobile }) => isMobile && '60px'};
  }

  .balance_container {
    font-weight: 400;
    text-align: right;
    display: flex;
    white-space: nowrap;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    align-items: ${({ isMobile }) => (isMobile ? 'flex-end' : 'center')};
    cursor: pointer;
  }

  .balance_pool_container {
    font-weight: 400;
    text-align: right;
    display: flex;
    white-space: nowrap;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    align-items: ${({ isMobile }) => (isMobile ? 'flex-end' : 'center')};
  }

  @media (max-width: 576px) {
    font-size: 12px;
    .label {
      font-size: 14px;
    }
  }
`

const AmountRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  .tooltip {
    background: transparent;
    padding: 7px 0 7px 0;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.textSubTitle};
    font-weight: 400;
    width: calc(100%);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    .holer {
      font-size: 24px;
      color: rgba(255, 255, 255, 0.38);
    }

    @media screen and (max-width: 576px) {
      padding: 10px 0 10px 0;
      font-size: 18px;
      width: calc(100%);
      .holer {
        font-size: 18px;
      }
    }
  }

  .buttons-group {
    display: flex;
    // z-index: 1;

    > button:not(:last-child) {
      margin-right: 10px;

      @media screen and (min-width: 576px) {
        margin-right: 8px;
      }
    }
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;
    }
  }
`

const NumericalInputStyled = styled(NumericalInput)`
  background: transparent;
  padding: 10px 8px 10px 0;
  font-size: 24px;
  width: auto;
  color: ${({ theme }) => theme.colors.textSubTitle};
  font-weight: 400;
  ${(props) => props.disabled === true && ' pointer-events: none'};
  & {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.textSubTitle};
    ::placeholder {
      -webkit-text-fill-color: rgba(255, 255, 255, 0.38);
    }
    opacity: 1;
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }
  @media (max-width: 576px) {
    font-size: 18px;
  }
`

type Props = {
  isTokenFrom: boolean
  currentToken: ERC20Token
  remainingToken: ERC20Token
  currentBalance: any
  zkSyncBalance?: string
  currentAmount: any
  handleChangeNetwork?: (currentChainId: ChainId, cid: ChainId) => void
  handleUserInput?: (str: string) => void
  handleBalanceMax?: any
}

const AmountInput: React.FC<Props> = ({
  isTokenFrom,
  currentToken,
  remainingToken,
  currentBalance,
  zkSyncBalance,
  currentAmount,
  handleChangeNetwork,
  handleUserInput,
  handleBalanceMax,
}) => {
  const { t } = useTranslation()
  const getInputLabel = () => {
    return (isTokenFrom && t('From')) || t('To (estimated)')
  }
  const { isMobile } = useMatchBreakpoints()

  return (
    <Wrapper>
      <TextRow isMobile={isMobile}>
        <span className="label">{getInputLabel()}</span>
        {isTokenFrom && currentBalance !== '-' && (
          <span
            aria-hidden="true"
            className="balance_container"
            onClick={() =>
              currentBalance !== '-' && handleBalanceMax((zkSyncBalance && formatAmountNumber(Number(zkSyncBalance))) || currentBalance?.toSignificant(6))
            }
          >
            {t('Balance')}
            {isMobile ? '' : ':'}
            <span className="balance">
              &nbsp;{(zkSyncBalance && formatAmountNumber(Number(zkSyncBalance))) || formatAmountNumber2(currentBalance?.toSignificant(6), 6)}
            </span>
          </span>
        )}
      </TextRow>

      <AmountRow>
        {isTokenFrom ? (
          <NumericalInputStyled
            value={currentAmount}
            disabled={!isTokenFrom}
            onUserInput={(value) => handleUserInput(value)}
          />
        ) : (
          <div className="tooltip">{currentAmount || <span className="holer">0.0</span>}</div>
        )}

        <div className="buttons-group">
          <SelectTokenButton />
          <SelectNetworkButton currentToken={currentToken} handleChangeNetwork={handleChangeNetwork} />
        </div>
      </AmountRow>
    </Wrapper>
  )
}

export default AmountInput
