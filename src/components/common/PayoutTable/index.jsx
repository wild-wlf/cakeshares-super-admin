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

const PayoutTable = ({ setPayoutCount }) => {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    getAll: false,
    status: '',
  });

  const [deleteModal, setDeleteModal] = useState(false);
  const [permissionToUpdate, setPermissionToUpdate] = useState(null);
  const [createPermissionModal, setCreatePermissionModal] = useState(false);
  const [editPermissionModal, setEditPermissionModal] = useState(false);
  const [deleteSuccesfullModal, setDeleteSuccessfullModal] = useState(false);
  const [payoutInfo, setPayoutInfo] = useState();
  const [viewPayoutInfo, setViewPayoutInfo] = useState(false);

  const { fetch } = useContextHook(AuthContext, ['fetch']);

  const { payout_data, payout_loading } = paymentService.GetAllPayouts(searchQuery, fetch);

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
        {_?.status === 'pending' && (
          <li>
            <button
              type="button"
              className="btn edit"
              onClick={() => {
                setViewPayoutInfo(true);
                setPayoutInfo(_);
              }}>
              <Image src={dollaricon} alt="detailIcon" height={18} width={18} />
            </button>
          </li>
        )}
      </ActionBtnList>
    </>
  );

  const { totalCount, payout_rows } = useMemo(
    () => ({
      payout_rows: payout_data?.items?.map(_ => [
        format(getDateObject(_.requestDate), 'yyyy-MM-dd'),
        _.userId?.fullName || '------------',
        _.userId?.type || '------------',
        `$${formatNumber(_?.amountIn?.$numberDecimal)}` || 0 || '----------',
        `$${formatNumber(_?.amountEx?.$numberDecimal)}` || 0 || '----------',
        _?.status === 'pending' ? (
          <span className="status-pending">Pending</span>
        ) : _?.status === 'approved' ? (
          <span className="status-approved">Approved</span> ?? '------------'
        ) : (
          <span className="status-rejected">Rejected</span> ?? '------------'
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
      <CenterModal
        open={viewPayoutInfo}
        setOpen={setViewPayoutInfo}
        title={<Image src={InfoIcon} alt="InfoIcon" />}
        width="543">
        <ViewPayoutInfo payoutInfo={payoutInfo} setViewPayoutInfo={setViewPayoutInfo} />
      </CenterModal>

      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableStyle" />
        <TableLayout
          tableHeading={' '}
          ProductsDetailSelect
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
          <Table width={1024} rowsData={payout_rows} loading={payout_loading} columnNames={columnNames} noPadding />
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default PayoutTable;
