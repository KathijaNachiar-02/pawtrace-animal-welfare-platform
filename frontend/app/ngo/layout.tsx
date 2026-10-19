import type { ReactNode } from "react";
import Link from "next/link";
import "./ngo.css";

const navigation = [
  { label: "Overview", href: "/ngo" },
  { label: "Rescue Cases", href: "/ngo/cases" },
  { label: "Animals", href: "/ngo/animals" },
  { label: "Case Updates", href: "/ngo/updates" },
  { label: "Organization Profile", href: "/ngo/profile" },
];

export default function NgoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="ngo-layout">
      <aside className="ngo-sidebar">
        <div className="ngo-brand">
          <span className="ngo-brand-icon">🐾</span>
          <div>
            <h2>PawTrace</h2>
            <p>NGO Portal</p>
          </div>
        </div>

        <nav aria-label="NGO navigation" className="ngo-navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="ngo-nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ngo-sidebar-footer">
          <span className="ngo-avatar">N</span>
          <div>
            <strong>NGO Account</strong>
            <p>Rescue Management</p>
          </div>
        </div>
      </aside>

      <div className="ngo-main">
        <header className="ngo-topbar">
          <div>
            <span className="ngo-topbar-label">
              PAWTRACE WORKSPACE
            </span>
            <h1>NGO Management Portal</h1>
          </div>

          <span className="ngo-demo-badge">Frontend Preview</span>
        </header>

        <main className="ngo-content">{children}</main>
      </div>
    </div>
  );
}