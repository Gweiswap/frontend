import { CHAIN_IDS } from 'utils/wagmi'
import Swap from '../views/Swap'
import { SwapFeaturesProvider } from '../views/Swap/SwapFeaturesContext'
import DeploymentComing from 'components/DeploymentComing'
import DeploymentComing2 from 'components/DeploymentComing2'

const SwapPage = () => {
  return (
    <>
      <SwapFeaturesProvider>
        <DeploymentComing />
        <DeploymentComing2 />
        <Swap />
      </SwapFeaturesProvider>
    </>
  )
}

SwapPage.chains = CHAIN_IDS

export default SwapPage
