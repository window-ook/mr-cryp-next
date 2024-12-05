import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { wrapper } from '@/utils/redux/store';
import { theme } from '@/defaultTheme';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('@/layouts/Layout'), { ssr: false });

const ProtectedRoute = dynamic(
  () => import('@/components/global/ProtectedRoute'),
  {
    ssr: false,
  },
);

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
            <title>미스터 크립 Mr.cryp</title>
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
