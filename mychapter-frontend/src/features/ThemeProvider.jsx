import { createContext, useContext, useEffect, useState } from "react";

// 1️⃣ Buat Context kosong
const ThemeContext = createContext({
  theme: "system",
  setTheme: () => {},
});

// 2️⃣ Komponen Provider
export function ThemeProvider({ children }) {
  const storageKey = "app-theme"; // Nama penyimpanan localStorage
  const defaultTheme = "system";

  // 3️⃣ Ambil tema dari localStorage atau pakai default
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  // 4️⃣ Jalankan saat theme berubah
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(systemPrefersDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // 5️⃣ Fungsi ubah theme & simpan ke localStorage
  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  // 6️⃣ Provider memberi akses ke semua anak komponen
  return <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>{children}</ThemeContext.Provider>;
}

// 7️⃣ Hook untuk pakai theme dari context
export function useTheme() {
  return useContext(ThemeContext);
}
