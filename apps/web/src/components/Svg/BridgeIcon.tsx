/* eslint-disable react/no-unknown-property */
import { SvgProps } from '@pancakeswap/uikit'
import React from 'react'

const BridgeIcon: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
      <path
        d="M7.125 12.2712H15.0417V1.97949"
        stroke="#515151"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8749 8.3125H3.95825V17.0208"
        stroke="#515151"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4167 4.35449L15.0417 1.97949L12.6667 4.35449"
        stroke="#515151"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.33325 14.6455L3.95825 17.0205L1.58325 14.6455"
        stroke="#515151"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default BridgeIcon
