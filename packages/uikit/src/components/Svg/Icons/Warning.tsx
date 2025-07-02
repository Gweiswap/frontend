import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M10.0833 6.41634H11.9166V8.24967H10.0833V6.41634ZM10.0833 10.083H11.9166V15.583H10.0833V10.083ZM10.9999 1.83301C5.93992 1.83301 1.83325 5.93967 1.83325 10.9997C1.83325 16.0597 5.93992 20.1663 10.9999 20.1663C16.0599 20.1663 20.1666 16.0597 20.1666 10.9997C20.1666 5.93967 16.0599 1.83301 10.9999 1.83301ZM10.9999 18.333C6.95742 18.333 3.66659 15.0422 3.66659 10.9997C3.66659 6.95717 6.95742 3.66634 10.9999 3.66634C15.0424 3.66634 18.3333 6.95717 18.3333 10.9997C18.3333 15.0422 15.0424 18.333 10.9999 18.333Z"
        fill="url(#paint0_linear_11348_23821)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11348_23821"
          x1="0.381107"
          y1="1.83301"
          x2="24.2974"
          y2="4.05844"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B809B5" />
          <stop offset="0.510417" stopColor="#ED1C51" />
          <stop offset="1" stopColor="#FFB000" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Icon;
