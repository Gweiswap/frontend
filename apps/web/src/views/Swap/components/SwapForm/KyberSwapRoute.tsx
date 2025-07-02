import { useTranslation } from '@pancakeswap/localization'
import React, { useCallback, useState } from 'react'
import { KyberRouteStyles, KyberSwapRouteWrapper } from './styles'
import { Flex } from '@pancakeswap/uikit'
import { Currency, CurrencyAmount } from '@pancakeswap/sdk'
import { BigNumber } from '@ethersproject/bignumber'
import { TSingleRoute, TSwapRoute } from 'utils/swapHelpers'
import BuildRoute from './BuildRoute'
import { parseUnits } from '@ethersproject/units'
import { formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'

type Props = {
  swapRoute: TSwapRoute[][]
  currencyIn: Currency
  currencyOut: Currency
  amountIn: string
  amountOut: string
  tokenInImgUrl: string
  tokenOutImgUrl: string
}

const KyberSwapRoute = ({
  swapRoute,
  currencyIn,
  currencyOut,
  amountIn,
  amountOut,
  tokenInImgUrl,
  tokenOutImgUrl,
}: Props) => {
  const { t } = useTranslation()
  const [showRoute, setShowRoute] = useState(false)

  const caculatePercent = useCallback(
    (routes: TSwapRoute[]) => {
      if (!amountIn || !currencyIn) return undefined
      const routeAmount = routes[0].routes.reduce((sum: BigNumber, route: TSingleRoute) => {
        return sum.add(BigNumber.from(route.swapAmount))
      }, BigNumber.from(0))
      const total = parseUnits(amountIn, currencyIn?.decimals)

      if (!total || total.isZero()) return undefined

      return routeAmount.mul(100).div(total).toNumber().toFixed(0)
    },
    [amountIn, currencyIn, showRoute],
  )

  const handleOnClickedBtnShowRoute = () => {
    setShowRoute((s) => !s)
  }

  return (
    <KyberSwapRouteWrapper>
      <Flex justifyContent="space-between">
        <h2>{t('Your trade route')}</h2>
        <div className={`btn-show-route ${showRoute && 'active'}`} role="button" onClick={handleOnClickedBtnShowRoute}>
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
      <div className={`content ${showRoute && 'active'}`}>
        <div className="content__route" style={{ maxHeight: '100%' }}>
          <div>
            {currencyIn && currencyOut && (
              <div className="router__token">
                <div className="from__token">
                  <div className="token-logo" style={{ border: 'none' }}>
                    <img src={tokenInImgUrl} alt="" />
                    <span>
                      {!!swapRoute.length &&
                        currencyIn &&
                        formatAmountNumber2(
                          parseFloat(
                            CurrencyAmount.fromRawAmount(
                              currencyIn,
                              parseUnits(amountIn || '0', currencyIn?.decimals).toString(),
                            ).toSignificant(6),
                          ),
                        )}{' '}
                      {currencyIn?.symbol}{' '}
                    </span>
                  </div>
                </div>
                {!swapRoute.length && <div className="direct"></div>}
                <div className="to__token">
                  <div className="token-logo" style={{ border: 'none' }}>
                    <span>
                      {amountIn &&
                        amountOut &&
                        formatAmountNumber2(
                          parseFloat(CurrencyAmount.fromRawAmount(currencyOut, amountOut).toSignificant(6)),
                        )}{' '}
                      {currencyOut?.symbol}
                    </span>
                    <img alt="" src={tokenOutImgUrl} />
                  </div>
                </div>
              </div>
            )}
            {!!swapRoute.length && (
              <div>
                <BuildRoute
                  swapRoute={swapRoute}
                  caculatePercent={caculatePercent}
                  currencyOut={currencyOut}
                  tokenOutImgUrl={tokenOutImgUrl}
                />
                <KyberRouteStyles></KyberRouteStyles>
              </div>
            )}
          </div>
        </div>
      </div>
    </KyberSwapRouteWrapper>
  )
}

export default KyberSwapRoute
