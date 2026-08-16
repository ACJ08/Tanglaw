import { AccessibleDialog } from "./components/AccessibleDialog";
import { AccessibleDisclosure } from "./components/AccessibleDisclosure";
import { AccessibleTabs } from "./components/AccessibleTabs";
import "./styles.css";

export function PlaygroundApp() {
  return (
    <main className="playground-shell">
      <header>
        <p className="eyebrow">Tanglaw · FE-05</p>
        <h1>Accessible Component Fundamentals</h1>
        <p>Standalone manual React implementations for keyboard and screen-reader practice. These components do not use shadcn/ui or Radix UI.</p>
      </header>
      <AccessibleDialog />
      <AccessibleTabs />
      <AccessibleDisclosure />
    </main>
  );
}
