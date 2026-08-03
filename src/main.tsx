
  import { Component, type ErrorInfo, type ReactNode } from "react";
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
    state = { error: null as Error | null };
    static getDerivedStateFromError(error: Error) { return { error }; }
    componentDidCatch(error: Error, info: ErrorInfo) { console.error("Tanglaw render error", error, info); }
    render() {
      if (this.state.error) return <main style={{ minHeight: "100%", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui", background: "#f8fafc", color: "#0f172a" }}><section style={{ maxWidth: 560 }}><h1>Tanglaw could not start</h1><p>Please refresh the page. If the issue continues, contact the site administrator.</p></section></main>;
      return this.props.children;
    }
  }

  const root = document.getElementById("root");
  if (!root) throw new Error("Tanglaw root element is missing.");
  createRoot(root).render(<AppErrorBoundary><App /></AppErrorBoundary>);
