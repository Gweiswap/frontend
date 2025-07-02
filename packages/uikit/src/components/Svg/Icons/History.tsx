import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.00537 3.36328V6.99964H6.64175"
        stroke="#515151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.09619 12C2.09619 17.5229 6.57334 22 12.0962 22C17.619 22 22.0962 17.5229 22.0962 12C22.0962 6.47715 17.619 2 12.0962 2C8.39519 2 5.16374 4.01056 3.43458 6.99905"
        stroke="#515151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0987 6L12.0981 12.0044L16.3378 16.2441"
        stroke="#515151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Icon;
