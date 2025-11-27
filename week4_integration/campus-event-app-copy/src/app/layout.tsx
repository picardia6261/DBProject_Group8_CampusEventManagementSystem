import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Event Management System",
  description: "CRUD App for Events, Students, Registration, Organizers, Venues",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-body">
        <nav className="top-nav">
          <div className="top-nav-inner">
            <div className="nav-left">
              <div className="nav-logo">
                <img
                  src="https://innopa.org/wp-content/uploads/logo-ugm.png"
                  alt="UGM logo"
                  style={{ width: "32px", height: "32px", objectFit: "contain" }}
                />
              </div>
              <div className="nav-title">
                <strong>SIMAA UGM</strong>
                <span>Campus Events</span>
              </div>
            </div>
            <div className="nav-links">
              <a className="nav-link" href="/">Home</a>
              <a className="nav-link" href="/registration">Registration</a>
              <a className="nav-link" href="/events">Events</a>
              <a className="nav-link" href="/venues">Venues</a>
              <a className="nav-link" href="/students">Students</a>
              <a className="nav-link" href="/organizers">Organizers</a>
            </div>
          </div>
        </nav>
        <main className="fade-in">{children}</main>
      </body>
    </html>
  );
}
