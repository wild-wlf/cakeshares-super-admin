import React, { useState } from 'react';
import { Container } from '../../../molecules/BankModal/BankStyles';
import Field from '../../../molecules/Field';
import Form, { useForm } from '../../../molecules/Form';
import Button from '@/components/atoms/Button';
import ProfileMenuImage from '../../../../../public/assets/ProfileMenuImage.png';
import Image from 'next/image';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import Toast from '@/components/molecules/Toast';
import adminService from '@/services/adminService';

const UpdatePasswordModal = ({ onClose, admin }) => {
  const [form] = useForm();

  const [loading, setLoading] = useState(false);

  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));

  const onSubmit = async data => {
    try {
      setLoading(true);

      const payload = {
        password: data.password,
      };

      await adminService.updateAdminPassword(admin._id, payload);

      refetch();
      onClose();
      setLoading(false);
      Toast({
        type: 'success',
        message: 'Password Updated successfully!',
      });
    } catch (ex) {
      setLoading(false);
      Toast({
        type: 'error',
        message: ex.message,
      });
    }
  };
  return (
    <Container>
      <Image
        src={
          admin.profilePicture != '' && admin.profilePicture != 'undefined' ? admin.profilePicture : ProfileMenuImage
        }
        className="ProfilePicture"
        alt="Profile Picture"
        width={300}
        height={300}
      />
      <Form form={form} onSubmit={onSubmit}>
        <div className="feildContainer">
          <div className="wrapper">
            <Form.Item
              label="New Password"
              type="password"
              rounded
              sm
              name="password"
              placeholder="**********"
              rules={[
                {
                  required: true,
                },
                { password: true },
                { pattern: /^.{8,64}$/, message: 'Minimum Character Length is 8 and Maximum Character Length is 64' },
              ]}>
              <Field />
            </Form.Item>
          </div>
          <div className="wrapper">
            <Form.Item
              label="Confirm New Password"
              type="password"
              rounded
              sm
              name="confirm_password"
              placeholder="**********"
              rules={[
                {
                  required: true,
                },
                {
                  password: true,
                },
                {
                  transform: value => value !== form.getFieldValue('password'),
                  message: 'The two passwords that you entered do not match!',
                },
              ]}>
              <Field />
            </Form.Item>
          </div>
        </div>

        <Button rounded width={'170px'} height={'40px'} sm btntype="green" htmlType="submit" loader={loading}>
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default UpdatePasswordModal;
