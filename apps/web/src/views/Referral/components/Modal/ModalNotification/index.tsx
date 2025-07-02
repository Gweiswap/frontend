import { useTranslation } from '@pancakeswap/localization'
import { InjectedModalProps, ModalBody } from '@pancakeswap/uikit'
import { Content, StyledModalContainer, StyledModalHeader } from './styled'
import { roundingAmountNumber } from '@pancakeswap/utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback } from 'react'
import { STEP_CONFIRM, TYPE_OF_CLAIM } from '../../ReferralFriend'
import { GridLoader } from 'react-spinners'

interface ModalNotificationIprops extends InjectedModalProps {
  dataClaim: { point: number; dollar: number }
  totalUnClaimed: string | number
  typeOfClaim: number
  setTypeOfClaim: (type: number) => void
  level: number | null
  handleClaimAll: () => void
  handleClaimLevel: (level: number) => void
  stepConfirm: number
  setStepConfirm: (step: number) => void
}

const ModalNotification = ({
  onDismiss,
  dataClaim,
  setTypeOfClaim,
  typeOfClaim,
  handleClaimAll,
  handleClaimLevel,
  level,
  stepConfirm,
  setStepConfirm,
}: ModalNotificationIprops) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  const confirmationContent = useCallback(() => {
    if (stepConfirm === STEP_CONFIRM.ACTION) {
      return (
        <Content>
          <div className="xox_loading" style={{ margin: '24px 0px' }}>
            <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
          </div>
          <div className="noti_claim_pending_h1">{t('Waiting For Confirmation')}</div>
          <div className="noti_claim_pending_h2">{t('Confirm this transaction in your wallet.')}</div>
          <img
            src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/close-one.svg`}
            alt="close-one"
            className="x-close-icon"
            aria-hidden="true"
            onClick={() => {
              onDismiss()
              setTypeOfClaim(null)
              setStepConfirm(STEP_CONFIRM.NOTI)
            }}
          />
        </Content>
      )
    }
    return (
      <Content>
        <div className="discription">
          <p className="value">
            {t('Withdraw Amount')} <span>${roundingAmountNumber(Number(dataClaim.dollar))}</span>
          </p>
          <p className="value">
            {t('You will receive:')}{' '}
            <span>
              ${roundingAmountNumber(Number(dataClaim.dollar) * 0.99)} $
              {chainId === 5 || chainId === 1 ? 'USDC' : 'USDT'}
            </span>
          </p>
          <p className="value">
            {t('Platform Fee:')}{' '}
            <span>
              ${roundingAmountNumber(Number(dataClaim.dollar) - Number(dataClaim.dollar) * 0.99)} $
              {chainId === 5 || chainId === 1 ? 'USDC' : 'USDT'}
            </span>{' '}
          </p>
        </div>
        <div className="btn-group">
          <button
            className="cancel"
            type="button"
            onClick={() => {
              onDismiss()
              setTypeOfClaim(null)
            }}
          >
            {t('Cancel')}
          </button>
          <button
            className="confirm"
            type="button"
            onClick={() => {
              typeOfClaim === TYPE_OF_CLAIM.CLAIM_ALL ? handleClaimAll() : handleClaimLevel(level)
            }}
          >
            {t('Confirm')}
          </button>
        </div>
      </Content>
    )
  }, [stepConfirm, dataClaim])

  return (
    <StyledModalContainer isStepAction={stepConfirm === STEP_CONFIRM.ACTION}>
      <StyledModalHeader>
        <p>{t('Claim')}</p>
      </StyledModalHeader>
      <ModalBody>{confirmationContent()}</ModalBody>
    </StyledModalContainer>
  )
}

export default ModalNotification
