import React, { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import SearchBox from "./SearchBox";

function Workspace() {
  const { selectedNote, deleteNote, updateNote } = useContext(NotesContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(
    selectedNote?.content || ""
  );

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(selectedNote.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedNote = {
      ...selectedNote,
      content: editedContent,
    };
    updateNote(updatedNote);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(selectedNote.content);
  };

  const handleNoteChange = (event) => {
    setEditedContent(event.target.value);
  };

  return (
    <div className="workspace">
      <SearchBox />
      {selectedNote ? (
        <>
          <div className="note-header">
            <button
              className="workspace-btn-delete"
              onClick={handleDelete}
            ></button>
            {!isEditing ? (
              <button onClick={handleEdit}>Edit</button>
            ) : (
              <>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            )}
          </div>
          {!isEditing ? (
            <div className="note-content">{selectedNote.content}</div>
          ) : (
            <textarea
              className="note-editor"
              value={editedContent}
              onChange={handleNoteChange}
            />
          )}
        </>
      ) : (
        <div className="empty-state">Select a note or create a new one</div>
      )}
    </div>
  );
}

export default Workspace;
