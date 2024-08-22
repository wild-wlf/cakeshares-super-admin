/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  PayoutTable,
  // openDateModal,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchText, setSearchText] = useState('');
  const debounceRef = useRef(0);
  const [dateModal, setDateModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedKyc, setSelectedKyc] = useState(null);
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
  const statusDataSeller = [
    {
      value: '',
      label: 'All',
    },
    {
      value: 'Pending',
      label: 'Pending',
    },
    {
      value: 'Active',
      label: 'Active',
    },
    // {
    //   value: 'Deactive',
    //   label: 'Deactive',
    // },
    {
      value: 'Rejected',
      label: 'Rejected',
    },
    {
      value: 'Suspended',
      label: 'Suspended',
    },
  ];
  const statusDataBuyer = [
    {
      value: '',
      label: 'All',
    },
    {
      value: 'Active',
      label: 'Active',
    },
    {
      value: 'Suspended',
      label: 'Suspended',
    },
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
    {
      value: 'funded',
      label: 'Funded',
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
  const payoutStatus = [
    {
      value: '',
      label: 'All',
    },
    {
      value: 'pending',
      label: 'Pending',
    },
    {
      value: 'approved',
      label: 'Approved',
    },
    {
      value: 'rejected',
      label: 'Rejected',
    },
    {
      value: 'completed',
      label: 'Completed',
    },
  ];
  
  const payoutUserAccType = [
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
    {
      value: 'Buyer',
      label: 'Buyer',
    },
  ];

  useEffect(() => {
    setSelectedStatus(null);
    setSelectedKyc(null);
  }, [tab]);

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
                    value={selectedKyc}
                    onChange={({ target: { value } }) => {
                      setSelectedKyc(value);
                      onChangeFilters({ kycLevel: value?.value });
                    }}
                    options={kycData}
                    labelReverse
                  />
                </div>
                <div className="select-holder">
                  <Select
                    placeholder="Select Status"
                    value={selectedStatus}
                    onChange={({ target: { value } }) => {
                      setSelectedStatus(value);
                      onChangeFilters({ status: value?.value });
                    }}
                    options={tab === 2 ? statusDataSeller : statusDataBuyer}
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
                    placeholder="Select KYC"
                    value={selectedKyc}
                    onChange={({ target: { value } }) => {
                      setSelectedKyc(value);
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
            {PayoutTable && (
              <>
                <div className="select-holder">
                  <Select
                    placeholder="Select User Type"
                    onChange={({ target: { value } }) => {
                      onChangeFilters({ userAccType: value?.value });
                    }}
                    options={payoutUserAccType}
                  />
                </div>
                <div className="select-holder">
                  <Select
                    placeholder="Select Status"
                    onChange={({ target: { value } }) => {
                      onChangeFilters({ status: value?.value });
                    }}
                    options={payoutStatus}
                  />
                </div>
              </>
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
