/* eslint-disable no-unused-expressions */
import { useTranslation } from '@pancakeswap/localization'
import {
  AutoRow,
  Box,
  Button,
  CircleLoader,
  Flex,
  InjectedModalProps,
  ModalBody,
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  HelpIcon,
  TooltipText,
  useTooltip,
  NumericalInput,
  Text,
} from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { ApprovalState } from 'hooks/useApproveCallback'
import useWindowSize from 'hooks/useWindowSize'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { TYPE_BY } from 'views/Vesting'

const StyledModalContainer = styled(ModalContainer)`
  padding: 32px 24px;
  position: relative;
  border-radius: 20px;

  .corner1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 28px;
    border-radius: 20px;
    z-index: 1;
    border-top: 1px solid #ffb000;
    border-left: 1px solid #ffb000;
    border-top-right-radius: unset;
    border-bottom-left-radius: unset;
  }

  .edge1 {
    width: 1px;
    height: calc(75% - 28px);
    position: absolute;
    top: 28px;
    left: 0;
    z-index: 1;
    background: linear-gradient(to top, rgba(16, 16, 16, 0.3) 15%, #ed1c51, #ffb000);
  }

  .corner2 {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 28px;
    border-radius: 20px;
    z-index: 1;
    border-top: 1px solid #ffb000;
    border-right: 1px solid #ffb000;
    border-top-left-radius: unset;
    border-bottom-right-radius: unset;
  }

  .edge2 {
    width: 1px;
    height: calc(75% - 28px);
    position: absolute;
    top: 28px;
    right: 0;
    z-index: 1;
    background: linear-gradient(to top, rgba(16, 16, 16, 0.3) 15%, #ed1c51, #ffb000);
  }

  @media screen and (max-width: 900px) {
    padding: 18px;
  }
`

const StyledModalHeader = styled(ModalHeader)`
  padding: 0px !important;

  @media screen and (max-width: 900px) {
    margin-bottom: 16px;
  }
`

const StyledModalBody = styled(ModalBody)`
  img {
    height: 20px;
    width: 20px;
    margin-right: 8px;
    object-fit: cover;

    @media screen and (max-width: 900px) {
      height: 16px;
      width: 16px;
    }
  }

  .coin {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 12px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    @media screen and (max-width: 900px) {
      font-size: 12px;
      line-height: 15px;
      margin-left: 8px;
    }
  }
  .balance {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 8px;
  }

  .balance_mb {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: rgba(255, 255, 255, 0.6);
  }
  .buy_xox {
    width: 400px;
    @media screen and (max-width: 900px) {
      width: 100%;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      height: 37px;
    }
  }

  .text_mb {
    font-size: 12px;
    line-height: 15px;
  }

  @media screen and (max-width: 900px) {
    .xox_amount {
      margin: 16px 0px !important;
    }

    .xoxs_amount {
      margin-bottom: 16px;
    }

    .value {
      font-size: 14px !important;
      line-height: 17px !important;
    }
  }
`

const ButtonStyle = styled.button`
  padding: 6px 14px;
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: rgba(255, 255, 255, 0.87);
  border: none;
  cursor: pointer;
`

const BoxCenter = styled(Box)`
  padding: 8px 14px;
  border: 1px solid #444444;
  border-radius: 6px;
  width: 400px;
  display: flex;
  align-items: center;

  .ref_code {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.87);
    &::placeholder {
      color: rgba(255, 255, 255, 0.38);
      @media screen and (max-width: 900px) {
        width: 100%;
        font-size: 14px;
        line-height: 17px;
      }
    }
    &:focus {
      outline: none;
    }
    @media screen and (max-width: 900px) {
      font-size: 14px;
      line-height: 17px;
    }
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    padding: 7px 14px;
    margin-top: 8px;
  }
`

const ErrorReferral = styled.div`
  font-size: 12px;
  color: #f44336;
  width: 100%;
  margin-top: 8px;
`
interface INumericalInputStyledProps {
  amount?: string
}
const NumericalInputStyled = styled(NumericalInput)<INumericalInputStyledProps>`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  background: transparent;
  color: ${({ amount }) => (amount ? `rgba(255, 255, 255, 0.87)` : `rgba(255, 255, 255, 0.38)`)};
  width: 100%;
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
    font-size: 14px;
    line-height: 17px;
  }
`

const FlexCustom = styled(Flex)`
  align-items: center;

  .title_ref {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 700;
    font-size: 12px;
    margin-right: 20px;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .title_ref {
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.6);
    }

    .full_width {
      width: 100%;
    }
  }
`

export const TextCustom = styled(Text)`
  @media screen and (max-width: 900px) {
    font-size: 18px;
    line-height: 22px;
  }
`

