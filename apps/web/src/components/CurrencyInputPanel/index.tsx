import { useEffect, useState } from 'react'
import { Currency, Pair } from '@pancakeswap/sdk'
import {
  Button,
  ChevronDownIcon,
  Text,
  useModal,
  Flex,
  Box,
  NumericalInput,
  CopyButton,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import styled, { css } from 'styled-components'
import { isAddress } from 'utils'
import { useTranslation } from '@pancakeswap/localization'
import { WrappedTokenInfo } from '@pancakeswap/token-lists'

import { useBUSDCurrencyAmount } from 'hooks/useBUSDPrice'
import { formatAmountNumber, formatAmountNumber2, formatNumber } from '@pancakeswap/utils/formatBalance'
import { StablePair } from 'views/AddLiquidity/AddStableLiquidity/hooks/useStableLPDerivedMintInfo'

import { useAccount } from 'wagmi'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

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
    height: 16px;
  }

  #pair {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .token-info img {
      width: 24px;
      height: 24px;
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

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onInputBlur?: () => void
  onPercentInput?: (percent: number) => void
  onMax?: () => void
  showQuickInputButton?: boolean
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | StablePair | null
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  commonBasesType?: string
  zapStyle?: ZapStyle
  beforeButton?: React.ReactNode
  disabled?: boolean
  error?: boolean
  showBUSD?: boolean
  forLiquidity?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onInputBlur,
  onPercentInput,
  onMax,
  showQuickInputButton = false,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  zapStyle,
  beforeButton,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
  commonBasesType,
  disabled,
  error,
  showBUSD,
  forLiquidity,
}: CurrencyInputPanelProps) {
  const { address: account } = useAccount()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [activePercent, setActivePercent] = useState<any>(null)
  const [autoChange, setAutoChange] = useState(false)

  const amountInDollar = useBUSDCurrencyAmount(
    showBUSD ? currency : undefined,
    Number.isFinite(+value) ? +value : undefined,
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
      commonBasesType={commonBasesType}
      forliquidity={forLiquidity}
    />,
  )
  const isShowPercent =
    account &&
    currency &&
    selectedCurrencyBalance?.greaterThan(0) &&
    !disabled &&
    label !== 'To' &&
    label !== 'To (estimated)'
  const isShowDolar = !!currency && showBUSD && Number.isFinite(amountInDollar)

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
    } else if (isShowDolar && isShowPercent) {
      height = '128px'
    } else {
      height = '95px'
    }
    return height
  }

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

  return (
    <Box position="relative" id={id}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex>
          {beforeButton}

          {/* {token && tokenAddress ? (
            <Flex style={{ gap: '4px' }} ml="4px" alignItems="center">
              <CopyButton
                width="16px"
                buttonColor="textSubtle"
                text={tokenAddress}
                tooltipMessage={t('Token address copied')}
              />
              <AddToWalletButton
                variant="text"
                p="0"
                height="auto"
                width="fit-content"
                tokenAddress={tokenAddress}
                tokenSymbol={token.symbol}
                tokenDecimals={token.decimals}
                tokenLogo={token instanceof WrappedTokenInfo ? token.logoURI : undefined}
              />
            </Flex>
          ) : null} */}
        </Flex>
      </Flex>
      <InputPanel>
        <Container as="label" zapStyle={zapStyle} error={error} style={{ height: checkHeightInput() }}>
          <LabelRow>
            <NumericalInputWrapper
              error={error}
              disabled={disabled}
              className="token-amount-input"
              value={value}
              onBlur={onInputBlur}
              onUserInput={(val) => {
                onUserInput(val)
                setActivePercent(val)
              }}
              // style={
              //   isShowPercent && isShowDolar
              //     ? { marginTop: '-70px' }
              //     : isShowPercent
              //     ? { marginTop: '-36px' }
              //     : isShowDolar
              //     ? { marginTop: '-36px' }
              //     : { marginTop: '-10px' }
              // }
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
                {!hideBalance && !!currency
                  ? t('Balance: %balance%', {
                      balance:
                        formatAmountNumber2(parseFloat(selectedCurrencyBalance?.toFixed()) || 0, 6) ?? t('Loading'),
                    })
                  : ' -'}
              </TextBalance>
            )}
          </LabelRow>
          {isShowDolar && (
            <ForDolar style={isShowPercent ? { bottom: '58px' } : { bottom: '22px' }}>
              <Flex justifyContent="flex-end" mr="1rem">
                <Flex maxWidth="200px">
                  <Text fontSize="12px" color="textSubtle" style={{ whiteSpace: 'nowrap' }}>
                    ~$
                    {isMobile
                      ? formatNumber(amountInDollar).length > 10
                        ? `${formatNumber(amountInDollar).substring(0, 10)}...`
                        : formatNumber(amountInDollar)
                      : formatNumber(amountInDollar).length > 30
                      ? `${formatNumber(amountInDollar).substring(0, 30)}...`
                      : formatNumber(amountInDollar)}{' '}
                    {/* USD */}
                  </Text>
                </Flex>
              </Flex>
            </ForDolar>
          )}
          <InputRow selected={disableCurrencySelect} style={{ paddingBottom: 15 }}>
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
            style={{ bottom: isMobile && isShowPercent ? 50 : 15, cursor: disableCurrencySelect ? 'unset' : 'cursor' }}
            className="open-currency-select-button"
            selected={!!currency}
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal()
              }
            }}
          >
            <Flex alignItems="center" justifyContent="space-between" className="token-info">
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <Text id="pair" bold>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair" bold>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length,
                      )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
              )}
              {!disableCurrencySelect && <ChevronDownIcon />}
            </Flex>
          </CurrencySelectButton>
        </Container>
        {disabled && <Overlay />}
      </InputPanel>
    </Box>
  )
}
