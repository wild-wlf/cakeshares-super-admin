import React, { useMemo, useState } from 'react';
import { Container } from '../EditRolesModal/EditRolesStyles';
import Button from '@/components/atoms/Button';
import Form, { useForm } from '../../../molecules/Form';
import Field from '../../../molecules/Field';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import Toast from '@/components/molecules/Toast';
import adminService from '@/services/adminService';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import PermissionSelector from '@/components/molecules/PermissionSelector';
import { BTN } from './createRoleModal.style';

const CreateRolesModal = ({ role, onClose }) => {
  const [form] = useForm();
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [openPermissionModal, setOpenPermissionModal] = useState(false);

  const permissions = useMemo(() => role?.permissions?.map(({ _id }) => _id) ?? [], [role]);

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

        <BTN onClick={() => setOpenPermissionModal(true)}>Customize Permissions</BTN>

        <Button rounded sm height={'40px'} loader={loading}>
          Create Role
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
          forRoles
          onPermClose={() => setOpenPermissionModal(false)}
        />
      </CenterModal>
    </Container>
  );
};

export default CreateRolesModal;
