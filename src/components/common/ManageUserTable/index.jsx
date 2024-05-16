import React, { useMemo, useState } from "react";
import { ActionBtnList } from "@/components/atoms/ActionBtns/ActionBtns.styles";
import Table from "@/components/molecules/Table";
import TableLayout from "@/components/atoms/TableLayout";
import { MdModeEditOutline } from "react-icons/md";
import detailIcon from "../../../_assets/table-detail-icon.svg";
import infoIcon from "../../../_assets/table-info-icon.svg";
import DeleteIcon from "../../../_assets/table-delete-icon.svg";
import TableStyle from "../../../_assets/table-style.jpg";
import UserImg1 from "../../../_assets/user-img-1.svg";
import UserImg2 from "../../../_assets/user-img-2.png";
import CalenderIcon from "../../../_assets/calander.svg";
import Image from "next/image";
import { TableContainer } from "@/components/atoms/PermissionsTable/PermissionsTable.style";
import Button from "@/components/atoms/Button";

const ManageUserTable = () => {
  const transactions = [
    {
      userImage: UserImg1,
      username: "Alex Mertiz",
      account_type: "Buyer",
      total_assets: 50,
      total_assets_amount: "$40,256.000",
      wallet_balance: "$40,256.000",
      kyc_level: "Level 1",
      status: "Approved",
    },
    {
      userImage: UserImg2,
      username: "Alex Mertiz",
      account_type: "Buyer",
      total_assets: 50,
      total_assets_amount: "$40,256.000",
      wallet_balance: "$40,256.000",
      kyc_level: "Level 1",
      status: "Approved",
    },
    {
      userImage: UserImg1,
      username: "Alex Mertiz",
      account_type: "Buyer",
      total_assets: 50,
      total_assets_amount: "$40,256.000",
      wallet_balance: "$40,256.000",
      kyc_level: "Level 1",
      status: "pending",
    },
    {
      userImage: UserImg2,
      username: "Alex Mertiz",
      account_type: "Buyer",
      total_assets: 50,
      total_assets_amount: "$40,256.000",
      wallet_balance: "$40,256.000",
      kyc_level: "Level 1",
      status: "Approved",
    },
    {
      userImage: UserImg1,
      username: "Alex Mertiz",
      account_type: "Buyer",
      total_assets: 50,
      total_assets_amount: "$40,256.000",
      wallet_balance: "$40,256.000",
      kyc_level: "Level 1",
      status: "Approved",
    },
    {
      userImage: UserImg2,
      username: "Alex Mertiz",
      account_type: "Buyer",
      total_assets: 50,
      total_assets_amount: "$40,256.000",
      wallet_balance: "$40,256.000",
      kyc_level: "Level 1",
      status: "pending",
    },
    {
      userImage: UserImg1,
      username: "Alex Mertiz",
      account_type: "Buyer",
      total_assets: 50,
      total_assets_amount: "$40,256.000",
      wallet_balance: "$40,256.000",
      kyc_level: "Level 1",
      status: "Approved",
    },
    {
      userImage: UserImg2,
      username: "Alex Mertiz",
      account_type: "Buyer",
      total_assets: 50,
      total_assets_amount: "$40,256.000",
      wallet_balance: "$40,256.000",
      kyc_level: "Level 1",
      status: "Approved",
    },
    {
      userImage: UserImg1,
      username: "Alex Mertiz",
      account_type: "Buyer",
      total_assets: 50,
      total_assets_amount: "$40,256.000",
      wallet_balance: "$40,256.000",
      kyc_level: "Level 1",
      status: "Approved",
    },
    {
      userImage: UserImg2,
      username: "Alex Mertiz",
      account_type: "Buyer",
      total_assets: 50,
      total_assets_amount: "$40,256.000",
      wallet_balance: "$40,256.000",
      kyc_level: "Level 1",
      status: "Approved",
    },
  ];

  const actionBtns = (user) => {
    if (user.status === "pending") {
      return (
        <ActionBtnList>
          <li>
            <Button variant="success" custom xsCustom>
              Approve
            </Button>
          </li>
          <li>
            <Button variant="danger" custom xsCustom>
              Decline
            </Button>
          </li>
        </ActionBtnList>
      );
    } else {
      return (
        <ActionBtnList>
          <li>
            <button type="button" className="btn file">
              <Image src={detailIcon} alt="detailIcon" height={18} width={18} />
            </button>
          </li>
          <li>
            <button type="button" className="btn file">
              <Image src={infoIcon} alt="infoIcon" height={18} width={18} />
            </button>
          </li>
          <li>
            <button type="button" className="btn edit">
              <MdModeEditOutline color="rgba(64, 143, 140, 1)" size={16} />
            </button>
          </li>

          <li>
            <button type="button" className="btn delete">
              <Image src={DeleteIcon} alt="DeleteIcon" />
            </button>
          </li>
        </ActionBtnList>
      );
    }
  };

  const { product_rows, totalItems } = useMemo(() => ({
    product_rows: transactions?.map((user, ind) => [
      <div className="table-img-holder" key={ind}>
        <div className="img-holder">
          <Image src={user.userImage} alt="userImage" />
        </div>
        {user.username || "------------"}
      </div>,
      user.account_type || "------------",
      user.total_assets || "------------",
      user.total_assets_amount || "------------",
      user.wallet_balance || "------------",
      user.kyc_level || "------------",
      user.status || "------------",
      actionBtns(user),
    ]),
  }));
  const columnNamess = [
    `User`,
    `Account Type`,
    `Total Assets`,
    "Total Assets Amount",
    "Wallet Balance",
    "KYC Level",
    "Status",
    "Actions",
  ];
  return (
    <>
      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableCurve" />
        <TableLayout
          tableHeading=" "
          btnWidth="40px"
          btnType="download"
          iconImg={CalenderIcon}
          placeholder="Search User"
        >
          <Table
            width={1024}
            rowsData={product_rows}
            columnNames={columnNamess}
            noPadding
          />
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default ManageUserTable;
