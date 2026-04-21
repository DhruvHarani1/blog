import { useMemo, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState([]);

  const canAddNote = useMemo(
    () => title.trim().length > 0 || body.trim().length > 0,
    [title, body]
  );

  const handleAddNote = (event) => {
    event.preventDefault();

    if (!canAddNote) {
      return;
    }

    const newNote = {
      id: crypto.randomUUID(),
      title: title.trim() || "Untitled note",
      body: body.trim(),
      createdAt: new Date().toLocaleString(),
    };

    setNotes((currentNotes) => [newNote, ...currentNotes]);
    setTitle("");
    setBody("");
  };

  const handleDeleteNote = (noteId) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== noteId));
  };

  return (
    <div className="app-shell">
      <main className="notes-app">
        <h1>Simple Notes</h1>
        <p className="subtitle">Capture quick thoughts and keep them organized.</p>

        <form className="note-form" onSubmit={handleAddNote}>
          <label htmlFor="note-title">Title</label>
          <input
            id="note-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Meeting notes"
          />

          <label htmlFor="note-body">Note</label>
          <textarea
            id="note-body"
            rows="4"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Write your note here..."
          />

          <button type="submit" disabled={!canAddNote}>
            Add note
          </button>
        </form>

        <section className="notes-list" aria-live="polite">
          {notes.length === 0 ? (
            <p className="empty-state">No notes yet. Add your first one above.</p>
          ) : (
            notes.map((note) => (
              <article className="note-card" key={note.id}>
                <header>
                  <h2>{note.title}</h2>
                  <small>{note.createdAt}</small>
                </header>
                <p>{note.body || "(No content)"}</p>
                <button type="button" onClick={() => handleDeleteNote(note.id)}>
                  Delete
                </button>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
