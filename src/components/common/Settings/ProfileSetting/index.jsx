import React, { useState } from 'react';
import { GrNext } from 'react-icons/gr';
import { StyledProfileSetting } from './ProfileSetting.styles';
import userImage from '../../../../../public/assets/user-img.png';
import Image from 'next/image';

const ProfileSetting = () => {
  const [tab, setTab] = useState(1);
  const handleTabs = index => {
    setTab(index);
  };

  return (
    <StyledProfileSetting>
      <div className="side-bar">
        <div className="img-holder">
          <Image src={userImage} alt="userImage" />
        </div>
        <span className="name">Mickhel James</span>
        <span className="email">micheljames@gmail.com</span>
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
        {tab === 1 && <span>Tab 1</span>}
        {tab === 2 && <span>Tab 2</span>}
      </div>
    </StyledProfileSetting>
  );
};

export default ProfileSetting;
