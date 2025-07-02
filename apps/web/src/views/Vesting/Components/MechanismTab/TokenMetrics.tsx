import { useTranslation } from '@pancakeswap/localization'
import { Flex, Text } from '@pancakeswap/uikit'
import { useState } from 'react'
import styled from 'styled-components'
import { ClickableColumnHeader, CustomTableWrapper, Table } from '../MainInfoTab/SaleHistory'

interface IProps {
  initialTokenMetrics: any[]
}

const CustomTable = styled(Table)`
  grid-template-columns: 5fr 1.6fr 1.3fr 0.7fr 1.8fr 1.5fr 2fr;
  gap: 20px;

  &::before {
    top: 32px;
    border: 1px solid transparent;
  }

  .table-header {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
    padding-bottom: 16px;
    margin-bottom: 0px;

    @media screen and (max-width: 1200px) {
      margin-bottom: 0px;
    }
  }
`

const Wrapper = styled.div`
  .heading_info_vesting {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 30px;
      left: 0px;
      width: 40px;
      height: 4px;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    }
  }

  .text-token-metrics {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
  }

  .item_15,
  .item_14 {
    .text-token-metrics {
      font-weight: 700 !important;
    }
  }

  @media screen and (max-width: 1200px) {
    .heading_info_vesting {
      font-size: 16px;
      line-height: 19px;
    }
  }
`

const CustomTableSale = styled(CustomTableWrapper)`
  & > div {
    min-width: 1300px;
  }

  & > div:last-child {
    margin-bottom: 1px;
  }
  .item_15 {
    padding-bottom: 0px !important;
  }
  padding-top: 20px;
  gap: 0px;
`

const Row = styled(CustomTable)`
  border-top: 1px solid rgba(68, 68, 68, 1);
  padding-top: 16px;
  padding-bottom: 8px;

  &::before {
    border: 1px solid transparent;
  }

  &.item_15::before {
    border: 1px solid transparent;
  }
`

const DataRow = ({ item }) => {
  const { t } = useTranslation()
  return (
    <Row className={`item_${item.id}`}>
      <Text className="text-token-metrics">{t(item.title)}</Text>
      <Text className="text-token-metrics">
        {item.tokenAllocationPercent ? `${item.tokenAllocationPercent}%` : `-`}
      </Text>
      <Text className="text-token-metrics">
        {item.tokenAllocationPercent ? Number(item.tokenAllocation).toLocaleString() : '-'}
      </Text>
      <Text className="text-token-metrics">{item.tge}%</Text>
      <Text className="text-token-metrics">
        {item.tokenAllocationatTge ? Number(item.tokenAllocationatTge).toLocaleString() : '-'}
      </Text>
      <Text className="text-token-metrics">
        {item.initialMarketcap ? Number(item.initialMarketcap).toLocaleString() : '-'}
      </Text>
      <Text className="text-token-metrics" textAlign="right">
        {item.fullyDilitedMc ? Number(item.fullyDilitedMc).toLocaleString() : '-'}
      </Text>
    </Row>
  )
}

function TokenMetrics({ initialTokenMetrics }: IProps) {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Flex mb="16px" justifyContent="space-between">
        <Text
          className="heading_info_vesting"
          fontSize="20px"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="24px"
          color="rgba(255, 255, 255, 0.87)"
          height="24px"
        >
          Tokenomics:
        </Text>
      </Flex>
      <CustomTableSale>
        <CustomTable>
          <Text className="table-header">Tokenometrics</Text>
          <Text className="table-header">{t('Token Allocation')} (%)</Text>
          <Text className="table-header">{t('Token Allocation')}</Text>
          <Text className="table-header">TGE (%)</Text>
          <Text className="table-header">{t('Token Allocation at TGE')}</Text>
          <Text className="table-header">{t('Initial Marketcap')}</Text>
          <Text className="table-header">{t('Fully Dilited MC ($)')}</Text>
        </CustomTable>
        {Array.from(initialTokenMetrics).map((item, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <DataRow item={item} key={index} />
        })}
      </CustomTableSale>
    </Wrapper>
  )
}

export default TokenMetrics
