/* eslint-disable react/button-has-type */
import { Box, useModal } from '@pancakeswap/uikit'
import { fromUnixTime } from 'date-fns'
import { useState, useMemo, memo, useEffect } from 'react'
import { formatAmount } from 'utils/formatInfoNumbers'
import { ChainId, Currency, NativeCurrency, PAIR_XOX_BUSD } from '@pancakeswap/sdk'
import { CurrencyLogo } from 'components/Logo'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { SUGGESTED_BASES_ID, USD_ADDRESS, USD_DECIMALS, XOX_ADDRESS } from 'config/constants/exchange'
import { useERC20 } from 'hooks/useContract'
import { formatAmountNumber, formatBigNumber } from '@pancakeswap/utils/formatBalance'
import { ResponsiveContainer } from 'recharts'
import BarChart from './BarChart'
import LineChart from './LineChart'
import { ChartContent, TitleChart } from './style'
import { useTranslation } from '@pancakeswap/localization'

interface HoverableChartProps {
  chartData: any[]
  dataChartXOX: any[]
  valueProperty: string
  ChartComponent: typeof BarChart | typeof LineChart
  filter: any
  setFilter: (n: any) => void
  currencyDatas: any
  setCoinmarketcapId: (id: number) => void
  chainId: number
  native: NativeCurrency
  defaultToken: Currency
  allTokens: any
  fetchingTokenId: boolean
  setFetchingTokenId: (b: boolean) => void
  unsupported: boolean
}

