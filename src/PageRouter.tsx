import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";

type Props = {};

const PageRouter = (props: Props) => {
  const user = null;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : null}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PageRouter;
