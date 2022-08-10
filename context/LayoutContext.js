import { useState, createContext, useEffect } from "react";

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const [panelIsActive, setPanelIsActive] = useState(true);
  const [windowWidth, setWindowWith] = useState(0);

  useEffect(() => {
    const updateWindowWidth = () => {
      const w = window.innerWidth;
      setWindowWith(w);
    };

    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);

    return () => window.removeEventListener("resize", updateWindowWidth);
  });

  useEffect(() => {
    if (windowWidth > 1024) {
      setPanelIsActive(true);
    }

  }, [windowWidth]);

  useEffect(() => {
    const ls = localStorage;
    const theme = ls.getItem("darkMode");
    const bool = theme === "true" ? true : false;
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
          darkMode,
          setDarkMode,
          handleClickChangeDarkMode,
          panelIsActive,
          setPanelIsActive,
          windowWidth,
        }}
      >
        {children}
      </LayoutContext.Provider>
    </>
  );
};
