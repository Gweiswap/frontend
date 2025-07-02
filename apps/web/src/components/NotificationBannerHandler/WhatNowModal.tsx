import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;

  .head {
    margin-bottom: 10px;
    color: rgba(255, 255, 255, 0.87);
    font-size: 20px;
    font-weight: 600;
    font-family: Inter;
    display: flex;
    justify-content: space-between;

    svg {
      cursor: pointer;
    }
  }

  .video {
    width: 1200px;
    max-width: 90%;
    border: 2px solid white;

    background: linear-gradient(to right, hsl(210, 30%, 20%), hsl(255, 30%, 25%));
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    box-shadow: var(--m-shadow, 0.4rem 0.4rem 10.2rem 0.2rem) #ed1c5150;

    video {
      width: 100%;
      height: 100%;
      max-width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 10px;
    }
  }

  .blur {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    cursor: default;
  }
`

type Props = {
  showVideo: boolean
  setShowVideo: (b: boolean) => void
}

const WhatNowModal = ({ showVideo, setShowVideo }: Props) => {
  const modalElement = document.querySelector('#pre-sale-video')

  const preventBodyScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  const enableBodyScroll = () => {
    document.body.style.overflow = 'auto'
  }

  if (showVideo) {
    preventBodyScroll()
  } else {
    enableBodyScroll()
  }

  useEffect(() => {
    if (showVideo) {
      preventBodyScroll()
    } else {
      enableBodyScroll()
    }
  }, [showVideo])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowVideo(false)
      }
    }

    if (showVideo) {
      document.addEventListener('keydown', handleKeyDown)
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showVideo])

  return createPortal(
    showVideo ? (
      <Wrapper>
        <div className="blur" role="button" onClick={() => setShowVideo(false)} />
        <div className="video">
          {/* <div className="head">
            <p>How to invest in Pre-sale</p>
            <div role="button" onClick={() => setShowVideo(false)}>
              <CloseIcon color="#FFFFFF" />
            </div>
          </div> */}
          <video autoPlay controls playsInline id="ps-video">
            <source
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/videos/presale/pre-sale-tutorial-final.mp4`}
              type="video/mp4;"
            />
          </video>
        </div>
      </Wrapper>
    ) : null,
    modalElement,
  )
}

export default WhatNowModal
