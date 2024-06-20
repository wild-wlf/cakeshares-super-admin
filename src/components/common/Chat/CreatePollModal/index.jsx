import React from 'react';
import { StyledCreatePollModal } from './CreatePollModal.styles';
import Form, { useForm } from '@/components/molecules/Form';
import Button from '@/components/atoms/Button';
import Field from '@/components/molecules/Field';
import Switch from '@/components/molecules/Switch';

const CreatePollModal = () => {
  const [form] = useForm();
  return (
    <StyledCreatePollModal>
      <Form form={form}>
        <Form.Item
          type="text"
          label="Question"
          name="question"
          rounded
          placeholder="Ask Question"
          rules={[
            {
              required: true,
              message: 'Question is Required',
            },
          ]}>
          <Field />
        </Form.Item>
        <Form.Item
          type="text"
          label="Options"
          name="options"
          rounded
          placeholder="+Add"
          rules={[
            {
              required: true,
              message: 'Options is Required',
            },
          ]}>
          <Field />
        </Form.Item>
        <Form.Item
          type="text"
          label="Options"
          name="options"
          rounded
          placeholder="+Add"
          rules={[
            {
              required: true,
              message: 'Options is Required',
            },
          ]}>
          <Field />
        </Form.Item>
        <div className="switch">
          <Switch label="Allow Multiple Answers" value={'Allow Multiple Answers'} onChange={e => console.log(e)} />
        </div>
        <Button rounded md width="170" htmlType="submit">
          Create Poll
        </Button>
      </Form>
    </StyledCreatePollModal>
  );
};

export default CreatePollModal;
