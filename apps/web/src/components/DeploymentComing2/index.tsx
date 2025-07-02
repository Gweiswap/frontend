import React, { useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ testMode: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  display: ${({ testMode }) => (testMode ? 'none' : 'grid')};
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
`

const DeploymentComing2 = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_TEST_MODE === '1') return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  return <Wrapper testMode={process.env.NEXT_PUBLIC_TEST_MODE === '1'}></Wrapper>
}

export default DeploymentComing2
