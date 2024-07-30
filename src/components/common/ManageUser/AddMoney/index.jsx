import React, { useState } from 'react';
import { StyledAddMoney } from './AddMoney.styles';
import Form, { useForm } from '@/components/molecules/Form';
import Field from '@/components/molecules/Field';
import Button from '@/components/atoms/Button';
import walletService from '@/services/walletService';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import { formatNumber } from '@/helpers/common';

const AddMoney = ({ id, currentBalance, setMoneyAdded, setMoneyAddedMessage }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();

  async function handelSubmit(data) {
    try {
      setIsLoading(true);
      const payload = {
        userId: id,
        balanceAmount: data?.balanceAmount,
        paymentProofDocument: data?.paymentProofDocument,
      };

      const formDataToSend = new FormData();
      Object.keys(payload).forEach(key => {
        formDataToSend.append(key, payload[key]);
      });

      const resp = await walletService.addBalance(formDataToSend);
      setMoneyAddedMessage(resp.message);
      setMoneyAdded(true);
      refetch();
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <StyledAddMoney>
      <strong className="title">Please enter amount to add money to wallet.</strong>
      <div className="balanceWrap">
        <strong className="title">Current Wallet Balance:</strong>
        <strong className="title balance"> ${formatNumber(currentBalance) || 0}</strong>
      </div>
      <div className="formWrap">
        <Form form={form} onSubmit={handelSubmit}>
          <div className="combineFields">
            <Form.Item
              type="number"
              label="Enter Amount"
              name="balanceAmount"
              sm
              rounded
              placeholder="$25,000"
              rules={[
                {
                  required: true,
                  message: 'Amount is Required',
                },
                {
                  pattern: /^(?!0+(\.0+)?$)(0|[1-9]\d{0,6})(\.\d{1,2})?$/,
                  message: 'Please enter a valid limit between 0.01 and 9999999, with up to 2 decimal places',
                },
              ]}>
              <Field />
            </Form.Item>
            <Form.Item
              name="paymentProofDocument"
              rules={[{ required: true, message: 'Please Upload Payment Proof Document!' }]}>
              <Field
                label="Payment Proof Document"
                rounded
                disc="File size must be less than or equal to 1MB in JPEG, JPG, PNG or PDF format."
                type="img"
                isDoc
                noMargin
                fileSize="1"
                accept="image/jpeg, image/jpg, image/png, application/pdf"
                uploadTitle="You can upload upto 1MB, Image (JPEG, JPG, PNG or PDF)"
              />
            </Form.Item>
          </div>

          <Button rounded md btntype="primary" loader={isLoading} width="170" htmlType="submit">
            Add Money
          </Button>
        </Form>
      </div>
    </StyledAddMoney>
  );
};

export default AddMoney;
