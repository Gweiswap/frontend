/* eslint-disable react/no-unknown-property */
import React from 'react'
import { SvgProps } from '@pancakeswap/uikit/src/components/Svg/types'

const GoerliIcon: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
      <g clip-path="url(#clip0_11684_65240)">
        <path
          d="M28.0765 -0.0078125L27.7031 1.2681V38.3006L28.0765 38.674L45.2653 28.5134L28.0765 -0.0078125Z"
          fill="white"
        />
        <path d="M28.0776 -0.0078125L10.8887 28.5134L28.0776 38.674V-0.0078125Z" fill="white" />
        <path
          d="M28.0781 41.9263L27.8604 42.1908V55.3856L28.0781 56.008L45.267 31.7812L28.0781 41.9418V41.9263Z"
          fill="white"
        />
        <path d="M28.0776 55.9924V41.9262L10.8887 31.7656L28.0776 55.9924Z" fill="white" />
        <path d="M28.0771 38.6738L45.266 28.5132L28.0771 20.7021V38.6738Z" fill="white" />
        <path d="M10.8887 28.5132L28.0776 38.6738V20.7021L10.8887 28.5132Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_11684_65240">
          <rect width="56" height="56" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default GoerliIcon
