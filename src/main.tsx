import { startTransition } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

// Wrap initial render dalam startTransition supaya browser tetap responsive
// selama React hydration — input user tidak terblok.
startTransition(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
