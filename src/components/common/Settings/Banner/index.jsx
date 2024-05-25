import React, { useState } from 'react';
import { StyledBanner } from './Banner.styles';
import { MdModeEditOutline } from 'react-icons/md';

const Banner = () => {
  const [bgImage, setBgImage] = useState('');

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <StyledBanner bgImage={bgImage}>
      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="file-input" />
      <label htmlFor="file-input" className="file-input-label">
        <div className="change-banner">
          <span>Change Banner</span>
          <div className="icon-holder">
            <MdModeEditOutline />
          </div>
        </div>
      </label>
    </StyledBanner>
  );
};

export default Banner;
