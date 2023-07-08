import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider/Divider";
import { useFormik } from "formik";

import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import httpCommon from "../../http-common";

type Props = {};
interface errors {
  email?: string;
  code?: string;
  newPassword?: string;
}

interface inputs {
  email: string;
  code: string;
  newPassword: string;
}

const initialValues: inputs = {
  email: "",
  code: "",
  newPassword: "",
};

const validate = (values: inputs) => {
  const errors: errors = {};

  if (!values.email) {
    errors.email = "Required, please enter a valid Email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email address.";
  }

  if (!values.code) {
    errors.code = "Required, please enter a valid access code.";
  } else if (values.code.length < 21) {
    errors.code = "Invalid access code, please check your Email.";
  }

  if (!values.newPassword) {
    errors.newPassword =
      "Required, password should be Minimum eight characters.";
  } else if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      values.newPassword,
    )
  ) {
    errors.newPassword =
      "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.";
  }

  return errors;
};

function ResetPassword({}: Props) {
  const navigate = useNavigate();

  const handleSubmit = async (inputs: inputs) => {
    try {
      const { data } = await httpCommon.patch("/auth/forget-password", inputs);

      if (data.message === "success") {
        toast.success("Password changed successfully!");
        navigate("/login");
      } else if (data.message === "failed" && data.error) {
        toast.error(data.error);
      } else {
        toast.error(data.message || "Something went wrong, please try again!");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again!");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: handleSubmit,
  });

  React.useEffect(() => {
    document.title = "POS-Foothill | Reset Your Password";
  }, []);

  return (
    <FormContainer FormHeader="Reset My Password">
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
          type="email"
          autoComplete="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          autoFocus
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="code"
          label="Access Code"
          name="code"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code}
          autoFocus
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="New Password"
          type="password"
          id="newPassword"
          autoComplete="current-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>

        <Divider sx={{ margin: "25px 0 0" }} />
      </Box>
    </FormContainer>
  );
}

export default ResetPassword;
