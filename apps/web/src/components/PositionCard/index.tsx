import { useState, useMemo, useContext, useEffect } from 'react'
import { Currency, CurrencyAmount, JSBI, Pair, Percent } from '@pancakeswap/sdk'
import {
  Button,
  Text,
  ChevronUpIcon,
  ChevronDownIcon,
  Card,
  CardBody,
  Flex,
  CardProps,
  AddIcon,
  TooltipText,
  useTooltip,
  NextLinkFromReactRouter,
} from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import useTotalSupply from 'hooks/useTotalSupply'
import useBUSDPrice from 'hooks/useBUSDPrice'
import { multiplyPriceByAmount } from 'utils/prices'
import { useAccount } from 'wagmi'
import { useGetRemovedTokenAmounts } from 'views/RemoveLiquidity/RemoveStableLiquidity/hooks/useStableDerivedBurnInfo'
import useStableConfig, { StableConfigContext } from 'views/Swap/StableSwap/hooks/useStableConfig'

import { useLPApr } from 'state/swap/useLPApr'
import { useTokenBalance } from '../../state/wallet/hooks'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'

import { AutoColumn } from '../Layout/Column'
import CurrencyLogo from '../Logo/CurrencyLogo'
import { DoubleCurrencyLogo } from '../Logo'
import { RowBetween, RowFixed } from '../Layout/Row'
import Dots from '../Loader/Dots'
import { formatAmount } from '../../utils/formatInfoNumbers'
import { formatAmountString } from '@pancakeswap/utils/formatBalance'

const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

const CustomCard = styled(Card)`
  background: #1d1c1c;
  border-radius: 20px;

  & > div {
    background: unset;
    width: 100%;
    height: 100%;
    border-radius: unset;
  }

  .main-content {
    padding: 0 16px 16px 16px;
  }

  .button {
    padding: 16px;
    display: flex;
    align-items: center;
  }

  img {
    width: 18px;
    height: 18px;
  }

  .pair-token {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    margin-left: 8px;
  }

  .text-left {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }

  .text-right {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    color: #ffffff;
  }

  .text-elipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80px;
  }

  .text-logo {
    margin-right: 8px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
    line-height: 19px;

    img {
      width: 20px;
      height: 20px;
    }

    .pair-token {
      font-size: 16px;
      line-height: 19px;
    }

    .text-left {
      font-size: 16px;
      line-height: 19px;
    }

    .text-right {
      font-size: 18px;
      line-height: 22px;
    }

    .text-elipsis {
      white-space: nowrap;
      overflow: visible;
      text-overflow: unset;
    }
  }
`

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;

  .btn-remove {
    background: #313131;
    border-radius: 6px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    height: 37px;

    :hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
      background: #313131;
    }
  }

  .btn-add {
    border-radius: 6px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    height: 37px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .btn-remove {
      background: #313131;
      border-radius: 6px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      height: 43px;
    }

    .btn-add {
      border-radius: 6px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      height: 43px;
    }
  }
`

const CustomCardMinimal = styled(Card)`
  padding: 0;
  background: none;
  .lp-token-text {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #fb8618;
    text-transform: uppercase;
  }

  & > div {
    background: #1d1c1c;
    border-radius: 20px;
  }

  & > div > div {
    padding: 20px 17px;
  }

  .text-left {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }

  .text-right {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    color: #ffffff;
  }

  .text-elipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80px;
  }

  .gap {
    gap: 8.5px;
    margin-top: 10.5px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .lp-token-text {
      font-size: 16px;
      line-height: 19px;
    }

    .text-left {
      font-size: 16px;
      line-height: 19px;
    }

    .text-right {
      font-size: 18px;
      line-height: 22px;
    }

    .text-elipsis {
      white-space: nowrap;
      overflow: visible;
      text-overflow: unset;
      width: auto;
    }
    .gap {
      margin-top: 18.5px;
      gap: 8.5px;
    }
  }
`

const CustomFixedHeightRow = styled(FixedHeightRow)`
  margin-bottom: 0;
`

const CustomRowFixed = styled(RowFixed)`
  margin-bottom: 0;
`

const CustomRow = styled(Flex)`
  justify-content: space-between;
