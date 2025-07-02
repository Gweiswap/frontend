/* eslint-disable jsx-a11y/anchor-is-valid */
import { vars } from "@pancakeswap/ui/css/vars.css";
import { Text, useTooltip } from "@pancakeswap/uikit";
import React from "react";
import { Box, Flex } from "../Box";
import { Link } from "../Link";
import {
  StyledList,
  StyledListItem,
  StyledSocialLinks,
  StyledText,
  FooterMainContent,
  SubTitleStyle,
  ImagBGFooter,
  ImagBGFooterTow,
  Container,
  Wrapper,
  StyledIconArrow,
} from "./styles";
import { LogoWithTextIcon } from "../Svg";
import { FooterProps } from "./types";
import { useTranslation } from "@pancakeswap/localization";
import FooterItem from "./FooterItem";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  windowSize,
  ...props
}) => {
  const { t } = useTranslation();
  const { targetRef, tooltip, tooltipVisible } = useTooltip(t("Live At Launch"), {
    placement: "top",
    hideTimeout: 0,
  });

  return (
    <Flex
      data-theme="dark"
      p={["0", null, "0"]}
      position="relative"
      {...props}
      flexDirection="column"
      alignItems="center"
      zIndex={0}
    >
      {windowSize > 900 ? (
        <ImagBGFooter src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/bg_footer.svg`} alt="icon_bg" />
      ) : (
        <ImagBGFooterTow src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/xox_footer_mobile.svg`} alt="icon_bg" />
      )}
      <FooterMainContent>
        <Container>
          <div>
            <Flex order={[2, null, 1]} flexDirection={["column", null, "column"]} mb={["0", null, "0"]}>
              <Box display={["block", null, "block"]}>
                <LogoWithTextIcon />
              </Box>
              <Text
                fontSize="14px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="24px"
                color="rgba(255, 255, 255, 0.87)"
                marginBottom="24px"
                marginTop="24px"
              >
                {t("Managed by XOX Labs.")} <br />
                {t("Building the economy of the Future.")}
              </Text>

              <Flex
                order={[2, null, 1]}
                flexDirection={["row", null, "row"]}
                alignItems="flex-start"
                mb={["0", null, "0"]}
              >
                <StyledSocialLinks order={[2]} pb={["0", null, "0"]} mb={["0", null, "0"]} />
              </Flex>
            </Flex>
          </div>

          {items?.map((item, index) => (
            <Flex
              key={item.label}
              order={[2, null, 1]}
              flexDirection={["column", null, "column"]}
              mb={["0", null, "36px"]}
            >
              <SubTitleStyle>{t(item.label)}</SubTitleStyle>
              <StyledList key={item.label}>
                {item.items?.map(({ label, href, isHighlighted = false, label2, href2, icon, product, inactive }) => (
                  <FooterItem
                    key={label}
                    label={label}
                    href={href}
                    isHighlighted={isHighlighted}
                    label2={label2}
                    href2={href2}
                    icon={icon}
                    product={product}
                    inactive={inactive}
                  />
                ))}
              </StyledList>
            </Flex>
          ))}
        </Container>
      </FooterMainContent>

      <Flex justifyContent="center" width="100%" background="#1c1c1c">
        <Wrapper>
          <Text
            fontSize="14px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="17px"
            color="rgba(255, 255, 255, 0.87)"
            textAlign="center"
          >
            © {new Date().getFullYear()} {t("XOX Labs. All Rights Reserved")}
          </Text>
        </Wrapper>
      </Flex>
    </Flex>
  );
};

export default MenuItem;
