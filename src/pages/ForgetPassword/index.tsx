import * as React from "react";

import { Button, TextField, Box } from "@mui/material";
import Divider from "@mui/material/Divider/Divider";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import FormContainer from "../../components/FormContainer";

import { LoaderContext } from "../../Contexts/LoaderContext";

import httpCommon from "../../http-common";

type Props = {};
interface errors {
  email?: string;
}

interface inputs {
  email: string;
}

const validate = (values: inputs) => {
  const errors: errors = {};

  if (!values.email) {
    errors.email = "Required, please enter a valid Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email address";
  }

  return errors;
};

function ForgetPassword({}: Props) {
  const navigate = useNavigate();
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const handleSubmit = async (inputs: inputs) => {
    startLoader();

    try {
      const { data } = await httpCommon.patch("/auth/sendCode", inputs);

      if (data.message === "success") {
        toast.success("Sent code to your email!");
        toast.warning("Please check your email to proceed!");
        navigate("/reset-password");
      } else if (data.message === "invalid account") {
        toast.error("This email doesn't exist.");
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }

    stopLoader();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  React.useEffect(() => {
    document.title = "POS-Foothill | Forget Password";
  }, []);

  return (
    <FormContainer FormHeader="Forget Password">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          autoFocus
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!formik.isValid || !formik.dirty}
        >
          Send Code
        </Button>

        <Divider sx={{ margin: "10px 0 0" }} />
      </Box>
    </FormContainer>
  );
}

export default ForgetPassword;
