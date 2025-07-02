import { useTranslation } from '@pancakeswap/localization'
import { Flex, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { ClickableColumnHeader, CustomTableWrapper, Table } from '../MainInfoTab/SaleHistory'

const Wrapper = styled.div``

const Content = styled.div`
  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 30px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 30px;
      left: 0px;
      width: 40px;
      height: 4px;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    }

    @media screen and (max-width: 1200px) {
      font-size: 16px;
      line-height: 19px;
    }
  }
  .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    color: rgba(255, 255, 255, 0.87);

    p:nth-last-child(2) {
      font-weight: 700;
      margin: 24px 0px;
    }
    p:first-child {
      margin-bottom: 24px;
    }
  }
  .normal {
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    color: rgba(255, 255, 255, 0.87);
    margin-top: 24px;
  }

  .high-light {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #fb8618;

    @media screen and (max-width: 1200px) {
      font-size: 14px;
      line-height: 17px;
    }
  }

  @media screen and (max-width: 1200px) {
    .normal {
      font-size: 14px;
      line-height: 20px;
    }
    .description {
      font-size: 14px;
      line-height: 17px;
    }
  }
`

const CustomTable = styled(Table)`
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;

  &::before {
    top: 25px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 0px;
    border: 1px solid transparent;
    position: absolute;
    top: -13px;
  }

  .table-header {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.6);
    @media screen and (max-width: 1200px) {
      font-size: 14px;
      line-height: 17px;
    }
  }

  .table_header_total {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    @media screen and (max-width: 1200px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
`

const CustomTableRow = styled(CustomTable)`
  &::after {
    border: none;
  }
  &::before {
    border: none;
  }

  .value {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);

    @media screen and (max-width: 1200px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
`

const CustomTableTotal = styled(CustomTable)`
  &::before {
    top: -8px;
  }
`

const CustomTableSale = styled(CustomTableWrapper)`
  & > div {
    min-width: 1300px;
  }
`

function PrivateSale() {
  const { t } = useTranslation()
  const arrToken = [
    {
      title: t('Private-Sale (ROUND 1)'),
      total: '1.5%',
      amountToken: '2,700,000',
      price: '0.044',
      totalMoneyRaise: '118,800',
      launchPrice: '162,000',
    },
    {
      title: t('Private-Sale (ROUND 2)'),
      total: '2%',
      amountToken: '3,600,000',
      price: '0.045',
      totalMoneyRaise: '162,000',
      launchPrice: '216,000',
    },
    {
      title: t('Private-Sale (ROUND 3)'),
      total: '2.5%',
      amountToken: '4,500,000',
      price: '0.046',
      totalMoneyRaise: '207,000',
      launchPrice: '270,000',
    },
  ]
  return (
    <Wrapper>
      <Content>
        <div className="title">{t('Sale mechanism:')}</div>
        <div className="description">
          <p>
            <strong>{t('XOX Labs')} </strong>
            {t(
              'allows users to swap, stake, store, bridge, play, refer, invest and earn with ease on the leading Decentralized Blockchain Ecosystem.',
            )}
          </p>
          <p>
            {t(
              '- Initially Launching with Cross-chain liquidity on 6 of the most popular blockchains (ETH, BSC, Polygon, zkSync, Arbitrum, Optimism) XOX Labs is already miles ahead of 90% of its competitors when it comes to accessibility and multi-chain capabilities. But that is just the start, XOX Labs will soon launch the most capable Cross-Chain DEX Aggregator on Defi (XOX Dex V2), natively integrating 100+ DEXes and 60+ Blockchains, which will be selected by community voting, popularity, capabilities, volume, and scalability potential. Learn More in our Docs',
            )}
          </p>
          <p className="high-light">{t('XOX Token Pre-Sales')}</p>
          <p>{t('Total Allocation 10.800.000 XOX Tokens 6% of the Total Supply (180.000.000 Tokens)')}</p>
        </div>

        <CustomTableSale>
          <CustomTable>
            <Text className="table-header">{t('TOKEN SALES')}</Text>
            <Text className="table-header">{t('Total Sale (%)')}</Text>
            <Text className="table-header">{t('Amount of tokens')}</Text>
            <Text className="table-header">{t('Price')}</Text>
            <Text className="table-header">{t('Total Money Raise ($)')}</Text>
            <Text className="table-header">{t('Launch price 0.06$ ($)')}</Text>
          </CustomTable>

          {Array.from(arrToken).map((item, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <CustomTableRow key={index}>
                <Text className="value">{t(item.title)}</Text>
                <Text className="value">{item.total}</Text>
                <Text className="value">{item.amountToken}</Text>
                <Text className="value">{item.price}</Text>
                <Text className="value">{item.totalMoneyRaise}</Text>
                <Text className="value">{item.launchPrice}</Text>
              </CustomTableRow>
            )
          })}

          <CustomTableTotal>
            <Text className="table_header_total">{t('TOTAL')}</Text>
            <Text className="table_header_total">6%</Text>
            <Text className="table_header_total">10,800,000</Text>
            <Text className="table_header_total">{null}</Text>
            <Text className="table_header_total">487,800</Text>
            <Text className="table_header_total">648,000</Text>
          </CustomTableTotal>
        </CustomTableSale>

        <div>
          <p className="normal">
            {t(
              'Note: In the Round 1 whitelisted wallets will have a 1hr timeframe to buy in before the sale goes public. (During this hour only Whitelisted wallets will be able to buy XOX).',
            )}
          </p>

          <p className="normal">
            {t('*You will be able to claim your XOX Tokens & XOXS Stables once Public Sales have Ended')}
            <br />
            {t(
              '**Bonus XOXS earned by referrals will also be distributed once XOX Tokens are Claimed by investors after Public Sales have Ended',
            )}
          </p>
          <p className="normal">
            <strong className="high-light">{t('XOXS Bonus on each Round')}</strong>
          </p>
          <p className="normal">
            {t('1. Round 1 - 8% XOXS Bonus')} <br />
            {t('2. Round 2 - 6% XOXS Bonus')} <br />
            {t('3. Round 3 - 4% XOXS Bonus')}
          </p>
          <p className="normal">
            <i>
              {t(
                `*The XOXS bonus % is calculated from your total investment (Example: If you invest $1000 in Round 1 then you get 80 XOXS`,
              )}{' '}
              <span>&#123;</span> 1 XOXS = 1$ <span>&#125;</span>,{' '}
              {t(`If you invest $1000 in Round 3 then you get 40 XOXS)`)}
            </i>
          </p>
        </div>
      </Content>
    </Wrapper>
  )
}

export default PrivateSale
