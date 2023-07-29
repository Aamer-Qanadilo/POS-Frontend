import React from "react";

import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import Pagination from "./components/Pagination";

import products from "../../types/products.types.js";
import categories from "../../types/categories.types.js";
import units from "../../types/units.types.js";

import "./styles.css";

type Props = {
  filters: {
    currentPage: number;
    searchQuery: string;
    selectedCategory: {
      _id: string;
      name: string;
      image: string;
    } | null;
    sortColumn: { path: string; order: boolean | "asc" | "desc" };
  };
  filtered: (products | categories | units)[];
  pageSize: number;
  handlePageSizeChange: (event: SelectChangeEvent) => void;
  handlePageChange: (page: number) => void;
};

const PaginationFilter = ({
  filters,
  filtered,
  pageSize,
  handlePageSizeChange,
  handlePageChange,
}: Props) => {
  return (
    <Box component="div" className="pagination">
      <Box component="div" className="pagination__page-size">
        <InputLabel id="page-size__label">Page Size</InputLabel>

        <Select
          labelId="page-size__label"
          id="page-size__select"
          value={pageSize as unknown as string}
          label="Page Size"
          variant="standard"
          onChange={handlePageSizeChange}
        >
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={25}>Twenty Five</MenuItem>
          <MenuItem value={50}>Fifty</MenuItem>
        </Select>
      </Box>

      <Pagination
        itemsCount={filtered.length}
        pageSize={pageSize}
        currentPage={filters.currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default PaginationFilter;
