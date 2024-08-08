import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import logo from '../../../../public/assets/logo.svg';
import { Sidenav, NavLinks, LinkContainer, UserDet } from './sideNav.style';
import SellerProfile from '../../../../public/assets/SellerProfile.png';
import avatar_icon from '../../../../public/assets/user_avatar.png';

const SideBar = ({ data }) => {
  const [isRendered, setIsRendered] = useState(false);
  const { user, onLogout, allowedPages } = useContextHook(AuthContext, v => ({
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

  return (
    // eslint-disable-next-line react/jsx-filename-extension
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
            <Image src={logo} alt="logo" />
          </div>

          <LinkContainer>
            {data.map((data, index) => (
              <NavLinks key={index}>
                <li className="listHead">{data.name}</li>
                {data.link
                  .filter(linkItem => linkItem?.name === 'Log Out' || allowedPages.includes(linkItem.navigation))
                  .map((data, index) => (
                    <li className={`NavItem ${pathname === `${data.navigation}` && 'active'}`} key={index}>
                      {data.name === 'Log Out' ? (
                        <>
                          <Link className="Link" onClick={onLogout} href="">
                            <figure className="iconCon">
                              <Image src={data.icon} width={18} height={18} alt="icon" />
                            </figure>
                            {data.name}
                          </Link>
                        </>
                      ) : (
                        <Link className="Link" href={data.navigation}>
                          <figure className="iconCon">
                            <Image src={data.icon} width={18} height={18} alt="icon" />
                          </figure>
                          {data.name}
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
                src={
                  user?.profilePicture != 'undefined' && user?.profilePicture != undefined
                    ? user?.profilePicture
                    : avatar_icon
                }
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
