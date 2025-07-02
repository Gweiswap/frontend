import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <path d="M3.84619 12H20.3462" stroke="#FB8618" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.0962 3.75V20.25" stroke="#FB8618" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export default Icon;
