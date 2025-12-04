"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const themes = [
  {
    name: "Solaris",
    className: "theme-solaris",
    description: "Vibrant palette for energetic explorations."
  },
  {
    name: "Nocturne",
    className: "theme-nocturne",
    description: "Deep blues for reflective strategy sessions."
  },
  {
    name: "Praxis",
    className: "theme-praxis",
    description: "Neutral earth tones for pragmatic planning."
  }
];

function ThemeToggle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = themes[index].className;
  }, [index]);

  return (
    <div className="theme-toggle">
      <span className="theme-label">Theme:</span>
      <AnimatePresence mode="wait">
        <motion.button
          key={themes[index].name}
          className="theme-button"
          onClick={() => setIndex((index + 1) % themes.length)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          type="button"
        >
          <span className="theme-name">{themes[index].name}</span>
          <span className="theme-desc">{themes[index].description}</span>
        </motion.button>
      </AnimatePresence>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div className="branding">
              <div className="logo">MA</div>
              <div>
                <h1>Designing Multi-Agent Systems</h1>
                <p>Blueprints, patterns, and tactics for agentic collaboration.</p>
              </div>
            </div>
            <ThemeToggle />
          </header>
          <main>{children}</main>
          <footer className="app-footer">
            <span>© {new Date().getFullYear()} Agentic Patterns Collective</span>
            <a href="https://vercel.com" target="_blank" rel="noreferrer">
              Powered by Vercel
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
