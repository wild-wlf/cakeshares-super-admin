import React, { useMemo, useState, useCallback } from 'react';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import { MdModeEditOutline } from 'react-icons/md';
import Image from 'next/image';
import { TableContainer } from '@/components/atoms/PermissionsTable/PermissionsTable.style';
import Button from '@/components/atoms/Button';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import DeleteModal from '@/components/atoms/UserDeleteModal/DeleteModal';
import SuccessfulModal from '@/components/atoms/UserDeleteModal/SuccessfulModal';
import EditUserModal from '@/components/atoms/EditUserModal';
import userService from '@/services/userService';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import ModalContainer from '@/components/molecules/ModalContainer';
import successIcon from '../../../../../public/assets/successIcon.png';
import detailIcon from '../../../../../public/assets/table-detail-icon.svg';
import modalinfoIcon from '../../../../../public/assets/infoIcon.png';
import DeleteIcon from '../../../../../public/assets/table-delete-icon.svg';
import TableStyle from '../../../../../public/assets/table-style.jpg';
import CalenderIcon from '../../../../../public/assets/calander.svg';
import userAvatar from '../../../../../public/assets/user_avatar.png';
import declineIcon from '../../../../../public/assets/decline-icon.svg';
import UserDetailModal from '../UserDetailModal';
import KycRequest from '../KycRequest';
import AddMoney from '../AddMoney';
import PropertiesProductsModal from '../PropertiesProductsModal';
import DeclineModal from '../../DeclineModal';
import SellerDetailModal from '../SellerDetailModal';
import SellerKycRequest from '../SellerKycRequest';
import SellerPropertiesModal from '../SellerPropertiesModal';
import EditUser from '../EditUser';
import Toast from '@/components/molecules/Toast';
import CompanySellerKycRequest from '../CompanySellerKycRequest';
import Tooltip from '@/components/atoms/Tooltip';

