import React, { useState } from 'react';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import MangeProductsTable from '@/components/common/ManageProducts/MangeProductsTable';
import Head from 'next/head';

const index = () => {
  const [productCount, setProductCount] = useState();
  return (
    <div>
      <Head>
        <title>CAKESHARES | MANAGE PRODUCTS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title="Manage Products"
        tagLine={`You have total ${productCount || 0} total products in your manage products right now!`}
      />
      <MangeProductsTable setProductCount={setProductCount} />
    </div>
  );
};

export default index;
