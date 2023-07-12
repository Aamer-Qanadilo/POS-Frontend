import http from "../http-common";
import { productUploadType } from "../types/products.types";
import { categoryUploadType } from "../types/categories.types";

interface headers {
  authorization: string | null;
}

const newUpload = (
  inputs: productUploadType | categoryUploadType,
  path: string,
  file?: File,
  headers?: headers,
): Promise<any> => {
  let formData = new FormData();

  if (file) formData.append("image", file);

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
  inputs: (productUploadType | categoryUploadType) & { _id: string },
  path: string,
  file?: File,
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
