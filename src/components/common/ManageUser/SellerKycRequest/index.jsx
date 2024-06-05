import React, { useState, useEffect } from 'react';
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
import { getKycFileName } from '@/helpers/common';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import DocumentViewerModal from '@/components/molecules/DocumentViewerModal';
import Link from 'next/link';
import KYCDeclineModal from '../../KYCDeclineModal';
import declineIcon from '../../../../../public/assets/decline-icon.svg';

const SellerKycRequest = ({ user, setkycApproved, setkycDecline, setApprovedorDeclinedKycLevel }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [declineKycModal, setDeclineKycModal] = useState(false);
  const [viewDocument, setViewDocument] = useState(false);
  const [documentToPreview, setDocumentToPreview] = useState();
  const [kycInfo, setKycInfo] = useState();

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

  const declineKyc = async data => {
    try {
      setIsLoading(true);
      await kycService.declineKyc(user?._id, { ...data });
      setApprovedorDeclinedKycLevel(user?.kycRequestLevel);
      setkycDecline(true);
      refetch();
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    kycService.getKycInfo(user?._id).then(data => {
      setKycInfo(data?.finalKycData);
    });
  }, []);

  return (
    <>
      <CenterModal open={viewDocument} setOpen={setViewDocument} title="View Document" width="543">
        <DocumentViewerModal documentToPreview={documentToPreview} />
      </CenterModal>
      <CenterModal
        title={<Image src={declineIcon} alt="declineIcon" />}
        open={declineKycModal}
        setOpen={setDeclineKycModal}
        width="543">
        <KYCDeclineModal declineKyc={declineKyc} isLoading={isLoading} />
      </CenterModal>
      <StyledKycRequest>
        <strong className="title">Request for KYC Approval</strong>
        <span className="wrapperTitle">Bank Details Info:</span>
        <div className="product-info">
          <div className="col">
            <span className="heading">Bank Name:</span>
            <span className="text">{kycInfo?.bankDetails?.bankName || '-----------'}</span>
          </div>
          <div className="col">
            <span className="heading">Account Holder:</span>
            <span className="text">{kycInfo?.bankDetails?.accountHolder || '-----------'}</span>
          </div>
          <div className="col">
            <span className="heading">Account Number:</span>
            <span className="text">{kycInfo?.bankDetails?.accountNumber || '-----------'}</span>
          </div>
        </div>

        {kycInfo?.images &&
          kycInfo?.images?.length > 0 &&
          kycInfo?.images?.map((ele, index) => {
            const fileName = getKycFileName(ele?.url);
            return (
              <>
                <span className="wrapperTitle">{ele?.fieldName}:</span>
                <div key={index} className="product-info">
                  <div className="uploadedDocDetail">
                    <figure className="docType">
                      <Image src={fileIcon} alt="fileIcon" />
                    </figure>
                    <span>{fileName}</span>
                  </div>
                  <div className="actionButton">
                    <div className="view">
                      <Image
                        onClick={() => {
                          setDocumentToPreview(ele?.url);
                          setViewDocument(true);
                        }}
                        src={view}
                        alt="view"
                      />
                    </div>
                    <div className="download">
                      <Link href={ele?.url} download={fileName}>
                        <Image src={downloadIcon} alt="downloadIcon" />
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        <div className="btnWrap">
          <Button variant="danger" block onClick={() => setDeclineKycModal(true)}>
            Decline
          </Button>
          <Button block onClick={approveKyc}>
            Approve
          </Button>
        </div>
      </StyledKycRequest>
    </>
  );
};

export default SellerKycRequest;
