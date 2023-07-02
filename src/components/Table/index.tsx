import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, Divider, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import TableHeader from "../TableHeader";
import Pagination from "../Pagination";

import * as _ from "lodash";

import "./styles.css";
import CustomTableBody from "../TableCustomBody";
import paginate from "../../utils/pagination";

const dataHeader = [
  { canSort: false, label: "Image", path: "image" },
  { canSort: true, label: "Name", path: "name" },
  { canSort: true, label: "Code", path: "code" },
  { canSort: true, label: "Price", path: "price" },
  { canSort: false, label: "Unit of measure", path: "unitOfMeasure" },
  { canSort: false, label: "Category", path: "category" },
];

const data = [
  {
    _id: "649968814bd4eb8088980eca",
    name: "test",
    code: "123123",
    category: {
      _id: "64983663cc92332d0625412e",
      name: "test",
      image: "KgD6mxK7MSqKcH0HimS6_1687696995063_test.jpg",
      createdAt: "2023-06-25T12:43:15.072Z",
      updatedAt: "2023-06-25T12:43:15.072Z",
      __v: 0,
    },
    image: "nWARrImfRMSsxNdhtaHoA1687775361279_test.jpg",
    price: 1000,
    unitOfMeasure: {
      _id: "64980b4959aa2e2c8ff9a7ca",
      name: "centimeter",
      baseUnit: "meter",
      conversionFactor: 0.01,
      createdAt: "2023-06-25T09:39:21.861Z",
      updatedAt: "2023-06-25T09:39:21.861Z",
      __v: 0,
    },
    createdAt: "2023-06-26T10:29:21.294Z",
    updatedAt: "2023-06-26T10:29:21.294Z",
    __v: 0,
  },
  {
    _id: "649968814bd4eb8088980ed1",
    name: "test",
    code: "123123",
    category: {
      _id: "64983663cc92332d0625412e",
      name: "test",
      image: "KgD6mxK7MSqKcH0HimS6_1687696995063_test.jpg",
      createdAt: "2023-06-25T12:43:15.072Z",
      updatedAt: "2023-06-25T12:43:15.072Z",
      __v: 0,
    },
    image: "bG_XLsYv1UvBDv2KA4czx1687775361892_test.jpg",
    price: 1000,
    unitOfMeasure: {
      _id: "64980b4959aa2e2c8ff9a7ca",
      name: "centimeter",
      baseUnit: "meter",
      conversionFactor: 0.01,
      createdAt: "2023-06-25T09:39:21.861Z",
      updatedAt: "2023-06-25T09:39:21.861Z",
      __v: 0,
    },
    createdAt: "2023-06-26T10:29:21.905Z",
    updatedAt: "2023-06-26T10:29:21.905Z",
    __v: 0,
  },
  {
    _id: "64996b49bf81943069607733",
    name: "test",
    code: "123123",
    category: {
      _id: "64983663cc92332d0625412e",
      name: "test",
      image: "KgD6mxK7MSqKcH0HimS6_1687696995063_test.jpg",
      createdAt: "2023-06-25T12:43:15.072Z",
      updatedAt: "2023-06-25T12:43:15.072Z",
      __v: 0,
    },
    image: "E_bbz1U76jq2Og7G504Rs1687776073209_test.jpg",
    price: 1000,
    unitOfMeasure: {
      _id: "64980b4959aa2e2c8ff9a7ca",
      name: "centimeter",
      baseUnit: "meter",
      conversionFactor: 0.01,
      createdAt: "2023-06-25T09:39:21.861Z",
      updatedAt: "2023-06-25T09:39:21.861Z",
      __v: 0,
    },
    createdAt: "2023-06-26T10:41:13.225Z",
    updatedAt: "2023-06-26T10:41:13.225Z",
    __v: 0,
  },
  {
    _id: "64a111f9629db862c0210ad2",
    name: "test12",
    code: "123123",
    category: {
      _id: "64983663cc92332d0625412e",
      name: "test",
      image: "KgD6mxK7MSqKcH0HimS6_1687696995063_test.jpg",
      createdAt: "2023-06-25T12:43:15.072Z",
      updatedAt: "2023-06-25T12:43:15.072Z",
      __v: 0,
    },
    image: "SHGErZskVb3MvUMvu-U4d1688277497108_test.jpg",
    price: 1000,
    unitOfMeasure: {
      _id: "64980b4959aa2e2c8ff9a7ca",
      name: "centimeter",
      baseUnit: "meter",
      conversionFactor: 0.01,
      createdAt: "2023-06-25T09:39:21.861Z",
      updatedAt: "2023-06-25T09:39:21.861Z",
      __v: 0,
    },
    createdAt: "2023-07-02T05:58:17.133Z",
    updatedAt: "2023-07-02T05:58:17.133Z",
    __v: 0,
  },
  {
    _id: "64a111fb629db862c0210ada",
    name: "test1234",
    code: "123123",
    category: {
      _id: "64983663cc92332d0625412e",
      name: "test",
      image: "KgD6mxK7MSqKcH0HimS6_1687696995063_test.jpg",
      createdAt: "2023-06-25T12:43:15.072Z",
      updatedAt: "2023-06-25T12:43:15.072Z",
      __v: 0,
    },
    image: "omg9VCROCkbrFsQ4-2hlR1688277499648_test.jpg",
    price: 1000,
    unitOfMeasure: {
      _id: "64980b4959aa2e2c8ff9a7ca",
      name: "centimeter",
      baseUnit: "meter",
      conversionFactor: 0.01,
      createdAt: "2023-06-25T09:39:21.861Z",
      updatedAt: "2023-06-25T09:39:21.861Z",
      __v: 0,
    },
    createdAt: "2023-07-02T05:58:19.662Z",
    updatedAt: "2023-07-02T05:58:19.662Z",
    __v: 0,
  },
  {
    _id: "64a111ff629db862c0210ae2",
    name: "test123445",
    code: "123123",
    category: {
      _id: "64983663cc92332d0625412e",
      name: "test",
      image: "KgD6mxK7MSqKcH0HimS6_1687696995063_test.jpg",
      createdAt: "2023-06-25T12:43:15.072Z",
      updatedAt: "2023-06-25T12:43:15.072Z",
      __v: 0,
    },
    image: "i-jxarYnK0n74wDKOBWPO1688277503300_test.jpg",
    price: 1000,
    unitOfMeasure: {
      _id: "64980b4959aa2e2c8ff9a7ca",
      name: "centimeter",
      baseUnit: "meter",
      conversionFactor: 0.01,
      createdAt: "2023-06-25T09:39:21.861Z",
      updatedAt: "2023-06-25T09:39:21.861Z",
      __v: 0,
    },
    createdAt: "2023-07-02T05:58:23.318Z",
    updatedAt: "2023-07-02T05:58:23.318Z",
    __v: 0,
  },
  {
    _id: "64a11201629db862c0210aea",
    name: "test12344512",
    code: "123123",
    category: {
      _id: "64983663cc92332d0625412e",
      name: "test",
      image: "KgD6mxK7MSqKcH0HimS6_1687696995063_test.jpg",
      createdAt: "2023-06-25T12:43:15.072Z",
      updatedAt: "2023-06-25T12:43:15.072Z",
      __v: 0,
    },
    image: "TL9QoQvRdJ03anJWoBmlo1688277505697_test.jpg",
    price: 1000,
    unitOfMeasure: {
      _id: "64980b4959aa2e2c8ff9a7ca",
      name: "centimeter",
      baseUnit: "meter",
      conversionFactor: 0.01,
      createdAt: "2023-06-25T09:39:21.861Z",
      updatedAt: "2023-06-25T09:39:21.861Z",
      __v: 0,
    },
    createdAt: "2023-07-02T05:58:25.712Z",
    updatedAt: "2023-07-02T05:58:25.712Z",
    __v: 0,
  },
  {
    _id: "64a11204629db862c0210af2",
    name: "test123445122",
    code: "123123",
    category: {
      _id: "64983663cc92332d0625412e",
      name: "test",
      image: "KgD6mxK7MSqKcH0HimS6_1687696995063_test.jpg",
      createdAt: "2023-06-25T12:43:15.072Z",
      updatedAt: "2023-06-25T12:43:15.072Z",
      __v: 0,
    },
    image: "sZNZ6KU1S7unR0uMm8T921688277508334_test.jpg",
    price: 1000,
    unitOfMeasure: {
      _id: "64980b4959aa2e2c8ff9a7ca",
      name: "centimeter",
      baseUnit: "meter",
      conversionFactor: 0.01,
      createdAt: "2023-06-25T09:39:21.861Z",
      updatedAt: "2023-06-25T09:39:21.861Z",
      __v: 0,
    },
    createdAt: "2023-07-02T05:58:28.348Z",
    updatedAt: "2023-07-02T05:58:28.348Z",
    __v: 0,
  },
  {
    _id: "64a136a1270aa686398ffb5c",
    name: "aamer1",
    code: "4343698",
    category: {
      _id: "64983663cc92332d0625412e",
      name: "test",
      image: "KgD6mxK7MSqKcH0HimS6_1687696995063_test.jpg",
      createdAt: "2023-06-25T12:43:15.072Z",
      updatedAt: "2023-06-25T12:43:15.072Z",
      __v: 0,
    },
    image: "6DoHxpoeC1se3Q9kA0CSu1688286881915_test.jpg",
    price: 25000,
    unitOfMeasure: {
      _id: "64980b4959aa2e2c8ff9a7ca",
      name: "centimeter",
      baseUnit: "meter",
      conversionFactor: 0.01,
      createdAt: "2023-06-25T09:39:21.861Z",
      updatedAt: "2023-06-25T09:39:21.861Z",
      __v: 0,
    },
    createdAt: "2023-07-02T08:34:41.951Z",
    updatedAt: "2023-07-02T08:34:41.951Z",
    __v: 0,
  },
  {
    _id: "64a136b8270aa686398ffb66",
    name: "aamer",
    code: "4343698",
    category: {
      _id: "64983663cc92332d0625412e",
      name: "test",
      image: "KgD6mxK7MSqKcH0HimS6_1687696995063_test.jpg",
      createdAt: "2023-06-25T12:43:15.072Z",
      updatedAt: "2023-06-25T12:43:15.072Z",
      __v: 0,
    },
    image: "FEqih0c0XFFE2QJ7GGoAd1688286904659_test.jpg",
    price: 20000,
    unitOfMeasure: {
      _id: "64980b4959aa2e2c8ff9a7ca",
      name: "centimeter",
      baseUnit: "meter",
      conversionFactor: 0.01,
      createdAt: "2023-06-25T09:39:21.861Z",
      updatedAt: "2023-06-25T09:39:21.861Z",
      __v: 0,
    },
    createdAt: "2023-07-02T08:35:04.677Z",
    updatedAt: "2023-07-02T08:35:04.677Z",
    __v: 0,
  },
];

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

