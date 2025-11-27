"use client";

import { useEffect, useState } from "react";

export default function OrganizersPage() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    OrgName: "",
    OrgPhone: "",
    OrgRole: "",
  });

  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/organizers");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load organizers");
      setData(Array.isArray(json) ? json : []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Unable to load organizers");
      setData([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addItem() {
    setError("");
    const res = await fetch("/api/organizers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to add organizer");
      return;
    }
    reset();
    load();
  }

  async function updateItem() {
    setError("");
    const res = await fetch("/api/organizers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, OrgID: editId }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to update organizer");
      return;
    }
    reset();
    setEditId(null);
    load();
  }

  async function deleteItem(id: number) {
    setError("");
    const res = await fetch(`/api/organizers?OrgID=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to delete organizer");
      return;
    }
    load();
  }

  function startEdit(o: any) {
    setEditId(o.OrgID);
    setForm({
      OrgName: o.OrgName,
      OrgPhone: o.OrgPhone,
      OrgRole: o.OrgRole,
    });
  }

  function reset() {
    setForm({
      OrgName: "",
      OrgPhone: "",
      OrgRole: "",
    });
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="eyebrow">Organizers</p>
        <h1>Organizer roster</h1>
        <p>Assign owners and manage responsibilities in one place.</p>
      </div>

      <div className="section-card">
        <div className="card-header">
          <h2 style={{ margin: 0 }}>{editId ? "Edit organizer" : "Add organizer"}</h2>
          <span className="pill subtle">Team</span>
        </div>

        {error && <div className="callout danger">{error}</div>}

        <div className="form-grid">
          <input
            placeholder="Organizer Name"
            value={form.OrgName}
            onChange={(e) => setForm({ ...form, OrgName: e.target.value })}
          />

          <input
            placeholder="Phone"
            value={form.OrgPhone}
            onChange={(e) => setForm({ ...form, OrgPhone: e.target.value })}
          />

          <input
            placeholder="Role"
            value={form.OrgRole}
            onChange={(e) => setForm({ ...form, OrgRole: e.target.value })}
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
          <h2 style={{ margin: 0 }}>Organizer list</h2>
          <span className="pill subtle">{data.length} total</span>
        </div>

        <div className="list">
          {data.map((o: any) => (
            <div key={o.OrgID} className="list-item">
              <div className="card-header">
                <strong>{o.OrgName}</strong>
                <span className="pill">{o.OrgRole || "Role"}</span>
              </div>
              <p>Phone: {o.OrgPhone || "—"}</p>
              <div className="actions-row">
                <button onClick={() => startEdit(o)}>Edit</button>
                <button className="cta-button secondary" onClick={() => deleteItem(o.OrgID)}>
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
