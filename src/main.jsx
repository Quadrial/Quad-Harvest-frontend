import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "./config";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={config.googleClientId}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