`

interface PositionCardProps extends CardProps {
  pair: Pair
  showUnwrapped?: boolean
  currency0: Currency
  currency1: Currency
  token0Deposited: CurrencyAmount<Currency>
  token1Deposited: CurrencyAmount<Currency>
  totalUSDValue: number
  userPoolBalance: CurrencyAmount<Currency>
  poolTokenPercentage: Percent
}

const useTokensDeposited = ({ pair, totalPoolTokens, userPoolBalance }) => {
  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return [token0Deposited, token1Deposited]
}

const useTotalUSDValue = ({ currency0, currency1, token0Deposited, token1Deposited }) => {
  const token0Price = useBUSDPrice(currency0)
  const token1Price = useBUSDPrice(currency1)

  const token0USDValue =
    token0Deposited && token0Price
      ? multiplyPriceByAmount(token0Price, parseFloat(token0Deposited.toSignificant(6)))
      : null
  const token1USDValue =
    token1Deposited && token1Price
      ? multiplyPriceByAmount(token1Price, parseFloat(token1Deposited.toSignificant(6)))
      : null
  return token0USDValue && token1USDValue ? token0USDValue + token1USDValue : null
}

const usePoolTokenPercentage = ({ userPoolBalance, totalPoolTokens }) => {
  return !!userPoolBalance &&
    !!totalPoolTokens &&
    JSBI.toNumber(totalPoolTokens.numerator) > 0 &&
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
    ? new Percent(userPoolBalance.quotient, totalPoolTokens.quotient)
    : undefined
}

const withLPValuesFactory =
  ({ useLPValuesHook, hookArgFn }) =>
  (Component) =>
  (props) => {
    const { address: account } = useAccount()
    const [finishTransaction, setFinishTransaction] = useState()
    const { transactionState, setTransactionState } = props

    const currency0 = props.showUnwrapped ? props.pair.token0 : unwrappedToken(props.pair.token0)
    const currency1 = props.showUnwrapped ? props.pair.token1 : unwrappedToken(props.pair.token1)

    const userPoolBalance = useTokenBalance(account ?? undefined, props.pair.liquidityToken)

    const totalPoolTokens = useTotalSupply(props.pair.liquidityToken)

    const poolTokenPercentage = usePoolTokenPercentage({ totalPoolTokens, userPoolBalance })

    const args = useMemo(
      () =>
        hookArgFn({
          userPoolBalance,
          pair: props.pair,
          totalPoolTokens,
        }),
      [userPoolBalance, props.pair, totalPoolTokens],
    )
    const numerator = userPoolBalance ? JSBI.toNumber(userPoolBalance?.numerator) : 0
    const [token0Deposited, token1Deposited] = numerator === 0 ? [0, 0] : useLPValuesHook(args)

    const totalUSDValue = useTotalUSDValue({ currency0, currency1, token0Deposited, token1Deposited })

    useEffect(() => {
      if (!finishTransaction) setFinishTransaction(token0Deposited?.toFixed())
      else if (finishTransaction !== token0Deposited?.toFixed()) {
        setFinishTransaction(token0Deposited?.toFixed())
      }
    }, [token0Deposited])

    return (
      <Component
        {...props}
        currency0={currency0}
        currency1={currency1}
        token0Deposited={token0Deposited}
        token1Deposited={token1Deposited}
        totalUSDValue={totalUSDValue}
        userPoolBalance={userPoolBalance}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }

const withLPValues = withLPValuesFactory({
  useLPValuesHook: useTokensDeposited,
  hookArgFn: ({ pair, userPoolBalance, totalPoolTokens }) => ({ pair, userPoolBalance, totalPoolTokens }),
})

const withStableLPValues = withLPValuesFactory({
  useLPValuesHook: useGetRemovedTokenAmounts,
  hookArgFn: ({ userPoolBalance }) => ({
    lpAmount: userPoolBalance?.quotient?.toString(),
  }),
})

function MinimalPositionCardView({
  pair,
  currency0,
  currency1,
  token0Deposited,
  token1Deposited,
  userPoolBalance,
  poolTokenPercentage,
}: PositionCardProps) {
  const isStableLP = useContext(StableConfigContext)

  const { t } = useTranslation()
  const poolData = useLPApr(pair)
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(`Based on last 7 days' performance. Does not account for impermanent loss`),
    {
      placement: 'bottom',
    },
  )

  return (
    <CustomCardMinimal>
      <CardBody>
        <AutoColumn>
          <CustomFixedHeightRow>
            <CustomRowFixed>
              <Text className="lp-token-text">{t('LP tokens in your wallet')}</Text>
            </CustomRowFixed>
          </CustomFixedHeightRow>
          <AutoColumn className="gap">
            <CustomFixedHeightRow>
              <CustomRowFixed>
                <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
                <Text className="text-left">
                  {currency0.symbol}-{currency1.symbol} LP
                </Text>
              </CustomRowFixed>
              <CustomRowFixed>
                <Flex flexDirection="column" alignItems="flex-end">
                  <Text className="text-right text-elipsis">
                    {userPoolBalance ? formatAmountString(userPoolBalance, 6) : '-'}
                  </Text>
                  {/* {Number.isFinite(totalUSDValue) && (
                    <Text small color="textSubtle">{`(~${totalUSDValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} USD)`}</Text>
                  )} */}
                </Flex>
              </CustomRowFixed>
            </CustomFixedHeightRow>
            {poolData && (
              <CustomFixedHeightRow>
                <TooltipText ref={targetRef} color="textSubtle" small>
                  {t('LP reward APR')}:
                </TooltipText>
                {tooltipVisible && tooltip}
                <Text>{formatAmount(poolData.lpApr7d)}%</Text>
              </CustomFixedHeightRow>
            )}
            {isStableLP ? null : (
              <CustomFixedHeightRow>
                <Text className="text-left">{currency0.symbol}</Text>
                {token0Deposited ? (
                  <CustomRowFixed>
                    <Text className="text-right">{formatAmountString(token0Deposited, 6)}</Text>
                  </CustomRowFixed>
                ) : (
                  '-'
                )}
              </CustomFixedHeightRow>
            )}
            {isStableLP ? null : (
              <CustomFixedHeightRow>
                <Text className="text-left">{currency1.symbol}</Text>
                {token1Deposited ? (
                  <CustomRowFixed>
                    <Text className="text-right">{formatAmountString(token1Deposited, 6)}</Text>
                  </CustomRowFixed>
                ) : (
                  '-'
                )}
              </CustomFixedHeightRow>
            )}
            <CustomFixedHeightRow>
              <Text className="text-left">{t('Share of Pool')}</Text>
              <Text className="text-right">
                {poolTokenPercentage
                  ? parseFloat(poolTokenPercentage.toFixed(6)) >= 0.01
                    ? `${formatAmountString(poolTokenPercentage)}%`
                    : parseFloat(poolTokenPercentage.toFixed(6)) === 0
                    ? '0%'
                    : '<0.01%'
                  : '0%'}
              </Text>
            </CustomFixedHeightRow>
          </AutoColumn>
        </AutoColumn>
      </CardBody>
    </CustomCardMinimal>
  )
}

