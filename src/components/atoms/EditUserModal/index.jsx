import React, { useEffect, useState } from "react";
import { Wrapper } from "./EditUserModal.style";
import Field from "../Field";
import Form, { useForm } from "@/components/molecules/Form";
import Button from "../Button";
import Select from "../Select";
import Image from "next/image";
import { countries } from "@/components/Constant";
import SingleValueSlider from "../singleValueSlider";
import UploadImg from "@/components/molecules/UploadImg";
const EditUserModal = ({ handleRegistration }) => {
  const [arr, setArr] = useState(countries);
  const [form] = useForm();

  function handelChange(value = "PK") {
    const newArr = arr.map((elem, index) => ({
      ...elem,
      label: (
        <div key={index} className="countrySelect">
          <figure>
            <Image
              src={`https://flagsapi.com/${elem.value}/shiny/48.png`}
              width={48}
              height={48}
              alt={`Flag of ${elem.value}`}
            />
          </figure>
          {elem.label}
        </div>
      ),
    }));
    setArr(newArr);
  }
  useEffect(() => {
    handelChange();
  }, []);
  return (
    <Wrapper>
      <Form form={form}>
        <div className="personal-info">
          <h5>Personal Info:</h5>

          <div>
            <UploadImg />
            <div className="input-div">
              <Form.Item
                type="text"
                label="Full Name"
                name="name"
                sm
                rounded
                placeholder="Alex Mertiz"
                rules={[
                  {
                    pattern: /^.{0,40}$/,
                    required: true,
                    message: "Maximum Character Length is 256",
                  },
                ]}
              >
                <Field />
              </Form.Item>
              <Form.Item
                type="text"
                label="Username"
                name="username"
                sm
                rounded
                placeholder="alex123"
                rules={[
                  {
                    pattern: /^.{0,256}$/,
                    required: true,
                    message: "Maximum Character Length is 256",
                  },
                ]}
              >
                <Field />
              </Form.Item>
            </div>
            <div className="input-div">
              <Form.Item
                type="text"
                label="Email Address"
                name="email"
                sm
                rounded
                placeholder="alex123@gmail.com"
                rules={[
                  {
                    pattern: /^.{0,256}$/,
                    required: true,
                    message: "Maximum Character Length is 256",
                  },
                ]}
              >
                <Field />
              </Form.Item>
              <Form.Item
                label="Country"
                name="select"
                rules={[
                  { required: true },
                  {
                    pattern: /^.{0,256}$/,
                    message: "Maximum Character Length is 256",
                  },
                ]}
              >
                <Select options={arr} />
              </Form.Item>
            </div>
            <div className="DOB-div">
              <Form.Item
                type="date"
                label="*Birthdate (D.O.B)"
                name="dob"
                sm
                rounded
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Field />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="bank-info">
          <h5>Bank Info:</h5>

          <div>
            <div className="input-div">
              <Form.Item
                type="text"
                label="Back Name"
                name="bank_name"
                sm
                rounded
                placeholder="Bank of Americe"
                rules={[
                  {
                    pattern: /^.{0,40}$/,
                    required: true,
                    message: "Maximum Character Length is 256",
                  },
                ]}
              >
                <Field />
              </Form.Item>
              <Form.Item
                type="text"
                label="IBAN"
                name="iban"
                sm
                rounded
                placeholder="PK033310084246213"
                rules={[
                  {
                    pattern: /^.{0,256}$/,
                    required: true,
                    message: "Maximum Character Length is 256",
                  },
                ]}
              >
                <Field />
              </Form.Item>
            </div>
            <div className="input-div">
              <Form.Item
                type="text"
                label="SWIFT / BIC Number"
                name="bic_number"
                sm
                rounded
                placeholder="PK033310084246213"
                rules={[
                  {
                    pattern: /^.{0,256}$/,
                    required: true,
                    message: "Maximum Character Length is 256",
                  },
                ]}
              >
                <Field />
              </Form.Item>
              <Form.Item
                type="text"
                label="User ID"
                name="user_id"
                sm
                rounded
                placeholder="33445554"
                rules={[
                  {
                    pattern: /^.{0,256}$/,
                    required: true,
                    message: "Maximum Character Length is 256",
                  },
                ]}
              >
                <Field />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="inheritance-info">
          <h5>Inheritance Info:</h5>

          <div>
            <div className="input-div">
              <Form.Item
                type="text"
                label="Name of Person"
                name="person_name"
                sm
                rounded
                placeholder="Logan Paulson"
                rules={[
                  {
                    pattern: /^.{0,40}$/,
                    required: true,
                    message: "Maximum Character Length is 256",
                  },
                ]}
              >
                <Field />
              </Form.Item>
              <Form.Item
                type="number"
                label="Passport Number"
                name="passport_number"
                sm
                rounded
                placeholder="123467894562339"
                rules={[
                  {
                    pattern: /^.{0,256}$/,
                    required: true,
                    message: "Maximum Character Length is 256",
                  },
                ]}
              >
                <Field />
              </Form.Item>
            </div>
            <div className="DOB-div">
              <Form.Item
                type="text"
                label="Country of Residence"
                name="country"
                sm
                rounded
                placeholder="United States"
                rules={[
                  {
                    pattern: /^.{0,256}$/,
                    required: true,
                    message: "Maximum Character Length is 256",
                  },
                ]}
              >
                <Field />
              </Form.Item>
            </div>
            <div className="addmore">
              <span>+Add more</span>
            </div>
          </div>
        </div>

        <Button
          rounded
          md
          btntype="primary"
          width="170"
          onClick={handleRegistration}
          htmlType="submit"
        >
          Save Changes
        </Button>
      </Form>
    </Wrapper>
  );
};

export default EditUserModal;
