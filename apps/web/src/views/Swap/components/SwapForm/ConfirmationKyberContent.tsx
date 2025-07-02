import React, { useCallback, useState } from 'react'
import AlertSlippage from './AlertSlippage'
import { ConfirmationKyberContentWrapper } from './styles'
import { Button, LinkExternal } from '@pancakeswap/uikit'
import { ChainId, Currency, CurrencyAmount, Percent, Price } from '@pancakeswap/sdk'
import { useTranslation } from '@pancakeswap/localization'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { NETWORK_LABEL, NETWORK_LINK } from 'views/BridgeToken/networks'
import { CurrencyLogo } from 'components/Logo'
import FormattedPriceImpact from '../FormattedPriceImpact'
import BigNumber from 'bignumber.js'
import { BigNumber as EtherBigNumber } from '@ethersproject/bignumber'
import { formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'
import { parseUnits } from '@ethersproject/units'

type Props = {
  currencyIn: Currency
  currencyOut: Currency
  tokenInImgUrl: string
  tokenOutImgUrl: string
  tokenInAmount: string
  summary: any
  allowedSlippage: number
  recipient: string | null
  routerAddress: string
  disabled: boolean
  priceImpact: Percent
  onConfirm: () => void
}

const ConfirmationKyberContent = ({
  currencyIn,
  currencyOut,
  tokenInImgUrl,
  tokenOutImgUrl,
  tokenInAmount,
  summary,
  allowedSlippage,
  recipient,
  routerAddress,
  disabled,
  priceImpact,
  onConfirm,
}: Props) => {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  const [reversePrice, setReversePrice] = useState(false)
  const executionPrice = () => {
    return new Price(
      currencyIn,
      currencyOut,
      CurrencyAmount.fromRawAmount(currencyIn, summary.amountIn).quotient,
      CurrencyAmount.fromRawAmount(currencyOut, summary.amountOut).quotient,
    )
  }

  const handleInvertPrice = useCallback(() => {
    setReversePrice((s) => !s)
  }, [])

  return summary ? (
    <ConfirmationKyberContentWrapper>
      <div className="swap-amount">
        <div className="in-out-token" style={{ marginTop: 16, position: 'relative' }}>
          <div className="token-in">
            <div className="token-group">
              <div className="token-amount">{tokenInAmount}</div>
              <div className="token-info">
                <div className="token-amount-usd">
                  {summary && `~${formatAmountNumber2(parseFloat(parseFloat(summary.amountInUsd).toFixed(6)))}`}
                </div>
                {tokenInImgUrl ? (
                  <img src={tokenInImgUrl} alt="" className="token-logo" />
                ) : (
                  <CurrencyLogo currency={currencyIn} size="24px" />
                )}
                <div className="token-symbol">{currencyIn?.symbol}</div>
              </div>
            </div>
          </div>
          <div className="to-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M12.5042 17.9498V6"
                stroke="#FB8618"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.5 12L12.5 18L6.5 12"
                stroke="#FB8618"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="token-out">
            <div className="token-group">
              <div className="token-amount">
                {currencyOut && summary && CurrencyAmount.fromRawAmount(currencyOut, summary?.amountOut).toExact()}
              </div>
              <div className="token-info">
                <div className="token-amount-usd">
                  {summary && `~${formatAmountNumber2(parseFloat(parseFloat(summary.amountOutUsd).toFixed(6)))}`}
                </div>
                {tokenOutImgUrl ? (
                  <img src={tokenOutImgUrl} alt="" className="token-logo" />
                ) : (
                  <CurrencyLogo currency={currencyOut} size="24px" />
                )}
                <div className="token-symbol">{currencyOut?.symbol}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="swap-info">
        {currencyIn && currencyOut && (
          <div className="info__group">
            <div className="left">
              <div className="text">{t('Price')} </div>
            </div>
            <div className="right ">
              {reversePrice ? (
                <div className="value" style={{ whiteSpace: 'nowrap', minWidth: 'max-content' }}>
                  1 {currencyOut.symbol} ={' '}
                  {formatAmountNumber2(parseFloat(executionPrice().invert().toSignificant(6)), 6)} {currencyIn.symbol}
                </div>
              ) : (
                <div className="value" style={{ whiteSpace: 'nowrap', minWidth: 'max-content' }}>
                  1 {currencyIn.symbol} = {formatAmountNumber2(parseFloat(executionPrice().toSignificant(6)), 6)}{' '}
                  {currencyOut.symbol}
                </div>
              )}
              <div className="price" role="button" onClick={handleInvertPrice}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.09581 5.99226L5.03473 4.93118C5.37604 4.60685 5.74089 4.30695 6.12646 4.03429L6.5419 4.65487L6.96123 5.28122C6.65675 5.49867 6.36761 5.73634 6.09581 5.99226ZM4.68118 5.28473L5.74226 6.34581C5.48634 6.61762 5.24867 6.90675 5.03122 7.21123L3.78429 6.37646C4.05694 5.9909 4.35684 5.62605 4.68118 5.28473ZM4.71448 7.60088C4.46689 7.78566 4.11994 7.80453 3.84857 7.62286L3.84855 7.62285C3.57721 7.44122 3.46245 7.11326 3.53894 6.81391L4.71448 7.60088ZM6.9574 4.37671L6.54195 3.75614C6.93874 3.50497 7.35503 3.2816 7.78806 3.0888L8.07412 3.77863L8.36286 4.47494C8.02122 4.62898 7.69186 4.80564 7.37672 5.00307L6.9574 4.37671ZM8.53598 3.5871L8.24993 2.89728C9.26348 2.50735 10.358 2.28193 11.5 2.25315V3.75371C10.5593 3.78166 9.65938 3.96684 8.82473 4.28343L8.53598 3.5871ZM12 2.25314C17.1862 2.38367 21.3663 6.56384 21.4969 11.75H19.9963C19.8666 7.39231 16.3577 3.88341 12 3.75372V2.25314ZM20.0427 12.25H21.4573C21.3544 12.5413 21.0766 12.75 20.75 12.75C20.4234 12.75 20.1456 12.5413 20.0427 12.25ZM12 20.2463C12.9407 20.2183 13.8406 20.0332 14.6753 19.7166L14.964 20.4129L15.2501 21.1027C14.2365 21.4927 13.142 21.7181 12 21.7469V20.2463ZM15.7119 20.9112L15.4259 20.2214L15.1371 19.5251C15.4788 19.371 15.8081 19.1944 16.1233 18.9969L16.5426 19.6233L16.9581 20.2439C16.5613 20.495 16.145 20.7184 15.7119 20.9112ZM16.5388 18.7188C16.8433 18.5013 17.1324 18.2637 17.4042 18.0077L18.4653 19.0688C18.124 19.3931 17.7591 19.6931 17.3735 19.9657L16.9581 19.3451L16.5388 18.7188ZM18.8188 18.7153L17.7577 17.6542C18.0137 17.3824 18.2513 17.0933 18.4688 16.7888L19.7157 17.6235C19.4431 18.0091 19.1432 18.3739 18.8188 18.7153ZM19.9611 17.1861L18.7855 16.3991C19.0331 16.2143 19.38 16.1955 19.6514 16.3771L19.6514 16.3772C19.9228 16.5588 20.0376 16.8867 19.9611 17.1861ZM11.5 21.7469C6.31384 21.6163 2.13367 17.4362 2.00314 12.25H3.50372C3.63341 16.6077 7.14231 20.1166 11.5 20.2463V21.7469ZM2.75 11.25C3.07656 11.25 3.35437 11.4587 3.45733 11.75H2.04267C2.14563 11.4587 2.42344 11.25 2.75 11.25Z"
                    fill="#FB8618"
                    stroke="#FB8618"
                    strokeWidth="0.5"
                  />
                  <path d="M20.75 4V12" stroke="#FB8618" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.75 12V20" stroke="#FB8618" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        )}
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
                {CurrencyAmount.fromRawAmount(currencyOut, summary.amountOut).greaterThan(
                  parseUnits('1', currencyOut?.decimals).toString(),
                )
                  ? formatAmountNumber2(
                      parseFloat(
                        CurrencyAmount.fromRawAmount(currencyOut, summary.amountOut)
                          .multiply(9995)
                          .divide(10000)
                          .toSignificant(6),
                      ),
                      6,
                    )
                  : CurrencyAmount.fromRawAmount(currencyOut, summary.amountOut)
                      .multiply(9995)
                      .divide(10000)
                      .toSignificant(6)}
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
        <div className="info__group">
          <div className="left">
            <div className="text">{t('Max Slippage')}</div>
          </div>
          <div className="right value">{allowedSlippage / 100}%</div>
        </div>
        <div className="info__group">
          <div className="left">
            <div className="text">{t('Network')}</div>
          </div>
          <div className="right">
            <p className="text">{NETWORK_LABEL[chainId]}</p>
          </div>
        </div>
        <div className="info__group">
          <div className="left">
            <div className="text">{t('Contract Address')}</div>
          </div>
          <div className="right">
            <LinkExternal href={`${NETWORK_LINK[chainId]}/address/${routerAddress}`} external color="#FB8618">
              <div className="value">
                {routerAddress.substring(0, 8)}...{routerAddress.substring(routerAddress.length - 4)}
              </div>
            </LinkExternal>
          </div>
        </div>
      </div>
      <AlertSlippage allowedSlippage={allowedSlippage} classname="no-margin" />
      <div className="swap-button">
        <Button
          id="confirm-swap-or-send"
          className="btn-swap"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          disabled={disabled}
          onClick={onConfirm}
        >
          <span>{t('Confirm Swap')}</span>
        </Button>
      </div>
    </ConfirmationKyberContentWrapper>
  ) : (
    <></>
  )
}

export default ConfirmationKyberContent
