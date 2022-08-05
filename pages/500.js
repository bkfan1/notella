import Link from "next/link";
import { useContext } from "react";
import ErrorPageFigure from "../components/ErrorPageFigure";
import { LayoutContext } from "../context/LayoutContext";

export default function ServerErrorPage() {
  const { darkMode } = useContext(LayoutContext);
  return (
    <>
      <main
        className={`flex flex-col items-center justify-center ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <ErrorPageFigure
          errorCode={500}
          title={"Server error"}
          desc={
            "Something went wrong while attempting to get resources from the server."
          }
        />
      </main>
    </>
  );
}
