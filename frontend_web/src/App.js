import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import NotesList from "./components/NotesList";
import NoteModal from "./components/NoteModal";
import { listNotes, createNote, updateNote, deleteNote } from "./api";

/**
 * App - Notes UI
 *
 * Features:
 * - Top navbar with title
 * - List of notes
 * - Floating action button to add a note
 * - Modal for add/edit
 * - Simple error banner
 * - Accessible controls with aria-labels
 */
// PUBLIC_INTERFACE
function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerError, setBannerError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // note object when editing

  const sortedNotes = useMemo(() => {
    // Ensure list is sorted by updated_at desc (backend already does, but safe)
    return [...notes].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  }, [notes]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setBannerError("");
    try {
      const data = await listNotes();
      setNotes(Array.isArray(data) ? data : []);
    } catch (e) {
      setBannerError(e?.message || "Failed to load notes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const openCreate = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEdit = (note) => {
    setEditing(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  const saveNote = async ({ title, content }) => {
    try {
      setBannerError("");
      if (editing) {
        const updated = await updateNote(editing.id, { title, content });
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
      } else {
        const created = await createNote({ title, content });
        setNotes((prev) => [created, ...prev]);
      }
      closeModal();
    } catch (e) {
      setBannerError(e?.message || "Failed to save note.");
    }
  };

  const removeNote = async (note) => {
    if (!window.confirm(`Delete note "${note.title || note.id}"?`)) {
      return;
    }
    try {
      setBannerError("");
      await deleteNote(note.id);
      setNotes((prev) => prev.filter((n) => n.id !== note.id));
    } catch (e) {
      setBannerError(e?.message || "Failed to delete note.");
    }
  };

  return (
    <div className="app-root">
      <nav className="navbar" role="navigation" aria-label="Top Navigation">
        <div className="navbar-inner">
          <div className="brand">
            <span className="brand-logo" aria-hidden="true">🗒</span>
            <span className="brand-title">Note Keeper</span>
          </div>
          <div className="nav-actions">
            <button
              className="btn btn-outline"
              onClick={refresh}
              aria-label="Refresh notes"
              title="Refresh"
            >
              ↻ Refresh
            </button>
          </div>
        </div>
      </nav>

      {bannerError && (
        <div className="alert error" role="alert" aria-live="assertive">
          {bannerError}
        </div>
      )}

      <main className="container">
        {loading ? (
          <div className="loading" role="status" aria-live="polite">
            Loading notes...
          </div>
        ) : (
          <NotesList notes={sortedNotes} onEdit={openEdit} onDelete={removeNote} />
        )}
      </main>

      <button
        className="fab"
        onClick={openCreate}
        aria-label="Add a new note"
        title="Add Note"
      >
        +
      </button>

      <NoteModal
        isOpen={isModalOpen}
        initial={editing}
        onCancel={closeModal}
        onSave={saveNote}
      />
    </div>
  );
}

export default App;
