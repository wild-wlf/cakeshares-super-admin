import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import userProfile from '../../../../public/assets/user-img.png';

const ReactionListModal = ({ reactionData }) => {
  const getProfilePicture = (img, img2) => {
    if (img === '' || img === 'undefined') {
      return img2;
    } else {
      return img;
    }
  };

  return (
    <Container>
      {reactionData && reactionData.length > 0
        ? reactionData.map((data, index) => {
            return (
              <Wrapper key={index}>
                <div className="userDets">
                  <Image
                    src={getProfilePicture(data?.senderId?._id?.profilePicture, userProfile)}
                    height={50}
                    width={50}
                    alt="profile"
                  />
                  <div className="info">
                    <h6>{data?.senderId?._id?.fullName || data?.senderId?._id?.username}</h6>
                    <span>{data?.senderId?._id?.type}</span>
                  </div>
                </div>
                <div className="reaction">
                  <span>{data?.reaction}</span>
                </div>
              </Wrapper>
            );
          })
        : 'No Reactions Available'}
    </Container>
  );
};

export default ReactionListModal;

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between !important;
  .userDets {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 6px;

      h6 {
        white-space: nowrap;
        font-size: 18px;
        font-weight: 500;
      }
      span {
        white-space: nowrap;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
  .reaction {
    span {
      font-size: 18px;
    }
  }
`;
