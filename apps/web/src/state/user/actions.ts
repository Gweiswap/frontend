import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { SerializedWrappedToken } from '@pancakeswap/token-lists'

export interface SerializedPair {
  token0: SerializedWrappedToken
  token1: SerializedWrappedToken
}

export interface UserProfile {
  address?: string
  username: string
  email?: string | null
  telegram?: string | null
  avatar?: string | null
  referralCode?: string
  createdAt?: string
  updatedAt?: string
}

export enum FarmStakedOnly {
  ON_FINISHED = 'onFinished',
  TRUE = 'true',
  FALSE = 'false',
}

export enum ViewMode {
  TABLE = 'TABLE',
  CARD = 'CARD',
}

export enum ChartViewMode {
  BASIC = 'BASIC',
  TRADING_VIEW = 'TRADING_VIEW',
}

export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
export const updateOpenFormReferral = createAction<{ openFormReferral: boolean }>('user/updateOpenFormReferral')
export const updateUserProfile = createAction<{ userProfile: UserProfile }>('user/updateUserProfile')
export const updateUserProfileEdit = createAction<{ userProfile: UserProfile }>('user/updateUserProfileEdit')
export const updateUserSingleHopOnly = createAction<{ userSingleHopOnly: boolean }>('user/updateUserSingleHopOnly')
export const updateUserSlippageTolerance = createAction<{ userSlippageTolerance: number }>(
  'user/updateUserSlippageTolerance',
)
export const updateUserDeadline = createAction<{ userDeadline: number }>('user/updateUserDeadline')
export const addSerializedToken = createAction<{ serializedToken: SerializedWrappedToken }>('user/addSerializedToken')
export const removeSerializedToken = createAction<{ chainId: number; address: string }>('user/removeSerializedToken')
export const addSerializedPair = createAction<{ serializedPair: SerializedPair }>('user/addSerializedPair')
export const removeSerializedPair = createAction<{ chainId: number; tokenAAddress: string; tokenBAddress: string }>(
  'user/removeSerializedPair',
)

export const muteAudio = createAction<void>('user/muteAudio')
export const unmuteAudio = createAction<void>('user/unmuteAudio')
export const updateUserFarmStakedOnly = createAction<{ userFarmStakedOnly: FarmStakedOnly }>(
  'user/updateUserFarmStakedOnly',
)
export const updateUserPoolStakedOnly = createAction<{ userPoolStakedOnly: boolean }>('user/updateUserPoolStakedOnly')
export const updateUserPoolsViewMode = createAction<{ userPoolsViewMode: ViewMode }>('user/updateUserPoolsViewMode')
export const updateUserFarmsViewMode = createAction<{ userFarmsViewMode: ViewMode }>('user/updateUserFarmsViewMode')
export const updateUserPredictionAcceptedRisk = createAction<{ userAcceptedRisk: boolean }>(
  'user/updateUserPredictionAcceptedRisk',
)
export const updateUserLimitOrderAcceptedWarning = createAction<{ userAcceptedRisk: boolean }>(
  'user/userLimitOrderAcceptedWarning',
)

export const updateUserPredictionChartDisclaimerShow = createAction<{ userShowDisclaimer: boolean }>(
  'user/updateUserPredictionChartDisclaimerShow',
)
export const updateUserPredictionChainlinkChartDisclaimerShow = createAction<{ userShowDisclaimer: boolean }>(
  'user/updateUserPredictionChainlinkChartDisclaimerShow',
)
export const updateUserExpertModeAcknowledgementShow = createAction<{ userExpertModeAcknowledgementShow: boolean }>(
  'user/updateUserExpertModeAcknowledgementShow',
)
export const updateUserUsernameVisibility = createAction<{ userUsernameVisibility: boolean }>(
  'user/updateUserUsernameVisibility',
)
export const updateGasPrice = createAction<{ gasPrice: string }>('user/updateGasPrice')

export const addWatchlistToken = createAction<{ address: string }>('user/addWatchlistToken')
export const addWatchlistPool = createAction<{ address: string }>('user/addWatchlistPool')
export const hidePhishingWarningBanner = createAction<void>('user/hidePhishingWarningBanner')
export const showBannerAirdrop = createAction<void>('user/showBannerAirdrop')
export const hideBannerAirdrop = createAction<void>('user/hideBannerAirdrop')
export const showBannerChains = createAction<void>('user/showBannerChains')
export const hideBannerChains = createAction<void>('user/hideBannerChains')
export const setIsExchangeChartDisplayed = createAction<boolean>('user/toggleIsExchangeChartDisplayed')
export const setChartViewMode = createAction<ChartViewMode>('user/setChartViewMode')
export const setZapDisabled = createAction<boolean>('user/setZapDisabled')
export const setSubgraphHealthIndicatorDisplayed = createAction<boolean>('user/setSubgraphHealthIndicatorDisplayed')
