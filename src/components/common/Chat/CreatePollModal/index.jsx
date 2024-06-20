import React, { useState } from 'react';
import { StyledCreatePollModal } from './CreatePollModal.styles';
import Form, { useForm } from '@/components/molecules/Form';
import Button from '@/components/atoms/Button';
import Field from '@/components/molecules/Field';
import Switch from '@/components/molecules/Switch';
import { IoAdd } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';

const CreatePollModal = () => {
  const [form] = useForm();
  const [addOption, setAddOption] = useState([{}]);
  const handleAddOption = () => {
    setAddOption([...addOption, {}]);
  };
  const removeOption = index => setAddOption(prev => prev.filter((_, i) => i !== index));
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
        <div className="add-more" onClick={handleAddOption}>
          <IoAdd />
          Add more
        </div>
        <div className="options-holder">
          {addOption &&
            addOption.length > 0 &&
            addOption.map((option, index) => (
              <Form.Item
                key={index}
                type="text"
                label="Options"
                name={`options${index}`}
                value={option}
                rounded
                placeholder="+Add"
                suffix={<TiDelete color="red" size={20} />}
                onClickSuffix={() => removeOption(index)}
                rules={[
                  {
                    required: true,
                    message: 'Options is Required',
                  },
                ]}>
                <Field />
              </Form.Item>
            ))}
        </div>
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
