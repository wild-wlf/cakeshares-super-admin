import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import SideBar from '@/components/common/Community/SideBar';
import Head from 'next/head';
import React from 'react';

const index = () => {
  return (
    <div>
      <Head>
        <title>CAKESHARES | DASHBOARD</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title={'Community Chat'}
        tagLine={'You have total 101 total chats in your community chat right now!'}
      />
      <SideBar />
    </div>
  );
};

export default index;
