import React, { useState } from 'react';
import Head from 'next/head';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import AdminTable from '@/components/common/Admins/AdminTable';

const admins = () => {
  const [adminCount, setAdminCount] = useState();

  return (
    <div>
      <Head>
        <title>CAKESHARES | ADMINS MANAGEMENT </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title={'Admins Management'}
        tagLine={`You have total ${adminCount || 0} admins in your admins management right now!`}
      />
      <AdminTable setAdminCount={setAdminCount} />
    </div>
  );
};

export default admins;
