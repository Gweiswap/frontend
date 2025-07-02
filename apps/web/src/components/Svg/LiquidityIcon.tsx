/* eslint-disable react/no-unknown-property */
import { SvgProps } from "@pancakeswap/uikit";
import React from "react";

const LiquidityIcon: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
      <path
        d="M17.4166 6.53092V16.0309M7.11783 4.73736L12.5814 1.58301L14.4071 4.74528L7.11783 4.73736ZM1.58325 5.54134C1.58325 5.1041 1.93769 4.74967 2.37492 4.74967H16.6249C17.0622 4.74967 17.4166 5.1041 17.4166 5.54134V16.6247C17.4166 17.0619 17.0622 17.4163 16.6249 17.4163H2.37492C1.93769 17.4163 1.58325 17.0619 1.58325 16.6247V5.54134ZM13.953 13.0622H17.4166V9.10384H13.953C12.8053 9.10384 11.8749 9.98995 11.8749 11.083C11.8749 12.1761 12.8053 13.0622 13.953 13.0622Z"
        stroke="#515151"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LiquidityIcon;
