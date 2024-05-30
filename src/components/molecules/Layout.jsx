import { ChildWrapper, MainWrapper } from '@/styles/helpers.styles';
import React from 'react';
import { indivisualSellerNav } from '@/helpers/nav';
import { useRouter } from 'next/router';
import SideBar from './sideNav';

const Layout = ({ children }) => {
  const router = useRouter();
  const withLayout = ['/', '/'];
  console.log(router.pathname, withLayout.includes(router.pathname));
  return (
    <>
      {/* {router.pathname !== '/' || '/' ? ( */}
      {!withLayout.includes(router.pathname) ? (
        <>
          <MainWrapper>
            {console.log('in main')}
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
