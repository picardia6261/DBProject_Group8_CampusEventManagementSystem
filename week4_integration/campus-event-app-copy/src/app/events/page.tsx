"use client";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [venues, setVenues] = useState([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    OrgID: "",
    VenueID: "",
    EventName: "",
    EventStatus: "Draft",
    Category: "",
    EventDate: "",
  });

  async function load() {
    try {
      const evRes = await fetch("/api/events");
      const orgRes = await fetch("/api/organizers");
      const venRes = await fetch("/api/venues");

      const ev = await evRes.json();
      const org = await orgRes.json();
      const ven = await venRes.json();

      if (!evRes.ok) throw new Error(ev?.error || "Failed to load events");
      if (!orgRes.ok) throw new Error(org?.error || "Failed to load organizers");
      if (!venRes.ok) throw new Error(ven?.error || "Failed to load venues");

      setEvents(Array.isArray(ev) ? ev : []);
      setOrganizers(Array.isArray(org) ? org : []);
      setVenues(Array.isArray(ven) ? ven : []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Unable to load data");
      setEvents([]);
      setOrganizers([]);
      setVenues([]);
    }
  }

  useEffect(() => { load(); }, []);

  async function add() {
    setError("");
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to add event");
      return;
    }
    reset();
    load();
  }

  async function update() {
    setError("");
    const res = await fetch("/api/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, EventID: editId }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to update event");
      return;
    }
    reset();
    load();
  }

  async function del(id: number) {
    setError("");
    const res = await fetch(`/api/events?EventID=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to delete event");
      return;
    }
    load();
  }

  function startEdit(e: any) {
    setEditId(e.EventID);
    setForm({
      OrgID: e.OrgID,
      VenueID: e.VenueID,
      EventName: e.EventName,
      EventStatus: e.EventStatus,
      Category: e.Category,
      EventDate: e.EventDate.substring(0, 10),
    });
  }

  function reset() {
    setEditId(null);
    setForm({
      OrgID: "",
      VenueID: "",
      EventName: "",
      EventStatus: "Draft",
      Category: "",
      EventDate: "",
    });
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="eyebrow">Events</p>
        <h1>Events & schedules</h1>
        <p>Plan, publish, and track campus happenings.</p>
      </div>

      <div className="section-card">
        <div className="card-header">
          <h2 style={{ margin: 0 }}>{editId ? "Edit event" : "Add event"}</h2>
          <span className="pill">{form.EventStatus || "Draft"}</span>
        </div>

        {error && <div className="callout danger">{error}</div>}

        <div className="form-grid">
          <select value={form.OrgID} onChange={(e) => setForm({ ...form, OrgID: e.target.value })}>
            <option value="">Select Organizer</option>
            {organizers.map((o: any) => (
              <option key={o.OrgID} value={o.OrgID}>{o.OrgName}</option>
            ))}
          </select>

          <select value={form.VenueID} onChange={(e) => setForm({ ...form, VenueID: e.target.value })}>
            <option value="">Select Venue</option>
            {venues.map((v: any) => (
              <option key={v.VenueID} value={v.VenueID}>{v.VenueName}</option>
            ))}
          </select>

          <input placeholder="Event Name" value={form.EventName}
            onChange={(e) => setForm({ ...form, EventName: e.target.value })} />

          <select value={form.EventStatus} onChange={(e) => setForm({ ...form, EventStatus: e.target.value })}>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Closed">Closed</option>
          </select>

          <input placeholder="Category" value={form.Category}
            onChange={(e) => setForm({ ...form, Category: e.target.value })} />

          <input type="date" value={form.EventDate}
            onChange={(e) => setForm({ ...form, EventDate: e.target.value })} />
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
          <h2 style={{ margin: 0 }}>Event list</h2>
          <span className="pill subtle">{events.length} total</span>
        </div>

        <div className="list">
          {events.map((e: any) => (
            <div key={e.EventID} className="list-item">
              <div className="card-header">
                <div>
                  <strong>{e.EventName}</strong> {" - "} {e.Category}
                  <p style={{ marginTop: 4, color: "var(--muted)" }}>
                    {organizers.find(o => o.OrgID === e.OrgID)?.OrgName || "Organizer"} •{" "}
                    {venues.find(v => v.VenueID === e.VenueID)?.VenueName || "Venue"}
                  </p>
                </div>
                <span className="pill">{e.EventStatus}</span>
              </div>
              <p>Date: {e.EventDate.substring(0, 10)}</p>
              <div className="actions-row">
                <button onClick={() => startEdit(e)}>Edit</button>
                <button className="cta-button secondary" onClick={() => del(e.EventID)}>
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
