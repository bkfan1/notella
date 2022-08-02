import { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NotePreviewer() {
  const {
    userNotes,
    userTrashedNotes,
    setUserNotes,
    setUserTrashedNotes,
    viewTrashedNotes,
    currentEditingNote,
    handleOnChangeCurrentEditingNote,
    handleDeleteCurrentEditingNote,
    handleRemoveNoteFromTrash,
    handleDeleteNoteFromTrash,
  } = useContext(NotesContext);

  const [viewAsMarkdown, setViewAsMarkdown] = useState(false);

  return (
    <>
      <section className="notePreviewer flex flex-col w-full min-h-screen">
        {currentEditingNote ? (
          <>
            <header className="notePreviewer__header flex items-center justify-between w-full h-12 px-3">
              <input
                type="text"
                name="title"
                placeholder="Title goes here..."
                className="px-1 outline-none border-none"
                disabled={viewTrashedNotes ? true : false}
                value={
                  currentEditingNote.title
                    ? currentEditingNote.title
                    : "Untitled note"
                }
                onChange={(e) =>
                  handleOnChangeCurrentEditingNote(e, currentEditingNote.id)
                }
              />
              <menu className="flex px-1 gap-6">
                {!viewTrashedNotes ? (
                  <button
                    onClick={handleDeleteCurrentEditingNote}
                    className="text-gray-800"
                  >
                    <i className={"bi bi-trash text-2xl"} />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        handleRemoveNoteFromTrash(currentEditingNote.id)
                      }
                      title="Remove from trash"
                      className="text-gray-800"
                    >
                      <i className="bi bi-arrow-counterclockwise text-2xl" />
                    </button>

                    <button
                      onClick={handleDeleteNoteFromTrash}
                      className="text-gray-800"
                      title={'Delete definitely from trash'}
                    >
                      <i className="bi bi-x-circle-fill text-2xl" />
                    </button>
                  </>
                )}

                <button
                  onClick={() => setViewAsMarkdown(!viewAsMarkdown)}
                  className="text-gray-800"
                  title={
                    viewAsMarkdown ? "View as plain text" : "View as Markdown"
                  }
                >
                  <i
                    className={
                      viewAsMarkdown
                        ? "bi bi-eye text-2xl"
                        : "bi bi-markdown text-2xl"
                    }
                  />
                </button>
              </menu>
            </header>

            <div className="w-full h-full p-4">
              {viewAsMarkdown ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="prose w-full h-full overflow-y-scroll prose-stone "
                >
                  {currentEditingNote.body}
                </ReactMarkdown>
              ) : (
                <textarea
                  value={
                    currentEditingNote.body
                      ? currentEditingNote.body
                      : "Content goes here"
                  }
                  disabled={viewTrashedNotes ? true : false}
                  name="body"
                  className="noteBody__textarea"
                  onChange={(e) =>
                    handleOnChangeCurrentEditingNote(e, currentEditingNote.id)
                  }
                ></textarea>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
