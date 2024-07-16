import React, { useEffect, useState } from 'react';
import { CreateCategoryModalWrapper } from './CreateCategoryModal.style';
import Form from '@/components/molecules/Form/Form';
import Field from '@/components/molecules/Field';
import { useForm } from '@/components/molecules/Form';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import categoryService from '@/services/categoryService';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import UploadFile from '@/components/molecules/UploadFile';

const CreateCategoryModal = ({ onClose, category }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));

  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    let payload;
    if (data?.icon) {
      payload = new FormData();
      Object.keys(data).forEach(key => {
        payload.append(key, data[key]);
      });
    } else payload = { ...data };
    try {
      setLoading(true);
      if (category) {
        await categoryService.updateCategory(category._id, payload, data?.icon ? true : false);
      } else {
        await categoryService.createCategory(payload, data?.icon ? true : false);
      }
      refetch();
      onClose();
      setLoading(false);
      Toast({
        type: 'success',
        message: 'Category Saved Successfully!',
      });
    } catch (ex) {
      Toast({
        type: 'error',
        message: ex.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
      });
    }
  }, [category]);

  return (
    <CreateCategoryModalWrapper>
      <Form form={form} onSubmit={onSubmit}>
        <Form.Item name="icon" rules={[{ required: !category?.icon, message: 'Please Upload Category Icon!' }]}>
          <Field
            rounded
            type="img"
            fileSize="1"
            img={category?.icon}
            accept="image/jpeg, image/jpg, image/png"
            uploadTitle="You can upload upto 1MB, Image (JPG, PNG)"
            onChange={e => console.log(e)}
          />
        </Form.Item>
        <div className="input-wrapper">
          <Form.Item
            type="text"
            label="Category Name"
            name="name"
            placeholder="NFT"
            rules={[
              {
                required: true,
                message: 'Category Name is Required',
              },
              {
                pattern: /^.{2,100}$/,
                message: 'Category Name must be between 2 and 100 characters.',
              },
              {
                pattern: /^(?=.*[a-zA-Z])[\w\W]*$/,
                message:
                  'Category Name must include at least one letter and not consist only of digits or special characters.',
              },
            ]}>
            <Field />
          </Form.Item>
        </div>
        <div className="input-wrapper" />
        <div>
          <Button loader={loading} sm rounded width="170px" htmlType="submit">
            {!category ? 'Create Category' : 'Save Changes'}
          </Button>
        </div>
      </Form>
    </CreateCategoryModalWrapper>
  );
};

export default CreateCategoryModal;
