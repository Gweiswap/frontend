import {
  Cake,
  CakeFlexibleSideVaultV2,
  CakeVaultV2,
  Erc20,
  Erc20Bytes32,
  Erc721collection,
  Multicall,
  Weth,
  Zap,
} from 'config/abi/types'
import zapAbi from 'config/abi/zap.json'
import { useProviderOrSigner, useProviderOrSignerPresale } from 'hooks/useProviderOrSigner'
import { useMemo } from 'react'
import {
  getMulticallAddress,
  getPredictionsV1Address,
  getZapAddress,
  getBridgeTokenAddress,
} from 'utils/addressHelpers'
import {
  getAnniversaryAchievementContract,
  getBCakeFarmBoosterContract,
  getBCakeFarmBoosterProxyFactoryContract,
  getBCakeProxyContract,
  getBep20Contract,
  getBunnyFactoryContract,
  getBunnySpecialCakeVaultContract,
  getBunnySpecialContract,
  getBunnySpecialLotteryContract,
  getBunnySpecialPredictionContract,
  getBunnySpecialXmasContract,
  getCakeContract,
  getCakeFlexibleSideVaultV2Contract,
  getCakePredictionsContract,
  getCakeVaultV2Contract,
  getChainlinkOracleContract,
  getClaimRefundContract,
  getEasterNftContract,
  getErc721CollectionContract,
  getErc721Contract,
  getFarmAuctionContract,
  getIfoV1Contract,
  getIfoV2Contract,
  getIfoV3Contract,
  getLotteryV2Contract,
  getMasterchefContract,
  getMasterchefV1Contract,
  getNftMarketContract,
  getNftSaleContract,
  getPancakeBunniesContract,
  getPancakeSquadContract,
  getPointCenterIfoContract,
  getPotteryDrawContract,
  getPotteryVaultContract,
  getPredictionsContract,
  getPredictionsV1Contract,
  getProfileContract,
  getSouschefContract,
  getTradingCompetitionContractEaster,
  getTradingCompetitionContractFanToken,
  getTradingCompetitionContractMobox,
  getTradingCompetitionContractMoD,
  getNonBscVaultContract,
  getCrossFarmingProxyContract,
  getIfoCreditAddressContract,
  getTreasuryConTract,
  getContractXOXToken,
  getContractXOXPool,
  getContractXOXTokenBridge,
  getContractFarmingLP,
  getContractPreSale,
  getContractXOXSecondPool,
} from 'utils/contractHelpers'

import { useAccount, useProvider, useSigner } from 'wagmi'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { WNATIVE, ChainId } from '@pancakeswap/sdk'
import { ERC20_BYTES32_ABI } from 'config/abi/erc20'
import ERC20_ABI from 'config/abi/erc20.json'
import IPancakePairABI from 'config/abi/IPancakePair.json'
import multiCallAbi from 'config/abi/Multicall.json'
import WETH_ABI from 'config/abi/weth.json'
import BRIDGE_TOKEN_ABI from 'config/abi/bridgeTokenAddress.json'
import { getContract } from 'utils'

import { IPancakePair } from 'config/abi/types/IPancakePair'
import { VaultKey } from 'state/types'
import { useActiveChainId } from './useActiveChainId'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
  const { data: signer } = useSigner()
  return useMemo(() => getIfoV1Contract(address, signer as any), [address, signer])
}

export const useIfoV2Contract = (address: string) => {
  const { data: signer } = useSigner()
  return useMemo(() => getIfoV2Contract(address, signer as any), [address, signer])
}

export const useIfoV3Contract = (address: string) => {
  const { data: signer } = useSigner()
  return useMemo(() => getIfoV3Contract(address, signer as any), [address, signer])
}

export const useERC20 = (address: string, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getBep20Contract(address, providerOrSigner as any), [address, providerOrSigner])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getErc721Contract(address, providerOrSigner as any), [address, providerOrSigner])
}

export const useCake = (): { reader: Cake; signer: Cake } => {
  const providerOrSigner = useProviderOrSigner(true, true)
  return useMemo(
    () => ({
      reader: getCakeContract(null),
      signer: getCakeContract(providerOrSigner as any),
    }),
    [providerOrSigner],
  )
}

export const useBunnyFactory = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnyFactoryContract(signer as any as any), [signer])
}

export const usePancakeBunnies = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPancakeBunniesContract(signer as any as any), [signer])
}

