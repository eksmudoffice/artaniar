import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

const shell = document.getElementById("app-shell");
if (shell) shell.remove();

createRoot(document.getElementById("root")!).render(<App />);