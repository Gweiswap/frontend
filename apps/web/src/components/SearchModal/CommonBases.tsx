import { ChainId, Currency, Token } from '@pancakeswap/sdk'
import { Text, QuestionHelper } from '@pancakeswap/uikit'
import styled from 'styled-components'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useTranslation } from '@pancakeswap/localization'

import { SUGGESTED_BASES } from 'config/constants/exchange'
import { AutoColumn } from '../Layout/Column'
import { AutoRow } from '../Layout/Row'
import { CurrencyLogo } from '../Logo'
import { CommonBasesType } from './types'

const ButtonWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
`

const BaseWrapper = styled.div<{ disable?: boolean }>`
  height: 62px;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.87);
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover,
  &.active {
    background: #9072ff;
  }
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && '#9072ff'};
  }
  background-color: ${({ theme, disable }) => disable && theme.colors.dropdown};
  opacity: ${({ disable }) => disable && '0.4'};
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 310px;
  overflow-y: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  &:hover::-webkit-scrollbar {
    display: block;
    -ms-overflow-style: 5px; /* IE and Edge */
    scrollbar-width: 5px; /* Firefox */
  }
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
  commonBasesType,
}: {
  chainId?: ChainId
  commonBasesType
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const native = useNativeCurrency()
  const { t } = useTranslation()
  const pinTokenDescText = commonBasesType === CommonBasesType.SWAP_LIMITORDER ? t('Common tokens') : t('Common bases')

  return (
    <AutoColumn gap="md">
      <AutoRow>
        <Text fontSize="14px">{pinTokenDescText}</Text>
        {commonBasesType === CommonBasesType.LIQUIDITY && (
          <QuestionHelper text={t('These tokens are commonly paired with other tokens.')} ml="4px" />
        )}
      </AutoRow>
      <RowWrapper>
        <ButtonWrapper>
          <BaseWrapper
            onClick={() => {
              if (!selectedCurrency || !selectedCurrency.isNative) {
                onSelect(native)
              }
            }}
            disable={selectedCurrency?.isNative}
          >
            <CurrencyLogo currency={native} style={{ marginRight: 8 }} />
            <Text>{native?.symbol}</Text>
          </BaseWrapper>
        </ButtonWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] || [] : []).map((token: Token) => {
          const selected = selectedCurrency?.equals(token)
          return (
            <ButtonWrapper key={`buttonBase#${token.address}`}>
              <BaseWrapper onClick={() => !selected && onSelect(token)} disable={selected}>
                <CurrencyLogo currency={token} style={{ marginRight: 8, borderRadius: '50%' }} />
                <Text>{token.symbol}</Text>
              </BaseWrapper>
            </ButtonWrapper>
          )
        })}
      </RowWrapper>
    </AutoColumn>
  )
}
