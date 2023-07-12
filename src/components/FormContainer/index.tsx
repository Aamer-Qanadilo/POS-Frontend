import * as React from "react";

import { Box, Typography, Container } from "@mui/material";
import { Breakpoint, createTheme, ThemeProvider } from "@mui/material/styles";

import Copyright from "../Copyright";

import "./styles.css";

type Props = {
  children: React.ReactNode;
  FormHeader: string;
  maxWidth?: false | Breakpoint;
};

const defaultTheme = createTheme();

const FormContainer = ({ children, FormHeader, maxWidth, ...props }: Props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth={maxWidth || "xs"}
        className="form-container"
      >
        <Box component="div" className="form-container__body">
          <Typography component="h1" variant="h5">
            {FormHeader}
          </Typography>
          {children}
        </Box>
        <Copyright sx={{ mt: 0, mb: 4, pb: 2 }} />
      </Container>
    </ThemeProvider>
  );
};

export default FormContainer;
