import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { NotesProvider } from "./context/NotesContext";
import App from "./components/App";

createRoot(document.getElementById("root")).render(
  <NotesProvider>
    <App />
  </NotesProvider>
);
