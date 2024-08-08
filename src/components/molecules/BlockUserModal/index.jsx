import React from 'react';
import { DeleteModalWrapper } from './BlockUserModal.style';
import Button from '@/components/atoms/Button';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import Toast from '@/components/molecules/Toast';
import notificationService from '@/services/notificationservice';

const BlockUserModal = ({ closeDeleteModal, messageUserId, reportMessageId, messageUserType }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));

  console.log(messageUserType,messageUserId)
  const handleSubmit = async () => {
    try {
      const response = await notificationService.blockUser(messageUserId, {
        reportMessageId,
        messageUserType,
      });
      if (response.success) {
        refetch();
        // closeDeleteModal();
      }
    } catch (error) {
      Toast({ type: 'error', message: error.message });
    }
  };
  return (
    <DeleteModalWrapper>
      <div className="title-div">
        <h2>Block User!</h2>
        <span>Are you sure you want to block this user?</span>
      </div>
      <div className="btn-wrapper">
        <Button sm rounded btntype="cancel" onClick={closeDeleteModal}>
          No
        </Button>
        <Button sm rounded variant="danger" className="danger" onClick={handleSubmit}>
          Yes, Block
        </Button>
      </div>
    </DeleteModalWrapper>
  );
};

export default BlockUserModal;
