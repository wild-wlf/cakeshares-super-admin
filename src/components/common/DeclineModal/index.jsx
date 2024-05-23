import React from 'react';
import { StyledDeclineModal } from './DeclineModal.styles';
import Button from '@/components/atoms/Button';

const DeclineModal = ({ onClose, title = 'Decline Request!', btnText = 'Yes, Decline' }) => {
  return (
    <StyledDeclineModal>
      <span className="heading">{title}</span>
      <div className="text">
        <p>Please provide a reason for the user to know why his request have been declined.</p>
      </div>
      <textarea placeholder="Write Reason..." />
      <Button variant="danger" width="250" onClick={onClose}>
        {btnText}
      </Button>
    </StyledDeclineModal>
  );
};

export default DeclineModal;
