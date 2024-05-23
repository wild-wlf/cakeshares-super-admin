import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import MangeProductsTable from '@/components/common/ManageProducts/MangeProductsTable';
import Head from 'next/head';
import React from 'react';

const index = () => {
  return (
    <div>
      <Head>
        <title>CAKESHARES | MANAGE USERS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title="Manage Products"
        tagLine="You have total 101 total products in your manage products right now!"
      />
      <MangeProductsTable />
    </div>
  );
};

export default index;
