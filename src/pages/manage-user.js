import React from 'react';
import Head from 'next/head';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import ManageUserTable from '@/components/common/ManageUserTable';

const index = () => (
  <>
    <Head>
      <title>CAKESHARES | MANAGE USERS</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <AdminTopBar title="Manage Users" tagLine="You have total 101 Users in your manage users right now!" />
    <ManageUserTable />
  </>
);

export default index;
