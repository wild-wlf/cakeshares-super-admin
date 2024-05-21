import React from 'react';
import { StyledUserDetailModal } from './UserDetailModal.styles';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import propertyIcon from '../../../../../public/assets/property-icon-1.svg';
import popularIcon from '../../../../../public/assets/popular-icon.svg';
import ventureIcon from '../../../../../public/assets/venture-icon.svg';
import bazarIcon from '../../../../../public/assets/bazar-icon.svg';
import vehicleIcon from '../../../../../public/assets/vehicle-icon.svg';

const UserDetailModal = ({ setPropertiesProductModal }) => {
  const infoData = {
    fullName: 'Alex Mertiz',
    userName: 'alex123',
    email: 'alex123@gmail.com',
    country: 'Turkey',
    birthDate: '03/05/2024',
    countryFlag: 'TR',
    countryName: 'Turkey',
  };
  const BankInfoData = {
    bankName: 'Bank of Americe',
    IBAN: 'PK033310084246213',
    bic_Number: 'PK033310084246213',
    user_id: 33445554,
  };
  const inheritanceData = {
    name: 'Logan Paulson',
    passport: '123467894562339',
    country: 'United States',
  };
  return (
    <StyledUserDetailModal>
      <span className="heading">Personal Info:</span>
      <div className="product-info">
        <div className="col">
          <span className="heading">Full Name:</span>
          <span className="text">{infoData.fullName}</span>
        </div>
        <div className="col">
          <span className="heading">Username:</span>
          <span className="text">{infoData.userName}</span>
        </div>
        <div className="col">
          <span className="heading">Emial Address:</span>
          <span className="text">{infoData.email}</span>
        </div>
        <div className="col">
          <span className="heading">Country:</span>
          <div className="flag-holder">
            <figure className="img-holder">
              <Image
                src={`https://countryflagsapi.netlify.app/flag/${infoData.countryFlag}.svg`}
                width={64}
                height={64}
                alt={`Flag of PK`}
              />
            </figure>
            <span className="text">{infoData.countryName}</span>
          </div>
        </div>
        <div className="col">
          <span className="heading">Birthdate (D.O.B):</span>
          <span className="text">{infoData.birthDate}</span>
        </div>
      </div>
      <span className="heading">Bank Info:</span>
      <div className="product-info">
        <div className="col">
          <span className="heading">Full Name:</span>
          <span className="text">{BankInfoData.bankName}</span>
        </div>
        <div className="col">
          <span className="heading">Username:</span>
          <span className="text">{BankInfoData.IBAN}</span>
        </div>
        <div className="col">
          <span className="heading">Emial Address:</span>
          <span className="text">{BankInfoData.bic_Number}</span>
        </div>
        <div className="col">
          <span className="heading">Birthdate (D.O.B):</span>
          <span className="text">{BankInfoData.user_id}</span>
        </div>
      </div>
      <div className="col-holder">
        <div className="col">
          <div className="head">
            <span className="heading">KYC Info:</span>
            <div className="button">
              <span>Level 1</span>
            </div>
          </div>
          <div className="content">
            <div>
              <span className="heading">Request For:</span>
              <span className="text">level 2</span>
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
              <Button variant="success" $custom>
                Add Balance
              </Button>
            </div>
          </div>
        </div>
      </div>
      <span className="heading">Inheritance Info:</span>
      <div className="product-info">
        <div className="col">
          <span className="heading">Name of Person:</span>
          <span className="text">{inheritanceData.name}</span>
        </div>
        <div className="col">
          <span className="heading">Passport Number:</span>
          <span className="text">{inheritanceData.passport}</span>
        </div>
        <div className="col">
          <span className="heading">Country of Residence:</span>
          <span className="text">{inheritanceData.country}</span>
        </div>
      </div>
      <span className="heading">Assets Categories Info:</span>
      <div className="product-info inheritance-info">
        <div className="col" onClick={() => setPropertiesProductModal(true)}>
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

export default UserDetailModal;
