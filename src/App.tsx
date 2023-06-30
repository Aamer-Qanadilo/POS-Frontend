import React from "react";
import { ToastContainer } from "react-toastify";

import "./App.css";
import PageRouter from "./PageRouter";

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
      <PageRouter />
    </React.Fragment>
  );
}

export default App;
