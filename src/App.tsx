import React from "react";
import { ToastContainer } from "react-toastify";

import "./App.css";
import PageRouter from "./PageRouter";
import { UserProvider } from "./Contexts/UserContext";
import { LoaderProvider } from "./Contexts/LoaderContext";

function App() {
  return (
    <React.Fragment>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <LoaderProvider>
        <UserProvider>
          <PageRouter />
        </UserProvider>
      </LoaderProvider>
    </React.Fragment>
  );
}

export default App;
