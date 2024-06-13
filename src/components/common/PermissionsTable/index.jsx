import React, { useMemo, useState } from 'react';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import SuccessIcon from '../../../../public/assets/successIcon.png';
import { MdModeEditOutline } from 'react-icons/md';
import DeleteIcon from '../../../../public/assets/delete.svg';
import TableStyle from '../../../../public/assets/table-style.jpg';
import InfoIcon from '../../../../public/assets/infoIcon.png';
import Image from 'next/image';
import DeletePermissionModal from './DeletePermissionModal';
import CreatePermissionModal from './CreatePermissionModal';
import EditPermissionModal from './EditPermissionModal';
import SuccessfulModal from '@/components/atoms/UserDeleteModal/SuccessfulModal';
import { TableContainer } from '@/components/atoms/TableContainer/TableContainer.styles';
import adminService from '@/services/adminService';
import { format } from 'date-fns';
import { getDateObject } from '@/helpers/common';

const PermissionTable = () => {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    filterText: '',
    filterPermission: '',
  });

  const [deleteModal, setDeleteModal] = useState(false);
  const [permissionToUpdate, setPermissionToUpdate] = useState(null);
  const [createPermissionModal, setCreatePermissionModal] = useState(false);
  const [editPermissionModal, setEditPermissionModal] = useState(false);
  const [deleteSuccesfulModal, setDeleteSuccessfulModal] = useState(false);

  const { permissions_data, permissions_loading } = adminService.GetPermissions(searchQuery);

  const handleEditModal = e => {
    setEditPermissionModal(true);
    setPermissionToUpdate(e);
  };
  const actionBtns = _ => (
    <>
      <ActionBtnList>
        <li>
          <button type="button" className="btn edit" onClick={() => handleEditModal(_)}>
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

  const { totalCount, permissions_rows } = useMemo(
    () => ({
      permissions_rows: permissions_data.permissions.map(_ => [
        format(getDateObject(_.created_at), 'yyyy-MM-dd'),
        _.can,
        _.description,
        actionBtns(_),
      ]),
      totalCount: permissions_data.totalItems,
    }),
    [permissions_data],
  );
  const columnNames = [`Created at`, `Can Do`, `Description`, 'Actions'];
  return (
    <>
      <CenterModal
        open={deleteModal}
        setOpen={setDeleteModal}
        title={<Image src={InfoIcon} alt="InfoIcon" />}
        width="543">
        <DeletePermissionModal
          closeDeleteModal={() => {
            setDeleteModal(false);
          }}
          openSuccessfulModal={() => {
            setDeleteModal(false), setDeleteSuccessfulModal(true);
          }}
        />
      </CenterModal>
      <CenterModal
        open={deleteSuccesfulModal}
        setOpen={setDeleteSuccessfulModal}
        title={<Image src={SuccessIcon} alt="SuccessIcon" />}
        width="543">
        <SuccessfulModal title={'Permission Deleted Successfully!'} />
      </CenterModal>

      <CenterModal
        open={createPermissionModal}
        setOpen={setCreatePermissionModal}
        title={'Create Permission'}
        width="669">
        <CreatePermissionModal
          closeModal={() => {
            setCreatePermissionModal(false);
          }}
        />
      </CenterModal>

      <CenterModal open={editPermissionModal} setOpen={setEditPermissionModal} title={'Edit Permission'} width="669">
        <EditPermissionModal
          closeModal={() => {
            setEditPermissionModal(false);
          }}
          value={permissionToUpdate}
        />
      </CenterModal>

      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableStyle" />
        <TableLayout
          tableHeading={' '}
          placeholder="Search Permission"
          btnType="blue"
          btnText="+ Create Permission"
          btnWidth="162px"
          openModal={() => {
            setCreatePermissionModal(true);
          }}
          onChangeFilters={filters => {
            setSearchQuery(_ => ({
              ..._,
              ...filters,
            }));
          }}
          currentPage={searchQuery.page}
          totalCount={totalCount}
          pageSize={searchQuery.itemsPerPage}
          filterBlock={true}>
          <Table
            width={1024}
            rowsData={permissions_rows}
            loading={permissions_loading}
            columnNames={columnNames}
            noPadding
          />
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default PermissionTable;
