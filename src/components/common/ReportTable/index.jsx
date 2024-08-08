import React, { useState, useEffect, useMemo } from 'react';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import { MdModeEditOutline } from 'react-icons/md';
import TableStyle from '../../../../public/assets/table-style.jpg';
import Image from 'next/image';
import { TableContainer } from '@/components/atoms/TableContainer/TableContainer.styles';
import { format } from 'date-fns';
import { getDateObject } from '@/helpers/common';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import notificationService from '@/services/notificationservice';
import ModalContainer from '@/components/molecules/ModalContainer';
import Button from '@/components/atoms/Button';
import detailIcon from '../../../../public/assets/view-detail-icon.svg';
import ReportDetailModal from '../ReportDetailModal';

const ReportsTable = ({ setReportCount }) => {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    getAll: false,
  });

  const { fetch } = useContextHook(AuthContext, ['fetch']);

  const { reports_data, reports_loading } = notificationService.GetAllReports(searchQuery, fetch);

  const actionBtns = _ => (
    <>
      <ActionBtnList>
        <li>
          <ModalContainer
            width={1000}
            title="Report Detail"
            btnComponent={({ onClick }) => (
              <Button variant="secondary" custom xsCustom onClick={onClick}>
                <Image src={detailIcon} alt="detailIcon" />
                View Detail
              </Button>
            )}
            content={({ onClose }) => <ReportDetailModal detail={_} />}
          />
        </li>
      </ActionBtnList>
    </>
  );

  const { totalCount, report_rows } = useMemo(
    () => ({
      report_rows: reports_data?.items?.map(_ => [
        format(getDateObject(_.created_at), 'yyyy-MM-dd'),
        _?.reportedBy?.username ?? _?.reportedBy?.fullName,
        _?.messageId?.author?.username ?? _?.messageId?.author?.fullName,
        _?.messageId?.content ?? '-----------',
        actionBtns(_),
      ]),
      totalCount: reports_data.totalItems,
    }),
    [reports_data],
  );
  const columnNames = [`Reported At`, `Reported By`, `Reported Against`, 'Message',`Action`];

  useEffect(() => {
    setReportCount(reports_data?.totalItems);
  }, [reports_data?.totalItems]);

  return (
    <>
      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableStyle" />
        <TableLayout
          tableHeading={' '}
          // placeholder="Search Report"
          btnType="blue"
          btnWidth="162px"
          openModal={() => {
            setCreateCategoryModal(true);
          }}
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
          <Table width={1024} rowsData={report_rows} loading={reports_loading} columnNames={columnNames} noPadding />
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default ReportsTable;
