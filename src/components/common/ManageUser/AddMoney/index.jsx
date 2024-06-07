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

const AddMoney = ({ id, currentBalance, setMoneyAdded }) => {
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
      };
      await walletService.addBalance(payload);
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
    // console.log(e);
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
          <Form.Item
            type="text"
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
            ]}>
            <Field />
          </Form.Item>

          <Button rounded md btntype="primary" loader={isLoading} width="170" htmlType="submit">
            Add Money
          </Button>
        </Form>
      </div>
    </StyledAddMoney>
  );
};

export default AddMoney;
