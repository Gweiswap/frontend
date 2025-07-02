import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.1" />
      <path
        d="M12.7528 17.5556V12.4872H14.4539L14.7089 10.5122H12.7534V9.25112C12.7534 8.67889 12.9117 8.28945 13.7317 8.28945L14.7778 8.28889V6.52223C14.2716 6.46866 13.7629 6.44269 13.2539 6.44445C11.7456 6.44445 10.7134 7.36501 10.7134 9.05556V10.5122H9.00781V12.4872H10.7134V17.5556H12.7528Z"
        fill="white"
      />
    </svg>
  );
};

export default Icon;
