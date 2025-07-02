import Image from 'next/image'
import { HelpIcon } from '@pancakeswap/uikit'
import { isBridgeChainSupported, isChainSupported } from 'utils/wagmi'
import { memo } from 'react'

export const ChainLogo = memo(
  ({ chainId, width = 24, height = 24 }: { chainId: number; width?: number; height?: number }) => {
    if (isBridgeChainSupported(chainId)) {
      return (
        <Image
          alt={`chain-${chainId}`}
          style={{ maxHeight: `${height}px` }}
          src={`/images/chains/${chainId}.svg`}
          width={width}
          height={height}
          unoptimized
        />
      )
    }

    return <HelpIcon width={width} height={height} />
  },
)
