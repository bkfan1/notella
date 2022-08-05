import { useContext, useEffect, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LayoutContext } from "../context/LayoutContext";
import NotellaEmblem from "./NotellaEmblem";

export default function NotePreviewer() {
  const {
    viewTrashedNotes,
    currentEditingNote,
    handleOnChangeCurrentEditingNote,
    handleDeleteCurrentEditingNote,
    handleRemoveNoteFromTrash,
    handleDeleteNoteFromTrash,
  } = useContext(NotesContext);

  const { focusMode, setFocusMode, darkMode } = useContext(LayoutContext);

  const [viewAsMarkdown, setViewAsMarkdown] = useState(true);

  const btnTheme = darkMode ? "actionBtn__dark" : "";

  return (
    <>
      <section
        className={`notePreviewer flex flex-col w-full min-h-screen ${
          !currentEditingNote ? "justify-center items-center" : ""
        } border-l border-b ${
          darkMode ? "border-gray-700" : "border-gray-300"
        } `}
      >
        {currentEditingNote ? (
          <>
            <header
              className={`notePreviewer__header flex items-center justify-between w-full h-12 px-3 border-b ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFocusMode(!focusMode)}
                  className={`${btnTheme}`}
                  title="Toggle focus mode"
                >
                  <i className="bi bi-window text-2xl" />
                </button>

                <input
                  type="text"
                  name="title"
                  placeholder="Title goes here..."
                  className={`px-1 outline-none border-none ${
                    darkMode ? "text-white" : ""
                  }`}
                  style={{ background: "none" }}
                  disabled={viewTrashedNotes ? true : false}
                  value={currentEditingNote.title}
                  onChange={(e) =>
                    handleOnChangeCurrentEditingNote(e, currentEditingNote.id)
                  }
                />
              </div>
              <menu className="flex px-1 gap-6">
                {!viewTrashedNotes ? (
                  <button
                    onClick={handleDeleteCurrentEditingNote}
                    className={`${btnTheme}`}
                    title="Send to trash"
                  >
                    <i className={`bi bi-trash text-2xl`} />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        handleRemoveNoteFromTrash(currentEditingNote.id)
                      }
                      title="Remove from trash"
                      className={`${btnTheme}`}
                    >
                      <i className="bi bi-arrow-counterclockwise text-2xl" />
                    </button>

                    <button
                      onClick={handleDeleteNoteFromTrash}
                      className={`${btnTheme}`}
                      title={"Delete permanently"}
                    >
                      <i className="bi bi-x-circle-fill text-2xl" />
                    </button>
                  </>
                )}

                <button
                  onClick={() => setViewAsMarkdown(!viewAsMarkdown)}
                  className={`${btnTheme}`}
                  title={`${
                    viewTrashedNotes
                      ? viewAsMarkdown
                        ? "View as plain text"
                        : "View as markdown"
                      : viewAsMarkdown
                      ? "Edit"
                      : "View as markdown"
                  }`}
                >
                  <i
                    className={`${
                      viewTrashedNotes
                        ? viewAsMarkdown
                          ? "bi bi-eye"
                          : "bi bi-markdown"
                        : viewAsMarkdown
                        ? "bi bi-pencil"
                        : "bi bi-markdown"
                    } text-2xl`}
                  />
                </button>
              </menu>
            </header>

            <div className="w-full h-full p-4">
              {viewAsMarkdown ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className={`prose w-full h-full overflow-y-scroll ${
                    darkMode ? "prose-invert" : "prose-stone"
                  }`}
                >
                  {currentEditingNote.body}
                </ReactMarkdown>
              ) : (
                <textarea
                  value={currentEditingNote.body}
                  disabled={viewTrashedNotes ? true : false}
                  name="body"
                  className={`noteBody__textarea ${
                    darkMode ? "text-white" : ""
                  }`}
                  style={{ background: "none" }}
                  onChange={(e) =>
                    handleOnChangeCurrentEditingNote(e, currentEditingNote.id)
                  }
                  placeholder="Content goes here"
                ></textarea>
              )}
            </div>
          </>
        ) : (
          <>
            <NotellaEmblem/>
          </>
        )}
      </section>
    </>
  );
}
