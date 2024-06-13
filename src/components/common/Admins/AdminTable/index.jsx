import React, { useMemo, useState } from 'react';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import { MdModeEditOutline } from 'react-icons/md';
import DeleteIcon from '../../../../../public/assets/delete.svg';
import TableStyle from '../../../../../public/assets/table-style.jpg';
import UserImg from '../../../../../public/assets/user-img.png';
import PasswordImg from '../../../../../public/assets/table-password-icon.png';
import Image from 'next/image';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import UpdatePasswordModal from '../UpdatePasswordModal';
import CreateUserModal from '../CreateAdminModal';
import EditUserModal from '../EditAdminModal';
import DeleteUserModal from '../DeleteAdminModal';
import InfoIcon from '../../../../../public/assets/infoIcon.png';
import successIcon from '../../../../../public/assets/successIcon.png';
import { TableContainer } from '@/components/atoms/TableContainer/TableContainer.styles';
import { ModalText } from '../../RolesTable/RolesTable.style';
import adminService from '@/services/adminService';
import { format } from 'date-fns';
import { getDateObject } from '@/helpers/common';

const AdminTable = () => {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    filterRoles: '',
  });

  const [openPassword, setOpenPassword] = useState(false);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const { admins_data, admins_loading } = adminService.GetAdmins(searchQuery, fetch);

  const actionBtns = _ => (
    <>
      <ActionBtnList>
        <li>
          <button
            type="button"
            className="btn edit"
            onClick={() => {
              setOpenEditUser(true);
            }}>
            <MdModeEditOutline color="rgba(64, 143, 140, 1)" size={16} />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="btn file"
            onClick={() => {
              setOpenPassword(true);
            }}>
            <Image src={PasswordImg} alt="Password Img" />
          </button>
        </li>

        <li>
          <button
            type="button"
            className="btn delete"
            onClick={() => {
              setOpenDeleteUser(true);
            }}>
            <Image src={DeleteIcon} alt="delete" />
          </button>
        </li>
      </ActionBtnList>
    </>
  );

  const { totalCount, admins_rows } = useMemo(
    () => ({
      admins_rows: admins_data.admins.map(_ => [
        format(getDateObject(_.created_at), 'yyyy-MM-dd'),
        _.email ?? '------------',
        _.roles?.length > 0 ? _.roles.map(__ => __.type).join(', ') : '------------',
        actionBtns(_),
      ]),
      totalCount: admins_data.totalItems,
    }),
    [admins_data],
  );
  const columnNamess = [`Created at`, `Username`, `Email`, 'Actions'];
  return (
    <>
      <CenterModal open={openSuccessModal} setOpen={setOpenSuccessModal} headImage={successIcon} width="543">
        <ModalText>User Deleted Successfully!</ModalText>
      </CenterModal>

      <CenterModal open={openDeleteUser} setOpen={setOpenDeleteUser} headImage={InfoIcon} width="543">
        <DeleteUserModal
          closeDeleteModal={() => {
            setOpenDeleteUser(false);
          }}
          openSuccessfulModal={() => {
            setOpenDeleteUser(false);
            setOpenSuccessModal(true);
          }}
        />
      </CenterModal>

      <CenterModal open={openEditUser} setOpen={setOpenEditUser} title={'Edit User'} width="666">
        <EditUserModal />
      </CenterModal>

      <CenterModal open={openCreateUser} setOpen={setOpenCreateUser} title={'Create User'} width="666">
        <CreateUserModal />
      </CenterModal>

      <CenterModal open={openPassword} setOpen={setOpenPassword} title={'Update Password'} width="666">
        <UpdatePasswordModal />
      </CenterModal>

      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableStyle" />
        <TableLayout
          tableHeading=" "
          btnType="blue"
          btnText="+ Create Admin"
          btnWidth="162px"
          placeholder="Search Admin"
          openModal={() => {
            setOpenCreateUser(true);
          }}
          onChangeFilters={filters => {
            setSearchQuery(_ => ({
              ..._,
              ...filters,
            }));
          }}
          currentPage={searchQuery.page}
          totalCount={totalCount}
          pageSize={searchQuery.itemsPerPage}>
          <Table width={1024} loading={admins_loading} rowsData={admins_rows} columnNames={columnNamess} noPadding />
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default AdminTable;
