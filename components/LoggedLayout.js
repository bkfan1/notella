import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";
import { NotesContext } from "../context/NotesContext";

import MainActionsMenu from "./MainActionsMenu";
import Recipient from "./Recipient";
import NotePreviewer from "./NotePreviewer";

export default function LoggedLayout() {
  const { darkMode, panelIsActive } = useContext(LayoutContext);

  const { currentEditingNote, updatedNotes } = useContext(NotesContext);

  return (
    <>
      <main className="flex w-full h-screen">

          {updatedNotes ? (
            <p className="toast fixed left-0 bottom-0 p-4 mb-4 ml-4 bg-green-600 text-white rounded z-50 ">
              <i className="bi bi-check-circle" /> Updated notes
            </p>
          ) : (
            ""
          )}

        <aside
          className={`panel flex flex-col h-full ${
            currentEditingNote && !panelIsActive ? "hidden" : ""
          } `}
        >
          <MainActionsMenu />
          <Recipient />
        </aside>

        <NotePreviewer />
      </main>

      <footer
        className={`footer ${darkMode ? "text-white" : ""} text-center py-3`}
      >
        <p>Created by Jackson Paredes Ferranti (@bkfan1)</p>
        <a href="https://www.github.com/bkfan1">
          <i className="bi bi-github" />
        </a>
      </footer>
    </>
  );
}
