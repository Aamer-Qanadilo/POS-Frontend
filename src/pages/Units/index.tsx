import React from "react";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import CustomTable from "../../components/Table";
import { UserContext } from "../../Contexts/UserContext";
import httpCommon from "../../http-common";
import { toast } from "react-toastify";
import { LoaderContext } from "../../Contexts/LoaderContext";
import { UnitContext } from "../../Contexts/UnitContext";
import { Link } from "react-router-dom";

type Props = {};

const dataHeader = [
  { canSort: true, label: "Name", path: "name" },
  { canSort: true, label: "Base Unit", path: "baseUnit" },
  { canSort: true, label: "Conversion Factor", path: "conversionFactor" },
  { canSort: true, label: "Created At", path: "createdAt" },
  { canSort: true, label: "Updated At", path: "updatedAt" },
];

const Units = (props: Props) => {
  const { user } = React.useContext(UserContext);
  const { units, handleFetchUnits, handleDeleteUnit } =
    React.useContext(UnitContext);
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const handleFetchData = async () => {
    if (user) {
      if (typeof handleFetchUnits !== "undefined" && units.length === 0) {
        await handleFetchUnits();
      }
    }

    stopLoader();
  };

  React.useEffect(() => {
    document.title = "POS-Foothill | Units Page";
    startLoader();
    handleFetchData();
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

        <Link to={"new"} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            className="table__add-item-button"
          >
            <ControlPointIcon />{" "}
            <Typography variant="subtitle2">Add new Unit</Typography>
          </Button>
        </Link>
      </Box>

      <Divider />

      <CustomTable
        data={units}
        dataHeader={dataHeader}
        handleDelete={handleDelete}
      ></CustomTable>
    </>
  );
};

export default Units;
