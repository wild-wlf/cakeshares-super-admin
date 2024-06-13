import React, { useState, useEffect, useMemo } from 'react';
import Field from '@/components/molecules/Field';
import Select from '@/components/atoms/Select';
import { IoAdd } from 'react-icons/io5';
import Form, { useForm } from '@/components/molecules/Form';
import { StyledCreateNewProduct } from '../CreateNewProduct/CreateNewProduct.styles';
import { RxCrossCircled } from 'react-icons/rx';
import { format } from 'date-fns';
import Toast from '@/components/molecules/Toast';
import productService from '@/services/productService';
import Button from '@/components/atoms/Button';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import categoryService from '@/services/categoryService';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import Image from 'next/image';

const EditProductModal = ({ product, setCreateProductSuccessModal, setProductModal }) => {
  console.log(product);
  const { user, fetch, refetch } = useContextHook(AuthContext, v => ({
    user: v.user,
    fetch: v.fetch,
    refetch: v.refetch,
  }));
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [media, setMedia] = useState([]);
  const [amenities, setAmenities] = useState(['', '', '']);
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const { categories_data } = categoryService.GetAllCategories(
    {
      itemsPerPage: 10,
    },
    fetch,
  );

  const categoriesOptions = useMemo(() => {
    return categories_data?.items
      ?.filter(item => item?.status !== 'Inactive')
      ?.map(ele => ({
        value: ele?._id,
        label: ele?.name,
      }));
  }, [categories_data?.items]);

  const kycOptions = [
    { label: 'Level 0', value: 0 },
    { label: 'Level 1', value: 1 },
    { label: 'Level 2', value: 2 },
  ];

  const addAmenity = () => setAmenities([...amenities, '']);

  const removeAmenity = index => setAmenities(prev => prev.filter((_, i) => i !== index));

  const onSubmit = async obj => {
    try {
      setIsLoading(true);
      const { media0, media1, media2, ...data } = obj;
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

  const loadInvestmentTypeOptions = async searchText => {
    try {
      let options = [];
      const response = await categoryService.getAllCategories({
        searchText,
      });
      options = response?.items?.map(_ => ({ value: _?._id, label: _?.name }));
      return options;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        productName: product?.productName,
        investmentType: categoriesOptions
          ? categoriesOptions?.find(({ value }) => product?.investmentType?._id === value)
          : { label: product?.investmentType?.name, value: product?.investmentType?._id },
        address: product?.address,
        deadline: format(product?.deadline, 'yyyy-MM-dd'),
        kycLevel: kycOptions?.find(ele => ele?.value === product?.kycLevel),
        description: product?.description,
        investmentReason: product?.investmentReason,
        minimumBackers: product?.minimumBackers,
        maximumBackers: product?.maximumBackers,
        assetValue: product?.assetValue,
        minimumInvestment: product?.minimumInvestment,
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
  }, [product, categoriesOptions]);

  const libraries = ['places'];
  const handlePlaceSelect = place => {
    if (place.geometry && place.geometry.location) {
      setSearchValue(place.name?.concat(` ${place.formatted_address}`));
      form.setFieldsValue({
        address: place.name?.concat(` ${place.formatted_address}`),
      });
    }
  };

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
            label="Investment Type"
            name="investmentType"
            defaultOptions={categoriesOptions}
            sm
            rounded
            isSearchable
            placeholder="Investment Type"
            rules={[
              {
                required: true,
                message: 'Please enter Investment Type',
              },
            ]}>
            <Select async loadOptions={loadInvestmentTypeOptions} />
          </Form.Item>
          <div>
            <LoadScript googleMapsApiKey={'AIzaSyB0gq-rFU2D-URzDgIQOkqa_fL6fBAz9qI'} libraries={libraries}>
              <Autocomplete
                className="map-list"
                onLoad={autocomplete =>
                  autocomplete.addListener('place_changed', () => {
                    handlePlaceSelect(autocomplete.getPlace());
                    // console.log(autocomplete.getPlace());
                  })
                }>
                <Form.Item
                  type="text"
                  label="Address"
                  name="address"
                  sm
                  rounded
                  placeholder="Please enter address"
                  value={searchValue}
                  onChange={e => {
                    form.setFieldsValue({
                      address: e.target.value,
                    });
                    setSearchValue(e.target.value);
                  }}
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
                  <Field />
                </Form.Item>
              </Autocomplete>
            </LoadScript>
          </div>
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
              <div className="upload" key={index}>
                <Form.Item
                  type="img"
                  sm
                  rounded
                  rules={[
                    {
                      required: true,
                      message: 'Please Upload Media',
                    },
                  ]}
                  id={`media${index}`}
                  name={`media${index}`}
                  img={media[index]}
                  noMargin
                  accept="image/jpeg, image/jpg, image/png, video/mp4"
                  disc="File size must be less than 1MB in JPG, JPEG, PNG or MP4 format."
                  uploadTitle="Upload Image/Video"
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
                  noMargin
                  suffix={<RxCrossCircled />}
                  onClickSuffix={() => removeAmenity(index)}
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
                      message: 'Maximum Character Length is 40',
                    },
                  ]}>
                  <Field />
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
