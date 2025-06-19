import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Router from "./Router/Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-[93.75rem] mx-auto">
      <RouterProvider router={Router}></RouterProvider>
    </div>
  </StrictMode>,
);
