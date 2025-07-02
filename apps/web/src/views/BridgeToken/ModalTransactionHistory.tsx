import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { ModalContainer, ModalHeader, InjectedModalProps } from '@pancakeswap/uikit'
import { GridLoader } from 'react-spinners'
import { ColumnCenter } from 'components/Layout/Column'

import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { NETWORK_LABEL, NETWORK_LINK } from './networks'
// eslint-disable-next-line import/no-cycle
import { useTranslation } from '@pancakeswap/localization'

const StyledModalContainer = styled(ModalContainer)`
  position: relative;
  min-width: 337px;
  /* padding-bottom: 20px; */
  background: #101010;

  padding: 32px 24px;

  border: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  z-index: 30 !important;

  .x-close-icon {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }
`

const StyledModalHeader = styled(ModalHeader)`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  width: 100%;
  margin-bottom: 24px;
  padding: 0;
  @media screen and (max-width: 576px) {
    margin-bottom: 16px;
  }
`
interface IContentProps {
  isHistoryData?: boolean
}

const Content = styled.div<IContentProps>`
  /* padding: 0 24px; */
  background: #101010;
  .out_amount {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100px;
    display: inline-block;
    margin-right: 2px;
  }

  div {
    ::-webkit-scrollbar-corner {
      display: none;
    }
    ::-webkit-scrollbar {
      width: 6px;
      background-color: transparent;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  @media screen and (min-width: 1400px) {
    overflow-x: ${({ isHistoryData }) => (isHistoryData ? 'hidden' : 'unset')};
  }
`

const NoData = styled.div``
const TxHash = styled.a`
  text-decoration: underline;
  text-decoration-color: #ffffff;
  &:hover {
  }
`

const StyledHeader = styled(TableCell)`
  font-size: 16px !important;

  @media (max-width: 576px) {
    font-size: 12px !important;
  }
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 14px 0 34px 0;
`

const StyledTable = styled.div`
  overflow-x: scroll;
  background: #101010;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  ::-webkit-scrollbar-corner {
    display: none;
  }
  .table {
    min-width: 1280px;
    width: 100%;
    @media screen and (max-width: 576px) {
      min-width: 900px;
    }
    .table-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0 8px;
      margin-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);

      /* p:last-child {
        text-align: end;
        padding-right: 8px;
      } */
      .center {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
      }
      p {
        font-size: 16px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.6);
        font-family: 'Inter';
        @media screen and (max-width: 576px) {
          font-size: 12px;
        }
      }
    }
    .table-row {
      width: 100%;
      max-height: 128px;
      overflow: scroll;
      /* padding-right: 8px; */
      ::-webkit-scrollbar-corner {
        display: none;
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        /* padding: 8px 0; */
        .row-item.center {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .row-item:last-child {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8px;
        }
        .row-item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 8px 0;

          p,
          a,
          span,
          div {
            color: rgba(255, 255, 255, 0.87);
            font-size: 16px;
            font-weight: 400;
            font-family: 'Inter';
            @media screen and (max-width: 576px) {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
`

export const shortenAddress = (address = '', start = 8, chars = 4) => {
  return address ? `${address?.substring(0, start)}...${address?.substring(address.length - chars)}` : ``
}

