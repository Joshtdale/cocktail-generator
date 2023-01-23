import { Html, Head, Main, NextScript } from 'next/document'



export default function Document() {




  return (
    <Html lang="en">
      <Head>
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" defer></script>
        <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" defer></script>
      </Head>
      <body>
        <div className="home">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
