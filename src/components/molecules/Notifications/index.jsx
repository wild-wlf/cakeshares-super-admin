import React from "react";
import { ImageHolder, NotificationsHolder } from "./Notifications.styles";
import Investment from "../../../_assets/investment-icon.svg";
import Property from "../../../_assets/property-icon.svg";
import Message from "../../../_assets/message-icon.svg";
import Image from "next/image";

const Notifications = () => {
  const notificationData = [
    {
      image: Message,
      heading: "1 New Message",
      date: "19 Mar, 2024 | 20:50 PM",
      tag: "New",
      text: "Hey Man! I am interested in your Asset, wanna have conversation?",
      background: "rgba(78, 97, 153, 0.2)",
    },
    {
      image: Investment,
      heading: "New Open Investment",
      tag: "New",
      date: "19 Mar, 2024 | 20:50 PM",
      background: "rgba(78, 97, 153, 0.2)",
    },
    {
      image: Property,
      heading: "Egypt Property Product Update",
      date: "19 Mar, 2024 | 20:50 PM",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
      background: "rgba(64, 143, 140, 0.2)",
    },
    {
      image: Investment,
      heading: "New Open Investment",
      date: "19 Mar, 2024 | 20:50 PM",
      background: "rgba(78, 97, 153, 0.2)",
    },
  ];
  return (
    <NotificationsHolder>
      {notificationData.map((item, index) => (
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
      ))}
    </NotificationsHolder>
  );
};

export default Notifications;
