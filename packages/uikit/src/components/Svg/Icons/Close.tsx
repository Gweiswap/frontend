import React from "react";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z"
        fill="#515151"
        stroke="#515151"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14.8282 9.17139L9.17139 14.8282"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.17139 9.17139L14.8282 14.8282"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Icon;
