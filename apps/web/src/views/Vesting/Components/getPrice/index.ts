import { ethers } from 'ethers'
import aggregatorV3InterfaceABI from './abi/aggregatorV3InterfaceABI.json'

export const getPriceUsdPerToken = async () => {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli')
  const priceFeed = new ethers.Contract(
    '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
    aggregatorV3InterfaceABI,
    provider,
  )
  try {
    const roundData = await priceFeed.latestRoundData()
    const decimals = await priceFeed.decimals()

    if (decimals) {
      return [roundData, decimals]
    }
    return [null, null]
  } catch (error) {
    return [null, error]
  }
}
