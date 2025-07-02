import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.0835 12.75H10.9168V14.5833H9.0835V12.75ZM9.0835 5.41667H10.9168V10.9167H9.0835V5.41667ZM9.991 0.833336C4.931 0.833336 0.833496 4.94 0.833496 10C0.833496 15.06 4.931 19.1667 9.991 19.1667C15.0602 19.1667 19.1668 15.06 19.1668 10C19.1668 4.94 15.0602 0.833336 9.991 0.833336ZM10.0002 17.3333C5.9485 17.3333 2.66683 14.0517 2.66683 10C2.66683 5.94834 5.9485 2.66667 10.0002 2.66667C14.0518 2.66667 17.3335 5.94834 17.3335 10C17.3335 14.0517 14.0518 17.3333 10.0002 17.3333Z"
        fill="white"
      />
    </Svg>
  );
};

export default Icon;
