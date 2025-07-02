/* eslint-disable react-hooks/rules-of-hooks */
// TODO PCS refactor ternaries
/* eslint-disable no-nested-ternary */
import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import truncateHash from '@pancakeswap/utils/truncateHash'
import { Box, Flex, LinkExternal, Skeleton, Text, Button, Link, Select, Input } from '@pancakeswap/uikit'
import { formatISO9075 } from 'date-fns'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import {
  useGetChainName,
  useProtocolTransactionsSWR,
  useWidthDrawStableCoinSWR,
  useStakeStableCoinSWR,
  useMyWidthDrawStableCoinSWR,
} from 'state/info/hooks'
import { Transaction, TransactionFrom, TransactionType } from 'state/info/types'
import styled from 'styled-components'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { getBlockExploreLink } from 'utils'
import { formatAmount } from 'utils/formatInfoNumbers'
import { formatUnits } from '@ethersproject/units'
import { USD_DECIMALS } from 'config/constants/exchange'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import axios from 'axios'
import { Tooltip } from '@mui/material'
import { Arrow, ClickableColumnHeader } from '../Info/components/InfoTables/shared'
import BigNumber from 'bignumber.js'

export const TYPE_HISTORY = {
  widthDraw: 'WIDTH_DRAW',
  stake: 'STAKE',
  myWidthDraw: 'MY_WIDTH_DRAW',
}

const Wrapper = styled.div`
  width: 100%;
  grid-column: 1;
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
      margin-bottom: 20px;
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
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  }

  & .total {
    padding-top: 25px;
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
    padding: 10px 16px;
  }

  .btn-filter button.inactive {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  @media (max-width: 576px) {
    & .heading {
      font-size: 16px;
    }

    & .total {
      padding-top: 0px;
      font-size: 12px;
    }
    & .size-14 {
      font-size: 14px !important;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-column: 1 / span 2;
    & > div {
      max-width: 100%;
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
  }
`

const Table = styled.div`
  display: grid;
  grid-gap: 16px 25px;
  align-items: center;
  position: relative;
  grid-template-columns: 0.15fr 1.4fr 1.2fr 0.8fr;
  &.table-withdraw {
    grid-gap: 15px 25px;
  }
  .text-ellipsis {
    max-width: 90px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
  }
  .table-header {
    margin-bottom: 16px;
  }

  .flex-username {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 30px;
      object-fit: cover;
      height: 30px;
      border-radius: 50%;
    }
  }

  @media (max-width: 576px) {
    grid-gap: 15px 25px;
    .table-header {
      font-size: 14px;
    }
    div[font-size='16px'] {
      font-size: 14px;
      white-space: nowrap;
    }
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
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: absolute;
    top: 35px;
  }
`

export const CustomTableWrapper = styled(Flex)`
  width: calc(100vw - 96px);
  flex-direction: column;
  gap: 16px;
  overflow-x: auto;
  min-height: 230px;
  width: fit-content;
  min-width: 100%;
  margin-bottom: 20px;
  .table {
    width: fit-content;
    min-width: 100%;
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
    width: 100%;
    margin-bottom: 0px;
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

  .footer_page {
    .footer_input {
      box-shadow: none !important;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: flex-end;

    & > div {
      margin-top: 20px;
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
    width: 32px;
    height: 32px;
    border: none;
    outline: none;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
  }

  & .page.current {
    color: #fb8618;
    background: rgba(251, 134, 24, 0.1);
    font-weight: 700;
    border-radius: 4px;
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
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background: transparent;
  }
`

