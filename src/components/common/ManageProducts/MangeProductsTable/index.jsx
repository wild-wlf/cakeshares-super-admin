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
import SelectRangeModal from '@/components/atoms/SelectRangeModal';

const MangeProductsTable = () => {
  const { fetch, user } = useContextHook(AuthContext, v => ({
    fetch: v.fetch,
    user: v.user,
  }));
  const [tab, setTab] = useState(1);
  const [product, setProduct] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [createProductSuccessModal, setCreateProductSuccessModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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

  const { products_data, products_loading } = productService.GetAllProducts(searchQuery, fetch);
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
          {product?.userId?.sellerType === 'Individual' ? (
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

  // const { investment_rows, totalCount } = useMemo(() => {
  //   return {
  //     investment_rows: products_data?.items?.map(user => [
  //       <div className="table-img-holder" key={user?._id}>
  //         <div className="img-holder">
  //           <Image src={user?.profilePicture || userAvatar} width={20} height={20} alt="userImage" />
  //         </div>
  //         {user.fullName || '------------'}
  //       </div>,
  //       user?.totalInvestments ?? '------------',
  //       `$ ${user.totalInvestmentAmount}` ?? '------------',
  //       actionBtnss(),
  //     ]),
  //     totalCount: products_data?.totalItems,
  //   };
  // }, [products_data]);

  const { product_rows, totalCount } = useMemo(
    () => ({
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
      totalCount: products_data?.totalItems,
    }),
    [products_data],
  );

  const investmentColumns = [`User`, `Total Investments`, `Total Investments Amount`, `Actions`];
  const productColumns = [
    `Created At`,
    `Product`,
    `Owner`,
    `Owner Status`,
    `Account Type`,
    `Category`,
    `Product Status`,
    `Current Backers`,
    'Actions',
  ];

  return (
    <>
      <CenterModal open={dateModal} setOpen={setDateModal} width="666" padding={'30px'} title="Select Range">
        <SelectRangeModal />
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

      <CenterModal open={productModal} setOpen={setProductModal} title="Create Product" width="900">
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
          openDateModal={() => setDateModal(true)}
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
          // totalCounts={totalItems}
          pageSize={searchQuery.itemsPerPage}
          tab={tab}
          setTab={setTab}>
          {tab === 1 ? (
            <Table
              width={1024}
              // rowsData={investment_rows}
              // loading={user_loading}
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
