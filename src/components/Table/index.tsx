import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import { SelectChangeEvent } from "@mui/material/Select";
import { Divider } from "@mui/material";
import * as _ from "lodash";

import TableHeader from "../TableHeader";

import products from "../../types/products.types.js";
import categories from "../../types/categories.types.js";
import units from "../../types/units.types.js";

import TableCustomBody from "../TableCustomBody";
import TableCustomFooter from "../PaginationFilter";
import TableCategoriesFilter from "../ProductCategoriesFilter";

import filtersTypes from "../../types/filters.types";
import FilterToolbar from "../FiltersToolbar";
import "./styles.css";
import useFilters from "../../hooks/useFilters";
import filterData from "../../utils/filterData";

interface props {
  dataHeader: { canSort: boolean; label: string; path: string }[];
  data: (products | categories | units)[];
  handleDelete?: (_id: string) => Promise<void>;
  categoryFilters?: categories[] | null;
  imagesBaseUrl?: string;
}

const CustomTable = ({
  data,
  dataHeader,
  categoryFilters,
  imagesBaseUrl,
  handleDelete,
}: props) => {
  const [filters, filtersDispatch] = useFilters();

  const [showFilters, setShowFilters] = React.useState<boolean>(false);

  const handleToggleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    filtersDispatch({
      type: "change-size",
      pageSize: event.target.value as unknown as number,
    });
  };

  const handlePageChange = (page: number) => {
    filtersDispatch({ type: "change-page", page });
  };

  const handleCategorySelect = (category: filtersTypes["selectedCategory"]) => {
    filtersDispatch({ type: "select-category", category });
  };

  const handleSearch = (query: string) => {
    filtersDispatch({ type: "search-query", query });
  };

  const handleSort = (sortColumn: filtersTypes["sortColumn"]) => {
    filtersDispatch({ type: "sort-by", sortInfo: sortColumn });
  };

  const { filtered, finalData } = filterData({ filters, data });

  return (
    <TableContainer
      component={Paper}
      className="test-table"
      sx={{ maxWidth: "85%", margin: "40px auto" }}
    >
      <FilterToolbar
        filters={filters}
        onSearch={handleSearch}
        onToggleShowFilters={handleToggleShowFilters}
        categoryFilters={categoryFilters}
      />

      <TableCategoriesFilter
        onCategorySelect={handleCategorySelect}
        selectedCategory={filters.selectedCategory}
        categoryFilters={categoryFilters}
        showFilters={showFilters}
      />

      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHeader
          data={dataHeader}
          onSort={handleSort}
          sortColumn={filters.sortColumn}
        />
        <TableCustomBody
          items={finalData}
          headers={dataHeader}
          imagesBaseUrl={imagesBaseUrl}
          onDelete={handleDelete}
        />
      </Table>

      <Divider sx={{ margin: "20px 0 10px" }} />

      <TableCustomFooter
        filtered={filtered}
        filters={filters}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        pageSize={filters.pageSize}
      />
    </TableContainer>
  );
};

export default CustomTable;
