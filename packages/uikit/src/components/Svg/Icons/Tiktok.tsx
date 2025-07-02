import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15.5" r="14.5" stroke="url(#paint0_linear_11606_20622)" />
      <g clipPath="url(#clip0_11606_20622)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.9617 7.83301C18.2118 10.0089 19.4125 11.3061 21.5 11.4441V13.8914C20.2902 14.011 19.2306 13.6108 17.9981 12.8564V17.4335C17.9981 23.2481 11.7309 25.0652 9.21134 20.8974C7.59226 18.2155 8.58372 13.5096 13.7775 13.321V15.9017C13.3818 15.9661 12.9589 16.0673 12.5723 16.2007C11.4171 16.5963 10.7622 17.3369 10.9441 18.6434C11.2943 21.1458 15.8332 21.8865 15.4557 16.9965V7.83761H17.9617V7.83301Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_11606_20622"
          x1="-2.37624"
          y1="0.5"
          x2="36.7596"
          y2="4.14161"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B809B5" />
          <stop offset="0.510417" stopColor="#ED1C51" />
          <stop offset="1" stopColor="#FFB000" />
        </linearGradient>
        <clipPath id="clip0_11606_20622">
          <rect width="16.6667" height="16.6667" fill="white" transform="translate(6.66663 7.1665)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icon;
