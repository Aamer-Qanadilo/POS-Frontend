import React from "react";

import { Divider } from "@mui/material";

import CustomTable from "../../components/Table";
import TableNav from "../../components/TableNav";

import { UserContext } from "../../Contexts/UserContext";
import { ProductContext } from "../../Contexts/ProductContext";
import { CategoryContext } from "../../Contexts/CategoryContext";
import { LoaderContext } from "../../Contexts/LoaderContext";

type Props = {};

const dataHeader = [
  { canSort: false, label: "Image", path: "image" },
  { canSort: true, label: "Name", path: "name" },
  { canSort: true, label: "Code", path: "code" },
  { canSort: true, label: "Price", path: "price" },
  { canSort: false, label: "Unit of measure", path: "unitOfMeasure" },
  { canSort: false, label: "Category", path: "category" },
  { canSort: true, label: "Updated At", path: "updatedAt" },
];

const Products = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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
      setIsLoading(false);
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
    setIsLoading(true);
    handleFetchData();
  }, []);

  return (
    <>
      <TableNav title="Products" buttonText="Add New Product" />

      <Divider />

      <CustomTable
        data={products}
        dataHeader={dataHeader}
        categoryFilters={categories}
        imagesBaseUrl={productImageBaseUrl}
        handleDelete={handleDeleteProduct}
        isLoading={isLoading}
      ></CustomTable>
    </>
  );
};

export default Products;
