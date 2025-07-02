import DeploymentComing from 'components/DeploymentComing'
import DeploymentComing2 from 'components/DeploymentComing2'
import { PageMeta } from 'components/Layout/Page'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
import { useCurrency } from 'hooks/Tokens'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { CHAIN_IDS } from 'utils/wagmi'
import RemoveLiquidity from 'views/RemoveLiquidity'
import RemoveStableLiquidity from 'views/RemoveLiquidity/RemoveStableLiquidity'
import useStableConfig, { StableConfigContext } from 'views/Swap/StableSwap/hooks/useStableConfig'

const RemoveLiquidityPage = () => {
  const router = useRouter()
  const { chainId } = useActiveChainId()
  const native = useNativeCurrency()

  const [currencyIdA, currencyIdB] = router.query.currency || [undefined, undefined]

  const currencyA = useCurrency(
    currencyIdA === XOX_ADDRESS[chainId] || currencyIdA?.toUpperCase() === native.symbol.toUpperCase()
      ? currencyIdA
      : USD_ADDRESS[chainId],
  )
  const currencyB = useCurrency(
    currencyIdA === XOX_ADDRESS[chainId]
      ? currencyIdB?.toUpperCase() === native.symbol.toUpperCase()
        ? currencyIdB
        : USD_ADDRESS[chainId]
      : XOX_ADDRESS[chainId],
  )

  const stableConfig = useStableConfig({
    tokenA: currencyA,
    tokenB: currencyB,
  })

  const props = {
    currencyIdA,
    currencyIdB,
    currencyA,
    currencyB,
  }

  return stableConfig.stableSwapConfig && router.query.stable === '1' ? (
    <>
      <DeploymentComing />
      <DeploymentComing2 />
      <StableConfigContext.Provider value={stableConfig}>
        <RemoveStableLiquidity {...props} />
      </StableConfigContext.Provider>
    </>
  ) : (
    <>
      <DeploymentComing />
      <DeploymentComing2 />
      <RemoveLiquidity {...props} />
    </>
  )
}

RemoveLiquidityPage.chains = CHAIN_IDS

export default RemoveLiquidityPage

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40})-(0x[a-fA-F0-9]{40})$/

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currency = (params.currency as string[]) || []

  if (currency.length === 0) {
    return {
      redirect: {
        statusCode: 307,
        destination: '/liquidity',
      },
    }
  }

  if (currency.length === 1) {
    if (!OLD_PATH_STRUCTURE.test(currency[0])) {
      return {
        redirect: {
          statusCode: 307,
          destination: `/pool`,
        },
      }
    }

    const split = currency[0].split('-')
    if (split.length > 1) {
      const [currency0, currency1] = split
      return {
        redirect: {
          statusCode: 307,
          destination: `/remove/${currency0}/${currency1}`,
        },
      }
    }
  }

  return {
    props: {},
  }
}
