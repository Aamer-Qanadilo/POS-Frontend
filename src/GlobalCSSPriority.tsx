import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";

type props = {
  children: React.ReactNode;
};

export default function GlobalCssPriority({ children }: props) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
