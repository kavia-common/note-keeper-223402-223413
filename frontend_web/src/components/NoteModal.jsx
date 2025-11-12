import React, { useEffect, useRef, useState } from "react";

/**
 * NoteModal
 * A simple accessible modal for creating or editing a note.
 *
 * Props:
 * - isOpen: boolean
 * - initial: { title?: string, content?: string } | null
 * - onCancel(): void
 * - onSave({title, content}): Promise<void> | void
 *
 * Accessibility:
 * - role="dialog" with aria-modal="true"
 * - Focus trap basics: focus first input when opened
 * - Esc to close
 * - Labels associated with inputs
 */
// PUBLIC_INTERFACE
export default function NoteModal({ isOpen, initial, onCancel, onSave }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [error, setError] = useState("");
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTitle(initial?.title || "");
      setContent(initial?.content || "");
      setError("");
      setTimeout(() => {
        firstFieldRef.current?.focus();
      }, 0);
    }
  }, [isOpen, initial]);

  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.stopPropagation();
        onCancel();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onCancel]);

  const submit = async (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle || !trimmedContent) {
      setError("Please provide both a title and content.");
      return;
    }
    setError("");
    await Promise.resolve(onSave({ title: trimmedTitle, content: trimmedContent }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" aria-hidden={!isOpen}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="note-modal-title">
        <h2 id="note-modal-title">{initial ? "Edit Note" : "Add Note"}</h2>
        {error && (
          <div role="alert" className="alert error">
            {error}
          </div>
        )}
        <form onSubmit={submit}>
          <div className="form-field">
            <label htmlFor="note-title">Title</label>
            <input
              id="note-title"
              ref={firstFieldRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              aria-required="true"
            />
          </div>
          <div className="form-field">
            <label htmlFor="note-content">Content</label>
            <textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              rows={6}
              aria-required="true"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onCancel} aria-label="Cancel">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" aria-label="Save note">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
