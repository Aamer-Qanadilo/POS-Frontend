import React from "react";
import CustomTable from "../../components/Table";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

type Props = {};

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

const categories = [
  {
    _id: "64983663cc92332d0625412e",
    name: "test",
    image: "KgD6mxK7MSqKcH0HimS6_1687696995063_test.jpg",
    createdAt: "2023-06-25T12:43:15.072Z",
    updatedAt: "2023-06-25T12:43:15.072Z",
    __v: 0,
  },
  {
    _id: "649ae6234a3247a6756ae5de",
    name: "test",
    image: "aAkOm2RteKQB-SJKIzaua1687873059789_test.jpg",
    createdAt: "2023-06-27T13:37:39.794Z",
    updatedAt: "2023-06-27T13:37:39.794Z",
    __v: 0,
  },
  {
    _id: "649af79e85c8b3f06500f37d",
    name: "test",
    image:
      "ZqWfpMM_6vgSt42jhJzek1687877534210_chat.openai.com_c_d357beb6-2ac1-4d1b-8e1d-f05ea957f935(nest-hub).png",
    createdAt: "2023-06-27T14:52:14.221Z",
    updatedAt: "2023-06-27T14:52:14.221Z",
    __v: 0,
  },
  {
    _id: "649af8b585c8b3f06500f380",
    name: "test",
    image:
      "-MXrYi9IXA26sHgT-W56y1687877813270_icons8-level-up-your-coding-skills-and-quickly-land-a-job-24.png",
    createdAt: "2023-06-27T14:56:53.272Z",
    updatedAt: "2023-06-27T14:56:53.272Z",
    __v: 0,
  },
];

const imagesBaseUrl = "http://localhost:3000/api/v1/uploads/products/";

const Products = (props: Props) => {
  React.useEffect(() => {
    document.title = "POS-Foothill | Products Page";
  }, []);

  const handleDelete = async (_id: string) => {};

  return (
    <>
      <Box
        padding="25px 25px 15px"
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

      <CustomTable
        data={data}
        dataHeader={dataHeader}
        categoryFilters={categories}
        imagesBaseUrl={imagesBaseUrl}
        handleDelete={handleDelete}
      ></CustomTable>
    </>
  );
};

export default Products;
