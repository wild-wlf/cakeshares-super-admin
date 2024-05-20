import React from 'react';
import { StyledKycRequest } from './KycRequest.style';
import fileIcon from '../../../../../public/assets/fileIcon.svg';
import view from '../../../../../public/assets/view.svg';
import downloadIcon from '../../../../../public/assets/downloadIcon.svg';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
const KycRequest = () => {
  return (
    <StyledKycRequest>
      <strong className="title">Request for KYC Level 2:</strong>
      <span className="wrapperTitle">Bank Details Info:</span>
      <div className="product-info">
        <div className="col">
          <span className="heading">Bank Name:</span>
          <span className="text">Bank of Americe</span>
        </div>
        <div className="col">
          <span className="heading">Account Holder Name:</span>
          <span className="text">Alex Mertiz</span>
        </div>
        <div className="col">
          <span className="heading">Account no:</span>
          <span className="text">35402755003895</span>
        </div>
      </div>
      <span className="wrapperTitle">Residence Proof Info:</span>
      <div className="product-info">
        <div className="uploadedDocDetail">
          <figure className="docType">
            <Image src={fileIcon} alt="fileIcon" />
          </figure>
          <span>2023 - 2024 Bank Statement Statement Statement</span>
        </div>
        <div className="actionButton">
          <div className="view">
            <Image src={view} alt="view" />
          </div>
          <div className="download">
            <Image src={downloadIcon} alt="downloadIcon" />
          </div>
        </div>
      </div>
      <div className="btnWrap">
        <Button variant="danger" block>
          Decline
        </Button>
        <Button block>Approve</Button>
      </div>
    </StyledKycRequest>
  );
};

export default KycRequest;
