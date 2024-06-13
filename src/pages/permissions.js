import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import PermissionTable from '@/components/common/PermissionsTable';
import Head from 'next/head';
import React from 'react';

const permissions = () => {
  return (
    <div>
      <Head>
        <title>CAKESHARES | PERMISSION MANAGEMENT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar title="Permissions Management" />
      <PermissionTable />
    </div>
  );
};

export default permissions;
