import React from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { ModalHolder } from './ApproveUserModa.styles';
import arrowImg from '../../../../public/assets/half-white-arrow.svg';
import approveUser from '../../../../public/assets/approve-user.png';
import declineUser from '../../../../public/assets/decline-user.png';
import Button from '../../atoms/Button';

const ActiveUserModal = ({ type, handleClick }) => (
  <ModalHolder>
    <span className="heading">{type} User</span>
    <div className="img-holder">
      <img
        src={type === 'Approve' ? approveUser : declineUser}
        alt={type === 'Approve' ? 'ApproveImg' : 'DeclineImg'}
      />
    </div>
    <strong className="heading-2">Want to {type} this User!</strong>
    <span className="text">Are you sure you want to {type} this User?</span>
    <div className="btn-holder">
      <Button type="access" rounded width="290" onClick={handleClick}>
        Activate {type}
        <img src={arrowImg} alt="arrow" />
      </Button>
    </div>
  </ModalHolder>
);

export default ActiveUserModal;
