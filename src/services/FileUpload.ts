import http from "../http-common";
import productTypes, { productUploadType } from "../types/products.types";
import categoryTypes, { categoryUploadType } from "../types/categories.types";

interface headers {
  authorization: string | null;
}

const newUpload = (
  file: File,
  inputs: productUploadType | categoryUploadType,
  path: string,
  headers?: headers,
): Promise<any> => {
  let formData = new FormData();

  formData.append("image", file);

  for (let [key, value] of Object.entries(inputs)) {
    formData.append(key, value);
  }

  return http.post(path, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...headers,
    },
  });
};

const updateUpload = (
  file: File,
  inputs: productTypes | categoryTypes,
  path: string,
  headers?: headers,
): Promise<any> => {
  let formData = new FormData();

  if (file) formData.append("image", file);

  for (let [key, value] of Object.entries(inputs)) {
    formData.append(key, value);
  }

  return http.patch(`${path}/${inputs._id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...headers,
    },
  });
};

const FileUploadService = {
  newUpload,
  updateUpload,
};

export default FileUploadService;
