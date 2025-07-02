import React from "react";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <circle cx="12" cy="12.5" r="12" fill="url(#paint0_linear_11003_43144)" />
      <path
        d="M17.8332 9.81283V16.8128M10.2446 8.49125L14.2704 6.16699L15.6157 8.49709L10.2446 8.49125ZM6.1665 9.08366C6.1665 8.76148 6.42767 8.50033 6.74984 8.50033H17.2498C17.572 8.50033 17.8332 8.76148 17.8332 9.08366V17.2503C17.8332 17.5725 17.572 17.8337 17.2498 17.8337H6.74984C6.42767 17.8337 6.1665 17.5725 6.1665 17.2503V9.08366ZM15.2811 14.6253H17.8332V11.7087H15.2811C14.4354 11.7087 13.7498 12.3616 13.7498 13.167C13.7498 13.9724 14.4354 14.6253 15.2811 14.6253Z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11003_43144"
          x1="-1.90099"
          y1="0.5"
          x2="29.4077"
          y2="3.41329"
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
