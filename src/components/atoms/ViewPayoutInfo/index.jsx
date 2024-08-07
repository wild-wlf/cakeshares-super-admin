import React, { useState } from 'react';
import { DeleteModalWrapper } from './ViewPayoutInfo.styles';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import walletService from '@/services/walletService';
import Button from '../Button';
import { format } from 'date-fns';
import { formatNumber, getDateObject } from '@/helpers/common';

const ViewPayoutInfo = ({ payoutInfo }) => {
  console.log(payoutInfo);
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const user = {};
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
      <DeleteModalWrapper>
        <div className="title-div">
          <h2>View Payout Information</h2>
        </div>
        <div className="product-info">
          <div className="col">
            <span className="heading">Generated At:</span>
            <span className="text">{format(getDateObject(payoutInfo?.requestDate), 'yyyy-MM-dd') || 'sdsd'}</span>
          </div>
          <div className="col">
            <span className="heading">Requester:</span>
            <span className="text">{payoutInfo.fullName}</span>
          </div>
          <div className="col">
            <span className="heading">Amount:</span>
            <span className="text">{`$${formatNumber(payoutInfo?.amount)}`}</span>
          </div>
        </div>
        <div className="btn-wrapper">
          <Button outline variant="success" onClick={() => handleClick('approved')} block loader={isLoading}>
            Approve
          </Button>
          <Button variant="danger" onClick={() => handleClick('rejected')} block loader={isLoading}>
            Decline
          </Button>
        </div>
      </DeleteModalWrapper>
    </>
  );
};

export default ViewPayoutInfo;
