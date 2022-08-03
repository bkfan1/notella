import MainActionsMenu from "./MainActionsMenu";
import Recipient from "./Recipient";
import NotePreviewer from "./NotePreviewer";
import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";

export default function LoggedLayout() {
    const {focusMode} = useContext(LayoutContext);

    return (
    <>
      <div className="flex w-full min-h-screen">
        {focusMode ? (
          ""
        ) : (
          <div className="flex flex-col h-full">
            <MainActionsMenu />
            <Recipient />
          </div>
        )}
        <NotePreviewer />
      </div>

      <footer className="footer text-center py-3">
        <p>Created by Jackson Paredes Ferranti (@bkfan1)</p>
      </footer>
    </>
  );
}
