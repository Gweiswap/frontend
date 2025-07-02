import React, { useEffect, useState } from "react";
import MenuButton from "./MenuButton";
import { Colors } from "../../theme";
import { Language } from "./types";
import { Position } from "../Dropdown/types";
import { Scale } from "../Button/types";
import { useTranslation } from "@pancakeswap/localization";
import styled from "styled-components";
import { usePopper } from "react-popper";
import { Box, Flex } from "../../components/Box";
import { ChevronDownIcon } from "../Svg";
import Image from "next/image";

export const StyledUserMenu = styled(Flex)`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  height: 24px;
  position: relative;
`;

export const FlexWrapper = styled(Flex)`
  height: 37px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 43px;
  }
`;

export const LabelText = styled.div`
  display: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.87);
  margin-right: 26px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 30px;
  }
`;

const Menu = styled.div<{ isOpen: boolean }>`
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 154px;
  visibility: visible;
  z-index: 1001;

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}

  & > div {
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    background-color: ${({ theme }) => theme.card.background};
  }
`;

const BoxWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #1d1c1c;
`;

const MenuButtonWrapper = styled(MenuButton)`
  background: transparent;
  border-radius: 0;
  padding: 12px 37px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

interface Props {
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
  color: keyof Colors;
  dropdownPosition?: Position;
  buttonScale?: Scale;
  hideLanguage?: boolean;
}

const LangSelector: React.FC<React.PropsWithChildren<Props>> = ({ currentLang, langs, setLang }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const { styles, attributes, update } = usePopper(targetRef, tooltipRef, {
    strategy: "fixed",
    modifiers: [{ name: "offset", options: { offset: [0, 0] } }],
  });

  // recalculate the popover position
  useEffect(() => {
    if (isOpen && update) update();
  }, [isOpen, update]);

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true);
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false);
        evt.stopPropagation();
      }
    };

    targetRef?.addEventListener("mouseenter", showDropdownMenu);
    targetRef?.addEventListener("mouseleave", hideDropdownMenu);

    return () => {
      targetRef?.removeEventListener("mouseenter", showDropdownMenu);
      targetRef?.removeEventListener("mouseleave", hideDropdownMenu);
    };
  }, [targetRef, tooltipRef, setIsOpen]);

  return (
    <Flex alignItems="center" height="100%" ref={setTargetRef}>
      <FlexWrapper
        alignItems="center"
        justifyContent="center"
        border="1px solid #444444"
        borderRadius="6px"
        padding="6px 8px"
        marginRight="16px"
      >
        <StyledUserMenu
          onTouchStart={() => {
            setIsOpen((s) => !s);
          }}
        >
          <LabelText title={currentLang} style={{ marginRight: 0 }}>
            <div style={{ display: "flex" }}>
              <Image src={`/images/${currentLang}.svg`} alt={currentLang} width={19} height={19} />
              <span style={{ marginLeft: "10px" }}>{t(currentLang)}</span>
            </div>
          </LabelText>
          <ChevronDownIcon color="text" width="24px" style={{ marginLeft: "6px" }} />
        </StyledUserMenu>
        <Menu style={styles.popper} ref={setTooltipRef} {...attributes.popper} isOpen={isOpen}>
          <BoxWrapper onClick={() => setIsOpen(false)}>
            {langs.map((lang) => (
              <MenuButtonWrapper
                key={lang.locale}
                fullWidth
                onClick={() => setLang(lang)}
                // Safari fix
                style={{
                  minHeight: "32px",
                  height: "auto",
                  whiteSpace: "nowrap",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Image src={`/images/${lang.language}.svg`} alt={lang.language} width={19} height={19} />
                  <span style={{ marginLeft: "10px" }}>{t(lang.language)}</span>
                </div>
              </MenuButtonWrapper>
            ))}
          </BoxWrapper>
        </Menu>
      </FlexWrapper>
    </Flex>
  );
};

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang);
