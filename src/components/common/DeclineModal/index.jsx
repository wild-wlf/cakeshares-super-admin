import React, { useState } from 'react';
import { StyledDeclineModal } from './DeclineModal.styles';
import Button from '@/components/atoms/Button';
import userService from '@/services/userService';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import Toast from '@/components/molecules/Toast';
import productService from '@/services/productService';
import { useForm } from '@/components/molecules/Form';
import Form from '@/components/molecules/Form/Form';
import Field from '@/components/molecules/Field';

const DeclineModal = ({ type, onClose, id, title = 'Decline Request!', btnText = 'Yes, Decline' }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const onDecline = async data => {
    const { declineReason } = data;
    try {
      setIsLoading(true);
      const payload = {
        verificationStatus: 'rejected',
        declineReason,
      };

      const formDataToSend = new FormData();
      Object.keys(payload).forEach(key => {
        formDataToSend.append(key, payload[key]);
      });

      if (type === 'Product') {
        await productService.updateProduct(id, formDataToSend);
      } else {
        await userService.updateUser(id, formDataToSend);
      }
      Toast({
        type: 'success',
        message: `${type} Declined Successfully!`,
      });
      type !== 'Product' ? onClose() : null;
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
      <Form form={form} onSubmit={onDecline}>
        <span className="heading">{title}</span>
        <div className="text">
          <p>Please provide a reason for the user to know why his request have been declined.</p>
        </div>
        <Form.Item
          name="declineReason"
          type="textarea"
          placeholder="Write Reason..."
          rules={[
            { required: true, message: 'Please Enter Decline Reason!' },
            {
              pattern: /^(.|\n){10,256}$/,
              message: 'Product decline Reason must be between 10 and 256',
            },
          ]}>
          <Field />
        </Form.Item>
        <Button rounded md variant="danger" loader={isLoading} width="250" htmlType="submit">
          {btnText}
        </Button>
      </Form>
    </StyledDeclineModal>
  );
};

export default DeclineModal;
