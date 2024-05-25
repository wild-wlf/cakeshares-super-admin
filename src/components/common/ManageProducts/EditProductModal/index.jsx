import React, { useState, useEffect } from 'react';
import Field from '@/components/molecules/Field';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import { IoAdd } from 'react-icons/io5';
import UploadFile from '@/components/molecules/UploadFile';
import Form, { useForm } from '@/components/molecules/Form';
import { StyledCreateNewProduct } from '../CreateNewProduct/CreateNewProduct.styles';
import { format } from 'date-fns';

const EditProductModal = ({ product, createProductData, setEditProduct }) => {
  const [form] = useForm();
  const [media, setMedia] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const handleSubmit = e => {
    console.log('e', e);
  };
  const kycOptions = [
    { label: 'Level 0', value: '0' },
    { label: 'Level 1', value: '1' },
    { label: 'Level 2', value: '2' },
  ];

  const addAmenity = () => {
    setAmenities([...amenities, '']);
  };

  useEffect(() => {
    form.setFieldsValue({
      productName: product?.productName,
      investmentType: product?.investmentType,
      address: product?.address,
      deadline: format(product?.deadline, 'yyyy-MM-dd'),
      kycLevel: kycOptions.find(ele => ele.value === product.kycLevel.toString()),
      productDescription: product.description,
      whyInvest: product.investmentReason,
      media1: product.investmentReason,
      amentity1: createProductData.amentity1,
      amentity1: createProductData.amentity2,
      amentity3: createProductData.amentity3,
      minBackers: product.minimumBackers,
      maxBackers: product.maximumBackers,
      assetValue: product.assetValue,
      minInvestment: product.minimumInvestment,
    });
    setMedia(product?.media);
    setAmenities(product?.amenities);
  }, [product]);

  return (
    <StyledCreateNewProduct>
      <Form form={form} onSubmit={handleSubmit}>
        <span className="heading">Product Info:</span>
        <div className="input-grid">
          <Form.Item
            type="text"
            label="Product Name"
            name="productName"
            sm
            rounded
            placeholder="Product Name"
            rules={[
              {
                required: true,
                message: 'Please enter Product Name',
              },
              {
                pattern: /^.{0,40}$/,
                message: 'Please enter a valid Product Name',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            type="text"
            label="Investment Type"
            name="investmentType"
            sm
            rounded
            placeholder="Investment Type"
            rules={[
              {
                required: true,
                message: 'Please enter Investment Type',
              },
            ]}>
            <Select
              options={[
                { label: 'Properties', value: 'properties' },
                { label: 'Vehicles', value: 'vehicles' },
              ]}
            />
          </Form.Item>

          <Form.Item
            type="text"
            label="Address"
            name="address"
            sm
            rounded
            placeholder="Please enter address"
            rules={[
              {
                required: true,
                message: 'Please enter Address',
              },
              {
                pattern: /^.{0,256}$/,
                message: 'Please enter a valid Address',
              },
            ]}>
            <Field label="Address" />
          </Form.Item>
          <Form.Item
            type="date"
            label="Deadline"
            name="deadline"
            sm
            rounded
            rules={[
              {
                required: true,
                message: 'Please enter Deadline',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            type="text"
            label="KYC Level"
            name="kycLevel"
            sm
            rounded
            placeholder="KYC Level"
            rules={[
              {
                required: true,
                message: 'Please enter KYC Level',
              },
            ]}>
            <Select options={kycOptions} />
          </Form.Item>
        </div>
        <div className="product-description">
          <div className="description-holder">
            <Form.Item
              type="textarea"
              label="Product Description"
              name="productDescription"
              sm
              rounded
              placeholder="Enter Text"
              rules={[
                {
                  required: true,
                  message: 'Please enter Product Description',
                },
                {
                  pattern: /^.{0,256}$/,
                  message: 'Product Description must be between 0 to 256',
                },
              ]}>
              <Field />
            </Form.Item>
          </div>
          <div className="description-holder">
            <Form.Item
              type="textarea"
              label="Why Invest in it?"
              name="whyInvest"
              sm
              rounded
              placeholder="Enter Text"
              rules={[
                {
                  required: true,
                  message: 'Please enter Description',
                },
                {
                  pattern: /^.{0,256}$/,
                  message: 'Description must be between 0 to 256',
                },
              ]}>
              <Field />
            </Form.Item>
          </div>
        </div>
        <span className="heading">Upload Media</span>
        <div className="upload-image">
          <div className="upload">
            <Form.Item
              type="file"
              name="media1"
              sm
              rounded
              rules={[
                {
                  required: true,
                  message: 'Please upload media',
                },
              ]}>
              <UploadFile
                id="firstImg"
                name="firstImg"
                bg
                noMargin
                disc="image should be up to 1mb only"
                onChange={e => console.log(e)}
              />
            </Form.Item>
          </div>
          <div className="upload">
            <Form.Item
              type="file"
              name="media2"
              sm
              rounded
              rules={[
                {
                  // required: true,
                  message: 'Please upload media',
                },
              ]}>
              <UploadFile
                id="SecondImg"
                bg
                noMargin
                disc="image should be up to 1mb only"
                onChange={e => console.log(e)}
              />
            </Form.Item>
          </div>
          <div className="upload">
            <Form.Item
              type="file"
              name="media3"
              sm
              rounded
              rules={[
                {
                  // required: true,
                  message: 'Please upload media',
                },
              ]}>
              <UploadFile
                id="thirdImg"
                bg
                noMargin
                disc="image should be up to 1mb only"
                onChange={e => console.log(e)}
              />
            </Form.Item>
          </div>
        </div>
        <div className="add-amenities-holder">
          <span className="heading">Amenities</span>
          <div className="add-amenities">
            <span>You can add up to 10 amenities only!</span>
            <div onClick={addAmenity} className="add-more">
              <IoAdd />
              <span>Add more</span>
            </div>
          </div>
          <div className="amenities">
            {amenities &&
              amenities.length > 0 &&
              amenities.map((amenity, index) => (
                <Form.Item
                  key={index}
                  type="text"
                  name={`amenity${index}`}
                  sm
                  rounded
                  value={amenity}
                  placeholder="Enter text"
                  onChange={e => {
                    form.setFieldsValue({
                      [`amenity${index}`]: e.target.value,
                    });
                    setAmenities(prev => {
                      const updatedAmenities = [...prev];
                      updatedAmenities[index] = e.target.value;
                      return updatedAmenities;
                    });
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Amentity',
                    },
                    {
                      pattern: /^.{0,40}$/,
                      message: 'Please enter a valid Amentity',
                    },
                  ]}>
                  <Field noMargin />
                </Form.Item>
              ))}
          </div>
        </div>
        <span className="heading">Investment Info:</span>
        <div className="input-grid">
          <Form.Item
            type="number"
            label="Minimum Backers"
            name="minBackers"
            sm
            rounded
            placeholder="01"
            rules={[
              {
                required: true,
                message: 'Please enter Minimum Backers Limit',
              },
              {
                pattern: /^.{0,2}$/,
                message: 'Please enter a valid Backers Limit',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            type="number"
            label="Maximum Backers"
            name="maxBackers"
            sm
            rounded
            placeholder="01"
            rules={[
              {
                required: true,
                message: 'Please enter Maximum Backers Limit',
              },
              {
                pattern: /^.{0,2}$/,
                message: 'Please enter a valid Backers Limit',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            type="number"
            label="Total Asset Value"
            name="assetValue"
            sm
            rounded
            placeholder="10"
            rules={[
              {
                required: true,
                message: 'Please enter Total Asset Value',
              },
              {
                pattern: /^.{0,8}$/,
                message: 'Please enter a valid Backers Limit',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            type="number"
            label="Min Investment"
            name="minInvestment"
            sm
            rounded
            placeholder="10"
            rules={[
              {
                required: true,
                message: 'Please enter Minimum Investment Value',
              },
              {
                pattern: /^.{0,8}$/,
                message: 'Please enter a valid Minimum Investment',
              },
            ]}>
            <Field />
          </Form.Item>
        </div>
        <Button width="150px" rounded type="submit" onClick={() => setEditProduct(false)}>
          Save Changes
        </Button>
      </Form>
    </StyledCreateNewProduct>
  );
};

export default EditProductModal;
