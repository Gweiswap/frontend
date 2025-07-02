import React from "react";
import Link from "./Link";
import { LinkProps } from "./types";
import OpenNewIcon from "../Svg/Icons/OpenNew";

const LinkExternal: React.FC<React.PropsWithChildren<LinkProps> & { hiddenIcon?: boolean }> = ({
  children,
  hiddenIcon = false,
  ...props
}) => {
  return (
    <Link external {...props}>
      {children}
      {!hiddenIcon && <OpenNewIcon style={{ marginLeft: "8px", fill: "transparent" }} />}
    </Link>
  );
};

export default LinkExternal;
