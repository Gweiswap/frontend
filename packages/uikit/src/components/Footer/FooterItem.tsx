/* eslint-disable jsx-a11y/anchor-is-valid */
import { vars } from "@pancakeswap/ui/css/vars.css";
import { useTooltip } from "@pancakeswap/uikit";
import React from "react";
import { Link } from "../Link";
import { StyledListItem, StyledText, StyledIconArrow } from "./styles";
import { TFooterLinkItem } from "./types";
import { useTranslation } from "@pancakeswap/localization";

const FooterItem: React.FC<React.PropsWithChildren<TFooterLinkItem>> = ({
  label,
  href,
  isHighlighted = false,
  label2,
  href2,
  icon,
  product,
  inactive,
}) => {
  const { t } = useTranslation();
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <span style={{ whiteSpace: "nowrap" }}>{t("Live At Launch")}</span>,
    {
      placement: "top",
      hideTimeout: 0,
    }
  );

  return (
    <>
      {inactive && tooltipVisible && tooltip}
      <StyledListItem key={label} ref={targetRef}>
        <div>
          {icon && <div className="iconx" dangerouslySetInnerHTML={{ __html: icon }} />}
          {href ? (
            <Link
              data-theme="dark"
              href={inactive ? "javascript:void(0)" : href}
              target={inactive ? "" : "_blank"}
              rel="noreferrer noopener"
              color={isHighlighted ? vars.colors.warning : "text"}
              bold={false}
            >
              {`${t(label)} `}
              {label2 && !href2 && (
                <>
                  <br />
                  {label2}
                </>
              )}
              {product && (
                <StyledIconArrow>
                  <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 8L7.5 3" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.4375 3H7.5V7.0625" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </StyledIconArrow>
              )}
            </Link>
          ) : (
            <div>
              <StyledText>{`${t(label)} `}</StyledText>
              {label2 && !href2 && (
                <StyledText>
                  <br />
                  {label2}
                </StyledText>
              )}
              {label2 && href2 && (
                <Link
                  data-theme="dark"
                  href={href2}
                  target="_blank"
                  rel="noreferrer noopener"
                  color={isHighlighted ? vars.colors.warning : "text"}
                  bold={false}
                >
                  {label2}
                </Link>
              )}
            </div>
          )}
        </div>
      </StyledListItem>
    </>
  );
};

export default FooterItem;
