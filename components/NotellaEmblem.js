import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";

export default function NotellaEmblem() {
    const {darkMode} = useContext(LayoutContext);
  return (
    <>
      <figure
        className={`flex flex-col items-center justify-center ${
          darkMode ? "text-white" : ""
        }`}
      >
        <i className="bi bi-journal-bookmark-fill text-2xl" />
        <p className="text-4xl font-bold">Notella</p>
      </figure>
    </>
  );
}
