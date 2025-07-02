import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.625 1.875H2.8125C2.29473 1.875 1.875 2.29473 1.875 2.8125V12.1875C1.875 12.7053 2.29473 13.125 2.8125 13.125H12.1875C12.7053 13.125 13.125 12.7053 13.125 12.1875V9.375"
        stroke="#515151"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5622 1.31488C13.7323 1.44258 13.8423 1.64597 13.8423 1.87505V7.50005C13.8423 7.88665 13.5289 8.20005 13.1423 8.20005C12.7557 8.20005 12.4423 7.88665 12.4423 7.50005V3.56492L5.68228 10.325C5.40891 10.5984 4.9657 10.5984 4.69233 10.325C4.41896 10.0516 4.41896 9.60841 4.69233 9.33504L11.4523 2.57505H7.51732C7.13072 2.57505 6.81732 2.26165 6.81732 1.87505C6.81732 1.48845 7.13072 1.17505 7.51732 1.17505L13.1422 1.17505L13.1423 1.17505C13.2998 1.17505 13.4452 1.22708 13.5622 1.31488Z"
        fill="#515151"
      />
    </Svg>
  );
};

export default Icon;
