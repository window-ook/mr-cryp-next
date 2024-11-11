import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="author" content="windowook" />
        <meta name="description" content="미스터 크립 : 크립토 비서" />
        <meta
          name="keywords"
          content="미스터 크립, 미스터크립, mr cryp, mr-cyrp"
        />
        <meta property="og:title" content="미스터 크립" />
        <meta property="og:description" content="미스터 크립 : 크립토 비서" />
        <meta property="og:image" content="/image/og-image.webp" />
        <meta property="og:url" content="https://mr-cryp.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON%20Lv1%20Gothic%20OTF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
