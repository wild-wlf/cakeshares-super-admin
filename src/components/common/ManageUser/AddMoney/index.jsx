import React from 'react';
import { StyledAddMoney } from './AddMoney.styles';
import Form, { useForm } from '@/components/molecules/Form';
import Field from '@/components/molecules/Field';
import Button from '@/components/atoms/Button';

const AddMoney = ({ setMoneyAdded }) => {
  const [form] = useForm();
  function handelSubmit(e) {
    console.log(e);
    setMoneyAdded(true);
  }
  return (
    <StyledAddMoney>
      <strong className="title">Please enter amount to add money to wallet.</strong>
      <div className="balanceWrap">
        <strong className="title">Current Wallet Balance:</strong>
        <strong className="title balance"> $35,265.000</strong>
      </div>
      <div className="formWrap">
        <Form form={form} onSubmit={handelSubmit}>
          <Form.Item
            type="text"
            label="Enter Amount"
            name="amount"
            sm
            rounded
            placeholder="$25,000"
            rules={[
              {
                required: true,
                message: 'Amount is Required',
              },
            ]}>
            <Field />
          </Form.Item>

          <Button type="submit">Add Money</Button>
        </Form>
      </div>
    </StyledAddMoney>
  );
};

export default AddMoney;
