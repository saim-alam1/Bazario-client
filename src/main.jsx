import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./components/Router/Router";
import AuthProvider from "./contexts/AuthProvider";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Custom Toastify Style
const getToastStyle = () => {
  return window.innerWidth >= 768
    ? { width: "400px", marginTop: "20px" } // for md and above devices
    : { width: "90%", marginTop: "10px" }; // for mobile devices
};

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
    <ToastContainer toastStyle={getToastStyle()} />
  </StrictMode>,
);
