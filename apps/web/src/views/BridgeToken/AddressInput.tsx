import { useTranslation } from '@pancakeswap/localization'
import React from 'react'
import styled from 'styled-components'

interface PropInput {
  messageAddress?: string
  value?: any
}
const Wrapper = styled.div`
  margin: 20px 0 24px;
  @media (max-width: 576px) {
    margin: 16px 0;
  }
`

const Text = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSubtle};
  @media (max-width: 576px) {
    font-size: 12px;
  }
`

const Input = styled.input<PropInput>`
  width: 100%;
  background: transparent;
  padding: 10px 14px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.hr};
  border-radius: 6px;
  margin-top: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSubTitle};
  box-shadow: none;
  height: 43px;
  margin-bottom: 5px;
  :focus {
    outline: none;
  }
  &.error {
    background: rgba(255, 112, 112, 0.1);
    border-color: #ff7070;
  }
  @media (max-width: 576px) {
    margin-top: 5px;
    font-size: 14px;
    height: 37px;
    border-radius: 4px;
  }
`

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
`

type Props = {
  address: any
  handleAddressTo: any
  messageAddress: string
}

const AddressInput: React.FC<Props> = ({ address, handleAddressTo, messageAddress }) => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Text>{t('To Address')}</Text>
      <Input
        value={address}
        onChange={(e) => handleAddressTo(e.target.value)}
        messageAddress={messageAddress}
        className={`${messageAddress ? 'error' : ''}`}
      />
      <ErrorMessage>{messageAddress}</ErrorMessage>
    </Wrapper>
  )
}

export default AddressInput
