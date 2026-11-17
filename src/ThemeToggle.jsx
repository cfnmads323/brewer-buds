import { useEffect, useState } from "react";

function getInitial() {
  // index.html sets data-theme before first paint; fall back to the system setting
  return (
    document.documentElement.dataset.theme ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage blocked: the choice just won't be remembered*/
    }
  }, [theme]);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-pressed={theme == "dark"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Dark Mode
    </button>
  );
}
