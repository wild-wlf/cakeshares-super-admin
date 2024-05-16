import React, { useMemo, useState } from "react";
import { ActionBtnList } from "@/components/atoms/ActionBtns/ActionBtns.styles";
import Table from "@/components/molecules/Table";
import TableLayout from "@/components/atoms/TableLayout";
import { MdModeEditOutline } from "react-icons/md";
import successIcon from "../../../../public/assets/successIcon.png";
import detailIcon from "../../../../public/assets/table-detail-icon.svg";
import infoIcon from "../../../../public/assets/table-info-icon.svg";
import modalinfoIcon from "../../../../public/assets/infoIcon.png";
import DeleteIcon from "../../../../public/assets/table-delete-icon.svg";
import TableStyle from "../../../../public/assets/table-style.jpg";
import UserImg1 from "../../../../public/assets/user-img-1.svg";
import UserImg2 from "../../../../public/assets/user-img-2.png";
import CalenderIcon from "../../../../public/assets/calander.svg";
import Image from "next/image";
import { TableContainer } from "@/components/atoms/PermissionsTable/PermissionsTable.style";
import Button from "@/components/atoms/Button";
import CenterModal from "@/components/molecules/Modal/CenterModal";
import DeleteModal from "@/components/atoms/UserDeleteModal/DeleteModal";
import SuccessfulModal from "@/components/atoms/UserDeleteModal/SuccessfulModal";
import EditUserModal from "@/components/atoms/EditUserModal";

const ManageUserTable = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
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
            <Button variant="success" custom>
              Approve
            </Button>
          </li>
          <li>
            <Button variant="danger" custom>
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
            <button
              type="button"
              className="btn edit"
              onClick={() => setEditModal(true)}
            >
              <MdModeEditOutline color="rgba(64, 143, 140, 1)" size={16} />
            </button>
          </li>

          <li>
            <button type="button" className="btn delete">
              <Image
                src={DeleteIcon}
                alt="DeleteIcon"
                onClick={() => setDeleteModal(true)}
              />
            </button>
          </li>
        </ActionBtnList>
      );
    }
  };

  const { product_rows, totalItems } = useMemo(() => ({
    product_rows: transactions?.map((user) => [
      <div className="table-img-holder">
        <div className="img-holder">
          <Image src={user.userImage} alt="UserImage" />
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
      <CenterModal
        open={deleteModal}
        setOpen={setDeleteModal}
        title={<Image src={modalinfoIcon} alt="InfoIcon" />}
        width="543"
      >
        <DeleteModal
          closeDeleteModal={() => {
            setDeleteModal(false);
          }}
          openSuccessfulModal={() => {
            setDeleteModal(false), setSuccessModal(true);
          }}
        />
      </CenterModal>
      <CenterModal
        open={successModal}
        setOpen={setSuccessModal}
        title={<Image src={successIcon} alt="InfoIcon" />}
        width="543"
      >
        <SuccessfulModal title={"User Suspended Successfully!"} />
      </CenterModal>
      <CenterModal
        open={editModal}
        setOpen={setEditModal}
        title={"Edit User"}
        width="803"
      >
        <EditUserModal />
      </CenterModal>
      <TableContainer>
        <Image src={TableStyle} alt="tableStyle" className="tableStyle" />
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
