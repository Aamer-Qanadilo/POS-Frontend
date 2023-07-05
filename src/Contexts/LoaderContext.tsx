import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";

interface props {
  children: React.ReactNode;
}

interface ContextTypes {
  loader?: boolean;
  toggleLoader: () => void;
  startLoader: () => void;
  stopLoader: () => void;
}

const ContextInitialValues = {
  toggleLoader: () => {},
  startLoader: () => {},
  stopLoader: () => {},
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const LoaderContext =
  React.createContext<ContextTypes>(ContextInitialValues);

export const LoaderProvider = ({ children }: props) => {
  const [loader, setLoader] = React.useState(false);

  const toggleLoader = () => {
    setLoader(!loader);
  };

  const startLoader = () => {
    setLoader(true);
  };

  const stopLoader = () => {
    setLoader(false);
  };

  return (
    <LoaderContext.Provider
      value={{ loader, toggleLoader, startLoader, stopLoader }}
    >
      {children}
      {/* Add the loader here */}
      <Modal open={loader}>
        <Box sx={style}>
          <CircularProgress />
        </Box>
      </Modal>
    </LoaderContext.Provider>
  );
};
