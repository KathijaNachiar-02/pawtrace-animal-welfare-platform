"use client";

import { useMemo, useState } from "react";

type NGOStatus = "Pending" | "Approved" | "Rejected";

type NGO = {
  id: string;
  name: string;
  email: string;
  location: string;
  submitted: string;
  status: NGOStatus;
};

const initialNGOs: NGO[] = [
  {
    id: "NGO-001",
    name: "Green Paws Rescue",
    email: "contact@greenpaws.example",
    location: "Chennai",
    submitted: "18 Oct 2026",
    status: "Pending",
  },
  {
    id: "NGO-002",
    name: "Happy Tails Foundation",
    email: "hello@happytails.example",
    location: "Bengaluru",
    submitted: "16 Oct 2026",
    status: "Approved",
  },
  {
    id: "NGO-003",
    name: "Hope Animal Care",
    email: "info@hopeanimalcare.example",
    location: "Hyderabad",
    submitted: "15 Oct 2026",
    status: "Pending",
  },
  {
    id: "NGO-004",
    name: "Safe Haven Rescue",
    email: "team@safehaven.example",
    location: "Mumbai",
    submitted: "12 Oct 2026",
    status: "Rejected",
  },
  {
    id: "NGO-005",
    name: "Compassion for Paws",
    email: "contact@compassionpaws.example",
    location: "Coimbatore",
    submitted: "10 Oct 2026",
    status: "Approved",
  },
  {
    id: "NGO-006",
    name: "Animal Aid Network",
    email: "support@animalaid.example",
    location: "Pune",
    submitted: "08 Oct 2026",
    status: "Pending",
  },
];