const HoverableChart = ({
  chartData,
  dataChartXOX,
  currencyDatas,
  valueProperty,
  ChartComponent,
  filter,
  setFilter,
  setCoinmarketcapId,
  native,
  defaultToken,
  chainId,
  fetchingTokenId,
  allTokens,
  unsupported,
  setFetchingTokenId,
}: HoverableChartProps) => {
  const { t } = useTranslation()
  const [hover, setHover] = useState<number | undefined>()
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(defaultToken)
  const [dateHover, setDateHover] = useState<string | undefined>()
  const [currencyData, setCurrencyData] = useState<any>()
  const [showX, setShowX] = useState<any>(true)
  const contractUSD = useERC20(USD_ADDRESS[chainId])
  const contractXOX = useERC20(XOX_ADDRESS[chainId])
  const [rateXOX, setRateXOX] = useState(0)
  const [priceChangeXOX, setPriceChangeXOX] = useState(0)

  // Getting latest data to display on top of chart when not hovered
  useEffect(() => {
    setHover(null)
  }, [chartData, dataChartXOX])

  useEffect(() => {
    let data = chartData
    if (selectedCurrency.symbol.toUpperCase() === 'XOX') data = dataChartXOX
    if (hover == null && data) {
      setHover(data[valueProperty])
    }
  }, [chartData, hover, valueProperty, dataChartXOX, selectedCurrency])

  const minValue = Math.min(
    ...((selectedCurrency.symbol.toUpperCase() === 'XOX' ? dataChartXOX : chartData) || []).map(
      (o) => o[valueProperty],
    ),
  )
  const maxValue = Math.max(
    ...((selectedCurrency.symbol.toUpperCase() === 'XOX' ? dataChartXOX : chartData) || []).map(
      (o) => o[valueProperty],
    ),
  )

  const subValue = maxValue - minValue === 0 ? 0.2 * maxValue : maxValue - minValue

  const minYAxis = minValue - subValue * 0.2 > 0 ? minValue - subValue * 0.2 : 0.0000000001
  const maxYAxis = maxValue + subValue * 0.2

  const formattedData = useMemo(() => {
    let data = chartData
    if (selectedCurrency.symbol.toUpperCase() === 'XOX') {
      data = dataChartXOX
      if (filter === '1D') {
        const oldValue = data?.[0]
        const currentValue = data?.[data?.length - 1]
        setPriceChangeXOX(formatAmountNumber(Math.round(currentValue?.priceUSD / oldValue?.priceUSD)))
      }
    }
    if (data) {
      let prev = data[0]?.priceUSD
      return data.map((day, index) => {
        const result = {
          time: fromUnixTime(day.date),
          value: minValue === maxValue && index === 0 ? day[valueProperty] - 0.000001 : day[valueProperty],
          vol:
            index === data.length - 1 && selectedCurrency.symbol.toUpperCase() === 'XOX'
              ? data[data.length - 2]?.VolUSD
              : day?.VolUSD,
          priceChange: formatAmountNumber(day.priceChange || (day?.priceUSD - prev) / prev),
          month: fromUnixTime(day.date).getMonth(),
        }
        prev = day.priceUSD
        return result
      })
    }
    return []
  }, [chartData, valueProperty, dataChartXOX, selectedCurrency, filter])

  const priceChange = useMemo(() => {
    if (selectedCurrency.symbol.toUpperCase() === 'XOX') {
      return priceChangeXOX
    } else {
      return currencyData?.percent_change_24h?.toFixed(2)
    }
  }, [currencyData, priceChangeXOX, selectedCurrency])

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal onCurrencySelect={setSelectedCurrency} selectedCurrency={selectedCurrency} />,
    true,
    true,
    'selectCurrencyModal',
  )

  useEffect(() => {
    setSelectedCurrency(defaultToken)
  }, [defaultToken])

  useEffect(() => {
    getXOXPrice()
  }, [])

  useEffect(() => {
    setFetchingTokenId(false)
    const _tokenList = JSON.parse(localStorage.getItem('coinmarketcapIds')) || SUGGESTED_BASES_ID
    if (selectedCurrency === native) {
      if (chainId === ChainId.NEO_EVM_TESTNET) setCoinmarketcapId(1785)
      else if (chainId === 1 || chainId === 5) setCoinmarketcapId(_tokenList[ChainId.ETHEREUM]?.ETH)
      else setCoinmarketcapId(_tokenList[ChainId.BSC]?.BNB)
    } else {
      setCoinmarketcapId(_tokenList[chainId]?.[(selectedCurrency as any)?.address?.toUpperCase()])
    }
  }, [selectedCurrency, fetchingTokenId])

  useEffect(() => {
    if (selectedCurrency.symbol.toUpperCase() === 'XOX') getXOXPrice()
    if (!currencyDatas) return
    const sym =
      selectedCurrency === native
        ? chainId === ChainId.NEO_EVM_TESTNET ? 'GAS'
          : chainId === 1 || chainId === 5
            ? 'ETH'
            : 'BNB'
        : selectedCurrency.symbol.toUpperCase()
    const dataCurrency = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === sym)
    
    setCurrencyData(dataCurrency)
  }, [selectedCurrency, currencyDatas])

  const handleFilter = (value: string) => {
    setShowX(false)
    setTimeout(() => {
      setShowX(true)
    }, 500)
    setFilter(value)
  }

  const getXOXPrice = () => {
    Promise.all([contractUSD?.balanceOf(PAIR_XOX_BUSD[chainId]), contractXOX?.balanceOf(PAIR_XOX_BUSD[chainId])])
      .then((balances) => {
        const baseTokenPrice = parseFloat(formatBigNumber(balances[0], 2, USD_DECIMALS[chainId]))
        const XoxPrice = parseFloat(formatBigNumber(balances[1]))
        if (baseTokenPrice === 0) return
        setRateXOX(baseTokenPrice / XoxPrice)
      })
      .catch((e) => console.warn(e))
  }

  return (
    <Box p={['16px', '16px', '24px']}>
      <TitleChart>
        <div className="title_chart_container">
          <p className="title_chart">{t('Token Price')}</p>
          <div className="line" />
        </div>
        <div className="btns">
          <a
            className="btn-get-token"
            href={null}
            // href={`/swap?chainId=${chainId}&inputCurrency=${USD_ADDRESS[chainId]}&outputCurrency=${
            //   selectedCurrency === native ? native.symbol : (selectedCurrency as any).address
            // }`}
            // target="_blank"
            rel="noreferrer"
          >
            <div className="boxed-child">
              <span>{t('Get %symbol%', { symbol: selectedCurrency?.symbol })}</span>
            </div>
          </a>
          <button className="btn_select_token" onClick={onPresentCurrencyModal}>
            {t('Select Token')}
          </button>
        </div>
      </TitleChart>

      <ChartContent>
        <div className="container">
          <div className="token">
            <CurrencyLogo currency={selectedCurrency} size="30px" />
            {selectedCurrency?.symbol}
          </div>
          <>
            <div className="price-info">
              <div className="group">
                {t('Current price')}
                <div>
                  <span className="icon">$</span>
                  {selectedCurrency.symbol === 'XOX' ? (
                    <span className="val">{rateXOX ? formatAmountNumber(rateXOX) : '--'}</span>
                  ) : (
                    <span className="val">{currencyData ? formatAmount(currencyData?.price) : '--'}</span>
                  )}
                </div>
              </div>
              <div className="group right">
                {t('Market cap')}
                <div>
                  <span className="icon">$</span>
                  {currencyData ? (
                    <span className="val">{formatAmount(currencyData?.market_cap)}</span>
                  ) : (
                    <span className="val">--</span>
                  )}
                </div>
              </div>
              <div className="group">
                {t('Price change (in last 24h)')}
                {priceChange && priceChange > 0 ? (
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.3036 14.2498C10.3036 14.6916 9.94544 15.0498 9.50361 15.0498C9.06179 15.0498 8.70361 14.6916 8.70361 14.2498V6.67776L5.31588 10.0655C5.00346 10.3779 4.49693 10.3779 4.18451 10.0655C3.87209 9.75307 3.87209 9.24654 4.18451 8.93412L8.93451 4.18412C9.24693 3.8717 9.75346 3.8717 10.0659 4.18412L14.8159 8.93412C15.1283 9.24654 15.1283 9.75307 14.8159 10.0655C14.5035 10.3779 13.9969 10.3779 13.6845 10.0655L10.3036 6.68459V14.2498Z"
                        fill="#64C66D"
                      />
                    </svg>
                    <span className="val">{priceChange ? `${priceChange}%` : '--'}</span>
                  </div>
                ) : priceChange && priceChange < 0 ? (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      style={{ transform: 'rotate(180deg)' }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.3036 14.2498C10.3036 14.6916 9.94544 15.0498 9.50361 15.0498C9.06179 15.0498 8.70361 14.6916 8.70361 14.2498V6.67776L5.31588 10.0655C5.00346 10.3779 4.49693 10.3779 4.18451 10.0655C3.87209 9.75307 3.87209 9.24654 4.18451 8.93412L8.93451 4.18412C9.24693 3.8717 9.75346 3.8717 10.0659 4.18412L14.8159 8.93412C15.1283 9.24654 15.1283 9.75307 14.8159 10.0655C14.5035 10.3779 13.9969 10.3779 13.6845 10.0655L10.3036 6.68459V14.2498Z"
                        fill="#FF0000"
                      />
                    </svg>
                    <span className="val">{priceChange ? `${Math.abs(priceChange)}%` : '--'}</span>
                  </div>
                ) : (
                  <div>
                    <span className="val">{priceChange ? '0%' : '--'}</span>
                  </div>
                )}
              </div>
              <div className="group right">
                {t('Volume 24H')}
                <div>
                  <span className="icon">$</span>
                  {selectedCurrency.symbol === 'XOX' ? (
                    <span className="val">
                      {formattedData ? formatAmount(formattedData[formattedData.length - 1]?.vol) : '--'}
                    </span>
                  ) : (
                    <span className="val">{currencyData ? formatAmount(currencyData?.volume_24h) : '--'}</span>
                  )}
                </div>
              </div>
            </div>
          </>
        </div>

        <div className="filter">
          <div style={{ whiteSpace: 'nowrap' }}>
            <button type="button" onClick={() => handleFilter('1D')} className={filter === '1D' ? 'active' : ''}>
              24H
            </button>
            <button type="button" onClick={() => handleFilter('7D')} className={filter === '7D' ? 'active' : ''}>
              7D
            </button>
            <button type="button" onClick={() => handleFilter('1M')} className={filter === '1M' ? 'active' : ''}>
              1M
            </button>
            <button type="button" onClick={() => handleFilter('3M')} className={filter === '3M' ? 'active' : ''}>
              3M
            </button>
            <button type="button" onClick={() => handleFilter('1Y')} className={filter === '1Y' ? 'active' : ''}>
              1Y
            </button>
            <button type="button" onClick={() => handleFilter('ALL')} className={filter === 'ALL' ? 'active' : ''}>
              {t('All')}
            </button>
          </div>
        </div>
      </ChartContent>

      {/* <Text bold color="secondary">
        {title}
      </Text>
      {hover > -1 ? ( // sometimes data is 0
        <Text bold fontSize="24px">
          ${formatAmount(hover)}
        </Text>
      ) : (
        <Skeleton width="128px" height="36px" />
      )}
      <Text>{dateHover ?? currentDate}</Text> */}
      <Box height="200px" className="" style={{ position: 'relative', width: '100%', paddingBottom: '200px' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
          }}
        >
          <ResponsiveContainer>
            <ChartComponent
              data={formattedData}
              setHoverValue={setHover}
              setHoverDate={setDateHover}
              minYAxis={minYAxis}
              maxYAxis={maxYAxis}
              typeXAxis={filter}
              showXAxis={showX}
              hoverableChart
              unsupported={unsupported}
            />
          </ResponsiveContainer>
        </div>
        {/* <ResponsiveContainer width="99%" aspect={3}>
          <ChartComponent
            data={formattedData}
            setHoverValue={setHover}
            setHoverDate={setDateHover}
            minYAxis={minYAxis}
            maxYAxis={maxYAxis}
            typeXAxis={filter}
            showXAxis={showX}
          />
        </ResponsiveContainer> */}
      </Box>
    </Box>
  )
}

export default memo(HoverableChart)
