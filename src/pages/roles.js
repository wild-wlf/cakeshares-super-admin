import React, { useState } from 'react';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import RolesTable from '@/components/common/RolesTable';
import Head from 'next/head';

const roles = () => {
  const [roleCount, setRoleCount] = useState();

  return (
    <div>
      <Head>
        <title>CAKESHARES | ROLES MANAGEMENT </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title={'Roles Management'}
        tagLine={`You have total ${roleCount || 0} roles in your roles management right now!`}
      />
      <RolesTable setRoleCount={setRoleCount} />
    </div>
  );
};

export default roles;
