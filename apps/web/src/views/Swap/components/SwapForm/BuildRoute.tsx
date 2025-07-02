import React, { useCallback, useMemo } from 'react'
import { KyberRouteStyles, RouteBoxWrapper } from './styles'
import { NETWORK_LINK } from 'views/BridgeToken/networks'
import { useCurrency } from 'hooks/Tokens'
import { Currency } from '@pancakeswap/sdk'
import { CurrencyLogo } from 'components/Logo'
import { BigNumber } from '@ethersproject/bignumber'
import { TSingleRoute, TSwapRoute } from 'utils/swapHelpers'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useMatchBreakpoints } from '@pancakeswap/uikit'

type Props = {
  currencyOutAddress: string
  currencyOut: Currency
  routes: TSingleRoute[]
  tokenOutImgUrl: string
}

const RouteBox = ({ currencyOutAddress, routes, currencyOut, tokenOutImgUrl }: Props) => {
  const fetchCurrencyOut = useCurrency(currencyOutAddress)

  const totalSwapAmount = useMemo(() => {
    const sum = routes.reduce(
      (partialSum, route) => partialSum.add(BigNumber.from(route.swapAmount)),
      BigNumber.from(0),
    )
    return sum
  }, [routes])

  const calculatePercent = useCallback((number: string, sum: BigNumber) => {
    return BigNumber.from(number).mul(100).div(sum).toNumber().toFixed(0)
  }, [])

  return (
    <RouteBoxWrapper>
      <a
        href={`${NETWORK_LINK}/token/${(fetchCurrencyOut as any)?.currencyOutAddress}`}
        target="_blank"
        className="route-box__token"
        style={{ marginRight: 0 }}
      >
        {fetchCurrencyOut?.symbol === currencyOut?.symbol ? (
          <img src={tokenOutImgUrl} alt="" />
        ) : (
          <CurrencyLogo currency={fetchCurrencyOut} />
        )}
        <span>{fetchCurrencyOut?.symbol}</span>
      </a>
      {routes.map(({ exchange, swapAmount, pool }) => {
        const amountPercent = calculatePercent(swapAmount, totalSwapAmount)

        return (
          <a href={null} className="route-box__exchange" key={pool}>
            <img
              src="https://storage.googleapis.com/ks-setting-1d682dca/4d443dd8-c343-4d0e-83ce-69fae31bb5d7.png"
              alt=""
            />
            <span>
              {exchange}: {amountPercent}%
            </span>
          </a>
        )
      })}
    </RouteBoxWrapper>
  )
}

const BuildRoute = ({ swapRoute, caculatePercent, currencyOut, tokenOutImgUrl }) => {
  const { isMobile } = useMatchBreakpoints()

  return (
    <KyberRouteStyles>
      <i className="dot dot-left" />
      <i className="dot dot-right" />
      {swapRoute.map((routes: TSwapRoute[]) => {
        const per = caculatePercent(routes)
        return (
          <div className="route-info" key={JSON.stringify(routes)}>
            <div className="start-percent">{per}%</div>
            <div className="hr" />
            <div className="route-main">
              <ScrollContainer hideScrollbars={false} className="scroll-container">
                <div className="route-main__wrapper">
                  {routes.map((route: TSwapRoute) => {
                    return (
                      <RouteBox
                        currencyOutAddress={route.addressOut}
                        routes={route.routes}
                        currencyOut={currencyOut}
                        tokenOutImgUrl={tokenOutImgUrl}
                        key={route.addressOut}
                      />
                    )
                  })}
                </div>
              </ScrollContainer>
            </div>
            {!isMobile && (
              <div className="end-arrow" style={{ marginRight: 2 }}>
                <div />
              </div>
            )}
          </div>
        )
      })}
    </KyberRouteStyles>
  )
}

export default BuildRoute
