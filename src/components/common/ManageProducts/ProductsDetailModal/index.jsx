import React, { useMemo, useState } from 'react';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import { TableContainer } from '@/components/atoms/PermissionsTable/PermissionsTable.style';
import userService from '@/services/userService';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import DeleteIcon from '../../../../../public/assets/table-delete-icon.svg';
import { useRouter } from 'next/router';
import { MdModeEditOutline } from 'react-icons/md';
import Image from 'next/image';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import DeleteModal from '@/components/atoms/UserDeleteModal/DeleteModal';
import modalInfoIcon from '../../../../../public/assets/infoIcon.png';
import Button from '@/components/atoms/Button';
import ModalContainer from '@/components/molecules/ModalContainer';
import declineIcon from '../../../../../public/assets/decline-icon.svg';
import DeclineModal from '../../DeclineModal';

const ProductsDetailModal = ({ onClose, setSuccessModal, setEditProduct, accountType }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    startDate: '',
    endDate: '',
    searchText: '',
  });

  function handleDelete() {
    setDeleteModal(false);
    setSuccessModal(true);
    onClose();
  }

  const { user_data, user_loading } = userService.GetAllUsers(searchQuery, fetch);
  const actionBtns = () => (
    <ActionBtnList>
      {accountType === 'Individual Seller' ? (
        <li>
          <ModalContainer
            width={500}
            title={<Image src={declineIcon} alt="declineIcon" />}
            btnComponent={({ onClick }) => (
              <Button type="button" variant="danger" custom xsCustom onClick={onClick}>
                <Image src={DeleteIcon} alt="DeleteIcon" />
                Delete Product
              </Button>
            )}
            content={({ onClose }) => (
              <DeclineModal onClose={handleDelete} title="Delete Product!" btnText="Yes, Delete" />
            )}
          />
        </li>
      ) : (
        <>
          <li>
            <button type="button" className="btn edit" onClick={() => setEditProduct(true)}>
              <MdModeEditOutline color="rgba(64, 143, 140, 1)" size={16} />
            </button>
          </li>
          <li>
            <button type="button" className="btn delete" onClick={() => setDeleteModal(true)}>
              <Image src={DeleteIcon} alt="DeleteIcon" />
            </button>
          </li>
        </>
      )}
    </ActionBtnList>
  );
  const ProductsData = [
    {
      product_name: 'Gov. Egypt Property',
      category_type: 'Property',
      total_backers: 50,
      total_return: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      category_type: 'Property',
      total_backers: 50,
      total_return: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      category_type: 'Property',
      total_backers: 50,
      total_return: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      category_type: 'Property',
      total_backers: 50,
      total_return: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      category_type: 'Property',
      total_backers: 50,
      total_return: '$40,256.000',
    },
    {
      product_name: 'Gov. Egypt Property',
      category_type: 'Property',
      total_backers: 50,
      total_return: '$40,256.000',
    },
  ];

  const { product_rows, totalCount } = useMemo(() => ({
    product_rows: ProductsData?.map(user => [
      user?.product_name || '------------',
      user?.category_type || '------------',
      user?.total_backers || '------------',
      user?.total_return || '------------',
      actionBtns(),
    ]),
    totalCount: ProductsData?.totalItems,
  }));
  const buyerColumns = [`Product`, `Category type`, `Total Backers`, `Total Return`, `Actions`];

  return (
    <>
      <CenterModal
        open={deleteModal}
        setOpen={setDeleteModal}
        title={<Image src={modalInfoIcon} alt="InfoIcon" />}
        width="543">
        <DeleteModal
          title="Delete Product!"
          text="Are you sure you want to delete this Product?"
          closeDeleteModal={() => setDeleteModal(false)}
          openSuccessfulModal={() => handleDelete()}
        />
      </CenterModal>

      {/* <TableContainer> */}
      <TableLayout
        noPadding
        ProductsDetailSelect
        noBorder
        onChangeFilters={filters => {
          setSearchQuery(_ => ({
            ..._,
            ...filters,
          }));
        }}
        currentPage={searchQuery.page}
        totalCount={totalCount}
        pageSize={searchQuery.itemsPerPage}>
        <Table width={800} rowsData={product_rows} loading={user_loading} columnNames={buyerColumns} noPadding />
      </TableLayout>
      {/* </TableContainer> */}
    </>
  );
};

export default ProductsDetailModal;
