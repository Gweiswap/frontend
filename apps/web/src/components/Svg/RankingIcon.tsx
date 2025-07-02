/* eslint-disable react/no-unknown-property */
import { SvgProps } from '@pancakeswap/uikit'
import React from 'react'

const RankingIcon: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
      <path
        d="M6.72908 7.125H1.58325V16.625H6.72908V7.125Z"
        stroke="#515151"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8751 2.375H6.72925V16.625H11.8751V2.375Z"
        stroke="#515151"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M17.0208 10.292H11.875V16.6253H17.0208V10.292Z"
        stroke="#515151"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default RankingIcon
