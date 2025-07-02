import { useState } from 'react'
import styled from 'styled-components'
import { Trade, TradeType, CurrencyAmount, Currency } from '@pancakeswap/sdk'
import { Button, Text, QuestionHelper, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { Field } from 'state/swap/actions'
import CircleRefresh from 'components/Svg/CircleRefresh'
import { computeTradePriceBreakdown, formatExecutionPrice, warningSeverity } from 'utils/exchange'
import { AutoColumn } from 'components/Layout/Column'
import { AutoRow, RowBetween, RowFixed } from 'components/Layout/Row'
import { useActiveChainId } from 'hooks/useActiveChainId'
import FormattedPriceImpact from './FormattedPriceImpact'
import { SwapCallbackError } from './styleds'
import { formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'

const BottomText = styled(Text)`
  word-break: break-word;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`

const SwapModalFooterContainer = styled(AutoColumn)`
  margin-top: 24px;
  padding: 20px;
  border-radius: ${({ theme }) => theme.radii.default};
  background-color: #1d1c1c;
`
const CircleBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`

export default function SwapModalFooter({
  trade,
  slippageAdjustedAmounts,
  isEnoughInputBalance,
  onConfirm,
  swapErrorMessage,
  disabledConfirm,
}: {
  trade: Trade<Currency, Currency, TradeType>
  slippageAdjustedAmounts: { [field in Field]?: CurrencyAmount<Currency> }
  isEnoughInputBalance: boolean
  onConfirm: () => void
  swapErrorMessage?: string | undefined
  disabledConfirm: boolean
}) {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  const [showInverted, setShowInverted] = useState<boolean>(false)
  // const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const severity = warningSeverity(priceImpactWithoutFee)

  const { isMobile } = useMatchBreakpoints()

  const totalFeePercent = chainId === 1 || chainId === 5 ? '0.3%' : '0.25%'

  return (
    <>
      <SwapModalFooterContainer>
        <RowBetween align="center" marginBottom="8px">
          <BottomText fontSize="16px" color="textSubtle">
            {t('Price')}
          </BottomText>
          <BottomText
            fontSize="16px"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '10px',
            }}
          >
            {formatExecutionPrice(trade, showInverted)}
            <CircleBox onClick={() => setShowInverted(!showInverted)}>
              <CircleRefresh />
            </CircleBox>
          </BottomText>
        </RowBetween>

        <RowBetween marginBottom="8px">
          <RowFixed>
            <BottomText fontSize="16px" color="textSubtle">
              {trade.tradeType === TradeType.EXACT_INPUT ? t('Minimum received') : t('Maximum sold')}
            </BottomText>
            <QuestionHelper
              text={t(
                'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.',
              )}
              ml="4px"
              placement="auto"
              size={isMobile ? '18px' : '24px'}
            />
          </RowFixed>
          <RowFixed>
            <BottomText fontSize="16px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? formatAmountNumber2(Number(slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)), 4) ?? '-'
                : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4) ?? '-'}
            </BottomText>
            <BottomText fontSize="16px" marginLeft="4px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? trade.outputAmount.currency.symbol
                : trade.inputAmount.currency.symbol}
            </BottomText>
          </RowFixed>
        </RowBetween>
        <RowBetween marginBottom="8px">
          <RowFixed>
            <BottomText fontSize="16px" color="textSubtle">
              {t('Price Impact')}
            </BottomText>
            <QuestionHelper
              text={t('The difference between the market price and your price due to trade size.')}
              ml="4px"
              placement="auto"
              size={isMobile ? '18px' : '24px'}
            />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <BottomText fontSize="16px" color="textSubtle">
              {t('Liquidity Provider Fee')}
            </BottomText>
            <QuestionHelper
              text={
                <>
                  <Text mb="12px">{t('For each trade a %amount% fee is paid', { amount: totalFeePercent })}</Text>
                </>
              }
              ml="4px"
              placement="auto"
              size={isMobile ? '18px' : '24px'}
            />
          </RowFixed>
          <BottomText fontSize="16px">
            {realizedLPFee
              ? `${formatAmountNumber2(Number(realizedLPFee?.toSignificant(6)), 4)} ${
                  trade.inputAmount.currency.symbol
                }`
              : '-'}
          </BottomText>
        </RowBetween>
      </SwapModalFooterContainer>

      <AutoRow>
        <Button
          variant={severity > 2 ? 'danger' : 'primary'}
          onClick={onConfirm}
          disabled={disabledConfirm}
          mt="12px"
          mb="32px"
          id="confirm-swap-or-send"
          width="100%"
          height="43px"
          style={{ fontSize: isMobile ? '14px' : '16px' }}
        >
          {severity > 2 || (trade.tradeType === TradeType.EXACT_OUTPUT && !isEnoughInputBalance)
            ? t('Swap Anyway')
            : t('Confirm Swap')}
        </Button>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </AutoRow>
    </>
  )
}
