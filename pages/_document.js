import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="author" content="windowook" />
        <meta
          name="description"
          content="가상 화폐 관련 실시간 정보를 확인할 수 있는 서비스입니다."
        />
        <meta
          name="keywords"
          content="미스터 크립, 미스터크립, mr cryp, mr-cyrp"
        />
        <meta property="og:image" content="/image/og-image.webp" />
        <meta property="og:site_name" content="미스터 크립 Mr cryp" />
        <meta property="og:title" content="미스터 크립 Mr cryp" />
        <meta
          property="og:description"
          content="가상 화폐 실시간 정보를 확인하세요"
        />
        <meta property="og:url" content="https://mr-cryp.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
