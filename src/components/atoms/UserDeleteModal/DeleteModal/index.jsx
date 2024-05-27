import React, { useState } from 'react';
import { DeleteModalWrapper } from './DeleteModal.style';
import Button from '../../Button';
import productService from '@/services/productService';
import Toast from '@/components/molecules/Toast';

const DeleteModal = ({
  id,
  closeDeleteModal,
  openSuccessfulModal,
  title = 'Suspend User!',
  text = 'Are you sure you want to suspend this User?',
  onClose,
}) => {
  console.log(id);
  const [isLoading, setIsLoading] = useState(false);
  const onDecline = async () => {
    try {
      setIsLoading(true);
      await productService.deleteProduct(id);
      openSuccessfulModal();
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
    <DeleteModalWrapper>
      <div className="title-div">
        <h2>{title}</h2>
        <span>{text}</span>
      </div>
      <div className="btn-wrapper">
        <Button outline onClick={closeDeleteModal} block>
          No
        </Button>
        <Button variant="danger" className="danger" onClick={onDecline} block>
          Yes, Suspend
        </Button>
      </div>
    </DeleteModalWrapper>
  );
};

export default DeleteModal;
