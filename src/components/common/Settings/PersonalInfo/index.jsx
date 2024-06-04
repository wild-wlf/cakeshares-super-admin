import React from 'react';
import { StyledPersonalInfo } from './PersonalInfo.styles';
import UploadImg from '@/components/molecules/UploadImg';
import Form, { useForm } from '@/components/molecules/Form';
import Field from '@/components/molecules/Field';

const PersonalInfo = () => {
  const [form] = useForm();
  return (
    <StyledPersonalInfo>
      <UploadImg />
      <Form form={form}>
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
      </Form>
    </StyledPersonalInfo>
  );
};

export default PersonalInfo;
