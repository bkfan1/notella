import { useState, createContext, useEffect } from "react";

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [focusMode, setFocusMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const ls = localStorage;
    const theme = ls.getItem("darkMode");
    const bool = theme === "true" ? true : false;
    console.log(bool);
    if (theme) {
      setDarkMode(bool);
      return;
    }
  }, []);

  const handleClickChangeDarkMode = () => {
    const ls = localStorage;
    if (darkMode) {
      ls.setItem("darkMode", false);
    }

    if (!darkMode) {
      ls.setItem("darkMode", true);
    }

    setDarkMode(!darkMode);
  };

  return (
    <>
      <LayoutContext.Provider
        value={{
          focusMode,
          setFocusMode,
          darkMode,
          setDarkMode,
          handleClickChangeDarkMode,
        }}
      >
        {children}
      </LayoutContext.Provider>
    </>
  );
};
