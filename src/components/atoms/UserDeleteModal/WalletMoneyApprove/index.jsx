import React, { useState } from 'react';
import { DeleteModalWrapper } from './WalletMoneyApprove.style';
import Button from '../../Button';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import walletService from '@/services/walletService';

const WalletMoneyApprove = ({ user, title, text, onClose }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
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
    <DeleteModalWrapper>
      <div className="title-div">
        <h2>{title}</h2>
        <span>{text}</span>
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
  );
};

export default WalletMoneyApprove;
