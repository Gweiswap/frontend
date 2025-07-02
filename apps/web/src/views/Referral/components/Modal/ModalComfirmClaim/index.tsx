import { Box, Modal } from '@mui/material'
import useWindowSize from 'hooks/useWindowSize'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  handleClose: () => void
  onClick?: () => void
  open: boolean
  title: string
}

const ModalConfirmClaim: React.FC<React.PropsWithChildren<IProps>> = ({ open, handleClose, children, title }) => {
  const { width } = useWindowSize()

  const BoxWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 464px;
    background: #101010;
    border: 1px solid rgba(255, 255, 255, 0.1);
    boxshadow: 24;
    border-radius: '20px';
    padding: 32px 24px;
    border-radius: 6px;
    :focus-visible {
      outline: none;
    }
    @media screen and (max-width: 900px) {
      width: 327px;
    }
  `

  return (
    <Modal open={open} onClose={handleClose}>
      <BoxWrapper>
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
        <Box> {children}</Box>
      </BoxWrapper>
    </Modal>
  )
}

export default ModalConfirmClaim
