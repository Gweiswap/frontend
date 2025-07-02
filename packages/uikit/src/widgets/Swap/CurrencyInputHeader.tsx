import { AtomBox } from "@pancakeswap/ui";
import { ReactNode } from "react";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { useMatchBreakpoints } from "../../contexts";

interface Props {
  title: ReactNode;
  subtitle: ReactNode;
}

export const CurrencyInputHeader = ({ title, subtitle }: Props) => {
  const { isMobile } = useMatchBreakpoints();
  return (
    <AtomBox
      width="full"
      alignItems="center"
      flexDirection="column"
      style={isMobile ? { width: "" } : { padding: "0px 0px 20px" }}
      borderBottom="1"
    >
      <AtomBox width="full" display="flex" alignItems="center" justifyContent="space-between">
        {title}
      </AtomBox>
      {subtitle}
    </AtomBox>
  );
};

export const CurrencyInputHeaderTitle = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useMatchBreakpoints();
  return (
    <Text
      fontSize={isMobile ? "16px" : "24px"}
      fontFamily="Inter"
      fontStyle="normal"
      fontWeight="700"
      lineHeight={isMobile ? "19px" : "29px"}
      color="rgba(255, 255, 255, 0.87)"
      marginBottom="8px"
    >
      {children}
    </Text>
  );
};

export const CurrencyInputHeaderSubTitle = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useMatchBreakpoints();
  return (
    <Text
      fontSize={isMobile ? "12px" : "14px"}
      fontFamily="Inter"
      fontStyle="normal"
      fontWeight="400"
      lineHeight={isMobile ? "13px" : "17px"}
      marginBottom={isMobile ? "16px" : "0"}
      color="rgba(255, 255, 255, 0.6)"
    >
      {children}
    </Text>
  );
};
