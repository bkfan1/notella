import { useState, useContext } from "react";
import { LayoutContext } from "../../context/LayoutContext";

export default function SettingsForm() {
  const { darkMode } = useContext(LayoutContext);
  const [section, setSection] = useState("email");
  const handleClickSection = (e) => {
    e.preventDefault();
    const { target } = e;
    const { name } = target;
    setSection(name);
  };
  return (
    <>
      <form className="flex flex-col h-fit-content p-4 rounded">
        <header
          className={`flex gap-4 justify-center items-center mb-2 ${
            darkMode ? "text-white" : ""
          } font-bold`}
        >
          <button
            name="email"
            onClick={(e) => handleClickSection(e)}
            className={`border-b-4 ${
              section === "email" ? "border-b-blue-500" : "border-b-gray-300"
            }`}
          >
            Email
          </button>

          <button
            name="password"
            onClick={(e) => handleClickSection(e)}
            className={`border-b-4 ${
              section === "password" ? "border-b-blue-500" : "border-b-gray-300"
            }`}
          >
            Password
          </button>
        </header>
        {section === "email" ? (
          <>
            <div className="flex flex-col gap-2">
              <input
                type="password"
                placeholder="New email address"
                className="formInput"
              />
              <input
                type="password"
                placeholder="Confirm email address"
                className="formInput"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <input
                type="password"
                placeholder="Old password"
                className="formInput"
              />
              <input
                type="password"
                placeholder="New password"
                className="formInput"
              />

              <input
                type="password"
                placeholder="Confirm new password"
                className="formInput"
              />
            </div>
          </>
        )}

        <button className="mt-4 py-2 text-white bg-blue-500 hover:opacity-90">
          Update
        </button>
      </form>
    </>
  );
}
