"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // This effect runs once on component mount
  useEffect(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // Apply theme-specific classes and styles
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      document.body.style.backgroundColor = 'var(--base-100)';
      document.body.style.color = 'var(--base-content)';
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      document.body.style.backgroundColor = 'var(--base-100)';
      document.body.style.color = 'var(--base-content)';
    }
    
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by only rendering children after mounted
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
