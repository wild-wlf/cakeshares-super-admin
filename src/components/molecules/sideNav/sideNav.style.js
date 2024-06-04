import styled from 'styled-components';

export const Sidenav = styled.div`
  position: fixed;
  left: -100%;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 50px;
  background-color: var(--green);
  width: 250px;
  padding: 30px 20px 30px 30px;
  height: 100%;
  z-index: 50;
  transition: left 0.3s ease-in-out;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  /* box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); */
  @media (min-width: 992px) {
    left: 0;
    gap: 30px;
  }
  @media (min-width: 1200px) {
    gap: 50px;
    width: 270px;
  }

  .sideNav-active & {
    left: 0 !important;
  }

  .nav-logo {
    max-width: 176px;
    img {
      max-width: 176px;
      height: auto;
    }
  }
  .aside-active & {
    display: block;
  }
`;

export const NavLinks = styled.ul`
  padding-right: 10px;
  margin-bottom: 20px;
  .listHead {
    font-size: 14px;
    font-weight: 400;
    color: var(--white);
  }

  .NavItem {
    cursor: pointer;
    border-radius: 100px;
    margin-top: 17px;
    transition: 0.5s all ease-in-out;
    .Link {
      max-width: 220px;
      width: 100%;
      padding: 0px 20px 0 0;
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: flex-start;
      font-size: 14px;
      font-weight: 300;
      color: var(--white);
      position: relative;
    }
    .iconCon {
      height: 45px;
      width: 45px;
      display: flex;
      padding: 3px;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transition: 0.5s all ease-in-out;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      .Link {
        color: var(--white);
      }
    }
  }
  .active {
    background-color: rgba(255, 255, 255, 0.2);

    .Link {
      color: var(--white);
    }
  }
`;

export const LinkContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export const UserDet = styled.div`
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  gap: 10px;
  color: var(--white);
  @media (min-width: 1200px) {
    padding: 10px 17px;
  }
  img {
    border-radius: 50%;
  }
  .detailContainer {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .userName {
    font-size: 14px;
    font-weight: 400;
  }
  .type {
    font-size: 12px;
    font-weight: 300;
  }
  .date {
    font-size: 10px;
    font-weight: 300;
  }
`;
