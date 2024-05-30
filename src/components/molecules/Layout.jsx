import { ChildWrapper, MainWrapper } from '@/styles/helpers.styles';
import React from 'react';
import { indivisualSellerNav } from '@/helpers/nav';
import { useRouter } from 'next/router';
import SideBar from './sideNav';

const Layout = ({ children }) => {
  const router = useRouter();
  const withLayout = ['/', '/'];
  return (
    <>
      {/* {router.pathname !== '/' || '/' ? ( */}
      {!withLayout.includes(router.pathname) ? (
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
