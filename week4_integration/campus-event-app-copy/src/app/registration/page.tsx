"use client";

import { useEffect, useState } from "react";

export default function RegistrationPage() {
  const [rows, setRows] = useState([]);
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    StudentID: "",
    EventID: "",
    RegDate: "",
    RegStatus: "Registered",
  });

  const [editing, setEditing] = useState<any>(null);

  async function load() {
    const reg = await fetch("/api/registration").then((r) => r.json());
    const ev = await fetch("/api/events").then((r) => r.json());
    const stu = await fetch("/api/students").then((r) => r.json());
    const ven = await fetch("/api/venues").then((r) => r.json());

    setRows(Array.isArray(reg) ? reg : []);
    setEvents(Array.isArray(ev) ? ev : []);
    setStudents(Array.isArray(stu) ? stu : []);
    setVenues(Array.isArray(ven) ? ven : []);
  }

  useEffect(() => { load(); }, []);

  async function add() {
    setError("");

    const res = await fetch("/api/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to add registration");
      return;
    }
    reset();
    load();
  }

  async function update() {
    setError("");

    const res = await fetch("/api/registration", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to update registration");
      return;
    }
    reset();
    load();
  }

  async function del(sid: number, eid: number) {
    await fetch(`/api/registration?StudentID=${sid}&EventID=${eid}`, {
      method: "DELETE",
    });
    load();
  }

  function startEdit(r: any) {
    setEditing(r);
    setForm({
      StudentID: r.StudentID,
      EventID: r.EventID,
      RegDate: r.RegDate.substring(0, 10),
      RegStatus: r.RegStatus,
    });
  }

  function reset() {
    setEditing(null);
    setForm({
      StudentID: "",
      EventID: "",
      RegDate: "",
      RegStatus: "Registered",
    });
  }

  const selectedEventId = Number(form.EventID);
  const selectedEvent = events.find((ev: any) => ev.EventID === selectedEventId);
  const selectedVenue = venues.find(
    (v: any) => v.VenueID === selectedEvent?.VenueID
  );
  const registeredCount = rows.filter(
    (r: any) =>
      r.EventID === selectedEventId && r.RegStatus === "Registered"
  ).length;
  const capacity = Number(selectedVenue?.Capacity);
  const isEventFull =
    selectedEvent &&
    Number.isFinite(capacity) &&
    registeredCount >= capacity &&
    form.RegStatus === "Registered";
  const disableAdd = !editing && isEventFull;

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="eyebrow">Registration</p>
        <h1>Student registrations</h1>
        <p>Keep attendance capped to venue capacity and maintain clean records.</p>
      </div>

      <div className="section-card">
        <div className="card-header">
          <h2 style={{ margin: 0 }}>{editing ? "Edit registration" : "Add registration"}</h2>
          {selectedEvent && (
            <span className="pill">
              {Number.isFinite(capacity)
                ? `${registeredCount}/${capacity} seats`
                : "No capacity set"}
            </span>
          )}
        </div>

        <div className="form-grid">
          <select value={form.EventID} onChange={(e) => setForm({ ...form, EventID: e.target.value })}>
            <option value="">Select Event</option>
            {events.map((ev: any) => (
              <option key={ev.EventID} value={ev.EventID}>{ev.EventName}</option>
            ))}
          </select>

          <select value={form.StudentID} onChange={(e) => setForm({ ...form, StudentID: e.target.value })}>
            <option value="">Select Student</option>
            {students.map((s: any) => (
              <option key={s.StudentID} value={s.StudentID}>{s.StudentName}</option>
            ))}
          </select>

          <input type="date" value={form.RegDate}
            onChange={(e) => setForm({ ...form, RegDate: e.target.value })} />

          <select value={form.RegStatus}
            onChange={(e) => setForm({ ...form, RegStatus: e.target.value })}>
            <option value="Registered">Registered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Waitlisted">Waitlisted</option>
          </select>
        </div>

        {isEventFull && (
          <div className="callout danger">
            This event is full (registered: {registeredCount}/{capacity}). Choose another event
            or change status.
          </div>
        )}

        {error && <div className="callout danger">{error}</div>}

        <div className="actions-row">
          {editing ? (
            <button onClick={update}>Update</button>
          ) : (
            <button onClick={add} disabled={disableAdd}>Add</button>
          )}
          {editing && (
            <button className="cta-button secondary" onClick={reset}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="section-card" style={{ marginTop: 14 }}>
        <div className="card-header">
          <h2 style={{ margin: 0 }}>Registration list</h2>
          <span className="pill subtle">{rows.length} total</span>
        </div>

        <div className="list">
          {rows.map((r: any) => {
            const eventName = events.find((ev) => ev.EventID === r.EventID)?.EventName || "Event";
            const studentName = students.find((s) => s.StudentID === r.StudentID)?.StudentName || "Student";

            return (
              <div key={`${r.StudentID}-${r.EventID}`} className="list-item">
                <div className="card-header">
                  <div>
                    <strong>{eventName}</strong> {" - "} {studentName}
                  </div>
                  <span className="pill">{r.RegStatus}</span>
                </div>
                <p>Date: {r.RegDate.substring(0, 10)}</p>
                <div className="actions-row">
                  <button onClick={() => startEdit(r)}>Edit</button>
                  <button className="cta-button secondary" onClick={() => del(r.StudentID, r.EventID)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
