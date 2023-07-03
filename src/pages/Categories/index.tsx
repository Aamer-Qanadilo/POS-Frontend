import { Box, Button, Divider, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import React from "react";
import CustomTable from "../../components/Table";
import { CategoryContext } from "../../Contexts/CategoryContext";
import { LoaderContext } from "../../Contexts/LoaderContext";
import { UserContext } from "../../Contexts/UserContext";

type Props = {};

const dataHeader = [
  { canSort: false, label: "Image", path: "image" },
  { canSort: true, label: "Name", path: "name" },
  { canSort: false, label: "Created At", path: "createdAt" },
  { canSort: false, label: "Updated At", path: "updatedAt" },
];

const Categories = (props: Props) => {
  const { user } = React.useContext(UserContext);
  const {
    categories,
    categoryImageBaseUrl,
    handleFetchCategories,
    handleDeleteCategory,
  } = React.useContext(CategoryContext);
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const handleFetchData = async () => {
    if (user) {
      if (
        typeof handleFetchCategories !== "undefined" &&
        categories.length === 0
      ) {
        await handleFetchCategories();
      }
    }

    stopLoader();
  };

  React.useEffect(() => {
    document.title = "POS-Foothill | Categories Page";
    startLoader();
    handleFetchData();
  }, []);

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
        data={categories}
        dataHeader={dataHeader}
        imagesBaseUrl={categoryImageBaseUrl}
        handleDelete={handleDeleteCategory}
      ></CustomTable>
    </>
  );
};

export default Categories;
