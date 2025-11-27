const modules = [
  { title: "Registrations", href: "/registration", desc: "Track attendees and statuses in real time." },
  { title: "Events", href: "/events", desc: "Plan, publish, and update campus happenings." },
  { title: "Venues", href: "/venues", desc: "Manage locations, capacity, and availability." },
  { title: "Students", href: "/students", desc: "Maintain participant profiles and IDs." },
  { title: "Organizers", href: "/organizers", desc: "Assign owners and manage responsibilities." },
];

export default function Home() {
  return (
    <div className="page-shell hero">
      <div className="section-card hero-card">
        <div className="card-header">
          <div className="logo-badge">
            <img
              src="https://innopa.org/wp-content/uploads/logo-ugm.png"
              alt="UGM logo"
              style={{ width: "70px", height: "70px", objectFit: "contain" }}
            />
          </div>
          <span className="pill">SIMAA UGM</span>
        </div>

        <div className="hero-grid">
          <div>
            <h1>Manage campus events with confidence</h1>
            <p style={{ marginTop: 8 }}>
              A modern, responsive dashboard inspired by SIMASTER UGM to handle registrations,
              venues, and organizers—built to feel like a progressive web app.
            </p>
            <div className="actions-row" style={{ marginTop: 14 }}>
              <a className="cta-button" href="/registration">Open registrations</a>
              <a className="cta-button secondary" href="/events">Plan an event</a>
            </div>
            <div className="stats-row">
              <span className="pill">Live modules: {modules.length}</span>
              <span className="pill subtle">Optimized for mobile & desktop</span>
              <span className="pill subtle">UGM-inspired colorway</span>
            </div>
          </div>

          <div className="list-item" style={{ alignSelf: "stretch" }}>
            <p className="eyebrow">Quick Glance</p>
            <h3 style={{ marginTop: 6 }}>End-to-end control</h3>
            <p style={{ marginTop: 6 }}>
              Navigate through all modules seamlessly. The layout is touch-friendly,
              keyboard-friendly, and adapts to any screen.
            </p>
            <div className="list" style={{ marginTop: 12 }}>
              <div className="tag">Mobile-first grid</div>
              <div className="tag">Glassmorphism panels</div>
              <div className="tag">Bold UGM yellow accents</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-grid" style={{ marginTop: 12 }}>
        {modules.map((m) => (
          <a key={m.href} className="card-link" href={m.href}>
            <div className="card-header">
              <h3 style={{ margin: 0 }}>{m.title}</h3>
              <span className="pill subtle">Go</span>
            </div>
            <p>{m.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
