import React from 'react';
import { DeleteModalWrapper } from './DeletePermissionModal.style';
import Button from '@/components/atoms/Button';

const DeletePermissionModal = ({ closeDeleteModal, openSuccessfulModal }) => {
  return (
    <DeleteModalWrapper>
      <div className="title-div">
        <h2>Delete Permission!</h2>
        <span>Are you sure you want to delete this Permission?</span>
      </div>
      <div className="btn-wrapper">
        <Button sm rounded onClick={closeDeleteModal}>
          No
        </Button>
        <Button sm rounded variant="danger" className="danger" onClick={openSuccessfulModal}>
          Yes, Delete
        </Button>
      </div>
    </DeleteModalWrapper>
  );
};

export default DeletePermissionModal;
