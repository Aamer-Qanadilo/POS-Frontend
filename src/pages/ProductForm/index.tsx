import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider/Divider";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import FormContainer from "../../components/FormContainer";
import FileField from "../../components/FileField";

import { toast } from "react-toastify";
import { useFormik } from "formik";

import { productUploadType } from "../../types/products.types";

import { CategoryContext } from "../../Contexts/CategoryContext";
import { LoaderContext } from "../../Contexts/LoaderContext";
import { UnitContext } from "../../Contexts/UnitContext";
import { ProductContext } from "../../Contexts/ProductContext";

import "./styles.css";

interface errors {
  name?: string;
  code?: string;
  category?: string;
  price?: string;
  unitOfMeasure?: string;
  image?: string;
}

// interface inputs {
//   name: string;
//   code: string;
//   category: string;
//   price: number;
//   unitOfMeasure: unitType | null;
//   image: File | undefined;
//   previewImage: string;
// }

type inputs = Omit<productUploadType, "image"> & {
  image: File | undefined;
  previewImage: string;
};

const initialValues: Omit<productUploadType, "image"> & {
  image: File | undefined;
  previewImage: string;
} = {
  name: "",
  code: "",
  category: "",
  price: 0,
  unitOfMeasure: "",
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

  if (!values.code) {
    errors.code = "Required, please enter a valid code";
  } else if (values.code.length < 4) {
    errors.code = "Code should be minimum of length 6";
  }

  if (!values.category) {
    errors.category = "Required, please choose a valid category";
  }

  if (!values.price) {
    errors.price = "Required, please choose a valid price";
  } else if (values.price < 0) {
    errors.price = "Price should be a positive number";
  }

  if (!values.unitOfMeasure) {
    errors.unitOfMeasure = "Required, please choose a valid unit";
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

const ProductForm = (props: Props) => {
  const navigate = useNavigate();

  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const { categories, handleFetchCategories } =
    React.useContext(CategoryContext);
  const { units, handleFetchUnits } = React.useContext(UnitContext);
  const {
    productImageBaseUrl,
    findProduct,
    handleAddProduct,
    handleUpdateProduct,
  } = React.useContext(ProductContext);

  const { id } = useParams();

  const formHeader = id === "new" ? "Create New Product" : "Update Product";
  const formButton = id === "new" ? "Add" : "Update";

  const handleSubmit = async (inputs: inputs) => {
    startLoader();

    try {
      if (id === "new") {
        if (handleAddProduct) {
          const { image, previewImage, ...inputs } = formik.values;
          await handleAddProduct({ ...inputs }, image);
        } else {
          toast.error("Something went wrong, please try again");
          navigate("/");
        }
      } else if (typeof id !== "undefined") {
        if (handleUpdateProduct) {
          const { image, previewImage, ...inputs } = formik.values;
          await handleUpdateProduct(
            { _id: id, ...inputs },
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

  const FetchProduct = async () => {
    if (id === "new") return;

    const product = findProduct ? await findProduct(id) : null;

    if (product) {
      formik.setValues({
        name: product.name,
        code: product.code,
        category: product.category._id,
        price: product.price,
        unitOfMeasure: product.unitOfMeasure._id,
        previewImage: productImageBaseUrl + product.image,
        image: undefined,
      });
    } else {
      navigate("/not-found");
    }
  };

  const FetchOtherData = async () => {
    if (typeof handleFetchUnits !== "undefined" && units.length === 0) {
      await handleFetchUnits();
    }

    if (
      typeof handleFetchCategories !== "undefined" &&
      categories.length === 0
    ) {
      await handleFetchCategories();
    }

    stopLoader();
  };

  React.useEffect(() => {
    document.title = `POS-Foothill | ${
      id === "new" ? "Create New" : "Update"
    } Product`;
    startLoader();
    FetchProduct();
    FetchOtherData();
  }, []);

  return (
    <FormContainer FormHeader={formHeader} maxWidth="md">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%" }}
      >
        <Box component="div" sx={{ display: "flex" }}>
          <Box>
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

            <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="Code"
              name="code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="categoryLabel">Category</InputLabel>

              <Select
                labelId="categoryLabel"
                id="category"
                value={formik.values.category}
                label="Category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              >
                {categories.map((category) => {
                  return (
                    <MenuItem value={category._id}>{category.name}</MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {formik.touched.category && formik.errors.category}
              </FormHelperText>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="unitLabel">Unit Of Measure</InputLabel>

              <Select
                labelId="unitLabel"
                id="unitOfMeasure"
                value={formik.values.unitOfMeasure}
                label="Unit Of Measure"
                name="unitOfMeasure"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.unitOfMeasure &&
                  Boolean(formik.errors.unitOfMeasure)
                }
              >
                {units.map((unit) => {
                  return <MenuItem value={unit._id}>{unit.name}</MenuItem>;
                })}
              </Select>
              <FormHelperText>
                {formik.touched.unitOfMeasure && formik.errors.unitOfMeasure}
              </FormHelperText>
            </FormControl>
          </Box>

          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ padding: "20px" }}
          >
            {" "}
          </Divider>

          <Box
            component="div"
            sx={{ width: "75%", display: "flex", alignItems: "center" }}
          >
            <FileField
              image={formik.values.image}
              onImageChange={handleImageChange}
              onBlur={formik.handleBlur}
              initialPreviewImage={formik.values.previewImage}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
              className="file-input_large"
            />
          </Box>
        </Box>

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

export default ProductForm;
