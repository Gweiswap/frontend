import { parseEther, parseUnits } from '@ethersproject/units'
import { ChainId, Currency, CurrencyAmount, Token } from '@pancakeswap/sdk'
import { GELATO_NATIVE_ADDRESS } from 'config/constants'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TSwapRoute, buildRoutes } from 'utils/swapHelpers'
import { KYBERSWAP_NETWORK_CHAIN } from 'views/BridgeToken/networks'
import axios from 'axios'
import { useInterval } from '@pancakeswap/hooks'

type Props = {
  chainId: ChainId
  currencyIn: Currency
  currencyOut: Currency
  tokenIn: Token
  tokenOut: Token
  tokenInAmount: string
  saveGas: boolean
  inputAmountIn: string
}

type Summary = {
  tokenIn: string
  amountIn: string
  amountInUsd: string
  tokenInMarketPriceAvailable: string
  tokenOut: string
  amountOut: string
  amountOutUsd: string
  tokenOutMarketPriceAvailable: string
  gas: string
  gasPrice: string
  gasUsd: string
  extraFee: {
    string
    feeAmount: string
    chargeFeeBy: string
    isInBps: string
    feeReceiver: string
  }
}

const useFetchKyberswap = ({ chainId, currencyIn, currencyOut, tokenIn, tokenOut, tokenInAmount, saveGas, inputAmountIn }: Props) => {
  const [swapRoute, setSwapRoute] = useState<TSwapRoute[][]>([])
  const [summary, setSummary] = useState<Summary>()
  const [routerAddress, setRouterAddress] = useState<string>()
  const [fullRoute, setFullRoute] = useState<any>({})
  const [amountIn, setAmountIn] = useState('')
  const [amountOut, setAmountOut] = useState('')
  const [recall, setRecall] = useState(false)

  useInterval(() => setRecall(true), 10000)

  const needFetch = useMemo(() => {
    try {
      return !tokenInAmount || (currencyIn && currencyOut)
    } catch (error) {
      return false
    }
  }, [currencyIn, currencyOut, tokenInAmount, tokenOut])

  const setValues = useCallback(
    (response: any) => {
      const data = response.data.data
      const routeSummary = data['routeSummary']
      const routerAddress = data['routerAddress']
      const route = routeSummary['route']

      if (tokenInAmount) {
        setFullRoute({ ...data })
        setSwapRoute(buildRoutes(route))
        setSummary(routeSummary)
        setRouterAddress(routerAddress)
        setAmountIn(routeSummary.amountIn)
        setAmountOut(routeSummary.amountOut)
      } else {
        setAmountIn(routeSummary.amountIn)
        setAmountOut(routeSummary.amountOut)
      }
      return
    },
    [tokenInAmount],
  )

  const setDefaultValues = useCallback(() => {
    setSwapRoute([])
    setSummary(undefined)
    setRouterAddress(undefined)
  }, [])

  const fetchRouteKyberswap = useCallback(() => {
    if (!needFetch || !currencyIn || !currencyOut) return
    setRecall(false)

    try {
      const url = `https://aggregator-api.kyberswap.com/${KYBERSWAP_NETWORK_CHAIN[chainId]}/api/v1/routes?tokenIn=${
        currencyIn.isNative ? GELATO_NATIVE_ADDRESS : tokenIn.address
      }&tokenOut=${currencyOut.isNative ? GELATO_NATIVE_ADDRESS : tokenOut.address}&amountIn=${parseUnits(
        tokenInAmount || '1',
        currencyIn?.decimals,
      ).toString()}&saveGas=${saveGas}&gasInclude=true`

      axios
        .get(url, {
          headers: { 'x-client-id': 'xoxlabs' },
        })
        .then((response) => {
          setValues(response)
        })
        .catch(() => {
          setDefaultValues()
        })
    } catch (error) {
      console.log(error)
    }
  }, [currencyIn, currencyOut, tokenInAmount, tokenOut, saveGas, recall])

  useEffect(() => {
    fetchRouteKyberswap()
  }, [currencyIn, currencyOut, tokenInAmount, tokenOut, saveGas])

  useEffect(() => {
    setSwapRoute([])
    setSummary(undefined)
    setRouterAddress(undefined)
  }, [currencyIn, inputAmountIn, currencyOut])

  return {
    swapRoute,
    summary,
    routerAddress,
    fullRoute,
    amountIn,
    amountOut,
    setAmountIn,
    setAmountOut,
  }
}

export default useFetchKyberswap
