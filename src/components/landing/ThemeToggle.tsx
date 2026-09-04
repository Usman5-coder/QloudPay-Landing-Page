import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const STORAGE_KEY = "qloudpay-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial: Theme =
      stored ??
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      applyTheme(next);
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggle };
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={cn(
        "group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-1/60 text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundImage: "var(--gradient-glow)" }}
      />
      <Sun
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isLight ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isLight ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
    </button>
  );
}
