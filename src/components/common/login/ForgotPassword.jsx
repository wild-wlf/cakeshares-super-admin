import React, { useState } from 'react';
import { StyledLogin } from './Login.styles';
import loginbanner from '../../../../public/assets/loginBanner.png';
import Image from 'next/image';
import Form, { useForm } from '@/components/molecules/Form';
import Field from '@/components/molecules/Field';
import Button from '@/components/atoms/Button';
import CheckBox from '@/components/molecules/CheckBox';
import logo from '../../../../public/assets/logo.svg';
import Link from 'next/link';
import OtpInput from '@/components/atoms/OtpInput';
const ForgotPassword = () => {
  const [otp, setOtp] = useState(true);
  const [form] = useForm();

  return (
    <StyledLogin>
      <div className="loginWrap">
        <div className="logo">
          <Image src={logo} alt="logo" />
        </div>
        {otp ? (
          <>
            <strong className="title">Forgot Password!</strong>
            <span className="discreption">
              Don&apos;t worry resetting your password is easy. Just enter your registered email.
            </span>
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
                  ]}>
                  <Field invert />
                </Form.Item>

                <Button lg block type="button" variant="dark" onClick={() => setOtp(false)}>
                  Submit
                </Button>
              </Form>
            </div>
            <span className="loginDiscreption">
              Did you remembered your password? <Link href="/">Try Logging In</Link>
            </span>
          </>
        ) : (
          <>
            <strong className="title">Verify OTP!</strong>
            <span className="discreption">
              We’ve sent an 5 digit OTP code to your registered email john@*********.com.
            </span>
            <div className="formWrap">
              <OtpInput handelChangeValue={e => console.log(e)} />
              <Button lg block type="button" variant="dark">
                Confirm OTP!
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="loginBanner">
        <div className="imageWrap">
          <Image src={loginbanner} alt="loginbanner" />
        </div>
      </div>
    </StyledLogin>
  );
};

export default ForgotPassword;
