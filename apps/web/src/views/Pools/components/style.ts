import styled from 'styled-components'

export const Content = styled.div`
  .discription {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    padding: 24px 0px;

    span {
      font-weight: 700;
    }
  }

  .btn-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    button {
      border: none;
      border-radius: 6px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      padding: 12px;
      cursor: pointer;
    }
    & > .cancel {
      background: #313131;
    }
    & > .confirm {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
    }
  }

  .noti {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    margin-top: 8px;
    margin-bottom: 24px;
    span {
      color: #9072ff;
      font-weight: 700;
    }
  }
  .noti_claim_success {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }

  .x-close-icon {
    position: absolute;
    top: 11px;
    right: 11px;
    cursor: pointer;
  }

  .xox_loading {
    display: flex;
    justify-content: center;
  }

  .reject_xox {
    display: flex;
    justify-content: center;
    margin: 24px 0;
  }
  .noti_claim_pending_h1 {
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }

  .noti_claim_pending_h3 {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
    margin: 16px 0px;
  }
  .noti_claim_pending_h2 {
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }

  .noti_claim_pending_h4 {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }

  .btn_dismiss_container {
    display: flex;
    justify-content: center;
    margin-top: 24px;
    .btn_dismiss {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      border-radius: 6px;
      padding: 12px 30px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      border: none;
      cursor: pointer;
    }
    .hv {
      &:hover {
        background: #5f35eb;
      }
    }
    .bg {
      background: #313131;
    }
  }

  .submitted {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    margin-top: 24px;
    margin-bottom: 8px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }
  .view_on {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    /* color: #9072ff;
    &:hover {
      text-decoration: underline;
      text-decoration-color: #9072ff !important;
    } */
  }

  .btn_close {
    text-align: center;
    width: 100%;
    padding: 12px 0px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    background: #313131;
    border-radius: 6px;
    cursor: pointer;
  }
`
