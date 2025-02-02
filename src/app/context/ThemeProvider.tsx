"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isBlackAndWhite: false,
  toggleTheme: () => {},
});

// Here I can handle toggeel mode but I only create this know but it didn't work now

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "blackAndWhite") {
      setIsBlackAndWhite(true);
      document.body.classList.add("black-and-white");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isBlackAndWhite;
    setIsBlackAndWhite(newTheme);
    if (newTheme) {
      document.body.classList.add("black-and-white");
      localStorage.setItem("theme", "blackAndWhite");
    } else {
      document.body.classList.remove("black-and-white");
      localStorage.removeItem("theme");
    }
  };

  return (
    <ThemeContext.Provider value={{ isBlackAndWhite, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
