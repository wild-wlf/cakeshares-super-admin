import React, { useState } from 'react';
import Image from 'next/image';
import property from '../../../../../public/assets/property.png';
import property2 from '../../../../../public/assets/property2.png';
import property3 from '../../../../../public/assets/property3.png';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { ProductDetailWrapper } from './ProductDetailModal.styles';
import declineIcon from '../../../../../public/assets/decline-icon.svg';
import { MdModeEditOutline } from 'react-icons/md';
import Button from '@/components/atoms/Button';
import DeclineModal from '../../DeclineModal';
import ModalContainer from '@/components/molecules/ModalContainer';
import Toast from '@/components/molecules/Toast';
import productService from '@/services/productService';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';

const ProductDetailModal = ({ product }) => {
  const arr = [
    'Grade A Property',
    'Grade A Property',
    'Grade A Property',
    'Premium Collection',
    'Premium Collection',
    'Premium Collection',
  ];
  const { fetch, refetch } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
    refetch: v.refetch,
  }));
  const [isLoading, setIsLoading] = useState(false);

  const approveProduct = async (id, type) => {
    try {
      setIsLoading(true);
      const obj = { isVerified: type === 'Approve' ? true : false };
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

  return (
    <>
      <ProductDetailWrapper>
        <div className="titlewrapper">
          <div>
            <div className="title">
              <span>Egypt Gov. Property</span>
            </div>
            <div className="titledesc">
              <span>Sector 9, Faiyum, Egypt</span>
              <span>
                <span className="deadline">Deadline:</span> (12th March, 2024 / 05 days left)
              </span>
              <span>KYC (Level 3)</span>
            </div>
          </div>

          <div>
            <div className="headings">
              <div>
                <span>Investment type</span>
                <h3>Property</h3>
              </div>
              <div>
                <span>Return (%)</span>
                <h3>30%</h3>
              </div>
              <div>
                <span>Funding Ratio</span>
                <h3>56%</h3>
              </div>
              <div>
                <span>Backers Limit</span>
                <h3>20</h3>
              </div>
              <div>
                <span>Annual Cost (est.)</span>
                <h3>$2,000</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="imagewrapper">
          <div className="product1">
            <Image src={property} alt="Product-Image" />
          </div>
          <div className="product2">
            <Image src={property2} alt="Product-Image" />
            <Image src={property3} alt="Product-Image" />
          </div>
        </div>

        <div className="investwrapper">
          <div className="content-holder">
            <strong>Why Invest in this?</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies et mi quis scelerisque. Integer
              vitae posuere est, nec mollis diam. Donec feugiat eu mauris sed rutrum. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Aliquam auctor gravida nulla. Donec feugiat eu mauris sed rutrum. Interdum
              et malesuada fames ac ante ipsum primis in faucibus. Aliquam auctor gravida nulla.
            </p>
            <strong>Description</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies et mi quis scelerisque. Integer
              vitae posuere est, nec mollis diam. Donec feugiat eu mauris sed rutrum. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Aliquam auctor gravida nulla. Donec feugiat eu mauris sed rutrum. Interdum
              et malesuada fames ac ante ipsum primis in faucibus. Aliquam auctor gravida nulla.
            </p>
            <div className="amenties-holder">
              <div>
                <span>Amenities</span>
              </div>
              <div className="amenities">
                {arr.map((data, index) => (
                  <div className="amenity" key={index}>
                    <span>
                      <IoIosCheckmarkCircle className="icon" />
                      {data}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="investment">
            <div className="amountdiv">
              <div>
                <span>Min Investment (USD)</span>
                <strong className="amount">$ 5000</strong>
              </div>
              <div>
                <span>Asset Value (USD)</span>
                <strong className="amount">$ 2,000,000</strong>
              </div>
            </div>
            <div className="total">
              Total Value Raised (USD) <span> $ 50,000</span>
            </div>
          </div>
        </div>
        {product.isVerified === false && (
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
      </ProductDetailWrapper>
    </>
  );
};

export default ProductDetailModal;
