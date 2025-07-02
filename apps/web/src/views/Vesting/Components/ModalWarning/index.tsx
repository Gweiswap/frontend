import {
  Flex,
  InjectedModalProps,
  ModalBody,
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalTitle,
} from '@pancakeswap/uikit'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { handleTime } from '../CountDown'
import { TextCustom } from '../ModalExchange'
import { useTranslation } from '@pancakeswap/localization'

const StyledModalContainer = styled(ModalContainer)`
  width: 337px;
`

const StyledModalHeader = styled(ModalHeader)``

const StyledModalBody = styled(ModalBody)``

const CountDown = ({ startTime }) => {
  const [timeList, setTimeList] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const timeStart = Math.floor(new Date(startTime).getTime()) / 1000

  const NOW = Date.now() / 1000
  const periodTime = Math.floor(timeStart - NOW)

  const handleCountDown = () => {
    const days = Math.floor(periodTime / (3600 * 24))
    const hours = Math.floor((periodTime - days * 3600 * 24) / 3600)
    const minutes = Math.floor((periodTime % 3600) / 60)
    const seconds = periodTime - days * 3600 * 24 - hours * 3600 - minutes * 60
    setTimeList({ ...timeList, days, hours, minutes, seconds })
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (Math.floor(periodTime) >= 0) {
      const refreshInterval = setInterval(handleCountDown, 1000)
      return () => clearInterval(refreshInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeList, timeStart])

  return (
    <>
      <span>
        <span className="time_item">{handleTime(timeList.days)}</span>
      </span>
      <span className="two_dot">:</span>
      <span>
        <span className="time_item">{handleTime(timeList.hours)}</span>
      </span>
      <span className="two_dot">:</span>
      <span>
        <span className="time_item">{handleTime(timeList.minutes)}</span>
      </span>
      <span className="two_dot">:</span>
      <span>
        <span className="time_item">{handleTime(timeList.seconds)}</span>
      </span>
    </>
  )
}

interface IProps extends InjectedModalProps {
  timeWhitelist?: number
}

function ModalWarning({ onDismiss, timeWhitelist }: IProps) {
  const { t } = useTranslation()

  return (
    <StyledModalContainer>
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <StyledModalHeader>
        <ModalTitle>
          <TextCustom color="rgba(255, 255, 255, 0.87)" fontWeight={700} fontSize="24px" textAlign="center">
            {t('Pre-sale warning!')}
          </TextCustom>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </StyledModalHeader>
      <StyledModalBody>
        <Flex alignItems="center" marginBottom="26px" className="xox_amount" justifyContent="center">
          <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/waring_presale.png`} alt="" />
        </Flex>

        <Flex alignItems="center" marginBottom="26px" padding="0px 24px" className="xox_amount" justifyContent="center">
          <p style={{ textAlign: 'center' }}>
            {t('Sorry, Looks like your wallet is not Whitelisted &ldquo;You can invest after')} [
            <CountDown startTime={timeWhitelist} />
            ]&ldquo;
          </p>
        </Flex>
      </StyledModalBody>
    </StyledModalContainer>
  )
}

export default ModalWarning
