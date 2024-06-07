import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import Chat from '@/components/common/Chat';
import ChatMedia from '@/components/common/Chat/ChatMedia';
import SideBar from '@/components/common/Community/SideBar';
import Head from 'next/head';
import React from 'react';

const index = () => {
  return (
    <div>
      <Head>
        <title>CAKESHARES | DASHBOARD</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title={'Stakeholders Chat'}
        tagLine={'You have total 101 total chats in your stakeholders chat right now!'}
      />
      <div className="chat-holder">
        <SideBar />
        <Chat />
        <ChatMedia type="Community" />
      </div>
    </div>
  );
};

export default index;
