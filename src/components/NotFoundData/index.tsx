import React from "react";

import { Box } from "@mui/material";

type Props = {};

const NotFoundData = (props: Props) => {
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src="/assets/images/no-match.png"
        alt="No matching data found"
        style={{ width: "50%" }}
      />
    </Box>
  );
};

export default NotFoundData;
