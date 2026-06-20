import { startTransition } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./globals.css";

// Wrap initial render dalam startTransition supaya browser tetap responsive.
startTransition(() => {
  createRoot(document.getElementById("root")!).render(<App />);

  // Remove HTML app-shell loader once React is mounted.
  const shell = document.getElementById("app-shell");
  if (shell) shell.remove();
});