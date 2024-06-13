import React, { useEffect, useState } from 'react';
import { StyledUpdatePassword } from './UpdatePassword.styles';
import Form, { useForm } from '@/components/molecules/Form';
import Field from '@/components/molecules/Field';
import Button from '@/components/atoms/Button';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import SuccessModal from '@/components/molecules/SuccessModal/SuccessModal';
import successIcon from '../../../../../public/assets/success-icon.png';
import Image from 'next/image';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import adminService from '@/services/adminService';

const UpdatePassword = ({ user }) => {
  const { fetchUser, onLogout } = useContextHook(AuthContext, v => ({
    fetchUser: v.fetchUser,
    onLogout: v.onLogout,
  }));
  const [form] = useForm();
  const [successModal, setSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async data => {
    try {
      setIsLoading(true);
      const payload = {
        password: data?.new_password,
      };
      const formDataToSend = new FormData();
      Object.keys(payload).forEach(key => {
        formDataToSend.append(key, payload[key]);
      });
      await adminService.updateAdmin(user._id, formDataToSend);
      setSuccessModal(true);
      fetchUser();
      setTimeout(() => {
        setSuccessModal(false);
        onLogout();
      }, 2000);
    } catch (error) {
      Toast({
        type: 'error',
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        new_password: user.new_password,
      });
    }
  }, [user, form]);

  return (
    <>
      <CenterModal
        open={successModal}
        setOpen={setSuccessModal}
        width="500"
        title={<Image src={successIcon} alt="successIcon" />}>
        <SuccessModal heading="Password Updated Successfully! Please Log In Again" />
      </CenterModal>

      <StyledUpdatePassword>
        <span className="heading">Change Password</span>
        <div className="text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
        </div>
        <Form form={form} onSubmit={onSubmit}>
          <div className="input-wrap">
            <Form.Item
              type="password"
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
              type="password"
              label="Confirm New Password"
              name="confirm_new_password"
              rounded
              placeholder="Enter Text..."
              rules={[
                {
                  required: true,
                  message: 'Password is Required',
                },
                {
                  transform: value => value !== form.getFieldValue('new_password'),
                  message: 'The two passwords that you entered do not match!',
                },
              ]}>
              <Field />
            </Form.Item>
          </div>
          <Button variant="green" htmlType="submit" loader={isLoading} disable={isLoading}>
            Update Password
          </Button>
        </Form>
      </StyledUpdatePassword>
    </>
  );
};

export default UpdatePassword;
