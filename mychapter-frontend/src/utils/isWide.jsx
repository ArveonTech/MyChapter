import { useState, useEffect } from "react";

export function useIsWide() {
  const check = () => window.innerWidth >= 768;

  const [isWide, setIsWide] = useState(check());

  useEffect(() => {
    const handle = () => setIsWide(check());
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return isWide;
}
