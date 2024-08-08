import React, { useState, useEffect, useRef } from 'react';
import { ChatBody, ChatWrapper } from './ReportDetail.style';
import { RiMenu3Fill } from 'react-icons/ri';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import Loader from '../../atoms/Loader';
import { LoaderStyled } from '../../atoms/Loader/Loader.styles';
import notificationService from '@/services/notificationservice';
import ReportMessagesList from '../Chat/ReportMessageList';

const ReportDetailModal = ({ detail }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const { user, fetch } = useContextHook(AuthContext, v => ({
    user: v.user,
    fetch: v.fetch,
  }));

  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    conversationId: detail.conversationId,
  });

  const chatBoxRef = useRef(null);
  const [chatLoading, setChatLoading] = useState(true);
  const [moreMsgLoading, setMoreMsgLoading] = useState(false);
  const { messages_loading, messages_data } = notificationService.GetAllMessages(searchQuery, fetch);

  useEffect(() => {
    if (messages_data?.messages?.length > 0) {
      setChatMessages(prev => [...messages_data?.messages, ...prev]);

      setMoreMsgLoading(false);
    }
  }, [messages_data]);

  useEffect(() => {
    setChatLoading(chatMessages?.length > 0 ? false : messages_loading);
  }, [messages_loading]);

  const handleScrollToBottom = () => {
    if (chatBoxRef?.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleScrollToBottom();
    }, 300);
  }, []);

  const onScrolledToTop = e => {
    if (e.target.scrollTop === 0 && chatMessages?.length < messages_data?.totalItems && messages_data?.totalItems > 0) {
      setSearchQuery(prev => ({ ...prev, ['page']: prev?.page + 1 }));
      setMoreMsgLoading(true);
    }
  };

 

  return (
    <ChatWrapper>
      <div className="chatWrapper">
        <ChatBody ref={chatBoxRef} onScroll={onScrolledToTop}>
          {moreMsgLoading && (
            <div
              css={`
                display: flex;
                align-items: center;
                justify-content: center;
              `}>
              <LoaderStyled noHeight />
            </div>
          )}
          {chatLoading ? (
            <div
              css={`
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              `}>
              <Loader />
            </div>
          ) : (
            chatMessages?.map((item, index) => (
              <ReportMessagesList
                key={index}
                detail={item}
                messageId={item?._id}
                warningColor={detail?.messageId?._id === item?._id ? true : false}
                reportMessageId={detail?._id}
              />
            ))
          )}
        </ChatBody>
      </div>
      
    </ChatWrapper>
  );
};

export default ReportDetailModal;
