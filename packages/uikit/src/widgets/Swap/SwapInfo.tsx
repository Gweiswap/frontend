import { useTranslation } from "@pancakeswap/localization";
import { useIsMounted } from "@pancakeswap/hooks";
import { PropsWithChildren, ReactNode } from "react";
import { useMatchBreakpoints } from "@pancakeswap/uikit";
import { AutoColumn, RowBetween, Text, TextProps } from "../../components";

type SwapInfoType = {
  price: ReactNode;
  allowedSlippage: number;
};

export const SwapInfoLabel = (props: PropsWithChildren<TextProps>) => {
  const { isMobile } = useMatchBreakpoints();
  return (
    <Text
      style={{ marginBottom: "14px", marginTop: "6px", fontWeight: "400" }}
      fontSize={isMobile ? "14px" : "18px"}
      bold
      color="#FFFFFFDE"
      {...props}
    />
  );
};

export const SwapInfo = ({ allowedSlippage, price }: SwapInfoType) => {
  const { t } = useTranslation();
  const isMounted = useIsMounted();
  const { isMobile } = useMatchBreakpoints();

  return (
    <AutoColumn gap="sm" py="0">
      <RowBetween alignItems="center">{price}</RowBetween>
      <RowBetween alignItems="center">
        <SwapInfoLabel>{t("Slippage Tolerance")}</SwapInfoLabel>
        {isMounted && (
          <Text bold color="#FB8618" style={{ fontSize: isMobile ? "14px" : "18px", fontWeight: "700" }}>
            {allowedSlippage / 100}%
          </Text>
        )}
      </RowBetween>
    </AutoColumn>
  );
};
