import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 15.5C1 7.21573 7.71573 0.5 16 0.5C24.2843 0.5 31 7.21573 31 15.5C31 23.7843 24.2843 30.5 16 30.5C7.71573 30.5 1 23.7843 1 15.5Z"
        stroke="url(#paint0_linear_11606_20619)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.251 10.3433C22.9395 10.5322 23.4816 11.0889 23.6656 11.7958C24 13.0769 24 15.75 24 15.75C24 15.75 24 18.423 23.6656 19.7042C23.4816 20.4111 22.9395 20.9678 22.251 21.1568C21.0034 21.5 16 21.5 16 21.5C16 21.5 10.9966 21.5 9.74891 21.1568C9.06045 20.9678 8.51827 20.4111 8.33427 19.7042C8 18.423 8 15.75 8 15.75C8 15.75 8 13.0769 8.33427 11.7958C8.51827 11.0889 9.06045 10.5322 9.74891 10.3433C10.9966 10 16 10 16 10C16 10 21.0034 10 22.251 10.3433ZM14.5 13.4999V18.4999L18.5 16L14.5 13.4999Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11606_20619"
          x1="-1.37624"
          y1="0.5"
          x2="37.7596"
          y2="4.14161"
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
