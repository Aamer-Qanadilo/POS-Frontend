import React from "react";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import "./styles.css";
interface sortType {
  path: string;
  order: boolean | "asc" | "desc";
}

type Props = {
  data: {
    canSort: boolean;
    label: string;
    path: string;
  }[];
  onSort?: (sortColumn: sortType) => void;
  sortColumn: sortType;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TableHeader({ data, onSort, sortColumn }: Props) {
  const raiseSort = (path: string) => {
    const sortColumnTemp = { ...sortColumn };
    if (sortColumnTemp.path === path)
      sortColumnTemp.order = sortColumnTemp.order === "asc" ? "desc" : "asc";
    else {
      sortColumnTemp.path = path;
      sortColumnTemp.order = "asc";
    }

    if (typeof onSort !== "undefined") {
      onSort(sortColumnTemp);
    }
  };

  const renderSortIcon = (column: Props["data"][0]) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <KeyboardArrowUpIcon></KeyboardArrowUpIcon>;
    return <KeyboardArrowDownIcon></KeyboardArrowDownIcon>;
  };

  return (
    <TableHead>
      <TableRow className="table__header">
        {data?.map((item) => {
          return item.canSort ? (
            <TableCell
              key={item.path}
              align="center"
              onClick={() => raiseSort(item.path)}
              className="table__header-cell table__header-cell_sortable"
            >
              <Box
                sx={{
                  display: "flex",
                  color: "#1976d2",
                  justifyContent: "center",
                }}
              >
                {item.label} {renderSortIcon(item)}
              </Box>
            </TableCell>
          ) : (
            <TableCell
              key={item.path}
              align="center"
              className="table__header-cell"
            >
              {item.label}
            </TableCell>
          );
        })}
        <TableCell key={"action"} align="center" className="table__header-cell">
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
