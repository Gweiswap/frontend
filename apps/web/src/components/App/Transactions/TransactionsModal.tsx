import { useCallback } from 'react'
import { Modal, ModalBody, Text, Button, Flex, InjectedModalProps, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import isEmpty from 'lodash/isEmpty'
import groupBy from 'lodash/groupBy'
import styled from 'styled-components'
import { useAllSortedRecentTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import { useAppDispatch } from 'state'
import { clearAllTransactions } from 'state/transactions/actions'
import { chains } from 'utils/wagmi'
import { useAccount } from 'wagmi'
import { AutoRow } from '../../Layout/Row'
import Transaction from './Transaction'
import ConnectWalletButton from '../../ConnectWalletButton'
import { useRouter } from 'next/router'

const RecentButton = styled(Button)`
  width: 98px;
  height: 37px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;
`
const NoTransaction = styled.div`
  text-align: center;
  &img {
    max-width: 158px;
    max-height: 160px;
    width: 100%;
    height: 100%;
    margin-bottom: 16px;
  }
`
const ConnectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
  button {
    width: 100%;
    max-width: 268px;
  }
`
const NoTransactionText = styled(Text)`
  margin-top: 16px;
  color: #ffffff99;
`

const TitleTransactionText = styled(Text)`
  font-size: 16px;
  line-height: 19px;
  color: 'FFFFFFDE';
  margin-bottom: 20px;
  @media (max-width: 576px) {
    font-size: 14px;
  }
`

function renderTransactions(transactions: TransactionDetails[], chainId: number, hiddenIcon: boolean) {
  return (
    <Flex flexDirection="column" mb="8px">
      {transactions.map((tx) => {
        return <Transaction key={tx.hash + tx.addedTime} tx={tx} chainId={chainId} hiddenIcon={hiddenIcon} />
      })}
    </Flex>
  )
}

const TransactionsModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const dispatch = useAppDispatch()
  const { address: account } = useAccount()
  const { query } = useRouter()
  const sortedRecentTransactions = useAllSortedRecentTransactions(query?.tab === 'kyberswap')
  const { isMobile } = useMatchBreakpoints()

  const { t } = useTranslation()

  const hasTransactions = !isEmpty(sortedRecentTransactions)

  const clearAllTransactionsCallback = useCallback(() => {
    dispatch(clearAllTransactions())
  }, [dispatch])

  return (
    <Modal title={t('Recent Transactions')} pb="32px" onDismiss={onDismiss}>
      {account ? (
        <ModalBody style={{ width: hasTransactions ? '495px' : 'unset', maxWidth: '100%' }}>
          {hasTransactions ? (
            <>
              <AutoRow mb="1rem" style={{ justifyContent: 'space-between' }}>
                <Text fontSize="18px" fontWeight="700" lineHeight="22px" color="rgba(255, 255, 255, 0.87)">
                  {t('Recent Transactions')}
                </Text>
                <RecentButton variant="tertiary" scale="xs" onClick={clearAllTransactionsCallback}>
                  {t('Clear All')}
                </RecentButton>
              </AutoRow>
              <div style={{ maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden' }}>
                {Object.entries(sortedRecentTransactions).map(([chainId, transactions]) => {
                  const chainIdNumber = Number(chainId)
                  const groupedTransactions = groupBy(Object.values(transactions), (trxDetails) =>
                    Boolean(trxDetails.receipt),
                  )

                  const confirmed = groupedTransactions.true ?? []
                  const pending = groupedTransactions.false ?? []

                  return (
                    <>
                      <TitleTransactionText>
                        {chains.find((c) => c.id === chainIdNumber)?.name ?? 'Unknown network'}
                      </TitleTransactionText>
                      <div key={`transactions#${chainIdNumber}`}>
                        {renderTransactions(pending, chainIdNumber, isMobile)}
                        {renderTransactions(confirmed, chainIdNumber, isMobile)}
                      </div>
                    </>
                  )
                })}
              </div>
            </>
          ) : (
            <NoTransaction>
              <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/swap/no-recent-transaction.png`} alt="" />
              <NoTransactionText>{t('No recent transactions')}</NoTransactionText>
            </NoTransaction>
          )}
        </ModalBody>
      ) : (
        <ConnectBox>
          <ConnectWalletButton />
        </ConnectBox>
      )}
    </Modal>
  )
}

export default TransactionsModal
