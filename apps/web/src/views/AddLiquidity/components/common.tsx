import React from 'react'
import { Currency, Fraction, Percent, CurrencyAmount, Token } from '@pancakeswap/sdk'
import { Text, useTooltip, Box, Flex, Svg, SvgProps } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { AutoColumn } from 'components/Layout/Column'
import { AutoRow, CustomRowBetween, RowBetween } from 'components/Layout/Row'
import { Field } from 'state/burn/actions'
import { DoubleCurrencyLogo, CurrencyLogo } from 'components/Logo'
import { getLPSymbol, getLPSymbol2 } from 'utils/getLpSymbol'
import { formatAmountString } from '@pancakeswap/utils/formatBalance'

const Dot = styled(Box)<{ scale?: 'sm' | 'md' }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
`

const CustomRowBetweenWrapper = styled(CustomRowBetween)`
  display: flex;
  flex-direction: column;
  align-items: unset;

  .pair {
    margin-top: 8px;
  }

  .liquidity-minted {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
  }

  .pair-text {
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: flex-end;
    color: rgba(255, 255, 255, 0.87);
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: flex-end;

    .pair {
      margin: 0 8px 9px;
    }

    .liquidity-minted {
      font-weight: 700;
      font-size: 40px;
      line-height: 48px;
      color: #ffffff;
    }

    .pair-text {
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      display: flex;
      align-items: flex-end;
      color: rgba(255, 255, 255, 0.87);
      margin-left: 8px;
    }
  }
