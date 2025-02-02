import React, { useEffect, useMemo, useState } from 'react';
import { Container } from '../../../molecules/BankModal/BankStyles';
import Field from '../../../molecules/Field';
import Form, { useForm } from '../../../molecules/Form';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import UploadImg from '@/components/molecules/UploadImg';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import adminService from '@/services/adminService';
import Toast from '@/components/molecules/Toast';

const EditAdminModal = ({ admin, onClose }) => {
  console.log(admin);
  const [form] = useForm();
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(false);

  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));

  const { roles_data } = adminService.GetRoles({ getAll: true });
  const roles = useMemo(() => roles_data.roles.map(({ _id, type }) => ({ value: _id, label: type })), [roles_data]);
  useEffect(() => {
    if (admin) {
      form.setFieldsValue({
        full_name: admin?.fullName,
        email: admin?.email,
        roles: roles?.filter(({ value }) => admin?.roles?.find(({ _id }) => _id === value)),
      });
    }
  }, [roles_data, admin, roles]);

  const onSubmit = async data => {
    try {
      setLoading(true);

      const payload = {
        profilePicture,
        fullName: data.full_name.trim(),
        roles: data.roles.map(({ value }) => value),
      };

      const formDataToSend = new FormData();
      Object.keys(payload).forEach(key => {
        if (key === 'roles') {
          formDataToSend.append(key, JSON.stringify(payload[key]));
        } else {
          formDataToSend.append(key, payload[key]);
        }
      });

      await adminService.updateAdmin(admin._id, formDataToSend);

      refetch();
      onClose();
      setLoading(false);
      Toast({
        type: 'success',
        message: 'Admin Updated successfully!',
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
      <div>
        <UploadImg
          img={admin.profilePicture != '' && admin.profilePicture != 'undefined' ? admin.profilePicture : ''}
          onChange={e => setProfilePicture(e)}
        />
      </div>
      <Form form={form} onSubmit={onSubmit}>
        <div className="feildContainer">
          <div className="wrapper">
            <Form.Item
              label="Full Name"
              type="text"
              rounded
              sm
              name="full_name"
              placeholder="Enter text"
              rules={[
                {
                  required: true,
                  message: 'Full Name is Required',
                },
              ]}>
              <Field />
            </Form.Item>
          </div>

          <div className="wrapper">
            <Form.Item
              label="Email Address"
              type="email"
              disabled
              rounded
              sm
              name="email"
              placeholder="johnduo@gmail.com"
              rules={[
                {
                  required: true,
                  message: 'Email Address is Required',
                },
              ]}>
              <Field />
            </Form.Item>
          </div>
        </div>
        <div className="feildContainer">
          <div className="fullWidth ">
            <Form.Item
              label="Role"
              isSearchable
              isMulti
              options={roles}
              hideSelectedOptions={false}
              closeMenuOnSelect={false}
              name="roles"
              rules={[
                {
                  required: true,
                  message: 'Role should be selected',
                },
              ]}>
              <Select />
            </Form.Item>
          </div>
        </div>

        <Button rounded width={'170px'} loader={loading} height={'40px'} sm btntype="green" htmlType="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditAdminModal;
