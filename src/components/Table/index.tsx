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
import paginate from "../../utils/pagination";
import TableCustomFooter from "../PaginationFilter";
import TableCategoriesFilter from "../ProductCategoriesFilter";

import filtersTypes from "../../types/filters.types";
import FilterToolbar from "../FiltersToolbar";
import "./styles.css";

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
  const [filters, setFilters] = React.useState<filtersTypes>({
    currentPage: 1,
    searchQuery: "",
    selectedCategory: null,
    sortColumn: { path: "name", order: "asc" },
  });

  const [pageSize, setPageSize] = React.useState<number>(3);
  const [showFilters, setShowFilters] = React.useState<boolean>(false);

  const handleToggleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    setPageSize(event.target.value as unknown as number);
    setFilters({
      ...filters,
      currentPage: 1,
    });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, currentPage: page });
  };

  const handleCategorySelect = (category: filtersTypes["selectedCategory"]) => {
    setFilters({
      ...filters,
      currentPage: 1,
      searchQuery: "",
      selectedCategory: category,
    });
  };

  const handleSearch = (query: string) => {
    setFilters({
      ...filters,
      currentPage: 1,
      searchQuery: query,
      selectedCategory: null,
    });
  };

  const handleSort = (sortColumn: filtersTypes["sortColumn"]) => {
    console.log(sortColumn);
    setFilters({
      ...filters,
      sortColumn: sortColumn,
      currentPage: 1,
    });
  };

  let filtered = data;
  if (filters.searchQuery)
    filtered = data.filter(
      (d) =>
        d.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        ("code" in d &&
          d.code.toLowerCase().includes(filters.searchQuery.toLowerCase())),
    );
  else if (filters.selectedCategory && filters.selectedCategory)
    filtered = data.filter(
      (d) =>
        "category" in d && d.category._id === filters.selectedCategory?._id,
    );

  const sorted = _.orderBy(
    filtered,
    [filters.sortColumn.path],
    [filters.sortColumn.order],
  );

  const finalData = paginate(sorted, filters.currentPage, pageSize);

  return (
    <TableContainer
      component={Paper}
      className="test-table"
      sx={{ width: "80%", margin: "40px auto" }}
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
        pageSize={pageSize}
      />
    </TableContainer>
  );
};

export default CustomTable;
