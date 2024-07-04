import React, { useState } from 'react';
import { GrNext } from 'react-icons/gr';
import { StyledProfileSetting } from './ProfileSetting.styles';
import userImage from '../../../../../public/assets/user-img.png';
import Image from 'next/image';
import PersonalInfo from '../PersonalInfo';
import UpdatePassword from '../UpdatePassword';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';

const ProfileSetting = () => {
  const { user } = useContextHook(AuthContext, v => ({
    user: v.user,
  }));
  const [tab, setTab] = useState(1);
  const handleTabs = index => {
    setTab(index);
  };

  const [toggle, setToggle] = useState(false);

  return (
    <StyledProfileSetting toggle={toggle}>
      <div className="hamburger">
        {toggle ? (
          <RxCross2 onClick={() => setToggle(false)} size={20} />
        ) : (
          <RxHamburgerMenu onClick={() => setToggle(true)} size={20} />
        )}
      </div>
      <div className="side-bar">
        <div className="img-holder">
          <Image
            src={
              user?.profilePicture != 'undefined' && user?.profilePicture != undefined
                ? user?.profilePicture
                : userImage
            }
            alt="userImage"
            width={120}
            height={120}
          />
        </div>
        <span className="name">{user?.fullName}</span>
        <span className="email">{user?.email}</span>
        <div
          className={tab === 1 ? 'tab active' : 'tab'}
          onClick={() => {
            handleTabs(1), setToggle(false);
          }}>
          <span>Personal Info</span>
          <GrNext />
        </div>
        <div
          className={tab === 2 ? 'tab active' : 'tab'}
          onClick={() => {
            handleTabs(2), setToggle(false);
          }}>
          <span>Change Password</span>
          <GrNext />
        </div>
      </div>
      <div className="tab-content">
        {tab === 1 && (
          <span>
            <PersonalInfo user={user} />
          </span>
        )}
        {tab === 2 && (
          <span>
            <UpdatePassword user={user} />
          </span>
        )}
      </div>
    </StyledProfileSetting>
  );
};

export default ProfileSetting;
