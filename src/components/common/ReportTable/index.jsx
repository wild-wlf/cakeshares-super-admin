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
          {/* <button type="button" className="btn edit" onClick={() => handleEditModal(_)}>
            <MdModeEditOutline color="rgba(64, 143, 140, 1)" size={16} />
          </button> */}
        </li>
      </ActionBtnList>
    </>
  );

  const { totalCount, report_rows } = useMemo(
    () => ({
      report_rows: reports_data?.items?.map(_ => [
        format(getDateObject(_.created_at), 'yyyy-MM-dd'),
        _?.reportedBy?.username ?? '-----------', 
        _?.messageId?.author?.username ?? '-----------', 
        _?.messageId?.content ?? '------------', 
        //  actionBtns(_),
      ]),
      totalCount: reports_data.totalItems,
    }),
    [reports_data],
  );
  const columnNames = [`Reported At`,`Reported By`,`Reported Against`,'Message'];

  useEffect(() => {
    setReportCount(reports_data?.totalItems);
  }, [reports_data?.totalItems]);

  return (
    <>
      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableStyle" />
        <TableLayout
          tableHeading={' '}
        //   placeholder="Search Category"
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
          <Table
            width={1024}
            rowsData={report_rows}
            loading={reports_loading}
            columnNames={columnNames}
            noPadding
          />
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default ReportsTable;
