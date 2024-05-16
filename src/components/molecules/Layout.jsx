import { ChildWrapper, MainWrapper } from "@/styles/helpers.styles";
import React from "react";
import SideBar from "./sideNav";
import { indivisualSellerNav } from "@/helpers/nav";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      {router.pathname !== "/sign-in" ? (
        <>
          <MainWrapper>
            <SideBar data={indivisualSellerNav} />
            <ChildWrapper>{children}</ChildWrapper>
          </MainWrapper>
        </>
      ) : (
        children
      )}
    </>
  );
};

export default Layout;
