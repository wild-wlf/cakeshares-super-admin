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
      // media1: product.investmentReason,
      // amentity1: createProductData.amentity1,
      // amentity1: createProductData.amentity2,
      // amentity3: createProductData.amentity3,
      minBackers: product.minimumBackers,
      maxBackers: product.maximumBackers,
      assetValue: product.assetValue,
      minInvestment: product.minimumInvestment,
    });
    setMedia(product?.media);
    product?.media.map((field, index) => {
      form.setFieldsValue({
        [`media${index}`]: field,
      });
      return field;
    });
    setAmenities(product?.amenities);
    product?.amenities.map((field, index) => {
      form.setFieldsValue({
        [`amenity${index}`]: field,
      });
      return field;
    });
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
                pattern: /^.{3,40}$/,
                message: 'Minimum character length of product name is 3',
              },
            ]}>
            <Field  maxLength={40}/>
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
              {
                transform: value => new Date(value).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0),
                message: 'Deadline Cannot be in the Past!',
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
                  pattern: /^.{10,1000}$/,
                  message: 'Minimum character length of product description is 10',
                },
              ]}>
              <Field  maxLength={1000}/>
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
                  pattern: /^.{10,1000}$/,
                  message: 'Minimum character length of description is 10',
                },
              ]}>
              <Field   maxLength={1000}/>
            </Form.Item>
          </div>
        </div>
        <span className="heading">Upload Media</span>
        <div className="upload-image">
          {/* <div className="upload">
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
          </div> */}
          {Array.from({ length: 3 }).map((_, index) => {
            return (
              <div className="upload" key={index}>
                <Form.Item
                  type="img"
                  sm
                  rounded
                  placeholder="Enter Text"
                  rules={[
                    {
                      required: true,
                      message: 'Please Upload Product Media!',
                    },
                  ]}
                  id={`media${index}`}
                  name={`media${index}`}
                  img={media[index]}
                  noMargin
                  uploadTitle={index === 0 ? 'Upload Image/Video' : 'Upload Image'}
                  accept={
                    index === 0 ? 'image/jpeg, image/jpg, image/png, video/mp4' : 'image/jpeg, image/jpg, image/png'
                  }
                  disc={
                    index === 0
                      ? 'File size must be less than 1MB in JPG, JPEG, PNG or MP4 format.'
                      : 'File size must be less than 1MB in JPG, JPEG, PNG '
                  }
                  onChange={e => {
                    form.setFieldsValue({
                      [`media${index}`]: e,
                    });
                    setImages(prev => {
                      const updatedImages = [...prev];
                      updatedImages[index] = e.target.file;
                      return updatedImages;
                    });
                  }}>
                  <Field />
                </Form.Item>
              </div>
            );
          })}
          {/* <div className="upload">
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
          </div> */}
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
                pattern: /^[1-9][0-9]{0,3}$/,
                message: 'Please enter a valid limit between 1 and 9999',
              },
            ]}>
            <Field maxLength={4} />
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
                pattern: /^[1-9][0-9]{0,3}$/,
                message: 'Please enter a valid limit between 1 and 9999',
              },
              {
                transform: value => value < +form.getFieldValue('minBackers'),
                message: 'Maximun backers cannot be less than minimum backers!',
              },
            ]}>
            <Field maxLength={4} />
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
                pattern: /^[1-9]\d*$/,
                message: 'Asset value must be whole number (greater than zero)',
              },
              {
                pattern: /^[1-9][0-9]{0,8}$/,
                message: 'Please enter a valid number with up to 9 digits',
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
                pattern: /^[1-9]\d*$/,
                message: 'Minimum investment must be whole number (greater than zero)',
              },
              {
                pattern: /^[1-9][0-9]{0,8}$/,
                message: 'Please enter a valid number with up to 9 digits',
              },
              {
                transform: value => value > +form.getFieldValue('assetValue'),
                message: 'Minimum investment cannot be greater than asset value!',
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
