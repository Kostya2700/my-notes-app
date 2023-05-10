import React from "react";

function ListItem({ note, onSelect }) {
  const handleSelect = () => {
    onSelect(note.id);
  };

  return (
    <div className="list-item" onClick={handleSelect}>
      {note.title}
    </div>
  );
}

export default ListItem;
