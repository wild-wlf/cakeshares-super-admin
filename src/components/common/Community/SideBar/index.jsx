import React, { useState, useEffect, useMemo, useRef } from 'react';
import { StyledSideBar } from './SideBar.styles';
import CommunityGroup from '../CommunityGroup';
import profileplaceHolder from '../../../../../public/assets/user-img.png';
import notificationService from '@/services/notificationservice';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import { updateCurrentComConversations } from '@/helpers/comMsgHandlers';
import { FaPollH } from 'react-icons/fa';
import Field from '@/components/molecules/Field';
import debounce from 'lodash/debounce';
import { CiSearch } from 'react-icons/ci';

const SideBar = ({ type, handleChoseComDetails, chosenComDetails, conversations, setConversations }) => {
  const { user, fetch, setUnreadCounts } = useContextHook(AuthContext, v => ({
    user: v.user,
    fetch: v.fetch,
    setUnreadCounts: v.setUnreadCounts,
  }));
  const [searchText, setSearchText] = useState('');
  const debounceRef = useRef(0);

  const { conversations_loading, conversations_data } = notificationService.GetAllConversations(
    {
      page: 1,
      itemsPerPage: 10,
      type: type === 'community' ? 'COM_CHAT' : 'STAKE_CHAT',
      searchText,
    },
    fetch,
  );

  useEffect(() => {
    // if (conversations_data?.conversations?.length > 0) {
    setConversations(conversations_data?.conversations);
    // }
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

  useEffect(() => {
    setUnreadCounts(prevUnreadCounts => ({
      COM_CHAT: type === 'community' ? false : prevUnreadCounts.COM_CHAT,
      STAKE_CHAT: type === 'stake' ? false : prevUnreadCounts.STAKE_CHAT,
    }));
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

  const onSearchCallText = useMemo(
    () =>
      debounce(value => {
        debounceRef.current += 1;
        const LocalRef = debounceRef.current;
        setTimeout(() => {
          if (LocalRef === debounceRef.current) {
            setSearchText(value);
          }
        }, 1);
      }, 300),
    [],
  );

  return (
    <StyledSideBar>
      <div className="search">
        <Field
          type="search"
          rounded
          sm
          name="search"
          placeholder={'Search Chats'}
          suffix={<CiSearch className="icon" />}
          onChange={({ target: { value } }) => {
            onSearchCallText(value.trim());
          }}
        />
      </div>
      <div className="group-holder">
        {conversations_loading ? (
          'Loading...'
        ) : conversations?.length > 0 ? (
          conversations?.map((item, index) => (
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
                  productName: item.productName,
                });
              }}
            />
          ))
        ) : (
          <div className="noConvoFound">No Conversation Found!</div>
        )}
      </div>
    </StyledSideBar>
  );
};

export default SideBar;
