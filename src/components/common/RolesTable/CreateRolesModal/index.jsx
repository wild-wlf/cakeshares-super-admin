import React, { useState } from 'react';
import { Container } from '../EditRolesModal/EditRolesStyles';
import Button from '@/components/atoms/Button';
import Form, { useForm } from '../../../molecules/Form';
import Field from '../../../molecules/Field';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import Toast from '@/components/molecules/Toast';
import adminService from '@/services/adminService';

const CreateRolesModal = ({ openPermission }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { refetch } = useContextHook(AuthContext, ['refetch']);
  const onSubmit = async data => {
    try {
      setLoading(true);
      // if (role) {
      //   await adminService.updateRole(role._id, {
      //     type: data.type,
      //     description: data.description,
      //     permissions: state.permissions,
      //   });
      // } else {
      await adminService.createRole({
        type: data.type,
        description: data.description,
        permissions: state.permissions,
      });
      // }
      refetch();
      onClose();
      setLoading(false);
      Toast({
        type: 'success',
        message: 'Role saved successfully',
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
      <Form form={form} onSubmit={onSubmit}>
        <div className="feildContainer">
          <div className="wrapper">
            <Form.Item
              label="Type"
              type="input"
              rounded
              sm
              name="type"
              placeholder="Super_USER"
              rules={[
                {
                  required: true,
                  message: 'Type is Required',
                },
              ]}>
              <Field />
            </Form.Item>
          </div>
          <div className="wrapper">
            <Form.Item
              label="Description"
              type="input"
              rounded
              sm
              name="description"
              placeholder="role for a super user"
              rules={[
                {
                  required: true,
                  message: 'Description is Required',
                },
              ]}>
              <Field />
            </Form.Item>
          </div>
        </div>
        <div className="btn">
          <Button rounded height={'40px'} width="100%" variant={'blue'} onClick={openPermission}>
            Customize Permissions
          </Button>
        </div>

        <Button rounded sm height={'40px'}>
          Create Role
        </Button>
      </Form>
    </Container>
  );
};

export default CreateRolesModal;
