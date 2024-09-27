import React, { useState } from 'react';
import { StyledProductDetailModal } from './ProductDetailModal.styles';
import Button from '@/components/atoms/Button';
import bellIcon from '../../../../../public/assets/bell.svg';
import Image from 'next/image';
import { daysLeft, formatDateWithSuffix } from '@/helpers/common';
import ModalContainer from '@/components/molecules/ModalContainer';
import declineIcon from '../../../../../public/assets/decline-icon.svg';
import DeclineModal from '../../DeclineModal';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import Toast from '@/components/molecules/Toast';
import productService from '@/services/productService';
import { FaFilePdf } from 'react-icons/fa';

import Link from 'next/link';

const ProductDetailModal = ({ product }) => {
  const { fetch, refetch } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
    refetch: v.refetch,
  }));
  const [isLoading, setIsLoading] = useState(false);

  const approveProduct = async (id, type) => {
    try {
      setIsLoading(true);
      const obj = { isVerified: type === 'Approve' ? true : false, verificationStatus: 'approved', declineReason: '' };
      const payload = new FormData();
      Object.keys(obj).forEach(key => payload.append(key, obj[key]));

      await productService.updateProduct(id, payload);
      Toast({
        type: 'success',
        message: 'Product Approved Successfully!',
      });
      refetch();
    } catch (error) {
      Toast({
        type: 'error',
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const infoData = [
    {
      heading: 'Product Name:',
      text: product?.productName ? product.productName : '---------------',
    },
    {
      heading: 'Investment Type:',
      text: product?.investmentType?.name,
    },
    {
      heading: 'Address:',
      text: product?.address,
    },
    {
      heading: 'Deadline:',
      text: `(${formatDateWithSuffix(product?.deadline)} / ${daysLeft(product?.deadline)} left) `,
    },
    {
      heading: `${product?.userId?.sellerType === 'Company' ? 'KYB Level' : 'KYC Level'}`,
      text: `Level ${product?.kycLevel}`,
    },
  ];
  const investmentData = [
    {
      heading: 'Return Rate (%):',
      text: '0%',
    },
    {
      heading: 'Funding Ratio:',
      text: '0%',
    },
    {
      heading: 'Minimum Backers:',
      text: product?.minimumBackers,
    },
    {
      heading: 'Maximum Backers:',
      text: product?.isInfiniteBackers ? 'Infinite' : product?.maximumBackers,
    },
    {
      heading: 'Annual Cost:',
      text: '$0.00',
    },
    {
      heading: 'Min Investment:',
      text: `$${Number(product?.minimumInvestment)?.toFixed(2).toLocaleString('en-US')}`,
    },
    {
      heading: 'Total Asset Value',
      text: `$${Number(product?.assetValue)?.toFixed(2).toLocaleString('en-US')}`,
    },
  ];
  const productDescription = [
    {
      heading: 'Product Description',
      text: product?.description,
    },
    {
      heading: 'Why Invest in it?',
      text: product?.investmentReason,
    },
  ];
  function getFileNameIfPdf(url) {
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    const extension = fileName.split('.').pop();

    if (extension === 'pdf') {
      return fileName;
    }
    return null;
  }

  return (
    <StyledProductDetailModal>
      <div className="head">
        <span className="heading">Product Info:</span>
      </div>
      <div className="product-info">
        {infoData?.map((item, index) => (
          <div className="col" key={index}>
            <span className="heading">{item.heading}</span>
            <span className="text">{item.text}</span>
          </div>
        ))}
      </div>
      <div className="product-description">
        {productDescription?.map((item, index) => (
          <div className="description-holder" key={index}>
            <span className="heading">{item.heading}</span>
            <div className="description">
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      {product?.media && product?.media?.length > 0 && (
        <div className="product-media">
          <span className="heading">Product Media:</span>
          <div className="product-images">
            {product?.media?.slice(0, 3)?.map((item, index) => (
              <div className="img-holder" key={index}>
                {item && item.endsWith('.mp4') ? (
                  <video width={319} height={191} autoPlay>
                    <source src={item} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image src={item} alt="productImg1" width={319} height={191} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {product?.media && product?.media?.length > 4}
      {
        <div className="amenities-holder">
          <span className="heading">Additional Documents:</span>
          <div className="amenities">
            {product?.media?.slice(3).map((data, index) => (
              <div className="additional-document" key={index}>
                <FaFilePdf color="var(--danger-dark)" size={20} />
                <Link href={data} download target="_blank">
                  {getFileNameIfPdf(data)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      }
      {product?.amenities && product?.amenities?.length > 0 && (
        <div className="amenities-holder">
          <span className="heading">Amenities:</span>
          <div className="amenities">
            {product?.amenities.map((item, index) => (
              <div className="product-property" key={index}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="product-info investment-info">
        {investmentData?.map((item, index) => (
          <div className="col" key={index}>
            <span className="heading">{item.heading}</span>
            <span className="text">{item.text}</span>
          </div>
        ))}
      </div>
      {product?.verificationStatus === 'pending' && (
        <div className="btn-holder">
          <Button
            variant="success"
            custom
            onClick={() => {
              approveProduct(product?._id, 'Approve');
            }}>
            Approve
          </Button>
          <ModalContainer
            width={500}
            title={<Image src={declineIcon} alt="declineIcon" />}
            btnComponent={({ onClick }) => (
              <Button variant="danger" custom onClick={onClick}>
                Decline
              </Button>
            )}
            content={({ onClose }) => <DeclineModal type="Product" id={product?._id} onClose={onClose} />}
          />
        </div>
      )}
    </StyledProductDetailModal>
  );
};

export default ProductDetailModal;
