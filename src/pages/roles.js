import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import RolesTable from '@/components/common/RolesTable';
import Head from 'next/head';
import React from 'react';

const roles = () => {
  return (
    <div>
      <Head>
        <title>CAKESHARES | ROLES MANAGEMENT </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar title={'Roles Management'} />
      <RolesTable />
    </div>
  );
};

export default roles;
