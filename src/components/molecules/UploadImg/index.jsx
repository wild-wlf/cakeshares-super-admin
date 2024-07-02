import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StyledUploadImage } from './UploadImg.style';
import Camera from '../../../../public/assets/camera.svg';
import ProfilePic from '../../../../public/assets/profilepic.svg';
import Toast from '../Toast';

const UploadImg = ({ id = 'upload', img, onChange, fileSize = 2, accept = 'image/jpeg, image/jpg, image/png' }) => {
  const [uploaded, setUploaded] = useState('');

  function handelChange(e) {
    const file = e.target.files[0];

    const acceptableExtensions = accept.split(',').map(ext => ext.trim());
    if (!acceptableExtensions.includes(file.type)) {
      const extensions = acceptableExtensions
        .map(ext => ext.split('/')[1].toUpperCase())
        .join(', ')
        .replace(/,(?=[^,]*$)/, ' and');

      Toast({
        type: 'error',
        message: `File Must be in ${extensions} format!`,
      });
      return;
    }
    if (file) {
      const fileLength = file.size / (1024 * 1024);
      if (fileLength <= fileSize) {
        setUploaded(e.target.files[0]);
        onChange(e.target.files[0]);
      } else {
        Toast({
          type: 'error',
          message: 'File Size Exceeded!',
        });
      }
    }
  }

  useEffect(() => {
    setUploaded(img);
  }, []);

  return (
    <StyledUploadImage>
      <label htmlFor={id} className="labelButton">
        {!uploaded && (
          <span className="upload-text">
            <Image className="icon-img" src={ProfilePic} alt="icon" width={250} height={300} />
          </span>
        )}
        {uploaded && typeof uploaded === 'string' ? (
          <Image src={uploaded} alt="img" width={250} height={300} />
        ) : (
          uploaded && <Image src={URL.createObjectURL(uploaded)} alt="img" width={250} height={300} />
        )}
        <input type="file" id={id} accept={accept} onChange={e => handelChange(e)} />
        <Image src={Camera} alt="Camera" className="camera" width={250} height={300} />
      </label>
    </StyledUploadImage>
  );
};

export default UploadImg;
