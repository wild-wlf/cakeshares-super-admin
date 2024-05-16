import React from 'react';
import { HelperClasses, Styling } from '@/styles/GlobalStyles.styles';
import { ChildWrapper, MainWrapper } from '@/styles/helpers.styles';
import { createGlobalStyle } from 'styled-components';
import SideBar from '@/components/molecules/sideNav';
import { indivisualSellerNav } from '@/helpers/nav';
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
      <MainWrapper>
        <SideBar data={indivisualSellerNav} />
        <ChildWrapper>
          <Component {...pageProps} />
        </ChildWrapper>
      </MainWrapper>
    </>
  );
}
