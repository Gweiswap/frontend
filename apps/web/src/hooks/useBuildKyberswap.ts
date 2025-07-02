import { useCallback, useState } from 'react'
import { KYBERSWAP_NETWORK_CHAIN } from 'views/BridgeToken/networks'
import axios from 'axios'

type Props = {
  fullRoute: any
  slippage: number
  chainId: number
  account: string
}

const useBuildKyberswap = ({ fullRoute, slippage, chainId, account }: Props) => {
  const [data, setData] = useState('')

  const buildSwap = useCallback(() => {
    setData('')
    axios
      .post(
        `https://aggregator-api.kyberswap.com/${KYBERSWAP_NETWORK_CHAIN[chainId]}/api/v1/route/build`,
        {
          ...fullRoute,
          slippageTolerance: slippage,
          sender: account,
          recipient: account,
          source: 'xoxlabs',
        },
        {
          headers: { 'x-client-id': 'xoxlabs' },
        },
      )
      .then(async (response) => {
        setData(response.data.data.data)
      })
      .catch((error) => setData(''))
  }, [fullRoute, slippage, chainId, account])

  return {
    buildSwap,
    data,
  }
}

export default useBuildKyberswap
