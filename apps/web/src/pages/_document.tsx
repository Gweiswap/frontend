/* eslint-disable jsx-a11y/iframe-has-title */
import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  // static async getInitialProps(ctx: DocumentContext) {
  //   const sheet = new ServerStyleSheet()
  //   const originalRenderPage = ctx.renderPage

  //   try {
  //     // eslint-disable-next-line no-param-reassign
  //     ctx.renderPage = () =>
  //       originalRenderPage({
  //         enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
  //       })

  //     const initialProps = await Document.getInitialProps(ctx)
  //     return {
  //       ...initialProps,
  //       styles: (
  //         <>
  //           {initialProps.styles}
  //           {sheet.getStyleElement()}
  //         </>
  //       ),
  //     }
  //   } finally {
  //     sheet.seal()
  //   }
  // }

  render() {
    return (
      <Html translate="no">
        <Head>
          {process.env.NEXT_PUBLIC_NODE_PRODUCTION && (
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_NODE_PRODUCTION} />
          )}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body style={{ background: '#0a0a0a' }}>
          <Main />
          <NextScript />
          <div id="portal-root" />
          <div id="modal-root" />
          <div id="modal-popup-presale" />
          <div id="modal-popup-deployment-coming" />
          <div id="menu-root" />
          <div id="pre-sale-video" />
        </body>
      </Html>
    )
  }
}

export default MyDocument
