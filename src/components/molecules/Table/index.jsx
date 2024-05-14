/* eslint-disable no-nested-ternary */

import React from 'react';
// eslint-disable-next-line no-unused-vars
import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
import { StyledTable, TableHolder, TBody, TableScroll, Thead, NoRecordFound } from './Table.styles';
import TableCell from '../../atoms/TableCell';
import TableRow from '../../atoms/TableRow/index';

// TODO:Remove nested ternary and add loading
function Table({
  loading,
  columnNames,
  rowsData,
  height,
  center,
  sm,
  headSm,
  onClick = () => {},
  noPadding,
  width,
  responsive = true,
  ...props
}) {
  return (
    <>
      <TableHolder responsive={responsive} noPadding={noPadding}>
        <TableScroll $height={height}>
          <StyledTable $width={width} responsive={responsive} {...props}>
            <Thead responsive={responsive}>
              <TableRow className="table-head" responsive={responsive}>
                {columnNames.map((item, index) => (
                  <TableCell responsive={responsive} heading key={index} center={center} headSm={headSm}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="separator">
                <th colSpan={10} />
              </TableRow>
            </Thead>
            <TBody responsive={responsive}>
              {loading ? (
                Array(10)
                  .fill()
                  .map((item, i) => (
                    <TableRow key={i} responsive={responsive}>
                      {columnNames?.map(index => (
                        <TableCell responsive={responsive} key={index}>
                          <Skeleton width={100} height={15} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : rowsData?.length ? (
                rowsData?.map((row, index) => (
                  <TableRow key={index} onClick={() => onClick(row)} responsive={responsive}>
                    {row?.map((el, i) => (
                      <TableCell responsive={responsive} data-th={columnNames[i]} key={i} center={center} sm={sm}>
                        {el}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <tr
                  css={`
                    @media (max-width: 991px) {
                      grid-column: span 2 / span 2;
                    }
                  `}>
                  <td
                    colSpan={columnNames?.length}
                    className="text-center"
                    css={`
                      @media (max-width: 991px) {
                        display: block;
                      }
                    `}>
                    <NoRecordFound>No Record Found</NoRecordFound>
                  </td>
                </tr>
              )}
            </TBody>
          </StyledTable>
        </TableScroll>
      </TableHolder>
    </>
  );
}

export default Table;
