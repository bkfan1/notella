import MainActionsMenu from "./MainActionsMenu";
import Recipient from "./Recipient";
import NotePreviewer from "./NotePreviewer";
import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";

export default function LoggedLayout() {
  const { focusMode, darkMode } = useContext(LayoutContext);

  return (
    <>
      <div className="flex w-full min-h-screen">
        {focusMode ? (
          ""
        ) : (
          <div className="someShit flex flex-col h-full">
            <MainActionsMenu />
            <Recipient />
          </div>
        )}
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
