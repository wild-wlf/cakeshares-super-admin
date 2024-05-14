import React from "react";
import { Container } from "./EditRolesStyles";
import Button from "@/components/atoms/Button";
import Form, { useForm } from "../../../molecules/Form";
import Field from "../../../molecules/Field";

const EditRolesModal = ({ openPermission }) => {
  const [form] = useForm();

  return (
    <Container>
      <Form form={form}>
        <div className="feildContainer">
          <div className="wrapper">
            <Form.Item
              label="Type"
              type="input"
              rounded
              sm
              name="Type"
              placeholder="Super_USER"
              rules={[
                {
                  required: true,
                  message: "Type is Required",
                },
              ]}
            >
              <Field />
            </Form.Item>
          </div>
          <div className="wrapper">
            <Form.Item
              label="Description"
              type="input"
              rounded
              sm
              name="Description"
              placeholder="role for a super user"
              rules={[
                {
                  required: true,
                  message: "Description is Required",
                },
              ]}
            >
              <Field />
            </Form.Item>
          </div>
        </div>
        <div className="btn">
          <Button
            rounded
            height={"40px"}
            sm
            btntype={"blue"}
            onClick={openPermission}
          >
            Customize Permissions
          </Button>
        </div>

        <Button rounded width={"170px"} height={"40px"} sm btntype={"primary"}>
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditRolesModal;
