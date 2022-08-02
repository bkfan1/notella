import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import NoteInRecipient from "./NoteInRecipient";

export default function Recipient() {
  const { userNotes, userTrashedNotes, viewTrashedNotes} =
    useContext(NotesContext);
  return (
    <>
      <aside className="recipient min-h-screen">
        {viewTrashedNotes ? (
          <>
            {userTrashedNotes.map((trashedNote) => (
              <NoteInRecipient
                key={trashedNote.id}
                id={trashedNote.id}
                title={trashedNote.title}
              />
            ))}
          </>
        ) : (
          <>
            {userNotes.map((note) => (
              <NoteInRecipient
                key={note.id}
                id={note.id}
                title={note.title}
              />
            ))}
          </>
        )}
      </aside>
    </>
  );
}
