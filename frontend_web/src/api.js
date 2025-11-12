//
// Simple API client for Notes backend
//
// Uses REACT_APP_API_BASE env var if provided, otherwise defaults to http://localhost:3001
//

const API_BASE =
  process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.trim().length > 0
    ? process.env.REACT_APP_API_BASE
    : "http://localhost:3001";

/**
 * Handle HTTP responses with simple error mapping.
 * Throws an Error with message suitable for user display.
 * @param {Response} res
 * @returns {Promise<any>}
 */
async function handle(res) {
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data && data.detail) {
        msg = Array.isArray(data.detail)
          ? data.detail.map((d) => d.msg || d).join(", ")
          : data.detail;
      } else if (data && data.error && data.error.message) {
        msg = data.error.message;
      }
    } catch {
      // ignore parse error, keep default message
    }
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

// PUBLIC_INTERFACE
export async function listNotes() {
  /** Retrieves all notes from backend. */
  const res = await fetch(`${API_BASE}/notes`, { headers: { Accept: "application/json" } });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function createNote(payload) {
  /** Creates a new note. Payload: { title: string, content: string } */
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function updateNote(id, payload) {
  /** Updates an existing note (PUT). Payload: { title: string, content: string } */
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function patchNote(id, payload) {
  /** Partially updates a note (PATCH). Payload can include title/content */
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Deletes a note by ID. */
  const res = await fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" });
  return handle(res);
}
