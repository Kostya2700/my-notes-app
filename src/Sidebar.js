import React, { useContext } from "react";
import { NotesContext } from "./NotesContext";

function Sidebar() {
  const { notes, createNote, selectNote, updateNote, selectedNote } =
    useContext(NotesContext);

  const handleNoteClick = (noteId) => {
    selectNote(noteId);
  };

  const handleEditNote = () => {
    const newTitle = prompt("Enter a new title", selectedNote.title);
    if (newTitle) {
      const updatedNote = { ...selectedNote, title: newTitle };
      updateNote(updatedNote);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Notes</h1>
        <button onClick={createNote} className="button-add"></button>
      </div>
      <div className="sidebar-notes">
        {notes &&
          notes.map((note) => (
            <div
              key={note.id}
              className={`sidebar-note ${
                note.id === selectedNote?.id ? "active" : ""
              }`}
              onClick={() => handleNoteClick(note.id)}
            >
              <h3>{note.title}</h3>
              {note.id === selectedNote?.id && (
                <div>
                  <button
                    className="sidebar-btn"
                    onClick={handleEditNote}
                    disabled={!selectedNote}
                  >
                    Edit Title
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
