import React, { useState, useEffect } from 'react';
import { HelperClasses, Styling } from '@/styles/GlobalStyles.styles';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import styled, { createGlobalStyle } from 'styled-components';
import Layout from '@/components/molecules/Layout';
import { AuthContextProvider } from '@/context/authContext';
import Variables from '../styles/variables.css';
import PreLoader from '@/components/molecules/PreLoader';

const GlobalStyles = createGlobalStyle`
  ${Variables}
  ${Styling}
  ${HelperClasses}
`;

export const StyledToastContainer = styled(ToastContainer)`
  z-index: 99999;

  .Toastify__toast {
    padding: 0;
    min-height: 0;
    border-radius: 8px;
    font-family: inherit;
  }
  .Toastify__toast--default {
    background: none;
  }
  .Toastify__toast-body {
    padding: 0;
  }
  .Toastify__close-button {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
  }
`;

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeError', () => setLoading(false));
    router.events.on('routeChangeStart', () => setLoading(true));
    router.events.on('routeChangeComplete', () => setLoading(false));

    return () => {
      router.events.off('routeChangeError', () => setLoading(false));
      router.events.off('routeChangeStart', () => setLoading(true));
      router.events.off('routeChangeComplete', () => setLoading(false));
    };
  }, [router.events]);

  return (
    <>
      <AuthContextProvider>
        <GlobalStyles />
        {loading && <PreLoader />}
        {pageProps.statusCode === 404 ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
        <StyledToastContainer />
      </AuthContextProvider>
    </>
  );
}
