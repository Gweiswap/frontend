import { ModalContainer, ModalHeader } from '@pancakeswap/uikit'
import styled from 'styled-components'

interface IModalContainer {
  isStepAction?: boolean
}

export const Content = styled.div`
  .discription {
    padding: 24px 0px;
    text-align: center;
    .value {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 10px;

      span {
        font-weight: 700;
      }
    }
    @media screen and (max-width: 682px) {
      .value {
        font-size: 14px;
        line-height: 17px;
      }
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
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    }

    @media screen and (max-width: 682px) {
      button {
        font-size: 14px;
        line-height: 17px;
      }
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
      color: #fb8618;
      font-weight: 700;
    }
  }
  .noti_claim_success {
    display: flex;
    justify-content: center;
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
    margin-bottom: 16px;
  }
  .noti_claim_pending_h2 {
    text-align: center;
    font-weight: 400;
    font-size: 14px;
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
  }
`

export const StyledModalContainer = styled(ModalContainer)<IModalContainer>`
  width: ${({ isStepAction }) => (isStepAction ? 'auto' : '327px')};
  padding: 24px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 32px 24px;
    width: ${({ isStepAction }) => (isStepAction ? 'auto' : '464px')};
  }
`

export const StyledModalHeader = styled(ModalHeader)`
  padding: 0;
  > p {
    width: 100%;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
    line-height: 24px;
  }
`
