import React, { useEffect } from 'react';
import { StyledSideBar } from './SideBar.styles';
import CommunityGroup from '../CommunityGroup';
import profileplaceHolder from '../../../../../public/assets/user-img.png';
import notificationService from '@/services/notificationservice';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import { updateCurrentComConversations } from '@/helpers/comMsgHandlers';
import { FaPollH } from 'react-icons/fa';

const SideBar = ({ type, handleChoseComDetails, chosenComDetails, conversations, setConversations }) => {
  const { user, fetch } = useContextHook(AuthContext, v => ({
    user: v.user,
    fetch: v.fetch,
  }));

  const { conversations_loading, conversations_data } = notificationService.GetAllConversations(
    {
      page: 1,
      itemsPerPage: 10,
      type: type === 'community' ? 'COM_CHAT' : 'STAKE_CHAT',
    },
    fetch,
  );

  useEffect(() => {
    if (conversations_data?.conversations?.length > 0) {
      setConversations(conversations_data?.conversations);
    }
  }, [conversations_data]);

  useEffect(() => {
    window.addEventListener('com_message_history', event => {
      updateCurrentComConversations({
        ...event.detail,
        type: type === 'community' ? 'COM_CHAT_MESSAGE' : 'STAKE_CHAT_MESSAGE',
        setConversations,
      });
    });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('com_message_history', () => {});
    };
  }, [type]);

  const renderParticipants = participants => {
    const channelParticipants = participants.filter(_ => _?._id !== user?._id);
    return channelParticipants.map((item, index) => (
      <>
        <span>{item?.fullName || item?.username}</span>
        {channelParticipants.length - 1 !== index && <span>,&nbsp;</span>}
      </>
    ));
  };

  return (
    <StyledSideBar>
      <div className="group-holder">
        {conversations_loading
          ? 'Loading...'
          : conversations?.map((item, index) => (
              <CommunityGroup
                key={index}
                isOnline={false}
                image1={user?.profilePicture || profileplaceHolder}
                image2={item?.participants[0]?.profilePicture || profileplaceHolder}
                image3={
                  item?.participants[1]?._id === user?._id
                    ? item?.participants[2]
                      ? item?.participants[2]?.profilePicture || profileplaceHolder
                      : null
                    : item?.participants[1]?.profilePicture || profileplaceHolder
                }
                title={renderParticipants(item?.participants)}
                text={
                  item?.lastMessage?.content ? (
                    item?.lastMessage?.content
                  ) : item?.lastMessage?.isPool ? (
                    <>
                      <FaPollH /> Poll
                    </>
                  ) : null
                }
                time={item?.updated_at}
                messageCounter={chosenComDetails ? 0 : item?.unreadCount ?? 0}
                groupActive={chosenComDetails?.conversationId === item?._id}
                onClick={() => {
                  handleChoseComDetails({
                    conversationId: item?._id,
                    author: user._id,
                    receivers: item?.participants,
                  });
                }}
              />
            ))}
      </div>
    </StyledSideBar>
  );
};

export default SideBar;
