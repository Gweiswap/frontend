/* eslint-disable import/order */
import { Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import LineChart from 'views/Info/components/InfoCharts/LineChart'
import TransactionTable from 'views/Info/components/InfoTables/TransactionsTable'
import WalletInfoTable from 'views/Info/components/InfoTables/WalletInfoTable'
import axios from 'axios'
import { SUGGESTED_BASES_ID, XOX_ADDRESS } from 'config/constants/exchange'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useAllTokens, useCurrency } from 'hooks/Tokens'
import HoverableChart from '../components/InfoCharts/HoverableChart'
import InfoNav from '../components/InfoNav'
import { useDataChartXOXSWR } from 'state/info/hooks'
import { formatAmountNumber } from '@pancakeswap/utils/formatBalance'
import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'

export const ChartCardsContainer = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);

  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    .corner1 {
      border-bottom: 1px solid #ffffff30;
      border-left: 1px solid #ffffff30;
    }

    .edge1 {
      width: 1px;
    }

    .corner2 {
      border-bottom: 1px solid #ffffff30;
      border-right: 1px solid #ffffff30;
    }

    .edge2 {
      width: 1px;
    }
  }
`

export const PageContainer = styled(Flex)`
  display: flex;
  flex-direction: column;
  padding-top: 24px;

  & > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 24px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    & > div {
      flex-direction: row;
    }
  }
`

const FullContentInside = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 24px 8px 0 8px;
  .content {
    width: 1400px;
  }

  @media screen and (min-width: 968px) and (max-width: 1400px) {
    padding: 24px 0;
    .content {
      width: 1200px;
    }
  }

  @media screen and (min-width: 560px) and (max-width: 967px) {
    padding: 0 24px;
    .content {
      width: 1200px;
    }
  }

  @media screen and (max-width: 1200px) {
    display: block;
    .content {
      width: 100%;
    }
  }
`

const PageOverViewStyled = styled(Page)`
  display: grid;
  position: relative;
  @media screen and (max-width: 1200px) {
    display: block;
  }
`

