import React, { useState, useEffect } from 'react';
import Form, { useForm } from '@/components/molecules/Form';
import { countries } from '@/components/Constant';
import UploadImg from '@/components/molecules/UploadImg';
import Field from '@/components/molecules/Field';
import userService from '@/services/userService';
import Toast from '@/components/molecules/Toast';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import Button from '@/components/atoms/Button';
import { Wrapper } from '@/components/atoms/EditUserModal/EditUserModal.style';

const EditUserModal = ({ user, setSuccessUpdatedModal, onClose }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [form] = useForm();
  const [arr, setArr] = useState(countries);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState();

  const onSubmit = async data => {
    const { country, ...restData } = data;

    const payload = {
      ...restData,
      country: country?.label,
      profilePicture,
    };

    const formDataToSend = new FormData();
    Object.keys(payload).forEach(key => {
      formDataToSend.append(key, payload[key]);
    });
    try {
      setIsLoading(true);
      await userService.updateUser(user?._id, formDataToSend);
      onClose();
      setSuccessUpdatedModal(true);
      refetch();
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && Object.keys(user)?.length > 0) {
      form.setFieldsValue({
        fullName: user?.fullName,
        username: user?.username,
        email: user?.email,
      });
      setProfilePicture(user?.profilePicture);
    }
  }, [user]);
  return (
    <Wrapper>
      <Form form={form} onSubmit={onSubmit}>
        <div className="personal-info">
          <h5>Personal Info:</h5>
          <div>
            <UploadImg img={user?.profilePicture} onChange={e => setProfilePicture(e)} />
            <div className="input-div">
              <Form.Item
                type="text"
                label="Full Name"
                name="fullName"
                sm
                rounded
                placeholder="Alex Mertiz"
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
                label="Username"
                name="username"
                sm
                rounded
                placeholder="alex123"
                disabled>
                <Field />
              </Form.Item>
            </div>
            <div className="input-div email-input ">
              <Form.Item
                type="text"
                label="Email Address"
                disabled={user?.email}
                name="email"
                sm
                rounded
                placeholder="alex123@gmail.com"
                rules={[
                  {
                    required: true,
                    message: 'Email is Required!',
                  },
                  {
                    pattern: /^.{0,256}$/,
                    message: 'Maximum Character Length is 256',
                  },
                ]}>
                <Field />
              </Form.Item>
            </div>
          </div>
        </div>

        <Button rounded md btntype="primary" loader={isLoading} width="170" htmlType="submit">
          Save Changes
        </Button>
      </Form>
    </Wrapper>
  );
};

export default EditUserModal;
