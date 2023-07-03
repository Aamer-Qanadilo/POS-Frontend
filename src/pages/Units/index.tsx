import React from "react";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import CustomTable from "../../components/Table";
import { UserContext } from "../../Contexts/UserContext";
import httpCommon from "../../http-common";
import { toast } from "react-toastify";

type Props = {};

const dataHeader = [
  { canSort: true, label: "Name", path: "name" },
  { canSort: true, label: "Base Unit", path: "baseUnit" },
  { canSort: true, label: "Conversion Factor", path: "conversionFactor" },
  { canSort: false, label: "Created At", path: "createdAt" },
  { canSort: false, label: "Updated At", path: "updatedAt" },
];

const data = [
  {
    _id: "64980b4959aa2e2c8ff9a7ca",
    name: "centimeter",
    baseUnit: "meter",
    conversionFactor: 0.01,
    createdAt: "2023-06-25T09:39:21.861Z",
    updatedAt: "2023-06-25T09:39:21.861Z",
    __v: 0,
  },
];

const Units = (props: Props) => {
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    document.title = "POS-Foothill | Units Page";
  }, []);

  const handleDelete = async (_id: string) => {};

  return (
    <>
      <Box
        padding="25px 25px 15px"
        flexDirection="row"
        sx={{
          boxSizing: "border-box",
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: "20px",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5">Units</Typography>
        <Button
          variant="contained"
          color="primary"
          className="table__add-item-button"
        >
          <ControlPointIcon />{" "}
          <Typography variant="subtitle2">Add new Unit</Typography>
        </Button>
      </Box>

      <Divider />

      <CustomTable
        data={data}
        dataHeader={dataHeader}
        handleDelete={handleDelete}
      ></CustomTable>
    </>
  );
};

export default Units;
