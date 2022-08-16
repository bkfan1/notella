import { createContext, useEffect, useContext, useState } from "react";
import { LayoutContext } from "./LayoutContext";
import axios from "axios";
import { nanoid } from "nanoid";

export const NotesContext = createContext();

export const NotesProvider = ({ children, notes, trashedNotes }) => {
  const { panelIsActive, setPanelIsActive, windowWidth } =
    useContext(LayoutContext);

  const [userNotes, setUserNotes] = useState(notes);
  const [userTrashedNotes, setUserTrashedNotes] = useState(trashedNotes);

  const [searchValue, setSearchValue] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  const [currentEditingNote, setCurrentEditingNote] = useState(null);
  const [viewTrashedNotes, setViewTrashedNotes] = useState(false);
  const [updatedNotes, setUpdatedNotes] = useState(false);

  useEffect(() => {
    const filterNotesBySearchTerm = () => {
      if (searchValue === "") {
        if (viewTrashedNotes) {
          setFilteredNotes(userTrashedNotes);
          return;
        }
        setFilteredNotes(userNotes);
        return;
      }

      let results;
      if (viewTrashedNotes) {
        results = [...userTrashedNotes];
      } else {
        results = [...userNotes];
      }

      setFilteredNotes(
        results.filter(
          (note) =>
            note.title === searchValue || note.title.includes(searchValue)
        )
      );
    };

    filterNotesBySearchTerm();
  }, [searchValue, viewTrashedNotes, userNotes, userTrashedNotes]);

  useEffect(() => {
    const updateNotes = async () => {
      const data = { notes: userNotes, trashedNotes: userTrashedNotes };
      try {
        const res = await axios.put("/api/account/notes", data);
        setUpdatedNotes(true);

        setTimeout(() => {
          setUpdatedNotes(false);
        }, 2500);
      } catch (error) {
        console.log(error);
      }
    };

    const timer = setTimeout(() => {
      updateNotes();
    }, 1000);

    return () => clearInterval(timer);
  }, [userNotes, userTrashedNotes]);

  useEffect(() => {
    setCurrentEditingNote(null);
  }, [viewTrashedNotes]);

  const addNewNote = () => {
    if (viewTrashedNotes) {
      setViewTrashedNotes(false);
    }

    const newNote = {
      id: nanoid(),
      title: "Untitled note",
      body: "Content goes here",
    };

    // Append new note at the beginning
    setUserNotes([newNote, ...userNotes]);
  };

  const deleteNote = (id) => {
    const index = userNotes.findIndex((note) => note.id === id);
    const newUserNotes = [...userNotes];
    newUserNotes.splice(index, 1);

    setUserNotes(newUserNotes);
  };

  const handleClickNoteInRecipient = (id) => {
    let clickedNote;
    if (windowWidth < 1024) {
      if (panelIsActive) {
        setPanelIsActive(false);
      }
    }

    if (viewTrashedNotes) {
      clickedNote = userTrashedNotes.find((note) => note.id === id);
    } else {
      clickedNote = userNotes.find((note) => note.id === id);
    }

    setCurrentEditingNote(clickedNote);
  };

  const handleOnChangeCurrentEditingNote = (e, id) => {
    const { target } = e;
    const { name, value } = target;

    const index = userNotes.findIndex((note) => note.id === id);
    let copiedNote = Object.assign({}, userNotes[index]);
    copiedNote[name] = value;

    const copiedNotes = [...userNotes];
    copiedNotes.splice(index, 1, copiedNote);

    setCurrentEditingNote(copiedNote);
    setUserNotes(copiedNotes);
  };

  const handleDeleteCurrentEditingNote = () => {
    const copiedCurrentEditingNote = { ...currentEditingNote };
    setCurrentEditingNote(null);

    const index = userNotes.findIndex(
      (note) => note.id === copiedCurrentEditingNote.id
    );

    const updatedUserNotes = [...userNotes];
    const [removed] = updatedUserNotes.splice(index, 1);

    const newTrashedNotes = [...userTrashedNotes];
    newTrashedNotes.push(removed);

    setUserNotes(updatedUserNotes);
    setUserTrashedNotes(newTrashedNotes);
  };

  const handleRemoveNoteFromTrash = (id) => {
    setCurrentEditingNote(null);
    const index = userTrashedNotes.findIndex((note) => note.id === id);

    const newTrashedNotes = [...userTrashedNotes];
    const [removed] = newTrashedNotes.splice(index, 1);

    setUserTrashedNotes(newTrashedNotes);
    setUserNotes([...userNotes, removed]);
  };

  const handleDeleteNoteFromTrash = () => {
    const copiedCurrentEditingNote = { ...currentEditingNote };
    setCurrentEditingNote(null);
    const index = userTrashedNotes.findIndex(
      (note) => note.id === copiedCurrentEditingNote.id
    );
    const updatedTrashedNotes = [...userTrashedNotes];
    updatedTrashedNotes.splice(index, 1);
    setUserTrashedNotes(updatedTrashedNotes);
  };

  return (
    <>
      <NotesContext.Provider
        value={{
          userNotes,
          userTrashedNotes,
          addNewNote,
          deleteNote,
          viewTrashedNotes,
          setViewTrashedNotes,
          handleClickNoteInRecipient,
          currentEditingNote,
          handleOnChangeCurrentEditingNote,
          handleDeleteCurrentEditingNote,
          handleRemoveNoteFromTrash,
          handleDeleteNoteFromTrash,
          searchValue,
          setSearchValue,
          filteredNotes,
          updatedNotes,
        }}
      >
        {children}
      </NotesContext.Provider>
    </>
  );
};
