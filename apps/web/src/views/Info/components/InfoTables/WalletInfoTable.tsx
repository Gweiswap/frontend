// TODO PCS refactor ternaries
/* eslint-disable no-nested-ternary */
// import { useTranslation } from '@pancakeswap/localization'
// import { ChainId } from '@pancakeswap/sdk'
import { useAccount, useProvider, useNetwork } from 'wagmi'
// import { fetchBalance } from '@wagmi/core'
// import truncateHash from '@pancakeswap/utils/truncateHash'
import { Flex, Text, CopyButton } from '@pancakeswap/uikit'
// import { ITEMS_PER_INFO_TABLE_PAGE } from 'config/constants/info'
// import { formatDistanceToNowStrict } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
// import { useGetChainName } from 'state/info/hooks'
// import { Transaction, TransactionType } from 'state/info/types'
import styled from 'styled-components'
// import { getBlockExploreLink } from 'utils'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { formatAmountNumber, formatAmountNumber2, formatBigNumber } from '@pancakeswap/utils/formatBalance'
// import { formatAmountNumber } from 'utils/formatInfoNumbers'
// import { defaultTokens } from './config'
import { getBalancesForEthereumAddress } from 'ethereum-erc20-token-balances-multicall'
import { getDefaultProvider } from '@ethersproject/providers'
import { CurrencyLogo } from 'components/Logo'
import { ChainId, ERC20Token, PAIR_XOX_BUSD } from '@pancakeswap/sdk'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { USD_ADDRESS, USD_DECIMALS, XOX_ADDRESS } from 'config/constants/exchange'
import { useERC20 } from 'hooks/useContract'
import InfoPieChart from '../InfoCharts/PieChart'
import { useTranslation } from '@pancakeswap/localization'
import { parseUnits } from '@ethersproject/units'
import BigNumber from 'bignumber.js'

const Wrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  position: relative;

  & .heading {
    position: relative;
  }

  & .heading:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 4px;
    background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
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
    width: 454px;
    min-width: 454px;
    margin-left: 24px;
    margin-top: 0;

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

const CoinListWrapper = styled(Flex)`
  max-height: 146px;
  overflow: auto;
  padding-right: 6px;
  width: calc(100% + 12px);

  ${({ theme }) => theme.mediaQueries.md} {
    padding-right: 9px;
    width: calc(100% + 15px);
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444444;
    transform: matrix(0, -1, -1, 0, 0, 0);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 10px;
  }
`

const ConnectButton = styled(ConnectWalletButton)`
  width: 124px;
  height: 37px;
  border-radius: 8px;
  padding: 1px;
  border: none;
  margin: 32px auto 0;
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    -webkit-mask-composite: exclude;
    -webkit-mask-composite: exclude;
    mask-composite: exclude;
  }

  & > div {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: transparent;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & > span {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    & > svg {
      margin-right: 10px;
    }
  }
`

const Address = styled.div`
  position: relative;

  & > input {
    background: transparent;
    border: 0;
    color: rgba(255, 255, 255, 0.87);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    display: block;
    padding: 0;
    width: 130px;

    &:focus {
      outline: 0;
    }
  }

  &:after {
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.background}00,
      ${({ theme }) => theme.colors.background}E6
    );
    content: '';
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
  }
`

const TableWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 16px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  height: 100%;
  width: 100%;
  padding: 18px;
  min-height: 454px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
    min-height: unset;
    padding: 24px;
  }
