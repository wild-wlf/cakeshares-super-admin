import React from "react";
import { StyledUserDetailModal } from "./UserDetailModal.styles";

const UserDetailModal = () => {
  return (
    <StyledUserDetailModal>
      <span className="heading">Personal Info:</span>
      <div className="product-info">
        <div className="col">
          <span className="heading">Full Name:</span>
          <span className="text">Alex Mertiz</span>
        </div>
        <div className="col">
          <span className="heading">Username:</span>
          <span className="text">alex123</span>
        </div>
        <div className="col">
          <span className="heading">Emial Address:</span>
          <span className="text">alex123@gmail.com</span>
        </div>
        <div className="col">
          <span className="heading">Country:</span>
          <span className="text">Turkey</span>
        </div>
        <div className="col">
          <span className="heading">Birthdate (D.O.B):</span>
          <span className="text">03/05/2024</span>
        </div>
      </div>
    </StyledUserDetailModal>
  );
};

export default UserDetailModal;