export default function AdminNGOsPage() {
  const [ngos, setNgos] = useState<NGO[]>(initialNGOs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);
  const [notice, setNotice] = useState("");

  const filteredNGOs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return ngos.filter((ngo) => {
      const matchesSearch =
        ngo.name.toLowerCase().includes(query) ||
        ngo.id.toLowerCase().includes(query) ||
        ngo.email.toLowerCase().includes(query) ||
        ngo.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || ngo.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [ngos, search, statusFilter]);

  const totalCount = ngos.length;
  const pendingCount = ngos.filter(
    (ngo) => ngo.status === "Pending",
  ).length;
  const approvedCount = ngos.filter(
    (ngo) => ngo.status === "Approved",
  ).length;
  const rejectedCount = ngos.filter(
    (ngo) => ngo.status === "Rejected",
  ).length;

  function updateNGOStatus(id: string, status: NGOStatus) {
    const ngo = ngos.find((item) => item.id === id);

    if (!ngo) return;

    setNgos((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    );

    setSelectedNGO((current) =>
      current?.id === id ? { ...current, status } : current,
    );

    setNotice(`${ngo.name} marked as ${status.toLowerCase()}.`);
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setNotice("");
  }

  return (
    <main className="admin-ngos-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-eyebrow">ORGANIZATION MANAGEMENT</p>
          <h1>NGO Management</h1>
          <p className="admin-page-description">
            Review organization applications and manage their registration
            status across the PawTrace platform.
          </p>
        </div>

        <span className="admin-demo-label">Prototype · Sample data</span>
      </div>

      {notice && (
        <div className="ngo-notice" role="status">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      <section className="ngo-stats-grid" aria-label="NGO statistics">
        <article className="ngo-stat-card">
          <div className="ngo-stat-heading">
            <span>Total NGOs</span>
            <span aria-hidden="true">🏢</span>
          </div>
          <strong>{totalCount}</strong>
          <small>Sample organizations</small>
        </article>

        <article className="ngo-stat-card">
          <div className="ngo-stat-heading">
            <span>Approved</span>
            <span aria-hidden="true">✓</span>
          </div>
          <strong>{approvedCount}</strong>
          <small>Approved sample records</small>
        </article>

        <article className="ngo-stat-card">
          <div className="ngo-stat-heading">
            <span>Pending Review</span>
            <span aria-hidden="true">◷</span>
          </div>
          <strong>{pendingCount}</strong>
          <small>Awaiting review</small>
        </article>

        <article className="ngo-stat-card">
          <div className="ngo-stat-heading">
            <span>Rejected</span>
            <span aria-hidden="true">×</span>
          </div>
          <strong>{rejectedCount}</strong>
          <small>Rejected sample records</small>
        </article>
      </section>

      <section className="admin-panel ngo-management-panel">
        <div className="ngo-panel-header">
          <div>
            <h2>Registered Organizations</h2>
            <p>
              Search applications, inspect organization details, and review
              registration status.
            </p>
          </div>

          <span className="ngo-result-count">
            {filteredNGOs.length} of {totalCount} organizations
          </span>
        </div>

        <div className="ngo-filter-bar">
          <div className="ngo-search-field">
            <label htmlFor="ngo-search">Search organizations</label>
            <input
              id="ngo-search"
              type="search"
              placeholder="Search name, ID, email, or city..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="ngo-status-field">
            <label htmlFor="ngo-status-filter">Registration status</label>
            <select
              id="ngo-status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button
            className="ngo-reset-button"
            type="button"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>

        <div className="ngo-table-wrap">
          <table className="ngo-table">
            <thead>
              <tr>
                <th>Organization</th>
                <th>Location</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredNGOs.map((ngo) => (
                <tr key={ngo.id}>
                  <td>
                    <div className="ngo-organization-cell">
                      <span className="ngo-avatar" aria-hidden="true">
                        {ngo.name.charAt(0)}
                      </span>
                      <span>
                        <strong>{ngo.name}</strong>
                        <small>{ngo.id}</small>
                        <small>{ngo.email}</small>
                      </span>
                    </div>
                  </td>

                  <td>{ngo.location}</td>
                  <td>{ngo.submitted}</td>

                  <td>
                    <span
                      className={`ngo-status-badge ngo-status-${ngo.status.toLowerCase()}`}
                    >
                      <span aria-hidden="true">●</span> {ngo.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="ngo-review-button"
                      type="button"
                      onClick={() => setSelectedNGO(ngo)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}

              {filteredNGOs.length === 0 && (
                <tr>
                  <td colSpan={5} className="ngo-empty-state">
                    <span aria-hidden="true">🔎</span>
                    <strong>No organizations found</strong>
                    <p>Try a different search term or registration status.</p>
                    <button
                      type="button"
                      className="ngo-review-button"
                      onClick={resetFilters}
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="ngo-table-footer">
          <span>
            Showing {filteredNGOs.length} organization
            {filteredNGOs.length === 1 ? "" : "s"}
          </span>
          <span>Prototype records only</span>
        </div>
      </section>

      {selectedNGO && (
        <div
          className="ngo-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedNGO(null);
            }
          }}
        >
          <section
            className="ngo-review-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ngo-review-title"
          >
            <div className="ngo-modal-header">
              <div>
                <p className="admin-eyebrow">APPLICATION REVIEW</p>
                <h2 id="ngo-review-title">Organization details</h2>
              </div>

              <button
                type="button"
                className="ngo-modal-close"
                onClick={() => setSelectedNGO(null)}
                aria-label="Close organization details"
              >
                ×
              </button>
            </div>

            <div className="ngo-modal-identity">
              <span className="ngo-modal-avatar" aria-hidden="true">
                {selectedNGO.name.charAt(0)}
              </span>
              <div>
                <h3>{selectedNGO.name}</h3>
                <p>{selectedNGO.id}</p>
              </div>
            </div>

            <div className="ngo-detail-list">
              <div>
                <span>Email address</span>
                <strong>{selectedNGO.email}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>{selectedNGO.location}</strong>
              </div>
              <div>
                <span>Application submitted</span>
                <strong>{selectedNGO.submitted}</strong>
              </div>
              <div>
                <span>Registration status</span>
                <strong>{selectedNGO.status}</strong>
              </div>
            </div>

            <div className="ngo-prototype-warning">
              These are illustrative records. Approve and reject actions only
              change this page's temporary local state; they do not update the
              backend.
            </div>

            <div className="ngo-modal-actions">
              <button
                type="button"
                className="ngo-action-secondary"
                onClick={() =>
                  updateNGOStatus(selectedNGO.id, "Rejected")
                }
                disabled={selectedNGO.status === "Rejected"}
              >
                Reject application
              </button>

              <button
                type="button"
                className="ngo-action-primary"
                onClick={() =>
                  updateNGOStatus(selectedNGO.id, "Approved")
                }
                disabled={selectedNGO.status === "Approved"}
              >
                Approve NGO
              </button>
            </div>

            <button
              type="button"
              className="ngo-done-button"
              onClick={() => setSelectedNGO(null)}
            >
              Done
            </button>
          </section>
        </div>
      )}
    </main>
  );
}