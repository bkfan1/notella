import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { LayoutContext } from "../context/LayoutContext";
import NoteInRecipient from "./NoteInRecipient";

export default function Recipient() {
  const { userNotes, userTrashedNotes, viewTrashedNotes } =
    useContext(NotesContext);
    const {darkMode} = useContext(LayoutContext);

    
  return (
    <>
      <aside className={`recipient border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
        <header className={`py-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'} text-center`}>
          <h1 className={`${darkMode ? 'text-white' : ''} font-bold`}>{viewTrashedNotes ? "Trashed Notes" : "All Notes"}</h1>
          <input type="text" placeholder="Search by title..." className={`mt-1 px-2 border ${darkMode ? 'border-gray-700 text-white' : 'border-gray-300'} rounded`} style={{background:'none'}}/>
        </header>
        {viewTrashedNotes ? (
          <>
            {userTrashedNotes.length === 0 ? (
              <figure className="flex flex-col items-center justify-center py-2">
                <h1 className="text-xl font-bold">Nothing here</h1>
                <p className="text-sm text-center text-gray-500">
                  It looks like your trash is empty...
                </p>
              </figure>
            ) : (
              userTrashedNotes.map((trashedNote) => (
                <NoteInRecipient
                  key={trashedNote.id}
                  id={trashedNote.id}
                  title={trashedNote.title}
                />
              ))
            )}
          </>
        ) : (
          <>
            {userNotes.length === 0 ? (
              <>
                <figure className="flex flex-col items-center justify-center py-2">
                  <h1 className="text-xl font-bold">Nothing here</h1>
                  <p className="text-sm text-center text-gray-500">
                    There is no notes yet
                  </p>{" "}
                </figure>
              </>
            ) : (
              userNotes.map((note) => (
                <NoteInRecipient
                  key={note.id}
                  id={note.id}
                  title={note.title}
                />
              ))
            )}
          </>
        )}
      </aside>
    </>
  );
}
