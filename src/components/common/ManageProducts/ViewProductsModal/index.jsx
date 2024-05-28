import React, { useMemo, useState } from 'react';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import DeleteIcon from '../../../../../public/assets/table-delete-icon.svg';
import Image from 'next/image';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import DeleteModal from '@/components/atoms/UserDeleteModal/DeleteModal';
import modalInfoIcon from '../../../../../public/assets/infoIcon.png';
import Button from '@/components/atoms/Button';
import ModalContainer from '@/components/molecules/ModalContainer';
import declineIcon from '../../../../../public/assets/decline-icon.svg';
import detailIcon from '../../../../../public/assets/view-detail-icon.svg';
import DeclineModal from '../../DeclineModal';
import productService from '@/services/productService';
import Toast from '@/components/molecules/Toast';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import ProductDetail from '../ProductDetailModal';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import ProductDetailModal from '../ProductDetailModal';
import { MdModeEditOutline } from 'react-icons/md';

const ViewProductsModal = ({ userId, setProduct, onClose, setSuccessModal, setProductModal, sellerType }) => {
  const { fetch, refetch } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
    refetch: v.refetch,
  }));
  const [deleteModal, setDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState();
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    status: '',
  });

  function handleDelete() {
    setDeleteModal(false);
    setSuccessModal(true);
    onClose();
  }

  const { products_data, products_loading } = productService.GetAllProducts(searchQuery, fetch, userId);

  const actionBtns = product => {
    if (!product.isVerified) {
      return (
        <ActionBtnList>
          <li>
            <ModalContainer
              width={1500}
              title="Product Detail"
              btnComponent={({ onClick }) => (
                <Button variant="secondary" custom xsCustom onClick={onClick}>
                  <Image src={detailIcon} alt="detailIcon" />
                  View Detail
                </Button>
              )}
              content={({ onClose }) => <ProductDetailModal product={product} />}
            />
          </li>
        </ActionBtnList>
      );
    } else {
      return (
        <ActionBtnList>
          {product?.userId?.sellerType === 'Individual Seller' ? (
            <>
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
              <li>
                <ModalContainer
                  width={1500}
                  title="Product Detail"
                  btnComponent={({ onClick }) => (
                    <Button variant="secondary" custom xsCustom onClick={onClick}>
                      <Image src={detailIcon} alt="detailIcon" />
                      View Detail
                    </Button>
                  )}
                  content={({ onClose }) => <ProductDetailModal product={product} />}
                />
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  type="button"
                  className="btn edit"
                  onClick={() => {
                    setProduct(product);
                    setProductModal(true);
                  }}>
                  <MdModeEditOutline color="rgba(64, 143, 140, 1)" size={16} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn delete"
                  onClick={() => {
                    setProductToDelete(product?._id);
                    setDeleteModal(true);
                  }}>
                  <Image src={DeleteIcon} alt="DeleteIcon" />
                </button>
              </li>
              <li>
                <ModalContainer
                  width={1500}
                  title="Product Detail"
                  btnComponent={({ onClick }) => (
                    <Button variant="secondary" custom xsCustom onClick={onClick}>
                      <Image src={detailIcon} alt="detailIcon" />
                      View Detail
                    </Button>
                  )}
                  content={({ onClose }) => <ProductDetailModal product={product} />}
                />
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
          id={productToDelete}
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
        <Table width={800} rowsData={product_rows} loading={products_loading} columnNames={buyerColumns} noPadding />
      </TableLayout>
      {/* </TableContainer> */}
    </>
  );
};

export default ViewProductsModal;
