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
import { LoaderContext } from "../../Contexts/LoaderContext";

type Props = {};
interface errors {
  email?: string;
  password?: string;
  cPassword?: string;
}

interface inputs {
  email: string;
  password: string;
  cPassword: string;
}

const validate = (values: inputs) => {
  const errors: errors = {};

  if (!values.email) {
    errors.email = "Required, please enter a valid Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email address";
  }

  if (!values.password) {
    errors.password = "Required, password should be Minimum eight characters.";
  } else if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      values.password,
    )
  ) {
    errors.password =
      "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
  }

  if (!values.cPassword) {
    errors.cPassword = "Required, password should be Minimum eight characters.";
  } else if (values.password !== values.cPassword) {
    errors.cPassword = "Both passwords should be identical";
  }

  return errors;
};

function Register({}: Props) {
  const navigate = useNavigate();
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const handleSubmit = async (inputs: inputs) => {
    startLoader();

    try {
      const { data } = await httpCommon.post("/auth/signup", inputs);

      if (data.message === "success") {
        toast.success("Registered Successfully!");
        toast.warning("Ask the admin to confirm your account!");
        navigate("/login");
      } else if (data.message === "email already exists") {
        toast.error("Email is already used!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {}

    stopLoader();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cPassword: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  React.useEffect(() => {
    document.title = "POS-Foothill | Register";
  }, []);

  return (
    <FormContainer FormHeader="Register">
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="cPassword"
          label="Confirm Password"
          type="password"
          id="cPassword"
          autoComplete="current-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cPassword}
          error={formik.touched.cPassword && Boolean(formik.errors.cPassword)}
          helperText={formik.touched.cPassword && formik.errors.cPassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Box textAlign="center">
          Already have an account?{" "}
          <Link to="/login" className="form__anchor">
            Login.
          </Link>
        </Box>

        <Divider sx={{ margin: "25px 0 0" }} />
      </Box>
    </FormContainer>
  );
}

export default Register;
