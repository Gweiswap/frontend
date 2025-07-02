import styled from 'styled-components'
import { Card } from '@pancakeswap/uikit'

export const BodyWrapper = styled(Card)`
  max-width: 559px;
  width: 100%;
  z-index: 1;
  margin-top:50px;
  padding: 0;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
