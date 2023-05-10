import React, { useContext } from "react";
import { NotesContext } from "./NotesContext";

function SearchBox() {
  const { searchNotes } = useContext(NotesContext);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    searchNotes(searchTerm);
  };

  return (
    <div className="search-box">
      <input type="text" placeholder="Search notes" onChange={handleSearch} />
    </div>
  );
}

export default SearchBox;
