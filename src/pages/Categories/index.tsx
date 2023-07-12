import React from "react";

import { Divider } from "@mui/material";

import CustomTable from "../../components/Table";
import TableNav from "../../components/TableNav";

import { CategoryContext } from "../../Contexts/CategoryContext";
import { LoaderContext } from "../../Contexts/LoaderContext";
import { UserContext } from "../../Contexts/UserContext";

type Props = {};

const dataHeader = [
  { canSort: false, label: "Image", path: "image" },
  { canSort: true, label: "Name", path: "name" },
  { canSort: true, label: "Created At", path: "createdAt" },
  { canSort: true, label: "Updated At", path: "updatedAt" },
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
      <TableNav title="Categories" buttonText="Add New Category" />

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