`

const AutoColumnWrapper = styled(AutoColumn)`
  width: 503px;
  max-width: 100%;

  .pool {
    margin: '8px 0';
  }

  .estimated {
    margin-bottom: 8px;
    div {
      font-style: italic;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: rgba(255, 255, 255, 0.6);
    }
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
    color: #ffffff;
    text-align: right;
  }

  .logo img {
    width: 18px;
    height: 18px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .pool {
      margin: '16px 0';
    }

    .estimated {
      margin-bottom: 16px;
      div {
        font-style: italic;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    .text-left {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
    }

    .text-right {
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
    }

    .logo img {
      width: 24px;
      height: 24px;
    }
  }
`

const CircleSvg = ({ percent = 1, ...props }: SvgProps & { percent?: number }) => (
  <Svg width="60px" height="60px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#filter0_i_1147_113741)">
      <circle r="10" cx="10" cy="10" fill="#7645D9" />
      <circle
        r="5"
        cx="10"
        cy="10"
        fill="transparent"
        stroke="#1FC7D4"
        strokeWidth="10"
        strokeDasharray={`calc(${percent * 100}px * 31.4 / 100) 31.4`}
        transform="rotate(-90) translate(-20)"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_1147_113741"
        x={0}
        y={0}
        width={60}
        height={60}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy={-2} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend in2="shape" result="effect1_innerShadow_1147_113741" />
      </filter>
    </defs>
  </Svg>
)

const Subtitle: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Text fontSize="12px" textTransform="uppercase" bold color="secondary">
      {children}
    </Text>
  )
}

export const PairDistribution = ({
  title,
  percent,
  currencyA,
  currencyB,
  currencyAValue,
  currencyBValue,
  tooltipTargetRef,
}: {
  title: React.ReactNode
  percent?: number
  currencyA?: Currency
  currencyB?: Currency
  currencyAValue?: string
  currencyBValue?: string
  tooltipTargetRef?: any
}) => {
  return (
    <AutoColumn gap="8px">
      <Subtitle>{title}</Subtitle>
      <Flex>
        {typeof percent !== 'undefined' && (
          <div ref={tooltipTargetRef}>
            <CircleSvg percent={percent} mr="34px" />
          </div>
        )}
        <AutoColumn style={{ width: '100%' }}>
          {currencyA && (
            <RowBetween>
              <AutoRow gap="4px">
                <Dot bg="primary" />
                <CurrencyLogo currency={currencyA} />
                <Text>{currencyA?.symbol}</Text>
              </AutoRow>
              <Text>{currencyAValue}</Text>
            </RowBetween>
          )}

          {currencyB && (
            <RowBetween>
              <AutoRow gap="4px">
                <Dot bg="secondary" />
                <CurrencyLogo currency={currencyB} />
                <Text>{currencyB?.symbol}</Text>
              </AutoRow>
              <Text>{currencyBValue}</Text>
            </RowBetween>
          )}
        </AutoColumn>
      </Flex>
    </AutoColumn>
  )
}

interface AddLiquidityModalHeaderProps {
  currencies: { [field in Field]?: Currency }
  poolTokenPercentage?: Percent
  liquidityMinted: CurrencyAmount<Token>
  price: Fraction
  allowedSlippage: number
  children: React.ReactNode
  noLiquidity?: boolean
  currencyAValue?: string
  currencyBValue?: string
}

export const AddLiquidityModalHeader = ({
  currencies,
  poolTokenPercentage,
  liquidityMinted,
  price,
  allowedSlippage,
  noLiquidity,
  currencyAValue,
  currencyBValue,
  children,
}: AddLiquidityModalHeaderProps) => {
  const { t } = useTranslation()
  const { tooltip, tooltipVisible, targetRef } = useTooltip(
    t('Output is estimated. If the price changes by more than %slippage%% your transaction will revert.', {
      slippage: allowedSlippage / 100,
    }),
  )

  return (
    <AutoColumnWrapper gap="8px">
      <AutoColumn>
        <CustomRowBetweenWrapper>
          <Text className="liquidity-minted">{formatAmountString(liquidityMinted, 6)}</Text>
          <AutoRow className="pair logo">
            <DoubleCurrencyLogo
              currency0={currencies[Field.CURRENCY_A]}
              currency1={currencies[Field.CURRENCY_B]}
              size={24}
              margin={false}
            />
            <Text className="pair-text">
              {currencies[Field.CURRENCY_A]?.symbol &&
                currencies[Field.CURRENCY_B]?.symbol &&
                getLPSymbol(
                  currencies[Field.CURRENCY_A]?.symbol,
                  currencies[Field.CURRENCY_B]?.symbol,
                  currencies[Field.CURRENCY_A]?.chainId,
                )}
            </Text>
          </AutoRow>
        </CustomRowBetweenWrapper>
      </AutoColumn>
      <CustomRowBetween className="pool">
        <Text fontSize="18px" margin="16px 0" fontWeight="500" lineHeight="22px" color="#FB8618">
          {currencies[Field.CURRENCY_A]?.symbol &&
            currencies[Field.CURRENCY_B]?.symbol &&
            t('%str% Pool Tokens', {
              str: `${getLPSymbol2(
                currencies[Field.CURRENCY_A]?.symbol,
                currencies[Field.CURRENCY_B]?.symbol,
                currencies[Field.CURRENCY_A]?.chainId,
              )}`,
            })}
        </Text>
      </CustomRowBetween>
      <CustomRowBetween className="estimated">
        <Text maxWidth="460px">
          {t('Output is estimated. If the price changes by more than %slippage%% your transaction will revert.', {
            slippage: allowedSlippage / 100,
          })}
        </Text>
      </CustomRowBetween>
      <CustomRowBetween>
        <Text className="text-left">{t('%token% Deposited', { token: currencies[Field.CURRENCY_A]?.symbol })}</Text>
        <Flex className="logo">
          {currencies[Field.CURRENCY_A] && <CurrencyLogo currency={currencies[Field.CURRENCY_A]} />}
          <Text className="text-right" ml="8px">
            {currencyAValue}
          </Text>
        </Flex>
      </CustomRowBetween>
      <CustomRowBetween>
        <Text className="text-left">{t('%token% Deposited', { token: currencies[Field.CURRENCY_B]?.symbol })}</Text>
        <Flex className="logo">
          {currencies[Field.CURRENCY_B] && <CurrencyLogo currency={currencies[Field.CURRENCY_B]} />}
          <Text className="text-right" ml="8px">
            {currencyBValue}
          </Text>
        </Flex>
      </CustomRowBetween>
      <AutoColumn>
        <CustomRowBetween>
          <Text className="text-left">{t('Rates')}</Text>
          <Flex flexDirection="column">
            <Text className="text-right" mb="8px">
              {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${formatAmountString(price, 6)} ${
                currencies[Field.CURRENCY_B]?.symbol
              }`}
            </Text>

            <Text className="text-right">
              {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${formatAmountString(price?.invert(), 6)} ${
                currencies[Field.CURRENCY_A]?.symbol
              }`}
            </Text>
          </Flex>
        </CustomRowBetween>
        <CustomRowBetween style={{ justifyContent: 'flex-end' }} />
      </AutoColumn>
      <CustomRowBetween>
        <Text className="text-left">{t('Share of Pool')}</Text>
        <Text className="text-right">{noLiquidity ? '100' : formatAmountString(poolTokenPercentage, 6)}%</Text>
      </CustomRowBetween>
      {/* {!noLiquidity && (
        <CustomRowBetween>
          <Text fontSize="16px" fontWeight="400" lineHeight="19px" color="#FFFFFF">
            {t('Slippage Tolerance')}
          </Text>
          <TooltipText ref={targetRef}>{allowedSlippage / 100}%</TooltipText>
          {tooltipVisible && tooltip}
        </CustomRowBetween>
      )} */}
    </AutoColumnWrapper>
  )
}
