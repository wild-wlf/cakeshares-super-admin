import React, { useState } from 'react';
import AdminTopBar from '@/components/common/AdminTopBar/AdminTopBar';
import Head from 'next/head';
import ReportsTable from '@/components/common/ReportTable';

const Reports = () => {
  const [reportCount, setReportCount] = useState();
  return (
    <div>
      <Head>
        <title>CAKESHARES | MANAGE REPORTS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTopBar
        title="Manage Reports"
        tagLine={`You have total ${reportCount || 0} reports in your report management right now!`}
      />
      <ReportsTable setReportCount={setReportCount} />
    </div>
  );
};

export default Reports;
