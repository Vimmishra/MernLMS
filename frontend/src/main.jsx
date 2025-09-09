import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider, useAuth } from "./context/authContext";
import "./index.css";
import Navbar from "./components/common/Navbar";

// Wrapper to conditionally show Navbar
const Layout = () => {
  const { user } = useAuth();
  return (
    <>
      {user && <Navbar />}  {/* Show navbar only if user is logged in */}
      <App />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Layout />
    </AuthProvider>
  </BrowserRouter>
);
