import { HelperClasses, Styling } from "@/styles/GlobalStyles.styles";
import { createGlobalStyle } from "styled-components";
import Variables from "../styles/variables.css";
import SideBar from "@/components/molecules/sideNav";
import { indivisualSellerNav } from "@/helpers/nav";
import { ChildWrapper, MainWrapper } from "@/styles/helpers.styles";

const GlobalStyles = createGlobalStyle`
  ${Variables}
  ${Styling}
  ${HelperClasses}
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <MainWrapper>
        <SideBar data={indivisualSellerNav} />
        <ChildWrapper>
          <Component {...pageProps} />
        </ChildWrapper>
      </MainWrapper>
    </>
  );
}
