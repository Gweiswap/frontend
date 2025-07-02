import axios from 'axios'
import { ChainId } from '@pancakeswap/sdk'

export const fetchBridgeTokenFee = async (chainId: ChainId, amount: string) => {
  try {
    return await axios.get('/swap-fee', {
      baseURL: process.env.NEXT_PUBLIC_API_BRIDGE_TOKEN,
      params: {
        chainId,
        amount,
      },
    })
  } catch (e) {
    return null
  }
}
