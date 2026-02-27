import React, { createContext, useState, useContext } from "react";

// 1. Khởi tạo context với giá trị mặc định
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
});

// 2. Tạo Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Hàm chuyển đổi theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const contextValue = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};