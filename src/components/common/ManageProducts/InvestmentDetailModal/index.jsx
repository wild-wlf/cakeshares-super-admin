import React, { useMemo, useState } from 'react';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import { TableContainer } from '@/components/atoms/PermissionsTable/PermissionsTable.style';
import userService from '@/services/userService';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import Button from '@/components/atoms/Button';
import { useRouter } from 'next/router';

const InvestmentDetailModal = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    startDate: '',
    endDate: '',
    searchText: '',
  });

  const { user_data, user_loading } = userService.GetAllUsers(searchQuery, fetch);
  const actionBtns = user => (
    <ActionBtnList>
      <li>
        <Button variant="secondary" custom xsCustom onClick={() => router.push('https://cake.webevis.com/products/4')}>
          View Detail
        </Button>
      </li>
    </ActionBtnList>
  );
  const ProductsData = [
    {
      product_name: 'Gov. Egypt Property',
      investment_type: 'Property',
      kyc_level: 'Level 3',
      return: '30%',
      funding_ration: '56%',
      backers: '10',
      annual_cost: '$2,000',
    },
    {
      product_name: 'Gov. Egypt Property',
      investment_type: 'Property',
      kyc_level: 'Level 3',
      return: '30%',
      funding_ration: '56%',
      backers: '10',
      annual_cost: '$2,000',
    },
    {
      product_name: 'Gov. Egypt Property',
      investment_type: 'Property',
      kyc_level: 'Level 3',
      return: '30%',
      funding_ration: '56%',
      backers: '10',
      annual_cost: '$2,000',
    },
    {
      product_name: 'Gov. Egypt Property',
      investment_type: 'Property',
      kyc_level: 'Level 3',
      return: '30%',
      funding_ration: '56%',
      backers: '10',
      annual_cost: '$2,000',
    },
    {
      product_name: 'Gov. Egypt Property',
      investment_type: 'Property',
      kyc_level: 'Level 3',
      return: '30%',
      funding_ration: '56%',
      backers: '10',
      annual_cost: '$2,000',
    },
    {
      product_name: 'Gov. Egypt Property',
      investment_type: 'Property',
      kyc_level: 'Level 3',
      return: '30%',
      funding_ration: '56%',
      backers: '10',
      annual_cost: '$2,000',
    },
  ];

  const { product_rows, totalCount } = useMemo(() => ({
    product_rows: ProductsData?.map(user => [
      user?.product_name || '------------',
      user?.investment_type || '------------',
      user?.kyc_level || '------------',
      user?.return || '------------',
      user?.funding_ration || '------------',
      user?.backers || '------------',
      user?.annual_cost || '------------',
      actionBtns(),
    ]),
    totalCount: ProductsData?.totalItems,
  }));
  const buyerColumns = [
    `Product`,
    `Investment type`,
    `KYC Level`,
    `Return %`,
    `Funding Ratio`,
    `Backers Limited`,
    `Annual Cost (est.)`,
    `Actions`,
  ];
  return (
    // <TableContainer>
    <TableLayout
      noBorder
      noPadding
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
    // </TableContainer>
  );
};

export default InvestmentDetailModal;
