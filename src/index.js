import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { NotesProvider } from "./NotesContext";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <NotesProvider>
    <App />
  </NotesProvider>
);
