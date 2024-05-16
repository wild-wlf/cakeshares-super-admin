import { HelperClasses, Styling } from '@/styles/GlobalStyles.styles';
import { createGlobalStyle } from 'styled-components';
import Layout from '@/components/molecules/Layout';
import Variables from '../styles/variables.css';

const GlobalStyles = createGlobalStyle`
  ${Variables}
  ${Styling}
  ${HelperClasses}
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
