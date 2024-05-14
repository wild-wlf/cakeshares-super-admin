import React from "react";
import { Container } from "../../../molecules/BankModal/BankStyles";
import Field from "../../../molecules/Field";
import Form, { useForm } from "../../../molecules/Form";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import UploadImg from "@/components/molecules/UploadImg";

const EditUserModal = () => {
  const cryptoWalletNames = [
    {
      label: "Bitcoin Wallet",
      value: "Bitcoin Wallet",
    },
    {
      label: "Ethereum Wallet",
      value: "Ethereum Wallet",
    },
    {
      label: "Ripple Wallet",
      value: "Ripple Wallet",
    },
    {
      label: "Litecoin Wallet",
      value: "Litecoin Wallet",
    },
    {
      label: "Bitcoin Cash Wallet",
      value: "Bitcoin Cash Wallet",
    },
    {
      label: "Cardano Wallet",
      value: "Cardano Wallet",
    },
    {
      label: "Polkadot Wallet",
      value: "Polkadot Wallet",
    },
  ];
  const [form] = useForm();

  return (
    <Container>
      <div>
        <UploadImg />
      </div>
      <Form form={form}>
        <div className="feildContainer">
          <div className="wrapper">
            <Form.Item
              label="Username"
              type="text"
              rounded
              sm
              name="Username"
              placeholder="Enter text"
              rules={[
                {
                  required: true,
                  message: "Username is Required",
                },
              ]}
            >
              <Field />
            </Form.Item>
          </div>

          <div className="wrapper">
            <Form.Item
              label="Email Address"
              type="email"
              rounded
              sm
              name="*Email Address"
              placeholder="johnduo@gmail.com"
              rules={[
                {
                  required: true,
                  message: "Email Address is Required",
                },
              ]}
            >
              <Field />
            </Form.Item>
          </div>
        </div>
        <div className="feildContainer">
          <div className="fullWidth ">
            <Form.Item
              label={"Roles"}
              options={cryptoWalletNames}
              isMulti
              rules={[
                {
                  required: true,
                  message: "Roles should be selected",
                },
              ]}
            >
              <Select />
            </Form.Item>
          </div>
        </div>

        <Button rounded width={"170px"} height={"40px"} sm btntype="green">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditUserModal;
