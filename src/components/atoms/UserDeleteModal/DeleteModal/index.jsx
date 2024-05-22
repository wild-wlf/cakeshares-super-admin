import React from 'react';
import { DeleteModalWrapper } from './DeleteModal.style';
import Button from '../../Button';

const DeleteModal = ({
  closeDeleteModal,
  openSuccessfulModal,
  title = 'Suspend User!',
  text = 'Are you sure you want to suspend this User?',
  onClose,
}) => {
  return (
    <DeleteModalWrapper>
      <div className="title-div">
        <h2>{title}</h2>
        <span>{text}</span>
      </div>
      <div className="btn-wrapper">
        <Button outline onClick={closeDeleteModal} block>
          No
        </Button>
        <Button variant="danger" className="danger" onClick={openSuccessfulModal} block>
          Yes, Suspend
        </Button>
      </div>
    </DeleteModalWrapper>
  );
};

export default DeleteModal;
