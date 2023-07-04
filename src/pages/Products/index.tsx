import React from "react";
import CustomTable from "../../components/Table";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { UserContext } from "../../Contexts/UserContext";
import { ProductContext } from "../../Contexts/ProductContext";
import { CategoryContext } from "../../Contexts/CategoryContext";
import { LoaderContext } from "../../Contexts/LoaderContext";
import { Link } from "react-router-dom";

type Props = {};

const dataHeader = [
  { canSort: false, label: "Image", path: "image" },
  { canSort: true, label: "Name", path: "name" },
  { canSort: true, label: "Code", path: "code" },
  { canSort: true, label: "Price", path: "price" },
  { canSort: false, label: "Unit of measure", path: "unitOfMeasure" },
  { canSort: false, label: "Category", path: "category" },
];

const Products = (props: Props) => {
  const { user } = React.useContext(UserContext);
  const {
    products,
    productImageBaseUrl,
    handleFetchProducts,
    handleDeleteProduct,
  } = React.useContext(ProductContext);
  const { categories, handleFetchCategories } =
    React.useContext(CategoryContext);
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const handleFetchData = async () => {
    if (user) {
      if (typeof handleFetchProducts !== "undefined" && products.length === 0) {
        await handleFetchProducts();
      }
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
    document.title = "POS-Foothill | Products Page";
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
        <Typography variant="h5">Products</Typography>
        <Link to={"new"}>
          <Button
            variant="contained"
            color="primary"
            className="table__add-item-button"
          >
            <ControlPointIcon />{" "}
            <Typography variant="subtitle2">Add new Product</Typography>
          </Button>
        </Link>
      </Box>

      <Divider />

      <CustomTable
        data={products}
        dataHeader={dataHeader}
        categoryFilters={categories}
        imagesBaseUrl={productImageBaseUrl}
        handleDelete={handleDeleteProduct}
      ></CustomTable>
    </>
  );
};

export default Products;