export const useProfileContract = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible, true)
  return useMemo(() => getProfileContract(providerOrSigner as any), [providerOrSigner])
}

export const useLotteryV2Contract = () => {
  const providerOrSigner = useProviderOrSigner(true, true)
  return useMemo(() => getLotteryV2Contract(providerOrSigner as any), [providerOrSigner])
}

export const useMasterchef = (withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getMasterchefContract(providerOrSigner as any, chainId), [providerOrSigner, chainId])
}

export const useMasterchefV1 = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getMasterchefV1Contract(signer as any as any), [signer])
}

export const useSousChef = (id) => {
  const { data: signer } = useSigner()
  return useMemo(() => getSouschefContract(id, signer as any), [id, signer])
}

export const usePointCenterIfoContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPointCenterIfoContract(signer as any as any), [signer])
}

export const useBunnySpecialContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialContract(signer as any as any), [signer])
}

export const useClaimRefundContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getClaimRefundContract(signer as any as any), [signer])
}

export const useTradingCompetitionContractEaster = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible, true)
  return useMemo(() => getTradingCompetitionContractEaster(providerOrSigner as any), [providerOrSigner])
}

export const useTradingCompetitionContractFanToken = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible, true)
  return useMemo(() => getTradingCompetitionContractFanToken(providerOrSigner as any), [providerOrSigner])
}

export const useTradingCompetitionContractMobox = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible, true)
  return useMemo(() => getTradingCompetitionContractMobox(providerOrSigner as any), [providerOrSigner])
}

export const useTradingCompetitionContractMoD = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible, true)
  return useMemo(() => getTradingCompetitionContractMoD(providerOrSigner as any), [providerOrSigner])
}

export const useEasterNftContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getEasterNftContract(signer as any as any), [signer])
}

export const useVaultPoolContract = (vaultKey: VaultKey): CakeVaultV2 | CakeFlexibleSideVaultV2 => {
  const { data: signer } = useSigner()
  return useMemo(() => {
    if (vaultKey === VaultKey.CakeVault) {
      return getCakeVaultV2Contract(signer as any as any)
    }
    if (vaultKey === VaultKey.CakeFlexibleSideVault) {
      return getCakeFlexibleSideVaultV2Contract(signer as any as any)
    }
    return null
  }, [signer, vaultKey])
}

export const useCakeVaultContract = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getCakeVaultV2Contract(providerOrSigner as any), [providerOrSigner])
}

export const useIfoCreditAddressContract = () => {
  return useMemo(() => getIfoCreditAddressContract(), [])
}

export const usePredictionsContract = (address: string, tokenSymbol: string) => {
  const { data: signer } = useSigner()
  return useMemo(() => {
    if (address === getPredictionsV1Address()) {
      return getPredictionsV1Contract(signer as any as any)
    }
    const getPredContract = tokenSymbol === 'CAKE' ? getCakePredictionsContract : getPredictionsContract

    return getPredContract(address, signer as any)
  }, [address, tokenSymbol, signer])
}

export const useChainlinkOracleContract = (address, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible, true)
  return useMemo(() => getChainlinkOracleContract(address, providerOrSigner as any), [providerOrSigner, address])
}

export const useSpecialBunnyCakeVaultContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialCakeVaultContract(signer as any as any), [signer])
}

export const useSpecialBunnyPredictionContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialPredictionContract(signer as any as any), [signer])
}

export const useBunnySpecialLotteryContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialLotteryContract(signer as any), [signer])
}

export const useBunnySpecialXmasContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialXmasContract(signer as any), [signer])
}

export const useAnniversaryAchievementContract = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible, true)
  return useMemo(() => getAnniversaryAchievementContract(providerOrSigner as any), [providerOrSigner])
}

export const useNftSaleContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getNftSaleContract(signer as any), [signer])
}

export const usePancakeSquadContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPancakeSquadContract(signer as any), [signer])
}

export const useFarmAuctionContract = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible, true)
  return useMemo(() => getFarmAuctionContract(providerOrSigner as any), [providerOrSigner])
}

export const useNftMarketContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getNftMarketContract(signer as any), [signer])
}

