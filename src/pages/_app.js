import React from 'react';
import { HelperClasses, Styling } from '@/styles/GlobalStyles.styles';
import { ToastContainer } from 'react-toastify';
import styled, { createGlobalStyle } from 'styled-components';
import Layout from '@/components/molecules/Layout';
import { AuthContextProvider } from '@/context/authContext';
import Variables from '../styles/variables.css';

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
  return (
    <>
      <AuthContextProvider>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <StyledToastContainer />
      </AuthContextProvider>
    </>
  );
}
