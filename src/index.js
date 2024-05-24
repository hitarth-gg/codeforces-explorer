import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import "@fontsource/inter";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/geologica"; // Defaults to weight 400
import "@fontsource/geologica/400.css"; // Specify weight

import AuthProvider from "./Auth/AuthContext";
// import AuthProvider, { useAuth } from ".src/Auth/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <AuthProvider>
      <Theme appearance="dark">
        <App />
      </Theme>
    </AuthProvider> */}
    <App />
  </React.StrictMode>
);
