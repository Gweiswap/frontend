import { useTranslation } from '@pancakeswap/localization'
import { ChainId, Currency, CurrencyAmount, Percent } from '@pancakeswap/sdk'
import { Flex } from '@pancakeswap/uikit'
import { formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'
import React, { useState } from 'react'
import styled from 'styled-components'
import FormattedPriceImpact from '../FormattedPriceImpact'
import BigNumber from 'bignumber.js'

const Wrapper = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 0.5rem;
  padding: 12px 16px;
  border-radius: 10px;
  background: var(--dark-2, #1d1c1c);

  .title {
    h2 {
      color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
      font-size: 18px;
      font-weight: 400;
    }

    &.active {
      border-bottom: 1px solid rgba(255, 255, 255, 0.38);
    }

    .btn-show-more {
      transform: rotate(180deg);
      transition: all 0.3s;
    }

    .btn-show-more.active {
      transform: rotate(0deg);
    }
  }

  .info__group {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    height: 20px;
    width: 100%;
    display: flex;
    padding: 0px;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .left .text {
    color: var(--dark-text-secondary, rgba(255, 255, 255, 0.6));
    font-size: 16px;
    font-weight: 400;
  }

  .right {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    justify-content: center;
    align-items: center;
    text-align: right;
    display: flex;
    color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
    font-size: 16px;
    font-weight: 400;

    .price svg {
      width: 24px;
      height: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .group {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      display: flex;
      font-weight: 500;
      white-space: nowrap;
      color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
      font-size: 16px;
      font-weight: 400;
    }

    .value,
    .symbol {
      color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
      font-size: 16px;
      font-weight: 400;
    }
  }

  @media screen and (max-width: 640px) {
    .title h2 {
      font-size: 14px;
    }

    .left .text {
      font-size: 14px;
    }

    .right {
      font-size: 14px;

      .group {
        font-size: 14px;
      }

      .value,
      .symbol {
        font-size: 14px;
      }
    }
  }
`

type Props = {
  currencyOut: Currency
  summary: any
  priceImpact: Percent
  chainId: number
}

const KyberswapMoreInformation = ({ summary, currencyOut, priceImpact, chainId }: Props) => {
  const { t } = useTranslation()
  const [showMore, setShowMore] = useState(false)

  return summary ? (
    <Wrapper>
      <Flex justifyContent="space-between" className={`title ${showMore && 'active'}`}>
        <h2>{t('MORE INFORMATION')}</h2>
        <div className={`btn-show-more ${showMore && 'active'}`} role="button" onClick={() => setShowMore((s) => !s)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M5.95801 13.75L11.458 8.25L16.958 13.75"
              stroke="#515151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Flex>
      {showMore && (
        <>
          <div className="info__group">
            <div className="left" style={{ minWidth: 'max-content' }}>
              <div className="text">{t('Minimum received')}</div>
            </div>
            <div className="right">
              <div
                className="group"
                style={{
                  color: 'rgb(34, 34, 34)',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                <div className="value">
                  {formatAmountNumber2(
                    parseFloat(
                      CurrencyAmount.fromRawAmount(currencyOut, summary.amountOut)
                        .multiply(9995)
                        .divide(10000)
                        .toSignificant(6),
                    ),
                    6,
                  )}
                </div>
                <div className="symbol" style={{ minWidth: 'auto', marginLeft: '8px' }}>
                  {currencyOut.symbol}
                </div>
              </div>
            </div>
          </div>
          <div className="info__group">
            <div className="left">
              <div className="text">{t('Price Impact')}</div>
            </div>
            <div className="right value">
              <FormattedPriceImpact priceImpact={priceImpact} />
            </div>
          </div>
          <div className="info__group">
            <div className="left">
              <div className="text">{t('Est. Gas Fee')}</div>
            </div>
            <div className="right value">
              $
              {formatAmountNumber2(
                chainId === ChainId.ETHEREUM
                  ? new BigNumber(summary.gasUsd).multipliedBy(1.5).toNumber()
                  : new BigNumber(summary.gasUsd).toNumber(),
                0,
              )}
            </div>
          </div>
        </>
      )}
    </Wrapper>
  ) : (
    <></>
  )
}

export default KyberswapMoreInformation
