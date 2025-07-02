import { useCurrency } from 'hooks/Tokens'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch } from 'state'
import { resetMintState } from 'state/mint/actions'
import { CHAIN_IDS } from 'utils/wagmi'
import AddLiquidity from 'views/AddLiquidity'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
import useNativeCurrency from 'hooks/useNativeCurrency'
import Liquidity from 'views/Pool'
import DeploymentComing from 'components/DeploymentComing'
import DeploymentComing2 from 'components/DeploymentComing2'

const AddLiquidityPage = () => {
  const router = useRouter()
  const { chainId } = useActiveChainId()
  const dispatch = useAppDispatch()

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

  useEffect(() => {
    if (!currencyIdA && !currencyIdB) {
      dispatch(resetMintState())
    }
  }, [dispatch, currencyIdA, currencyIdB])

  return currencyIdA === undefined && currencyIdB === undefined ? (
    <>
      <DeploymentComing />
      <DeploymentComing2 />
      <Liquidity stateAdd />
    </>
  ) : (
    <>
      <DeploymentComing />
      <DeploymentComing2 />
      <AddLiquidity currencyA={currencyA} currencyB={currencyB} />
    </>
  )
}

AddLiquidityPage.chains = CHAIN_IDS

export default AddLiquidityPage

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40}|BNB)-(0x[a-fA-F0-9]{40}|BNB)$/

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { currency: [] } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { currency = [] } = params
  const [currencyIdA, currencyIdB] = currency
  const match = currencyIdA?.match(OLD_PATH_STRUCTURE)

  if (match?.length) {
    return {
      redirect: {
        statusCode: 301,
        destination: `/add/${match[1]}/${match[2]}`,
      },
    }
  }

  if (currencyIdA && currencyIdB && currencyIdA.toLowerCase() === currencyIdB.toLowerCase()) {
    return {
      redirect: {
        statusCode: 303,
        destination: `/add/${currencyIdA}`,
      },
    }
  }

  return {
    props: {},
  }
}
