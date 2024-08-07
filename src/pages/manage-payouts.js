import React, { useState } from 'react';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import PayoutTable from '@/components/common/PayoutTable';
import Head from 'next/head';

const ManagePayouts = () => {
  const [payoutCount, setPayoutCount] = useState();
  return (
    <div>
      <Head>
        <title>CAKESHARES | PAYOUT MANAGEMENT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title="Payout Management"
        tagLine={`You have total ${payoutCount || 0} payout in your payout management right now!`}
      />
      <PayoutTable setPayoutCount={setPayoutCount} />
    </div>
  );
};

export default ManagePayouts;
