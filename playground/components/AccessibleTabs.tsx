import { useId, useRef, useState, type KeyboardEvent } from "react";

const tabs = [
  { label: "Overview", content: "Learn how Tanglaw helps people assess information before sharing it." },
  { label: "Lessons", content: "Explore short, offline-friendly lessons about misleading claims and sources." },
  { label: "Resources", content: "Find practical checklists and trusted community verification support." },
] as const;

export function AccessibleTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const idPrefix = useId().replace(/:/g, "");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectAndFocus = (index: number) => {
    setSelectedIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex !== null) {
      event.preventDefault();
      selectAndFocus(nextIndex);
    }
  };

  return (
    <section className="demo-card" aria-labelledby="tabs-demo-heading">
      <h2 id="tabs-demo-heading">Tabs</h2>
      <p>Use Left/Right Arrow to move and activate tabs; Home and End jump to the first and last tab.</p>
      <div aria-label="Tanglaw learning topics" className="tab-list" role="tablist">
        {tabs.map((tab, index) => {
          const tabId = `${idPrefix}-tab-${index}`;
          const panelId = `${idPrefix}-panel-${index}`;
          return (
            <button
              aria-controls={panelId}
              aria-selected={selectedIndex === index}
              className="tab-button"
              id={tabId}
              key={tab.label}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(element) => { tabRefs.current[index] = element; }}
              role="tab"
              tabIndex={selectedIndex === index ? 0 : -1}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, index) => (
        <div
          aria-labelledby={`${idPrefix}-tab-${index}`}
          className="tab-panel"
          hidden={selectedIndex !== index}
          id={`${idPrefix}-panel-${index}`}
          key={tab.label}
          role="tabpanel"
          tabIndex={0}
        >
          <h3>{tab.label}</h3>
          <p>{tab.content}</p>
        </div>
      ))}
    </section>
  );
}
