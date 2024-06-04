import React, { useState } from 'react';
import { GrNext } from 'react-icons/gr';
import { StyledProfileSetting } from './ProfileSetting.styles';
import userImage from '../../../../../public/assets/user-img.png';
import Image from 'next/image';
import PersonalInfo from '../PersonalInfo';
import UpdatePassword from '../UpdatePassword';
import AdminService from '@/services/adminService';
import Toast from '@/components/molecules/Toast';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';

const ProfileSetting = () => {
  const { user } = useContextHook(AuthContext, v => ({
    user: v.user,
  }));
  console.log(user);
  const [tab, setTab] = useState(1);
  const handleTabs = index => {
    setTab(index);
  };

  return (
    <StyledProfileSetting>
      <div className="side-bar">
        <div className="img-holder">
          <Image src={user?.profilePicture} alt="userImage" width={250} height={300} />
        </div>
        <span className="name">{user?.fullName}</span>
        <span className="email">{user?.email}</span>
        <div className={tab === 1 ? 'tab active' : 'tab'} onClick={() => handleTabs(1)}>
          <span>Personal Info</span>
          <GrNext />
        </div>
        <div className={tab === 2 ? 'tab active' : 'tab'} onClick={() => handleTabs(2)}>
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
            <UpdatePassword />
          </span>
        )}
      </div>
    </StyledProfileSetting>
  );
};

export default ProfileSetting;
