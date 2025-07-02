import { CHAIN_IDS } from 'utils/wagmi'
import BridgeToken from '../../views/BridgeToken'
import { SwapFeaturesProvider } from '../../views/Swap/SwapFeaturesContext'
import DeploymentComing from 'components/DeploymentComing'
import DeploymentComing2 from 'components/DeploymentComing2'

const BridgeTokenPage = () => {
  return (
    <>
      <SwapFeaturesProvider>
        <DeploymentComing />
        <DeploymentComing2 />
        <BridgeToken />
      </SwapFeaturesProvider>
    </>
  )
}

BridgeTokenPage.chains = CHAIN_IDS

export default BridgeTokenPage
