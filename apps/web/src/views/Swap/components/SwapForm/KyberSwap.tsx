import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChainId, Currency, CurrencyAmount, JSBI, LINEA_TESTNET, Percent, Price, Token, ZERO } from '@pancakeswap/sdk'
import { Box, Swap as SwapUI, useMatchBreakpoints } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'
import CurrencyInput from './CurrencyInput'
import { AutoRow } from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'
import { useCurrency } from 'hooks/Tokens'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { Wrapper } from '../styleds'
import SearchInput from './SearchInput'
import { useCurrencyBalance } from 'state/wallet/hooks'
import useFetchKyberswap from 'hooks/useFetchKyberswap'
import SwapButton from './SwapButton'
import { KYBERSWAP_DEFAULT_TOKEN } from '@pancakeswap/tokens'
import AlertSlippage from './AlertSlippage'
import MinGas from './MinGas'
import KyberSwapRoute from './KyberSwapRoute'
import PowerByKyber from './PowerByKyber'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import { useDebounce } from '@pancakeswap/hooks'
import KyberswapMoreInformation from './KyberswapMoreInformation'
import { GELATO_NATIVE } from 'config/constants'
import BigNumber from 'bignumber.js'
import { formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'
import { useRouter } from 'next/router'

export default function KyberSwap() {
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()

  const [tokenIn, setTokenIn] = useState<Token>(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_IN?.token)
  const [tokenInAmount, setTokenInAmount] = useState('')
  const [tokenInImgUrl, setTokenInImgUrl] = useState(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_IN?.imgURL)
  const currencyIn = useCurrency(tokenIn?.address)
  const [inputAmountIn, setInputAmountIn] = useState('')

  const currencyInBalance = useCurrencyBalance(account ?? undefined, currencyIn ?? undefined)
  const maxAmountInput: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyInBalance)

  const [tokenOut, setTokenOut] = useState<Token>(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_OUT?.token)
  const [tokenOutImgUrl, setTokenOutImgUrl] = useState(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_OUT?.imgURL)
  const currencyOut = useCurrency(tokenOut?.address)
  const currencyOutBalance = useCurrencyBalance(account ?? undefined, currencyOut ?? undefined)

  const [allowedSlippage] = useUserSlippageTolerance()
  const parsedInAmount = tryParseAmount(tokenInAmount, currencyIn)

  const tokenInAmountDebound = useDebounce(tokenInAmount, 300)

  const [minGas, setMinGas] = useState(false)
  const [attemptingTxn, setAttemptingTxn] = useState(false)
  const route = useRouter()

  useEffect(() => {
    setTokenIn(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_IN?.token)
    setTokenInImgUrl(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_IN?.imgURL)
    setTokenOut(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_OUT?.token)
    setTokenOutImgUrl(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_OUT?.imgURL)
  }, [route, chainId])

  const { summary, swapRoute, routerAddress, fullRoute, amountIn, amountOut, setAmountIn, setAmountOut } =
    useFetchKyberswap({
      chainId,
      currencyIn,
      currencyOut,
      tokenIn,
      tokenOut,
      tokenInAmount: tokenInAmountDebound,
      saveGas: minGas,
      inputAmountIn
    })

  const priceImpact = useMemo(() => {
    if (!summary) return new Percent(ZERO)

    const amountInUsd = new BigNumber(summary.amountInUsd)
    const amountOutUsd = new BigNumber(summary.amountOutUsd)

    const res = parseInt(amountInUsd.minus(amountOutUsd).dividedBy(amountInUsd).multipliedBy(10000).toFixed(4))
    return new Percent(res, 10000)
  }, [summary])

  const [approval, approveCallback] = useApproveCallback(parsedInAmount, routerAddress)

  const executionPrice = useMemo(() => {
    if (!currencyIn || !currencyOut) return undefined
    return new Price(
      currencyIn,
      currencyOut,
      CurrencyAmount.fromRawAmount(currencyIn, amountIn).quotient,
      CurrencyAmount.fromRawAmount(currencyOut, amountOut).quotient,
    )
  }, [currencyIn, currencyOut, amountIn, amountOut])

  const { isMobile } = useMatchBreakpoints()

  const convertAmountWeitoCurrencyAmount = (currency: Currency, amountInWei?: string) => {
    if (!currency || !amountInWei) return ''

    return CurrencyAmount.fromRawAmount(currency, amountInWei).toExact()
  }

  const handleOnClickedBtnSwapToken = useCallback(() => {
    if (
      currencyOut &&
      tokenInAmount &&
      tokenInAmount.split('.')[1] &&
      tokenInAmount.split('.')[1].length > currencyOut.decimals
    ) {
      setTokenInAmount(`${tokenInAmount.split('.')[0]}.${tokenInAmount.split('.')[1].slice(0, currencyOut.decimals)}`)
      setInputAmountIn((inputAmountIn) => inputAmountIn.toString())
    }
    setAmountIn('')
    setAmountOut('')
    setTokenIn(tokenOut)
    setTokenOut(tokenIn)
    setTokenInImgUrl(tokenOutImgUrl)
    setTokenOutImgUrl(tokenInImgUrl)
  }, [tokenOut, tokenIn, tokenInAmount, inputAmountIn, tokenOutImgUrl, tokenInImgUrl, currencyOut])

  const handleTypeInput = useCallback((amount: string) => {
    setInputAmountIn(amount)
  }, [])

  const handleInputSelect = useCallback(
    (newCurrencyInput: Currency) => {
      if (currencyOut && (newCurrencyInput as any)?.address == (currencyOut as any)?.address) {
        handleOnClickedBtnSwapToken()
        return
      }
      setTokenInImgUrl('')
      setTokenIn(
        new Token(
          newCurrencyInput.chainId,
          newCurrencyInput.isNative ? GELATO_NATIVE : (newCurrencyInput as Token).address,
          newCurrencyInput.decimals,
          newCurrencyInput.symbol,
        ),
      )
    },
    [currencyOut, handleOnClickedBtnSwapToken],
  )

  const handleOutputSelect = useCallback(
    (newCurrencyOutput: Currency) => {
      if ((newCurrencyOutput as any)?.address == (currencyIn as any)?.address) {
        handleOnClickedBtnSwapToken()
        return
      }
      setTokenOutImgUrl('')
      setTokenOut(
        new Token(
          newCurrencyOutput.chainId,
          newCurrencyOutput.isNative ? GELATO_NATIVE : (newCurrencyOutput as Token).address,
          newCurrencyOutput.decimals,
          newCurrencyOutput.symbol,
        ),
      )
    },
    [currencyIn, handleOnClickedBtnSwapToken],
  )

  useEffect(() => {
    if (!currencyIn) return
    let res = inputAmountIn
    if (inputAmountIn) {
      const parts = inputAmountIn.split('.')
      if (parts[1] && parts[1].length > currencyIn.decimals) {
        res = `${parts[0]}.${parts[1].slice(0, currencyIn.decimals)}`
      }
    }
    setTokenInAmount(res)
  }, [inputAmountIn, currencyIn])

  useEffect(() => {
    setTokenIn(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_IN?.token)
    setTokenInImgUrl(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_IN?.imgURL)
    setTokenOut(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_OUT?.token)
    setTokenOutImgUrl(KYBERSWAP_DEFAULT_TOKEN[chainId]?.TOKEN_OUT?.imgURL)
  }, [chainId])

  const handlePercentInput = useCallback(
    (percent) => {
      if (!maxAmountInput) return
      setInputAmountIn(maxAmountInput.multiply(percent).divide(100).toExact())
    },
    [maxAmountInput],
  )

  return (
    <>
      <Wrapper id="swap-page" style={isMobile ? { minHeight: '350px' } : { minHeight: '412px' }}>
        {chainId !== LINEA_TESTNET && chainId !== ChainId.ZKSYNC && (
          <SearchInput
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            setTokenIn={setTokenIn}
            setTokenOut={setTokenOut}
            setTokenInImgURL={setTokenInImgUrl}
            setTokenOutImgURL={setTokenOutImgUrl}
            setInputAmountIn={setInputAmountIn}
          />
        )}
        <AutoColumn gap="sm">
          <CurrencyInput
            id="kyberswap-currency-input"
            label={t('From')}
            value={tokenInAmount}
            showMaxButton={!false}
            showQuickInputButton
            currency={currencyIn}
            balance={currencyInBalance}
            imgUrl={tokenInImgUrl}
            otherCurrency={currencyOut}
            amountUsd={summary?.amountInUsd}
            onUserInput={handleTypeInput}
            onPercentInput={handlePercentInput}
            onMax={() => handlePercentInput(100)}
            onCurrencySelect={handleInputSelect}
          />

          <AutoColumn justify="space-between">
            <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
              {account ? (
                <div className="price" style={{ whiteSpace: 'nowrap', minWidth: 'max-content' }}>
                  {amountIn ? (
                    <>
                      {' '}
                      1 {currencyIn?.symbol} ={'  '}
                      {formatAmountNumber2(parseFloat(executionPrice?.toSignificant(6)), 6)}
                      {'  '}
                      {currencyOut?.symbol}
                    </>
                  ) : (
                    <div>Calculating...</div>
                  )}
                </div>
              ) : (
                <div />
              )}
              <SwapUI.SwitchButton
                onClick={() => {
                  handleOnClickedBtnSwapToken()
                }}
              />
            </AutoRow>
          </AutoColumn>
          <CurrencyInput
            id="kyberswap-currency-output"
            value={tokenInAmount && convertAmountWeitoCurrencyAmount(currencyOut, summary?.amountOut)}
            onUserInput={() => null}
            label={t('To (estimated)')}
            showMaxButton={false}
            currency={currencyOut}
            otherCurrency={currencyIn}
            balance={currencyOutBalance}
            imgUrl={tokenOutImgUrl}
            amountUsd={summary?.amountOutUsd}
            onCurrencySelect={handleOutputSelect}
            disabled
          />
        </AutoColumn>
        <MinGas minGas={minGas} setMinGas={setMinGas} />
        <AlertSlippage allowedSlippage={allowedSlippage} classname="" />
        <Box mt="0.25rem">
          <SwapButton
            approval={approval}
            currencyIn={currencyIn}
            currencyOut={currencyOut}
            balance={maxAmountInput}
            tokenInImgUrl={tokenInImgUrl}
            tokenOutImgUrl={tokenOutImgUrl}
            tokenInAmount={tokenInAmount}
            summary={summary}
            fullRoute={fullRoute}
            allowedSlippage={allowedSlippage}
            recipient={account}
            routerAddress={routerAddress}
            attemptingTxn={attemptingTxn}
            priceImpact={priceImpact}
            setAttemptingTxn={setAttemptingTxn}
            approveCallback={approveCallback}
          />
        </Box>
      </Wrapper>
      <KyberswapMoreInformation
        chainId={chainId}
        summary={summary}
        currencyOut={currencyOut}
        priceImpact={priceImpact}
      />
      <KyberSwapRoute
        swapRoute={swapRoute}
        currencyIn={currencyIn}
        currencyOut={currencyOut}
        amountIn={tokenInAmount}
        amountOut={summary?.amountOut}
        tokenInImgUrl={tokenInImgUrl}
        tokenOutImgUrl={tokenOutImgUrl}
      />
      <PowerByKyber />
      {/* {!swapIsUnsupported ? (
        trade && (
          <AdvancedSwapDetailsDropdown
            trade={trade}
            showXOXSreceived={isShowReferralBox}
            value={formattedAmounts[Field.INPUT]}
          />
        )
      ) : (
        <UnsupportedCurrencyFooter currencies={[currencies.INPUT, currencies.OUTPUT]} />
      )} */}
    </>
  )
}
