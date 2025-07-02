// TODO PCS refactor ternaries
/* eslint-disable no-nested-ternary */
import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import truncateHash from '@pancakeswap/utils/truncateHash'
import { Box, Flex, LinkExternal, Skeleton, Text, Button, Link, Select, Input } from '@pancakeswap/uikit'
import { formatISO9075 } from 'date-fns'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useProtocolTransactionsSWR } from 'state/info/hooks'
import { Transaction, TransactionFrom, TransactionType } from 'state/info/types'
import styled from 'styled-components'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { getBlockExploreLink } from 'utils'
import { formatAmount } from 'utils/formatInfoNumbers'
import { isMobile } from 'react-device-detect'
import { Arrow, ClickableColumnHeader } from './shared'

const Wrapper = styled.div`
  width: 100%;
  grid-column: 1;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 18px;
  position: relative;

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  & > div {
    max-width: calc(100vw - 80px);
  }

  & > div:first-child {
    display: flex;
    flex-direction: column;

    & > div {
      align-items: flex-start;
    }

    & > div:first-child {
      margin-bottom: 28px;
    }
  }

  & .heading {
    position: relative;
  }

  & .heading:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 4px;
    background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
  }

  .btn-filter button {
    height: 37px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    margin-right: 8px;
    padding: 10px 10px;
    :hover {
      opacity: 0.8 !important;
    }
  }

  .btn-filter button.inactive {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-column: 1 / span 2;
    padding: 24px;

    & > div {
      max-width: calc(100vw - 96px);
    }

    .btn-filter button {
      margin-right: 0;
      margin-left: 8px;
    }

    & > div:first-child {
      display: flex;
      flex-direction: row;

      & > div {
        align-items: flex-end;
      }

      & > div:first-child {
        margin-bottom: 28px;
      }
    }

    .btn-filter button {
      padding: 10px 16px;
    }
    .corner1 {
      border-bottom: 1px solid #ffffff30;
      border-left: 1px solid #ffffff30;
    }

    .edge1 {
      width: 1px;
    }

    .corner2 {
      border-bottom: 1px solid #ffffff30;
      border-right: 1px solid #ffffff30;
    }

    .edge2 {
      width: 1px;
    }
  }
`

const Table = styled.div`
  display: grid;
  grid-gap: 16px 10px;
  align-items: center;
  position: relative;
  grid-template-columns: 0.15fr 1.4fr 1.1fr repeat(3, 0.8fr) 0.93fr 0.81fr;
  .table-header {
    margin-bottom: 16px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: 24px 25px;

    .table-header {
      margin-bottom: 8px;
    }
  }

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 0px;
    border: 1px solid #444444;
    position: absolute;
    top: 35px;
  }
`

export const CustomTableWrapper = styled(Flex)`
  /* width: calc(100vw - 96px); */
  padding-top: 24px;
  flex-direction: column;
  gap: 16px;
  overflow-x: auto;

  & > div:last-child {
    margin-bottom: 16px;
  }

  & > div {
    min-width: 1300px;
  }

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444444;
    transform: matrix(0, -1, -1, 0, 0, 0);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 10px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    /* width: calc(100vw - 152px); */
  }
`

export const PageButtons = styled(Flex)`
  // width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 3px;

  & > div:first-child {
    margin-bottom: 13px;
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: flex-end;

    & > div {
      margin-top: 8px;
    }

    & > div:first-child {
      margin-bottom: 0;
    }
  }

  & .page {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
    width: 37px;
    height: 37px;
    border: none;
    outline: none;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
  }

  & .page.current {
    background: rgba(255, 255, 255, 0.05);
    background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: 700;
  }

  & .go-page {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
    min-width: 94px;
    padding: 0 10px;
  }

  & input {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
    width: 70px;
    height: 37px;
    border: 1px solid #444444;
    border-radius: 4px;
    background: transparent;
  }
`

const NoTransactionWrapper = styled(Flex)`
  grid-column: 1 / span 2;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-column: 1 / span 7;
  }
`

const CustomLink = styled(Link)`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: right;

  /* Gradient/9 */

  background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`

const StyledActionText = styled(Text)`
  :hover {
    text-decoration: underline;
    text-decoration-color: #fb8618;
  }
`

const SORT_FIELD = {
  timestamp: 'timestamp',
  amountUSD: 'amountUSD',
  stableCoin: 'amountStable',
}

