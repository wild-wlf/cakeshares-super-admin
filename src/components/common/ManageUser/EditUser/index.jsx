import React, { useEffect } from 'react';
import Field from '@/components/molecules/Field';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import { IoAdd } from 'react-icons/io5';
import UploadFile from '@/components/molecules/UploadFile';
import Form, { useForm } from '@/components/molecules/Form';
import { StyledCreateNewProduct } from '../../ManageProducts/CreateNewProduct/CreateNewProduct.styles';

const EditUser = ({ onClose }) => {
  const [form] = useForm();
  const handleSubmit = e => {
    console.log('e', e);
  };

  return (
    <StyledCreateNewProduct>
      <Form form={form} onSubmit={handleSubmit}>
        <span className="heading">Product Info:</span>
        <div className="input-grid">
          <Form.Item
            type="text"
            label="Full Name"
            name="full_name"
            sm
            rounded
            placeholder="Full Name"
            rules={[
              {
                required: true,
                message: 'Please enter Full Name',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            type="text"
            label="Username"
            name="user_name"
            sm
            rounded
            placeholder="Username"
            rules={[
              {
                required: true,
                message: 'Please enter Username',
              },
            ]}>
            <Field />
          </Form.Item>

          <Form.Item
            type="text"
            label="Email Address"
            name="email_address"
            sm
            rounded
            placeholder="Please enter email address"
            rules={[
              {
                required: true,
                message: 'Please enter email address',
              },
              // {
              //   pattern: /^.{0,256}$/,
              //   message: 'Please enter a valid Address',
              // },
            ]}>
            <Field label="Address" />
          </Form.Item>
        </div>
        <Button width="150px" rounded type="submit" onClick={onClose}>
          Save Changes
        </Button>
      </Form>
    </StyledCreateNewProduct>
  );
};

export default EditUser;
