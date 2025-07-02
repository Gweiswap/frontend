import {
  ChartDisableIcon,
  ChartIcon,
  Swap,
  Flex,
  HistoryIcon,
  IconButton,
  NotificationDot,
  useModal,
} from '@pancakeswap/uikit'
import TransactionsModal from 'components/App/Transactions/TransactionsModal'
import GlobalSettings from 'components/Menu/GlobalSettings'
import RefreshIcon from 'components/Svg/RefreshIcon'
import { ReactElement, useCallback, useContext } from 'react'
import { useExpertModeManager } from 'state/user/hooks'
import styled from 'styled-components'
import { SettingsMode } from '../../../components/Menu/GlobalSettings/types'
import { SwapFeaturesContext } from '../SwapFeaturesContext'

interface Props {
  title: string | ReactElement
  subtitle: string
  noConfig?: boolean
  setIsChartDisplayed?: React.Dispatch<React.SetStateAction<boolean>>
  isChartDisplayed?: boolean
  hasAmount: boolean
  onRefreshPrice: () => void
}

const ColoredIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.textSubtle};
`

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`

const CurrencyInputHeader: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  subtitle,
  hasAmount,
  onRefreshPrice,
}) => {
  const { isChartSupported, isChartDisplayed, setIsChartDisplayed } = useContext(SwapFeaturesContext)
  const [expertMode] = useExpertModeManager()
  const toggleChartDisplayed = () => {
    setIsChartDisplayed((currentIsChartDisplayed) => !currentIsChartDisplayed)
  }
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  const handleOnClick = useCallback(() => onRefreshPrice?.(), [onRefreshPrice])

  return (
    <Swap.CurrencyInputHeader
      title={
        <Flex width="100%" alignItems="center" justifyContent="space-between">
          {/* {isChartSupported && setIsChartDisplayed && (
            <ColoredIconButton onClick={toggleChartDisplayed} variant="text" scale="sm">
              {isChartDisplayed ? (
                <ChartDisableIcon />
              ) : (
                <ChartIcon width="24px" />
              )}
            </ColoredIconButton>
          )} */}
          <Flex flexDirection="column" alignItems="flex-start" width="100%" mr={18}>
            <Swap.CurrencyInputHeaderTitle>{title}</Swap.CurrencyInputHeaderTitle>
            <Swap.CurrencyInputHeaderSubTitle>{subtitle}</Swap.CurrencyInputHeaderSubTitle>
          </Flex>
          <Flex>
            <NotificationDot show={expertMode}>
              <GlobalSettings mr="0" mode={SettingsMode.SWAP_LIQUIDITY} />
            </NotificationDot>
            <Button onClick={onPresentTransactionsModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.90918 3.36353V6.99988H6.54556"
                  stroke="#515151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C8.299 2 5.06755 4.01056 3.33839 6.99905"
                  stroke="#515151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0026 6L12.002 12.0044L16.2417 16.2441"
                  stroke="#515151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </Flex>
        </Flex>
      }
      subtitle={<></>}
    />
  )
}

export default CurrencyInputHeader
