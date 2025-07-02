import styled from 'styled-components'

export const TitleChart = styled.div`
  display: flex;
  justify-content: space-between;

  .title_chart_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .btns {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .btn-get-token {
    padding: 1px;
    border-radius: 8px;
    background-image: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
    height: 37px;
    cursor: pointer;
    margin-right: 8px;

    &:hover {
      opacity: 0.8;
    }

    .boxed-child {
      width: 100%;
      height: 100%;
      background-color: #000000;
      padding: 9px 20px;
      border-radius: inherit;
      span {
        background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        width: 100%;
        height: 100%;
        background-color: #191a28;
        border-radius: inherit;
      }
    }
  }

  .title_chart {
    font-weight: 700;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 8px;
  }

  .line {
    margin-bottom: 4px;
    width: 40px;
    height: 4px;
    background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
  }

  .btn_select_token {
    padding: 10px 20px;
    background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    color: #ffffff;
    border: none;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  @media screen and (max-width: 900px) {
    .btn-get-token {
      padding: 1px;
      .boxed-child {
        padding: 9px 20px;
        span {
          font-size: 14px;
        }
      }
    }
  }

  @media screen and (min-width: 1921px) {
    .btn-get-token {
      padding: 2px;
    }
  }

  @media screen and (max-width: 530px) {
    .title_chart {
      font-size: 16px;
      line-height: 19px;
      margin-bottom: 0;
    }
    .btn_select_token {
      padding-left: 6px;
      padding-right: 6px;
    }
    .btn-get-token {
      .boxed-child {
        padding: 9px;
        span {
          font-size: 14px;
        }
      }
    }
  }
`

export const ChartContent = styled.div`
  margin-top: 32px;
  .container {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    width: 100%;
  }
  .token {
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
    display: flex;
    align-items: center;

    img,
    svg {
      margin-right: 10px;
    }
  }

  .price-info {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 40px;

    .group {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.6);
    }

    .group.right {
      place-content: end;
      display: grid;
    }

    .group > div {
      display: flex;
      margin-top: 8px;
    }

    span.icon {
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.6);
      margin-right: 4px;
      margin-bottom: 4px;
    }

    span.val {
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
    }
  }

  .filter {
    margin: 25px 0px;
    display: flex;
    justify-content: flex-start;
    button {
      border-radius: 8px;
      height: 31px;
      min-width: 40px;
      border: none;
      outline: none;
      cursor: pointer;
      font-weight: 300;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.05);
      &:hover {
        opacity: 0.8;
      }
    }
    @media (max-width: 576px) {
      button {
        padding: 8px;
        margin-right: 8px;
      }
    }

    button.active {
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .filter {
      justify-content: flex-end;

      button {
        margin-left: 8px;
        min-width: 50px;
      }
    }

    .price-info {
      display: grid;
      grid-template-columns: repeat(4, auto);
      gap: 40px;

      .group {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: rgba(255, 255, 255, 0.6);
      }

      .group > div {
        display: flex;
        margin-top: 8px;
      }

      span.icon {
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        color: rgba(255, 255, 255, 0.6);
        margin-right: 4px;
        margin-bottom: 4px;
      }

      span.val {
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: #ffffff;
      }
    }
  }
`
