/* eslint-disable react/no-unknown-property */
import { SvgProps } from '@pancakeswap/uikit'
import React from 'react'

const UpIcon: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
      <path
        d="M5.14587 11.875L9.89587 7.125L14.6459 11.875"
        stroke="#8E8E8E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default UpIcon
