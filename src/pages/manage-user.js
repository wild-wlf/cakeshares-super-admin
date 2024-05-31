import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import ManageUserTable from '@/components/common/ManageUser/ManageUserTable';
import productService from '@/services/productService';

const ManageUser = () => {
  const [cardsData, setCardsData] = useState(false);
  console.log(cardsData);
  useEffect(() => {
    productService.getDashboardCards().then(data => {
      setCardsData(data?.cardsData);
    });
  }, []);
  return (
    <>
      <Head>
        <title>CAKESHARES | MANAGE USERS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title="Manage Users"
        tagLine={`You have total ${cardsData?.userCount || 0} Users in your manage users right now!`}
      />
      <ManageUserTable />
    </>
  );
};
export default ManageUser;
