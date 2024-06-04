import React, { useState } from 'react';
import Head from 'next/head';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import ManageUserTable from '@/components/common/ManageUser/ManageUserTable';

const ManageUser = () => {
  const [userCount, setUserCount] = useState();
  return (
    <>
      <Head>
        <title>CAKESHARES | MANAGE USERS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title="Manage Users"
        tagLine={`You have total ${userCount || 0} Users in your manage users right now!`}
      />
      <ManageUserTable setUserCount={setUserCount} />
    </>
  );
};
export default ManageUser;
