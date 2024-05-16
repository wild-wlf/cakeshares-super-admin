import { HelperClasses, Styling } from "@/styles/GlobalStyles.styles";
import { createGlobalStyle } from "styled-components";
import Variables from "../styles/variables.css";
import SideBar from "@/components/molecules/sideNav";
import { indivisualSellerNav } from "@/helpers/nav";

const GlobalStyles = createGlobalStyle`
  ${Variables}
  ${Styling}
  ${HelperClasses}
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <SideBar data={indivisualSellerNav} />
      <Component {...pageProps} />
    </>
  );
}
