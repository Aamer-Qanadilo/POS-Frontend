import React from "react";

import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";
import { UserContext } from "../../Contexts/UserContext";

import "./styles.css";

// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "85vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function NotFound() {
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    document.title = "POS-Foothill | Not Found";
  }, []);

  return (
    <Container className="not-found" maxWidth="xl">
      <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src="/assets/images/illustration_404.svg"
          sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
        />

        <Button
          to={user ? "/" : "/login"}
          size="large"
          variant="contained"
          component={RouterLink}
        >
          Home
        </Button>
      </StyledContent>
    </Container>
  );
}
