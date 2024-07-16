import React, { useState, useEffect, useMemo } from 'react';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import { MdModeEditOutline } from 'react-icons/md';
import TableStyle from '../../../../public/assets/table-style.jpg';
import Image from 'next/image';
import CategoryModal from './CategoryModal';
import { TableContainer } from '@/components/atoms/TableContainer/TableContainer.styles';
import categoryService from '@/services/categoryService';
import { format } from 'date-fns';
import { getDateObject } from '@/helpers/common';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';

const PermissionTable = ({ setCategoryCount }) => {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    getAll: false,
  });

  const [categoryToUpdate, setCategoryToUpdate] = useState(null);
  const [CreateCategoryModal, setCreateCategoryModal] = useState(false);
  const [editPermissionModal, setEditPermissionModal] = useState(false);

  const { fetch } = useContextHook(AuthContext, ['fetch']);

  const { categories_data, categories_loading } = categoryService.GetAllCategories(searchQuery, fetch);
  console.log(categories_data);

  const handleEditModal = e => {
    setEditPermissionModal(true);
    setCategoryToUpdate(e);
  };

  const actionBtns = _ => (
    <>
      <ActionBtnList>
        <li>
          <button type="button" className="btn edit" onClick={() => handleEditModal(_)}>
            <MdModeEditOutline color="rgba(64, 143, 140, 1)" size={16} />
          </button>
        </li>
      </ActionBtnList>
    </>
  );

  const { totalCount, category_rows } = useMemo(
    () => ({
      category_rows: categories_data?.items?.map(_ => [
        format(getDateObject(_.created_at), 'yyyy-MM-dd'),
        <div className="table-img-holder" key={_?._id}>
          <div className="img-holder">
            <Image src={_?.icon} width={20} height={20} alt="userImage" />
          </div>
          {_?.name || '------------'}
        </div>,
        actionBtns(_),
      ]),
      totalCount: categories_data.totalItems,
    }),
    [categories_data],
  );
  const columnNames = [`Created at`, `Category`, 'Actions'];

  useEffect(() => {
    setCategoryCount(categories_data?.allCategories);
  }, [categories_data?.allCategories]);

  return (
    <>
      <CenterModal open={CreateCategoryModal} setOpen={setCreateCategoryModal} title={'Create Category'} width="669">
        <CategoryModal
          onClose={() => {
            setCreateCategoryModal(false);
          }}
        />
      </CenterModal>
      <CenterModal open={editPermissionModal} setOpen={setEditPermissionModal} title={'Edit Category'} width="669">
        <CategoryModal
          onClose={() => {
            setEditPermissionModal(false);
          }}
          category={categoryToUpdate}
        />
      </CenterModal>

      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableStyle" />
        <TableLayout
          tableHeading={' '}
          placeholder="Search Category"
          btnType="blue"
          btnText="+ Create Category"
          btnWidth="162px"
          openModal={() => {
            setCreateCategoryModal(true);
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
            rowsData={category_rows}
            loading={categories_loading}
            columnNames={columnNames}
            noPadding
          />
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default PermissionTable;
