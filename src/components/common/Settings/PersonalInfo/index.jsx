import React, { useEffect, useState } from 'react';
import { StyledPersonalInfo } from './PersonalInfo.styles';
import UploadImg from '@/components/molecules/UploadImg';
import Form, { useForm } from '@/components/molecules/Form';
import Field from '@/components/molecules/Field';
import Button from '@/components/atoms/Button';
import infoIcon from '../../../../../public/assets/info-icon.svg';
import Image from 'next/image';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import SuccessModal from '@/components/molecules/SuccessModal/SuccessModal';
import successIcon from '../../../../../public/assets/success-icon.png';
import AdminService from '@/services/adminService';
import Toast from '@/components/molecules/Toast';

const PersonalInfo = ({ user }) => {
  const [form] = useForm();
  const [successModal, setSuccessModal] = useState(false);
  const onSubmit = async () => {
    try {
      const data = await form.validateFields();
      const { firstName, lastName, email } = data;
      const fullName = `${firstName} ${lastName}`;
      const payload = {
        fullName,
        email,
      };
      console.log('payload', payload);
      await AdminService.UpdateAdmin(user._id, payload);
      setSuccessModal(true);
    } catch (error) {
      Toast({
        type: 'error',
        message: error.message,
      });
    }
  };
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
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
        <SuccessModal heading="Changes Saved Successfully!" />
      </CenterModal>
      <StyledPersonalInfo>
        <div className="img-holder">
          <UploadImg onChange={e => e.target.value} />
        </div>
        <div className="form">
          <Form form={form} onSubmit={onSubmit}>
            <div className="input-wrap">
              <Form.Item
                type="text"
                label="First Name"
                name="firstName"
                rounded
                placeholder="Mickhel"
                rules={[
                  {
                    required: true,
                    message: 'Name is Required',
                  },
                  {
                    pattern: /^.{2,}$/,
                    message: 'Minimum character length is 2.',
                  },
                  {
                    pattern: /^.{0,256}$/,
                    message: 'Maximum character length is 256.',
                  },
                ]}>
                <Field />
              </Form.Item>
              <Form.Item
                type="text"
                label="Last Name"
                name="lastName"
                rounded
                placeholder="James"
                rules={[
                  {
                    required: true,
                    message: 'Last name is Required',
                  },
                  {
                    pattern: /^.{2,}$/,
                    message: 'Minimum character length is 2.',
                  },
                  {
                    pattern: /^.{0,256}$/,
                    message: 'Maximum character length is 256.',
                  },
                ]}>
                <Field />
              </Form.Item>
              <Form.Item
                type="email"
                label="Email Address"
                name="email"
                rounded
                placeholder="Mickheljames@gmail.com"
                rules={[
                  {
                    required: true,
                    message: 'email is Required',
                  },
                ]}>
                <Field />
              </Form.Item>
            </div>
            <Button variant="green" htmlType="submit">
              Save Changes
            </Button>
          </Form>
        </div>
        <div className="message">
          <Image src={infoIcon} alt="infoIcon" />
          <span>
            You can not change your email, yet you have to contact our <strong>support?</strong>
          </span>
        </div>
      </StyledPersonalInfo>
    </>
  );
};

export default PersonalInfo;
