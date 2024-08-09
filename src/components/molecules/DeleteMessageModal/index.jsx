import React from 'react';
import { DeleteModalWrapper } from './DeleteMessageModal.styles';
import Button from '@/components/atoms/Button';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import Toast from '@/components/molecules/Toast';
import notificationService from '@/services/notificationservice';

const DeleteMessageModal = ({ closeDeleteModal, messageId, handleDeleteMessage }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));

  const handleDelete = async () => {
    try {
      const response = await notificationService.deleteMessage(messageId);
      if (response.success) {
        handleDeleteMessage(messageId);
        //  refetch();
        closeDeleteModal();
      }
    } catch (error) {
      Toast({ type: 'error', message: error.message });
    }
  };
  return (
    <DeleteModalWrapper>
      <div className="title-div">
        <h2>Delete Message!</h2>
        <span>Are you sure you want to delete this message?</span>
      </div>
      <div className="btn-wrapper">
        <Button sm rounded btntype="cancel" onClick={closeDeleteModal}>
          No
        </Button>
        <Button sm rounded variant="danger" className="danger" onClick={handleDelete}>
          Yes, Delete
        </Button>
      </div>
    </DeleteModalWrapper>
  );
};

export default DeleteMessageModal;
