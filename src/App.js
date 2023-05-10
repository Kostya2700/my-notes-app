import React from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";
import { NotesProvider } from "./NotesContext";

function App() {
  return (
    <div className="app">
      <NotesProvider>
        <Sidebar />
        <Workspace />
      </NotesProvider>
    </div>
  );
}

export default App;
