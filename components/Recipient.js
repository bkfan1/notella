import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { LayoutContext } from "../context/LayoutContext";
import NoteInRecipient from "./NoteInRecipient";

export default function Recipient() {
  const { viewTrashedNotes, setSearchValue, filteredNotes } =
    useContext(NotesContext);
  const { darkMode } = useContext(LayoutContext);

  return (
    <>
      <aside
        className={`recipient overflow-y-scroll border-b ${
          darkMode ? "bg-gray-800 border-gray-700 " : "bg-white border-gray-300"
        } h-full`}
      >
        <header
          className={`p-3 border-b ${
            darkMode ? "border-gray-700" : "border-gray-300"
          } text-center`}
        >
          <h1 className={`${darkMode ? "text-white" : ""} font-bold`}>
            {viewTrashedNotes ? "Trashed Notes" : "All Notes"}
          </h1>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search by title..."
            className={`mt-1 px-2 border ${
              darkMode ? "border-gray-700 text-white" : "border-gray-300"
            } rounded`}
            style={{ background: "none", outline: "none" }}
          />
        </header>

        {filteredNotes.length === 0 ? (
          <p className="pt-4 text-center text-gray-500">
            {viewTrashedNotes ? "No trashed notes found." : "No notes found."}
          </p>
        ) : (
          filteredNotes.map((note) => (
            <NoteInRecipient key={note.id} id={note.id} title={note.title} />
          ))
        )}
      </aside>
    </>
  );
}