const CustomTable = () => {
  const [filters, setFilters] = React.useState<filtersTypes>({
    currentPage: 1,
    searchQuery: "",
    selectedCategory: null,
    sortColumn: { path: "name", order: "asc" },
  });

  const [pageSize, setPageSize] = React.useState<number>(3);

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    setPageSize(event.target.value as unknown as number);
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, currentPage: page });
  };

  const handleGenreSelect = (category: filtersTypes["selectedCategory"]) => {
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
        d.code.toLowerCase().includes(filters.searchQuery.toLowerCase()),
    );
  else if (filters.selectedCategory && filters.selectedCategory)
    filtered = data.filter(
      (d) => d.category._id === filters.selectedCategory?._id,
    );

  const sorted = _.orderBy(
    filtered,
    [filters.sortColumn.path],
    [filters.sortColumn.order],
  );

  const finalData = paginate(sorted, filters.currentPage, pageSize);

  return (
    <>
      <Box
        padding="5px 10px"
        flexDirection="row"
        sx={{
          boxSizing: "border-box",
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: "20px",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5">Products</Typography>
        <Button
          variant="contained"
          color="primary"
          className="table__add-item-button"
        >
          <ControlPointIcon />{" "}
          <Typography variant="subtitle2">Add new Product</Typography>
        </Button>
      </Box>

      <Divider />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHeader
            data={dataHeader}
            onSort={handleSort}
            sortColumn={filters.sortColumn}
          />
          <CustomTableBody items={finalData} headers={dataHeader} />
        </Table>

        <Divider sx={{ margin: "20px 0 10px" }} />

        <Box
          textAlign="center"
          padding="5px 10px"
          flexDirection="row"
          sx={{
            boxSizing: "border-box",
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          <Box
            flexDirection="row"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
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
      </TableContainer>
    </>
  );
};

export default CustomTable;
