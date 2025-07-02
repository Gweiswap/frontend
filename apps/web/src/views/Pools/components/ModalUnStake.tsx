/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Button, InjectedModalProps, ModalContainer, ModalHeader, NumericalInput } from '@pancakeswap/uikit'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { parseEther } from '@ethersproject/units'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { formatNumber } from '@pancakeswap/utils/formatBalance'
import { Tooltip } from '@mui/material'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@pancakeswap/localization'
import { formatToShowBalance } from './utils/formatBalance'

const StyledModalContainer = styled(ModalContainer)`
  position: relative;
  width: fit-content;
  background: #101010;

  border: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 32px 27px;
  width: 556px;
  @media screen and (max-width: 576px) {
    padding: 24px;
  }
`
const StyledModalHeader = styled(ModalHeader)`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  width: 100%;
  margin-bottom: 15px;
  padding: 0;
`

const ContentUnStake = styled.div`
  padding: 20px;
  background: #1d1c1c;
  border-radius: 10px;
  width: 100%;
  margin-top: 24px;

  .balance_container {
    text-align: right;
    display: flex;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    @media screen and (max-width: 576px) {
      font-size: 12px;
      line-height: 15px;
      font-weight: 400;
    }
  }

  .balanceLP {
    /* text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100px;
    + span {
      margin-left: 5px;
    }
    @media screen and (max-width: 576px) {
      max-width: 90px;
    } */
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .stake {
    p:first-child {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.6);
      @media screen and (max-width: 576px) {
        font-size: 12px;
        line-height: 15px;
        font-weight: 400;
      }
    }
    p:last-child {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.38);
    }

    @media screen and (max-width: 576px) {
      p {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
  .token_lp {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    p:first-child {
      color: rgba(255, 255, 255, 0.38);
    }
    p:last-child {
      color: rgba(255, 255, 255, 0.87);
      @media screen and (max-width: 576px) {
        min-width: fit-content;
      }
    }
    @media screen and (max-width: 576px) {
      p {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }

  .token_usd {
    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.38);
    }
    @media screen and (max-width: 576px) {
      p {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }

  .percent {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    .item_percent_btn {
      padding: 6px 24px;
      border: 1px solid #fb8618;
      border-radius: 40px;
      background: transparent;
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      color: #fb8618;
      margin-left: 8px;
      cursor: pointer;
      &:hover {
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%) !important;
        color: #ffffff !important;
      }
      @media screen and (max-width: 576px) {
        padding: 8px 16px;
        font-size: 12px;
        line-height: 15px;
        margin-left: 5px;
      }
    }
  }
`

const ButtonGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 24px;

  .btn {
    background: #313131;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    flex: 1;
    width: 100%;
    padding: 12px 0px;
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
  .cancel {
    font-weight: 700;
    font-size: 16px;
    line-height: 13px;
    color: #ffffff;
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
  .confirm {
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
  button:disabled,
  button[disabled] {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.38);
    cursor: not-allowed;
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
`

const ContentContainer = styled.div`
  .mes_error {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #f44336;
    margin-top: 8px;
  }
  @media screen and (max-width: 576px) {
    .mes_error {
      font-size: 12px;
      line-height: 15px;
    }
  }
`

interface INumericalInputStyledProps {
  amount?: string
}
export const NumericalInputStyled = styled(NumericalInput)<INumericalInputStyledProps>`
  background: transparent;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${({ amount }) => (amount ? `rgba(255, 255, 255, 0.87)` : `rgba(255, 255, 255, 0.38)`)};
  width: auto;
  ${(props) => props.disabled === true && ' pointer-events: none'};
  & {
    -webkit-text-fill-color: ${({ amount }) => (amount ? `rgba(255, 255, 255, 0.87)` : `rgba(255, 255, 255, 0.38)`)};
    ::placeholder {
      -webkit-text-fill-color: rgba(255, 255, 255, 0.38);
    }
    opacity: 1;
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  @media screen and (max-width: 576px) {
    font-size: 12px;
    line-height: 15px;
  }
`

const CustomButton = styled(Button)`
  height: 37px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 43px;
  }
`

export const ShowBalance = ({ balance }) => {
  const { t } = useTranslation()
  if (balance === '-') return <span className="balance_container">Balance: -</span>
  return (
    <>
      {Number(balance) <= 0.000001 ? (
        <Tooltip title={Number(balance) !== 0 ? `${balance}` : null} placement="top-start">
          <span aria-hidden="true" className="balance_container">
            {t('Balance')}:&nbsp;
            <span className="balanceLP">{Number(balance) !== 0 ? '0.000000...' : 0}</span>
          </span>
        </Tooltip>
      ) : String(balance).length <= 10 ? (
        <span aria-hidden="true" className="balance_container">
          {t('Balance')}:&nbsp;
          <span className="balanceLP">{formatToShowBalance(String(balance))}</span>
        </span>
      ) : (
        <Tooltip title={balance} placement="top">
          <span aria-hidden="true" className="balance_container">
            {t('Balance')}:&nbsp;
            <span className="balanceLP">{formatToShowBalance(String(balance))}</span>
          </span>
        </Tooltip>
      )}
    </>
  )
}

interface Props extends InjectedModalProps {
  balanceLP: any
  totalSupply: any
  reverse: any
  secondToken: any
  handleCallbackAfterSuccess?: () => void
  handleConfirm?: any
  amount?: any
  setAmount?: any
}

const ModalUnStake: React.FC<React.PropsWithChildren<Props>> = ({
  onDismiss,
  balanceLP,
  totalSupply,
  reverse,
  secondToken,
  handleConfirm,
  amount,
  setAmount,
}) => {
  const { t } = useTranslation()
  const listTimesPercents = ['25%', '50%', '75%', 'Max']
  const { account } = useActiveWeb3React()
  const [messageError, setMessageError] = useState('')
  const [amountUSD, setAmountUSD] = useState<any>()
  const [_, setActivePercent] = useState<any>(null)
  const [amountActive, setAmountActive] = useState<any>(null)

  const handlePercent = (item: string) => {
    switch (item) {
      case '25%':
        setAmount(new BigNumber(balanceLP).multipliedBy(0.25).toFixed(14).toString())
        setAmountActive({
          ...amountActive,
          '25%': new BigNumber(balanceLP).multipliedBy(0.25).toFixed(14).toString(),
        })
        break
      case '50%':
        setAmount(new BigNumber(balanceLP).multipliedBy(0.5).toFixed(14).toString())
        setAmountActive({
          ...amountActive,
          '50%': new BigNumber(balanceLP).multipliedBy(0.5).toFixed(14).toString(),
        })
        break
      case '75%':
        setAmount(new BigNumber(balanceLP).multipliedBy(0.75).toFixed(14).toString())
        setAmountActive({
          ...amountActive,
          '75%': new BigNumber(balanceLP).multipliedBy(0.75).toFixed(14).toString(),
        })
        break
      case 'Max':
        setAmount(balanceLP)
        setAmountActive({ ...amountActive, Max: balanceLP })
        break
      default:
        break
    }
  }

  const handleButtonClick = () => {
    handleConfirm()
  }

  useEffect(() => {
    if (Number(balanceLP)) {
      if (amount !== '' && Number(amount) !== 0 && amount !== '.') {
        if (
          account &&
          balanceLP &&
          parseEther(Number(amount).toFixed(18)).gt(parseEther(Number(balanceLP).toFixed(18)))
        ) {
          setMessageError(
            t('Insuficient Your %symbol% Balance', {
              symbol: `XOX - ${secondToken?.symbol} LP`,
            }),
          )
        } else {
          setMessageError('')
        }
      } else {
        setMessageError('')
      }
    } else {
      setMessageError(
        t('No tokens to stake: Get %symbol%', {
          symbol: `XOX - ${secondToken?.symbol} LP`,
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, balanceLP])

  useEffect(() => {
    if (amount && reverse && totalSupply) {
      const amountUsd = new BigNumber(amount).multipliedBy(reverse).dividedBy(totalSupply).toFixed(2).toString()
      setAmountUSD(amountUsd)
    } else {
      setAmountUSD(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])

  return (
    <>
      <StyledModalContainer>
        <StyledModalHeader>{t('Unstake LP tokens')}</StyledModalHeader>
        <ContentContainer>
          <ContentUnStake>
            <div className="flex stake">
              <p>{t('Unstake')}</p>
              <ShowBalance balance={balanceLP} />
            </div>
            <div className="flex token_lp">
              <NumericalInputStyled
                value={amount}
                amount={amount}
                onUserInput={(value) => setAmount(value)}
                placeholder="0"
              />
              <p>XOX - ${secondToken?.symbol} LP</p>
            </div>
            <div className="token_usd">
              <Tooltip title={`${amountUSD ? `$${formatNumber(amountUSD)}` : ''}`} placement="top-start">
                <p style={{ display: 'flex' }}>
                  <span className="balanceLP">~${amountUSD ? formatNumber(amountUSD) : ''}</span>&nbsp;
                </p>
              </Tooltip>
            </div>
            <div className="percent">
              {listTimesPercents.map((item) => {
                return (
                  <button
                    className="item_percent_btn"
                    type="button"
                    key={item}
                    onClick={() => {
                      handlePercent(item)
                      setActivePercent(item)
                    }}
                    style={{
                      background:
                        amountActive?.[`${item}`] === amount
                          ? 'linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%)'
                          : 'none',
                      color: amountActive?.[`${item}`] === amount ? '#fff' : '#fb8618',
                    }}
                    disabled={!Number(balanceLP)}
                  >
                    {t(item)}
                  </button>
                )
              })}
            </div>
          </ContentUnStake>
          {messageError && <p className="mes_error">{messageError}</p>}
          <ButtonGroup>
            <button type="button" className="btn cancel" onClick={onDismiss}>
              {t('Cancel')}
            </button>
            <CustomButton
              type="button"
              className="btn confirm"
              disabled={
                amount === '' || Number(amount) === 0 || amount === '.' || Number(balanceLP) === 0 || !!messageError
              }
              onClick={handleButtonClick}
            >
              {t('Confirm')}
            </CustomButton>
          </ButtonGroup>
        </ContentContainer>
      </StyledModalContainer>
    </>
  )
}

export default ModalUnStake
