import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider/Divider";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import FormContainer from "../FormContainer";
import { UnitContext } from "../../Contexts/UnitContext";

import "./styles.css";
import { LoaderContext } from "../../Contexts/LoaderContext";

interface errors {
  name?: string;
  baseUnit?: string;
  conversionFactor?: string;
}

interface inputs {
  name: string;
  baseUnit: string;
  conversionFactor: number;
}

const validate = (values: inputs) => {
  const errors: errors = {};

  if (!values.name) {
    errors.name = "Required, please enter a valid name";
  } else if (values.name.length < 2) {
    errors.name = "Name should be minimum of length 2";
  }

  if (!values.baseUnit) {
    errors.baseUnit = "Required, please enter a valid Base Unit";
  } else if (values.baseUnit.length < 2) {
    errors.baseUnit = "Base unit should be minimum of length 2";
  }

  if (!values.conversionFactor) {
    errors.conversionFactor =
      "Required, please enter a valid conversion factor";
  } else if (values.conversionFactor < 0) {
    errors.conversionFactor = "Conversion Factor should be a positive number";
  }

  return errors;
};

type Props = {};

const UnitForm = (props: Props) => {
  const navigate = useNavigate();

  const { handleAddUnit, handleUpdateUnit, findUnit } =
    React.useContext(UnitContext);
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const { id } = useParams();

  const formHeader = id === "new" ? "Create New Unit" : "Update Unit";
  const formButton = id === "new" ? "Add" : "Update";

  const handleSubmit = async (inputs: inputs) => {
    startLoader();
    try {
      if (id === "new") {
        if (handleAddUnit) {
          await handleAddUnit({ ...formik.values });
        } else {
          toast.error("Something went wrong, please try again");
          navigate("/");
        }
      } else if (typeof id !== "undefined") {
        if (handleUpdateUnit) {
          await handleUpdateUnit({ ...formik.values, _id: id });
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
    initialValues: {
      name: "",
      baseUnit: "",
      conversionFactor: 0,
    },
    validate,
    onSubmit: handleSubmit,
  });

  const FetchUnit = async () => {
    if (id === "new") return;

    const unit = findUnit ? await findUnit(id) : null;

    if (unit) {
      formik.setValues({
        name: unit.name,
        baseUnit: unit.baseUnit,
        conversionFactor: unit.conversionFactor,
      });
    } else {
      navigate("/not-found");
    }
  };

  console.log(formik.errors);

  React.useEffect(() => {
    document.title = "POS-Foothill | Unit Form";
    FetchUnit();
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
          disabled={id !== "new"}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="baseUnit"
          label="Base unit"
          name="baseUnit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.baseUnit}
          error={formik.touched.baseUnit && Boolean(formik.errors.baseUnit)}
          helperText={formik.touched.baseUnit && formik.errors.baseUnit}
          disabled={id !== "new"}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="conversionFactor"
          label="Conversion Factor"
          name="conversionFactor"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.conversionFactor}
          error={
            formik.touched.conversionFactor &&
            Boolean(formik.errors.conversionFactor)
          }
          helperText={
            formik.touched.conversionFactor && formik.errors.conversionFactor
          }
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

export default UnitForm;
