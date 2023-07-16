import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, TextField, Box, Divider } from "@mui/material";

import { toast } from "react-toastify";
import { useFormik } from "formik";

import FormContainer from "../../components/FormContainer";
import FileField from "../../components/FileField";

import { CategoryContext } from "../../Contexts/CategoryContext";
import { LoaderContext } from "../../Contexts/LoaderContext";

import { categoryUploadType } from "../../types/categories.types";

interface errors {
  name?: string;
  image?: string;
}

type inputs = Omit<categoryUploadType, "image"> & {
  image: File | undefined;
  previewImage: string;
};

const initialValues: Omit<categoryUploadType, "image"> & {
  image: File | undefined;
  previewImage: string;
} = {
  name: "",
  image: undefined,
  previewImage: "",
};
const validate = (values: inputs) => {
  const errors: errors = {};

  if (!values.name) {
    errors.name = "Required, please enter a valid name";
  } else if (values.name.length < 4) {
    errors.name = "Name should be minimum of length 4";
  }

  if (!values.previewImage) {
    if (!values.image) {
      errors.image = "Required, please select an image";
    } else if (!values.image.name.match(/\.(jpg|jpeg|png)$/)) {
      errors.image = "Please select a valid image. [jpg | jpeg | png]";
    }
  }

  return errors;
};

type Props = {};

const CategoryForm = (props: Props) => {
  const navigate = useNavigate();

  const {
    categoryImageBaseUrl,
    handleAddCategory,
    handleUpdateCategory,
    findCategory,
  } = React.useContext(CategoryContext);

  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const { id } = useParams();

  const formHeader = id === "new" ? "Create New Category" : "Update Category";
  const formButton = id === "new" ? "Add" : "Update";

  const handleSubmit = async (inputs: inputs) => {
    startLoader();

    try {
      if (id === "new") {
        if (handleAddCategory) {
          await handleAddCategory(
            { name: formik.values.name },
            formik.values.image,
          );
        } else {
          toast.error("Something went wrong, please try again");
          navigate("/");
        }
      } else if (typeof id !== "undefined") {
        if (handleUpdateCategory) {
          await handleUpdateCategory(
            { _id: id, name: formik.values.name },
            formik.values.image,
          );
        } else {
          toast.error("Something went wrong, please try again");
          navigate("/");
        }
      }
    } catch (error) {}

    stopLoader();
    navigate(-1);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: handleSubmit,
  });

  const handleImageChange = async (file: File) => {
    const value = await formik.setFieldValue("image", file);

    if (formik.values.previewImage)
      await formik.setFieldValue("previewImage", "");

    if (!formik.touched.image) await formik.setFieldTouched("image", true);
  };

  const FetchCategory = async () => {
    if (id === "new") return;

    const category = findCategory ? await findCategory(id) : null;

    if (category) {
      formik.setValues({
        name: category.name,
        previewImage: categoryImageBaseUrl + category.image,
        image: undefined,
      });
    } else {
      navigate("/not-found");
    }
  };

  React.useEffect(() => {
    document.title = `POS-Foothill | ${
      id === "new" ? "Create New" : "Update"
    } Category`;
    FetchCategory();
  }, []);

  return (
    <FormContainer FormHeader={formHeader}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          autoFocus
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <FileField
          image={formik.values.image}
          onImageChange={handleImageChange}
          onBlur={formik.handleBlur}
          initialPreviewImage={formik.values.previewImage}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!formik.isValid || !formik.dirty}
        >
          {formButton}
        </Button>

        <Divider sx={{ margin: "10px 0" }} />
      </Box>
    </FormContainer>
  );
};

export default CategoryForm;
