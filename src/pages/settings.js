import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import Banner from '@/components/common/Settings/Banner';
import ProfileSetting from '@/components/common/Settings/ProfileSetting';
import Head from 'next/head';
import React from 'react';

const settings = () => {
  return (
    <div>
      <Head>
        <title>CAKESHARES | MANAGE USERS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar title="Settings" tagLine="You can manage your account from here like changing the password etc." />
      <Banner />
      <ProfileSetting />
    </div>
  );
};

export default settings;
