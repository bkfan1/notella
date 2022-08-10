import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { LayoutContext } from "../context/LayoutContext";

export default function NoteInRecipient({ id, title }) {
  const { darkMode } = useContext(LayoutContext);
  const { handleClickNoteInRecipient } = useContext(NotesContext);

  const noteThemeFigure = darkMode
    ? "border-gray-700 hover:bg-blue-900"
    : "border-gray-300 hover:bg-gray-300";

  const noteTitleTheme = darkMode ? "text-white" : "";

  return (
    <>
      <figure
        onClick={() => handleClickNoteInRecipient(id)}
        className={`noteInRecipient ease-in-out duration-100 flex flex-col p-2 border-b ${noteThemeFigure}`}
      >
        <h1 className={`${noteTitleTheme} font-bold`}>
          {title ? title : "Untitled note"}
        </h1>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Click edit or preview...
        </p>
      </figure>
    </>
  );
}
