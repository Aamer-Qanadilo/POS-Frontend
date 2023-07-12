import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider/Divider";

import FormContainer from "../../components/FormContainer";
import "./styles.css";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../Contexts/UserContext";
import httpCommon from "../../http-common";
import { LoaderContext } from "../../Contexts/LoaderContext";

interface errors {
  email?: string;
  password?: string;
}

interface inputs {
  email: string;
  password: string;
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

  return errors;
};

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const { handleUserToken } = React.useContext(UserContext);
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const handleSubmit = async (inputs: inputs) => {
    startLoader();

    try {
      const { data } = await httpCommon.post("/auth/signin", inputs);

      if (data.message === "success") {
        // Add the token to userContext
        if (typeof handleUserToken !== "undefined") {
          handleUserToken(data.loginToken);
        }
        toast.success("Welcome back!");
        navigate("/");
      } else if (data.message === "password incorrect") {
        toast.error("Incorrect Password!");
      } else if (data.message === "email doesn't exist") {
        toast.error("Invalid Email Address!");
      } else if (data.message === "please confirm your email") {
        toast.error("Please ask the Admin to confirm your email");
      } else {
        console.log(data.message);
      }
    } catch (error) {}

    stopLoader();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  React.useEffect(() => {
    document.title = "POS-Foothill | Login";
  }, []);

  return (
    <FormContainer FormHeader="Login">
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Box textAlign="center">
          <Link to="/forget-password" className="form__anchor">
            Forgot your password?
          </Link>
        </Box>

        <Divider sx={{ margin: "25px 0" }} />

        <Box textAlign="center">
          <Button
            color="success"
            variant="contained"
            sx={{ backgroundColor: "black" }}
          >
            <Link to="/register" className="form__anchor form__anchor_button">
              Create new account
            </Link>
          </Button>
        </Box>
      </Box>
    </FormContainer>
  );
};

export default Login;
