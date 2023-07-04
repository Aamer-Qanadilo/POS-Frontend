import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import { SelectChangeEvent } from "@mui/material/Select";
import { Box, Button, Container, Divider, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import * as _ from "lodash";

import TableHeader from "../TableHeader";

import products from "../../types/products.types.js";
import categories from "../../types/categories.types.js";
import units from "../../types/units.types.js";

import TableCustomBody from "../TableCustomBody";
import paginate from "../../utils/pagination";
import "./styles.css";
import TableCustomFooter from "../TableCustomFooter";
import TableCategories from "../TableCategories";

interface props {
  dataHeader: { canSort: boolean; label: string; path: string }[];
  data: (products | categories | units)[];
  handleDelete?: (_id: string) => Promise<void>;
  categoryFilters?: categories[] | null;
  imagesBaseUrl?: string;
}

interface filtersTypes {
  currentPage: number;
  searchQuery: string;
  selectedCategory: {
    _id: string;
    name: string;
    image: string;
  } | null;
  sortColumn: { path: string; order: boolean | "asc" | "desc" };
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
    <TableContainer component={Paper}>
      <Container maxWidth="md">
        <Box component="div" className="table-filters">
          {categoryFilters && (
            <Button color="inherit" onClick={handleToggleShowFilters}>
              <FilterListIcon
                fontSize="large"
                className="table-filters__icon"
              />
            </Button>
          )}
          <Box
            component="div"
            className="search-form table-filters__search-form"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="searchQuery"
              type="search"
              id="searchQuery"
              placeholder="Search by Name or Code"
              onChange={(event) => handleSearch(event?.target.value)}
              value={filters.searchQuery}
              className="search-form__textfield"
            />
            <label htmlFor="searchQuery" className="search-form__label">
              <SearchIcon />
            </label>
          </Box>
        </Box>
      </Container>

      <TableCategories
        onCategorySelect={handleCategorySelect}
        selectedCategory={filters.selectedCategory}
        categoryFilters={categoryFilters}
        showFilters={showFilters}
      />

      <Divider sx={{ margin: "10px 0" }} />

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
