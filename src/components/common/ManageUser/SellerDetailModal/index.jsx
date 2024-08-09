import React from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import popularIcon from '../../../../../public/assets/popular-icon.svg';
import AddMoney from '../AddMoney';
import ModalContainer from '@/components/molecules/ModalContainer';
import { StyledUserDetailModal } from '../UserDetailModal/UserDetailModal.styles';
import declineIcon from '../../../../../public/assets/decline-icon.svg';
import DeclineModal from '../../DeclineModal';
import { formatNumber } from '@/helpers/common';

const SellerDetailModal = ({
  user,
  setSellerPropertiesModal,
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
            <span className="heading">{user?.isIndividualSeller ? 'KYC' : 'KYB '} Info:</span>
            <div className="button">
              <span>Level {user?.kycLevel}</span>
            </div>
          </div>
          <div className="content">
            <div>
              <span className="heading">Request For:</span>
              <span className="text">Level: {user?.kycRequestLevel || 'None'}</span>
            </div>
            <div>
              <span className="heading">Actions</span>
              <Button disable={!user?.isKycRequested} variant="success" $custom>
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
              <span className="text">$ {formatNumber(user?.wallet) || '0.00'}</span>
            </div>
            <div>
              <span className="heading">Actions</span>
              <ModalContainer
                width={600}
                title="Add Money to Wallet"
                btnComponent={({ onClick }) => (
                  <Button
                    disable={!user?.isVerified || user?.requestPaymentWallet?.length > 0}
                    variant="success"
                    $custom
                    onClick={onClick}>
                    Add Balance
                  </Button>
                )}
                content={({ onClose }) => (
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
      <span className="heading">Seller’s Products Categories Info:</span>
      <div className="product-info inheritance-info">
        {user?.uniqueSellerCategories && user?.uniqueSellerCategories?.length > 0 ? (
          user?.uniqueSellerCategories?.map((ele, index) => (
            <div key={ele?._id} className="col" onClick={() => setSellerPropertiesModal(true)}>
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
      {user?.status === 'Suspended' && (
        <div className="btn-holder">
          <Button
            onClick={() => {
              handleConfirmActivate(user?._id, 'Approve');
            }}
            variant="success"
            custom
            xsCustom>
            Unsuspend
          </Button>

        </div>
      )}
    </StyledUserDetailModal>
  );
};

export default SellerDetailModal;
