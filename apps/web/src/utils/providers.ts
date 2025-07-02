import { StaticJsonRpcProvider } from '@ethersproject/providers'

export const BSC_PROD_NODE = process.env.NEXT_PUBLIC_NODE_PRODUCTION || 'https://bsc.nodereal.io'

export const bscRpcProvider = new StaticJsonRpcProvider(BSC_PROD_NODE)

export const neoRpcProvider =  new StaticJsonRpcProvider('https://evm.ngd.network:32331')

export default null
