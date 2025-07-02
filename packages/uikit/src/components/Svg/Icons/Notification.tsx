/* eslint-disable react/no-unknown-property */
import React from "react";
import { SvgProps } from "../types";

const Logo: React.FC<React.PropsWithChildren<SvgProps> & { size?: number }> = ({ size = 43 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 43 43"
      fill="none"
      style={{ marginRight: "16px", cursor: "pointer" }}
    >
      <circle cx="21.5" cy="22" r="21.5" fill="#303030" />
      <g clipPath="url(#clip0_7156_5352)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21 10.5C16.8579 10.5 13.5 13.8579 13.5 18V22.4208C13.5 22.4949 13.4781 22.5672 13.437 22.6289L10.8823 26.4609C10.633 26.8349 10.5 27.2742 10.5 27.7236C10.5 28.9809 11.5192 30 12.7764 30H29.2236C30.4809 30 31.5 28.9809 31.5 27.7236C31.5 27.2742 31.3669 26.8349 31.1176 26.4609L28.563 22.6289C28.5219 22.5672 28.5 22.4949 28.5 22.4208V18C28.5 13.8579 25.1421 10.5 21 10.5Z"
          fill="#8E8E8E"
        />
        <path
          d="M23.9769 31.8743C23.7927 33.3545 22.5301 34.5 21 34.5C19.4699 34.5 18.2073 33.3545 18.0231 31.8743C17.9975 31.6688 18.1679 31.5 18.375 31.5H23.625C23.8321 31.5 24.0024 31.6688 23.9769 31.8743Z"
          fill="#8E8E8E"
        />
        <circle cx="27.5" cy="14.5" r="2.5" fill="#9072FF" stroke="#303030" />
      </g>
      <defs>
        <clipPath id="clip0_7156_5352">
          <rect width="24" height="24" fill="white" transform="translate(9 10.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;
