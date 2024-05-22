import React, { useState } from 'react';
// import Filters from '../../../pages/common/filters';
import { CiSearch } from 'react-icons/ci';
import Image from 'next/image';
import Field from '@/components/molecules/Field';
import Pagination from '../../molecules/Pagination';
import TableHeader from '../TableHeader';
import { StyledTableLayout } from './TableLayout.styles';
import Button from '../Button';

function TableLayout({
  children,
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
  openModal,
  buyerSellerTabs,
  manageProductsTabs,
  tab,
  setTab,
  noBorder,
  setResetFilter = () => {},
}) {
  const [filterState, setFilterState] = useState('');
  return (
    <>
      {/* {filters && (
        <Filters
          resetFilter={resetFilter}
          setResetFilter={setResetFilter}
          onChangeFilters={_ => {
            onChangeFilters({ ..._, page: 1 });
            setFilterState(_);
          }}
          customFilterKey={customFilterKey}
          extraFilters={extraFilters}
          onOptionClick={onOptionClick}
        />
      )} */}
      <StyledTableLayout
        noNegativeMargin={noNegativeMargin}
        noPagination={noPagination}
        filterBlock={filterBlock}
        $noBorder={noBorder}>
        <div className="inner-wrap">
          <TableHeader
            total={totalCount}
            page={currentPage}
            resultPerPage={pageSize}
            setPageSize={_ => onChangeFilters({ pageSize: _, page: 1 })}
            exportBtn={exportBtn}
            createBtn={createBtn}
            tableHeading={tableHeading}
            placeholder={placeholder}
            btnType={btnType}
            btnText={btnText}
            btnImg={btnImg}
            btnWidth={btnWidth}
            iconImg={iconImg}
            buyerSellerTabs={buyerSellerTabs}
            manageProductsTabs={manageProductsTabs}
            tab={tab}
            setTab={setTab}
          />
          {children}
          <div className="pagination">
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              // onPageChange={_ => onChangeFilters({ page: _ })}
              onPageChange={_ => onChangeFilters({ filter: filterState.filter, page: _ })}
            />
          </div>
        </div>
      </StyledTableLayout>
    </>
  );
}

export default TableLayout;
