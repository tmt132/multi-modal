import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "multi-modal/dist/index.css";
import { ModalProvider } from "multi-modal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </StrictMode>
);