function FullPositionCard({
  pair,
  currency0,
  currency1,
  token0Deposited,
  token1Deposited,
  totalUSDValue,
  userPoolBalance,
  poolTokenPercentage,
  ...props
}: PositionCardProps) {
  const isStableLP = useContext(StableConfigContext)

  const { t } = useTranslation()
  const poolData = useLPApr(pair)
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(`Based on last 7 days' performance. Does not account for impermanent loss`),
    {
      placement: 'bottom',
    },
  )
  const [showMore, setShowMore] = useState(false)

  return (
    <CustomCard {...props}>
      <Flex
        justifyContent="space-between"
        className="button"
        role="button"
        onClick={() => setShowMore(!showMore)}
        p="16px"
      >
        <Flex flexDirection="column">
          <Flex alignItems="center">
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />
            <Text className="pair-token">
              {!currency0 || !currency1 ? <Dots>{t('Loading')}</Dots> : `${currency0.symbol}/${currency1.symbol}`}
            </Text>
            {isStableLP ? (
              <Text color="textSubtle" ml="4px">
                {' '}
                - Stable
              </Text>
            ) : null}
          </Flex>
          {/* <Text fontSize="14px" color="textSubtle">
            {userPoolBalance?.toSignificant(4)}
          </Text> */}
          {/* {Number.isFinite(totalUSDValue) && (
            <Text small color="textSubtle">{`(~${totalUSDValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} USD)`}</Text>
          )} */}
        </Flex>
        {showMore ? <ChevronUpIcon fill="#8E8E8E" /> : <ChevronDownIcon fill="#8E8E8E" />}
      </Flex>

      {showMore && (
        <AutoColumn gap="8px" className="main-content">
          {isStableLP ? null : (
            <CustomRow>
              <CustomRowFixed>
                <Text className="text-left">{t('Pooled %asset%', { asset: currency0.symbol })}</Text>
              </CustomRowFixed>
              {token0Deposited ? (
                <CustomRowFixed>
                  <Text className="text-right text-logo">{formatAmountString(token0Deposited, 6)}</Text>
                  <CurrencyLogo currency={currency0} />
                </CustomRowFixed>
              ) : (
                '-'
              )}
            </CustomRow>
          )}

          {isStableLP ? null : (
            <CustomRow>
              <CustomRowFixed>
                <Text className="text-left">{t('Pooled %asset%', { asset: currency1.symbol })}</Text>
              </CustomRowFixed>
              {token1Deposited ? (
                <CustomRowFixed>
                  <Text className="text-right text-logo">{formatAmountString(token1Deposited, 6)}</Text>
                  <CurrencyLogo currency={currency1} />
                </CustomRowFixed>
              ) : (
                '-'
              )}
            </CustomRow>
          )}
          {poolData && (
            <CustomRow>
              <CustomRowFixed>
                <TooltipText ref={targetRef} color="textSubtle">
                  {t('LP reward APR')}:
                </TooltipText>
                {tooltipVisible && tooltip}
              </CustomRowFixed>
              <Text>{formatAmount(poolData.lpApr7d)}%</Text>
            </CustomRow>
          )}

          <CustomRow>
            <Text className="text-left">{t('Your pool tokens')}</Text>
            <Text className="text-right">{formatAmountString(userPoolBalance, 6)}</Text>
          </CustomRow>

          <CustomRow>
            <Text className="text-left">{t('Your pool share')}</Text>
            <Text className="text-right">
              {poolTokenPercentage
                ? parseFloat(poolTokenPercentage.toFixed(6)) >= 0.01
                  ? `${formatAmountString(poolTokenPercentage)}%`
                  : parseFloat(poolTokenPercentage.toFixed(6)) === 0
                  ? '0%'
                  : '<0.01%'
                : '0%'}
            </Text>
          </CustomRow>

          {/* {userPoolBalance && JSBI.greaterThan(userPoolBalance.quotient, BIG_INT_ZERO) && ( */}
          <ButtonWrapper>
            <Button
              as={NextLinkFromReactRouter}
              to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}${isStableLP ? '?stable=1' : ''}`}
              width="100%"
              className="btn-remove"
            >
              {t('Remove')}
            </Button>
            <Button
              as={NextLinkFromReactRouter}
              to={`/add/${currencyId(currency0)}/${currencyId(currency1)}?step=1`}
              variant="text"
              width="100%"
              className="btn-add"
            >
              {t('Add')}
            </Button>
          </ButtonWrapper>
          {/* )} */}
        </AutoColumn>
      )}
    </CustomCard>
  )
}

export const MinimalPositionCard = withLPValues(MinimalPositionCardView)

export const StableFullPositionCardContainer = withStableLPValues(FullPositionCard)

export const StableFullPositionCard = (props) => {
  const { stableSwapConfig, ...config } = useStableConfig({
    tokenA: props.pair?.token0,
    tokenB: props.pair?.token1,
  })

  if (!stableSwapConfig) return null

  return (
    <StableConfigContext.Provider value={{ stableSwapConfig, ...config }}>
      <StableFullPositionCardContainer {...props} />
    </StableConfigContext.Provider>
  )
}

export default withLPValues(FullPositionCard)