interface Props extends InjectedModalProps {
  amount: string
  setAmount: (amount: string) => void
  typeBuyPrice: number
  approvalState: number
  handeInvest: (code: any, curr: number) => void
  approvalSubmitted: boolean
  handleApprove: () => void
  ethPerDolla: number
  currentRound: number
  handleChangeReferal: (value: string) => void
  setCodeRef: (value: any) => void
  referralError: any
  isTimeAllowWhitelist?: boolean
  amountXOX: string | number
  amountXOXS: string | number
  setAmountXOX: (value: string | number) => void
  setAmountXOXS: (value: string | number) => void
  balanceLP: any
  balanceNative: any
  massageErrorAmount: string
  referralCode: any
}

function ModalSaleExchange({
  onDismiss,
  amount,
  setAmount,
  typeBuyPrice,
  approvalState,
  handeInvest,
  approvalSubmitted,
  handleApprove,
  ethPerDolla,
  currentRound,
  handleChangeReferal,
  setCodeRef,
  referralError,
  amountXOX,
  amountXOXS,
  massageErrorAmount,
  setAmountXOX,
  setAmountXOXS,
  balanceLP,
  balanceNative,
  referralCode,
}: Props) {
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const isSwap = approvalState !== ApprovalState.APPROVED && typeBuyPrice === TYPE_BY.BY_ERC20

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Please select the Default option in MetaMask for approval since you are only able to approve USDT once'),
    {
      placement: 'top',
      ...(width < 900 && { hideTimeout: 1500 }),
    },
  )

  const handleRenderXOXAmount = (typeBuy: number, round: number, amountToken: any) => {
    const totalDolla =
      typeBuy === TYPE_BY.BY_ETH
        ? new BigNumber(amountToken || 0).multipliedBy(ethPerDolla).toNumber()
        : amountToken || 0
    switch (round) {
      case 1:
        setAmountXOX(new BigNumber(totalDolla).div(0.044).toNumber().toFixed(2))
        setAmountXOXS(new BigNumber(totalDolla).multipliedBy(0.08).toNumber().toFixed(2))
        break
      case 2:
        setAmountXOX(new BigNumber(totalDolla).div(0.045).toNumber().toFixed(2))
        setAmountXOXS(new BigNumber(totalDolla).multipliedBy(0.06).toNumber().toFixed(2))
        break
      case 3:
        setAmountXOX(new BigNumber(totalDolla).div(0.046).toNumber().toFixed(2))
        setAmountXOXS(new BigNumber(totalDolla).multipliedBy(0.04).toNumber().toFixed(2))
        break
      default:
        break
    }
  }
  useEffect(() => {
    handleRenderXOXAmount(typeBuyPrice, currentRound, amount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeBuyPrice, currentRound, amount])

  return (
    <StyledModalContainer>
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <StyledModalHeader>
        <ModalTitle>
          <TextCustom color="rgba(255, 255, 255, 0.87)" fontWeight={700} fontSize="24px" textAlign="center">
            {t('EXCHANGE')}
          </TextCustom>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </StyledModalHeader>
      <StyledModalBody>
        {width > 900 && (
          <>
            <p style={{ textAlign: 'right', paddingRight: '83px' }} className="balance">
              {t('Balance')}: {typeBuyPrice === TYPE_BY.BY_ERC20 ? balanceLP : balanceNative}
            </p>
            <Flex alignItems="center">
              <Text color="rgba(255, 255, 255, 0.6)" fontWeight={700} fontSize="12px" marginRight="53px">
                {t('Amount')}
              </Text>
              <Flex flexDirection="column">
                <BoxCenter>
                  <NumericalInputStyled
                    value={amount}
                    amount={amount}
                    onUserInput={(value) => setAmount(value)}
                    placeholder="0.00"
                  />
                  <ButtonStyle
                    onClick={() => setAmount(typeBuyPrice === TYPE_BY.BY_ERC20 ? balanceLP : balanceNative)}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {t('All')}
                  </ButtonStyle>
                </BoxCenter>
              </Flex>
              <Text className="coin">
                {typeBuyPrice === TYPE_BY.BY_ERC20 && (
                  <>
                    <img
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.svg`}
                      alt="logo"
                    />
                    <span>USDT</span>
                    <TooltipText ref={targetRef} style={{ height: '24px' }}>
                      <HelpIcon width="20px" height="20px" />
                    </TooltipText>
                    {tooltipVisible && tooltip}
                  </>
                )}
                {typeBuyPrice === TYPE_BY.BY_ETH && (
                  <>
                    <img
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2.svg`}
                      alt="logo"
                    />
                    <span>ETH</span>
                  </>
                )}
              </Text>
            </Flex>
            {massageErrorAmount && <ErrorReferral style={{ paddingLeft: 100 }}>{massageErrorAmount}</ErrorReferral>}
          </>
        )}

        {width <= 900 && (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="rgba(255, 255, 255, 0.6)" fontWeight={700} className="text_mb">
                {t('Amount')}
              </Text>
              <p className="balance_mb">
                {t('Balance')}: {typeBuyPrice === TYPE_BY.BY_ERC20 ? balanceLP : balanceNative}
              </p>
              <Text className="coin">
                {typeBuyPrice === TYPE_BY.BY_ERC20 && (
                  <>
                    <img
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.svg`}
                      alt="logo"
                    />
                    <span>USDT</span>
                    <TooltipText ref={targetRef} style={{ height: '24px' }}>
                      <HelpIcon width="20px" height="20px" />
                    </TooltipText>
                    {tooltipVisible && tooltip}
                  </>
                )}
                {typeBuyPrice === TYPE_BY.BY_ETH && (
                  <>
                    <img
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2.svg`}
                      alt="logo"
                    />
                    <span>ETH</span>
                  </>
                )}
              </Text>
            </Flex>

            <Flex flexDirection="column">
              <BoxCenter>
                <NumericalInputStyled
                  value={amount}
                  amount={amount}
                  onUserInput={(value) => setAmount(value)}
                  placeholder="0.00"
                />
                <ButtonStyle
                  onClick={() => setAmount(typeBuyPrice === TYPE_BY.BY_ERC20 ? balanceLP : balanceNative)}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {t('All')}
                </ButtonStyle>
              </BoxCenter>
              {massageErrorAmount && <ErrorReferral>{massageErrorAmount}</ErrorReferral>}
            </Flex>
          </>
        )}

        <div style={{ display: 'flex' }}>
          <div>
            <Flex alignItems="center" margin="26px 0px" className="xox_amount">
              <Text
                color="rgba(255, 255, 255, 0.6)"
                fontWeight={700}
                fontSize="12px"
                marginRight="25px"
                lineHeight={['17px', , , '24px']}
              >
                {t('XOX Amount')}
              </Text>
            </Flex>

            <Flex alignItems="center" marginBottom="26px" className="xoxs_amount">
              <Text
                color="rgba(255, 255, 255, 0.6)"
                fontWeight={700}
                fontSize="12px"
                marginRight="20px"
                lineHeight={['17px', , , '24px']}
              >
                {t('XOXS Reward')}
              </Text>
            </Flex>
          </div>

          <div>
            <Flex alignItems="center" margin="26px 0px" className="xox_amount">
              <Text color="rgba(255, 255, 255, 0.87)" fontWeight={400} fontSize="16px" className="value">
                {Number(amountXOX) !== 0 ? Number(amountXOX).toLocaleString() : '-'} XOX
              </Text>
            </Flex>

            <Flex alignItems="center" marginBottom="26px" className="xoxs_amount">
              <Text color="rgba(255, 255, 255, 0.87)" fontWeight={400} fontSize="16px" className="value">
                {Number(amountXOXS) !== 0 ? Number(amountXOXS).toLocaleString() : '-'} XOXS
              </Text>
            </Flex>
          </div>
        </div>

        <FlexCustom>
          <Text className="title_ref">{t('Referral Code')}</Text>

          <Flex flexDirection="column" className="full_width">
            <BoxCenter>
              <input
                placeholder={t('Optional')}
                className="ref_code"
                onChange={(e) => {
                  handleChangeReferal(e.target.value)
                  setCodeRef(e.target.value)
                }}
                maxLength={8}
              />
            </BoxCenter>
            {referralError && <ErrorReferral>{referralError}</ErrorReferral>}
          </Flex>
        </FlexCustom>

        <Flex
          alignItems="center"
          justifyContent="center"
          paddingLeft={width <= 900 ? 0 : 19}
          marginTop={width <= 900 ? 16 : 48}
        >
          {Boolean(amount) && isSwap ? (
            <Button
              className="buy_xox"
              onClick={handleApprove}
              disabled={
                approvalState !== ApprovalState.NOT_APPROVED ||
                approvalSubmitted ||
                massageErrorAmount === 'Insufficient balance'
              }
            >
              {approvalState === ApprovalState.PENDING || approvalSubmitted ? (
                <AutoRow justifyContent="center" gap="8px">
                  {t('Approving')}
                  <CircleLoader stroke="white" />
                </AutoRow>
              ) : approvalState === ApprovalState.APPROVED ? (
                t('Approved')
              ) : massageErrorAmount === 'Insufficient balance' ? (
                t('Buy XOX')
              ) : (
                t('Approve %symbol%', { symbol: 'USDT' })
              )}
            </Button>
          ) : (
            <Button
              className="buy_xox"
              onClick={() => handeInvest(referralCode, currentRound)}
              disabled={referralError || !amount || massageErrorAmount}
            >
              {t('Buy XOX')}
            </Button>
          )}
        </Flex>
      </StyledModalBody>
    </StyledModalContainer>
  )
}

export default ModalSaleExchange
