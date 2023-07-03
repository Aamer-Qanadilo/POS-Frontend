import { Box, Button, Divider, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import React from "react";
import CustomTable from "../../components/Table";

type Props = {};

const dataHeader = [
  { canSort: false, label: "Image", path: "image" },
  { canSort: true, label: "Name", path: "name" },
  { canSort: false, label: "Created At", path: "createdAt" },
  { canSort: false, label: "Updated At", path: "updatedAt" },
];

const data = [
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

const imagesBaseUrl = "http://localhost:3000/api/v1/uploads/categories/";

const Categories = (props: Props) => {
  React.useEffect(() => {
    document.title = "POS-Foothill | Categories Page";
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
        <Typography variant="h5">Categories</Typography>
        <Button
          variant="contained"
          color="primary"
          className="table__add-item-button"
        >
          <ControlPointIcon />{" "}
          <Typography variant="subtitle2">Add new Category</Typography>
        </Button>
      </Box>

      <Divider />

      <CustomTable
        data={data}
        dataHeader={dataHeader}
        imagesBaseUrl={imagesBaseUrl}
        handleDelete={handleDelete}
      ></CustomTable>
    </>
  );
};

export default Categories;
