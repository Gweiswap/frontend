import React, { useEffect, useState } from 'react'
import SwapHeader from './SwapHeader'
import XOXDex from './SwapForm/XOXDex'
import KyberSwap from './SwapForm/KyberSwap'

export type TTab = 'xoxdex' | 'kyberswap'

const SwapForm = () => {
  const [activeTab, setActiveTab] = useState<TTab>('xoxdex')

  return (
    <>
      <SwapHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'xoxdex' ? <XOXDex /> : <KyberSwap />}
    </>
  )
}

export default SwapForm