const Overview: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const native = useNativeCurrency()
  const [coinmarketcapIds, setCoinmarketcapIds] = useState<any>()
  const [coinmarketcapId, setCoinmarketcapId] = useState<number | undefined>()
  const [filter, setFilter] = useState('1D')
  const [chartData, setChardData] = useState<Array<any> | undefined>()
  const [currencyDatas, setCurrencyDatas] = useState<Array<any> | undefined>()
  const { chainId } = useActiveChainId()
  const allTokens = useAllTokens()
  const [fetchingTokenId, setFetchingTokenId] = useState(false)
  const [unsupported, setUnsupported] = useState(false)
  const { isMobile } = useMatchBreakpoints()
  const { data: dataChartXOX } = useDataChartXOXSWR(filter)

  const xoxToken = useCurrency(XOX_ADDRESS[chainId]) ?? native

  // const allPoolData = useAllPoolDataSWR()
  // const allPoolData = useAllPoolData()

  // const somePoolsAreLoading = useMemo(() => {
  //   return poolDatas.some((pool) => !pool?.token0Price)
  // }, [poolDatas])

  // const isStableSwap = checkIsStableSwap()
  // const chainName = useGetChainName()

  const loadChartData = useCallback(() => {
    if (!coinmarketcapIds || Object.keys(coinmarketcapIds).length === 0) return

    const unPackage = Array.from(Object.values(coinmarketcapIds))
      .map((item) => Object.values(item))
      .flat()

    axios
      .get(`${process.env.NEXT_PUBLIC_API}/coin-market-cap/pro/coins/price`, {
        params: {
          id: unPackage.filter((id, index) => unPackage.indexOf(id) === index).join(','),
        },
      })
      .then((response) => {
        const data = response.data?.data
        if (!data) return
        const result = Object.keys(data).map((key) => {
          return {
            id: data[key]?.id,
            symbol: data[key]?.symbol,
            price: data[key]?.quote?.USD?.price,
            percent_change_24h: data[key]?.quote?.USD?.percent_change_24h,
            volume_24h: data[key]?.quote?.USD?.volume_24h,
            market_cap:
              data[key]?.self_reported_market_cap === null
                ? data[key]?.quote?.USD?.market_cap
                : data[key]?.self_reported_market_cap,
          }
        })
        setCurrencyDatas(result)
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [coinmarketcapIds])

  useEffect(() => {
    const _tokenList = JSON.parse(localStorage.getItem('coinmarketcapIds')) || SUGGESTED_BASES_ID
    const tokenListNotHaveIds = Object.keys(allTokens)
      .map((key: any) => {
        const token = allTokens[key]
        const { address } = token
        if (token.symbol.toUpperCase() === native.symbol.toUpperCase() || _tokenList[chainId]?.[address]) {
          return undefined
        }
        return token
      })
      .filter((e) => e !== undefined)

    if (process.env.NEXT_PUBLIC_TEST_MODE !== '1' && (chainId === 97 || chainId === 5 || chainId == ChainId.NEO_EVM_TESTNET)) return
    Promise.all(
      tokenListNotHaveIds.map(async (token: any) => {
        console.log('token: ', token);
        
        if (token.chainId == ChainId.NEO_EVM_TESTNET && token.address == "0xce221120F145B456ba41b370F11D5E536eCD2BcB") return
        if (token.chainId == ChainId.NEO_EVM_TESTNET && token.address == "0x3B6dFC89760d5B6F64C043A74210ddF91264Beef") return
        return axios
          .get(`${process.env.NEXT_PUBLIC_API}/coin-market-cap/pro/coins/info`, {
            params: { address: token?.address },
          })
          .then((response) => {
            const tokenInfos = response.data.data
            const tokenInfo = Object.keys(tokenInfos).map((key) => tokenInfos[key])?.[0]
            const res = {}
            res[token.address?.toUpperCase()] = tokenInfo.id
            return res
          })
          .catch(() => {
            return {}
          })
      }),
    ).then((values) => {
      let tokenIds = { ..._tokenList[chainId] }
      values.forEach((value) => {
        tokenIds = { ...tokenIds, ...value }
      })
      setCoinmarketcapIds({ ..._tokenList, [chainId]: tokenIds })
      setFetchingTokenId(true)
    })
  }, [allTokens])

  useEffect(() => {
    if (!coinmarketcapId) {
      if (fetchingTokenId) setUnsupported(true)
      setChardData([])
      return
    }
    setUnsupported(false)

    axios
      .get(`${process.env.NEXT_PUBLIC_API}/coin-market-cap/data-api/v3/cryptocurrency/detail/chart`, {
        params: { id: coinmarketcapId, range: filter },
      })
      .then((result) => {
        // if(result.status.error_code !== 0) return;
        const points = result.data?.data?.points
        if (!points) return
        const pointKeys = Object.keys(points)
        let prevPrice
        const data = pointKeys.map((key) => {
          const res = {
            date: key,
            priceUSD: points[key]?.v?.[0],
            priceChange: prevPrice ? formatAmountNumber(((points[key]?.v?.[0] - prevPrice) * 100) / prevPrice, 2) : 0,
            VolUSD: points[key]?.v?.[1],
          }
          prevPrice = points[key]?.v?.[0]
          return res
        })
        setChardData(data)
      })
      .catch((err) => {
        console.warn(err)
        setChardData([])
      })
  }, [filter, coinmarketcapId])

  useEffect(() => {
    if (!coinmarketcapIds || Object.keys(coinmarketcapIds).length === 0) return
    localStorage.removeItem('coinmarketcapIds')
    localStorage.setItem('coinmarketcapIds', JSON.stringify(coinmarketcapIds))
    loadChartData()
  }, [coinmarketcapIds, coinmarketcapId])

  useEffect(() => {
    const id = setInterval(loadChartData, 10000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(id)
  }, [currencyDatas])

  return (
    <PageOverViewStyled>
      <FullContentInside>
        <div className="content">
          <InfoNav
            textContentBanner={
              <>
                {t('One Dapp.')} {isMobile && <br />}
                {t('Unlimited possibilities')}
              </>
            }
            hasPadding={false}
            titleBtn1="XOX"
          />
          <PageContainer>
            <div>
              <ChartCardsContainer>
                <div className="corner1"></div>
                <div className="edge1"></div>
                <div className="corner2"></div>
                <div className="edge2"></div>
                <HoverableChart
                  chartData={chartData}
                  dataChartXOX={dataChartXOX}
                  valueProperty="priceUSD"
                  ChartComponent={LineChart}
                  filter={filter}
                  setFilter={setFilter}
                  currencyDatas={currencyDatas}
                  setCoinmarketcapId={setCoinmarketcapId}
                  chainId={chainId}
                  native={native}
                  defaultToken={chainId === ChainId.NEO_EVM_TESTNET ? native : xoxToken}
                  allTokens={allTokens}
                  fetchingTokenId={fetchingTokenId}
                  setFetchingTokenId={setFetchingTokenId}
                  unsupported={unsupported}
                />
              </ChartCardsContainer>
              <WalletInfoTable currencyDatas={currencyDatas} native={native} allTokens={allTokens} />
            </div>
            <div style={{ marginBottom: '6px' }}>
              <TransactionTable />
            </div>
          </PageContainer>
        </div>
      </FullContentInside>
    </PageOverViewStyled>
  )
}

export default Overview
