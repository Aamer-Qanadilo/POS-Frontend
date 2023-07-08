import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Cashier from "./pages/Cashier";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Units from "./pages/Units";
import { UserContext } from "./Contexts/UserContext";
import CategoryForm from "./components/CategoryForm";
import UnitForm from "./components/UnitForm";
import ProductForm from "./components/ProductForm";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { LoaderContext } from "./Contexts/LoaderContext";

type Props = {};

const PageRouter = (props: Props) => {
  const { user } = React.useContext(UserContext);
  const { loader } = React.useContext(LoaderContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {!user && !loader ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Cashier />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductForm />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:id" element={<CategoryForm />} />
              <Route path="/units" element={<Units />} />
              <Route path="/units/:id" element={<UnitForm />} />
            </>
          )}
          {/* <Route path="not-found" element={} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PageRouter;
