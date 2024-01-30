import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AllRoutes } from "./routes/routes";
import { SocketState } from "./states/chatSocketState";

import App from "./App.jsx";
import "./index.css";

const MainComp = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [...AllRoutes],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <SocketState>
      <MainComp />
    </SocketState>
  </>
);
