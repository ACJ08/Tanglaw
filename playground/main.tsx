import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PlaygroundApp } from "./PlaygroundApp";

const root = document.getElementById("root");
if (!root) throw new Error("Playground root element is missing.");

createRoot(root).render(<StrictMode><PlaygroundApp /></StrictMode>);
