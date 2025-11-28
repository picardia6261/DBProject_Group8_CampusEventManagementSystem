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
            <h1>A powerful, intuitive dashboard for seamless campus event management.</h1>
            <p style={{ marginTop: 8 }}>
              Handle registrations, coordinate venues, and empower organizers all within a fast, app-like experience that works perfectly on any device.
            </p>
            <div className="actions-row" style={{ marginTop: 14 }}>
              <a className="cta-button" href="/registration">Open registrations</a>
              <a className="cta-button secondary" href="/events">Plan an event</a>
            </div>
            <div className="stats-row">
              <span className="pill">Live modules: {modules.length}</span>
              <span className="pill subtle">Optimized for mobile & desktop</span>
              <span className="pill subtle">Everything stays in sync</span>
            </div>
          </div>

          <div className="list-item" style={{ alignSelf: "stretch" }}>
            <p className="eyebrow">Quick Glance</p>
            <h3 style={{ marginTop: 6 }}>Your Event, Our Platform. Sorted.</h3>
            <p style={{ marginTop: 6 }}>
              From the first idea to the final headcount, manage your entire campus event in one simple, powerful tool.
            </p>
            <div className="list" style={{ marginTop: 12 }}>
              <div className="tag">Submit your event proposal to campus offices in minutes.</div>
              <div className="tag">See your approval status and get notifications instantly.</div>
              <div className="tag">Create event pages and share them across campus with a link.</div>
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
