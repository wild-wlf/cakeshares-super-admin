import React, { useState } from 'react';
import { DeleteModalWrapper } from './ViewPayoutInfo.styles';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import paymentService from '@/services/paymentService';
import Button from '../Button';
import { format } from 'date-fns';
import { formatNumber, getDateObject } from '@/helpers/common';

const ViewPayoutInfo = ({ payoutInfo, setViewPayoutInfo }) => {
  console.log(payoutInfo);
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async status => {
    try {
      setIsLoading(true);

      const resp = await paymentService.handlePayoutRequest(payoutInfo?._id, {
        status,
        amountIn: parseFloat(payoutInfo?.amountIn?.$numberDecimal),
      });

      refetch();
      Toast({
        type: 'success',
        message: `Payout Request ${status ? status.charAt(0).toUpperCase() + status.slice(1) : ''} Successfully!`,
      });
      setViewPayoutInfo(false);
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
            <span className="text">{payoutInfo.userId?.fullName}</span>
          </div>
          <div className="col">
            <span className="heading">Amount:</span>
            <span className="text">{`$${formatNumber(payoutInfo?.amountIn?.$numberDecimal)}`}</span>
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
