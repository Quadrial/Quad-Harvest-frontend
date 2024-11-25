import { useEffect, useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";

const Index = () => {
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/google-client-id"
        );
        const data = await response.json();
        setClientId(data.clientId);
      } catch (error) {
        console.error("Failed to fetch Google Client ID:", error);
      }
    };

    fetchClientId();
  }, []);

  if (!clientId) return <p>Loading...</p>;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

createRoot(document.getElementById("root")).render(<Index />);
