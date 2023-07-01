import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider/Divider";

import Copyright from "../Copyright";
import "./styles.css";

type Props = {
  children: React.ReactNode;
  FormHeader: string;
};

const defaultTheme = createTheme();

const FormContainer = ({ children, ...props }: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "white", borderRadius: "15px" }}
      >
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "25px 5px",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
                <LockOutlinedIcon />
              </Avatar> */}
          <Typography component="h1" variant="h5">
            {props.FormHeader}
          </Typography>
          {children}
        </Box>
        <Copyright sx={{ mt: 0, mb: 4, pb: 2 }} />
      </Container>
    </ThemeProvider>
  );
};

export default FormContainer;
