import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import NoteInRecipient from "./NoteInRecipient";

export default function Recipient() {
  const { userNotes, userTrashedNotes, viewTrashedNotes } =
    useContext(NotesContext);
  return (
    <>
      <aside className="recipient">
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
