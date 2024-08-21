import React, { useState } from 'react';
import { DeleteModalWrapper } from './DeleteModal.style';
import Button from '../../Button';
import productService from '@/services/productService';
import Toast from '@/components/molecules/Toast';
import userService from '@/services/userService';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';

const DeleteModal = ({
  id,
  closeDeleteModal,
  openSuccessfulModal,
  title = 'Suspend User!',
  text = 'Are you sure you want to suspend this User?',
  action = 'Yes, Suspend',
  onClose,
  type,
}) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const onDecline = async () => {
    try {
      setIsLoading(true);
      if (type === 'user') {
        await userService.deleteUser(id);
      } else {
        await productService.deleteProduct(id);
      }
      openSuccessfulModal();
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
        <Button variant="danger" loader={isLoading} className="danger" onClick={onDecline} block>
          {action}
        </Button>
      </div>
    </DeleteModalWrapper>
  );
};

export default DeleteModal;