const SORT_FIELD = {
  timestamp: 'timestamp',
  amount: 'amount',
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

const decimalCount = (n: any) => {
  if (!n) return false
  const nString = parseFloat(n).toString()
  if (nString.split('.')[1]?.length < 7) {
    return false
  }
  return true
}

const formatNumberDecimal = (n: any, decimal?: number) => {
  let nString = parseFloat(n).toString()
  if (nString.indexOf('e') !== -1) {
    nString = parseFloat(n).toFixed(15).toString()
  }
  const nSlice = decimal || 6
  return `${nString.split('.')[0]}.${nString.split('.')?.[1]?.slice(0, nSlice) || 0}`
}

const DataRow: React.FC<
  React.PropsWithChildren<{ transaction: any; index: number; page: number; perPage: number; typePage: any }>
> = ({ transaction, index, page, perPage, typePage }) => {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  const abs0 = formatUnits(transaction?.amount?.split('.')?.[0], USD_DECIMALS[chainId])
  const chainIdLink = [1, 5, 56, 97].some((it) => it === chainId) ? chainId : ChainId.ETHEREUM
  const symbolToken0 =
    typePage === TYPE_HISTORY.stake
      ? 'XOXS'
      : chainId === ChainId.BSC || chainId === ChainId.BSC_TESTNET
      ? 'USDT'
      : 'USDC'

  const onImageError = (e: any) => {
    // eslint-disable-next-line no-param-reassign
    e.target.src = `${process.env.NEXT_PUBLIC_ASSETS_URI}images/default_avatar.jpg`
  }

  return (
    <>
      <Text
        className="size-14"
        fontSize="16px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="19px"
        color="rgba(255, 255, 255, 0.87)"
        key={`${transaction.hash}-id`}
      >
        {index + 1 + (page - 1) * perPage}
      </Text>
      {typePage === TYPE_HISTORY.myWidthDraw && (
        <LinkExternal
          color="#FB8618"
          href={getBlockExploreLink(transaction.hash, 'transaction', chainIdLink)}
          key={`${transaction.hash}-type`}
        >
          <Text
            fontSize="16px"
            className="size-14"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.87)"
          >
            {t('Withdraw')}
          </Text>
        </LinkExternal>
      )}
      {typePage === TYPE_HISTORY.widthDraw && (
        <Text
          fontSize="16px"
          className="size-14 flex-username"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="19px"
          color="rgba(255, 255, 255, 0.87)"
        >
          {transaction?.avatar ? (
            <img src={transaction?.avatar} alt="avatar" onError={onImageError} />
          ) : (
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/default_avatar.jpg`} alt="images" />
          )}
          {transaction?.username}
        </Text>
      )}
      <Text
        fontSize="16px"
        fontFamily="Inter"
        className="size-14"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="19px"
        color="rgba(255, 255, 255, 0.87)"
        key={`${transaction.hash}-time`}
        style={{ whiteSpace: 'nowrap' }}
      >
        {formatISO9075(parseInt(transaction.date, 10) * 1000)}
      </Text>
      {typePage !== TYPE_HISTORY.widthDraw && (
        <Text
          fontSize="16px"
          fontFamily="Inter"
          className="size-14"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="19px"
          color="rgba(255, 255, 255, 0.87)"
        >
          <Tooltip title={abs0 ? `${abs0} ${symbolToken0}` : null} placement="top-start">
            <span>
              {formatNumberDecimal(abs0)}
              {decimalCount(abs0) && typePage !== TYPE_HISTORY.stake ? '...' : ''}
              &nbsp;{`${symbolToken0}`}
            </span>
          </Tooltip>
        </Text>
      )}
      {typePage === TYPE_HISTORY.widthDraw && (
        <LinkExternal
          color="#FB8618"
          href={getBlockExploreLink(transaction.hash, 'transaction', chainIdLink)}
          key={`${transaction.hash}-type`}
        >
          <Text
            fontSize="16px"
            fontFamily="Inter"
            className="size-14"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.87)"
          >
            <Tooltip title={abs0 ? `${abs0} ${symbolToken0}` : null} placement="top-start">
              <span>
                {formatNumberDecimal(abs0)}
                {decimalCount(abs0) ? '...' : ''}
                &nbsp;{`${symbolToken0}`}
              </span>
            </Tooltip>
          </Text>
        </LinkExternal>
      )}
      {typePage === TYPE_HISTORY.stake && (
        <Text
          fontSize="16px"
          fontFamily="Inter"
          className="size-14"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="19px"
          color="rgba(255, 255, 255, 0.87)"
          key={`${transaction.hash}-token0`}
        >{`${transaction?.apy}%`}</Text>
      )}
    </>
  )
}

const HistoryTable = ({ typePage }: { typePage?: string }) => {
  const [sortField, setSortField] = useState(SORT_FIELD.timestamp)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const { account } = useActiveWeb3React()
  const [iconSortField, setIconSortField] = useState<any>(null)
  const [iconSortDirection, setIconSortDirection] = useState<any>(null)
  const [perPage, setPerPage] = useState(5)
  const [tempPage, setTempPage] = useState('1')
  const dataTable =
    typePage === TYPE_HISTORY.stake
      ? useStakeStableCoinSWR(account)
      : typePage === TYPE_HISTORY.widthDraw
      ? useWidthDrawStableCoinSWR()
      : useMyWidthDrawStableCoinSWR(account)
  const [currentTransactions, setCurrentTransactions] = useState([])

  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [txFilter, setTxFilter] = useState<TransactionType | undefined>(undefined)

  const handleChangeTempPage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[\d]*$/.test(e.target.value)) setTempPage(e.target.value)
  }, [])

  const sortedTransactions = useMemo(() => {
    const toBeAbsList = [SORT_FIELD.timestamp, SORT_FIELD.amount]
    return currentTransactions
      ? currentTransactions
          .slice(0, 300)
          .filter((x) => {
            return txFilter === undefined || x.type === txFilter
          })
          .map((item: any) => {
            return { ...item }
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
  }, [currentTransactions, page, sortField, sortDirection, txFilter, perPage])

  // Update maxPage based on amount of items & applied filtering
  useEffect(() => {
    if (currentTransactions) {
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
  }, [currentTransactions, txFilter, perPage])

  const handleFilter = useCallback(
    (newFilter: TransactionType) => {
      if (newFilter !== txFilter) {
        setTxFilter(newFilter)
        setPage(1)
      }
    },
    [txFilter],
  )

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
      setIconSortField(newField !== SORT_FIELD.amount ? null : !iconSortField)
      setIconSortDirection(newField !== SORT_FIELD.timestamp ? null : !iconSortDirection)
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

  const loadDataWithDraw = async () => {
    const listAddress = dataTable?.transactionsXOX?.map((item) => item.address)
    if (listAddress.length > 0) {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/users/address/mapping`, {
        wallets: listAddress,
      })
      const dataMapping: any = dataTable?.transactionsXOX?.map((item: any, index: any) => {
        const dataUserInfos = response.data
        const userInfo = dataUserInfos?.find((user) => item.address === user.address)
        return {
          ...item,
          username: userInfo?.username ?? null,
          avatar: userInfo?.avatar ?? null,
        }
      })
      setCurrentTransactions(dataMapping)
    }
  }

  useEffect(() => {
    if (dataTable) {
      if (typePage === TYPE_HISTORY.widthDraw) {
        loadDataWithDraw()
      } else {
        setCurrentTransactions(dataTable?.transactionsXOX)
      }
    }
  }, [dataTable])

  useEffect(() => {
    setTempPage(page.toString())
  }, [page])

  useEffect(() => {
    setPage(1)
  }, [perPage])

  return (
    <Wrapper>
      <Flex mb="8px" justifyContent="space-between">
        <Text
          className="heading"
          fontSize="20px"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="24px"
          color="rgba(255, 255, 255, 0.87)"
          height="24px"
        >
          {typePage === TYPE_HISTORY.stake && t('Stake History')}
          {(typePage === TYPE_HISTORY.widthDraw || typePage === TYPE_HISTORY.myWidthDraw) && t('Withdraw History')}
        </Text>
      </Flex>
      <CustomTableWrapper className="history-table">
        <Table className={typePage === TYPE_HISTORY.widthDraw ? 'table-withdraw table' : 'table'}>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            {t('No')}
          </Text>
          {typePage === TYPE_HISTORY.myWidthDraw && (
            <Text
              fontSize="16px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="19px"
              color="rgba(255, 255, 255, 0.6)"
              className="table-header"
            >
              {t('Action')}
            </Text>
          )}
          {typePage === TYPE_HISTORY.widthDraw && (
            <Text
              fontSize="16px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="19px"
              color="rgba(255, 255, 255, 0.6)"
              className="table-header"
            >
              {t('Username')}
            </Text>
          )}
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            {t('Time')}
          </Text>
          <ClickableColumnHeader
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            onClick={() => handleSort(SORT_FIELD.amount)}
            className="table-header"
          >
            <Flex alignItems="center">
              <span style={{ marginRight: '12px' }}>{t('Amount')}</span>{' '}
              {iconSortField === null ? IconSort : iconSortField ? IconDown : IconUp}
            </Flex>
          </ClickableColumnHeader>
          {typePage === TYPE_HISTORY.stake && (
            <Text
              fontSize="16px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="19px"
              color="rgba(255, 255, 255, 0.6)"
              className="table-header"
            >
              {t('APY')}
            </Text>
          )}

          {/* <Break /> */}

          {currentTransactions ? (
            <>
              {sortedTransactions.map((transaction, index) => {
                if (transaction) {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={index}>
                      <DataRow
                        transaction={transaction}
                        index={index}
                        page={page}
                        perPage={perPage}
                        typePage={typePage}
                      />
                    </Fragment>
                  )
                }
                return null
              })}
            </>
          ) : (
            <>
              <TableLoader />
              {/* spacer */}
              <Box />
            </>
          )}
        </Table>
        {sortedTransactions.length === 0 ? (
          <Flex justifyContent="center" style={{ margin: '100px 0' }}>
            <Text>{t('No Transactions')}</Text>
          </Flex>
        ) : undefined}
      </CustomTableWrapper>
      {currentTransactions && currentTransactions?.length >= 1 && (
        <PageButtons>
          <div>
            <Arrow
              onClick={() => {
                setPagePagination(page === 1 ? page : page - 1)
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
                <path
                  d="M5.97949 1.25L1.72949 5.5L5.97949 9.75"
                  stroke={page === 1 ? 'white' : '#FB8618'}
                  strokeOpacity={page === 1 ? '0.38' : '1'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Arrow>

            <Flex>
              {maxPage <= 5 ? (
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
                      <button type="button" className="page" onClick={() => setPagePagination(1)}>
                        1
                      </button>
                      <button type="button" className="page" onClick={() => setPagePagination(page - 3)}>
                        ...
                      </button>
                      {/* <button type="button" className="page" onClick={() => setPagePagination(page - 2)}>
                        {page - 2}
                      </button> */}
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
                      {/* <button type="button" className="page" onClick={() => setPagePagination(page + 2)}>
                        {page + 2}
                      </button> */}
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
            </Flex>

            <Arrow
              onClick={() => {
                setPagePagination(page === maxPage ? page : page + 1)
              }}
            >
              <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.72949 1.25L5.97949 5.5L1.72949 9.75"
                  stroke="#FB8618"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Arrow>
          </div>
          <div className="footer_page">
            <Select
              options={[
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
              ]}
              onOptionChange={(option: any) => setPerPage(option.value)}
              className="select-page"
            />
            <Text className="go-page" style={{ whiteSpace: 'nowrap' }}>
              {t('Go to page')}
            </Text>
            <Input
              className="footer_input"
              value={tempPage}
              onChange={handleChangeTempPage}
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

export default HistoryTable
