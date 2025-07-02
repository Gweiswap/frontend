import { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react'
import { Currency, Token } from '@pancakeswap/sdk'
import { Text, QuestionHelper } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { LightGreyCard } from 'components/Card'
import { useTranslation } from '@pancakeswap/localization'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useActiveChainId } from 'hooks/useActiveChainId'
import Column from '../Layout/Column'
import { RowBetween } from '../Layout/Row'
import { CurrencyLogo } from '../Logo'
import ImportRow from './ImportRow'

function currencyKey(currency: Currency): string {
  return currency?.isToken ? currency.address : currency?.isNative ? currency.symbol : ''
}

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

const FixedContentRow = styled.div`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-gap: 16px;
  align-items: center;
`

const MenuItem = styled(RowBetween)<{ disabled: boolean; selected: boolean }>`
  padding: 16px;
  border-radius: 12px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr);
  grid-gap: 8px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.87);
  :hover {
    background-color: ${({ disabled }) => !disabled && 'rgba(255, 255, 255, 0.1)'};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};

  & div div {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);

    & div div {
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);
    }
  }
`

function CurrencyRow({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  style,
}: {
  currency: Currency
  onSelect: () => void
  isSelected: boolean
  otherSelected: boolean
  style: CSSProperties
}) {
  const key = currencyKey(currency)
  // only show add or remove buttons if not on selected list
  return (
    <MenuItem
      style={style}
      className={`token-item-${key}`}
      onClick={() => (isSelected ? null : onSelect())}
      disabled={isSelected}
      selected={otherSelected}
    >
      <CurrencyLogo currency={currency} size="30px" />
      <Column>
        <Text bold>{currency?.symbol}</Text>
      </Column>
    </MenuItem>
  )
}

export default function CurrencyList({
  height,
  currencies,
  inactiveCurrencies,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  fixedListRef,
  showNative,
  showImportView,
  setImportToken,
  breakIndex,
}: {
  height: number | string
  currencies: Currency[]
  inactiveCurrencies: Currency[]
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherCurrency?: Currency | null
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>
  showNative: boolean
  showImportView: () => void
  setImportToken: (token: Token) => void
  breakIndex: number | undefined
}) {
  const native = useNativeCurrency()

  const itemData: (Currency | undefined)[] = useMemo(() => {
    let formatted: (Currency | undefined)[] = showNative
      ? [native, ...currencies, ...inactiveCurrencies]
      : [...currencies, ...inactiveCurrencies]
    if (breakIndex !== undefined) {
      formatted = [...formatted.slice(0, breakIndex), undefined, ...formatted.slice(breakIndex, formatted.length)]
    }
    return formatted
  }, [breakIndex, currencies, inactiveCurrencies, showNative, native])

  const { chainId } = useActiveChainId()

  const { t } = useTranslation()

  const Row = useCallback(
    ({ data, index, style }) => {
      const currency: Currency = data[index]
      // if(currency.symbol === 'USDT') console.log(selectedCurrency, currency, selectedCurrency.equals(currency))
      const isSelected = Boolean(selectedCurrency && currency && selectedCurrency.equals(currency))
      const otherSelected = Boolean(otherCurrency && currency && otherCurrency.equals(currency))
      const handleSelect = () => onCurrencySelect(currency)

      const token = currency as Token

      const showImport = index > currencies.length

      if (index === breakIndex || !data) {
        return (
          <FixedContentRow
            style={{
              padding: 0,
              ...style,
            }}
          >
            <LightGreyCard
              padding="8px 12px"
              borderRadius="4px"
              style={{
                background: '#303030',
              }}
            >
              <RowBetween>
                <Text fontSize="14px" fontWeight="400" lineHeight="17px" color="rgba(255, 255, 255, 0.87)">
                  Expanded results from inactive Token Lists
                </Text>
                <QuestionHelper
                  text={t(
                    "Tokens from inactive lists. Import specific tokens below or click 'Manage' to activate more lists.",
                  )}
                  ml="4px"
                  placement="top"
                />
              </RowBetween>
            </LightGreyCard>
          </FixedContentRow>
        )
      }

      if (showImport && token) {
        return (
          <ImportRow
            onCurrencySelect={handleSelect}
            style={style}
            token={token}
            showImportView={showImportView}
            setImportToken={setImportToken}
            dim
          />
        )
      }

      return (
        <CurrencyRow
          style={style}
          currency={currency}
          isSelected={isSelected}
          onSelect={handleSelect}
          otherSelected={otherSelected}
        />
      )
    },
    [
      selectedCurrency,
      otherCurrency,
      chainId,
      currencies.length,
      breakIndex,
      onCurrencySelect,
      t,
      showImportView,
      setImportToken,
    ],
  )

  const itemKey = useCallback((index: number, data: any) => currencyKey(data[index]), [])

  return (
    <FixedSizeList
      height={height}
      ref={fixedListRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={62}
      itemKey={itemKey}
      className="curency-list"
    >
      {Row}
    </FixedSizeList>
  )
}
