import React, { useMemo, useState } from 'react';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import { MdModeEditOutline } from 'react-icons/md';
import Image from 'next/image';
import { TableContainer } from '@/components/atoms/PermissionsTable/PermissionsTable.style';
import Button from '@/components/atoms/Button';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import userService from '@/services/userService';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import ModalContainer from '@/components/molecules/ModalContainer';
import TableStyle from '../../../../../public/assets/table-style.jpg';
import CalenderIcon from '../../../../../public/assets/calander.svg';
import userAvatar from '../../../../../public/assets/user_avatar.png';
import detailIcon from '../../../../../public/assets/view-detail-icon.svg';
import declineIcon from '../../../../../public/assets/decline-icon.svg';
import DeclineModal from '../../DeclineModal';

const MangeProductsTable = () => {
  const { fetch } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
  }));
  const [tab, setTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    startDate: '',
    endDate: '',
    searchText: '',
  });

  const { user_data, user_loading } = userService.GetAllUsers(searchQuery, fetch);

  const actionBtns = user => {
    if (!user.isVerified) {
      return (
        <ActionBtnList>
          <li>
            <Button variant="success" custom xsCustom>
              Approve
            </Button>
          </li>
          <li>
            <ModalContainer
              width={500}
              title={<Image src={declineIcon} alt="declineIcon" />}
              btnComponent={({ onClick }) => (
                <Button variant="danger" custom xsCustom onClick={onClick}>
                  Decline
                </Button>
              )}
              content={({ onClose }) => <DeclineModal onClose={onClose} />}
            />
          </li>
        </ActionBtnList>
      );
    }
    if (user.isVerified) {
      return (
        <ActionBtnList>
          <li>
            <Button variant="secondary" custom xsCustom>
              <Image src={detailIcon} alt="detailIcon" />
              View Detail
            </Button>
          </li>
        </ActionBtnList>
      );
    }
  };
  const actionBtnss = () => {
    <ActionBtnList>
      <li>
        <Button variant="secondary" custom xsCustom>
          <Image src={detailIcon} alt="detailIcon" />
          View Detail
        </Button>
      </li>
    </ActionBtnList>;
  };
  const investments_data = [
    {
      userName: 'Logan Paulson',
      total_investments: 50,
      amount: '$40,256.000',
    },
    {
      userName: 'Logan Paulson',
      total_investments: 50,
      amount: '$40,256.000',
    },
    {
      userName: 'Logan Paulson',
      total_investments: 50,
      amount: '$40,256.000',
    },
    {
      userName: 'Logan Paulson',
      total_investments: 50,
      amount: '$40,256.000',
    },
    {
      userName: 'Logan Paulson',
      total_investments: 50,
      amount: '$40,256.000',
    },
    {
      userName: 'Logan Paulson',
      total_investments: 50,
      amount: '$40,256.000',
    },
  ];
  const { product_rows, totalCount } = useMemo(() => ({
    product_rows: investments_data?.map(user => [
      <div className="table-img-holder" key={user?._id}>
        <div className="img-holder">
          {/* <Image src={user?.profilePicture || userAvatar} width={20} height={20} alt="userImage" /> */}
          <Image src={userAvatar} alt="userAvatar" />
        </div>
        {user.userName || '------------'}
      </div>,
      user?.total_investments || '------------',
      user?.amount || '------------',
      actionBtnss(),
    ]),
    totalCount: investments_data?.totalItems,
  }));
  const { user_rows, totalCounts } = useMemo(() => ({
    user_rows: user_data?.items?.map(user => [
      <div className="table-img-holder" key={user?._id}>
        <div className="img-holder">
          <Image src={user?.profilePicture || userAvatar} width={20} height={20} alt="userImage" />
        </div>
        {user.fullName || '------------'}
      </div>,
      user?.type || '------------',
      user?.total_assets || '------------',
      user?.total_assets_amount || '------------',
      user?.wallet_balance || '------------',
      user?.kycLevel ?? '------------',
      actionBtns(user),
    ]),
    totalCounts: user_data?.totalItems,
  }));
  const buyerColumns = [`User`, `Total Investments`, `Total Investments Amount`, `Actions   `];
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
      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableCurve" />
        <TableLayout
          manageProductsTabs
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
            <Table width={1024} rowsData={product_rows} loading={user_loading} columnNames={buyerColumns} noPadding />
          ) : (
            <Table width={1024} rowsData={user_rows} loading={user_loading} columnNames={sellerColumns} noPadding />
          )}
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default MangeProductsTable;
