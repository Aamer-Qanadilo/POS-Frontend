import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

type Props = {};

const Layout = (props: Props) => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
};

export default Layout;
