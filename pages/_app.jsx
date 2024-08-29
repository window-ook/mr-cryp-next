import '@/styles/globals.css';
import Layout from '@/layouts/Layout';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/defaultTheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { wrapper } from '@/redux/store';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isSignIn = router.pathname === '/';
  const isAuth = router.pathname === '/auth';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {isSignIn || isAuth ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
