import React from "react";
import { StyledTableCell, StyledTableRow } from "../TableCustomBody";
import Skeleton from "react-loading-skeleton";

type Props = {
  rows: number;
  headers: {
    path: string;
  }[];
};

const TableRowSkeleton = ({ rows, headers }: Props) => {
  const renderCells = (item: any) => {
    return headers.map((header, index) => {
      if (header.path === "image") {
        return (
          <StyledTableCell
            align="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton
              circle
              style={{
                width: 80,
                height: 80,
              }}
            />
          </StyledTableCell>
        );
      } else {
        return (
          <StyledTableCell align="center">
            <Skeleton />
          </StyledTableCell>
        );
      }
    });
  };
  return (
    <React.Fragment>
      {Array(rows)
        .fill(0)
        .map((row, index) => {
          return (
            <StyledTableRow sx={{ minHeight: "3rem" }} key={index}>
              {renderCells(row)}
            </StyledTableRow>
          );
        })}
    </React.Fragment>
  );
};

export default TableRowSkeleton;
