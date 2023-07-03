import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { ProductProvider } from "../../Contexts/ProductContext";
import { CategoryProvider } from "../../Contexts/CategoryContext";
import { UnitProvider } from "../../Contexts/UnitContext";

type Props = {};

const Layout = (props: Props) => {
  const { user } = React.useContext(UserContext);

  return (
    <React.Fragment>
      <Navbar />
      {user ? (
        <ProductProvider>
          <CategoryProvider>
            <UnitProvider>
              <Outlet />
            </UnitProvider>
          </CategoryProvider>
        </ProductProvider>
      ) : (
        <Outlet />
      )}
    </React.Fragment>
  );
};

export default Layout;