const ManageUserTable = () => {
  const { fetch, refetch } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
    refetch: v.refetch,
  }));

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [tab, setTab] = useState(1);
  const [successUpdatedModal, setSuccessUpdatedModal] = useState(false);
  const [kycApproved, setkycApproved] = useState(false);
  const [moneyAdded, setMoneyAdded] = useState(false);
  const [kycDecline, setkycDecline] = useState(false);
  const [propertiesProductModal, setPropertiesProductModal] = useState(false);
  const [sellerPropertiesModal, setSellerPropertiesModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState();
  const [approvedorDeclinedKycLevel, setApprovedorDeclinedKycLevel] = useState();
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    startDate: '',
    endDate: '',
    searchText: '',
    type: 'Buyer',
    kycLevel: '',
    status: '',
    accType: '',
  });

  const { user_data, user_loading } = userService.GetAllUsers(searchQuery, fetch);

  const handleSuccessEditModal = () => {
    setEditModal(false);
    setSuccessUpdatedModal(true);
  };

  const handleConfirmActivate = useCallback(async (id, type) => {
    try {
      setIsLoading(true);
      const obj = { isVerified: type === 'Approve', status: 'Active' };
      const payload = new FormData();
      Object.keys(obj).forEach(key => payload.append(key, obj[key]));

      await userService.updateUser(id, payload);
      Toast({
        type: 'success',
        message: 'User Approved Successfully!',
      });
      refetch();
    } catch ({ message }) {
      Toast({
        type: 'error',
        message: `Failed to ${type} this User! Please Try Again!`,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const actionSellerBtns = user => {
    return (
      <ActionBtnList>
        <li>
          <ModalContainer
            width={1000}
            title={`${user?.fullName || user?.username} Detail`}
            btnComponent={({ onClick }) => (
              <button type="button" className="btn file" onClick={onClick}>
                <Image src={detailIcon} alt="detailIcon" height={18} width={18} />
              </button>
            )}
            content={({ onClose }) => (
              <SellerDetailModal
                user={user}
                setSellerPropertiesModal={setSellerPropertiesModal}
                setMoneyAdded={setMoneyAdded}
                handleConfirmActivate={handleConfirmActivate}
              />
            )}
          />
        </li>
        {!user.isIndividualSeller
          ? user?.isKycRequested && (
              <li>
                <ModalContainer
                  lg
                  width={800}
                  title="KYB Info"
                  btnComponent={({ onClick }) => (
                    <button type="button" className="btn file" onClick={onClick}>
                      <span className="circle" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 17" fill="none">
                        <g clipPath="url(#clip0_1619_29943)">
                          <path
                            d="M12.5422 1.44448L8.31329 0.0344044C8.17483 -0.0117123 8.02515 -0.0117123 7.88669 0.0344044L3.65714 1.44448C2.9849 1.66794 2.40017 2.09754 1.986 2.67226C1.57184 3.24699 1.34929 3.9376 1.34999 4.646V8.09998C1.34999 13.205 7.55999 16.0245 7.82594 16.1419C7.91222 16.1803 8.00558 16.2001 8.09999 16.2001C8.1944 16.2001 8.28776 16.1803 8.37404 16.1419C8.63999 16.0245 14.85 13.205 14.85 8.09998V4.646C14.8506 3.93752 14.628 3.24684 14.2137 2.67211C13.7994 2.09738 13.2145 1.66782 12.5422 1.44448ZM8.09999 12.825C7.96649 12.825 7.83599 12.7854 7.72498 12.7112C7.61398 12.6371 7.52746 12.5316 7.47637 12.4083C7.42528 12.285 7.41192 12.1492 7.43796 12.0183C7.46401 11.8874 7.5283 11.7671 7.6227 11.6727C7.7171 11.5783 7.83737 11.514 7.96831 11.488C8.09924 11.4619 8.23496 11.4753 8.3583 11.5264C8.48164 11.5775 8.58706 11.664 8.66123 11.775C8.7354 11.886 8.77499 12.0165 8.77499 12.15C8.77499 12.329 8.70388 12.5007 8.57729 12.6273C8.4507 12.7539 8.27901 12.825 8.09999 12.825ZM8.77499 9.44998C8.77499 9.629 8.70388 9.80069 8.57729 9.92728C8.4507 10.0539 8.27901 10.125 8.09999 10.125C7.92097 10.125 7.74928 10.0539 7.6227 9.92728C7.49611 9.80069 7.42499 9.629 7.42499 9.44998V4.04998C7.42499 3.87096 7.49611 3.69927 7.6227 3.57268C7.74928 3.4461 7.92097 3.37498 8.09999 3.37498C8.27901 3.37498 8.4507 3.4461 8.57729 3.57268C8.70388 3.69927 8.77499 3.87096 8.77499 4.04998V9.44998Z"
                            fill="#419400"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1619_29943">
                            <rect width="16.2" height="16.2" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  )}
                  content={({ onClose }) => (
                    <CompanySellerKycRequest
                      user={user}
                      flexWrap
                      setkycApproved={setkycApproved}
                      setkycDecline={setkycDecline}
                      setApprovedorDeclinedKycLevel={setApprovedorDeclinedKycLevel}
                    />
                  )}
                />
              </li>
            )
          : user?.isKycRequested && (
              <li>
                <ModalContainer
                  lg
                  width={673}
                  title="KYC Info"
                  btnComponent={({ onClick }) => (
                    <button type="button" className="btn file" onClick={onClick}>
                      <span className="circle" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 17" fill="none">
                        <g clipPath="url(#clip0_1619_29943)">
                          <path
                            d="M12.5422 1.44448L8.31329 0.0344044C8.17483 -0.0117123 8.02515 -0.0117123 7.88669 0.0344044L3.65714 1.44448C2.9849 1.66794 2.40017 2.09754 1.986 2.67226C1.57184 3.24699 1.34929 3.9376 1.34999 4.646V8.09998C1.34999 13.205 7.55999 16.0245 7.82594 16.1419C7.91222 16.1803 8.00558 16.2001 8.09999 16.2001C8.1944 16.2001 8.28776 16.1803 8.37404 16.1419C8.63999 16.0245 14.85 13.205 14.85 8.09998V4.646C14.8506 3.93752 14.628 3.24684 14.2137 2.67211C13.7994 2.09738 13.2145 1.66782 12.5422 1.44448ZM8.09999 12.825C7.96649 12.825 7.83599 12.7854 7.72498 12.7112C7.61398 12.6371 7.52746 12.5316 7.47637 12.4083C7.42528 12.285 7.41192 12.1492 7.43796 12.0183C7.46401 11.8874 7.5283 11.7671 7.6227 11.6727C7.7171 11.5783 7.83737 11.514 7.96831 11.488C8.09924 11.4619 8.23496 11.4753 8.3583 11.5264C8.48164 11.5775 8.58706 11.664 8.66123 11.775C8.7354 11.886 8.77499 12.0165 8.77499 12.15C8.77499 12.329 8.70388 12.5007 8.57729 12.6273C8.4507 12.7539 8.27901 12.825 8.09999 12.825ZM8.77499 9.44998C8.77499 9.629 8.70388 9.80069 8.57729 9.92728C8.4507 10.0539 8.27901 10.125 8.09999 10.125C7.92097 10.125 7.74928 10.0539 7.6227 9.92728C7.49611 9.80069 7.42499 9.629 7.42499 9.44998V4.04998C7.42499 3.87096 7.49611 3.69927 7.6227 3.57268C7.74928 3.4461 7.92097 3.37498 8.09999 3.37498C8.27901 3.37498 8.4507 3.4461 8.57729 3.57268C8.70388 3.69927 8.77499 3.87096 8.77499 4.04998V9.44998Z"
                            fill="#419400"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1619_29943">
                            <rect width="16.2" height="16.2" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  )}
                  content={({ onClose }) => (
                    <SellerKycRequest
                      user={user}
                      setkycApproved={setkycApproved}
                      setkycDecline={setkycDecline}
                      setApprovedorDeclinedKycLevel={setApprovedorDeclinedKycLevel}
                    />
                  )}
                />
              </li>
            )}
        {user?.isVerified && (
          <>
            <li>
              <ModalContainer
                width={800}
                title="Edit User"
                btnComponent={({ onClick }) => (
                  <button type="button" className="btn edit" onClick={onClick}>
                    <MdModeEditOutline color="rgba(64, 143, 140, 1)" size={16} />
                  </button>
                )}
                content={({ onClose }) => (
                  <EditUser user={user} setSuccessUpdatedModal={setSuccessUpdatedModal} onClose={onClose} />
                )}
              />
            </li>
            <li>
              <button type="button" className="btn delete">
                <Image
                  src={DeleteIcon}
                  alt="DeleteIcon"
                  onClick={() => {
                    setUserToDelete(user?._id);
                    setDeleteModal(true);
                  }}
                />
              </button>
            </li>
          </>
        )}
      </ActionBtnList>
    );
  };

  const actionBuyerBtns = user => {
    return (
      <ActionBtnList>
        <li>
          <ModalContainer
            width={1000}
            title={`${user?.fullName} Detail`}
            btnComponent={({ onClick }) => (
              <>
                {/* <Tooltip title="View Detail" type="dark"> */}
                <button type="button" className="btn file" onClick={onClick}>
                  <Image src={detailIcon} alt="detailIcon" height={18} width={18} />
                </button>
                {/* </Tooltip> */}
              </>
            )}
            content={({ onClose }) => (
              <UserDetailModal
                user={user}
                setPropertiesProductModal={setPropertiesProductModal}
                setMoneyAdded={setMoneyAdded}
                handleConfirmActivate={handleConfirmActivate}
              />
            )}
          />
        </li>
        {user?.isKycRequested && (
          <li>
            <ModalContainer
              lg
              width={673}
              title="KYC Info"
              btnComponent={({ onClick }) => (
                <button type="button" className="btn file" onClick={onClick}>
                  <span className="circle" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 17" fill="none">
                    <g clipPath="url(#clip0_1619_29943)">
                      <path
                        d="M12.5422 1.44448L8.31329 0.0344044C8.17483 -0.0117123 8.02515 -0.0117123 7.88669 0.0344044L3.65714 1.44448C2.9849 1.66794 2.40017 2.09754 1.986 2.67226C1.57184 3.24699 1.34929 3.9376 1.34999 4.646V8.09998C1.34999 13.205 7.55999 16.0245 7.82594 16.1419C7.91222 16.1803 8.00558 16.2001 8.09999 16.2001C8.1944 16.2001 8.28776 16.1803 8.37404 16.1419C8.63999 16.0245 14.85 13.205 14.85 8.09998V4.646C14.8506 3.93752 14.628 3.24684 14.2137 2.67211C13.7994 2.09738 13.2145 1.66782 12.5422 1.44448ZM8.09999 12.825C7.96649 12.825 7.83599 12.7854 7.72498 12.7112C7.61398 12.6371 7.52746 12.5316 7.47637 12.4083C7.42528 12.285 7.41192 12.1492 7.43796 12.0183C7.46401 11.8874 7.5283 11.7671 7.6227 11.6727C7.7171 11.5783 7.83737 11.514 7.96831 11.488C8.09924 11.4619 8.23496 11.4753 8.3583 11.5264C8.48164 11.5775 8.58706 11.664 8.66123 11.775C8.7354 11.886 8.77499 12.0165 8.77499 12.15C8.77499 12.329 8.70388 12.5007 8.57729 12.6273C8.4507 12.7539 8.27901 12.825 8.09999 12.825ZM8.77499 9.44998C8.77499 9.629 8.70388 9.80069 8.57729 9.92728C8.4507 10.0539 8.27901 10.125 8.09999 10.125C7.92097 10.125 7.74928 10.0539 7.6227 9.92728C7.49611 9.80069 7.42499 9.629 7.42499 9.44998V4.04998C7.42499 3.87096 7.49611 3.69927 7.6227 3.57268C7.74928 3.4461 7.92097 3.37498 8.09999 3.37498C8.27901 3.37498 8.4507 3.4461 8.57729 3.57268C8.70388 3.69927 8.77499 3.87096 8.77499 4.04998V9.44998Z"
                        fill="#419400"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1619_29943">
                        <rect width="16.2" height="16.2" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              )}
              content={({ onClose }) => (
                <KycRequest
                  user={user}
                  setkycApproved={setkycApproved}
                  setkycDecline={setkycDecline}
                  setApprovedorDeclinedKycLevel={setApprovedorDeclinedKycLevel}
                />
              )}
            />
          </li>
        )}
        {user?.isVerified && (
          <>
            <li>
              <button
                type="button"
                className="btn edit"
                onClick={() => {
                  setUserData(user);
                  setEditModal(true);
                }}>
                <MdModeEditOutline color="rgba(64, 143, 140, 1)" size={16} />
              </button>
            </li>

            <li>
              <button type="button" className="btn delete">
                <Image
                  src={DeleteIcon}
                  alt="DeleteIcon"
                  onClick={() => {
                    setUserToDelete(user?._id);
                    setDeleteModal(true);
                  }}
                />
              </button>
            </li>
          </>
        )}
      </ActionBtnList>
    );
  };

  const { buyer_rows, totalCount } = useMemo(() => ({
    buyer_rows: user_data?.items?.map(user => [
      <div className="table-img-holder" key={user?._id}>
        <div className="img-holder">
          <Image src={user?.profilePicture || userAvatar} width={20} height={20} alt="userImage" />
        </div>
        {user.fullName || user.username || '------------'}
      </div>,
      user?.type || '------------',
      user?.total_assets || '------------',
      user?.total_assets_amount || '------------',
      user?.wallet_balance || '------------',
      user?.kycLevel ?? '------------',
      user?.isVerified ? 'Approved' : 'Pending' ?? '------------',
      actionBuyerBtns(user),
    ]),
    totalCount: user_data?.totalItems,
  }));
  const { seller_rows, totalCounts } = useMemo(() => ({
    seller_rows: user_data?.items?.map(user => [
      <div className="table-img-holder" key={user?._id}>
        <div className="img-holder">
          <Image src={user?.profilePicture || userAvatar} width={20} height={20} alt="userImage" />
        </div>
        {user.fullName || user.username || '------------'}
      </div>,
      user?.isIndividualSeller ? 'Individual Seller' : 'Compnay Seller',
      user?.totalProducts ?? '------------',
      user?.total_assets_amount || '------------',
      user?.wallet_balance || '------------',
      user?.kycLevel ?? '------------',
      actionSellerBtns(user),
    ]),
    totalCounts: user_data?.totalItems,
  }));
  const buyerColumns = [
    `User`,
    `Account Type`,
    `Total Assets`,
    'Total Assets Amount',
    'Wallet Balance',
    'KYC Level',
    'Status',
    'Actions',
  ];
  const sellerColumns = [
    `User`,
    `Account Type`,
    `Total Products`,
    'Total Revenue',
    'Wallet Balance',
    'KYC/KYB Level',
    'Actions',
  ];

  return (
    <>
      {/* <CenterModal width="600" title="Add Money to Wallet">
        <AddMoney setMoneyAdded={setMoneyAdded} />
      </CenterModal> */}
      {/* money added Successfully Modal */}
      <CenterModal
        open={moneyAdded}
        setOpen={setMoneyAdded}
        title={<Image src={successIcon} alt="InfoIcon" />}
        width="543">
        <SuccessfulModal title="Money Added Successfully!" />
      </CenterModal>
      {/* money added Successfully Modal */}

      <CenterModal
        open={deleteModal}
        setOpen={setDeleteModal}
        title={<Image src={modalinfoIcon} alt="InfoIcon" />}
        width="543">
        <DeleteModal
          id={userToDelete}
          closeDeleteModal={() => {
            setDeleteModal(false);
          }}
          openSuccessfulModal={() => {
            setDeleteModal(false);
            setSuccessModal(true);
          }}
          type="user"
        />
      </CenterModal>
      {/* Kyc Apprvove Modal */}
      <CenterModal
        open={kycApproved}
        setOpen={setkycApproved}
        title={<Image src={successIcon} alt="InfoIcon" />}
        width="543">
        <SuccessfulModal
          title={
            approvedorDeclinedKycLevel === 3
              ? 'KYC Level Maxed Successfully!'
              : `KYC Level ${approvedorDeclinedKycLevel} Approved Successfully!`
          }
        />
      </CenterModal>
      {/* Kyc Apprvove Modal */}

      {/* Kyc decline Modal */}
      <CenterModal
        open={kycDecline}
        setOpen={setkycDecline}
        title={<Image src={modalinfoIcon} alt="modalinfoIcon" />}
        width="543">
        <SuccessfulModal title="KYC Level 2 Request Declined Successfully!" />
      </CenterModal>
      {/* Kyc decline Modal */}

      <CenterModal
        open={successUpdatedModal}
        setOpen={setSuccessUpdatedModal}
        title={<Image src={successIcon} alt="InfoIcon" />}
        width="543">
        <SuccessfulModal title="User Updated Successfully!" />
      </CenterModal>
      {/* Properties Products Modal */}
      <CenterModal
        open={propertiesProductModal}
        setOpen={setPropertiesProductModal}
        title="Alex Mertiz Detail"
        width="900">
        <PropertiesProductsModal />
      </CenterModal>
      <CenterModal
        open={sellerPropertiesModal}
        setOpen={setSellerPropertiesModal}
        title="Alex Mertiz Detail"
        width="900">
        <SellerPropertiesModal />
      </CenterModal>
      {/* Properties Products Modal */}
      <CenterModal
        open={successModal}
        setOpen={setSuccessModal}
        title={<Image src={successIcon} alt="InfoIcon" />}
        width="543">
        <SuccessfulModal title="User Suspended Successfully!" />
      </CenterModal>
      <CenterModal open={editModal} setOpen={setEditModal} title="Edit User" width="803">
        <EditUserModal user={userData} handleSuccessEditModal={handleSuccessEditModal} />
      </CenterModal>
      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableCurve" />
        <TableLayout
          buyerSellerTabs
          btnWidth="40px"
          btnType="download"
          iconImg={CalenderIcon}
          placeholder="Search User"
          onChangeFilters={filters => {
            setSearchQuery(_ => ({
              ..._,
              ...filters,
            }));
          }}
          currentPage={searchQuery.page}
          totalCount={totalCount}
          totalCounts={totalCounts}
          pageSize={searchQuery.itemsPerPage}
          tab={tab}
          setTab={setTab}>
          {tab === 1 ? (
            <Table width={1024} rowsData={buyer_rows} loading={user_loading} columnNames={buyerColumns} noPadding />
          ) : (
            <Table width={1024} rowsData={seller_rows} loading={user_loading} columnNames={sellerColumns} noPadding />
          )}
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default ManageUserTable;
