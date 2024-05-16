import AdminTopBar from "@/components/common/AdminTopBar/AdminTopBar";
import ManageUserTable from "@/components/common/ManageUserTable";
import React from "react";

const index = () => {
  return (
    <>
      <AdminTopBar
        title={"Manage Users"}
        tagLine={"You have total 101 Users in your manage users right now!"}
      />
      <ManageUserTable />
    </>
  );
};

export default index;
