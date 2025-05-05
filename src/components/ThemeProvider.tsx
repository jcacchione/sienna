"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // This effect runs once on component mount
  useEffect(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute("data-theme", savedTheme);
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by only rendering children after mounted
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
