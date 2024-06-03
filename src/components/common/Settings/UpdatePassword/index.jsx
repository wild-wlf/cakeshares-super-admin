import React, { useState } from 'react';
import { StyledUpdatePassword } from './UpdatePassword.styles';
import Form, { useForm } from '@/components/molecules/Form';
import Field from '@/components/molecules/Field';
import Button from '@/components/atoms/Button';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import SuccessModal from '@/components/molecules/SuccessModal/SuccessModal';
import successIcon from '../../../../../public/assets/success-icon.png';
import Image from 'next/image';

const UpdatePassword = () => {
  const [form] = useForm();
  const [successModal, setSuccessModal] = useState(false);
  return (
    <>
      <CenterModal
        open={successModal}
        setOpen={setSuccessModal}
        width="500"
        title={<Image src={successIcon} alt="successIcon" />}>
        <SuccessModal heading="Password Updated Successfully!" />
      </CenterModal>

      <StyledUpdatePassword>
        <span className="heading">Change Password</span>
        <div className="text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
        </div>
        <Form form={form}>
          <div className="input-wrap">
            <Form.Item
              type="text"
              label="Enter New Password"
              name="new_password"
              rounded
              placeholder="Enter Text..."
              rules={[
                {
                  required: true,
                  message: 'Password is Required',
                },
              ]}>
              <Field />
            </Form.Item>
            <Form.Item
              type="text"
              label="Confirm New Password"
              name="confirm_new_password"
              rounded
              placeholder="Enter Text..."
              rules={[
                {
                  required: true,
                  message: 'Password is Required',
                },
              ]}>
              <Field />
            </Form.Item>
          </div>
          <Button variant="green" onClick={() => setSuccessModal(true)}>
            Update Password
          </Button>
        </Form>
      </StyledUpdatePassword>
    </>
  );
};

export default UpdatePassword;
