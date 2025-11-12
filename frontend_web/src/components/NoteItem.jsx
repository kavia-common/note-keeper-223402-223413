import React from "react";

/**
 * NoteItem shows a single note entry with title, content preview, and actions.
 *
 * Accessibility:
 * - Buttons include aria-labels for screen readers.
 * - Structure uses semantic article for note item.
 */
// PUBLIC_INTERFACE
export default function NoteItem({ note, onEdit, onDelete }) {
  const handleEdit = () => onEdit(note);
  const handleDelete = () => onDelete(note);

  return (
    <article className="note-item" aria-label={`Note titled ${note.title || "Untitled"}`}>
      <div className="note-content">
        <h3 className="note-title">{note.title || "Untitled"}</h3>
        <p className="note-body">{note.content || ""}</p>
        <div className="note-meta">
          <time dateTime={note.updated_at} title={`Updated ${new Date(note.updated_at).toLocaleString()}`}>
            Updated {new Date(note.updated_at).toLocaleString()}
          </time>
        </div>
      </div>
      <div className="note-actions">
        <button
          className="btn btn-outline"
          onClick={handleEdit}
          aria-label={`Edit note ${note.title || note.id}`}
          title="Edit"
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          aria-label={`Delete note ${note.title || note.id}`}
          title="Delete"
        >
          🗑 Delete
        </button>
      </div>
    </article>
  );
}
