import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.0835 5.41668H10.9168V7.25001H9.0835V5.41668ZM9.0835 9.08334H10.9168V14.5833H9.0835V9.08334ZM10.0002 0.833344C4.94016 0.833344 0.833496 4.94001 0.833496 10C0.833496 15.06 4.94016 19.1667 10.0002 19.1667C15.0602 19.1667 19.1668 15.06 19.1668 10C19.1668 4.94001 15.0602 0.833344 10.0002 0.833344ZM10.0002 17.3333C5.95766 17.3333 2.66683 14.0425 2.66683 10C2.66683 5.95751 5.95766 2.66668 10.0002 2.66668C14.0427 2.66668 17.3335 5.95751 17.3335 10C17.3335 14.0425 14.0427 17.3333 10.0002 17.3333Z"
        fill="white"
      />
    </Svg>
  );
};

export default Icon;
