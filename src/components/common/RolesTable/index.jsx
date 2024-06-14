import React, { useMemo, useState } from 'react';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import { MdModeEditOutline } from 'react-icons/md';
import DeleteIcon from '../../../../public/assets/delete.svg';
import TableStyle from '../../../../public/assets/table-style.jpg';
import InfoIcon from '../../../../public/assets/infoIcon.png';
import Image from 'next/image';
import { ModalText } from './RolesTable.style';
import DeletePermissionModal from './DeletePermissionModal';
import EditRolesModal from './EditRolesModal';
import CreateRolesModal from './CreateRolesModal';
import successIcon from '../../../../public/assets/successIcon.png';
import Switch from '@/components/molecules/Switch';
import DataTabs from '@/components/molecules/DataTabs';
import PermissionHead from '@/components/atoms/PremissionsHead';
import { TableContainer } from '@/components/atoms/TableContainer/TableContainer.styles';
import adminService from '@/services/adminService';
import { getDateObject } from '@/helpers/common';
import { format } from 'date-fns';

const RolesTable = () => {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    filterText: '',
  });

  const data = [
    {
      label: 'Dashboard',
      content: (
        <>
          <PermissionHead lable={'dashboard.nav'} />
        </>
      ),
    },
    {
      label: 'portfolio',
      content: 'portfolio',
    },
    {
      label: 'Private Chat',
      content: 'Private Chat',
    },
    {
      label: 'Stakeholder Chat',
      content: (
        <>
          <Switch onChange={e => console.log(e)} label="Select All" />
        </>
      ),
    },
    {
      label: 'Permissions',
      content: 'Permissions',
    },
    {
      label: 'Roles',
      content: 'Roles',
    },
  ];
  const [deleteModal, setDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateRole, setOpenCreateRole] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openPermissionModal, setOpenPermissionModal] = useState(false);

  const { roles_data, roles_loading } = adminService.GetRoles(searchQuery, fetch);

  const openPermission = () => {
    setOpenCreateRole(false);
    setOpenPermissionModal(true);
  };

  const openRoleModal = () => {
    setOpenCreateRole(true);
  };

  const actionBtns = _ => (
    <>
      <ActionBtnList>
        <li>
          <button
            type="button"
            className="btn edit"
            onClick={() => {
              setOpenEditModal(true);
            }}>
            <MdModeEditOutline color="rgba(64, 143, 140, 1)" size={16} />
          </button>
        </li>
        <li>
          <button type="button" className="btn delete" onClick={() => setDeleteModal(true)}>
            <Image src={DeleteIcon} alt="delete" />
          </button>
        </li>
      </ActionBtnList>
    </>
  );

  const { totalCount, roles_rows } = useMemo(
    () => ({
      roles_rows: roles_data.roles.map(_ => [
        format(getDateObject(_.created_at), 'yyyy-MM-dd'),
        _.type,
        _.description,
        actionBtns(_),
      ]),
      totalCount: roles_data.totalItems,
    }),
    [roles_data],
  );
  const columnNamess = [`Created at`, `Type`, `Description`, 'Actions'];
  return (
    <>
      <CenterModal open={deleteModal} setOpen={setDeleteModal} headImage={InfoIcon} width="543">
        <DeletePermissionModal
          closeDeleteModal={() => {
            setDeleteModal(false);
          }}
          openSuccessfulModal={() => {
            setDeleteModal(false);
            setOpenSuccessModal(true);
          }}
        />
      </CenterModal>
      <CenterModal open={openSuccessModal} setOpen={setOpenSuccessModal} headImage={successIcon} width="543">
        <ModalText>Role Deleted Successfully!</ModalText>
      </CenterModal>
      <CenterModal open={openEditModal} setOpen={setOpenEditModal} title={'Edit Role'} width="666">
        <EditRolesModal
          openPermission={() => {
            setOpenEditModal(false);
            setOpenPermissionModal(true);
          }}
        />
      </CenterModal>
      <CenterModal open={openCreateRole} setOpen={setOpenCreateRole} title={'Create Role'} width="666">
        <CreateRolesModal openPermission={openPermission} />
      </CenterModal>
      <CenterModal
        open={openPermissionModal}
        setOpen={setOpenPermissionModal}
        width="955"
        title="Customize Permissions">
        <DataTabs data={data} />
      </CenterModal>

      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableStyle" />
        <TableLayout
          tableHeading={' '}
          placeholder="Search Roles"
          btnType="blue"
          btnText="+ Create Role"
          btnWidth="162px"
          openModal={openRoleModal}
          onChangeFilters={filters => {
            setSearchQuery(_ => ({
              ..._,
              ...filters,
            }));
          }}
          currentPage={searchQuery.page}
          totalCount={totalCount}
          pageSize={searchQuery.itemsPerPage}>
          <Table width={1024} rowsData={roles_rows} loading={roles_loading} columnNames={columnNamess} noPadding />
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default RolesTable;