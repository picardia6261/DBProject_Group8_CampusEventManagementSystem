"use client";

import { useEffect, useState } from "react";

export default function VenuesPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    VenueName: "",
    VenueLocation: "",
    Capacity: "",
  });

  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/venues");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load venues");
      setData(Array.isArray(json) ? json : []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Unable to load venues");
      setData([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addItem() {
    setError("");
    const res = await fetch("/api/venues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to add venue");
      return;
    }
    reset();
    load();
  }

  async function updateItem() {
    setError("");
    const res = await fetch("/api/venues", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, VenueID: editId }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to update venue");
      return;
    }
    reset();
    setEditId(null);
    load();
  }

  async function deleteItem(id: number) {
    setError("");
    const res = await fetch(`/api/venues?VenueID=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to delete venue");
      return;
    }
    load();
  }

  function startEdit(v: any) {
    setEditId(v.VenueID);
    setForm({
      VenueName: v.VenueName,
      VenueLocation: v.Location,   // FIXED
      Capacity: v.Capacity,
    });
  }

  function reset() {
    setEditId(null);
    setForm({ VenueName: "", VenueLocation: "", Capacity: "" });
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="eyebrow">Venues</p>
        <h1>Venues & capacity</h1>
        <p>Manage locations and limits to keep events within capacity.</p>
      </div>

      <div className="section-card">
        <div className="card-header">
          <h2 style={{ margin: 0 }}>{editId ? "Edit venue" : "Add venue"}</h2>
          <span className="pill subtle">Capacity</span>
        </div>

        {error && <div className="callout danger">{error}</div>}

        <div className="form-grid">
          <input
            placeholder="Venue Name"
            value={form.VenueName}
            onChange={(e) => setForm({ ...form, VenueName: e.target.value })}
          />

          <input
            placeholder="Location"
            value={form.VenueLocation}
            onChange={(e) => setForm({ ...form, VenueLocation: e.target.value })}
          />

          <input
            placeholder="Capacity"
            value={form.Capacity}
            onChange={(e) => setForm({ ...form, Capacity: e.target.value })}
          />
        </div>

        <div className="actions-row">
          {editId ? (
            <button onClick={updateItem}>Update</button>
          ) : (
            <button onClick={addItem}>Add</button>
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
          <h2 style={{ margin: 0 }}>Venue list</h2>
          <span className="pill subtle">{data.length} total</span>
        </div>

        <div className="list">
          {data.map((v: any) => (
            <div key={v.VenueID} className="list-item">
              <div className="card-header">
                <strong>{v.VenueName}</strong>
                <span className="pill">Capacity: {v.Capacity}</span>
              </div>
              <p>Location: {v.Location}</p>
              <div className="actions-row">
                <button onClick={() => startEdit(v)}>Edit</button>
                <button className="cta-button secondary" onClick={() => deleteItem(v.VenueID)}>
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
