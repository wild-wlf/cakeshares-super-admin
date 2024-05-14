import styled, { css } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styles } from "../../atoms/Input/Input.styles";

export const StyledDateRange = styled(DatePicker)`
  ${styles}
  padding-left: ${({ prefix }) => prefix && "2.5rem"};
  padding-right: ${({ $suffix }) => {
    if ($suffix) return "2.5rem";
    return "2rem";
  }};
  ${({ inline }) =>
    inline &&
    css`
      .react-datepicker {
        box-shadow: none !important;
      }
    `};
`;

export const ButtonHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
`;
