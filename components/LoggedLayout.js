import MainActionsMenu from "./MainActionsMenu";
import Recipient from "./Recipient";
import NotePreviewer from "./NotePreviewer";
import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";
import { NotesContext } from "../context/NotesContext";

export default function LoggedLayout() {
  const { darkMode, panelIsActive, windowWidth } = useContext(LayoutContext);

  return (
    <>
      <div className="flex w-full h-screen">
        <div
          className={`lateralPanel flex flex-col h-full ${
            windowWidth < 1024
              ? panelIsActive
                ? "lateralPanel__mobile"
                : "hidden"
              : ""
          }`}
        >
          <MainActionsMenu />
          <Recipient />
        </div>

        <NotePreviewer />
      </div>

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
