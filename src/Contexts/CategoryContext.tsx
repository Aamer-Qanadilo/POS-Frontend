import React from "react";
import categoriesTypes, { categoryUploadType } from "../types/categories.types";

import httpCommon from "../http-common";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";
import { LoaderContext } from "./LoaderContext";
import FileUploadService from "../services/FileUpload";

interface props {
  children: React.ReactNode;
}

const ContextInitialValues = {
  categories: [],
  categoryImageBaseUrl: "",
};

interface ContextTypes {
  categories: categoriesTypes[] | [];
  categoryImageBaseUrl: string;

  handleAddCategory?: (
    inputs: categoryUploadType,
    imageFile: File,
  ) => Promise<void>;
  handleUpdateCategory?: (
    inputs: categoriesTypes,
    imageFile: File,
  ) => Promise<void>;
  handleDeleteCategory?: (_id: string) => Promise<void>;
  handleFetchCategories?: () => Promise<void>;
}

export const CategoryContext =
  React.createContext<ContextTypes>(ContextInitialValues);

export const CategoryProvider = ({ children }: props) => {
  const [categories, setCategories] = React.useState<
    ContextTypes["categories"]
  >([]);
  const [categoryImageBaseUrl, setCategoryImageBaseUrl] =
    React.useState<string>("");

  const { user } = React.useContext(UserContext);
  const { stopLoader } = React.useContext(LoaderContext);

  const headers = { authorization: "foothill__" + user };

  const handleFetchCategories = async () => {
    try {
      const { data } = await httpCommon.get("/category", {
        headers: { ...headers },
      });

      if (data.message === "success") {
        setCategories(data.data);
        setCategoryImageBaseUrl(data.imageBaseUrl);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {}
  };

  const handleAddCategory = async (
    inputs: categoryUploadType,
    imageFile: File,
  ) => {
    try {
      const { data } = await FileUploadService.newUpload(
        imageFile,
        inputs,
        "/category",
        headers,
      );

      if (data.message === "success") {
        const newCategories = [...categories];
        newCategories.push(data.data);
        setCategories(newCategories);
        toast.success("Category Added successfully!");
      } else {
        toast.error("Something went wrong, please check your inputs");
      }
    } catch (error) {}

    if (stopLoader) stopLoader();
  };

  const handleUpdateCategory = async (
    inputs: categoriesTypes,
    imageFile: File,
  ) => {
    try {
      const { data } = await FileUploadService.updateUpload(
        imageFile,
        inputs,
        "/category",
        headers,
      );

      if (data.message === "success") {
        let newCategories = [...categories];
        newCategories = newCategories.map((category) =>
          category._id === inputs._id ? data.data : category,
        );
        toast.success("Category Updated successfully!");
        setCategories(newCategories);
      } else if (data.message === "invalid category") {
        toast.error("Invalid category id");
      } else {
        toast.error("Something went wrong, please check your inputs");
      }
    } catch (error) {}

    if (stopLoader) stopLoader();
  };

  const handleDeleteCategory = async (_id: string) => {
    try {
      const { data } = await httpCommon.delete(`/category/${_id}`, {
        headers: { ...headers },
      });

      if (data.message === "success") {
        let newCategories = [...categories];
        newCategories = newCategories.filter(
          (category) => category._id !== _id,
        );
        toast.success("Category Deleted successfully!");
        setCategories(newCategories);
      } else if (
        data.message === "failed" &&
        data.error &&
        data.error === "can't delete, category is used by products"
      ) {
        toast.error(
          "Can't delete this category, some products may depend on it.",
        );
      } else if (data.message === "invalid category") {
        toast.error("Invalid category id");
      } else {
        toast.error(
          "Something went wrong, please check your inputs and try again",
        );
      }
    } catch (error) {}

    if (stopLoader) stopLoader();
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoryImageBaseUrl,
        handleAddCategory,
        handleUpdateCategory,
        handleDeleteCategory,
        handleFetchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
