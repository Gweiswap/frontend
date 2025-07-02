import { ENDPOINT_GRAPHQL_WITH_CHAIN } from 'config/constants/endpoints'
import { GraphQLClient, request, gql } from 'graphql-request'
import { ChainId } from '@pancakeswap/sdk'
import axios from 'axios'

export const userPointHourDatas = (chainId: ChainId, payload: any) => {
  if (chainId == ChainId.NEO_EVM_TESTNET) return;
  const requests = `{
    userPointHourDatas(where: { date_gte: ${payload.date_gte}, date_lte: ${payload.date_lte} }){
      id,
      date,
      amount
    }
  }`

  return new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[chainId]).request(requests)
}

export const getUerRank = async (chainId: ChainId) => {
  if (chainId == ChainId.NEO_EVM_TESTNET) return;
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getUserRanks {
        userPoints(first: 101, skip: 0, orderBy: amount, orderDirection: desc) {
          id
          amount
          address
        }
      }
    `,
  )

  return response
}

export const getUserFriend = async (chainId: ChainId, account: string) => {
  if (chainId == ChainId.NEO_EVM_TESTNET) return;
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getUserFriends {
        userInfos(where: { id: "${account?.toLowerCase()}" }) {
          id
          total_amount
          total_claimed_amount
          friends(orderBy: amount, orderDirection: desc) {
            ref_address
            amount
          }
        }
      }
    `,
  )
  return response
}

export const getUserPointDaily = async (chainId: ChainId, payload?: any) => {
  if (chainId == ChainId.NEO_EVM_TESTNET) return;
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      {
        userPointDailies(where: {date_gte: ${payload.date_gte}, date_lte: ${payload.date_lte} },orderDirection: desc,orderBy: amount,first: 100, skip: 0) {
          id
          address
          amount
          date
        }
      }
    `,
  )
  return response
}

export const getUserPointMonthly = async (chainId: ChainId, payload?: any) => {
  if (chainId == ChainId.NEO_EVM_TESTNET) return;
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      {
        userPointMonthlies(where: { date_gte: ${payload.date_gte}, date_lte: ${payload.date_lte}},orderDirection: desc, orderBy: amount,first: 100, skip: 0) {
          id
          address
          amount
          date
        }
      }
    `,
  )
  return response
}

export const getUserPointWeekly = async (chainId: ChainId, payload?: any) => {
  if (chainId == ChainId.NEO_EVM_TESTNET) return;
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      {
        userPointWeeklies(where: { date_gte: ${payload.date_gte}, date_lte: ${payload.date_lte} }, orderDirection: desc,orderBy: amount,first: 100, skip: 0) {
          id
          address
          amount
          date
        }
      }
    `,
  )
  return response
}

export const userAmount = async (chainId: ChainId) => {
  if (chainId == ChainId.NEO_EVM_TESTNET) return;
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      {
        analysisDatas {
          id
          number_of_referral
          total_amount
          total_claimed_amount
          total_transactions
          total_reward
        }
      }
    `,
  )
  return response
}

export const userPoint = (chainId: ChainId) => {
  if (chainId == ChainId.NEO_EVM_TESTNET) return;
  const requests = `
  {
    analysisDatas {
      id, 
      number_of_referral,
      total_amount,
      total_claimed_amount,
      total_transactions,
      total_reward
    }
  }
  `
  return new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[chainId]).request(requests)
}

export const userClaimedHistories = (chainId: ChainId) => {
  if (chainId == ChainId.NEO_EVM_TESTNET) return;
  const requests = `{
    userClaimedHistories(orderBy: date, orderDirection: desc, first: 100) {
      id,
      date,
      amount,
      address
    }
  }`
  return new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[chainId]).request(requests)
}
export const pointDataDays = (from: number, to: number, chainId: ChainId) => {
  if (chainId == ChainId.NEO_EVM_TESTNET) return;
  const requests = `{
    pointDataDays(where: { date_gte: ${from}, date_lte: ${to} }, orderBy: date, orderDirection: desc) {
      id,
      amount,
      date
    }
  }`
  return new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[chainId]).request(requests)
}
