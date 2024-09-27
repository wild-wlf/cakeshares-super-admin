import React, { useEffect, useMemo, useState } from 'react';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import TableStyle from '../../../../public/assets/table-style.jpg';
import InfoIcon from '../../../../public/assets/infoIcon.png';
import Image from 'next/image';
import { TableContainer } from '@/components/atoms/TableContainer/TableContainer.styles';
import paymentService from '@/services/paymentService';
import { format } from 'date-fns';
import { formatNumber, getDateObject } from '@/helpers/common';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import dollaricon from '../../../../public/assets/dollaricon.svg';
import ViewPayoutInfo from '@/components/atoms/ViewPayoutInfo';
import Select from '@/components/atoms/Select';
import Toast from '@/components/molecules/Toast';

const PayoutTable = ({ setPayoutCount }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));

  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    getAll: false,
    status: '',
    userAccType: '',
  });

  const [deleteModal, setDeleteModal] = useState(false);
  const [permissionToUpdate, setPermissionToUpdate] = useState(null);
  const [createPermissionModal, setCreatePermissionModal] = useState(false);
  const [editPermissionModal, setEditPermissionModal] = useState(false);
  const [deleteSuccesfullModal, setDeleteSuccessfullModal] = useState(false);
  const [payoutInfo, setPayoutInfo] = useState();
  const [viewPayoutInfo, setViewPayoutInfo] = useState(false);

  const { fetch, hasPermission } = useContextHook(AuthContext, ['fetch', 'hasPermission']);

  const { payout_data, payout_loading } = paymentService.GetAllPayouts(searchQuery, fetch);

  const handlePayoutManagement = async (payoutId, amount, status) => {
    try {
      await paymentService.handlePayoutRequest(payoutId, {
        status,
        amountIn: parseFloat(amount),
      });
      refetch();
      Toast({
        type: 'success',
        message: `Payout Request ${status ? status.charAt(0).toUpperCase() + status.slice(1) : ''} Successfully!`,
      });
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
    }
  };

  const handleEditModal = e => {
    setEditPermissionModal(true);
    setPermissionToUpdate(e);
  };

  const handleDelete = e => {
    setDeleteModal(true);
    setPermissionToUpdate(e);
  };

  const actionBtns = _ => (
    <>
      <ActionBtnList>
        {_?.status !== 'rejected' && _?.status !== 'completed' && hasPermission('manage-payouts.approve') && (
          <Select
            placeholder="Status"
            onChange={({ target: { value } }) => {
              handlePayoutManagement(_?._id, _?.amountIn?.$numberDecimal, value?.value);
            }}
            options={
              _?.status === 'approved'
                ? [{ value: 'completed', label: 'Complete' }]
                : _?.status === 'pending'
                ? [
                    { value: 'approved', label: 'Approve' },
                    { value: 'rejected', label: 'Reject' },
                    { value: 'completed', label: 'Complete' },
                  ]
                : []
            }
          />
        )}
      </ActionBtnList>
    </>
  );

  const { totalCount, payout_rows } = useMemo(
    () => ({
      payout_rows: payout_data?.items?.map(_ => [
        format(getDateObject(_.requestDate), 'yyyy-MM-dd'),
        _.userId?.fullName || _?.userId?.username || '------------',
        _.userId?.type || '------------',
        `$${formatNumber(_?.amountIn?.$numberDecimal)}` || 0 || '----------',
        `$${formatNumber(_?.amountEx?.$numberDecimal)}` || 0 || '----------',
        _?.status === 'completed' ? (
          <span className="status-completed">Completed</span>
        ) : _?.status === 'pending' ? (
          <span className="status-pending">Pending</span>
        ) : _?.status === 'approved' ? (
          <span className="status-approved">Approved</span>
        ) : (
          <span className="status-rejected">Rejected</span>
        ),
        actionBtns(_),
      ]),
      totalCount: payout_data.totalItems,
    }),
    [payout_data],
  );

  useEffect(() => {
    setPayoutCount(payout_data?.allPayoutsInDb);
  }, [payout_data?.allPayoutsInDb]);

  const columnNames = [
    `Created at`,
    `Requester`,
    `Requester Type`,
    `Amount (Inclusive)`,
    `Amount (Exclusive)`,
    `Status`,
    'Actions',
  ];
  return (
    <>
      {/* <CenterModal
        open={viewPayoutInfo}
        setOpen={setViewPayoutInfo}
        title={<Image src={InfoIcon} alt="InfoIcon" />}
        width="543">
        <ViewPayoutInfo payoutInfo={payoutInfo} setViewPayoutInfo={setViewPayoutInfo} />
      </CenterModal> */}

      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableStyle" />
        <TableLayout
          overflow
          tableHeading={' '}
          PayoutTable
          placeholder="Search Payouts"
          btnType="blue"
          btnWidth="162px"
          onChangeFilters={filters => {
            setSearchQuery(_ => ({
              ..._,
              ...filters,
            }));
          }}
          currentPage={searchQuery.page}
          totalCount={totalCount}
          pageSize={searchQuery.itemsPerPage}
          filterBlock={true}>
          <Table
            overflow
            width={1024}
            rowsData={payout_rows}
            loading={payout_loading}
            columnNames={columnNames}
            noPadding
          />
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default PayoutTable;
