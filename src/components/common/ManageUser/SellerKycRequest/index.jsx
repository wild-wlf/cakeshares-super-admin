import React from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import fileIcon from '../../../../../public/assets/fileIcon.svg';
import view from '../../../../../public/assets/view.svg';
import downloadIcon from '../../../../../public/assets/downloadIcon.svg';
import { StyledKycRequest } from '../KycRequest/KycRequest.style';
import kycService from '@/services/kycService';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';

const SellerKycRequest = ({ user, setkycApproved, setkycDecline, setApprovedorDeclinedKycLevel }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const approveKyc = async () => {
    try {
      await kycService.approveKyc(user?._id);
      setApprovedorDeclinedKycLevel(user?.kycRequestLevel);
      setkycApproved(true);
      refetch();
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
    }
  };

  const declineKyc = async () => {
    try {
      await kycService.declineKyc(user?._id);
      setApprovedorDeclinedKycLevel(user?.kycRequestLevel);
      setkycDecline(true);
      refetch();
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
    }
  };

  return (
    <StyledKycRequest>
      <strong className="title">Request for KYC Approval</strong>
      <span className="wrapperTitle">Bank Details Info:</span>
      <div className="product-info">
        <div className="col">
          <span className="heading">Bank Name:</span>
          <span className="text">{user?.bank?.bankName || '-----------'}</span>
        </div>
        <div className="col">
          <span className="heading">IBAN:</span>
          <span className="text">{user?.bank?.iban || '-----------'}</span>
        </div>
        <div className="col">
          <span className="heading">User ID:</span>
          <span className="text">{user?.bank?.userId || '-----------'}</span>
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
      <div className="btnWrap">
        <Button variant="danger" block onClick={declineKyc}>
          Decline
        </Button>
        <Button block onClick={approveKyc}>
          Approve
        </Button>
      </div>
    </StyledKycRequest>
  );
};

export default SellerKycRequest;
