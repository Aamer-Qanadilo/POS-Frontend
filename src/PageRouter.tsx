import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import Cashier from "./pages/Cashier";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Units from "./pages/Units";
import { UserContext } from "./Contexts/UserContext";
import CategoryForm from "./components/CategoryForm";
import UnitForm from "./components/UnitForm";
import ProductForm from "./components/ProductForm";
import ForgetPassword from "./components/ForgetPassword";

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
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/" element={<Navigate to="/login" />} />
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PageRouter;
