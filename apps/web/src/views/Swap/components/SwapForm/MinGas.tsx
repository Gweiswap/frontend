import { useTranslation } from '@pancakeswap/localization'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  border-radius: 999px;
  background: #1d1c1c;
  padding: 2px;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 5px;

  .button-group {
    border-radius: 999px;
    flex: 1 1 0%;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1d1c1c;
    color: rgba(255, 255, 255, 0.87);
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;
    transition: color 300ms ease 0s;

    .text {
      border-radius: 999px;
      font-size: 18px;
      font-weight: 400;
      cursor: pointer;
      transition: color 300ms ease 0s;
      box-sizing: border-box;
      margin: 0px 0px 0px 4px;
      min-width: 0px;
      color: rgba(255, 255, 255, 0.38);
    }

    svg {
      width: 24px;
    }

    svg path {
      fill: white;
      fill-opacity: 0.38;
    }
  }

  .button-group.active {
    background: rgba(255, 255, 255, 0.2);

    .text {
      color: white;
    }

    svg path {
      fill: white;
      fill-opacity: 0.87;
    }
  }

  @media screen and (max-width: 640px) {
    .button-group .text {
      font-size: 12px;
    }

    .button-group svg {
      width: 16px;
    }
  }
`

const MinGas = ({ minGas, setMinGas }) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <div role="button" className={`button-group ${!minGas && 'active'}`} onClick={() => setMinGas(false)}>
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.99998 1.3335C4.31998 1.3335 1.33331 4.32016 1.33331 8.00016C1.33331 11.6802 4.31998 14.6668 7.99998 14.6668C11.68 14.6668 14.6666 11.6802 14.6666 8.00016C14.6666 4.32016 11.68 1.3335 7.99998 1.3335ZM8.58665 11.8402V12.0802C8.58665 12.4002 8.32665 12.6668 7.99998 12.6668C7.67998 12.6668 7.41331 12.4068 7.41331 12.0802V11.8002C6.99331 11.7002 6.12665 11.3935 5.61998 10.4002C5.46665 10.1068 5.61331 9.74016 5.91998 9.6135L5.96665 9.5935C6.23998 9.48016 6.54665 9.5935 6.68665 9.8535C6.89998 10.2602 7.31998 10.7668 8.09998 10.7668C8.71998 10.7668 9.41998 10.4468 9.41998 9.6935C9.41998 9.0535 8.95331 8.72016 7.89998 8.34016C7.16665 8.08016 5.66665 7.6535 5.66665 6.1335C5.66665 6.06683 5.67331 4.5335 7.41331 4.16016V3.92016C7.41331 3.5935 7.67998 3.3335 7.99998 3.3335C8.31998 3.3335 8.58665 3.5935 8.58665 3.92016V4.16683C9.29998 4.2935 9.75331 4.6735 10.0266 5.0335C10.2533 5.32683 10.1333 5.7535 9.78665 5.90016C9.54665 6.00016 9.26665 5.92016 9.10665 5.7135C8.91998 5.46016 8.58665 5.20016 8.03998 5.20016C7.57331 5.20016 6.83331 5.44683 6.83331 6.12683C6.83331 6.76016 7.40665 7.00016 8.59331 7.3935C10.1933 7.94683 10.6 8.76016 10.6 9.6935C10.6 11.4468 8.93331 11.7802 8.58665 11.8402Z"
            fill="white"
          />
        </svg>
        <div className="text">{t('Maximum Return')}</div>
      </div>
      <div role="button" className={`button-group ${minGas && 'active'}`} onClick={() => setMinGas(true)}>
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.18 4.82L13.1867 4.81333L11.06 2.68667C10.8667 2.49333 10.5467 2.49333 10.3534 2.68667C10.16 2.88 10.16 3.2 10.3534 3.39333L11.4067 4.44667C10.7067 4.71333 10.2334 5.42667 10.3534 6.25333C10.46 6.98667 11.0867 7.58 11.82 7.66C12.1334 7.69333 12.4067 7.64 12.6667 7.52667V12.3333C12.6667 12.7 12.3667 13 12 13C11.6334 13 11.3334 12.7 11.3334 12.3333V9.33333C11.3334 8.6 10.7334 8 10 8H9.33335V3.33333C9.33335 2.6 8.73335 2 8.00002 2H4.00002C3.26669 2 2.66669 2.6 2.66669 3.33333V13.3333C2.66669 13.7 2.96669 14 3.33335 14H8.66669C9.03335 14 9.33335 13.7 9.33335 13.3333V9H10.3334V12.24C10.3334 13.1133 10.96 13.9067 11.8267 13.9933C12.8267 14.0933 13.6667 13.3133 13.6667 12.3333V6C13.6667 5.54 13.48 5.12 13.18 4.82ZM8.00002 6.66667H4.00002V4C4.00002 3.63333 4.30002 3.33333 4.66669 3.33333H7.33335C7.70002 3.33333 8.00002 3.63333 8.00002 4V6.66667ZM12 6.66667C11.6334 6.66667 11.3334 6.36667 11.3334 6C11.3334 5.63333 11.6334 5.33333 12 5.33333C12.3667 5.33333 12.6667 5.63333 12.6667 6C12.6667 6.36667 12.3667 6.66667 12 6.66667Z"
            fill="white"
          />
        </svg>
        <div className="text">{t('Lowest Gas')}</div>
      </div>
    </Wrapper>
  )
}

export default MinGas
