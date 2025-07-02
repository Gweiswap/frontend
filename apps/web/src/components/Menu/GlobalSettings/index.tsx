import { Flex, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
  mode?: string
}

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 8px;
`

const GlobalSettings = ({ mode }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal mode={mode} />)

  return (
    <Flex>
      <Button onClick={onPresentSettingsModal} style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.23803 21.5854C7.56248 21.0866 6.07103 20.1604 4.89007 18.9333C5.33063 18.4111 5.59613 17.7365 5.59613 16.9998C5.59613 15.343 4.25299 13.9998 2.59613 13.9998C2.49591 13.9998 2.39683 14.0047 2.29913 14.0143C2.16603 13.3636 2.09613 12.6899 2.09613 11.9998C2.09613 10.9545 2.25652 9.94667 2.55403 8.99952C2.56804 8.99972 2.58207 8.99982 2.59613 8.99982C4.25299 8.99982 5.59613 7.65667 5.59613 5.99982C5.59613 5.52417 5.48543 5.07437 5.28843 4.67481C6.44488 3.5995 7.85638 2.79477 9.42218 2.36133C9.91833 3.33385 10.9295 3.99982 12.0961 3.99982C13.2628 3.99982 14.2739 3.33385 14.7701 2.36133C16.3359 2.79477 17.7474 3.5995 18.9038 4.67481C18.7068 5.07437 18.5961 5.52417 18.5961 5.99982C18.5961 7.65667 19.9393 8.99982 21.5961 8.99982C21.6102 8.99982 21.6242 8.99972 21.6382 8.99952C21.9357 9.94667 22.0961 10.9545 22.0961 11.9998C22.0961 12.6899 22.0262 13.3636 21.8931 14.0143C21.7954 14.0047 21.6964 13.9998 21.5961 13.9998C19.9393 13.9998 18.5961 15.343 18.5961 16.9998C18.5961 17.7365 18.8616 18.4111 19.3022 18.9333C18.1212 20.1604 16.6298 21.0866 14.9542 21.5854C14.5675 20.3757 13.4341 19.4998 12.0961 19.4998C10.7581 19.4998 9.62473 20.3757 9.23803 21.5854Z"
            stroke="#515151"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12.0961 15.5C14.0291 15.5 15.5961 13.933 15.5961 12C15.5961 10.067 14.0291 8.5 12.0961 8.5C10.1631 8.5 8.59613 10.067 8.59613 12C8.59613 13.933 10.1631 15.5 12.0961 15.5Z"
            stroke="#515151"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </Flex>
  )
}

export default GlobalSettings
