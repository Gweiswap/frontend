/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLClient, request, gql } from 'graphql-request'
import { ChainId } from '@pancakeswap/sdk'
import { ENDPOINT_GRAPHQL_WITH_CHAIN } from 'config/constants/endpoints'

// export const  ENDPOINT_GRAPHQL_WITH_CHAIN[chainId] = 'https://api.studio.thegraph.com/query/43777/dev-xox-lab-subgraph/v0.0.10'

export const getSaleStats = async (chainId = ChainId.GOERLI) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getStatsSale {
        saleStats {
          id
          total_raised_usd
          xox_amount_bought
          total_investor
          xoxs_amount_reward
        }
      }
    `,
  )
  return response
}

export const getRaiseDailies = async (from: number, to: number, chainId: ChainId) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getRaise {
        raiseDailies(where: { date_gte: ${from}, date_lte: ${to} }, orderBy: date, orderDirection: desc) {
          id,
          volumeUSD,
          date
        }
      }
    `,
  )
  return response
}

export const getUserPreSaleInfo = async (account: string, chainId = ChainId.GOERLI) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getInfoUserPreSale {
        userPreSaleDatas (where : {id :"${account?.toLowerCase()}"}) {
          id
          amountInvestUSD
          amountBoughtXOX
          amountBoughtXOXS
          amountClaimXOX
        }
      }
    `,
  )
  return response
}

export const getDataTransaction = async (chainId = ChainId.GOERLI) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getTransactionPreSales {
        transactionPreSales(where: { isInvest: true }, first: 100, orderBy: timestamp, orderDirection: desc) {
          id
          blockNumber
          timestamp
          round
          sender
          isInvest
          amountInvestUSD
          amountBoughtXOX
          amountBoughtXOXS
          amountClaimedXOX
        }
      }
    `,
  )
  return response
}

export const getDataTransactionOfUser = async (account: string, chainId = ChainId.GOERLI) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getTransactionPreSalesOfUser {
        transactionPreSales(where: {sender: "${account?.toLowerCase()}", isInvest: true},first: 100, orderBy: timestamp, orderDirection: desc) {
          id
          blockNumber
          timestamp
          round
          sender
          isInvest
          amountInvestUSD
          amountBoughtXOX
          amountBoughtXOXS
          amountClaimedXOX
        }
      }
    `,
  )
  return response
}

export const getDataTransactionClaimOfUser = async (account: string, chainId = ChainId.GOERLI) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getTransactionPreSalesOfUser {
        transactionPreSales(where: {sender: "${account?.toLowerCase()}", isInvest: false},first: 100, orderBy: timestamp, orderDirection: desc) {
          id
          blockNumber
          timestamp
          round
          sender
          isInvest
          amountClaimedXOX
        }
      }
    `,
  )
  return response
}

export const getDataRoundStats = async (chainId = ChainId.GOERLI) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getDataRoundStatsStatus {
        roundStats {
          id
          total_raised_usd
          xox_amount_bought
          xoxs_amount_reward
          total_investor
        }
      }
    `,
  )
  return response
}

export const getDataReferralPresale = async (account: string, chainId = ChainId.GOERLI) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getRefPresale {
        analysisSaleReferrals(where: { account: "${account?.toLowerCase()}" }) {
          id
          account
          rewardXOXS
          totalTransactionApplyReferral
        }
      }
    `,
  )
  return response
}
