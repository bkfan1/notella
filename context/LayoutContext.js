import { useState, createContext, useEffect } from "react";

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [focusMode, setFocusMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const ls = localStorage;
    const theme = ls.getItem("darkMode");

    if (theme) {
      const bool = Boolean(theme);
      setDarkMode(theme);
    }
  }, []);

  const handleClickChangeDarkMode = () => {
    const ls = localStorage;
    if (darkMode) {
      setDarkMode(false);
      ls.setItem("darkMode", "false");
    }

    if (!darkMode) {
      setDarkMode(true);
      ls.setItem("darkMode", "true");
    }
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
