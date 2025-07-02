import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.0833 3.6575L16.9858 15.5833H3.18083L10.0833 3.6575ZM10.0833 0L0 17.4167H20.1667L10.0833 0Z"
        fill="white"
      />
      <path d="M11 12.8333H9.16667V14.6667H11V12.8333Z" fill="white" />
      <path d="M11 7.33333H9.16667V11.9167H11V7.33333Z" fill="white" />
    </Svg>
  );
};

export default Icon;
