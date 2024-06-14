import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import AdminTable from '@/components/common/Admins/AdminTable';
import Head from 'next/head';
import React from 'react';

const admins = () => {
  return (
    <div>
      <Head>
        <title>CAKESHARES | ADMINS MANAGEMENT </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar title={'Admins Management'} />
      <AdminTable />
    </div>
  );
};

export default admins;