export const useErc721CollectionContract = (
  collectionAddress: string,
): { reader: Erc721collection; signer: Erc721collection } => {
  const { data: signer } = useSigner()
  return useMemo(
    () => ({
      reader: getErc721CollectionContract(null, collectionAddress),
      signer: getErc721CollectionContract(signer as any, collectionAddress),
    }),
    [signer, collectionAddress],
  )
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)

  const canReturnContract = useMemo(() => address && ABI && providerOrSigner, [address, ABI, providerOrSigner])

  return useMemo(() => {
    if (!canReturnContract) return null
    try {
      return getContract(address, ABI, providerOrSigner as any)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, providerOrSigner, canReturnContract]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWNativeContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveChainId()
  return useContract<Weth>(chainId ? WNATIVE[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<Erc20Bytes32>(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): IPancakePair | null {
  return useContract(pairAddress, IPancakePairABI, withSignerIfPossible)
}

export function useMulticallContract() {
  const { chainId } = useActiveChainId()
  return useContract<Multicall>(getMulticallAddress(chainId), multiCallAbi, false)
}

export const usePotterytVaultContract = (address) => {
  const { data: signer } = useSigner()
  return useMemo(() => getPotteryVaultContract(address, signer as any), [address, signer])
}

export const usePotterytDrawContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPotteryDrawContract(signer as any), [signer])
}

export function useZapContract(withSignerIfPossible = true) {
  const { chainId } = useActiveChainId()
  return useContract<Zap>(getZapAddress(chainId), zapAbi, withSignerIfPossible)
}

export function useBCakeFarmBoosterContract(withSignerIfPossible = true) {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible, true)
  return useMemo(() => getBCakeFarmBoosterContract(providerOrSigner as any), [providerOrSigner])
}

export function useBCakeFarmBoosterProxyFactoryContract(withSignerIfPossible = true) {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible, true)
  return useMemo(() => getBCakeFarmBoosterProxyFactoryContract(providerOrSigner as any), [providerOrSigner])
}

export function useBCakeProxyContract(proxyContractAddress: string, withSignerIfPossible = true) {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible, true)
  return useMemo(
    () => proxyContractAddress && getBCakeProxyContract(proxyContractAddress, providerOrSigner as any),
    [providerOrSigner, proxyContractAddress],
  )
}

export const useNonBscVault = (withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getNonBscVaultContract(providerOrSigner as any, chainId), [providerOrSigner, chainId])
}

export const useCrossFarmingProxy = (proxyContractAddress: string, withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(
    () => proxyContractAddress && getCrossFarmingProxyContract(proxyContractAddress, providerOrSigner as any, chainId),
    [proxyContractAddress, providerOrSigner, chainId],
  )
}

export const useTreasuryXOX = (withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getTreasuryConTract(providerOrSigner as any, chainId), [providerOrSigner, chainId])
}

export const useXOXTokenContract = (withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getContractXOXToken(providerOrSigner as any, chainId), [providerOrSigner, chainId])
}

export const useProviderOrSignerBridge = (withSignerIfPossible = true, chainId: ChainId) => {
  const provider = useProvider({ chainId })
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()

  return useMemo(
    () => (withSignerIfPossible && address && isConnected && signer ? signer : provider),
    [address, isConnected, provider, signer, withSignerIfPossible],
  )
}

export const useXOXTokenContractPoolBridge = (withSignerIfPossible: boolean, chainId: ChainId) => {
  const providerOrSigner = useProviderOrSignerBridge(withSignerIfPossible, chainId)
  return useMemo(() => getContractXOXTokenBridge(providerOrSigner as any, chainId), [providerOrSigner, chainId])
}

export const useXOXPoolContract = (withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getContractXOXPool(providerOrSigner as any, chainId), [providerOrSigner, chainId])
}

export const useXOXSecondPoolContract = (withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getContractXOXSecondPool(providerOrSigner as any, chainId), [providerOrSigner, chainId])
}

export const useContractFarmingLP = (withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getContractFarmingLP(providerOrSigner as any, chainId), [providerOrSigner, chainId])
}

export function useBridgeTokenContract(chainId: ChainId, withSignerIfPossible?: boolean): Contract | null {
  return useContract(getBridgeTokenAddress(chainId), BRIDGE_TOKEN_ABI, withSignerIfPossible)
}

export const useXOXPreSaleContract = (chainId: ChainId, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSignerPresale(withSignerIfPossible, chainId)
  return useMemo(() => getContractPreSale(providerOrSigner as any, chainId), [providerOrSigner, chainId])
}
