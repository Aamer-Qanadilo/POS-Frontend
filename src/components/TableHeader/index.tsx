import React from "react";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Box, TableSortLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

import "./styles.css";
interface sortType {
  path: string;
  order: "asc" | "desc";
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

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    padding: "20px 0",
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
          return (
            <StyledTableCell
              key={item.path}
              align="center"
              onClick={() => (item.canSort ? raiseSort(item.path) : null)}
              className={`table__header-cell ${
                item.canSort ? "table__header-cell_sortable" : ""
              }`}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                className={
                  item.path === sortColumn.path
                    ? "table__header-cell_selected"
                    : ""
                }
              >
                {item.label} {item.canSort ? renderSortIcon(item) : null}
              </Box>
            </StyledTableCell>
          );
        })}
        <StyledTableCell
          key={"action"}
          align="center"
          className="table__header-cell"
        >
          Actions
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
