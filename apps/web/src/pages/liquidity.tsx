import { CHAIN_IDS } from 'utils/wagmi'
import Liquidity from '../views/Pool'
import DeploymentComing from 'components/DeploymentComing'
import DeploymentComing2 from 'components/DeploymentComing2'

const LiquidityPage = () => {
  return (
    <>
      <DeploymentComing />
      <DeploymentComing2 />
      <Liquidity />
    </>
  )
}

LiquidityPage.chains = CHAIN_IDS

export default LiquidityPage
