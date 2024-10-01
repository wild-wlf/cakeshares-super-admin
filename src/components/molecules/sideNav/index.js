import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import logo from '../../../../public/assets/logo.svg';
import { Sidenav, NavLinks, LinkContainer, UserDet } from './sideNav.style';
import avatar_icon from '../../../../public/assets/user_avatar.png';
import notificationService from '@/services/notificationservice';

const SideBar = ({ data }) => {
  const [isRendered, setIsRendered] = useState(false);
  const { unreadCounts, setUnreadCounts, user, onLogout, allowedPages } = useContextHook(AuthContext, v => ({
    unreadCounts: v.unreadCounts,
    setUnreadCounts: v.setUnreadCounts,
    user: v.user,
    onLogout: v.onLogout,
    allowedPages: v.allowedPages,
  }));
  const { pathname } = useRouter();

  const closeSideNav = () => {
    document.body.classList.toggle('sideNav-active');
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    setIsRendered(true);
  }, []);

  useEffect(() => {
    const fetchUnreadCounts = async () => {
      try {
        const response = await notificationService.getUnreadCounts({
          page: 1,
          itemsPerPage: 10,
        });
        setUnreadCounts(response || { COM_CHAT: false, STAKE_CHAT: false });
      } catch (error) {
        console.error('Error fetching unread counts:', error);
      }
    };

    fetchUnreadCounts();
  }, []);

  useEffect(() => {
    const handleNewMessage = event => {
      const message = event.detail;
      const { channelName, message: msg } = message;

      const isCommunityChat = channelName.startsWith('com_');
      const isInvestorChat = channelName.startsWith('stake_');

      setUnreadCounts(prevCounts => ({
        COM_CHAT: isCommunityChat && window.location.pathname !== '/community-chat' ? true : prevCounts.COM_CHAT,
        STAKE_CHAT: isInvestorChat && window.location.pathname !== '/investor-chat' ? true : prevCounts.STAKE_CHAT,
      }));
    };

    window.addEventListener('com_message_history', handleNewMessage);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('com_message_history', handleNewMessage);
    };
  }, []);

  return (
    isRendered && (
      <>
        <div
          className="layer"
          onClick={() => {
            closeSideNav();
          }}
        />
        <Sidenav>
          <div className="nav-logo">
            <Link href="/dashboard">
              <Image src={logo} alt="logo" />
            </Link>
          </div>

          <LinkContainer>
            {data.map((item, index) => (
              <NavLinks key={index}>
                <li className="listHead">{item.name}</li>
                {item.link
                  .filter(linkItem => linkItem?.name === 'Log Out' || allowedPages.includes(linkItem.navigation))
                  .map((link, index) => (
                    <li className={`NavItem ${pathname === `${link.navigation}` && 'active'}`} key={index}>
                      {link.name === 'Log Out' ? (
                        <>
                          <Link className="Link" onClick={onLogout} href="">
                            <figure className="iconCon">
                              <Image src={link.icon} width={18} height={18} alt="icon" />
                            </figure>
                            {link.name}
                          </Link>
                        </>
                      ) : (
                        <Link className="Link" href={link.navigation}>
                          <figure
                            className={`iconCon ${
                              (link?.name === 'Community Chat' && unreadCounts.COM_CHAT) ||
                              (link?.name === "Investor's Chat" && unreadCounts.STAKE_CHAT)
                                ? 'new'
                                : ''
                            }`}>
                            <Image src={link.icon} width={18} height={18} alt="icon" />
                          </figure>
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
              </NavLinks>
            ))}
          </LinkContainer>

          <UserDet>
            <div className="img-holder">
              <Image
                src={user?.profilePicture && user?.profilePicture !== 'undefined' ? user?.profilePicture : avatar_icon}
                height={40}
                width={40}
                alt="user-profile"
              />
            </div>
            <div className="detailContainer">
              <span className="userName">{user?.fullName}</span>
              <span className="type">{user?.email}</span>
            </div>
          </UserDet>
        </Sidenav>
      </>
    )
  );
};

export default SideBar;
