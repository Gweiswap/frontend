import { useEffect, useMemo, useState } from 'react'
import { Currency, CurrencyAmount } from '@pancakeswap/sdk'
import {
  Button,
  ChevronDownIcon,
  Text,
  useModal,
  Flex,
  Box,
  NumericalInput,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import styled, { css } from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { formatAmountNumber2, formatNumber } from '@pancakeswap/utils/formatBalance'
import { useAccount } from 'wagmi'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { CurrencyLogo } from 'components/Logo'

const ForDolar = styled.div`
  position: absolute;
  left: 17px;
  bottom: 40px;
`
const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: start;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
  position: absolute;
  bottom: 0;
`
const PercentButton = styled(Button)`
  background: unset;
  border: 1px solid #fb8618;
  padding: 14px 16px;
  color: #fb8618;
  font-size: 12px;
  font-weight: 700;
  height: 27px;
  border-radius: 30px;
  :hover {
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%) !important;
    color: #fff !important;
  }
`
const TextBalance = styled.div`
  margin-left: 10px;
  z-index: 99;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: rgba(255, 255, 255, 0.6);

  ${({ theme }) => theme.mediaQueries.md} {
    font-weight: 400;
    font-size: 16px;
    line-height: 17px;
  }
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })<{ zapStyle?: ZapStyle }>`
  padding: 0;
  position: absolute;
  z-index: 99;
  right: 17px;
  background: unset;

  &:hover {
    background: unset !important;
  }

  .token-info img {
    width: 16px;
    height: auto;
    margin-right: 5px;
  }

  #pair {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .token-info img {
      width: 25px;
      height: auto;
      margin-right: 10px;
    }

    #pair {
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      color: rgba(255, 255, 255, 0.87);
    }
  }

  ${({ zapStyle, theme }) =>
    zapStyle &&
    css`
      padding: 8px;
      background: ${theme.colors.background};
      border: 1px solid ${theme.colors.cardBorder};
      border-radius: ${zapStyle === 'zap' ? '0px' : '8px'} 8px 0px 0px;
      height: auto;
      position: absolute;
      right: 0;
    `};
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 15px 1rem 0 1rem;
`
const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  z-index: 1;
`
const Container = styled.div<{ zapStyle?: ZapStyle; error?: boolean }>`
  border-radius: 10px;
  position: relative;
  background-color: #1d1c1c;
  box-shadow: ${({ theme, error }) => theme.shadows[error ? 'warning' : 'inset']};
  ${({ zapStyle }) =>
    !!zapStyle &&
    css`
      border-radius: 0px 10px 10px 10px;
    `};
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.6;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

const NumericalInputWrapper = styled(NumericalInput)`
  font-size: 24px;
  /* caret-color: #fb8618; */
  color: rgba(255, 255, 255, 0.87);
  ::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }
  @media screen and (max-width: 576px) {
    font-size: 16px;
  }
`

type ZapStyle = 'noZap' | 'zap'

