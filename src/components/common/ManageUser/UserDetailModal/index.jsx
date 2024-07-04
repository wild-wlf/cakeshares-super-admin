import React from 'react';
import { StyledUserDetailModal } from './UserDetailModal.styles';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import popularIcon from '../../../../../public/assets/popular-icon.svg';
import AddMoney from '../AddMoney';
import ModalContainer from '@/components/molecules/ModalContainer';
import declineIcon from '../../../../../public/assets/decline-icon.svg';
import { format } from 'date-fns';
import DeclineModal from '../../DeclineModal';
import { formatNumber } from '@/helpers/common';

const UserDetailModal = ({
  user,
  setPropertiesProductModal,
  setMoneyAdded,
  handleConfirmActivate,
  setMoneyAddedMessage,
}) => {
  return (
    <StyledUserDetailModal>
      <span className="heading">Personal Info:</span>
      <div className="product-info">
        <div className="col">
          <span className="heading">Full Name:</span>
          <span className="text">{user.fullName}</span>
        </div>
        <div className="col">
          <span className="heading">Username:</span>
          <span className="text">{user.username}</span>
        </div>
        <div className="col">
          <span className="heading">Emial Address:</span>
          <span className="text">{user.email}</span>
        </div>
        <div className="col">
          <span className="heading">Country:</span>
          <div className="flag-holder">
            <figure className="img-holder">
              <Image
                src={`https://countryflagsapi.netlify.app/flag/${user.country}.svg`}
                width={64}
                height={64}
                alt={`Flag of PK`}
              />
            </figure>
            <span className="text">{user.countryName}</span>
          </div>
        </div>
        <div className="col">
          <span className="heading">Birthdate (D.O.B):</span>
          <span className="text">{format(new Date(user?.dob), 'yyyy-MM-dd')}</span>
        </div>
      </div>
      <span className="heading">Bank Info:</span>
      <div className="product-info">
        <div className="col">
          <span className="heading">Bank Name:</span>
          <span className="text">{user?.bank?.bankName || ''}</span>
        </div>
        <div className="col">
          <span className="heading">IBAN:</span>
          <span className="text">{user?.bank?.iban || ''}</span>
        </div>
        <div className="col">
          <span className="heading">Swift/BIC Number:</span>
          <span className="text">{user?.bank?.swiftBicNumber || ''}</span>
        </div>
        <div className="col">
          <span className="heading">User ID:</span>
          <span className="text">{user?.bank?.userId}</span>
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
          {/* {user?.isKycRequested && ( */}
          <div className="content">
            <div>
              <span className="heading">Request For:</span>
              <span className="text">Level: {user?.kycRequestLevel || 'None'}</span>
            </div>
            <div>
              <span className="heading">Actions</span>
              <Button
                disable={!user?.isKycRequested}
                //  onClick={() => approveKyc(user?._id)}
                variant="success"
                $custom>
                Check Details
              </Button>
            </div>
          </div>
          {/* )} */}
        </div>
        <div className="col col-2">
          <span className="heading">Wallet Balance Info:</span>
          <div className="content">
            <div>
              <span className="heading">Total Balance:</span>
              <span className="text">$ {formatNumber(user?.wallet) || '0.00'}</span>
            </div>
            <div>
              <span className="heading">Actions</span>
              <ModalContainer
                width={600}
                title="Add Money to Wallet"
                btnComponent={({ onClick }) => (
                  <Button disable={!user?.isVerified} variant="success" $custom onClick={onClick}>
                    Add Balance
                  </Button>
                )}
                content={() => (
                  <AddMoney
                    id={user?._id}
                    currentBalance={user?.wallet}
                    setMoneyAdded={setMoneyAdded}
                    setMoneyAddedMessage={setMoneyAddedMessage}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <span className="heading">Inheritance Info:</span>
      {user?.inheritances &&
        user?.inheritances?.length > 0 &&
        user?.inheritances?.map((ele, index) => {
          return (
            <div key={index} className="product-info">
              <div className="col">
                <span className="heading">Name of Person:</span>
                <span className="text">{ele.name}</span>
              </div>
              <div className="col">
                <span className="heading">Passport Number:</span>
                <span className="text">{ele.passportNumber}</span>
              </div>
              <div className="col">
                <span className="heading">Country of Residence:</span>
                <span className="text">{ele.country}</span>
              </div>
            </div>
          );
        })}
      <span className="heading">Assets Categories Info:</span>
      <div className="product-info inheritance-info">
        {user?.uniqueBuyerCategories && user?.uniqueBuyerCategories.length > 0 ? (
          user.uniqueBuyerCategories.map(ele => (
            <div key={ele?._id} className="col" onClick={() => setPropertiesProductModal(true)}>
              <figure className="img-holder">
                <Image src={ele?.icon || popularIcon} alt="property-icon" width={30} height={30} />
              </figure>
              <span className="text">{ele?.name}</span>
            </div>
          ))
        ) : (
          <span>No Categories Available</span>
        )}
      </div>
      {!user?.isVerified && (
        <div className="btn-holder">
          <Button
            onClick={() => {
              handleConfirmActivate(user?._id, 'Approve');
            }}
            variant="success"
            custom
            xsCustom>
            Approve
          </Button>
          <ModalContainer
            width={500}
            title={<Image src={declineIcon} alt="declineIcon" />}
            btnComponent={({ onClick }) => (
              <Button variant="danger" custom xsCustom onClick={onClick}>
                Decline
              </Button>
            )}
            content={({ onClose }) => <DeclineModal type="User" onClose={onClose} id={user?._id} />}
          />
        </div>
      )}
    </StyledUserDetailModal>
  );
};

export default UserDetailModal;
