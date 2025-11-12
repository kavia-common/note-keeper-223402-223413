import React from "react";
import NoteItem from "./NoteItem";

/**
 * NotesList renders a list of notes and propagates edit/delete handlers.
 */
// PUBLIC_INTERFACE
export default function NotesList({ notes, onEdit, onDelete }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <div className="empty-emoji" aria-hidden="true">📝</div>
        <p className="empty-text">No notes yet. Click the + button to create your first note.</p>
      </div>
    );
  }

  return (
    <section className="notes-list" aria-label="Notes list">
      {notes.map((n) => (
        <NoteItem key={n.id} note={n} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}
