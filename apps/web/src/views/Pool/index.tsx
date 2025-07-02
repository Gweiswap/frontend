/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, CardFooter, Button, AddIcon, useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useLPTokensWithBalanceByAccount } from 'views/Swap/StableSwap/hooks/useStableConfig'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { unwrappedToken } from 'utils/wrappedCurrency'
import { Token } from '@pancakeswap/sdk'
import LiquidityBackgroundMobile from 'components/Svg/LiquidityBackgroundMobile'
import LiquidityMainBackgroundBorderDesktop from 'components/Svg/LiquidityMainBackgroundBorderDesktop'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { AppHeader } from 'components/App'
import { formatAmountNumber } from '@pancakeswap/utils/formatBalance'
import { useDerivedMintInfo } from 'state/mint/hooks'
import useSWR from 'swr'
import { useCurrency } from 'hooks/Tokens'
import { CurrencyLogo } from 'components/Logo'
import { GridLoader } from 'react-spinners'
import { ColumnCenter } from 'components/Layout/Column'
import Page from '../Page'
import FullPositionCard, { StableFullPositionCard } from '../../components/PositionCard'
import { useCurrencyBalances, useTokenBalance, useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePair, usePairs, PairState, usePairXOX } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'

import CurrencySelectButton from './CurrencySelectButton'
import LiquidityBackgroundDesktop from 'components/Svg/LiquidityBackgroundDesktop'
import LiquidityMainBackgroundDesktop from 'components/Svg/LiquidityMainBackgroundDesktop'
import LiquidityMainBackgroundBorderMobile from 'components/Svg/LiquidityMainBackgroundBorderMobile'

const ConnectWalletButtonWrapper = styled(ConnectWalletButton)`
  width: 100%;
  height: 37px;
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 43px;
    font-size: 18px;
  }
`

const SwapbackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  height: 300px;
  overflow: hidden;
`
const BackgroundWrapper = styled.div`
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100% - 35px);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  @media (max-width: 576px) {
    width: 98.5%;
    height: calc(100% - 25px);
    top: 25px;
  }
`
const SwapBackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 100%;
`
const BackgroundWrapperMoblie = styled.div`
  position: absolute;
  top: 225px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100% - 225px);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
`

const MainBackground = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  svg {
    width: 100vw;
    height: auto;
    object-fit: cover;
  }
`

const Wrapper = styled(Flex)`
  width: 100%;
  height: fit-content;
  z-index: 0;
  align-items: center;
  justify-content: center;
  margin: 150px 0 100px;
`

const Body = styled.div`
  padding-top: 24px;
`

const ButtonWrapper = styled(Button)`
  height: 37px;
  width: 100%;
  border-radius: 6px;
  font-size: 16px;
  /* font-size: 18px; */

  ${({ theme }) => theme.mediaQueries.md} {
    height: 43px;
    font-size: 18px;
  }
`

const StyledCardFooter = styled(CardFooter)`
  border-top: none !important;
  padding: 24px 0 31.5px 0;
`

const StyledLiquidityContainer = styled.div`
  flex-shrink: 0;
  height: fit-content;
  // position: absolute;
  // top: 56px;
  // left: 0px;
  margin-top: 10px;
  z-index: 9;
  padding: 0 20px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 560px;
    padding: 0 28px;
  }
`

const Title = styled.div`
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255);
    margin-bottom: 16px;
  }

  span {
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #444444;

  .title {
    font-weight: 700;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 8px;
  }

  .sub_title {
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }
`

interface I {
  height?: number
}

const Background = styled.div<I>`
  position: absolute;
  top: 56px;
  left: 2px;
  padding: 0 20px;
  width: 556px;
  // height: 500px;

  height: ${({ height }) => `${height}px;`};
  z-index: -1;
  background: #242424;
`
const ConnectSub = styled(Text)`
  margin-top: 24px;
  font-size: 12px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.38);
  text-align: left;
  ${({ theme }) => theme.mediaQueries.md} {
    text-align: center;
    font-size: 16px;
  }
`

const PoolWrapper = styled(Flex)`
  .pair-icon,
  .pair-balance {
    display: grid;
    grid-template-columns: 1fr 57px 1fr;
  }

  .pair-icon {
    margin-top: 24px;
    margin-bottom: 8px;
  }

  @media (max-width: 560px) {
    .text-elipsis {
      width: 80px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: right;
    }
    .pair-icon,
    .pair-balance {
      display: grid;
      grid-template-columns: 1fr 30px 1fr;
    }
  }
