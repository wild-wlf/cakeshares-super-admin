import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import React from 'react';
import handIcon from '../../public/assets/handIcon.png';
import QuickStatsSection from '@/components/atoms/QuickStatsSection';
import PopularListing from '@/components/atoms/PopularListing';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';

const dashboard = () => {
  const { user } = useContextHook(AuthContext, v => ({
    user: v.user,
  }));
  return (
    <>
      <AdminTopBar
        title={`Welcome ${user?.fullName}!`}
        suffix={handIcon}
        tagLine={"Let's explore what's new with your product today!"}
      />

      <QuickStatsSection />
      <PopularListing />
    </>
  );
};

export default dashboard;
