import React from "react";
import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import "./styles.css";

type Props = {
  title: string;
  buttonText: string;
};

const TableNav = ({ title, buttonText }: Props) => {
  return (
    <Box component="div" className="table-nav">
      <Typography variant="h5">{title}</Typography>

      <Link to={"new"} style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          className="table-nav__add-item-button"
        >
          <ControlPointIcon />{" "}
          <Typography variant="subtitle2">{buttonText}</Typography>
        </Button>
      </Link>
    </Box>
  );
};

export default TableNav;
