import React, { useState, useEffect, useMemo } from 'react';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import productService from '@/services/productService';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import ModalContainer from '@/components/molecules/ModalContainer';
import TableStyle from '../../../../../public/assets/table-style.jpg';
import CalenderIcon from '../../../../../public/assets/calander.svg';
import detailIcon from '../../../../../public/assets/view-detail-icon.svg';
import DeleteIcon from '../../../../../public/assets/table-delete-icon.svg';
import declineIcon from '../../../../../public/assets/decline-icon.svg';
import InvestmentDetailModal from '../InvestmentDetailModal';
import SuccessfulModal from '@/components/atoms/UserDeleteModal/SuccessfulModal';
import modalInfoIcon from '../../../../../public/assets/infoIcon.png';
import successIcon from '../../../../../public/assets/successIcon.png';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import ProductModal from '../ProductModal';
import { format } from 'date-fns';
import ProductDetailModal from '../ProductDetailModal';
import { MdModeEditOutline } from 'react-icons/md';
import DeclineModal from '../../DeclineModal';
import DeleteModal from '@/components/atoms/UserDeleteModal/DeleteModal';
import { TableContainer } from '@/components/atoms/TableContainer/TableContainer.styles';
import { formatNumber } from '@/helpers/common';

const MangeProductsTable = ({ setProductCount }) => {
  const { fetch } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
  }));
  const [tab, setTab] = useState(1);
  const [product, setProduct] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [createProductSuccessModal, setCreateProductSuccessModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [investmentData, setinvestmentData] = useState();
  const [productModal, setProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    startDate: '',
    endDate: '',
    searchText: '',
    section: 'Investments',
    status: '',
    accType: '',
  });

  function handleDelete() {
    setDeleteModal(false);
    setSuccessModal(true);
  }

  let investments_data, investments_loading, products_data, products_loading;

  if (searchQuery?.section === 'Investments') {
    const result = productService.GetAllInvestments(searchQuery, fetch);
    investments_data = result.investments_data;
    investments_loading = result.investments_loading;
  } else {
    const result = productService.GetAllProducts(searchQuery, fetch);
    products_data = result.products_data;
    products_loading = result.products_loading;
  }
  useEffect(() => {
    setProductCount(products_data?.allProductsinDb || investments_data?.allProductsinDb);
  }, [products_data?.allProductsinDb, investments_data?.allProductsinDb]);

  const actionBtns = product => {
    if (!product.isVerified) {
      return (
        <ActionBtnList>
          <li>
            <ModalContainer
              width={1000}
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
          {product?.userId?.sellerType !== 'Individual' && product?.userId?.sellerType !== 'Company' ? (
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
                  width={1000}
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
                <ModalContainer
                  width={500}
                  title={<Image src={declineIcon} alt="declineIcon" />}
                  btnComponent={({ onClick }) => (
                    <Button
                      type="button"
                      variant="danger"
                      custom
                      xsCustom
                      onClick={onClick}
                      disable={product.isAdvertised}>
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
                  width={1000}
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

  const actionBtnss = _ => (
    <ActionBtnList>
      <li>
        <Button
          variant="secondary"
          custom
          xsCustom
          onClick={() => {
            setProductDetailModal(true);
            setinvestmentData(_);
          }}>
          <Image src={detailIcon} alt="detailIcon" />
          View Product
        </Button>
      </li>
      {/* <ModalContainer
        width={1100}
        title="Logan’s Investments"
        btnComponent={({ onClick }) => (
          <Button variant="secondary" custom xsCustom onClick={onClick}>
            <Image src={detailIcon} alt="detailIcon" />
            View Detail
          </Button>
        )}
        content={({ onClose }) => <InvestmentDetailModal onClose={onClose} />}
      /> */}
    </ActionBtnList>
  );

  const { investment_rows, investment_totalCount } = useMemo(() => {
    return {
      investment_rows: investments_data?.items?.map(_ => [
        format(new Date(_?.created_at), 'yyyy-MM-dd') || '------------',
        _?.userId?.fullName || '------------',
        _?.product?.productName || '------------',
        _?.product?.investmentType?.name || '------------',
        `$${formatNumber(_?.investmentAmount)}` ?? 0 ?? '----------',
        actionBtnss(_),
      ]),
      investment_totalCount: investments_data?.totalItems,
    
    };
  }, [investments_data]);

  const { product_rows, product_totalCount } = useMemo(() => {
    return {
      product_rows: products_data?.items?.map(_ => [
        format(new Date(_?.created_at), 'yyyy-MM-dd') || '------------',
        _?.productName || '------------',
        _?.userId?.fullName || 'Super Admin' || '------------',
        _?.userId?.isVerified === undefined || _?.userId?.isVerified ? 'Approved' : 'Pending',
        !_?.userId?.sellerType
          ? 'Super Admin'
          : _?.userId?.sellerType === 'Individual'
          ? 'Individual Seller'
          : 'Company Seller',
        _?.investmentType?.name || '------------',
        _?.isVerified ? (
          <span className="status-approved">Approved</span>
        ) : (
          <span className="status-pending">Pending</span> ?? '------------'
        ),
        _?.currentBackers ?? '------------',
        actionBtns(_),
      ]),
      product_totalCount: products_data?.totalItems,
      
    };
  }, [products_data]);

  const investmentColumns = [`Created At`, `User`, `Product`, `Investment Type`, `Investment Amount`, `Actions`];
  const productColumns = [
    `Created At`,
    `Product`,
    `Owner`,
    `Owner Status`,
    `User Account Type`,
    `Category`,
    `Product Status`,
    `Current Backers`,
    'Actions',
  ];

  return (
    <>
      <CenterModal
        open={productDetailModal}
        setOpen={setProductDetailModal}
        title={`${investmentData?.product?.productName}`}
        width="1030">
        <ProductDetailModal product={investmentData?.product} />
      </CenterModal>
      <CenterModal
        open={successModal}
        setOpen={setSuccessModal}
        title={<Image src={successIcon} alt="InfoIcon" />}
        width="543">
        <SuccessfulModal title="Product Deleted Successfully!" />
      </CenterModal>
      <CenterModal
        open={createProductSuccessModal}
        setOpen={setCreateProductSuccessModal}
        title={<Image src={successIcon} alt="InfoIcon" />}
        width="543">
        <SuccessfulModal title="Product Created Successfully!" />
      </CenterModal>

      <CenterModal
        open={productModal}
        setOpen={setProductModal}
        title={product ? 'Edit Product' : 'Create Product'}
        width="900">
        <ProductModal
          product={product}
          setCreateProductSuccessModal={setCreateProductSuccessModal}
          setProductModal={setProductModal}
        />
      </CenterModal>
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
      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableCurve" />
        <TableLayout
          manageProductsTabs
          openProductModal={setProductModal}
          // openDateModal={() => setDateModal(true)}
          btnWidth="40px"
          btnText={tab === 2 && 'Create New Product'}
          btnType={tab === 2 && 'success'}
          iconImg={CalenderIcon}
          openModal={() => {
            setProduct();
            setProductModal(true);
          }}
          placeholder={searchQuery?.section === 'Investments' ? 'Search Investments' : 'Search Products'}
          onChangeFilters={filters => {
            setSearchQuery(_ => ({
              ..._,
              ...filters,
            }));
          }}
          currentPage={searchQuery.page}
          totalCount={investment_totalCount || product_totalCount}
        
          // totalCounts={totalItems}
          pageSize={searchQuery.itemsPerPage}
          tab={tab}
          setTab={setTab}>
          {tab === 1 ? (
            <Table
              width={1024}
              rowsData={investment_rows}
              loading={investments_loading}
              columnNames={investmentColumns}
              noPadding
            />
          ) : (
            <Table
              width={1024}
              rowsData={product_rows}
              loading={products_loading}
              columnNames={productColumns}
              noPadding
            />
          )}
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default MangeProductsTable;
