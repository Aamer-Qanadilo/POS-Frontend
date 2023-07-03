import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { ProductProvider } from "../../Contexts/ProductContext";

type Props = {};

const Layout = (props: Props) => {
  const { user } = React.useContext(UserContext);

  return (
    <React.Fragment>
      <Navbar />
      {user ? (
        <ProductProvider>
          <Outlet />
        </ProductProvider>
      ) : (
        <Outlet />
      )}
    </React.Fragment>
  );
};

export default Layout;