interface CurrencyInputProps {
  id: string
  value: string
  showQuickInputButton?: boolean
  showMaxButton: boolean
  label?: string
  currency?: Currency | null
  otherCurrency?: Currency | null
  balance: CurrencyAmount<Currency>
  imgUrl: string
  disabled?: boolean
  amountUsd?: string
  onUserInput: (value: string) => void
  onPercentInput?: (percent: number) => void
  onMax?: () => void
  onCurrencySelect?: (currency: Currency) => void
}
export default function CurrencyInput({
  id,
  label,
  value,
  showMaxButton,
  showQuickInputButton,
  currency,
  otherCurrency,
  balance,
  imgUrl,
  disabled,
  amountUsd,
  onUserInput,
  onPercentInput,
  onMax,
  onCurrencySelect,
}: CurrencyInputProps) {
  const { address: account } = useAccount()
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [activePercent, setActivePercent] = useState<any>(null)
  const [autoChange, setAutoChange] = useState(false)

  const [amountInDollar, setAmountInDola] = useState()
  const isShowPercent = balance?.greaterThan(0) && !disabled && label !== 'To (estimated)'

  const checkHeightInput = () => {
    let height
    if (isMobile) {
      if (account) {
        height = '112px'
        if (isShowPercent) {
          height = '122px'
        } else {
          height = '90px'
        }
      } else {
        height = '52px'
      }
    } else if (isShowPercent) {
      height = '128px'
    } else {
      height = '95px'
    }
    return height
  }

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
    />,
  )

  useEffect(() => {
    if (autoChange) {
      setAutoChange(false)
      return
    }
    setActivePercent(null)
  }, [value])

  useEffect(() => {
    onUserInput('')
  }, [])

  const amountUsdValue = useMemo(() => {
    return amountUsd && formatAmountNumber2(parseFloat(amountUsd), 6).toString()
  }, [amountUsd])

  return (
    <Box position="relative" id={id}>
      <InputPanel>
        <Container as="label" style={{ height: checkHeightInput() }}>
          <LabelRow>
            <NumericalInputWrapper
              disabled={disabled || !account}
              className="token-amount-input"
              value={value}
              onUserInput={(val) => {
                onUserInput(val)
                setActivePercent(val)
              }}
            />
            {account && (
              <TextBalance
                onClick={() => {
                  if (disabled) return
                  if (onMax) return onMax()
                  setAutoChange(true)
                  onPercentInput(100)
                  setActivePercent(100)
                }}
                color="textSubtle"
                // fontSize="14px"
                // style={{ display: 'inline', cursor: 'pointer', fontSize: '16px' }}
              >
                {!!currency
                  ? t('Balance: %balance%', {
                      balance: formatAmountNumber2(parseFloat(balance?.toSignificant(10)) || 0, 6) ?? t('Loading'),
                    })
                  : ' -'}
              </TextBalance>
            )}
          </LabelRow>
          {!!amountUsdValue && (
            <ForDolar style={isShowPercent ? { bottom: '58px' } : { bottom: '22px' }}>
              <Flex justifyContent="flex-end" mr="1rem">
                <Flex maxWidth="200px">
                  <Text fontSize="12px" color="textSubtle" style={{ whiteSpace: 'nowrap' }}>
                    ~$
                    {isMobile
                      ? amountUsdValue.length > 10
                        ? `${amountUsdValue.substring(0, 10)}...`
                        : amountUsdValue
                      : amountUsdValue.length > 30
                      ? `${amountUsdValue.substring(0, 30)}...`
                      : amountUsdValue}{' '}
                    {/* USD */}
                  </Text>
                </Flex>
              </Flex>
            </ForDolar>
          )}
          <InputRow selected={true} style={{ paddingBottom: 15 }}>
            {isShowPercent && (
              <Flex alignItems="center" justifyContent="start">
                {showQuickInputButton &&
                  onPercentInput &&
                  [25, 50, 75].map((percent) => (
                    <PercentButton
                      key={`btn_quickCurrency${percent}`}
                      onClick={() => {
                        onPercentInput(percent)
                        setAutoChange(true)
                        setActivePercent(percent)
                      }}
                      scale="xs"
                      mr="5px"
                      variant="secondary"
                      style={{
                        textTransform: 'uppercase',
                        background:
                          activePercent === percent
                            ? 'linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%)'
                            : 'none',
                        color: activePercent === percent ? '#fff' : '#FB8618',
                      }}
                    >
                      {percent}%
                    </PercentButton>
                  ))}
                {showMaxButton && showQuickInputButton && (
                  <PercentButton
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      setAutoChange(true)
                      onPercentInput(100)
                      setActivePercent(100)
                      onMax?.()
                    }}
                    scale="xs"
                    variant="secondary"
                    style={{
                      background:
                        activePercent === 100
                          ? 'linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%)'
                          : 'none',
                      color: activePercent === 100 ? '#fff' : '#FB8618',
                    }}
                  >
                    {t('Max')}
                  </PercentButton>
                )}
              </Flex>
            )}
          </InputRow>
          <CurrencySelectButton
            // style={isMobile && !account?{top:'23%'}:isShowPercent?{top:'60%'}: {top:'45%'}}
            style={{ bottom: isMobile && isShowPercent ? 50 : 15, cursor: 'unset' }}
            className="open-currency-select-button"
            selected={!!currency}
            onClick={() => {
              onCurrencySelect && onPresentCurrencyModal()
            }}
          >
            <Flex alignItems="center" justifyContent="space-between" className="token-info">
              {currency ? (
                <>
                  {imgUrl ? (
                    <img src={imgUrl} alt="" />
                  ) : (
                    <CurrencyLogo currency={currency} style={{ marginRight: '8px' }} size="24px" />
                  )}
                  {currency?.symbol}
                </>
              ) : (
                <>Select a currency</>
              )}
              {onCurrencySelect && <ChevronDownIcon />}
            </Flex>
          </CurrencySelectButton>
        </Container>
        {disabled && <Overlay />}
      </InputPanel>
    </Box>
  )
}
