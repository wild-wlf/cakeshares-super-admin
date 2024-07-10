import React, { useEffect, useMemo, useState } from 'react';
import { Container } from './EditRolesStyles';
import Button from '@/components/atoms/Button';
import Form, { useForm } from '../../../molecules/Form';
import Field from '../../../molecules/Field';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import PermissionSelector from '@/components/molecules/PermissionSelector';
import { BTN } from '../CreateRolesModal/CreateRoleModal.style';
import Toast from '@/components/molecules/Toast';
import adminService from '@/services/adminService';

const EditRolesModal = ({ role, onClose }) => {
  const [form] = useForm();
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [openPermissionModal, setOpenPermissionModal] = useState(false);

  const permissions = useMemo(() => role?.permissions?.map(({ _id }) => _id) ?? [], [role]);

  const { refetch } = useContextHook(AuthContext, ['refetch']);

  useEffect(() => {
    if (role) {
      form.setFieldsValue({
        type: role?.type,
        description: role?.description,
      });
      setState({
        type: role?.type,
        description: role?.description,
        permissions,
      });
    }
  }, [role]);
  const onSubmit = async data => {
    try {
      console.log(data, state);
      setLoading(true);

      await adminService.updateRole(role._id, {
        type: data.type,
        description: data.description,
        permissions: state.permissions,
      });

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
                {
                  pattern: /^.{2,20}$/,
                  message: 'Type should be between 2 and 20 characters.',
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
                {
                  pattern: /^.{5,50}$/,
                  message: 'Description should be between 2 and 20 characters.',
                },
              ]}>
              <Field />
            </Form.Item>
          </div>
        </div>

        <BTN onClick={() => setOpenPermissionModal(true)}>Customize Permissions</BTN>

        <Button rounded sm height={'40px'} loader={loading}>
          Save Changes
        </Button>
      </Form>
      <CenterModal
        open={openPermissionModal}
        setOpen={setOpenPermissionModal}
        width="955"
        title="Customize Permissions">
        <PermissionSelector
          permissions={permissions}
          onDone={__ => setState(_ => ({ ..._, permissions: __ }))}
          onPermClose={() => setOpenPermissionModal(false)}
        />
      </CenterModal>
    </Container>
  );
};

export default EditRolesModal;
