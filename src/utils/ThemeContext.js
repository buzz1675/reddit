import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem("lightMode");
    if (savedMode !== null) {
      setLightMode(savedMode === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lightMode", lightMode);
  }, [lightMode]);

  return (
    <ThemeContext.Provider value={{ lightMode, setLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return themeContext;
};
