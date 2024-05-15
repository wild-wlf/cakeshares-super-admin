import React from "react";
import { StyledLogin } from "./Login.styles";
import loginbanner from "../../../../public/assets/loginBanner.png";
import Image from "next/image";
import Form, { useForm } from "@/components/molecules/Form";
import Field from "@/components/molecules/Field";
import Button from "@/components/atoms/Button";
import CheckBox from "@/components/molecules/CheckBox";
import logo from "../../../../public/assets/logo.svg";
const Login = () => {
  const [form] = useForm();

  return (
    <StyledLogin>
      <div className="loginWrap">
        <div className="logo">
          <Image src={logo} alt="logo" />
        </div>
        <strong className="title">
          Welcome Back! <br /> you have been missed.
        </strong>
        <div className="formWrap">
          <Form form={form}>
            <Form.Item
              invert
              type="email"
              label="Email Address"
              name="Email Address"
              sm
              rounded
              placeholder="jhondoe@gmail.com"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Field invert />
            </Form.Item>
            <Form.Item
              invert
              type="password"
              label="Password"
              name="Password"
              sm
              rounded
              placeholder="****************"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Field invert />
            </Form.Item>
            <div className="formAction">
              <CheckBox label="Remember me" color />
              <span className="forgetPassword">Forgot Password</span>
            </div>

            <Button lg block type="button">
              Sign in
            </Button>
          </Form>
        </div>
      </div>
      <div className="loginBanner">
        <div className="imageWrap">
          <Image src={loginbanner} alt="loginbanner" />
        </div>
      </div>
    </StyledLogin>
  );
};

export default Login;
