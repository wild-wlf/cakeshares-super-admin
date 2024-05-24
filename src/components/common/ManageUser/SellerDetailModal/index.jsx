import React from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import propertyIcon from '../../../../../public/assets/property-icon-1.svg';
import popularIcon from '../../../../../public/assets/popular-icon.svg';
import ventureIcon from '../../../../../public/assets/venture-icon.svg';
import bazarIcon from '../../../../../public/assets/bazar-icon.svg';
import vehicleIcon from '../../../../../public/assets/vehicle-icon.svg';
import AddMoney from '../AddMoney';
import ModalContainer from '@/components/molecules/ModalContainer';
import { StyledUserDetailModal } from '../UserDetailModal/UserDetailModal.styles';

const SellerDetailModal = ({ user, setSellerPropertiesModal, setMoneyAdded }) => {
  return (
    <StyledUserDetailModal>
      <span className="heading">Personal Info:</span>
      <div className="product-info">
        <div className="col">
          <span className="heading">Full Name:</span>
          <span className="text">{user?.fullName}</span>
        </div>
        <div className="col">
          <span className="heading">Username:</span>
          <span className="text">{user?.username}</span>
        </div>
        <div className="col">
          <span className="heading">Emial Address:</span>
          <span className="text">{user?.email}</span>
        </div>
      </div>
      <div className="col-holder">
        <div className="col">
          <div className="head">
            <span className="heading">KYC Info:</span>
            <div className="button">
              <span>Level {user?.kycLevel}</span>
            </div>
          </div>
          <div className="content">
            <div>
              <span className="heading">Request For:</span>
              <span className="text">Max Level</span>
            </div>
            <div>
              <span className="heading">Actions</span>
              <Button variant="success" $custom>
                Check Details
              </Button>
            </div>
          </div>
        </div>
        <div className="col col-2">
          <span className="heading">Wallet Balance Info:</span>
          <div className="content">
            <div>
              <span className="heading">Total Balance:</span>
              <span className="text">$40,256.000</span>
            </div>
            <div>
              <span className="heading">Actions</span>
              <ModalContainer
                width={600}
                title="Add Money to Wallet"
                btnComponent={({ onClick }) => (
                  <Button variant="success" $custom onClick={onClick}>
                    Add Balance
                  </Button>
                )}
                content={({ onClose }) => <AddMoney setMoneyAdded={setMoneyAdded} />}
              />
            </div>
          </div>
        </div>
      </div>
      <span className="heading">Seller’s Products Categories Info:</span>
      <div className="product-info inheritance-info">
        <div className="col" onClick={() => setSellerPropertiesModal(true)}>
          <figure className="img-holder">
            <Image src={propertyIcon} alt="property-icon" />
          </figure>
          <span className="text">Properties</span>
        </div>
        <div className="col">
          <figure className="img-holder">
            <Image src={popularIcon} alt="Popular-icon" />
          </figure>
          <span className="text">Popular</span>
        </div>
        <div className="col">
          <figure className="img-holder">
            <Image src={ventureIcon} alt="Venture-icon" />
          </figure>
          <span className="text">Properties</span>
        </div>
        <div className="col">
          <figure className="img-holder">
            <Image src={bazarIcon} alt="Bazaar-icon" />
          </figure>
          <span className="text">Bazaar</span>
        </div>
        <div className="col">
          <figure className="img-holder">
            <Image src={vehicleIcon} alt="Vehicles-icon" />
          </figure>
          <span className="text">Vehicles</span>
        </div>
      </div>
    </StyledUserDetailModal>
  );
};

export default SellerDetailModal;
