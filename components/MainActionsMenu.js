import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { LayoutContext } from "../context/LayoutContext";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function MainActionsMenu() {
  const {
    addNewNote,
    viewTrashedNotes,
    setViewTrashedNotes,
    currentEditingNote,
  } = useContext(NotesContext);
  const {
    darkMode,
    panelIsActive,
    setPanelIsActive,
    windowWidth,
    handleClickChangeDarkMode,
  } = useContext(LayoutContext);

  const router = useRouter();

  const btnTheme = darkMode ? "actionBtn__dark" : "";

  const logout = async () => {
    try {
      const res = await axios.delete("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const downloadNotes = async () => {
    try {
      const res = await axios.get("/api/download/account/notes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <menu
        className={`mainActionsMenu flex gap-4 justify-center items-center w-full h-12 px-4 py-2 border-b ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <button onClick={logout} className={`${btnTheme}`} title={"Log out"}>
          <i className="bi bi-box-arrow-left text-2xl" />
        </button>

        {viewTrashedNotes ? (
          ""
        ) : (
          <button
            onClick={addNewNote}
            className={`${btnTheme}`}
            title={"Add new note"}
          >
            <i className="bi bi-journal-plus text-2xl" />
          </button>
        )}

        <Link href="/api/download/account/notes" passHref>
          <a
            className={`${btnTheme}`}
            title={"Export notes (download as ZIP)"}
          >
            <i className={`bi bi-folder-symlink text-2xl`} />
          </a>
        </Link>

        <button
          onClick={() => setViewTrashedNotes(!viewTrashedNotes)}
          className={`${btnTheme}`}
          title={"Trashed notes"}
        >
          <i
            className={`bi bi-trash3${
              viewTrashedNotes ? "-fill" : ""
            } text-2xl`}
          />
        </button>

        <button
          onClick={handleClickChangeDarkMode}
          className={`${btnTheme}`}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <i
            className={`${darkMode ? "bi bi-sun-fill" : "bi bi-moon"} text-2xl`}
          />
        </button>

        <button
          onClick={() => router.push("/settings")}
          className={`${btnTheme}`}
          title={"Settings"}
        >
          <i className="bi bi-gear text-2xl" />
        </button>

        {windowWidth < 1024 && currentEditingNote ? (
          <button
            onClick={() => setPanelIsActive(!panelIsActive)}
            className={`${btnTheme}`}
            title="Toggle Panel"
          >
            <i className="bi bi-list text-2xl" />
          </button>
        ) : (
          ""
        )}
      </menu>
    </>
  );
}
