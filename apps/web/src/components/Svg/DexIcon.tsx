/* eslint-disable react/no-unknown-property */
import { SvgProps } from '@pancakeswap/uikit'
import React from 'react'

const DexIcon: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="19" viewBox="0 0 15 19" fill="none">
      <path
        d="M7.50008 17.4164H1.16675V1.58301H13.8334V9.49969M12.0522 17.4164V12.2705M10.2709 13.6559L12.0522 11.8747L13.8334 13.6559M4.33341 6.33302H10.6667M4.33341 9.49969H7.50008"
        stroke="#515151"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default DexIcon
