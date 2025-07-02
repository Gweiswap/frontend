import { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { useMatchBreakpoints } from "../../contexts";
import { Box, BoxProps } from "../Box";
import { ArrowDropDownIcon } from "../Svg";
import { Text } from "../Text";

const DropDownHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  background: transparent;
  transition: border-radius 0.15s;
  height: 37px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;

  & > div {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
  }
`;

const DropDownListContainer = styled.div<{ isMobile: boolean }>`
  min-width: 136px;
  height: 0;
  position: absolute;
  overflow: hidden;
  background: #303030;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  width: 100%;
  ${({ isMobile }) => (isMobile ? "bottom: calc(100% + 1px);" : "top: calc(100% + 1px);")}

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 168px;
  }
`;

const DropDownContainer = styled(Box)<{ isOpen: boolean }>`
  cursor: pointer;
  width: 100%;
  position: relative;
  background: transparent;
  border-radius: 4px;
  height: 37px;
  min-width: 136px;
  user-select: none;
  z-index: 20;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 168px;
  }

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
        border-radius: 8px;
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        border-top-width: 0;
        border-radius: 4px;
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
        padding: 6px 0;
      }
    `}

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`;

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;

  & > div {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export interface SelectProps extends BoxProps {
  options: OptionProps[];
  onOptionChange?: (option: OptionProps) => void;
  placeHolderText?: string;
  defaultOptionIndex?: number;
}

export interface OptionProps {
  label: string;
  value: any;
}

const Select: React.FunctionComponent<React.PropsWithChildren<SelectProps>> = ({
  options,
  onOptionChange,
  defaultOptionIndex = 0,
  placeHolderText,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optionSelected, setOptionSelected] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultOptionIndex);
  const { isMobile } = useMatchBreakpoints();

  const toggling = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setIsOpen(!isOpen);
      event.stopPropagation();
    },
    [isOpen]
  );

  const onOptionClicked = useCallback(
    (selectedIndex: number) => () => {
      setSelectedOptionIndex(selectedIndex);
      setIsOpen(false);
      setOptionSelected(true);

      if (onOptionChange) {
        onOptionChange(options[selectedIndex]);
      }
    },
    [options]
  );

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultOptionIndex) {
      setSelectedOptionIndex(defaultOptionIndex - 1);
      setOptionSelected(true);
    }
  }, [defaultOptionIndex]);

  return (
    <DropDownContainer isOpen={isOpen} onClick={toggling} {...props}>
      <DropDownHeader>
        <Text color={!optionSelected && placeHolderText ? "text" : undefined}>
          {!optionSelected && placeHolderText ? placeHolderText : options[selectedOptionIndex]?.label}
        </Text>
      </DropDownHeader>
      <ArrowDropDownIcon color="text" onClick={toggling} />
      <DropDownListContainer isMobile={isMobile}>
        <DropDownList>
          {options.map((option, index) =>
            placeHolderText || index !== selectedOptionIndex ? (
              <ListItem onClick={onOptionClicked(index)} key={option.label}>
                <Text>{option.label}</Text>
              </ListItem>
            ) : null
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  );
};

export default Select;
