import React, { useState, useEffect } from 'react';
import Form, { useForm } from '@/components/molecules/Form';
import Image from 'next/image';
import { countries } from '@/components/Constant';
import UploadImg from '@/components/molecules/UploadImg';
import Field from '@/components/molecules/Field';
import { format, isValid } from 'date-fns';
import userService from '@/services/userService';
import Toast from '@/components/molecules/Toast';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import Select from '../Select';
import Button from '../Button';
import { Wrapper } from './EditUserModal.style';
import { checkAge } from '@/helpers/common';

const EditUserModal = ({ user, handleSuccessEditModal }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));
  const [form] = useForm();
  const [arr, setArr] = useState(countries);
  const [isLoading, setIsLoading] = useState(false);
  const [inheritances, setInheritances] = useState([{ name: '', passportNumber: '', country: '' }]);
  const [profilePicture, setProfilePicture] = useState();

  const addInheritance = () => {
    setInheritances([...inheritances, { name: '', passportNumber: '', country: '' }]);
  };

  // function handelChange(value = 'PK') {
  //   const newArr = arr.map((elem, index) => ({
  //     ...elem,
  //     label: (
  //       <div key={index} className="countrySelect">
  //         <figure>
  //           <Image
  //             src={`https://flagsapi.com/${elem.value}/shiny/48.png`}
  //             width={48}
  //             height={48}
  //             alt={`Flag of ${elem.value}`}
  //           />
  //         </figure>
  //         {elem.label}
  //       </div>
  //     ),
  //   }));
  //   setArr(newArr);
  // }

  const onSubmit = async data => {
    const { country, bankName, iban, swiftBicNumber, userId, ...restData } = data;
    const payload = {
      ...restData,
      country: country?.value,
      profilePicture,
      bankInfo: {
        _id: user?.bank?._id || '',
        bankName: bankName || '',
        iban: iban || '',
        swiftBicNumber: swiftBicNumber || '',
        userId: userId || '',
      },
      inheritanceInfo: inheritances,
    };

    const formDataToSend = new FormData();
    Object.keys(payload).forEach(key => {
      if (
        key === 'bankInfo' ||
        (key === 'inheritanceInfo' && (Array.isArray(payload[key]) || typeof payload[key] === 'object'))
      ) {
        formDataToSend.append(key, JSON.stringify(payload[key]));
      } else {
        formDataToSend.append(key, payload[key]);
      }
    });
    try {
      setIsLoading(true);
      await userService.updateUser(user?._id, formDataToSend);
      handleSuccessEditModal();
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
      const country = countries.find(ele => ele.value === user?.country);
      form.setFieldsValue({
        fullName: user?.fullName,
        username: user?.username,
        email: user?.email,
        country: country || { value: '', label: '' },
        dob: user?.dob && isValid(new Date(user?.dob)) ? format(new Date(user?.dob), 'yyyy-MM-dd') : '',
        bankName: user?.bank?.bankName,
        iban: user?.bank?.iban,
        swiftBicNumber: user?.bank?.swiftBicNumber,
        userId: user?.bank?.userId,
      });
      setProfilePicture(user?.profilePicture);
      setInheritances(
        user?.inheritances?.length > 0 ? user?.inheritances : [{ name: '', passportNumber: '', country: '' }],
      );
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
              <Form.Item type="text" label="Username" name="username" disabled sm rounded placeholder="alex123">
                <Field />
              </Form.Item>
            </div>
            <div className="input-div">
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
              <Form.Item label="Country" name="country" rules={[{ required: true }]}>
                <Select options={arr} />
              </Form.Item>
            </div>
            <div className="DOB-div">
              <Form.Item
                type="date"
                label="Birthdate (D.O.B)"
                name="dob"
                sm
                rounded
                onChange={e => form.setFieldsValue({ dob: e[0] })}
                rules={[
                  {
                    required: true,
                    message: 'Please enter Date Of Birth',
                  },
                  {
                    transform: value => new Date(value) > new Date(),
                    message: 'DOB cannot be in the future',
                  },
                  {
                    transform: value => checkAge(value) === false,
                    message: 'Age must be 18',
                  },
                ]}>
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
                name="bankName"
                sm
                rounded
                placeholder="Bank of Americe"
                rules={[
                  {
                    pattern: /^.{3,30}$/,
                    message: 'Please enter a valid Bank Name',
                  },
                ]}>
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
                    pattern: /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/,
                    message: 'Please enter a valid IBAN number',
                  },
                ]}>
                <Field />
              </Form.Item>
            </div>
            <div className="input-div">
              <Form.Item
                type="text"
                label="SWIFT / BIC Number"
                name="swiftBicNumber"
                sm
                rounded
                placeholder="PK033310084246213"
                rules={[
                  {
                    pattern: /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
                    message: 'Invalid SWIFT/BIC format',
                  },
                ]}>
                <Field />
              </Form.Item>
              <Form.Item
                type="text"
                label="User ID"
                name="userId"
                sm
                rounded
                placeholder="33445554"
                rules={[
                  {
                    pattern: /^[a-zA-Z0-9_-]{8,40}$/,
                    message: 'User ID must be between 8 and 40 characters long',
                  },
                ]}>
                <Field />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="inheritance-info">
          <h5>Inheritance Info:</h5>
          <div>
            {inheritances.map((inheritance, index) => (
              <div key={index} className="multiInhertance">
                <div className="input-div">
                  <Form.Item
                    type="text"
                    label="Name of Person"
                    value={inheritances[index].name}
                    name={`name${index}`}
                    onChange={e => {
                      form.setFieldsValue({
                        [`name${index}`]: e.target.value,
                      });
                      setInheritances(prev =>
                        prev.map((item, i) => (i === index ? { ...item, name: e.target.value } : item)),
                      );
                    }}
                    sm
                    rounded
                    placeholder="Logan Paulson"
                    rules={[
                      {
                        pattern: /^[a-zA-Z\s]*$/,
                        message: 'Only alphabets are allowed',
                      },
                      {
                        pattern: /^.{2,30}$/,
                        message: ' Name should be between 2 and 30 characters.',
                      },
                    ]}>
                    <Field />
                  </Form.Item>
                  <Form.Item
                    type="text"
                    label="Passport Number"
                    value={inheritances[index].passportNumber}
                    name={`passportNumber${index}`}
                    onChange={e => {
                      form.setFieldsValue({
                        [`passportNumber${index}`]: e.target.value,
                      });
                      setInheritances(prev =>
                        prev.map((item, i) => (i === index ? { ...item, passportNumber: e.target.value } : item)),
                      );
                    }}
                    sm
                    rounded
                    placeholder="123467894562339"
                    rules={[
                      {
                        pattern: /^[a-zA-Z0-9]{6,9}$/,
                        message: 'Passport number must be between 6 and 9 characters long',
                      },
                    ]}>
                    <Field />
                  </Form.Item>
                </div>
                <div className="DOB-div">
                  <Form.Item
                    type="text"
                    label="Country of Residence"
                    value={inheritances[index].country}
                    name={`country${index}`}
                    onChange={e => {
                      form.setFieldsValue({
                        [`country${index}`]: e.target.value,
                      });
                      setInheritances(prev =>
                        prev.map((item, i) => (i === index ? { ...item, country: e.target.value } : item)),
                      );
                    }}
                    sm
                    rounded
                    placeholder="United States"
                    rules={[
                      {
                        pattern: /^.{0,256}$/,
                        message: 'Maximum Character Length is 256',
                      },
                    ]}>
                    <Field />
                  </Form.Item>
                </div>
              </div>
            ))}
          </div>
          <div className="addmore">
            <button onClick={addInheritance} type="button">
              +Add more
            </button>
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
