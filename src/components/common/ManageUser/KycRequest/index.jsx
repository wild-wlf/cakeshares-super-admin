import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import { StyledKycRequest } from './KycRequest.style';
import fileIcon from '../../../../../public/assets/fileIcon.svg';
import view from '../../../../../public/assets/view.svg';
import downloadIcon from '../../../../../public/assets/downloadIcon.svg';
import kycService from '@/services/kycService';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import { getKycFileName } from '@/helpers/common';
import Link from 'next/link';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import DocumentViewerModal from '@/components/molecules/DocumentViewerModal';

const KycRequest = ({ user, setkycApproved, setkycDecline, setApprovedorDeclinedKycLevel }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [currentDocName, setCurrentDocName] = useState();
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

  useEffect(() => {
    kycService.getKycInfo(user?._id).then(data => {
      setKycInfo(data?.finalKycData);
    });
  }, []);

  return (
    <>
      <CenterModal open={viewDocument} setOpen={setViewDocument} title={currentDocName} width="543">
        <DocumentViewerModal documentToPreview={documentToPreview} />
      </CenterModal>
      <StyledKycRequest>
        <strong className="title">Request for KYC Level: {user?.kycRequestLevel || 'None'}:</strong>
        {kycInfo?.bankDetails && (
          <>
            <span className="wrapperTitle">Bank Details Info:</span>
            <div className="product-info">
              <div className="col">
                <span className="heading">Email:</span>
                <span className="text">{kycInfo?.bankDetails?.email}</span>
              </div>
              <div className="col">
                <span className="heading">Account Holder Name:</span>
                <span className="text">{kycInfo?.bankDetails?.accountHolder}</span>
              </div>
              <div className="col">
                <span className="heading">Account no:</span>
                <span className="text">{kycInfo?.bankDetails?.accountNumber}</span>
              </div>
            </div>
          </>
        )}
        {/* <span className="wrapperTitle">Residence Proof Info:</span> */}
        {kycInfo?.images &&
          kycInfo?.images?.length > 0 &&
          kycInfo?.images?.map((ele, index) => {
            const fileName = getKycFileName(ele);
            return (
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
                        setDocumentToPreview(ele);
                        setCurrentDocName(getKycFileName(ele));
                        setViewDocument(true);
                      }}
                      src={view}
                      alt="view"
                    />
                  </div>
                  <div className="download">
                    <Link href={ele} download={fileName}>
                      <Image src={downloadIcon} alt="downloadIcon" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="btnWrap">
          <Button variant="danger" block onClick={declineKyc}>
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

export default KycRequest;
