import React, { useState } from 'react';
// import Filters from '../../../pages/common/filters';
import { CiSearch } from 'react-icons/ci';
import Image from 'next/image';
import Field from '@/components/molecules/Field';
import Pagination from '../../molecules/Pagination';
import TableHeader from '../TableHeader';
import { StyledTableLayout } from './TableLayout.styles';
import Button from '../Button';
import ProductsFilter from '../../../filters/ProductsFilter';

function TableLayout({
  children,
  openModal,
  currentPage = 1,
  pageSize = 10,
  totalCount = 0,
  onChangeFilters,
  customFilterKey = '',
  exportBtn,
  createBtn,
  extraFilters,
  filters = false,
  noNegativeMargin,
  onOptionClick,
  resetFilter = false,
  tableHeading,
  noPagination,
  placeholder,
  btnType,
  btnText,
  btnImg,
  btnWidth,
  filterBlock,
  iconImg,
  buyerSellerTabs,
  manageProductsTabs,
  ProductsDetailSelect,
  PayoutTable,
  tab,
  setTab,
  noBorder,
  noPadding,
  overflow,
  // openDateModal,
  setResetFilter = () => {},
}) {
  const [filterState, setFilterState] = useState('');
  return (
    <>
      <StyledTableLayout
        noNegativeMargin={noNegativeMargin}
        noPagination={noPagination}
        filterBlock={filterBlock}
        $noBorder={noBorder}
        $noPadding={noPadding}
        $overflow={overflow}>
        <div className="inner-wrap">
          <ProductsFilter
            placeholder={placeholder}
            openModal={openModal}
            btnType={btnType}
            btnText={btnText}
            btnImg={btnImg}
            btnWidth={btnWidth}
            iconImg={iconImg}
            buyerSellerTabs={buyerSellerTabs}
            PayoutTable={PayoutTable}
            manageProductsTabs={manageProductsTabs}
            ProductsDetailSelect={ProductsDetailSelect}
            // openDateModal={openDateModal}
            tab={tab}
            setTab={setTab}
            onChangeFilters={_ => {
              onChangeFilters({ ..._, page: 1 });
            }}
          />
          {children}
          <div className="pagination">
            {totalCount > 1 ? (
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                // onPageChange={_ => onChangeFilters({ page: _ })}
                onPageChange={_ => onChangeFilters({ filter: filterState.filter, page: _ })}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </StyledTableLayout>
    </>
  );
}

export default TableLayout;
