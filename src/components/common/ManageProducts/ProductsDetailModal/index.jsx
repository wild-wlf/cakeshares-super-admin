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
import productService from '@/services/productService';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';

const ProductsDetailModal = ({ userId, setProduct, onClose, setSuccessModal, setEditProduct, accountType }) => {
  const { fetch, refetch } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
    refetch: v.refetch,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
  });

  function handleDelete() {
    setDeleteModal(false);
    setSuccessModal(true);
    onClose();
  }

  const approveProduct = async (id, type) => {
    try {
      setIsLoading(true);
      const obj = { isVerified: type === 'Approve' ? true : false };
      const payload = new FormData();
      Object.keys(obj).forEach(key => payload.append(key, obj[key]));

      await productService.updateProduct(id, payload);
      Toast({
        type: 'success',
        message: 'Product Approved Successfully!',
      });
      refetch();
    } catch ({ message }) {
      Toast({
        type: 'error',
        message: `Failed to ${type} this Product! Please Try Again!`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { products_data, products_loading } = productService.GetAllProducts(searchQuery, fetch, userId);
  const actionBtns = product => {
    if (!product.isVerified) {
      return (
        <ActionBtnList>
          <li>
            <Button
              onClick={() => {
                approveProduct(product?._id, 'Approve');
              }}
              variant="success"
              custom
              xsCustom>
              Approve
            </Button>
          </li>
          <li>
            <ModalContainer
              width={500}
              title={<Image src={declineIcon} alt="declineIcon" />}
              btnComponent={({ onClick }) => (
                <Button variant="danger" custom xsCustom onClick={onClick}>
                  Decline
                </Button>
              )}
              content={({ onClose }) => <DeclineModal type="Product" onClose={onClose} id={product?._id} />}
            />
          </li>
        </ActionBtnList>
      );
    } else {
      return (
        <ActionBtnList>
          {product?.userId?.sellerType !== 'Individual' ? (
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
                  <DeclineModal
                    type="Product"
                    onClose={handleDelete}
                    id={product?._id}
                    title="Delete Product!"
                    btnText="Yes, Delete"
                  />
                )}
              />
            </li>
          ) : (
            <>
              <li>
                <button
                  type="button"
                  className="btn edit"
                  onClick={() => {
                    setProduct(product);
                    setEditProduct(true);
                  }}>
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
    }
  };

  const { product_rows, totalCount } = useMemo(() => ({
    product_rows: products_data?.items?.map(product => [
      product?.productName || '------------',
      product?.investmentType || '------------',
      product?.currentBackers ?? '------------',
      product?.total_return ?? '------------',
      actionBtns(product),
    ]),
    totalCount: products_data?.totalItems,
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
        <Table width={800} rowsData={product_rows} loading={products_loading} columnNames={buyerColumns} noPadding />
      </TableLayout>
      {/* </TableContainer> */}
    </>
  );
};

export default ProductsDetailModal;