`

const TransactionTable: React.FC<React.PropsWithChildren<any>> = ({ currencyDatas, native, allTokens, className }) => {
  const [tokensBalance, setTokensBalance] = useState<any>([])
  const { t } = useTranslation()

  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const { chain } = useNetwork()
  const provider = useProvider({ chainId })
  const [balanceNative, setBalanceNative] = useState<any>()
  const [dataChart, setDataChart] = useState<any>([])
  const [totalAsset, setTotalAsset] = useState<number>(0)
  const [rateXOX, setRateXOX] = useState(0)
  const contractUSD = useERC20(USD_ADDRESS[chainId])
  const contractXOX = useERC20(XOX_ADDRESS[chainId])
  const [colors, setColors] = useState<any[]>([])

  const tokenRateUSD = useCallback(
    (symbol: string): number => {
      if (!currencyDatas) return 0
      if (symbol === native.symbol && chainId === 5) {
        const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === 'ETH')
        return currencyData?.price || 0
      }
      if (symbol === native.symbol && chainId === 97) {
        const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === 'BNB')
        return currencyData?.price || 0
      }
      const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === symbol.toUpperCase())
      if (!currencyData) return 0
      return currencyData.price
    },
    [currencyDatas, chainId],
  )

  const tokenRateXOX = useCallback(
    (symbol: string) => {
      if (!currencyDatas || rateXOX === 0) return 0
      if (symbol === native.symbol && chainId === 5) {
        const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === 'ETH')
        return (currencyData?.price || 0) / rateXOX
      }
      if (symbol === native.symbol && chainId === 97) {
        const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === 'BNB')
        return (currencyData?.price || 0) / rateXOX
      }
      const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === symbol.toUpperCase())
      if (!currencyData) return 0
      return currencyData.price / rateXOX
    },
    [currencyDatas, rateXOX, chainId],
  )

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

  const getToken = useCallback(
    (token: any) => {
      return new ERC20Token(chainId, token.contractAddress, token.decimals, token.symbol)
    },
    [chainId],
  )

  useEffect(() => {
    getXOXPrice()
    const id = setInterval(getXOXPrice, 10000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(id)
  }, [chainId])

  useEffect(() => {
    if (!account || !chain || allTokens.length === 0) return

    const currentProvider = chain.id === 1 || chain.id === 5 ? getDefaultProvider(chain.network) : provider
    currentProvider
      .getBalance(account)
      .then((balance) => {
        setBalanceNative(balance)
      })
      .catch((error) => {
        console.warn(error)
      })

    const getBalances = async () => {
      const currentProvider = chain.id === 1 || chain.id === 5 ? getDefaultProvider(chain.network) : provider
      let fetchedBalances
      let fetchCount = 0

      if (chainId === ChainId.NEO_EVM_TESTNET) {
        const res = []
        await contractUSD?.balanceOf(account).then((response) => {
          const usdcToken = Object.keys(allTokens)
            .map((key) => key === USD_ADDRESS[ChainId.NEO_EVM_TESTNET] && allTokens[key])
            .filter((x) => !!x)?.[0]
          if (!!usdcToken) {
            res.push({
              contractAddress: USD_ADDRESS[ChainId.NEO_EVM_TESTNET],
              ...usdcToken,
              balance: new BigNumber(response.toString()).div(10**6).toFixed(2)
            })
          }
        }).catch(e => console.log(e))
        await contractXOX?.balanceOf(account).then((response) => {
          const xoxToken = Object.keys(allTokens)
            .map((key) => key === XOX_ADDRESS[ChainId.NEO_EVM_TESTNET] && allTokens[key])
            .filter((x) => !!x)?.[0]
          if (!!xoxToken) {
            res.push({
              contractAddress: XOX_ADDRESS[ChainId.NEO_EVM_TESTNET],
              ...xoxToken,
              balance: new BigNumber(response.toString()).div(10**18).toFixed(2)
            })
          }
        }).catch(e => console.log(e))

        setTokensBalance(res)
        return
      }

      while (!fetchedBalances && fetchCount < 5) {
        fetchCount++
        fetchedBalances = await getBalancesForEthereumAddress({
          // erc20 tokens you want to query!
          contractAddresses: Object.keys(allTokens),
          // ethereum address of the user you want to get the balances for
          ethereumAddress: account,
          // your ethers provider
          providerOptions: {
            ethersProvider: currentProvider,
          },
        }).catch((error) => {
          console.log(error)
          return undefined
        })
        if (fetchedBalances) setTokensBalance(fetchedBalances.tokens)
      }
    }

    getBalances()
  }, [account, chain, allTokens, contractUSD, contractXOX])

  useEffect(() => {
    let total = 0
    const nativeBalance = balanceNative
      ? formatAmountNumber(parseFloat(formatBigNumber(balanceNative)) * tokenRateUSD(native.symbol))
      : 0
    const balanceXOX = tokensBalance.find(
      (token: any) => token.contractAddress.toLowerCase() === XOX_ADDRESS[chainId]?.toLowerCase(),
    )
    const xoxBalance = (balanceXOX ? formatAmountNumber(balanceXOX.balance * rateXOX) : 0) || 0
    const result = [
      { name: native.symbol, value: nativeBalance },
      { name: 'XOX', value: xoxBalance },
    ]
    let sum = 0
    tokensBalance.forEach((balance: any) => {
      if (balance.contractAddress.toLowerCase() === USD_ADDRESS[chainId]?.toLowerCase()) {
        const balanceUSD = formatAmountNumber(balance.balance * tokenRateUSD(balance.symbol))
        result.push({ name: balance.symbol, value: balanceUSD })
      } else if (balance.contractAddress.toLowerCase() !== XOX_ADDRESS[chainId]?.toLowerCase()) {
        sum += formatAmountNumber(balance.balance * tokenRateUSD(balance.symbol))
      }
    })
    setColors([
      { start: '#2A56D9', end: '#66B5F8' },
      { start: '#791CE7', end: '#BD2AE8' },
      { start: '#C2785B', end: '#C39B5F' },
      { start: '#B02E79', end: '#C043BB' },
    ])
    result.push({
      name: t('Others'),
      value: sum,
    })
    total = nativeBalance + xoxBalance + result[2].value + sum
    setTotalAsset(total)
    setDataChart(
      result.map((d) => {
        return {
          name: d.name,
          value: Number(((d.value * 100) / total).toFixed(2)),
        }
      }),
    )
  }, [balanceNative, tokensBalance, chainId, currencyDatas, rateXOX])

  return (
    <Wrapper className={className}>
      <div className="corner1"></div>
      <div className="edge1"></div>
      <div className="corner2"></div>
      <div className="edge2"></div>
      <TableWrapper>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Text
            fontSize={['16px', , '20px']}
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight={['19px', , '24px']}
            color="rgba(255, 255, 255, 0.87)"
            className="heading"
          >
            {t('Token Asset')}
          </Text>
          {account && (
            <Flex>
              <Address title={account}>
                <input
                  type="text"
                  readOnly
                  value={`${account.substring(0, 8)}...${account.substring(account.length - 4)}`}
                />
              </Address>
              <Flex>
                <CopyButton
                  width="24px"
                  text={account}
                  tooltipMessage={t('Copied')}
                  button={
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                      <path
                        d="M14.3432 12.7188V3.15625H4.78027"
                        stroke="url(#paint0_linear_10957_45072)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.2182 5.28125H2.65527V14.8438H12.2182V5.28125Z"
                        stroke="url(#paint1_linear_10957_45072)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_10957_45072"
                          x1="4.78027"
                          y1="7.93753"
                          x2="14.3432"
                          y2="7.93753"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EE0979" />
                          <stop offset="1" stopColor="#FF6A00" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_10957_45072"
                          x1="2.65527"
                          y1="10.0625"
                          x2="12.2182"
                          y2="10.0625"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EE0979" />
                          <stop offset="1" stopColor="#FF6A00" />
                        </linearGradient>
                      </defs>
                    </svg>
                  }
                />
              </Flex>
            </Flex>
          )}
        </Flex>

        {account ? (
          <Flex flexDirection="column">
            <InfoPieChart data={dataChart} colors={colors} total={totalAsset} />

            <CoinListWrapper flexDirection="column">
              <Flex alignItems="center" p="16px" borderRadius="6px" background="rgba(255, 255, 255, 0.05)" mb="6px">
                <CurrencyLogo currency={native} size="30px" />
                <Flex flexDirection="column" ml="10px">
                  <Flex mb="6px">
                    <Text
                      fontSize="14px"
                      fontFamily="Inter"
                      fontStyle="normal"
                      fontWeight="700"
                      lineHeight="17px"
                      color="rgba(255, 255, 255, 0.87)"
                      marginRight="5px"
                    >
                      {balanceNative ? formatBigNumber(balanceNative, 6) : 0}
                    </Text>
                    <Text
                      fontSize="14px"
                      fontFamily="Inter"
                      fontStyle="normal"
                      fontWeight="700"
                      lineHeight="17px"
                      color="rgba(255, 255, 255, 0.6)"
                    >
                      {native.symbol}
                    </Text>
                  </Flex>
                  {/* <Text color="rgba(255, 255, 255, 0.87)">{formatBigNumber(value, 6)}</Text> */}
                  <Text
                    fontSize="12px"
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="15px"
                    color="rgba(255, 255, 255, 0.6)"
                  >
                    ~$
                    {balanceNative
                      ? formatAmountNumber2(parseFloat(formatBigNumber(balanceNative)) * tokenRateUSD(native.symbol))
                      : 0}{' '}
                    | ~
                    {balanceNative
                      ? formatAmountNumber2(parseFloat(formatBigNumber(balanceNative)) * tokenRateXOX(native.symbol))
                      : 0}{' '}
                    XOX
                  </Text>
                </Flex>
              </Flex>
              {tokensBalance.map((balance, index: number) => {
                return (
                  <Flex
                    key={index}
                    alignItems="center"
                    p="16px"
                    borderRadius="6px"
                    background="rgba(255, 255, 255, 0.05)"
                    mb={index === tokensBalance.length - 1 ? '0' : '6px'}
                  >
                    <CurrencyLogo currency={getToken(balance)} size="30px" />
                    <Flex flexDirection="column" ml="10px">
                      <Flex mb="6px">
                        <Text
                          fontSize="14px"
                          fontFamily="Inter"
                          fontStyle="normal"
                          fontWeight="700"
                          lineHeight="17px"
                          color="rgba(255, 255, 255, 0.87)"
                          marginRight="5px"
                        >
                          {formatAmountNumber2(balance?.balance, 6)}
                        </Text>
                        <Text
                          fontSize="14px"
                          fontFamily="Inter"
                          fontStyle="normal"
                          fontWeight="700"
                          lineHeight="17px"
                          color="rgba(255, 255, 255, 0.6)"
                        >
                          {balance?.symbol}
                        </Text>
                      </Flex>
                      {/* <Text color="rgba(255, 255, 255, 0.87)">{formatBigNumber(value, 6)}</Text> */}
                      <Text
                        fontSize="12px"
                        fontFamily="Inter"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="15px"
                        color="rgba(255, 255, 255, 0.6)"
                      >
                        {/* {tokenRateXOX(balance.symbol)} && 
                        {balance &&
                          (balance.symbol === 'XOX'
                            ? balance?.balance * tokenRateXOX(balance.symbol)
                            : '' */}
                        {balance?.symbol !== 'XOX' ? (
                          <>
                            ~${formatAmountNumber2(balance?.balance * tokenRateUSD(balance.symbol))} | ~
                            {formatAmountNumber2(balance?.balance * tokenRateXOX(balance.symbol))} XOX
                          </>
                        ) : (
                          <>~${formatAmountNumber2(balance?.balance / rateXOX)}</>
                        )}
                      </Text>
                    </Flex>
                  </Flex>
                )
              })}
            </CoinListWrapper>
          </Flex>
        ) : (
          <Flex height="100%" minHeight="350px" flexDirection="column" justifyContent="center" alignItems="center">
            <Text
              fontSize="14px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="17px"
              color="rgba(255, 255, 255)"
              textAlign="center"
            >
              {t('Please connect wallet to view your token balance.')}{' '}
            </Text>
            <ConnectButton>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path
                    d="M15.5834 5.84408V14.3441M6.36874 4.23931L11.2572 1.41699L12.8907 4.24639L6.36874 4.23931ZM1.41675 4.95866C1.41675 4.56745 1.73388 4.25033 2.12508 4.25033H14.8751C15.2663 4.25033 15.5834 4.56745 15.5834 4.95866V14.8753C15.5834 15.2665 15.2663 15.5837 14.8751 15.5837H2.12508C1.73388 15.5837 1.41675 15.2665 1.41675 14.8753V4.95866ZM12.4845 11.6878H15.5834V8.14616H12.4845C11.4575 8.14616 10.6251 8.939 10.6251 9.91699C10.6251 10.895 11.4575 11.6878 12.4845 11.6878Z"
                    stroke="url(#paint0_linear_11003_43805)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_11003_43805"
                      x1="0.294636"
                      y1="1.41699"
                      x2="18.7754"
                      y2="3.13664"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#B809B5" />
                      <stop offset="0.510417" stopColor="#ED1C51" />
                      <stop offset="1" stopColor="#FFB000" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>{t('Connect')}</span>
              </div>
            </ConnectButton>
          </Flex>
        )}
      </TableWrapper>
    </Wrapper>
  )
}

export default TransactionTable