const TableLoader: React.FC<React.PropsWithChildren> = () => {
  const loadingRow = useCallback((key: number) => {
    return (
      <>
        <Skeleton key={`${key}-1`} />
        <Skeleton key={`${key}-2`} />
        <Skeleton key={`${key}-3`} />
        <Skeleton key={`${key}-4`} />
        <Skeleton key={`${key}-5`} />
        <Skeleton key={`${key}-6`} />
        <Skeleton key={`${key}-7`} />
        <Skeleton key={`${key}-8`} />
      </>
    )
  }, [])

  return (
    <>
      {loadingRow(1)}
      {loadingRow(2)}
      {loadingRow(3)}
    </>
  )
}

const DataRow: React.FC<
  React.PropsWithChildren<{
    transaction: Transaction
    index: number
    page: number
    perPage: number
  }>
> = ({ transaction, index, page, perPage }) => {
  const { t } = useTranslation()
  const abs0 = Math.abs(transaction.amountToken0)
  const abs1 = Math.abs(transaction.amountToken1)
  const { chainId } = useActiveChainId()
  const chainIdLink = [1, 5, 56, 97].some((it) => it === chainId) ? chainId : ChainId.ETHEREUM
  const symbolToken0 = transaction.token0Symbol === 'xox' ? 'XOX' : transaction.token0Symbol
  const symbolToken1 = transaction.token1Symbol === 'xox' ? 'XOX' : transaction.token1Symbol

  const outputTokenSymbol = transaction.amountToken0 < 0 ? symbolToken0 : symbolToken1
  const inputTokenSymbol = transaction.amountToken1 < 0 ? symbolToken0 : symbolToken1

  const amountUSD =
    inputTokenSymbol === 'USDC' || inputTokenSymbol === 'BUSD'
      ? transaction.amountToken1 < 0
        ? abs0
        : abs1
      : transaction.amountToken0 < 0
      ? abs0 / 0.9
      : abs1 / 0.9
  // if (transactionFrom === TransactionFrom.XOX) {
  //   if (transaction.amountToken1 < 0) {
  //     console.log(transaction.amountToken1, symbolToken0)
  //     if (symbolToken0 === 'USDC' || symbolToken0 === 'BUSD') {
  //       amountUSD = abs1
  //     } else {
  //       amountUSD = abs1 / 0.9
  //     }
  //   } else {
  //     if (symbolToken1 === 'USDC' || symbolToken1 === 'BUSD') {
  //       amountUSD = abs0
  //     } else {
  //       amountUSD = abs0 / 0.9
  //     }
  //   }
  // }
  const stablCoin =
    (inputTokenSymbol === 'USDC' || inputTokenSymbol === 'USDT') && outputTokenSymbol?.toLocaleLowerCase() === 'xox'
      ? `${formatAmount(abs1 * 0.1)} XOXS`
      : '--'

  return (
    <>
      <Text
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        color="rgba(255, 255, 255, 0.87)"
        key={`${transaction.hash}-id`}
      >
        {index + 1 + (page - 1) * perPage}
      </Text>
      <LinkExternal
        href={getBlockExploreLink(transaction.hash, 'transaction', chainIdLink)}
        key={`${transaction.hash}-type`}
      >
        <StyledActionText
          fontSize={['14px', , '16px']}
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="400"
          lineHeight={['17px', , '19px']}
          color="rgba(255, 255, 255, 0.87)"
          mr="4px"
        >
          {transaction.type === TransactionType.MINT
            ? t('Add %token0% and %token1%', { token0: symbolToken0, token1: symbolToken1 })
            : transaction.type === TransactionType.SWAP
            ? t('Swap %token0% for %token1%', { token0: inputTokenSymbol, token1: outputTokenSymbol })
            : t('Remove %token0% and %token1%', { token0: symbolToken0, token1: symbolToken1 })}
        </StyledActionText>
      </LinkExternal>
      <Text
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        color="rgba(255, 255, 255, 0.87)"
        key={`${transaction.hash}-time`}
      >
        {formatISO9075(parseInt(transaction.timestamp, 10) * 1000)}
      </Text>
      <Text
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        color="rgba(255, 255, 255, 0.87)"
      >
        ${formatAmount(transaction.amountUSD === 0 ? amountUSD : transaction.amountUSD)}
      </Text>
      <Text
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        color="rgba(255, 255, 255, 0.87)"
        key={`${transaction.hash}-token0`}
      >{`${formatAmount(abs0)} ${transaction.token0Symbol.toUpperCase()}`}</Text>
      <Text
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        color="rgba(255, 255, 255, 0.87)"
        key={`${transaction.hash}-token1`}
      >
        {`${formatAmount(abs1)} ${transaction.token1Symbol.toUpperCase()}`}
      </Text>
      <Text
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        color="rgba(255, 255, 255, 0.87)"
        key={`${transaction.hash}-stable-coin`}
      >
        {stablCoin}
      </Text>
      <CustomLink
        width="100%"
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        style={{ justifySelf: 'right' }}
        target="_blank"
        href={getBlockExploreLink(transaction.sender, 'address', chainIdLink)}
        key={`${transaction.hash}-sender`}
      >
        {truncateHash(transaction.sender, 4, 5)}
      </CustomLink>
    </>
  )
}

