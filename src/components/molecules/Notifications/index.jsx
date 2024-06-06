import React, { useEffect, useMemo, useState } from 'react';
import { ImageHolder, NotificationsHolder } from './Notifications.styles';
import Investment from '../../../../public/assets/investment-icon.svg';
import Property from '../../../../public/assets/property-icon.svg';
import Message from '../../../../public/assets/message-icon.svg';
import Image from 'next/image';
import notificationService from '@/services/notificationservice';
import { format } from 'date-fns';

const Notifications = ({ fetchNotifications }) => {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 3,
  });

  const notificationData = [
    {
      image: Message,
      heading: '1 New Message',
      date: '19 Mar, 2024 | 20:50 PM',
      tag: 'New',
      text: 'Hey Man! I am interested in your Asset, wanna have conversation?',
      background: 'rgba(78, 97, 153, 0.2)',
    },
    {
      image: Investment,
      heading: 'New Open Investment',
      tag: 'New',
      date: '19 Mar, 2024 | 20:50 PM',
      background: 'rgba(78, 97, 153, 0.2)',
    },
    {
      image: Property,
      heading: 'Egypt Property Product Update',
      date: '19 Mar, 2024 | 20:50 PM',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
      background: 'rgba(64, 143, 140, 0.2)',
    },
    {
      image: Investment,
      heading: 'New Open Investment',
      date: '19 Mar, 2024 | 20:50 PM',
      background: 'rgba(78, 97, 153, 0.2)',
    },
  ];

  const { notification_data, notification_loading } = notificationService.GetAllNotifications(
    searchQuery,
    fetchNotifications,
  );
  const getImageAndBackground = type => {
    let data = { image: Message, background: 'rgba(78, 97, 153, 0.2)' };
    switch (type) {
      case 'user_created':
        data = { image: Message, background: 'rgba(78, 97, 153, 0.2)' };
        break;
      case 'product_created':
        data = { image: Property, background: 'rgba(64, 143, 140, 0.2)' };
        break;
      case 'investment_created':
        data = { image: Investment, background: 'rgba(64, 143, 140, 0.2)' };
        break;
      case 'investment_created':
        data = { image: Investment, background: 'rgba(64, 143, 140, 0.2)' };
        break;

      default:
        break;
    }

    return data;
  };

  return (
    <NotificationsHolder>
      {notification_data.length > 0
        ? notification_data.map((item, index) => (
            <div key={index} className="holder">
              <div className="notifications">
                <div className="content">
                  <ImageHolder background={getImageAndBackground(item.actionType).background}>
                    <Image src={getImageAndBackground(item.actionType).image} alt="notification" />
                  </ImageHolder>
                  <div>
                    <span className="heading">{item.title || 'heading'}</span>
                    <div className="date-time">
                      <span className="date">{format(new Date(item?.created_at), 'yyyy-MM-dd')}</span>
                    </div>
                  </div>
                </div>
                {!item.isRead && (
                  <div className="tag">
                    <span>New</span>
                  </div>
                )}
              </div>
              <span className="text">{item.message}</span>
            </div>
          ))
        : 'Nothing found'}
    </NotificationsHolder>
  );
};

export default Notifications;
