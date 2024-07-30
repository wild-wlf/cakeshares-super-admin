import React, { useState } from 'react';
import { DeleteModalWrapper } from './WalletMoneyApprove.style';
import Button from '../../Button';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import walletService from '@/services/walletService';
import DocumentViewerModal from '@/components/molecules/DocumentViewerModal';
import CenterModal from '@/components/molecules/Modal/CenterModal';

const WalletMoneyApprove = ({ user, title, text, onClose, docUrl }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [viewDocument, setViewDocument] = useState(false);
  const [documentToPreview, setDocumentToPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async status => {
    try {
      setIsLoading(true);

      const resp = await walletService.approveReject({
        userId: user._id,
        amount: user.requestPaymentWallet[0].amount,
        status,
      });

      onClose();
      refetch();
      Toast({
        type: 'success',
        message: resp.message,
      });
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <CenterModal open={viewDocument} setOpen={setViewDocument} title="View Document" width="543">
        <DocumentViewerModal documentToPreview={documentToPreview} />
      </CenterModal>
      <DeleteModalWrapper>
        <div className="title-div">
          <h2>{title}</h2>
          <span>{text}</span>
          <Button
            onClick={() => {
              setDocumentToPreview(docUrl);
              setViewDocument(true);
            }}
            rounded
            md
            btntype="primary">
            View Payment Proof Document
          </Button>
        </div>
        <div className="btn-wrapper">
          <Button outline onClick={() => handleClick('rejected')} block loader={isLoading}>
            No
          </Button>
          <Button variant="success" onClick={() => handleClick('approved')} block loader={isLoading}>
            Yes
          </Button>
        </div>
      </DeleteModalWrapper>
    </>
  );
};

export default WalletMoneyApprove;
