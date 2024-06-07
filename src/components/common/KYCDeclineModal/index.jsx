import React, { useState } from 'react';
import { StyledDeclineModal } from './KYCDeclineModal.styles';
import Button from '@/components/atoms/Button';
import userService from '@/services/userService';
import { AuthContext } from '@/context/authContext';
import { useForm } from '@/components/molecules/Form';
import Form from '@/components/molecules/Form/Form';
import { useContextHook } from 'use-context-hook';
import Toast from '@/components/molecules/Toast';
import productService from '@/services/productService';
import Field from '@/components/molecules/Field';

const KYCDeclineModal = ({ declineKyc, isLoading }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [form] = useForm();
  const onSubmit = async data => {
    declineKyc(data);
  };
  return (
    <StyledDeclineModal>
      <Form form={form} onSubmit={onSubmit}>
        <span className="heading">Decline Request!</span>
        <div className="text">
          <p>Please provide a reason for the user to know why his request have been declined.</p>
        </div>
        <Form.Item
          name="declineReason"
          type="textarea"
          placeholder="Write Reason..."
          rules={[{ required: true, message: 'Please Enter Decline Reason!' }]}>
          <Field />
        </Form.Item>
        <Button rounded loader={isLoading} md btntype="primary" width="250" htmlType="submit">
          Yes, Decline!
        </Button>
      </Form>
    </StyledDeclineModal>
  );
};

export default KYCDeclineModal;
