import { Modal } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const ConfirmSwapModalContainer = ({ children, handleDismiss, hideCloseButton }) => {
  const { t } = useTranslation()

  return (
    <Modal
      title={t('Confirm Swap')}
      onDismiss={handleDismiss}
      hideCloseButton={hideCloseButton}
      style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
    >
      {children}
    </Modal>
  )
}

export default ConfirmSwapModalContainer
