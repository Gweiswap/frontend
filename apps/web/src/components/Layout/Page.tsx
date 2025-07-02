import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import Container from './Container'

const StyledPage = styled(Container)`
  width: 100%;
  min-height: calc(100vh - 64px);
  padding-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 40px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 0;
    padding-bottom: 40px;
  }
`

export const PageMeta: React.FC<React.PropsWithChildren<{ symbol?: string }>> = ({ symbol }) => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { pathname, asPath } = useRouter()
  const pageMeta = getCustomMeta(pathname, t, locale) || {}
  const { siteName, title, description, image } = { ...DEFAULT_META, ...pageMeta }

  return (
    <Head>
      <title>XOX Labs</title>
      <meta property="og:site_name" content={siteName}></meta>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}${asPath}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:site" content="@Xox_Labs" />
      <meta name="twitter:creator" content="@Xox_Labs" />
    </Head>
  )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol?: string
}

const Page: React.FC<React.PropsWithChildren<PageProps>> = ({ children, symbol, ...props }) => {
  return (
    <>
      <PageMeta symbol={symbol} />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
