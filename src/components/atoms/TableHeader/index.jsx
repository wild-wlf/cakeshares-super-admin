/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';

// eslint-disable-next-line no-unused-vars
import { useMediaPredicate } from 'react-media-hook';
import { StyledTableHeader, TotalResult, ResultPerPage, StyledSelect } from './TableHeader.styles';
import Field from '@/components/molecules/Field';
import { CiSearch } from 'react-icons/ci';
import Button from '../Button';
import Image from 'next/image';
import { useState } from 'react';
import Select from '../Select';

function TableHeader({
  l,
  btnText,
  btnWidth,
  btnType,
  btnImg,
  openModal,
  iconImg,
  buyerSellerTabs,
  tab,
  setTab,
}) {
  function handleTabs(index) {
    setTab(index);
  }
  const kycData = [
    {
      label: 'All',
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
      value: 'Approved',
      label: 'Approved',
    },
    {
      value: 'pending',
      label: 'pending',
    },
  ];
  const accountTypeData = [
    {
      label: 'All',
    },
    {
      value: 'Individual Seller',
      label: 'Individual Seller',
    },
    {
      value: 'Company Seller',
      label: 'Company Seller',
    },
  ];
  return (
    <StyledTableHeader>
      <div className="head">
        {buyerSellerTabs && (
          <div className="btn-holder">
            <button className={tab === 1 ? 'active' : ''} onClick={() => handleTabs(1)}>
              Buyer
            </button>
            <button className={tab === 2 ? 'active' : ''} onClick={() => handleTabs(2)}>
              Seller
            </button>
          </div>
        )}
        <div className="actions">
          {tab === 1 ? (
            <>
              <div className="select-holder">
                <Select placeholder="Select KYC" options={kycData} labelReverse />
              </div>
              <div className="select-holder">
                <Select placeholder="Select KYC" options={statusData} />
              </div>
            </>
          ) : tab === 2 ? (
            <>
              <div className="select-holder">
                <Select placeholder="Select KYC" options={kycData} labelReverse />
              </div>
              <div className="select-holder">
                <Select placeholder="Select KYC" options={statusData} />
              </div>
              <div className="select-holder">
                <Select placeholder="Select Account type" options={accountTypeData} />
              </div>
            </>
          ) : (
            ''
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
                />
              </div>
            </div>
          )}
          {btnText && (
            <Button rounded width={btnWidth ? btnWidth : '100%'} sm btntype={btnType} onClick={openModal}>
              {btnText}
              {btnImg && <Image src={btnImg} alt="btnImg" />}
            </Button>
          )}
          {iconImg && (
            <div className="icon-div" onClick={openModal}>
              <Image src={iconImg} alt="iconImg" />
            </div>
          )}
        </div>
      </div>
    </StyledTableHeader>
  );
}

export default TableHeader;
