/* eslint-disable react/no-unknown-property */
import { SvgProps } from '@pancakeswap/uikit'
import React from 'react'

const MobileIcon: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
      <path
        d="M3.16675 11.875H15.8334V16.625C15.8334 17.0622 15.479 17.4167 15.0417 17.4167H3.95841C3.52119 17.4167 3.16675 17.0622 3.16675 16.625V11.875Z"
        stroke="#515151"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M15.8334 11.8747V2.37467C15.8334 1.93745 15.479 1.58301 15.0417 1.58301H3.95841C3.52119 1.58301 3.16675 1.93745 3.16675 2.37467V11.8747"
        stroke="#515151"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8.70825 14.6455H10.2916" stroke="#515151" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default MobileIcon
