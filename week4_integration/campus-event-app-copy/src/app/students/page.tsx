"use client";

import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    StudentName: "",
    StudentEmail: "",
    StudentPhone: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/students");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load students");
      setStudents(Array.isArray(json) ? json : []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Unable to load students");
      setStudents([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function add() {
    setError("");
    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to add student");
      return;
    }
    reset();
    load();
  }

  async function update() {
    setError("");
    const res = await fetch("/api/students", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, StudentID: editId }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to update student");
      return;
    }
    reset();
    setEditId(null);
    load();
  }

  async function del(id: number) {
    setError("");
    const res = await fetch(`/api/students?StudentID=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to delete student");
      return;
    }
    load();
  }

  function startEdit(s: any) {
    setEditId(s.StudentID);
    setForm({
      StudentName: s.StudentName,
      StudentEmail: s.StudentEmail,
      StudentPhone: s.StudentPhone,
    });
  }

  function reset() {
    setForm({
      StudentName: "",
      StudentEmail: "",
      StudentPhone: "",
    });
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="eyebrow">Students</p>
        <h1>Student directory</h1>
        <p>Maintain participant profiles with a clean, consistent layout.</p>
      </div>

      <div className="section-card">
        <div className="card-header">
          <h2 style={{ margin: 0 }}>{editId ? "Edit student" : "Add student"}</h2>
          <span className="pill subtle">Profile</span>
        </div>

        {error && <div className="callout danger">{error}</div>}

        <div className="form-grid">
          <input
            placeholder="Student Name"
            value={form.StudentName}
            onChange={(e) => setForm({ ...form, StudentName: e.target.value })}
          />

          <input
            placeholder="Email"
            value={form.StudentEmail}
            onChange={(e) => setForm({ ...form, StudentEmail: e.target.value })}
          />

          <input
            placeholder="Phone"
            value={form.StudentPhone}
            onChange={(e) => setForm({ ...form, StudentPhone: e.target.value })}
          />
        </div>

        <div className="actions-row">
          {editId ? (
            <button onClick={update}>Update</button>
          ) : (
            <button onClick={add}>Add</button>
          )}
          {editId && (
            <button className="cta-button secondary" onClick={reset}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="section-card" style={{ marginTop: 14 }}>
        <div className="card-header">
          <h2 style={{ margin: 0 }}>Student list</h2>
          <span className="pill subtle">{students.length} total</span>
        </div>

        <div className="list">
          {students.map((s: any) => (
            <div key={s.StudentID} className="list-item">
              <div className="card-header">
                <strong>{s.StudentName}</strong>
                <span className="pill subtle">ID: {s.StudentID}</span>
              </div>
              <p>Email: {s.StudentEmail || "—"}</p>
              <p>Phone: {s.StudentPhone || "—"}</p>
              <div className="actions-row">
                <button onClick={() => startEdit(s)}>Edit</button>
                <button className="cta-button secondary" onClick={() => del(s.StudentID)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
