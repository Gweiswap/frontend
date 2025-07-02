import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="14.5" stroke="url(#paint0_linear_10957_46039)" />
      <path
        d="M20.6365 8.12361C20.6365 8.12361 22.1165 7.51761 21.9926 8.9892C21.9519 9.5952 21.582 11.7164 21.294 14.0104L20.3073 20.8064C20.3073 20.8064 20.225 21.8019 19.4849 21.9751C18.7451 22.1479 17.635 21.3692 17.4293 21.196C17.2647 21.066 14.3459 19.118 13.3181 18.166C13.0301 17.906 12.701 17.3868 13.3592 16.7808L17.6758 12.452C18.1691 11.9328 18.6624 10.7208 16.6068 12.1924L10.8507 16.3044C10.8507 16.3044 10.1928 16.7376 8.95969 16.348L6.28697 15.482C6.28697 15.482 5.30031 14.8328 6.986 14.1836C11.0976 12.1492 16.1546 10.0716 20.6357 8.12361H20.6365Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10957_46039"
          x1="-2.37624"
          y1="8.85217e-09"
          x2="36.7596"
          y2="3.64161"
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
