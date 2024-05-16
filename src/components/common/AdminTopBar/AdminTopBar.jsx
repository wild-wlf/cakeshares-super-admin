import React, { useState } from "react";
import { Container, DataContainer } from "./AdminTopBar.style";
import Image from "next/image";
import Notifications from "../../molecules/Notifications";
import bell from "../../../../public/assets/bell.svg";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const AdminTopBar = ({ title, tagLine, suffix }) => {
  const [notifications, setNotifications] = useState(false);

  // const openSideNav = () => {
  //   document.body.classList.toggle("sideNav-active");
  //   document.body.style.overflow = "hidden";
  // }

  return (
    <>
      <Container>
        <div className="barData">
          <div
            className="closedNav"
            onClick={() => {
              openSideNav();
            }}
          >
            <HiOutlineMenuAlt1 />
          </div>
          <div className="dataContainer">
            <div className="Heading">
              <h1>{title}</h1>
              {suffix && <Image src={suffix} alt="handicon" />}
            </div>
            <p>{tagLine}</p>
          </div>
        </div>

        <div className="barActions">
          <div
            className="notification"
            onClick={() => {
              setNotifications(!notifications);
            }}
          >
            <Image src={bell} alt="bell" className="bell" />
            {/* <Image src={bellWhite} alt="bell" className="bell-white" /> */}
            <div
              className={
                notifications
                  ? "notificationWrapper-visible"
                  : "notificationWrapper"
              }
            >
              <Notifications />
            </div>
          </div>
        </div>
      </Container>

      <DataContainer>
        <div className="Heading">
          <h1>{title}</h1>
          {suffix && <Image src={suffix} alt="handicon" />}
        </div>
        <p>{tagLine}</p>
      </DataContainer>
    </>
  );
};

export default AdminTopBar;