const TransactionsTable: React.FC = () => {
  const [sortField, setSortField] = useState(SORT_FIELD.timestamp)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const [sortStable, setSortStable] = useState<boolean>(false)
  const [iconSortField, setIconSortField] = useState<any>(null)
  const [iconSortDirection, setIconSortDirection] = useState<any>(null)
  const [iconSortStable, setIconSortStable] = useState<any>(null)
  const [perPage, setPerPage] = useState(5)
  const [tempPage, setTempPage] = useState('1')
  const { chainId } = useActiveChainId()
  const [transactionFrom, setTransactionFrom] = useState<TransactionFrom>(TransactionFrom.XOX)
  const [currentTransactions, setCurrentTransactions] = useState([])
  const transactions = useProtocolTransactionsSWR()
  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [txFilter, setTxFilter] = useState<TransactionType | undefined>(undefined)

  const handleChangeTempPage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[\d]*$/.test(e.target.value)) setTempPage(e.target.value)
  }, [])

  const pageOptions = useMemo(() => {
    return [
      {
        value: 5,
        label: t('%number%/Page', { number: 5 }),
      },
      {
        value: 10,
        label: t('%number%/Page', { number: 10 }),
      },
      {
        value: 20,
        label: t('%number%/Page', { number: 20 }),
      },
      {
        value: 50,
        label: t('%number%/Page', { number: 50 }),
      },
      {
        value: 100,
        label: t('%number%/Page', { number: 100 }),
      },
    ]
  }, [])

  const handleFilter = useCallback(
    (newFilter: TransactionType) => {
      if (newFilter !== txFilter) {
        setTxFilter(newFilter)
        setPage(1)
      }
    },
    [txFilter],
  )

  const handleFilterFrom = useCallback(
    (newFilterFrom: TransactionFrom) => {
      if (newFilterFrom !== transactionFrom) {
        setTransactionFrom(newFilterFrom)
        setPage(1)
        if (newFilterFrom === TransactionFrom.XOX) {
          setTxFilter(undefined)
        } else {
          setTxFilter(TransactionType.SWAP)
        }
      }
    },
    [transactionFrom],
  )

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
      setSortStable(newField !== SORT_FIELD.stableCoin ? false : !sortStable)
      setIconSortField(newField !== SORT_FIELD.amountUSD ? null : !iconSortField)
      setIconSortDirection(newField !== SORT_FIELD.timestamp ? null : !iconSortDirection)
      setIconSortStable(newField !== SORT_FIELD.stableCoin ? null : !iconSortStable)
    },
    [sortDirection, sortField],
  )

  const setPagePagination = useCallback(
    (p: number) => {
      if (p < 1) {
        setPage(1)
        return
      }
      if (p > maxPage) {
        setPage(maxPage)
        return
      }
      setPage(p)
    },
    [maxPage],
  )

  const IconUp = (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" fill="none">
      <path d="M4.66675 2.22168V8.33279V2.22168Z" fill="#8E8E8E" />
      <path
        d="M4.66675 2.22168V8.33279"
        stroke="#8E8E8E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 4.66667L4.66667 1L8.33333 4.66667"
        stroke="#8E8E8E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const IconDown = (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" fill="none">
      <path d="M8.33276 14.666V8.5549V14.666Z" fill="#8E8E8E" />
      <path
        d="M8.33276 14.666V8.55491"
        stroke="#8E8E8E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.6665 12.222L8.33317 15.8887L11.9998 12.222"
        stroke="#8E8E8E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const IconSort = useMemo(() => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" fill="none">
        <path d="M4.66675 2.22168V8.33279V2.22168Z" fill="#8E8E8E" />
        <path
          d="M4.66675 2.22168V8.33279"
          stroke="#8E8E8E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 4.66667L4.66667 1L8.33333 4.66667"
          stroke="#8E8E8E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8.33276 14.666V8.5549V14.666Z" fill="#8E8E8E" />
        <path
          d="M8.33276 14.666V8.55491"
          stroke="#8E8E8E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.6665 12.222L8.33317 15.8887L11.9998 12.222"
          stroke="#8E8E8E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }, [])

  useEffect(() => {
    setTempPage(page.toString())
  }, [page])

  useEffect(() => {
    setPage(1)
  }, [perPage])

  useEffect(() => {
    setTxFilter(undefined)
    setTransactionFrom(TransactionFrom.XOX)
    setCurrentTransactions([])
    setPerPage(5)
  }, [chainId])

  useEffect(() => {
    setCurrentTransactions([])
  }, [])

  const handleSelectPerPage = useCallback(
    (value: any) => {
      setPerPage(value)
    },
    [perPage],
  )

  // Update maxPage based on amount of items & applied filtering
  useEffect(() => {
    if (!transactions) return

    let trans
    if (TransactionFrom.XOX === transactionFrom) {
      trans = [...transactions?.transactionsXOX]
    } else {
      trans = [...transactions?.transactionsOther]
    }
    setCurrentTransactions(trans)

    if (trans) {
      const filteredTransactions = currentTransactions
        .filter((tx) => {
          return txFilter === undefined || tx.type === txFilter
        })
        .slice(0, 300)
      if (filteredTransactions.length % perPage === 0) {
        setMaxPage(Math.floor(filteredTransactions.length / perPage))
      } else {
        setMaxPage(Math.floor(filteredTransactions.length / perPage) + 1)
      }
    }
  }, [transactions, txFilter, perPage])

  const sortedTransactions = useMemo(() => {
    if (!transactions) return []

    let trans
    if (TransactionFrom.XOX === transactionFrom) {
      trans = [...transactions?.transactionsXOX]
    } else {
      trans = [...transactions?.transactionsOther]
    }
    setCurrentTransactions(trans)
    const toBeAbsList = [SORT_FIELD.timestamp, SORT_FIELD.amountUSD, SORT_FIELD.stableCoin]
    return trans
      ? trans
          .slice(0, 300)
          .filter((x) => {
            return txFilter === undefined || x.type === txFilter
          })
          .map((item: any) => {
            const outputTokenSymbol = item.amountToken0 < 0 ? item.token0Symbol : item.token1Symbol
            const inputTokenSymbol = item.amountToken1 < 0 ? item.token0Symbol : item.token1Symbol
            const amountStable =
              inputTokenSymbol.indexOf('USD') !== -1 && outputTokenSymbol?.toLocaleLowerCase() === 'xox'
                ? item.amountUSD / 10 + 1
                : 0
            return { ...item, amountStable }
          })
          .sort((a, b) => {
            if (a && b) {
              const firstField = a[sortField as keyof Transaction]
              const secondField = b[sortField as keyof Transaction]
              const [first, second] = toBeAbsList.includes(sortField)
                ? [Math.abs(firstField as number), Math.abs(secondField as number)]
                : [firstField, secondField]
              return first > second ? (sortDirection ? -1 : 1) * 1 : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
          .slice(perPage * (page - 1), page * perPage)
      : []
  }, [transactions, page, sortField, sortDirection, sortStable, txFilter, perPage])

  return (
    <Wrapper>
      <div className="corner1"></div>
      <div className="edge1"></div>
      <div className="corner2"></div>
      <div className="edge2"></div>
      <Flex justifyContent="space-between" flexDirection={['column', , 'row']}>
        <Text
          className="heading"
          fontSize={['16px', , '20px']}
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="700"
          lineHeight={['19px', , '24px']}
          color="rgba(255, 255, 255, 0.87)"
          height="24px"
          mb={28}
        >
          {t('Transactions History')}
        </Text>
        <Flex flexDirection="column" alignItems={['flex-start', , 'flex-end']}>
          <Flex className="btn-filter" mb="8px">
            <Button
              onClick={() => handleFilterFrom(TransactionFrom.XOX)}
              className={TransactionFrom.XOX === transactionFrom ? 'active' : 'inactive'}
            >
              XOX
            </Button>
            {(chainId === 1 || chainId === 5) && (
              <Button
                onClick={() => handleFilterFrom(TransactionFrom.UNI)}
                className={TransactionFrom.UNI === transactionFrom ? 'active' : 'inactive'}
              >
                Uniswap
              </Button>
            )}
            {(chainId === 56 || chainId === 97) && (
              <Button
                onClick={() => handleFilterFrom(TransactionFrom.PANCAKE)}
                className={TransactionFrom.PANCAKE === transactionFrom ? 'active' : 'inactive'}
              >
                PancakeSwap
              </Button>
            )}
          </Flex>
          {transactionFrom === TransactionFrom.XOX && (
            <Flex className="btn-filter" mb="16px" justifyContent="space-between" width={'100%'}>
              <Button
                onClick={() => handleFilter(undefined)}
                className={undefined === txFilter ? 'active' : 'inactive'}
              >
                {t('All')}
              </Button>
              <Button
                onClick={() => handleFilter(TransactionType.SWAP)}
                className={TransactionType.SWAP === txFilter ? 'active' : 'inactive'}
              >
                {t('Swaps')}
              </Button>
              <Button
                onClick={() => handleFilter(TransactionType.MINT)}
                className={TransactionType.MINT === txFilter ? 'active' : 'inactive'}
              >
                {t('Adds')}
              </Button>
              <Button
                onClick={() => handleFilter(TransactionType.BURN)}
                className={TransactionType.BURN === txFilter ? 'active' : 'inactive'}
              >
                {t('Removes')}
              </Button>
            </Flex>
          )}
          <Text
            fontSize="14px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="17px"
            color="rgba(255, 255, 255, 0.6)"
          >
            {t('Total: %number% transactions', {
              number: currentTransactions ? (currentTransactions.length > 300 ? 300 : currentTransactions.length) : 0,
            })}
          </Text>
        </Flex>
      </Flex>
      <CustomTableWrapper>
        <Table>
          <Text
            fontSize={['14px', , '16px']}
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
            className="table-header"
          >
            {t('No')}
          </Text>
          <Text
            fontSize={['14px', , '16px']}
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
            className="table-header"
          >
            {t('Action')}
          </Text>
          <ClickableColumnHeader
            fontSize={['14px', , '16px']}
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
            onClick={() => handleSort(SORT_FIELD.timestamp)}
            className="table-header"
          >
            <Flex alignItems="center">
              <span style={{ marginRight: '12px' }}>{t('Excution Time')}</span>{' '}
              {iconSortDirection === null ? IconSort : iconSortDirection ? IconDown : IconUp}
            </Flex>
          </ClickableColumnHeader>
          <ClickableColumnHeader
            fontSize={['14px', , '16px']}
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
            onClick={() => handleSort(SORT_FIELD.amountUSD)}
            className="table-header"
          >
            <Flex alignItems="center">
              <span style={{ marginRight: '12px' }}>{t('Total Value')}</span>{' '}
              {iconSortField === null ? IconSort : iconSortField ? IconDown : IconUp}
            </Flex>
          </ClickableColumnHeader>
          <Text
            fontSize={['14px', , '16px']}
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
            className="table-header"
          >
            {t('Token Sent')}
          </Text>
          <Text
            fontSize={['14px', , '16px']}
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
            className="table-header"
          >
            {t('Token Received')}
          </Text>
          <ClickableColumnHeader
            fontSize={['14px', , '16px']}
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
            onClick={() => handleSort(SORT_FIELD.stableCoin)}
            className="table-header"
          >
            <Flex alignItems="center">
              <span style={{ marginRight: '12px' }}>{t('%asset% staked', { asset: 'XOXS' })}</span>
              {iconSortStable === null ? IconSort : iconSortStable ? IconDown : IconUp}
            </Flex>
          </ClickableColumnHeader>
          <Text
            fontSize={['14px', , '16px']}
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
            style={{ justifySelf: 'right' }}
            className="table-header"
          >
            {t('Maker')}
          </Text>
          {/* <Break /> */}

          {currentTransactions ? (
            <>
              {sortedTransactions.map((transaction, index) => {
                if (transaction) {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={index}>
                      <DataRow transaction={transaction} index={index} page={page} perPage={perPage} />
                    </Fragment>
                  )
                }
                return null
              })}
              {sortedTransactions.length === 0 ? (
                <NoTransactionWrapper justifyContent="center">
                  <Text textAlign="center">{t('No Transactions')}</Text>
                </NoTransactionWrapper>
              ) : undefined}
            </>
          ) : (
            <>
              <TableLoader />
              {/* spacer */}
              <Box />
            </>
          )}
        </Table>
      </CustomTableWrapper>

      {currentTransactions && currentTransactions.length > 0 && sortedTransactions.length > 0 && (
        <PageButtons>
          <div>
            <Arrow
              onClick={() => {
                setPagePagination(page === 1 ? page : page - 1)
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="11"
                viewBox="0 0 7 11"
                fill="none"
                style={{ transform: 'rotate(180deg' }}
              >
                <path
                  d="M1.72949 1.25L5.97949 5.5L1.72949 9.75"
                  stroke={page === 1 ? 'white' : 'url(#paint0_linear_11079_7639)'}
                  strokeOpacity={page === 1 ? '0.38' : '1'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_11079_7639"
                    x1="3.85449"
                    y1="9.75"
                    x2="3.85449"
                    y2="1.25"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#EE0979" />
                    <stop offset="1" stopColor="#FF6A00" />
                  </linearGradient>
                </defs>
              </svg>
            </Arrow>

            <Flex>
              {maxPage <= 7 ? (
                [...Array(maxPage)].map((_, i) => (
                  <button
                    type="button"
                    key={_}
                    onClick={() => setPagePagination(i + 1)}
                    className={`page ${page === i + 1 ? 'current' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))
              ) : (
                <>
                  {page - 2 <= 1 ? (
                    [...Array(page - 1)].map((_, i) => (
                      <button type="button" key={_} onClick={() => setPagePagination(i + 1)} className="page">
                        {i + 1}
                      </button>
                    ))
                  ) : (
                    <>
                      {!isMobile && (
                        <>
                          <button type="button" className="page" onClick={() => setPagePagination(1)}>
                            1
                          </button>
                          <button type="button" className="page" onClick={() => setPagePagination(page - 3)}>
                            ...
                          </button>
                        </>
                      )}
                      <button type="button" className="page" onClick={() => setPagePagination(page - 2)}>
                        {page - 2}
                      </button>
                      <button type="button" className="page" onClick={() => setPagePagination(page - 1)}>
                        {page - 1}
                      </button>
                    </>
                  )}
                  <button type="button" className="page current">
                    {page}
                  </button>
                  {page + 2 >= maxPage - 1 ? (
                    [...Array(maxPage - page)].map((_, i) => (
                      <button type="button" key={_} className="page" onClick={() => setPagePagination(page + i + 1)}>
                        {page + i + 1}
                      </button>
                    ))
                  ) : (
                    <>
                      <button type="button" className="page" onClick={() => setPagePagination(page + 1)}>
                        {page + 1}
                      </button>
                      <button type="button" className="page" onClick={() => setPagePagination(page + 2)}>
                        {page + 2}
                      </button>
                      {!isMobile && (
                        <>
                          <button type="button" className="page" onClick={() => setPagePagination(page + 3)}>
                            ...
                          </button>
                          <button type="button" className="page" onClick={() => setPagePagination(maxPage)}>
                            {maxPage}
                          </button>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </Flex>

            <Arrow
              onClick={() => {
                setPagePagination(page === maxPage ? page : page + 1)
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
                <path
                  d="M1.72949 1.25L5.97949 5.5L1.72949 9.75"
                  stroke={page === maxPage ? 'white' : 'url(#paint0_linear_11079_7639)'}
                  strokeOpacity={page === maxPage ? '0.38' : '1'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_11079_7639"
                    x1="3.85449"
                    y1="9.75"
                    x2="3.85449"
                    y2="1.25"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#EE0979" />
                    <stop offset="1" stopColor="#FF6A00" />
                  </linearGradient>
                </defs>
              </svg>
            </Arrow>
          </div>
          <div>
            <Select
              options={pageOptions}
              onOptionChange={(option: any) => handleSelectPerPage(option.value)}
              className="select-page"
              defaultOptionIndex={pageOptions.map(({ value }) => value).indexOf(perPage) + 1}
            />
            <Text className="go-page" style={{ whiteSpace: 'nowrap' }}>
              {t('Go to page')}
            </Text>
            <Input
              value={tempPage}
              onChange={handleChangeTempPage}
              style={{ boxShadow: 'none' }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  const p = parseInt(tempPage) || 1
                  if (p >= maxPage) {
                    setPagePagination(maxPage)
                    setTempPage(maxPage.toString())
                  } else {
                    setPagePagination(p)
                  }
                }
              }}
            />
          </div>
        </PageButtons>
      )}
    </Wrapper>
  )
}

export default TransactionsTable
