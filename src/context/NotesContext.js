import React, { createContext, useState, useEffect } from "react";

export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [originalNotes, setOriginalNotes] = useState([]);

  useEffect(() => {
    const savedNotes = loadNotes();
    setNotes(savedNotes);
    setOriginalNotes(savedNotes);
  }, []);

  useEffect(() => {
    if (selectedNote) {
      saveNotes(notes);
    }
  }, [notes, selectedNote]);

  const loadNotes = () => {
    const savedNotesString = localStorage.getItem("notes");
    if (savedNotesString) {
      return JSON.parse(savedNotesString);
    }
    return [];
  };

  const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
  };

  const selectNote = (noteId) => {
    const selected = notes.find((note) => note.id === noteId);
    setSelectedNote(selected);
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setSelectedNote(updatedNote);
  };

  const updateNoteTitle = (noteId, newTitle) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, title: newTitle } : note
    );
    setNotes(updatedNotes);
    setSelectedNote((prevNote) =>
      prevNote && prevNote.id === noteId
        ? { ...prevNote, title: newTitle }
        : prevNote
    );
  };

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    setSelectedNote(null);
  };
  const searchNotes = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setNotes(originalNotes);
    } else {
      const filteredNotes = originalNotes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setNotes(filteredNotes);

      const updatedSelectedNote = filteredNotes.find(
        (note) => note.id === selectedNote?.id
      );
      setSelectedNote(updatedSelectedNote || null);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        selectedNote,
        createNote,
        selectNote,
        updateNote,
        updateNoteTitle,
        deleteNote,
        searchNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
