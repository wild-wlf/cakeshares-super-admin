/* eslint-disable jsx-a11y/no-onchange */
import React from "react";

// eslint-disable-next-line no-unused-vars
import { useMediaPredicate } from "react-media-hook";
import {
  StyledTableHeader,
  TotalResult,
  ResultPerPage,
  StyledSelect,
} from "./TableHeader.styles";
import Field from "@/components/molecules/Field";
import { CiSearch } from "react-icons/ci";
import Button from "../Button";
import Image from "next/image";
import { useState } from "react";

function TableHeader({
  exportBtn,
  createBtn,
  total,
  resultPerPage,
  setPageSize,
  page,
  tableHeading,
  placeholder,
  btnText,
  btnWidth,
  btnType,
  btnImg,
  openModal,
  iconImg,
  buyerSellerTabs,
}) {
  const MinWidth992 = useMediaPredicate("(min-width: 992px)");
  const resultPerPageOptions = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];
  const [tab, setTab] = useState(1);
  function handleTabs(index) {
    setTab(index);
  }

  return (
    <StyledTableHeader>
      <div className="head">
        {tableHeading && (
          <strong className="table-heading">{tableHeading}</strong>
        )}
        {buyerSellerTabs && (
          <div className="btn-holder">
            <button
              className={tab === 1 ? "active" : ""}
              onClick={() => handleTabs(1)}>
              Buyer
            </button>
            <button
              className={tab === 2 ? "active" : ""}
              onClick={() => handleTabs(2)}>
              Seller
            </button>
          </div>
        )}
        <div className="actions">
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
            <Button
              rounded
              width={btnWidth ? btnWidth : "100%"}
              sm
              btntype={btnType}
              onClick={openModal}>
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
