import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { wrapper } from '@/utils/redux/store';
import { theme } from '@/defaultTheme';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  const router = useRouter();
  const isSignIn = router.pathname === '/';
  const isKakaoRedirecting = router.pathname === '/auth';
  const isNaverRedirecting = router.pathname === '/oauth';

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="author" content="windowook" />
            <meta name="description" content="미스터 크립 : 크립토 비서" />
            <meta
              name="keywords"
              content="미스터 크립, 미스터크립, mr cryp, mr-cyrp"
            />
            <meta property="og:title" content="미스터 크립" />
            <meta
              property="og:description"
              content="미스터 크립 : 크립토 비서"
            />
            <meta property="og:image" content="/image/og-image.webp" />
            <meta property="og:url" content="https://mr-cryp.vercel.app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {isSignIn || isKakaoRedirecting || isNaverRedirecting ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            </Layout>
          )}
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
