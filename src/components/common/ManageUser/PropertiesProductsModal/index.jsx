import React, { useMemo, useState } from 'react';
import { StyledPropertiesProductsModal } from './PropertiesProductsModal.styles';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import Image from 'next/image';
import { TableContainer } from '@/components/atoms/PermissionsTable/PermissionsTable.style';
import userService from '@/services/userService';
import TableStyle from '../../../../../public/assets/table-style.jpg';

const PropertiesProductsModal = () => {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    startDate: '',
    endDate: '',
    searchText: '',
  });

  const { user_data, user_loading } = userService.GetAllUsers(searchQuery, fetch);

  const productsData = [
    {
      product_name: 'Gov. Egypt Property',
      total_shares: '10',
      amount: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      total_shares: '10',
      amount: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      total_shares: '10',
      amount: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      total_shares: '10',
      amount: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      total_shares: '10',
      amount: '$40,256.000',
    },
  ];

  const { product_rows, totalCount } = useMemo(() => ({
    product_rows: productsData?.map(user => [
      user?.product_name || '------------',
      user?.total_shares || '------------',
      user?.amount || '------------',
    ]),
    totalCount: productsData?.totalItems,
  }));
  const buyerColumns = [`Product`, `Total Shares`, `Amount`];
  return (
    <StyledPropertiesProductsModal>
      <TableContainer>
        <TableLayout
          noBorder
          placeholder="Search Assets"
          onChangeFilters={filters => {
            setSearchQuery(_ => ({
              ..._,
              ...filters,
            }));
          }}
          currentPage={searchQuery.page}
          totalCount={totalCount}
          pageSize={searchQuery.itemsPerPage}>
          <Table width={800} rowsData={product_rows} loading={user_loading} columnNames={buyerColumns} noPadding />
        </TableLayout>
      </TableContainer>
    </StyledPropertiesProductsModal>
  );
};

export default PropertiesProductsModal;
