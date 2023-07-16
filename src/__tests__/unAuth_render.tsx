import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { UserProvider } from "../Contexts/UserContext";
import { BrowserRouter } from "react-router-dom";

interface props {
  children: React.ReactNode;
}

const UnAuthRender = (
  Component: React.ReactElement,
  options: RenderOptions = {},
) => {
  function Wrapper({ children }: props) {
    return (
      <BrowserRouter>
        <UserProvider>{children}</UserProvider>
      </BrowserRouter>
    );
  }

  return render(Component, { wrapper: Wrapper, ...options });
};

export default UnAuthRender;
