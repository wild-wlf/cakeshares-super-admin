import React from 'react';
import { CreatePermissionModalWrapper } from './CreatePermissionModal.style';
import Form from '@/components/molecules/Form/Form';
import Field from '@/components/molecules/Field';
import { useForm } from '@/components/molecules/Form';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';

const CreatePermissionModal = ({ closeModal }) => {
  const [form] = useForm();

  const arr = [
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'Super_Admin',
      value: 'super_admin',
    },
  ];

  return (
    <CreatePermissionModalWrapper>
      <Form form={form}>
        <div className="input-wrapper">
          <Form.Item
            type="text"
            label="Route"
            name="route"
            placeholder="Enter text"
            rules={[
              { required: true },
              {
                message: 'Maximum Character Length is 256',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            type="text"
            label="Can Do"
            name="can_do"
            placeholder="Enter text"
            rules={[
              { required: true },
              {
                message: 'Maximum Character Length is 256',
              },
            ]}>
            <Field />
          </Form.Item>
        </div>
        <div className="input-wrapper">
          <Form.Item
            type="text"
            label="Description"
            name="description"
            placeholder="Enter text"
            rules={[
              { required: true },
              {
                message: 'Maximum Character Length is 256',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            type="text"
            label="Parent"
            name="AccountHolderName"
            placeholder="Select"
            rules={[
              { required: true },
              {
                message: 'Maximum Character Length is 256',
              },
            ]}>
            <Select options={arr} isMulti />
          </Form.Item>
        </div>
        <div>
          <Button sm rounded width="170px" onClick={closeModal}>
            Create Permission
          </Button>
        </div>
      </Form>
    </CreatePermissionModalWrapper>
  );
};

export default CreatePermissionModal;
