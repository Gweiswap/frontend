import styled from 'styled-components'
import { CheckmarkIcon, CloseIcon, ErrorIcon, Link, LinkExternal, OpenNewIcon } from '@pancakeswap/uikit'
import { getBlockExploreLink } from 'utils'
import { TransactionDetails } from 'state/transactions/reducer'
import CircleLoader from '../../Loader/CircleLoader'
import { useTranslation } from '@pancakeswap/localization'

const TransactionState = styled.div<{ pending: boolean; success?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none !important;
  font-weight: 400;
  line-height: 24px;
  font-size: 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.primary};
  @media (max-width: 576px) {
    justify-content: space-between;
  }
`
const TransactionText = styled(LinkExternal)`
  color: rgba(255, 255, 255, 0.87);
  font-weight: 400;
  margin-right: 10px;
  font-size: 16px;
  @media (max-width: 576px) {
    font-size: 14px;
  }
`

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

const IconWrapper = styled.div<{ pending: boolean; success?: boolean }>`
  color: ${({ pending, success, theme }) =>
    pending ? theme.colors.primary : success ? theme.colors.success : theme.colors.failure};
  display: flex;
`

export default function Transaction({
  tx,
  chainId,
  hiddenIcon = false,
}: {
  tx: TransactionDetails
  chainId: number
  hiddenIcon?: boolean
}) {
  const { t } = useTranslation()
  const summary = tx?.translatableSummary ? t(tx.translatableSummary?.text, tx.translatableSummary?.data) : tx?.summary
  const pending = !tx?.receipt
  const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')

  if (!chainId) return null

  return (
    <TransactionState pending={pending} success={success}>
      <TransactionText href={getBlockExploreLink(tx.hash, 'transaction', chainId)} hiddenIcon={hiddenIcon}>
        {summary ?? tx.hash}
      </TransactionText>
      {hiddenIcon && (
        <IconLink href={getBlockExploreLink(tx.hash, 'transaction', chainId)} target="_blank">
          <OpenNewIcon style={{ marginLeft: '8px', fill: 'transparent' }} />
        </IconLink>
      )}
      <IconWrapper pending={pending} success={success}>
        {pending ? <CircleLoader /> : success ? <CheckmarkIcon color="success" /> : <ErrorIcon color="failure" />}
      </IconWrapper>
    </TransactionState>
  )
}
