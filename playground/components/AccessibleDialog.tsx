import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true",
  );
}

export function AccessibleDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;

    if (!previouslyFocusedElementRef.current) {
      previouslyFocusedElementRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    }
    const focusDialog = () => getFocusableElements(dialogRef.current!).at(0)?.focus();
    const frame = window.requestAnimationFrame(focusDialog);

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen || !previouslyFocusedElementRef.current) return;
    previouslyFocusedElementRef.current.focus();
    previouslyFocusedElementRef.current = null;
  }, [isOpen]);

  const closeDialog = () => setIsOpen(false);

  const openDialog = (event: MouseEvent<HTMLButtonElement>) => {
    previouslyFocusedElementRef.current = event.currentTarget;
    setIsOpen(true);
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusableElements = getFocusableElements(dialogRef.current);
    if (focusableElements.length === 0) {
      event.preventDefault();
      dialogRef.current.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <section className="demo-card" aria-labelledby="dialog-demo-heading">
      <h2 id="dialog-demo-heading">Modal dialog</h2>
      <p>Open it, then use Tab, Shift+Tab, and Escape to test focus management.</p>
      <button className="primary-button" type="button" onClick={openDialog}>
        Open Accessible Dialog
      </button>
      {isOpen && createPortal(
        <div className="dialog-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}>
          <div
            aria-describedby={descriptionId}
            aria-labelledby={titleId}
            aria-modal="true"
            className="dialog"
            onKeyDown={handleDialogKeyDown}
            ref={dialogRef}
            role="dialog"
            tabIndex={-1}
          >
            <h3 id={titleId}>Practice a safer information check</h3>
            <p id={descriptionId}>This educational dialog keeps keyboard focus inside until it is closed.</p>
            <label htmlFor="dialog-note">What claim would you like to verify?</label>
            <input id="dialog-note" name="dialog-note" placeholder="Type a short claim" />
            <label className="checkbox-label"><input type="checkbox" /> Save this practice note</label>
            <div className="dialog-actions">
              <button type="button" onClick={closeDialog}>Cancel</button>
              <button className="primary-button" type="button" onClick={closeDialog}>Save note</button>
              <button type="button" onClick={closeDialog}>Close dialog</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
