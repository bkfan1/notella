import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";
import Link from "next/link";

export default function ErrorPageFigure({ errorCode, title, desc }) {
  const { darkMode } = useContext(LayoutContext);
  return (
    <>
      <h1 className="text-4xl text-blue-500 font-bold">{errorCode}</h1>{" "}
      <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : ""}`}>
        {title}
      </h1>
      <p className={`mt-1 ${darkMode ? "text-white" : ""}`}>{desc}</p>
      <Link href="/">
        <a className="mt-4 p-2 rounded bg-blue-500 text-white font-bold">
          Back to app
        </a>
      </Link>
    </>
  );
}
