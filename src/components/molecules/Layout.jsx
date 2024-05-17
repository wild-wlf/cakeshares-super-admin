import { ChildWrapper, MainWrapper } from '@/styles/helpers.styles';
import React from 'react';
import { indivisualSellerNav } from '@/helpers/nav';
import { useRouter } from 'next/router';
import SideBar from './sideNav';

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      {router.pathname !== '/sign-in' ? (
        <>
          <MainWrapper>
            <SideBar data={indivisualSellerNav} />
            <ChildWrapper>{children}</ChildWrapper>
          </MainWrapper>
        </>
      ) : (
        children
      )}
    </>
  );
};

export default Layout;
