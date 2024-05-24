import React from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import fileIcon from '../../../../../public/assets/fileIcon.svg';
import view from '../../../../../public/assets/view.svg';
import downloadIcon from '../../../../../public/assets/downloadIcon.svg';
import { StyledKycRequest } from '../KycRequest/KycRequest.style';

const CompanySellerKycRequest = ({ user, setkycApproved, setkycDecline }) => {
  console.log(user);
  return (
    <StyledKycRequest $flexWrap>
      <strong className="title">Request for KYB Approval</strong>
      <span className="wrapperTitle">Business Details Info:</span>
      <div className="product-info">
        <div className="col">
          <span className="heading">Business Name:</span>
          <span className="text">{user?.fullName}</span>
        </div>
        <div className="col">
          <span className="heading">Business Email</span>
          <span className="text">{user?.email}</span>
        </div>
        <div className="col">
          <span className="heading">Owner Full Name:</span>
          <span className="text">John Duo</span>
        </div>
        <div className="col">
          <span className="heading">Owner Phone no:</span>
          <span className="text">+1 123 456 789</span>
        </div>
        <div className="col">
          <span className="heading">Tax no:</span>
          <span className="text">123456789215246253</span>
        </div>
      </div>
      <span className="wrapperTitle">Bank Details Info:</span>
      <div className="product-info">
        <div className="col">
          <span className="heading">Bank Name:</span>
          <span className="text">{user?.bank?.bankName}</span>
        </div>
        <div className="col">
          <span className="heading">IBAN:</span>
          <span className="text">{user?.bank?.bankName}</span>
        </div>
        <div className="col">
          <span className="heading">Use ID:</span>
          <span className="text">{user?.bank?.userId}</span>
        </div>
      </div>
      <span className="wrapperTitle">ID Proof Info:</span>
      <div className="product-info">
        <div className="uploadedDocDetail">
          <figure className="docType">
            <Image src={fileIcon} alt="fileIcon" />
          </figure>
          <span>Passport Image...jpeg</span>
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
      <span className="wrapperTitle">Residence Proof Info:</span>
      <div className="product-info">
        <div className="uploadedDocDetail">
          <figure className="docType">
            <Image src={fileIcon} alt="fileIcon" />
          </figure>
          <span>2023 - 2024 Bank Statement....</span>
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
      <span className="wrapperTitle">Facial Info:</span>
      <div className="product-info">
        <div className="uploadedDocDetail">
          <figure className="docType">
            <Image src={fileIcon} alt="fileIcon" />
          </figure>
          <span>Video1242632...mp4</span>
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
      <span className="wrapperTitle">Comapany Documents Info:</span>
      <div className="product-info">
        <div className="uploadedDocDetail">
          <figure className="docType">
            <Image src={fileIcon} alt="fileIcon" />
          </figure>
          <span>company documnets....jpeg</span>
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
        <Button variant="danger" block onClick={() => setkycDecline(true)}>
          Decline
        </Button>
        <Button block onClick={() => setkycApproved(true)}>
          Approve
        </Button>
      </div>
    </StyledKycRequest>
  );
};

export default CompanySellerKycRequest;
