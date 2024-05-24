import React, { useState } from 'react';
import { StyledDeclineModal } from './DeclineModal.styles';
import Button from '@/components/atoms/Button';
import userService from '@/services/userService';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import Toast from '@/components/molecules/Toast';

const DeclineModal = ({ onClose, userId, title = 'Decline Request!', btnText = 'Yes, Decline' }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const onDeclineUser = async () => {
    try {
      setIsLoading(true);
      await userService.deleteUser(userId);
      Toast({
        type: 'success',
        message: 'User Declined Successfully!',
      });
      onClose();
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
    <StyledDeclineModal>
      <span className="heading">{title}</span>
      <div className="text">
        <p>Please provide a reason for the user to know why his request have been declined.</p>
      </div>
      <textarea placeholder="Write Reason..." />
      <Button variant="danger" loader={isLoading} width="250" onClick={onDeclineUser}>
        {btnText}
      </Button>
    </StyledDeclineModal>
  );
};

export default DeclineModal;
