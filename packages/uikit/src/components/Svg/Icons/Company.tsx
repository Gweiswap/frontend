import React from "react";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.7507 6.75H4.25073C3.83652 6.75 3.50073 7.08579 3.50073 7.5V19.5C3.50073 19.9142 3.83652 20.25 4.25073 20.25H20.7507C21.1649 20.25 21.5007 19.9142 21.5007 19.5V7.5C21.5007 7.08579 21.1649 6.75 20.7507 6.75Z"
      stroke="#515151"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.25 6.75V5.25C16.25 4.85218 16.092 4.47064 15.8107 4.18934C15.5294 3.90804 15.1478 3.75 14.75 3.75H10.25C9.85218 3.75 9.47064 3.90804 9.18934 4.18934C8.90804 4.47064 8.75 4.85218 8.75 5.25V6.75"
      stroke="#515151"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.5008 11.8418C18.7654 13.4243 15.6602 14.2553 12.5 14.2503C9.34038 14.2553 6.23564 13.4246 3.50061 11.8426"
      stroke="#515151"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11.375 11.25H13.625" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Icon;
