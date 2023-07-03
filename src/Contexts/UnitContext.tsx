import React from "react";

import unitsTypes, { unitUploadType } from "../types/units.types";
import httpCommon from "../http-common";
import { UserContext } from "./UserContext";
import { LoaderContext } from "./LoaderContext";
import { toast } from "react-toastify";

interface props {
  children: React.ReactNode;
}

interface ContextTypes {
  units: unitsTypes[] | [];
  handleAddUnit?: (inputs: unitUploadType) => Promise<void>;
  handleUpdateUnit?: (inputs: unitsTypes) => Promise<void>;
  handleDeleteUnit?: (_id: string) => Promise<void>;
  handleFetchUnits?: () => Promise<void>;
}

const ContextInitialValues = {
  units: [],
};

export const UnitContext =
  React.createContext<ContextTypes>(ContextInitialValues);

export const UnitProvider = ({ children }: props) => {
  const [units, setUnits] = React.useState<ContextTypes["units"]>([]);

  const { user } = React.useContext(UserContext);
  const { stopLoader } = React.useContext(LoaderContext);

  const headers = { authorization: "foothill__" + user };

  const handleFetchUnits = async () => {
    try {
      const { data } = await httpCommon.get("/units", {
        headers: { ...headers },
      });

      if (data.message === "success") {
        setUnits(data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {}
  };

  const handleAddUnit = async (inputs: unitUploadType) => {
    try {
      const { data } = await httpCommon.post(`/units`, inputs, {
        headers: headers,
      });

      if (data.message === "success") {
        const newUnits = [...units];
        newUnits.push(data.data);
        setUnits(newUnits);
        toast.success("Unit Added successfully!");
      } else if (data.message === "failed" && data.error) {
        toast.error("Something went wrong, please try again");
      } else if (data.message === "already existing unit") {
        toast.error("This unit already exists, please check your units list");
      }
    } catch (error) {
      toast.error(
        "Something went wrong, please check your inputs and try again",
      );
    }

    stopLoader();
  };

  const handleUpdateUnit = async (inputs: unitsTypes) => {
    try {
      const { data } = await httpCommon.patch(`/units`, inputs, {
        headers: headers,
      });

      if (data.message === "success") {
        let newUnits = [...units];
        newUnits = newUnits.map((unit) =>
          unit._id === inputs._id ? data.data : unit,
        );
        toast.success("Unit Updated successfully!");
        setUnits(newUnits);
      } else {
        toast.error(
          "Something went wrong, please check your inputs and try again",
        );
      }
    } catch (error) {
      toast.error(
        "Something went wrong, please check your inputs and try again",
      );
    }

    stopLoader();
  };

  const handleDeleteUnit = async (_id: string) => {
    try {
      const { data } = await httpCommon.delete(`/units/${_id}`, {
        headers: headers,
      });

      if (data.message === "success") {
        let newUnits = [...units];
        newUnits = newUnits.filter((category) => category._id !== _id);
        toast.success("Unit Deleted successfully!");
        setUnits(newUnits);
      } else if (
        data.message === "failed" &&
        data.error === "can't delete, unit is used by products"
      ) {
        toast.error(data.error);
      } else if (data.message === "invalid id") {
        toast.error("Invalid unit id");
      }
    } catch (error) {
      toast.error(
        "Something went wrong, please check your inputs and try again",
      );
    }

    stopLoader();
  };

  return (
    <UnitContext.Provider
      value={{
        units,
        handleAddUnit,
        handleUpdateUnit,
        handleDeleteUnit,
        handleFetchUnits,
      }}
    >
      {children}
    </UnitContext.Provider>
  );
};
