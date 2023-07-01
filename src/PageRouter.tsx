import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import Cashier from "./pages/Cashier";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Units from "./pages/Units";
import { UserContext } from "./UserContext";

type Props = {};

const PageRouter = (props: Props) => {
  const { user } = React.useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Cashier />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/units" element={<Units />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PageRouter;
