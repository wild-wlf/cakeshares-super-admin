import React from "react";
import logo from "../../../../public/assets/logo.svg";
import Image from "next/image";
import { Sidenav, NavLinks, LinkContainer, UserDet } from "./sideNav.style";
import Link from "next/link";
import SellerProfile from "../../../../public/assets/SellerProfile.png";
import { useRouter } from "next/router";

const SideBar = ({ data }) => {
  const { pathname } = useRouter();

  const closeSideNav = () => {
    document.body.classList.toggle("sideNav-active");
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div
        className="layer"
        onClick={() => {
          closeSideNav();
        }}
      />
      <Sidenav>
        <div className="nav-logo">
          <Image src={logo} alt="logo" />
        </div>

        <LinkContainer>
          {data.map((data, index) => {
            return (
              <NavLinks key={index}>
                <li className="listHead">{data.name}</li>
                {data.link.map((data, index) => {
                  return (
                    <li
                      className={`NavItem ${
                        pathname === `${data.navigation}` && "active"
                      }`}
                      key={index}
                    >
                      <Link className="Link" href={data.navigation}>
                        <figure className="iconCon">
                          <Image
                            src={data.icon}
                            width={18}
                            height={18}
                            alt="icon"
                          />
                        </figure>
                        {data.name}
                      </Link>
                    </li>
                  );
                })}
              </NavLinks>
            );
          })}
        </LinkContainer>

        <UserDet>
          <Image
            src={SellerProfile}
            height={40}
            width={40}
            alt="user-profile"
          />
          <div className="detailContainer">
            <span className="userName">Mickhel James</span>
            <span className="type">Super Admin</span>
          </div>
        </UserDet>
      </Sidenav>
    </>
  );
};

export default SideBar;
