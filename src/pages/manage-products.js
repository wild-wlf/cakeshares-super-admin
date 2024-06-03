import React, { useEffect, useState } from 'react';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import MangeProductsTable from '@/components/common/ManageProducts/MangeProductsTable';
import Head from 'next/head';
import productService from '@/services/productService';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';

const index = () => {
  const { fetch, user } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
    user: v.user,
  }));
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    startDate: '',
    endDate: '',
    searchText: '',
    section: 'products',
    status: '',
    accType: '',
  });

  const result = productService.GetAllProducts(searchQuery, fetch);
  console.log(result);

  return (
    <div>
      <Head>
        <title>CAKESHARES | MANAGE PRODUCTS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title="Manage Products"
        tagLine={`You have total ${
          result?.products_data?.items?.length || 0
        } total products in your manage products right now!`}
      />
      <MangeProductsTable />
    </div>
  );
};

export default index;
