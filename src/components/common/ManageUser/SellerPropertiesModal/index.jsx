import React, { useMemo, useState } from 'react';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import Image from 'next/image';
import { TableContainer } from '@/components/atoms/PermissionsTable/PermissionsTable.style';
import userService from '@/services/userService';
import TableStyle from '../../../../../public/assets/table-style.jpg';

const SellerPropertiesModal = () => {
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
      status: 'active',
      backers_limit: 10,
      total_assets: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      status: 'active',
      backers_limit: 10,
      total_assets: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      status: 'active',
      backers_limit: 10,
      total_assets: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      status: 'active',
      backers_limit: 10,
      total_assets: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      status: 'active',
      backers_limit: 10,
      total_assets: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      status: 'active',
      backers_limit: 10,
      total_assets: '$40,256.000',
    },
  ];

  const { product_rows, totalCount } = useMemo(() => ({
    product_rows: productsData?.map(user => [
      user?.product_name || '------------',
      user?.status || '------------',
      user?.backers_limit || '------------',
      user?.total_assets || '------------',
    ]),
    totalCount: productsData?.totalItems,
  }));
  const buyerColumns = [`Product`, `Status`, `Backers Limit`, `Total Assets Value`];
  return (
    <TableContainer>
      <TableLayout
        noBorder
        npPadding
        placeholder="Search Products"
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
  );
};

export default SellerPropertiesModal;
