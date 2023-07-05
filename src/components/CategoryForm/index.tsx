import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider/Divider";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import FormContainer from "../FormContainer";
import FileField from "../FileField";
import { CategoryContext } from "../../Contexts/CategoryContext";
import "./styles.css";

interface errors {
  name?: string;
  image?: string;
}

interface inputs {
  name: string;
  image: File | undefined;
  previewImage: string;
}

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

  const { id } = useParams();

  const formHeader = id === "new" ? "Create New Category" : "Update Category";
  const formButton = id === "new" ? "Add" : "Update";

  const handleSubmit = async (inputs: inputs) => {
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

    navigate(-1);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      image: undefined,
      previewImage: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  const handleImageChange = (file: File) => {
    formik.setFieldValue("image", file);

    if (!formik.touched.image) formik.setFieldTouched("image", true);
    if (formik.values.previewImage) formik.setFieldValue("previewImage", "");

    // formik.validateForm(formik.values);
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

  console.log(formik.errors);

  React.useEffect(() => {
    document.title = "POS-Foothill | Category Form";
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
          handleImageChange={handleImageChange}
          initialPreviewImage={formik.values.previewImage}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {formButton}
        </Button>

        <Divider sx={{ margin: "10px 0" }} />
      </Box>
    </FormContainer>
  );
};

export default CategoryForm;
