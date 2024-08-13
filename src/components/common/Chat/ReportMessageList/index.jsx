import React, { useState } from 'react';
import { StyledChatMessage, MessageContainer } from './ReportMessageList.style';
import InfoIcon from '../../../../../public/assets/infoIcon.png';
import { format } from 'date-fns';
import RenderTextMessage from '../ChatMessage/renderTextMessage';
import MenuButton, { MenuItem } from '../../../molecules/Menu/index';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineReport } from 'react-icons/md';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import DeleteMessageModal from '@/components/molecules/DeleteMessageModal';
import BlockUserModal from '@/components/molecules/BlockUserModal';
import Pic from '../../../../../public/assets/user-img.png';
import Image from 'next/image';

const ReportMessagesList = ({ detail, type, warningColor, reportMessageId,handleDeleteMessage }) => {
  const [deleteMessageModal, setDeleteMessageModal] = useState(false);
  const [blockUserModal, setBlockUserModal] = useState(false);

  return (
    <>
      {/* deleting message */}
      <CenterModal open={deleteMessageModal} setOpen={setDeleteMessageModal} headImage={InfoIcon} width="543">
        <DeleteMessageModal
          closeDeleteModal={() => {
            setDeleteMessageModal(false);
          }}
          messageId={detail?._id}
          handleDeleteMessage={handleDeleteMessage}
        />
      </CenterModal>
      {/*  blocking user */}
      <CenterModal open={blockUserModal} setOpen={setBlockUserModal} headImage={InfoIcon} width="543">
        <BlockUserModal
          closeDeleteModal={() => {
            setBlockUserModal(false);
          }}
          messageUserId={detail?.author?._id?._id}
          messageUserType={detail?.author?.model_type}
          reportMessageId={reportMessageId}
        />
      </CenterModal>

      <StyledChatMessage $type={type} $wraning={warningColor}>
        <div className="message-holder">
          <MessageContainer>
            {/* {warningColor && <>Ghous</>} */}
            <div className="user-img-name">
              <div className="img-holder">
                <Image src={detail?.author?._id?.profilePicture || Pic} alt="user-pic" width={25} height={25} />
              </div>
              <span className="user-name">
                {detail?.author?._id?.fullName || detail?.author?._id?.username} (
                {detail?.author?._id?.type === 'Buyer'
                  ? 'Buyer'
                  : detail?.author?._id?.isIndividualSeller
                  ? 'Individual Seller'
                  : detail?.author?._id?.type === undefined
                  ? 'Admin'
                  : 'Company Seller'}
                )
              </span>{' '}
            </div>
            <div className="message-action-holder">
              <div className="message">
                <p>
                  <RenderTextMessage text={detail?.content} />
                </p>
              </div>
              <MenuButton
                icon={
                  <span>
                    <BsThreeDotsVertical />
                  </span>
                }>
                <MenuItem onClick={() => setDeleteMessageModal(true)} icon={<MdOutlineReport size={20} />}>
                  Delete Message
                </MenuItem>
                <MenuItem disable={detail?.author?._id?.status === "Suspended"}  onClick={() => setBlockUserModal(true)}  icon={<MdOutlineReport size={20} />}>
                  Block User
                </MenuItem>
              </MenuButton>
            </div>
          </MessageContainer>
          {detail?.created_at && (
            <div className="time-holder">
              <span>{format(detail?.created_at, 'yyyy-MM-dd, hh:mma')}</span>
              <div className="icon"></div>
            </div>
          )}
        </div>
      </StyledChatMessage>
    </>
  );
};

export default ReportMessagesList;
