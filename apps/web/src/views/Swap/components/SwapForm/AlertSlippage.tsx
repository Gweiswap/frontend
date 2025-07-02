import { useTranslation } from '@pancakeswap/localization'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 20px;
  background: linear-gradient(90deg, #ee097950 0%, #ff6a0050 100%);
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  padding: 12px 16px;
  margin: 0 0 16px 0;

  &.no-margin {
    margin: 0;
  }

  .content {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    -webkit-box-align: center;
    align-items: center;
    gap: 8px;
    transition: all 150ms linear 0s;
    display: flex;
  }

  .content__img {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 16px;
    height: 16px;
    flex: 0 0 16px;
    display: flex;
  }

  .content__text {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    gap: 8px;
    flex-direction: column;
    flex: 1 1 0px;
    color: rgb(255, 255, 255, 0.87);
    display: flex;

    a {
      min-width: max-content;
      border-bottom: 1px solid rgb(255, 255, 255, 0.87);
      width: fit-content;
      display: inline;
      cursor: pointer;
      color: rgb(255, 255, 255, 0.87);
      font-weight: 500;
    }

    .info {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      border-bottom: 1px solid transparent;
      width: fit-content;
      display: inline;
    }
  }
`

const AlertSlippage = ({ allowedSlippage, classname }) => {
  const { t } = useTranslation()
  return 50 <= allowedSlippage && allowedSlippage <= 500 ? (
    <></>
  ) : (
    <Wrapper className={classname}>
      <div className="content">
        <div className="content__img">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF9901"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1={12} y1={9} x2={12} y2={13} />
            <line x1={12} y1={17} x2="12.01" y2={17} />
          </svg>
        </div>
        <div className="content__text">
          <div>
            {/* <a
                href="https://docs.kyberswap.com/getting-started/foundational-topics/decentralized-finance/slippage"
                target="_blank"
                rel="noreferrer"
                style={{ minWidth: 'max-content' }}
              >
                
              </a> */}
            <div className="info">
              {' '}
              {allowedSlippage > 500 && t('Slippage is high. Your transaction may be front-run')}
              {allowedSlippage < 50 && t('Slippage is low. Your transaction may fail')}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default AlertSlippage
