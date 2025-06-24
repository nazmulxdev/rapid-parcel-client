import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Router from "./Router/Router";
import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
Aos.init();
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-[93.75rem] mx-auto bg-[#F8F9FA]">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {" "}
          <RouterProvider router={Router}></RouterProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
);
