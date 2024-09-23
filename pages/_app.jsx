import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { wrapper } from '@/utils/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@/defaultTheme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Layout from '@/layouts/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isSignIn = router.pathname === '/';
  const isAuth = router.pathname === '/auth';
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          {isSignIn || isAuth ? (
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