`

const WapperHeight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* min-height: 820px; */
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 14px 0 34px 0;
  height: 300px;
  display: grid;
  place-content: center;
`

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Pool({ stateAdd }: { stateAdd?: boolean }) {
  const { address: account } = useAccount()
  const { isMobile } = useMatchBreakpoints()
  const native = useNativeCurrency()
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const currencyA = useCurrency(USD_ADDRESS[chainId])
  const currencyB = useCurrency(XOX_ADDRESS[chainId])
  const USDId = chainId === 1 || chainId === 5 ? 3408 : 4687
  const { price } = useDerivedMintInfo(currencyA, currencyB)
  const [pairXOX] = usePairXOX()
  const pairNative = usePair(native, useCurrency(XOX_ADDRESS[chainId]))
  const userTokenBalanceUSDXOX = useTokenBalance(account, pairXOX[1]?.liquidityToken)
  const userTokenBalanceNativeXOX = useTokenBalance(account, pairNative[1]?.liquidityToken)
  const [selectedCurrency, setSelectedCurrency] = useState(currencyA)
  const balances = useCurrencyBalances(
    account ?? undefined,
    useMemo(() => [selectedCurrency, currencyB], [selectedCurrency, currencyB]),
  )

  const { data: USDPrice } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/coin-market-cap/pro/coins/price?id=${USDId}`,
    fetcher,
  )

  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )

  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  const stablePairs = useLPTokensWithBalanceByAccount(account)

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken, tokens }) => {
        return (
          v2PairsBalances[liquidityToken.address]?.greaterThan('0') &&
          ((unwrappedToken(tokens[0]).isNative && tokens[1].address === XOX_ADDRESS[chainId]) ||
            (tokens[0].address === XOX_ADDRESS[chainId] && unwrappedToken(tokens[1]).isNative))
        )
      }),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )
  liquidityTokensWithBalances.map(({ tokens }) => tokens)

  const v2Pairs = [...usePairXOX(), ...usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))]

  const v2IsLoading =
    fetchingV2PairBalances ||
    v2Pairs?.length < liquidityTokensWithBalances.length ||
    (v2Pairs?.length && v2Pairs.every(([pairState]) => pairState === PairState.LOADING))
  const allV2PairsWithLiquidity = v2Pairs
    ?.filter(([pairState, pair]) => {
      return (
        pairState === PairState.EXISTS &&
        Boolean(pair) &&
        (((unwrappedToken(pair.token0).isNative || unwrappedToken(pair.token1).isNative) &&
          userTokenBalanceNativeXOX?.greaterThan('0')) ||
          ((pair.token0.address === USD_ADDRESS[chainId] || pair.token1.address === USD_ADDRESS[chainId]) &&
            userTokenBalanceUSDXOX?.greaterThan('0')))
      )
    })
    .map(([, pair]) => pair)

  useEffect(() => {
    setSelectedCurrency(currencyA)
  }, [currencyA])

  const renderBody = () => {
    if (!account) {
      return (
        <>
          <Title>
            <div className="flex">
              <Text
                color="rgba(255, 255, 255, 0.87)"
                fontSize={['14px', , '18px']}
                fontWeight={400}
                lineHeight={['17px', , '22px']}
              >
                {t('Your Liquidity')}
              </Text>
            </div>
            <ConnectSub
              color="rgba(255, 255, 255, 0.87)"
              fontSize={['12px', , '16px']}
              fontWeight={400}
              lineHeight={['14px', , '19px']}
            >
              {t('Connect to a wallet to view your liquidity.')}
            </ConnectSub>
          </Title>
        </>
      )
    }

    let positionCards = []

    if (allV2PairsWithLiquidity?.length > 0 && !stateAdd) {
      positionCards = allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={Boolean(stablePairs?.length) || index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }

    if (stablePairs?.length > 0 && !stateAdd) {
      positionCards = [
        ...positionCards,
        ...stablePairs?.map((stablePair, index) => (
          <StableFullPositionCard
            key={`stable-${stablePair.liquidityToken.address}`}
            pair={stablePair}
            mb={index < stablePairs.length - 1 ? '16px' : 0}
          />
        )),
      ]
    }

    if (positionCards?.length > 0 && !stateAdd) {
      return (
        <>
          <Title>
            <div className="flex">
              <Text
                color="rgba(255, 255, 255, 0.87)"
                fontSize={['14px', , '18px']}
                fontWeight={400}
                lineHeight={['17px', , '22px']}
              >
                {t('Your Liquidity')}
              </Text>
            </div>
          </Title>
          {positionCards}
        </>
      )
    }

    return (
      <PoolWrapper flexDirection="column">
        <Text
          fontWeight="400"
          fontSize={['14px', , '18px']}
          lineHeight={['17px', , '22px']}
          color="rgba(255, 255, 255, 0.87)"
        >
          {t('Pool')}
        </Text>
        <div className="pair-icon">
          <Flex
            flexDirection="row"
            alignItems="center"
            px="16px"
            py="12px"
            border="1px solid #444444"
            borderRadius="8px"
          >
            <CurrencyLogo currency={new Token(chainId, XOX_ADDRESS[chainId], 18, '')} />
            <Text
              fontWeight="400"
              fontSize={['16px', , '18px']}
              lineHeight={['19px', , '22px']}
              color="rgba(255, 255, 255, 0.87)"
              ml="8px"
            >
              XOX
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <AddIcon />
          </Flex>
          <CurrencySelectButton selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
        </div>
        <div className="pair-balance">
          <Flex flexDirection="row" justifyContent="space-between">
            <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="rgba(255, 255, 255, 0.6)">
              {t('Balance')}
            </Text>
            <Flex flexDirection="column" alignItems="flex-end">
              <Text
                fontWeight="400"
                fontSize="12px"
                lineHeight="15px"
                color="rgba(255, 255, 255, 0.87)"
                className="text-elipsis"
              >
                {formatAmountNumber(parseFloat(balances[1]?.toFixed()), 6) || 0}
              </Text>
              <Text
                fontWeight="400"
                fontSize="12px"
                lineHeight="15px"
                color="rgba(255, 255, 255, 0.6)"
                mt="8px"
                className="text-elipsis"
              >
                ~$
                {price && balances[1]
                  ? `${formatAmountNumber(
                      parseFloat(balances[1]?.toFixed(6)) *
                        parseFloat(price.invert().toFixed(6)) *
                        parseFloat(USDPrice?.data?.[USDId]?.quote?.USD?.price || 1),
                      2,
                    )}`
                  : '0'}
              </Text>
            </Flex>
          </Flex>
          <div />
          <Flex flexDirection="row" justifyContent="space-between">
            <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="rgba(255, 255, 255, 0.6)">
              {t('Balance')}
            </Text>
            <Flex flexDirection="column" alignItems="flex-end">
              <Text
                fontWeight="400"
                fontSize="12px"
                lineHeight="15px"
                color="rgba(255, 255, 255, 0.87)"
                className="text-elipsis"
              >
                {formatAmountNumber(parseFloat(balances[0]?.toFixed()), 6) || 0}
              </Text>
              <Text
                fontWeight="400"
                fontSize="12px"
                lineHeight="15px"
                color="rgba(255, 255, 255, 0.6)"
                mt="8px"
                className="text-elipsis"
              >
                ~$
                {balances[0]
                  ? formatAmountNumber(
                      parseFloat(balances[0]?.toFixed(6)) * parseFloat(USDPrice?.data?.[USDId]?.quote?.USD?.price || 1),
                      2,
                    )
                  : 0}
              </Text>
            </Flex>
          </Flex>
        </div>
        <Flex flexDirection="row" justifyContent="space-between" mt="24px">
          <Text
            fontWeight="400"
            fontSize={['14px', , '16px']}
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
          >
            {t('LP reward APR')}
          </Text>
          <Text
            fontWeight="700"
            fontSize={['14px', , '16px']}
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
          >
            {chainId === 1 || chainId === 5 ? 1.3 : 1.25}%
          </Text>
        </Flex>
      </PoolWrapper>
    )
  }

  return (
    <Page>
      <WapperHeight>
        <Flex width={['328px', , '559px']}>
          <Wrapper flex="column" position="relative">
            {isMobile ? (
              <>
                <SwapBackgroundWrapper>
                  <LiquidityBackgroundMobile />
                </SwapBackgroundWrapper>
                <SwapBackgroundWrapper>
                  <LiquidityMainBackgroundBorderMobile />
                </SwapBackgroundWrapper>
              </>
            ) : (
              <>
                <SwapBackgroundWrapper>
                  <LiquidityMainBackgroundDesktop />
                </SwapBackgroundWrapper>
                <SwapBackgroundWrapper>
                  <LiquidityMainBackgroundBorderDesktop />
                </SwapBackgroundWrapper>
              </>
            )}
            <BackgroundWrapper />

            <StyledLiquidityContainer>
              <AppHeader
                title={t('Liquidity')}
                subtitle={t('Receive LP tokens and earn %number%% trading fees', {
                  number: chainId === 5 || chainId === 1 ? 0.3 : 0.25,
                })}
                helper={t(
                  `Liquidity providers earn a %number%% trading fee on all trades made for that token pair, proportional to their share of the liquidity pool.`,
                  { number: chainId === 5 || chainId === 1 ? 0.3 : 0.25 },
                )}
                backTo={stateAdd ? '/liquidity' : undefined}
              />

              {v2IsLoading ? (
                <ConfirmedIcon>
                  <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
                </ConfirmedIcon>
              ) : (
                <>
                  <Body>{renderBody()}</Body>
                  <StyledCardFooter style={{ textAlign: 'center' }}>
                    {account ? (
                      <Link
                        // href="javascript:void(0)"
                        href={
                          allV2PairsWithLiquidity.length > 0 && !stateAdd
                            ? '/add'
                            : `/add/${XOX_ADDRESS[chainId]}/${
                                selectedCurrency?.isNative ? native.symbol : selectedCurrency?.wrapped?.address
                              }`
                        }
                        passHref
                      >
                        <ButtonWrapper id="join-pool-button" width="100%">
                          {t('Add Liquidity')}
                        </ButtonWrapper>
                      </Link>
                    ) : (
                      <ConnectWalletButtonWrapper />
                    )}
                  </StyledCardFooter>
                </>
              )}
            </StyledLiquidityContainer>
          </Wrapper>
        </Flex>
      </WapperHeight>
    </Page>
  )
}
