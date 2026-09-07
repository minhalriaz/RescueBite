import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Theme is resolved from localStorage / system preference in the context
// before the first render, so no mounting guard is required.
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] text-[color:var(--color-rescue-text-muted)] hover:text-[#0F9F76] hover:border-[#0F9F76] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F9F76] focus:ring-offset-2"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}