import React from "react";
import * as _ from "lodash";

import { Typography, Box, ButtonGroup, Button } from "@mui/material";

interface props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}: props) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        color="inherit"
        variant="outlined"
        aria-label="outlined button group"
      >
        {pages.map((page: number) => (
          <Button
            key={page}
            color={page === currentPage ? "primary" : "inherit"}
            variant={page === currentPage ? "contained" : "outlined"}
            // className={page === currentPage ? "page-item active" : "page-item"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </ButtonGroup>

      <Typography variant="caption" display="block">
        {(currentPage - 1) * pageSize + 1} -{" "}
        {currentPage * pageSize > itemsCount
          ? itemsCount
          : currentPage * pageSize}{" "}
        of {itemsCount}
      </Typography>
    </Box>
  );
};

export default Pagination;
