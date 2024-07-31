import React, { useState } from 'react';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import PermissionTable from '@/components/common/PermissionsTable';
import Head from 'next/head';

const permissions = () => {
  const [permissionCount, setPermissionCount] = useState();
  return (
    <div>
      <Head>
        <title>CAKESHARES | PERMISSION MANAGEMENT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title="Permissions Management"
        tagLine={`You have total ${permissionCount || 0} permissions in your permissions management right now!`}
      />
      <PermissionTable setPermissionCount={setPermissionCount} />
    </div>
  );
};

export default permissions;
