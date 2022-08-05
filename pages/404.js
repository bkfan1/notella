import Link from "next/link";
import ErrorPageFigure from "../components/ErrorPageFigure";
import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";

export default function ErrorNotFoundPage() {
  const { darkMode } = useContext(LayoutContext);
  return (
    <>
      <main
        className={`flex flex-col items-center justify-center ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <ErrorPageFigure
          errorCode={404}
          title={"Page not found"}
          desc={"The requested URL was not found on this server."}
        />
      </main>
    </>
  );
}
