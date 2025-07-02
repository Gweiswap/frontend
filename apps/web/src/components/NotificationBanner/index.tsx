import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import BannerCloseX from './components/BannerCloseX'
import { useCallback, useState } from 'react'
import WhatNowModal from 'components/NotificationBannerHandler/WhatNowModal'

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  padding: 5px 24px;
  align-items: center;
  // background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);

  button {
    border: none;
    background: transparent;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  }
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: fit-content;
  justify-content: center;
  margin: auto;
  align-items: center;

  > span {
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
  }

  > span:nth-child(1) {
    font-weight: 700;
    text-align: center;
  }

  > span:nth-child(2) {
    text-align: center;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 17px;
  }

  > a,
  > button {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    padding: 10px 20px;
    color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 8px;
    margin-left: 0px;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background: #ffffff;
      color: #000000;
      border: 1px solid #000000;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    > span {
      font-size: 17px;
      line-height: 21px;
    }
    > a,
    > button {
      margin-left: 24px;
    }

    > span:nth-child(2) {
      margin-bottom: 0px;
      font-size: 17px;
      line-height: 21px;
    }
  }
`

interface INotiBanner {
  title?: string
  description?: string
  btnText?: string
  href?: string
}

function NotificationBanner({ title, description, btnText = 'Participate', href = '#' }: INotiBanner) {
  const { t } = useTranslation()
  const [showVideo, setShowVideo] = useState(false)

  const handleOnClickWatchNow = useCallback(() => setShowVideo(true), [])

  return (
    <Container>
      <InnerContainer>
        <span>{t(title)}&nbsp;</span>
        <span>{t(description)}</span>
        {btnText === 'Watch Now' ? (
          <button onClick={handleOnClickWatchNow}>{t(btnText)}</button>
        ) : (
          <a href={href} target="_blank">
            {t(btnText)}
          </a>
        )}
      </InnerContainer>
      <WhatNowModal showVideo={showVideo} setShowVideo={setShowVideo} />
    </Container>
  )
}

export default NotificationBanner
