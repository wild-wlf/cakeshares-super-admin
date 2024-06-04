import React, { useEffect, useState } from 'react';
import { ImageHolder, NotificationsHolder } from './Notifications.styles';
import Investment from '../../../../public/assets/investment-icon.svg';
import Property from '../../../../public/assets/property-icon.svg';
import Message from '../../../../public/assets/message-icon.svg';
import Image from 'next/image';
import notificationService from '@/services/notificationservice';

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 3,
  });
  const [notifications, setNotifications] = useState([]);

  const [fetchNotifications, setfetchNotifications] = useState(false);
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
  // !TODO add notification logic here

  const { notification_data, nitification_loading } = notificationService.GetAllNotifications(
    searchQuery,
    fetchNotifications,
  );

  console.log(notification_data);

  useEffect(() => {
    window.addEventListener(
      'admin_notification',
      setfetchNotifications(() => new Date()),
    );
    return () => {
      window.removeEventListener(
        'admin_notification',
        setfetchNotifications(() => new Date()),
      );
    };
  }, []);
  return (
    <NotificationsHolder>
      {notificationData.length > 0
        ? notificationData.map((item, index) => (
            <div key={index} className="holder">
              <div className="notifications">
                <div className="content">
                  <ImageHolder background={item.background}>
                    <Image src={item.image} alt="notification" />
                  </ImageHolder>
                  <div>
                    <span className="heading">{item.heading}</span>
                    <div className="date-time">
                      <span className="date">{item.date}</span>
                    </div>
                  </div>
                </div>
                {item.tag && (
                  <div className="tag">
                    <span>{item.tag}</span>
                  </div>
                )}
              </div>
              <span className="text">{item.text}</span>
            </div>
          ))
        : 'Nothing found'}
    </NotificationsHolder>
  );
};

export default Notifications;
