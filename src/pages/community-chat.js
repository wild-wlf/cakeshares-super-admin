import React, { useState, useEffect } from 'react';
import Chat from '@/components/common/Chat';
import ChatMedia from '@/components/common/Chat/ChatMedia';
import SideBar from '@/components/common/Community/SideBar';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import { SellerContainer } from '@/styles/GlobalStyles.styles';
import Head from 'next/head';

const CommunityChat = () => {
  const [chosenComDetails, setChosenComDetails] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [conversations, setConversations] = useState([]);

  const handleChoseComDetails = details => {
    setChosenComDetails(details);
  };

  useEffect(() => {
    window.addEventListener('online_users', event => {
      setOnlineUsers(event.detail);
    });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('online_users', () => {});
    };
  }, []);

  return (
    <div>
      <Head>
        <title>CAKESHARES | Community Chat</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SellerContainer>
        <AdminTopBar
          title={'Community Chat'}
          tagLine={`You have total ${conversations?.length} chat${
            conversations?.length > 1 ? 's' : ''
          } in your Community chat right now!`}
        />
        <div className="chat-holder">
          <SideBar
            conversations={conversations}
            setConversations={setConversations}
            handleChoseComDetails={handleChoseComDetails}
            chosenComDetails={chosenComDetails}
            type="community"
          />
          {chosenComDetails && (
            <>
              <Chat chosenComDetails={chosenComDetails} type="community" />
              <ChatMedia onlineUsers={onlineUsers} chosenComDetails={chosenComDetails} />
            </>
          )}
        </div>
      </SellerContainer>
    </div>
  );
};

export default CommunityChat;
