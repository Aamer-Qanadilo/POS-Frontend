import React from "react";
import productsTypes, { productUploadType } from "../types/products.types";
import httpCommon from "../http-common";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";
import { LoaderContext } from "./LoaderContext";
import FileUploadService from "../services/FileUpload";

interface props {
  children: React.ReactNode;
}

const ContextInitialValues = {
  products: [],
};

interface ContextTypes {
  products: productsTypes[] | [];
  handleAddProduct?: (
    inputs: productUploadType,
    imageFile: File,
  ) => Promise<void>;
  handleUpdateProduct?: (
    inputs: productsTypes,
    imageFile: File,
  ) => Promise<void>;
  handleDeleteProduct?: (_id: string) => Promise<void>;
  handleGettingProducts?: () => Promise<void>;
}

export const ProductContext =
  React.createContext<ContextTypes>(ContextInitialValues);

export const ProductProvider = ({ children }: props) => {
  const [products, setProducts] = React.useState<ContextTypes["products"]>([]);
  const [productImageBaseUrl, setProductImageBaseUrl] =
    React.useState<string>("");

  const { user } = React.useContext(UserContext);
  const { stopLoader } = React.useContext(LoaderContext);

  const headers = { authorization: "foothill__" + user };

  const handleGettingProducts = async () => {
    console.log("Getting products");
    try {
      const { data } = await httpCommon.get("/product", {
        headers: { ...headers },
      });

      if (data.message === "success") {
        setProducts(data.data);
        setProductImageBaseUrl(data.imageBaseUrl);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {}
  };

  const handleAddProduct = async (
    inputs: productUploadType,
    imageFile: File,
  ) => {
    try {
      const { data } = await FileUploadService.newUpload(
        imageFile,
        inputs,
        "/product",
        headers,
      );

      if (data.message === "success") {
        const newProducts = [...products];
        newProducts.push(data.data);
        setProducts(newProducts);
        toast.success("Product Added successfully!");
      } else if (data.message === "failed" && data.error) {
        toast.error(data.error);
      } else if (data.message === "invalid inputs") {
        toast.error("Invalid entered inputs");
      } else {
        toast.error("Something went wrong, please check your inputs");
      }
    } catch (error) {}

    if (stopLoader) stopLoader();
  };

  const handleUpdateProduct = async (
    inputs: productsTypes,
    imageFile: File,
  ) => {
    try {
      const { data } = await FileUploadService.updateUpload(
        imageFile,
        inputs,
        "/product",
        headers,
      );

      if (data.message === "success") {
        const newProducts = [...products];
        newProducts.forEach((product) => {
          if (product._id === inputs._id) product = inputs;
        });
        toast.success("Product Updated successfully!");
        setProducts(newProducts);
      } else if (data.message === "failed" && data.error) {
        toast.error(data.error);
      } else if (data.message === "invalid inputs") {
        toast.error("Invalid entered inputs");
      } else if (data.message === "invalid product") {
        toast.error("Invalid product id");
      } else {
        toast.error("Something went wrong, please check your inputs");
      }
    } catch (error) {}

    if (stopLoader) stopLoader();
  };

  const handleDeleteProduct = async (_id: string) => {
    try {
      const { data } = await httpCommon.delete(`/product/${_id}`, {
        headers: { ...headers },
      });

      if (data.message === "success") {
        let newProducts = [...products];
        newProducts = newProducts.filter((product) => product._id !== _id);
        toast.success("Product Deleted successfully!");
        setProducts(newProducts);
      } else {
        toast.error(data.message || "Something went wrong, please try again");
      }
    } catch (error) {}

    if (stopLoader) stopLoader();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        handleAddProduct,
        handleUpdateProduct,
        handleDeleteProduct,
        handleGettingProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
