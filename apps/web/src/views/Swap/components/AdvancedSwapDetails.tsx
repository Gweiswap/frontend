import { Trade, TradeType, Currency } from '@pancakeswap/sdk'
import { Text, QuestionHelper } from '@pancakeswap/uikit'
import { Field } from 'state/swap/actions'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from 'utils/exchange'
import { AutoColumn } from 'components/Layout/Column'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useActiveChainId } from 'hooks/useActiveChainId'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'
import { formatAmountNumber2, formatBalanceComma } from '@pancakeswap/utils/formatBalance'

const BottomText = styled(Text)`
  word-break: break-word;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`

const RowBetweenStyle = styled(RowBetween)`
  margin-bottom: 10px;
  @media screen and (max-width: 576px) {
    margin-bottom: 8px;
  }
`

function TradeSummary({
  trade,
  allowedSlippage,
}: {
  trade: Trade<Currency, Currency, TradeType>
  allowedSlippage: number
}) {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  const totalFeePercent = chainId === 1 || chainId === 5 ? '0.3%' : '0.25%'

  return (
    <AutoColumn style={{ padding: '0 16px' }}>
      <RowBetweenStyle>
        <RowFixed>
          <BottomText fontSize="16px" color="textSubtle">
            {isExactIn ? t('Minimum received') : t('Maximum sold')}
          </BottomText>
          <QuestionHelper
            text={t(
              'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.',
            )}
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <RowFixed>
          <BottomText fontSize="16px" color="while87">
            {isExactIn
              ? `${formatAmountNumber2(Number(slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)), 4)} ${
                  trade.outputAmount.currency.symbol
                }` ?? '-'
              : `${formatAmountNumber2(Number(slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)), 4)} ${
                  trade.inputAmount.currency.symbol
                }` ?? '-'}
          </BottomText>
        </RowFixed>
      </RowBetweenStyle>
      <RowBetweenStyle>
        <RowFixed>
          <BottomText fontSize="16px" color="textSubtle">
            {t('Price Impact')}
          </BottomText>
          <QuestionHelper
            text={t('The difference between the market price and estimated price due to trade size.')}
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
      </RowBetweenStyle>

      <RowBetweenStyle>
        <RowFixed>
          <BottomText fontSize="16px" color="textSubtle">
            {t('Liquidity Provider Fee')}
          </BottomText>
          <QuestionHelper
            text={
              <>
                <Text mb="12px">{t('For each trade a %amount% fee is paid', { amount: totalFeePercent })}</Text>
                {/* <Text>- {t('%amount% to LP token holders', { amount: lpHoldersFeePercent })}</Text>
                <Text>- {t('%amount% to the Treasury', { amount: treasuryFeePercent })}</Text>
                <Text>- {t('%amount% towards CAKE buyback and burn', { amount: buyBackFeePercent })}</Text> */}
              </>
            }
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <BottomText fontSize="16px" color="while87">
          {realizedLPFee
            ? `${formatAmountNumber2(Number(realizedLPFee.toSignificant(4)), 4)} ${trade.inputAmount.currency.symbol}`
            : '-'}
        </BottomText>
      </RowBetweenStyle>
    </AutoColumn>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade<Currency, Currency, TradeType>
  showXOXSreceived?: boolean
  value: string
}

export function AdvancedSwapDetails({ trade, showXOXSreceived, value }: AdvancedSwapDetailsProps) {
  const { t } = useTranslation()
  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade)

  const numberXOXSreceived = useMemo(() => {
    if (!value) return 0
    return new BigNumber(value).dividedBy(10).toString()
  }, [value])

  return (
    <AutoColumn gap="0px">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <RowBetweenStyle style={{ padding: '0 16px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Text fontSize="16px" color="textSubtle" style={{ whiteSpace: 'nowrap' }}>
                    {t('Route')}
                  </Text>
                  <QuestionHelper
                    text={t('Routing through these tokens resulted in the best price for your trade.')}
                    ml="4px"
                    placement="top-start"
                  />
                </span>
                <SwapRoute trade={trade} />
              </RowBetweenStyle>
              {showXOXSreceived && (
                <RowBetweenStyle style={{ padding: '0 16px' }}>
                  <Text fontSize="16px" color="textSubtle">
                    {t('XOXS received')}
                  </Text>
                  <Text fontSize="16px" color="rgba(255,255,255,0.87)">
                    {formatBalanceComma(numberXOXSreceived.toString())}
                  </Text>
                </RowBetweenStyle>
              )}
            </>
          )}
        </>
      )}
    </AutoColumn>
  )
}
