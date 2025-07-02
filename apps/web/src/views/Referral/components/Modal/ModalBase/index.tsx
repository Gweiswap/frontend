import { Box, Modal } from '@mui/material'
import React from 'react'

interface IProps {
  handleClose: () => void
  onClick?: () => void
  open: boolean
  title: string
  width?: number | string
  disableScrollLock?: boolean
}

const ModalBase: React.FC<React.PropsWithChildren<IProps>> = ({
  open,
  handleClose,
  children,
  title,
  width = 327,
  disableScrollLock = false,
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width,
    bgcolor: '#101010',
    boxShadow: 24,
    borderRadius: '20px',
    p: '32px 24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  }

  return (
    <Modal open={open} onClose={handleClose} disableScrollLock={disableScrollLock}>
      <Box sx={style}>
        <Box
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            fontSize: '20px',
            lineHeight: '24px',
            color: 'rgba(255, 255, 255, 0.87)',
          }}
        >
          {title}
        </Box>
        <Box>{children}</Box>
      </Box>
    </Modal>
  )
}

export default ModalBase
