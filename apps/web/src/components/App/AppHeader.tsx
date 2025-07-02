import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot, QuestionHelper } from '@pancakeswap/uikit'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Link from 'next/link'
import Transactions from './Transactions'
import { SettingsMode } from '../Menu/GlobalSettings/types'

interface Props {
  title: string
  subtitle?: string
  helper?: string
  backTo?: string | (() => void)
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  width: 100%;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  .header {
    gap: 16px;
    @media (max-width: 576px) {
      gap: 10px;
    }
  }
`

const AppHeader: React.FC<React.PropsWithChildren<Props>> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  const [expertMode] = useExpertModeManager()

  return (
    <AppHeaderContainer>
      <Flex alignItems="center" width="100%" className="header">
        {backTo &&
          (typeof backTo === 'string' ? (
            <Link passHref href={backTo}>
              <div style={{ cursor: 'pointer' }}>
                <ArrowBackIcon width="24px" />
              </div>
            </Link>
          ) : (
            <IconButton scale="sm" variant="text" onClick={backTo}>
              <ArrowBackIcon width="24px" />
            </IconButton>
          ))}
        <Flex flexDirection="column" width="100%">
          <Flex alignItems="center" justifyContent="space-between">
            <Flex>
              <Text
                color="rgba(255, 255, 255, 0.87)"
                fontSize={['16px', , '24px']}
                fontWeight={700}
                lineHeight={['19px', , '29px']}
              >
                {title}
              </Text>
            </Flex>
            {!noConfig && (
              <Flex alignItems="center">
                <NotificationDot show={expertMode}>
                  <GlobalSettings mode={SettingsMode.SWAP_LIQUIDITY} />
                </NotificationDot>
                <Transactions />
              </Flex>
            )}
          </Flex>
          {subtitle && (
            <Flex mt="8px" alignItems="center">
              <Text color="textSubtle" fontSize={['12px', , '14px']}>
                {subtitle}
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </AppHeaderContainer>
  )
}

export default AppHeader
