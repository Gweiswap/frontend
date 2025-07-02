import { Swap, Flex, NotificationDot, useModal } from '@pancakeswap/uikit'
import TransactionsModal from 'components/App/Transactions/TransactionsModal'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { useExpertModeManager } from 'state/user/hooks'
import styled from 'styled-components'
import { SettingsMode } from '../../../components/Menu/GlobalSettings/types'
import { useTranslation } from '@pancakeswap/localization'
import { TTab } from './SwapForm'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
  activeTab: TTab
  onRefreshPrice?: () => void
  setActiveTab: (tab: TTab) => void
}

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`

const Wrapper = styled.div`
  .tab-item {
    color: rgba(255, 255, 255, 0.3);
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;

    &:nth-child(2) {
      position: relative;
      margin-left: 20px;

      &:before {
        content: '';
        display: inline-block;
        width: 2px;
        height: 29px;
        background: rgba(255, 255, 255, 0.3);
        position: absolute;
        left: -10px;
        top: 0;
      }
    }
  }

  .tab-item.active {
    color: var(--primary-secondary, #fb8618);
  }

  p {
    color: var(--dark-text-main-text, rgba(255, 255, 255, 0.87));
    font-size: 18px;
    font-weight: 700;
  }

  @media screen and (max-width: 640px) {
    .tab-item {
      font-size: 16px;
    }

    p {
      font-size: 14px;
    }
  }
`

const SwapHeader: React.FC<React.PropsWithChildren<Props>> = ({ activeTab, setActiveTab, onRefreshPrice }) => {
  const [expertMode] = useExpertModeManager()
  const { t } = useTranslation()
  const { query, pathname, push } = useRouter()
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  const handleOnClick = useCallback(() => onRefreshPrice?.(), [onRefreshPrice])

  const tabs = {
    xoxdex: {
      title: 'XOX Dex',
      subtitle: t('Trade tokens in an instant'),
      content: <div>This is the content of Tab 1</div>,
    },
    kyberswap: {
      title: 'Aggregator v1',
      subtitle: t('Trade tokens in an instant'),
      content: <div>This is the content of Tab 1</div>,
    },
  }

  const handleOnClickedTab = (tab: TTab) => {
    const updatedQuery = { ...query, tab: tab }

    push({
      pathname,
      query: updatedQuery,
    })
  }

  useEffect(() => {
    if (!query.tab) return

    setActiveTab(query.tab === 'xoxdex' ? 'xoxdex' : 'kyberswap')
  }, [query])

  return (
    <Swap.CurrencyInputHeader
      title={
        <Flex width="100%" justifyContent="space-between">
          <Flex flexDirection="column" alignItems="flex-start" width="100%" mr={18}>
            <Swap.CurrencyInputHeaderTitle>
              <Wrapper>
                <div>
                  <span
                    className={`tab-item ${activeTab === 'xoxdex' && 'active'}`}
                    onClick={() => handleOnClickedTab('xoxdex')}
                  >
                    {tabs.xoxdex.title}
                  </span>
                  <span
                    className={`tab-item ${activeTab === 'kyberswap' && 'active'}`}
                    onClick={() => handleOnClickedTab('kyberswap')}
                  >
                    {tabs.kyberswap.title}
                  </span>
                </div>
                <p>{activeTab === 'kyberswap' && t('Swap')}</p>
              </Wrapper>
            </Swap.CurrencyInputHeaderTitle>
            <Swap.CurrencyInputHeaderSubTitle>{tabs[activeTab].subtitle}</Swap.CurrencyInputHeaderSubTitle>
          </Flex>
          <Flex alignItems="baseline">
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

export default SwapHeader
