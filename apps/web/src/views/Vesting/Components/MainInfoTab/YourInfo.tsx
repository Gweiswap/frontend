import { formatUnits } from '@ethersproject/units'
import { useTranslation } from '@pancakeswap/localization'
import { CopyButton, Flex, Text } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import styled from 'styled-components'
import { IRefInfo } from 'views/Vesting'
import TabClaimHistory from './TabClaimHistory'
import TabSaleHistory from './TabSaleHistory'

interface IProps {
  dataInfo: any[]
  dataRefInfo: IRefInfo[]
  dataTransaction: any[]
  dataTransactionClaimOfUser: any[]
}

const Wrapper = styled.div`
  .btn_connect_container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: rgba(255, 255, 255, 0.87);
      margin-top: 180px;
      margin-bottom: 24px;
    }

    .btn_connect {
      width: 181px;
      height: 43px;
      margin-bottom: 200px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
    }

    @media screen and (max-width: 1200px) {
      p {
        font-size: 12px;
        line-height: 20px;
        margin-top: 160px;
      }

      .btn_connect {
        width: 146px;
        height: 37px;
        font-size: 14px;
        line-height: 17px;
      }
    }
  }
`

const Content = styled.div`
  .your_amount {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
    .item {
      padding: 16px;
      position: relative;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;

      .item_amount {
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
        color: #fb8618;
        margin-bottom: 8px;
      }
      .item_title {
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: rgba(255, 255, 255, 0.87);
      }
    }

    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;

      .item {
        .item_amount {
          font-size: 20px;
          line-height: 24px;
        }
        .item_title {
          font-size: 14px;
          line-height: 17px;
        }
      }
    }
  }

  .your_ref {
    display: grid;
    grid-template-columns: 0.8fr 1fr 1fr;
    gap: 16px;
    margin-top: 30px;

    .my_code {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.6);
    }

    .code {
      padding: 16px;
      margin-top: 16px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      .content_code_number {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .code_number {
          font-weight: 400;
          font-size: 18px;
          line-height: 22px;
          color: #ffffff;
        }
      }
    }

    .item_your-ref {
      padding: 16px;
      position: relative;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;

      .item_your-ref_amount {
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
        color: #fb8618;
      }
      .item_your-ref_title {
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: rgba(255, 255, 255, 0.87);
        margin-top: 8px;
      }
    }

    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;

      .my_code {
        font-size: 12px;
        line-height: 15px;
      }
      .code {
        padding: 10px 14px;
        margin-top: 8px;

        .content_code_number {
          .code_number {
            font-size: 14px;
            line-height: 17px;
          }
        }
      }

      .item_your-ref {
        .item_your-ref_amount {
          font-size: 20px;
          line-height: 24px;
        }
        .item_your-ref_title {
          font-size: 14px;
          line-height: 17px;
        }
      }
    }
  }

  .ngumy_code {
    padding-left: 49px;
    @media screen and (max-width: 1200px) {
      padding-left: 0px;
    }
  }

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

  .heading_info_vesting_tab {
    padding: 10px 16px;
    border-radius: 8px;
    margin-right: 8px;
    cursor: pointer;
    &:hover {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    }

    @media screen and (max-width: 1200px) {
      font-size: 12px;
      line-height: 15px;
    }
  }

  .heading_info_vesting_tab.vesting_info_active {
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  }

  .corner_1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 20px;
    border-radius: 10px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-left: 1px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge_1 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 20px;
    left: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner_2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 20px;
    border-radius: 10px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-right: 1px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge_2 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 20px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }
`

function YourInfo({ dataInfo, dataRefInfo, dataTransaction, dataTransactionClaimOfUser }: IProps) {
  const [currentTransactions, setCurrentTransactions] = useState(dataTransaction)
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const userProfile = useSelector<AppState, AppState['user']['userProfile']>((state) => state.user.userProfile)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    setCurrentTransactions(dataTransaction)
  }, [dataTransaction])

  return (
    <Wrapper>
      {!account && (
        <div className="btn_connect_container">
          <p>{t('Connect to your wallet to view your vesting shedule.')}</p>
          <ConnectWalletButton scale="sm" style={{ whiteSpace: 'nowrap' }} className="btn_connect">
            <span>{t('Connect Wallet')}</span>
          </ConnectWalletButton>
        </div>
      )}
      {account && (
        <Content>
          <div className="your_amount">
            {Array.from(dataInfo).map((item, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className="item" key={index}>
                  <div className="corner_1" />
                  <div className="edge_1" />
                  <div className="corner_2" />
                  <div className="edge_2" />
                  <p className="item_amount">
                    {item.title === 'Amount invested' && item.amount !== '-' && <span>$</span>}
                    {item.amount !== '-' ? Number(item.amount).toLocaleString() : item.amount}
                  </p>
                  <p className="item_title">{t(item.title)}</p>
                </div>
              )
            })}
          </div>

          <div className="table_your_info">
            <Flex mb="16px">
              <Text
                className={tab === 0 ? `heading_info_vesting_tab vesting_info_active` : `heading_info_vesting_tab`}
                fontSize="14px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="700"
                color="rgba(255, 255, 255, 0.87)"
                onClick={() => setTab(0)}
              >
                {t('Sale History')}
              </Text>

              <Text
                className={tab === 1 ? `heading_info_vesting_tab vesting_info_active` : `heading_info_vesting_tab`}
                fontSize="14px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="700"
                color="rgba(255, 255, 255, 0.87)"
                onClick={() => setTab(1)}
              >
                {t('Claim History')}
              </Text>
            </Flex>
          </div>

          {tab === 0 && <TabSaleHistory currentTransactions={currentTransactions} />}
          {tab === 1 && <TabClaimHistory currentTransactions={dataTransactionClaimOfUser} />}

          <Flex mb="16px" mt="24px" justifyContent="space-between">
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
              {t('Referral')}
            </Text>
          </Flex>

          <div className="your_ref">
            {Array.from(dataRefInfo).map((item: IRefInfo, index: number) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className="item_your-ref" key={index}>
                  <div className="corner_1" />
                  <div className="edge_1" />
                  <div className="corner_2" />
                  <div className="edge_2" />
                  <p className="item_your-ref_amount">
                    {item.totalTransactionApplyReferral
                      ? item.title === 'XOXS amount received from Referral'
                        ? Number(formatUnits(item.rewardXOXS, 6)).toLocaleString()
                        : Number(item.totalTransactionApplyReferral).toLocaleString()
                      : item.amountInit}
                  </p>
                  <p className="item_your-ref_title">{t(item.title)}</p>
                </div>
              )
            })}
            <div className="ngumy_code">
              <p className="my_code">{t('My Referral Code')}</p>
              <div className="code">
                <div className="content_code_number">
                  {account && (
                    <>
                      <span className="code_number">{userProfile?.referralCode}</span>
                      <span>
                        <CopyButton
                          width="24px"
                          text={userProfile?.referralCode}
                          tooltipMessage={t('Copied')}
                          button={
                            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/CopySimple.svg`} alt="CopySimple" />
                          }
                        />
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Content>
      )}
    </Wrapper>
  )
}

export default YourInfo
