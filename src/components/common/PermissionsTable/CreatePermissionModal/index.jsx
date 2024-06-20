import React, { useEffect, useMemo, useState } from 'react';
import { CreatePermissionModalWrapper } from './CreatePermissionModal.style';
import Form from '@/components/molecules/Form/Form';
import Field from '@/components/molecules/Field';
import { useForm } from '@/components/molecules/Form';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import adminService from '@/services/adminService';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';

const CreatePermissionModal = ({ onClose, permission }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));

  const {
    permissions_data: { permissions },
  } = adminService.GetPermissions({ parentOnly: true });

  const permissionOptions = useMemo(
    () => [
      {
        label: 'No-Parent',
        value: '$',
      },
      ...permissions.map(({ can }) => ({
        label: can.split('.nav')[0],
        value: can.split('.nav')[0],
      })),
    ],
    [permissions],
  );

  useEffect(() => {
    if (permission) {
      form.setFieldsValue({
        can: permission.can,
        description: permission.description,
        route: permission.route,
        parent: permissionOptions.filter(({ value }) => permission.parent.includes(value)),
      });
    }
  }, [permission, permissionOptions]);

  const onSubmit = async data => {
    try {
      setLoading(true);
      if (permission) {
        await adminService.updatePermission(permission._id, {
          can: data.can,
          description: data.description,
          route: data.route,
          parent: data.parent.map(({ value }) => value),
        });
      } else {
        await adminService.createPermission({
          can: data.can,
          description: data.description,
          route: data.route,
          parent: data.parent.map(({ value }) => value),
        });
      }
      refetch();
      onClose();
      setLoading(false);
      Toast({
        type: 'success',
        message: 'permission saved successfully',
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
    <CreatePermissionModalWrapper>
      <Form form={form} onSubmit={onSubmit}>
        <div className="input-wrapper">
          <Form.Item
            type="text"
            label="Route"
            name="route"
            placeholder="Route"
            rules={[
              { required: true, message: 'Please enter route' },
              {
                pattern: /^[a-zA-Z/_.-]+$/,
                message: 'Can can only contain letters,underscores and dashes',
              },
              {
                pattern: /^.{0,40}$/,
                message: 'Maximum Character Length Is 40',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            type="text"
            label="Can"
            name="can"
            placeholder="Can"
            rules={[
              { required: true, message: 'Please enter can' },
              {
                pattern: /^[a-zA-Z._-]+$/,
                message: 'Can can only contain letters,underscores and dashes',
              },
              {
                pattern: /^.{0,40}$/,
                message: 'Maximum Character Length Is 40',
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
            placeholder="Description"
            rules={[
              { required: true, message: 'Please enter description' },
              {
                pattern: /^.{0,40}$/,
                message: 'Maximum Character Length Is 40',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            options={permissionOptions}
            isSearchable
            isMulti
            name="parent"
            label="Parent"
            placeholder="Select Parent"
            hideSelectedOptions={false}
            closeMenuOnSelect={false}
            rules={[
              { required: true, message: 'Select atleast one parent' },
              {
                transform: value => !value?.length,
                message: 'Select at least one parent',
              },
            ]}>
            <Select />
          </Form.Item>
        </div>
        <div>
          <Button loading={loading} sm rounded width="170px" htmlType="submit">
            {!permission ? 'Create Permission' : 'Save Changes'}
          </Button>
        </div>
      </Form>
    </CreatePermissionModalWrapper>
  );
};

export default CreatePermissionModal;
