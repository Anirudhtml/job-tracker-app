import React, {useState} from "react";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Layout from "./Layout/Layout.jsx";
import store from "../src/Features/store/store.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
