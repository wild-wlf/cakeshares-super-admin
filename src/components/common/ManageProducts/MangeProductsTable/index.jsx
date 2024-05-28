import React, { useMemo, useState } from 'react';
import { ActionBtnList } from '@/components/atoms/ActionBtns/ActionBtns.styles';
import Table from '@/components/molecules/Table';
import TableLayout from '@/components/atoms/TableLayout';
import Image from 'next/image';
import { TableContainer } from '@/components/atoms/PermissionsTable/PermissionsTable.style';
import Button from '@/components/atoms/Button';
import productService from '@/services/productService';
import { AuthContext } from '@/context/authContext';
import { useContextHook } from 'use-context-hook';
import ModalContainer from '@/components/molecules/ModalContainer';
import TableStyle from '../../../../../public/assets/table-style.jpg';
import CalenderIcon from '../../../../../public/assets/calander.svg';
import userAvatar from '../../../../../public/assets/user_avatar.png';
import detailIcon from '../../../../../public/assets/view-detail-icon.svg';
import InvestmentDetailModal from '../InvestmentDetailModal';
// import ProductsDetailModal from '../ViewProductsModal';
import SuccessfulModal from '@/components/atoms/UserDeleteModal/SuccessfulModal';
import successIcon from '../../../../../public/assets/successIcon.png';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import ProductModal from '../ProductModal';
import { format } from 'date-fns';
import ViewProductsModal from '../ViewProductsModal';
import ProductDetailModal from '../ProductDetailModal';

const MangeProductsTable = () => {
  const { fetch, user } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
    user: v.user,
  }));
  const [tab, setTab] = useState(1);
  const [product, setProduct] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [createProduct, setCreateProduct] = useState(false);
  const [createProductSuccessModal, setCreateProductSuccessModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [createProductData, setCreateProductData] = useState({});
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

  function handleCreateProduct() {
    setCreateProductSuccessModal(true);
    setCreateProduct(false);
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

  const actionBtns = product => {
    return (
      <ActionBtnList>
        <li>
          <ModalContainer
            width={1000}
            title={`Products`}
            btnComponent={({ onClick }) => (
              <Button variant="secondary" custom xsCustom onClick={onClick}>
                <Image src={detailIcon} alt="detailIcon" />
                View Products
              </Button>
            )}
            content={({ onClose }) => (
              // <ViewProductsModal
              //   userId={user?._id}
              //   setProduct={setProduct}
              //   onClose={onClose}
              //   setSuccessModal={setSuccessModal}
              //   setProductModal={setProductModal}
              //   accountType={user.account_type}
              // />
              <ProductDetailModal product={product} />
            )}
          />
        </li>
      </ActionBtnList>
    );
  };
  const actionBtnss = () => (
    <ActionBtnList>
      <li>
        <ModalContainer
          width={1100}
          title="Logan’s Investments"
          btnComponent={({ onClick }) => (
            <Button variant="secondary" custom xsCustom onClick={onClick}>
              <Image src={detailIcon} alt="detailIcon" />
              View Detail
            </Button>
          )}
          content={({ onClose }) => <InvestmentDetailModal onClose={onClose} />}
        />
      </li>
    </ActionBtnList>
  );

  const { investment_rows, investment_totalCount } = useMemo(() => {
    return {
      investment_rows: investments_data?.items?.map(_ => [
        format(new Date(_?.created_at), 'yyyy-MM-dd') || '------------',
        _?.userId?.fullName || '------------',
        _?.product?.productName || '------------',
        _?.product?.investmentType || '------------',
        _?.investmentAmount ?? '------------',
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
        _?.userId?.isVerified || !_?.isVerified ? 'Approved' : 'Pending' || '------------',
        !_?.userId?.sellerType
          ? 'Super Admin'
          : _?.userId?.sellerType === 'Individual'
          ? 'Individual Seller'
          : 'Company Seller',
        _?.investmentType || '------------',
        _?.isVerified ? 'Approved' : 'Pending' || '------------',
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
      {/* <CenterModal open={createProduct} setOpen={setCreateProduct} title="Create new Product" width="900">
        <CreateNewProduct handleCreateProduct={handleCreateProduct} setCreateProductData={setCreateProductData} />
      </CenterModal> */}
      <CenterModal open={productModal} setOpen={setProductModal} title="Create Product" width="900">
        <ProductModal
          product={product}
          setCreateProductSuccessModal={setCreateProductSuccessModal}
          setProductModal={setProductModal}
        />
      </CenterModal>
      <TableContainer>
        <Image src={TableStyle} className="tableStyle" alt="tableCurve" />
        <TableLayout
          manageProductsTabs
          openProductModal={setProductModal}
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
