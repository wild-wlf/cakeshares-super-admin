import Image from 'next/image';
import React from 'react';
import LoaderImg from '../../../../public/assets/loading.svg';
import { LoadingWrapper } from './PreLoader.styles';

const PreLoader = () => (
  <LoadingWrapper>
    <Image width={65} height={65} src={LoaderImg} alt="https://loading.io" />
  </LoadingWrapper>
);

export default PreLoader;
