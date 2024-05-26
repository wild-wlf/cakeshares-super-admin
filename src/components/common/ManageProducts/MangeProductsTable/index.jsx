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
import declineIcon from '../../../../../public/assets/decline-icon.svg';
import DeclineModal from '../../DeclineModal';
import InvestmentDetailModal from '../InvestmentDetailModal';
import ProductsDetailModal from '../ProductsDetailModal';
import SuccessfulModal from '@/components/atoms/UserDeleteModal/SuccessfulModal';
import successIcon from '../../../../../public/assets/successIcon.png';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import ProductModal from '../ProductModal';

const MangeProductsTable = () => {
  const { fetch } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
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

  const { user_data, user_loading } = productService.GetAllUsers(searchQuery, fetch);

  const actionBtns = user => {
    return (
      <ActionBtnList>
        <li>
          <ModalContainer
            width={1000}
            title={`${user?.fullName} Products`}
            btnComponent={({ onClick }) => (
              <Button variant="secondary" custom xsCustom onClick={onClick}>
                <Image src={detailIcon} alt="detailIcon" />
                View Detail
              </Button>
            )}
            content={({ onClose }) => (
              <ProductsDetailModal
                userId={user?._id}
                setProduct={setProduct}
                onClose={onClose}
                setSuccessModal={setSuccessModal}
                setProductModal={setProductModal}
                accountType={user.account_type}
              />
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

  const { investment_rows, totalCount } = useMemo(() => {
    return {
      investment_rows: user_data?.items?.map(user => [
        <div className="table-img-holder" key={user?._id}>
          <div className="img-holder">
            <Image src={user?.profilePicture || userAvatar} width={20} height={20} alt="userImage" />
          </div>
          {user.fullName || '------------'}
        </div>,
        user?.totalInvestments ?? '------------',
        `$ ${user.totalInvestmentAmount}` ?? '------------',
        actionBtnss(),
      ]),
      totalCount: user_data?.totalItems,
    };
  }, [user_data]);

  const { product_rows, totalCounts } = useMemo(() => {
    return {
      product_rows: user_data?.items?.map(user => {
        const sellerType =
          user?.type === 'Seller' ? (user.isIndividualSeller ? 'Individual Seller' : 'Company Seller') : 'Super Admin';
        return [
          <div className="table-img-holder" key={user?._id}>
            <div className="img-holder">
              <Image src={user?.profilePicture || userAvatar} width={20} height={20} alt="userImage" />
            </div>
            {user.fullName || '------------'}
          </div>,
          sellerType,
          user?.totalProducts ?? '------------',
          user?.total_return || '------------',
          user?.isVerified ? 'Approved' : 'Pending',
          actionBtns(user),
        ];
      }),
      totalCounts: user_data?.totalItems,
    };
  }, [user_data]);

  const investmentColumns = [`User`, `Total Investments`, `Total Investments Amount`, `Actions   `];
  const productColumns = [`User`, `Account Type`, `Total Products`, 'Total Return', `status`, 'Actions'];

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
      <CenterModal open={productModal} setOpen={setProductModal} title="Edit Product" width="900">
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
          placeholder="Search Investments"
          onChangeFilters={filters => {
            setSearchQuery(_ => ({
              ..._,
              ...filters,
            }));
          }}
          currentPage={searchQuery.page}
          totalCount={totalCount}
          totalCounts={totalCounts}
          pageSize={searchQuery.itemsPerPage}
          tab={tab}
          setTab={setTab}>
          {tab === 1 ? (
            <Table
              width={1024}
              rowsData={investment_rows}
              loading={user_loading}
              columnNames={investmentColumns}
              noPadding
            />
          ) : (
            <Table width={1024} rowsData={product_rows} loading={user_loading} columnNames={productColumns} noPadding />
          )}
        </TableLayout>
      </TableContainer>
    </>
  );
};

export default MangeProductsTable;
