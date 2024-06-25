import React from 'react';
import { DeleteModalWrapper } from './DeletePermissionModal.style';
import Button from '@/components/atoms/Button';
import { useContextHook } from 'use-context-hook';
import { AuthContext } from '@/context/authContext';
import adminService from '@/services/adminService';
import Toast from '@/components/molecules/Toast';

const DeleteAdminModal = ({ closeDeleteModal, openSuccessfulModal, admin }) => {
  const { refetch } = useContextHook(AuthContext, v => ({
    refetch: v.refetch,
  }));

  const handleDelete = async () => {
    try {
      const response = await adminService.deleteAdmin(admin._id);
      if (response) {
        openSuccessfulModal();
        refetch();
      }
    } catch (error) {
      Toast({ type: 'error', message: error.message });
    }
  };
  return (
    <DeleteModalWrapper>
      <div className="title-div">
        <h2>Delete Admin!</h2>
        <span>Are you sure you want to delete this Admin?</span>
      </div>
      <div className="btn-wrapper">
        <Button sm rounded btntype="cancel" onClick={closeDeleteModal}>
          No
        </Button>
        <Button sm rounded variant="danger" className="danger" onClick={handleDelete}>
          Yes, Delete
        </Button>
      </div>
    </DeleteModalWrapper>
  );
};

export default DeleteAdminModal;
