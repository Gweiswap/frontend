import { Button, ChevronDownIcon, Flex, Text, useModal } from '@pancakeswap/uikit'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { CurrencyLogo } from 'components/Logo'
import styled from 'styled-components'
import { Currency } from '@pancakeswap/sdk'

const ButtonWrapper = styled(Button)`
  background: unset !important;
  cursor: poiter;
  border: 1px solid #444444;
  border-radius: 8px;
  padding: 12px 16px;
  height: 100%;
  height: 50px;
  box-shadow: none;
`

type Props = { selectedCurrency: Currency; setSelectedCurrency: (currency: Currency) => void }

const CurrencySelectButton = ({ selectedCurrency, setSelectedCurrency }: Props) => {
  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={setSelectedCurrency}
      selectedCurrency={selectedCurrency}
      forliquidity={true}
    />,
  )

  return (
    <ButtonWrapper
      selected={!!selectedCurrency}
      onClick={() => {
        onPresentCurrencyModal()
      }}
    >
      <Flex flexDirection="row" alignItems="center" width="100%">
        <CurrencyLogo currency={selectedCurrency} />
        <Text
          fontWeight="400"
          fontSize={['16px', , '18px']}
          lineHeight={['19px', , '22px']}
          color="rgba(255, 255, 255, 0.87)"
          ml="8px"
        >
          {selectedCurrency?.symbol}
        </Text>
      </Flex>
      <ChevronDownIcon />
    </ButtonWrapper>
  )
}

export default CurrencySelectButton
