import React, { useState, useEffect } from 'react';
import Field from '@/components/molecules/Field';
import Select from '@/components/atoms/Select';
import { IoAdd } from 'react-icons/io5';
import UploadFile from '@/components/molecules/UploadFile';
import Form, { useForm } from '@/components/molecules/Form';
import { StyledCreateNewProduct } from '../CreateNewProduct/CreateNewProduct.styles';
import { format } from 'date-fns';
import Toast from '@/components/molecules/Toast';
import productService from '@/services/productService';
import Button from '@/components/atoms/Button';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';

const EditProductModal = ({ product, setCreateProductSuccessModal, setProductModal }) => {
  const { user, refetch } = useContextHook(AuthContext, v => ({
    user: v.user,
    refetch: v.refetch,
  }));
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [media, setMedia] = useState([]);
  const [amenities, setAmenities] = useState(['']);
  const [images, setImages] = useState([]);

  const investmentTypeOptions = [
    { label: 'Properties', value: 'properties' },
    { label: 'Vehicles', value: 'vehicles' },
  ];
  const kycOptions = [
    { label: 'Level 0', value: 0 },
    { label: 'Level 1', value: 1 },
    { label: 'Level 2', value: 2 },
  ];

  const addAmenity = () => {
    setAmenities([...amenities, '']);
  };

  const handleFileChange = (e, index) => {
    const file = e.target.file;
    setImages(prev => {
      const updatedImages = [...prev];
      updatedImages[index] = file;
      return updatedImages;
    });
  };

  const onSubmit = async data => {
    try {
      setIsLoading(true);
      const payload = {
        ...data,
        investmentType: data?.investmentType?.value,
        kycLevel: data?.kycLevel.value,
        amenities,
        media,
        ...(images?.length > 0 && { images }),
      };

      const formDataToSend = new FormData();

      Object.keys(payload).forEach(key => {
        if (key === 'images') {
          payload.images.forEach((file, index) => {
            formDataToSend.append(`images[${index}]`, file);
          });
        } else if (
          key === 'media' ||
          (key === 'amenities' && (Array.isArray(payload[key]) || typeof payload[key] === 'object'))
        ) {
          formDataToSend.append(key, JSON.stringify(payload[key]));
        } else {
          formDataToSend.append(key, payload[key]);
        }
      });

      if (product) {
        await productService.updateProduct(product?._id, formDataToSend);
      } else {
        formDataToSend.append('userId', user?._id);
        await productService.createProduct(formDataToSend);
      }
      setProductModal(false);
      if (product) {
        Toast({
          type: 'success',
          message: 'Product Updated Successfully!',
        });
      } else {
        setCreateProductSuccessModal(true);
      }
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
    if (product && Object.keys(product)?.length !== 0) {
      form.setFieldsValue({
        productName: product?.productName,
        investmentType: investmentTypeOptions.find(ele => ele.value === product?.investmentType),
        address: product?.address,
        deadline: format(product?.deadline, 'yyyy-MM-dd'),
        kycLevel: kycOptions.find(ele => ele.value === product.kycLevel),
        description: product.description,
        investmentReason: product.investmentReason,
        minimumBackers: product.minimumBackers,
        maximumBackers: product.maximumBackers,
        assetValue: product.assetValue,
        minimumInvestment: product.minimumInvestment,
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
    }
  }, [product]);

  return (
    <StyledCreateNewProduct>
      <Form form={form} onSubmit={onSubmit}>
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
            <Select options={investmentTypeOptions} />
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
              name="description"
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
              name="investmentReason"
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
          {Array.from({ length: 3 }).map((_, index) => {
            return (
              <div key={index} className="upload">
                <UploadFile
                  id={`media${index}`}
                  name={`media${index}`}
                  bg
                  img={media[index]}
                  noMargin
                  disc="image should be up to 1mb only"
                  onChange={e => handleFileChange(e, index)}
                />
              </div>
            );
          })}
        </div>
        <div className="add-amenities-holder">
          <span className="heading">Amenities</span>
          {amenities && amenities?.length < 10 && (
            <div className="add-amenities">
              <span>You can add up to 10 amenities only!</span>
              <div onClick={addAmenity} className="add-more">
                <IoAdd />
                <span>Add more</span>
              </div>
            </div>
          )}
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
            name="minimumBackers"
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
            name="maximumBackers"
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
            name="minimumInvestment"
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
        <Button rounded md btntype="primary" loader={isLoading} width="170" htmlType="submit">
          {!product ? 'Create Product' : 'Save Changes'}
        </Button>
      </Form>
    </StyledCreateNewProduct>
  );
};

export default EditProductModal;
