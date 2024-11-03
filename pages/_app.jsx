import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { wrapper } from '@/utils/redux/store';
import { theme } from '@/defaultTheme';
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
