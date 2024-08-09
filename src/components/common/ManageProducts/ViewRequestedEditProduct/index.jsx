import React, { useState, useEffect } from 'react';
import { StyledProductDetailModal } from '../ProductDetailModal/ProductDetailModal.styles';
import Button from '@/components/atoms/Button';
import Image from 'next/image';
import { daysLeft, formatDateWithSuffix } from '@/helpers/common';
import ModalContainer from '@/components/molecules/ModalContainer';
import declineIcon from '../../../../../public/assets/decline-icon.svg';
import DeclineModal from './ViewEditRequestDeclineModal';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import Toast from '@/components/molecules/Toast';
import productService from '@/services/productService';

const ReviewRequestedProductEdit = ({ productId }) => {
  const { fetch, refetch } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
    refetch: v.refetch,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState();

  const approveProduct = async (id, type) => {
    try {
      setIsLoading(true);
      const payload = { status: type, declineReason: '' };

      await productService.manageProductEdit(id, payload);
      Toast({
        type: 'success',
        message: 'Product Edit Approved Successfully!',
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

  useEffect(() => {
    productService
      .productDetails(productId)
      .then(response => {
        setProduct(response);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  return (
    <StyledProductDetailModal>
      <div className="head">
        <span className="heading">Product Info:</span>
      </div>
      <div className="product-info">
        <div className="col">
          <span className="heading">Product Name: </span>
          <span className="text">{product?.productName || '---------------'}</span>
        </div>
        <div className="col">
          <span className="heading">Investment Type: </span>
          <span className="text">{product?.investmentType?.name || '---------------'}</span>
        </div>
        <div className="col">
          <span className="heading">Address: </span>
          <span className="text">{product?.address || '---------------'}</span>
        </div>
        <div className="col">
          <span className="heading">Deadline: </span>
          {product?.deadline && (
            <span className="text">
              {`(${formatDateWithSuffix(product?.deadline)} / ${daysLeft(product?.deadline)} left) ` ||
                '---------------'}
            </span>
          )}
        </div>
        <div className="col">
          <span className="heading">{`${product?.userId?.sellerType === 'Company' ? 'KYB Level' : 'KYC Level'}`}:</span>
          <span className="text">{`Level ${product?.kycLevel}` || '---------------'}</span>
        </div>
      </div>
      <div className="product-description">
        <div className="description-holder">
          <span className="heading">Product Description: </span>
          <div className="description">
            <p>{product?.description || '---------------'}</p>
          </div>
        </div>
        <div className="description-holder">
          <span className="heading">Why Invest in it?: </span>
          <div className="description">
            <p>{product?.investmentReason || '---------------'}</p>
          </div>
        </div>
      </div>
      {product?.media && product?.media?.length > 0 && (
        <div className="product-media">
          <span className="heading">Product Media:</span>
          <div className="product-images">
            {product?.media?.map((item, index) => (
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
        <div className="col">
          <span className="heading">Return Rate (%): </span>
          <span className="text">0%</span>
        </div>
        <div className="col">
          <span className="heading">Funding Ratio: </span>
          <span className="text">0%</span>
        </div>
        <div className="col">
          <span className="heading">Minimum Backers: </span>
          <span className="text">{product?.minimumBackers}</span>
        </div>
        <div className="col">
          <span className="heading">Maximum Backers: </span>
          <span className="text">{product?.isInfiniteBackers ? 'Infinite' : product?.maximumBackers}</span>
        </div>
        <div className="col">
          <span className="heading">Annual Cost: </span>
          <span className="text">$0.00</span>
        </div>
        <div className="col">
          <span className="heading">Min Investment: </span>
          <span className="text">{`$${Number(product?.minimumInvestment)?.toFixed(2).toLocaleString('en-US')}`}</span>
        </div>
        <div className="col">
          <span className="heading">Total Asset Value: </span>
          <span className="text">{`$${Number(product?.assetValue)?.toFixed(2).toLocaleString('en-US')}`}</span>
        </div>
      </div>
      <div className="btn-holder">
        <Button
          variant="success"
          custom
          onClick={() => {
            approveProduct(product?.productId, 'Approve');
          }}>
          Approve Edit
        </Button>
        <ModalContainer
          width={500}
          title={<Image src={declineIcon} alt="declineIcon" />}
          btnComponent={({ onClick }) => (
            <Button variant="danger" custom onClick={onClick}>
              Decline Edit
            </Button>
          )}
          content={({ onClose }) => <DeclineModal id={product?.productId} onClose={onClose} />}
        />
      </div>
    </StyledProductDetailModal>
  );
};

export default ReviewRequestedProductEdit;