export const linkTransaction = (chainId) => {
  return `${NETWORK_LINK[chainId]}/tx/`
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const ModalTransactionHistory: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()
  const [historyData, setHistoryData] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [tableOptions, _] = useState({
    current: 1,
    pageSize: 10,
    itemStart: 1,
    itemEnd: 10,
    totalPage: null,
  })

  const handleGetBridgeHistory = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BRIDGE_TOKEN}/history`, {
        params: {
          limit: tableOptions.pageSize,
          page: tableOptions.current,
          address: account,
          chainId,
        },
      })

      if (response?.status === 200) {
        setHistoryData(response?.data.data)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error>>>`, error)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line consistent-return
  const handleType = (from: string, to: string, chainIdSender: number) => {
    const fromAddress = from?.toLowerCase()
    const toAddress = to?.toLowerCase()
    const accountReal = account?.toLowerCase()
    if (fromAddress === accountReal && chainId === chainIdSender) {
      return t('Sender')
      // eslint-disable-next-line no-else-return
    } else if (toAddress === accountReal && chainId !== chainIdSender) {
      return t('Receiver')
    }
  }

  useEffect(() => {
    if (!chainId || !account) return
    handleGetBridgeHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account])

  return (
    <StyledModalContainer>
      <StyledModalHeader>{t('Bridge Token History')}</StyledModalHeader>
      <img
        src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/close-one.svg`}
        alt="close-one"
        className="x-close-icon"
        onClick={onDismiss}
        aria-hidden="true"
      />
      <Content isHistoryData={historyData.length !== 0}>
        {loading ? (
          <ConfirmedIcon>
            <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
          </ConfirmedIcon>
        ) : (
          <>
            {historyData && historyData.length !== 0 ? (
              <StyledTable>
                <div className="table">
                  <div className="table-head">
                    <p style={{ width: '3%' }}>{t('No')}</p>
                    <p style={{ width: '15%' }}>{t('Input Transaction')}</p>
                    <p style={{ width: '15%' }}>{t('Input Amount')}</p>
                    <p style={{ width: '15%' }}>{t('Output Transaction')}</p>
                    <p style={{ width: '15%' }}>{t('Output Amount')}</p>
                    <p style={{ width: '11%' }} className="center">
                      {t('Type')}
                    </p>
                    <p style={{ width: '11%' }} className="center">
                      {t('Status')}
                    </p>
                    <p style={{ width: '20%' }} />
                  </div>
                  <div className="table-row">
                    {[...historyData].map((row, index) => (
                      <div className="row" key={row.txHash}>
                        <div className="row-item" style={{ width: '3%' }}>
                          <p>{index + 1}</p>
                        </div>
                        <div className="row-item" style={{ width: '15%' }}>
                          <TxHash href={row.txHash && `${linkTransaction(row.chainId)}${row.txHash}`} target="blank">
                            {row.txHash ? shortenAddress(row.txHash) : '........................'}
                          </TxHash>
                        </div>
                        <div className="row-item" style={{ width: '15%' }}>
                          <div style={{ display: 'flex' }}>
                            <Tooltip title={row.amount} placement="top-start">
                              <span className="out_amount">{parseFloat(row.amount)}</span>
                            </Tooltip>
                            <span>XOX</span>
                          </div>
                        </div>
                        <div className="row-item" style={{ width: '15%' }}>
                          <TxHash
                            href={row.txSwapHash && `${linkTransaction(row.toChainId)}${row.txSwapHash}`}
                            target="blank"
                          >
                            {row.txSwapHash ? shortenAddress(row.txSwapHash) : '........................'}
                          </TxHash>
                        </div>
                        <div className="row-item" style={{ width: '15%' }}>
                          <Tooltip title={row.outAmount} placement="top-start">
                            <span className="out_amount">{parseFloat(row.outAmount)}</span>
                          </Tooltip>
                          <span>XOX</span>
                        </div>
                        <div className="row-item center" style={{ width: '11%' }}>
                          <p>{handleType(row.from, row.to, row.chainId)}</p>
                        </div>
                        <div className="row-item center" style={{ width: '11%' }}>
                          <div
                            style={
                              row.status === 'completed'
                                ? { color: '#64C66D' }
                                : row.status === 'rejected'
                                ? { color: '#F44336' }
                                : (row.status === 'processing' || row.status === 'excuting') && { color: '#FFBD3C' }
                            }
                          >
                            {row.status === 'processing' || row.status === 'excuting'
                              ? t('Processing')
                              : capitalizeFirstLetter(row.status === 'completed' ? t('Success') : t(row.status))}
                          </div>
                        </div>
                        <div className="row-item" style={{ width: '20%' }}>
                          <span>{NETWORK_LABEL[row.chainId]}</span>
                          <span style={{ margin: '5px 10px 0px 10px' }}>
                            <img
                              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/bridge/arrow_bridge.svg`}
                              alt="bridge"
                            />
                          </span>
                          <span>{NETWORK_LABEL[row.toChainId]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </StyledTable>
            ) : (
              <NoData>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/nodata_history.png`} alt="nodata" />
                </div>
                <p
                  style={{
                    textAlign: 'center',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginTop: '16px',
                  }}
                >
                  {t('No Transactions')}
                </p>
              </NoData>
            )}
          </>
        )}
      </Content>
    </StyledModalContainer>
  )
}

export default ModalTransactionHistory
