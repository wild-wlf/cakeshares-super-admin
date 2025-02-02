import React, { useState } from 'react';
import { StyledDeclineModal } from '../../DeclineModal/DeclineModal.styles';
import Button from '@/components/atoms/Button';
import userService from '@/services/userService';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import Toast from '@/components/molecules/Toast';
import productService from '@/services/productService';
import { useForm } from '@/components/molecules/Form';
import Form from '@/components/molecules/Form/Form';
import Field from '@/components/molecules/Field';

const EditRequestDeclineModal = ({ onClose, id, title = 'Decline Request!', btnText = 'Yes, Decline' }) => {
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
        status: 'Decline',
        declineReason,
      };

      await productService.manageProductEdit(id, payload);

      Toast({
        type: 'success',
        message: 'Product Edit Request Declined Successfully!',
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
      <Form form={form} onSubmit={onDecline}>
        <span className="heading">{title}</span>
        <div className="text">
          <p>Please provide a reason for the user to know why his edit request have been declined.</p>
        </div>
        <Form.Item
          name="declineReason"
          type="textarea"
          placeholder="Write Reason..."
          rules={[
            { required: true, message: 'Please Enter Decline Reason!' },
            {
              pattern: /^.{10,256}$/,
              message: 'Product description must be between 10 and 256 characters.',
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

export default EditRequestDeclineModal;
