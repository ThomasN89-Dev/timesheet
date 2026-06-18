import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import "./i18n.ts";
import AppRoutes from "./routes/routes.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <StrictMode>
          <AppRoutes />
        </StrictMode>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
