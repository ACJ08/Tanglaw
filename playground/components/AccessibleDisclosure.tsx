import { useId, useState } from "react";

export function AccessibleDisclosure() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = useId();

  return (
    <section className="demo-card" aria-labelledby="disclosure-demo-heading">
      <h2 id="disclosure-demo-heading">Disclosure</h2>
      <p>A native button supplies the expected Tab, Enter, and Space behavior.</p>
      <button
        aria-controls={contentId}
        aria-expanded={isExpanded}
        className="disclosure-button"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        type="button"
      >
        What is Media &amp; Information Literacy?
        <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
      </button>
      <div hidden={!isExpanded} id={contentId} className="disclosure-content">
        Media and Information Literacy is the ability to find, evaluate, create, and share information thoughtfully and responsibly.
      </div>
    </section>
  );
}
