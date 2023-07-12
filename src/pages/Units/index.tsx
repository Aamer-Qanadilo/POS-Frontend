import React from "react";

import { Divider } from "@mui/material";

import CustomTable from "../../components/Table";
import TableNav from "../../components/TableNav";

import { UserContext } from "../../Contexts/UserContext";
import { LoaderContext } from "../../Contexts/LoaderContext";
import { UnitContext } from "../../Contexts/UnitContext";

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
      <TableNav title="Units" buttonText="Add New Unit" />

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
