import React, { useState } from 'react';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import CategoryTable from '@/components/common/CategoryTable';
import Head from 'next/head';

const Categories = () => {
  const [categoryCount, setCategoryCount] = useState();
  return (
    <div>
      <Head>
        <title>CAKESHARES | MANAGE CATEGORIES</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title="Manage Categories"
        tagLine={`You have total ${categoryCount || 0} total categories in your manage categories right now!`}
      />
      <CategoryTable setCategoryCount={setCategoryCount} />
    </div>
  );
};

export default Categories;
