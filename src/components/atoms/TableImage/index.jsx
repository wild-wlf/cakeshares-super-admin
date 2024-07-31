import React from 'react';
import Image from 'next/image';
import { ImageHolder } from './TableImage.styles';

function TableImage({ src, alt, rounded }) {
  return (
    <ImageHolder rounded={rounded}>
      <Image src={src} alt={alt} width={50} height={50} />
    </ImageHolder>
  );
}

export default TableImage;
