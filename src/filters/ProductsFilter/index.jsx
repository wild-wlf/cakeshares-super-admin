/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useMemo, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { StyledTableHeader } from './ProductsFilter.Styles';
import Field from '@/components/molecules/Field';
import { CiSearch } from 'react-icons/ci';
import Button from '../../components/atoms/Button';
import Image from 'next/image';
import Select from '../../components/atoms/Select';
import debounce from 'lodash/debounce';
import SelectRangeModal from '@/components/atoms/SelectRangeModal';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import { format } from 'date-fns';

function ProductsFilter({
  tableHeading,
  placeholder,
  btnText,
  btnWidth,
  btnType,
  btnImg,
  openModal,
  iconImg,
  buyerSellerTabs,
  manageProductsTabs,
  tab,
  setTab,
  onChangeFilters,
  ProductsDetailSelect,
  // openDateModal,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchText, setSearchText] = useState('');
  const debounceRef = useRef(0);
  const [dateModal, setDateModal] = useState(false);

  const onSearchCallText = useMemo(
    () =>
      debounce(value => {
        debounceRef.current += 1;
        const LocalRef = debounceRef.current;
        setTimeout(() => {
          if (LocalRef === debounceRef.current) {
            onChangeFilters({ searchText: value });
          }
        }, 1);
      }, 300),
    [],
  );

  function handleTabs(index) {
    setTab(index);
  }
  const kycData = [
    {
      value: '',
      label: 'All',
    },
    {
      value: 0,
      label: 'Level 0',
    },
    {
      value: 1,
      label: 'Level 1',
    },
    {
      value: 2,
      label: 'Level 2',
    },
    {
      value: 3,
      label: 'Level 3',
    },
  ];
  const statusData = [
    {
      label: 'All',
    },
    {
      value: true,
      label: 'Approved',
    },
    {
      value: false,
      label: 'Suspended',
    },
    // {
    //   value: false,
    //   label: 'Rejected',
    // },
    // {
    //   value: false,
    //   label: 'Pending',
    // },
    // {
    //   value: false,
    //   label: 'Deactive',
    // },
  ];
  const accountTypeData = [
    {
      value: '',
      label: 'All',
    },
    {
      value: 'Individual',
      label: 'Individual Seller',
    },
    {
      value: 'Company',
      label: 'Company Seller',
    },
  ];
  const productStatusData = [
    {
      value: '',
      label: 'All',
    },
    {
      value: 'approved',
      label: 'Approved',
    },
    {
      value: 'pending',
      label: 'Pending',
    },
    {
      value: 'rejected',
      label: 'Rejected',
    },
  ];
  const productAccountTypeData = [
    {
      value: '',
      label: 'All',
    },
    {
      value: 'Admin',
      label: 'Super Admin',
    },
    {
      value: 'Individual',
      label: 'Individual Seller',
    },
    {
      value: 'Company',
      label: 'Company Seller',
    },
  ];
  return (
    <>
      <StyledTableHeader>
        <div className="head">
          {tableHeading && <strong className="table-heading">{tableHeading}</strong>}
          {buyerSellerTabs && (
            <div className="btn-holder">
              <button
                className={tab === 1 ? 'active' : ''}
                onClick={() => {
                  handleTabs(1);
                  onChangeFilters({
                    page: 1,
                    itemsPerPage: 10,
                    startDate: '',
                    endDate: '',
                    searchText: '',
                    type: 'Buyer',
                    kycLevel: '',
                    status: '',
                    accType: '',
                  });
                }}>
                Buyer
              </button>
              <button
                className={tab === 2 ? 'active' : ''}
                onClick={() => {
                  handleTabs(2);
                  onChangeFilters({
                    page: 1,
                    itemsPerPage: 10,
                    startDate: '',
                    endDate: '',
                    searchText: '',
                    type: 'Seller',
                    kycLevel: '',
                    status: '',
                    accType: '',
                  });
                }}>
                Seller
              </button>
            </div>
          )}
          {manageProductsTabs && (
            <div className="btn-holder">
              <button
                className={tab === 1 ? 'active' : ''}
                onClick={() => {
                  handleTabs(1);
                  setStartDate(null);
                  setEndDate(null);
                  onChangeFilters({
                    page: 1,
                    startDate: '',
                    endDate: '',
                    searchText: '',
                    section: 'Investments',
                    status: '',
                    accType: '',
                  });
                }}>
                Investments
              </button>
              <button
                className={tab === 2 ? 'active' : ''}
                onClick={() => {
                  handleTabs(2);
                  setStartDate(null);
                  setEndDate(null);
                  onChangeFilters({
                    page: 1,
                    startDate: '',
                    endDate: '',
                    searchText: '',
                    section: 'Products',
                    status: '',
                    accType: '',
                  });
                }}>
                Products
              </button>
            </div>
          )}
          <div className="actions">
            {buyerSellerTabs && (
              <>
                <div className="select-holder">
                  <Select
                    placeholder="Select KYC"
                    onChange={({ target: { value } }) => {
                      onChangeFilters({ kycLevel: value?.value });
                    }}
                    options={kycData}
                    labelReverse
                  />
                </div>
                <div className="select-holder">
                  <Select
                    placeholder="Select Status"
                    onChange={({ target: { value } }) => {
                      onChangeFilters({ status: value?.value });
                    }}
                    options={statusData}
                  />
                </div>
                {tab === 2 && (
                  <div className="select-holder">
                    <Select
                      placeholder="Select Account type"
                      onChange={({ target: { value } }) => {
                        onChangeFilters({ accType: value?.value });
                      }}
                      options={accountTypeData}
                    />
                  </div>
                )}
              </>
            )}
            {manageProductsTabs && tab === 2 && (
              <>
                <div className="select-holder">
                  <Select
                    placeholder="Select Account Type"
                    onChange={({ target: { value } }) => {
                      onChangeFilters({ accType: value?.value });
                    }}
                    options={productAccountTypeData}
                  />
                </div>
                <div className="select-holder">
                  <Select
                    placeholder="Select Status"
                    onChange={({ target: { value } }) => {
                      onChangeFilters({ status: value?.value });
                    }}
                    options={productStatusData}
                  />
                </div>
              </>
            )}
            {ProductsDetailSelect && (
              <div className="select-holder">
                <Select
                  placeholder="Select Account Type"
                  onChange={({ target: { value } }) => {
                    onChangeFilters({ status: value?.value });
                  }}
                  options={productStatusData}
                />
              </div>
            )}
            {placeholder && (
              <div className="item">
                <div className="Search">
                  <Field
                    type="search"
                    rounded
                    sm
                    name="search"
                    placeholder={placeholder}
                    suffix={<CiSearch className="icon" />}
                    onChange={({ target: { value } }) => {
                      setSearchText(value);
                      onSearchCallText(value.trim());
                    }}
                  />
                </div>
              </div>
            )}
            {btnText && (
              <Button rounded width={btnWidth ? btnWidth : '100%'} variant={btnType} onClick={openModal}>
                {btnText}
                {btnImg && <Image src={btnImg} alt="btnImg" />}
              </Button>
            )}
            {iconImg && (
              <div className="icon-div" onClick={() => setDateModal(true)}>
                <Image src={iconImg} alt="iconImg" />
              </div>
            )}
          </div>
        </div>
      </StyledTableHeader>
      <CenterModal open={dateModal} setOpen={setDateModal} width="666" padding={'30px'} title="Select Range">
        <SelectRangeModal
          startDate={startDate}
          endDate={endDate}
          onChange={dates => {
            const [start, end] = dates?.target?.value;
            setStartDate(start);
            setEndDate(end);
          }}
          onApplyDate={() => {
            if (startDate && endDate) {
              onChangeFilters({
                startDate: format(new Date(startDate), 'yyyy-MM-dd'),
                endDate: format(new Date(endDate), 'yyyy-MM-dd'),
              });
              setDateModal(false);
            }
          }}
          onClearDate={() => {
            setStartDate(null);
            setEndDate(null);
            if (startDate && endDate) {
              onChangeFilters({
                startDate: '',
                endDate: '',
              });
            }
          }}
          setDateModal={setDateModal}
        />
      </CenterModal>
    </>
  );
}

export default ProductsFilter;
