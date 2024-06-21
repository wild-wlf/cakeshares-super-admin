import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import handIcon from '../../public/assets/handIcon.png';
import QuickStatsSection from '@/components/atoms/QuickStatsSection';
import PopularListing from '@/components/atoms/PopularListing';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import productService from '@/services/productService';

const dashboard = () => {
  const [cardsData, setCardsData] = useState(false);
  const { user } = useContextHook(AuthContext, v => ({
    user: v.user,
  }));

  useEffect(() => {
    productService.getDashboardCards().then(data => {
      setCardsData(data?.cardsData);
    });
  }, []);

  const JonasData = ['Jonas', 'Teacher', 1991];
  const type = [];
  const age = [];

  for (let i = 0; i < JonasData.length; i++) {
    if (typeof JonasData[i] !== 'string') continue;
    console.log(JonasData[i]);
    type.push(typeof JonasData[i]);
    age.push(2024 - JonasData[2]);
  }
  console.log(type);
  console.log(age);

  return (
    <>
      <Head>
        <title>CAKESHARES | DASHBOARD</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title={`Welcome ${user?.fullName}!`}
        suffix={handIcon}
        tagLine={"Let's explore what's new with your product today!"}
      />

      <QuickStatsSection cardsData={cardsData} />
      <PopularListing />
    </>
  );
};

export default dashboard;
