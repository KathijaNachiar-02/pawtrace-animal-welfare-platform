"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type ReportStatus = "Pending" | "Under Review" | "Verified" | "Resolved";

type AnimalReport = {
  id: string;
  reportNumber: string;
  animal: string;
  category: string;
  location: string;
  submitted: string;
  priority: "Urgent" | "High" | "Normal";
  status: ReportStatus;
  description: string;
};

const initialReports: AnimalReport[] = [
  {
    id: "101",
    reportNumber: "RPT-2026-001",
    animal: "Injured street dog",
    category: "Injured Animal",
    location: "T. Nagar, Chennai",
    submitted: "18 Oct 2026",
    priority: "Urgent",
    status: "Pending",
    description:
      "A street dog was spotted limping near a busy road and may need immediate veterinary attention.",
  },
  {
    id: "102",
    reportNumber: "RPT-2026-002",
    animal: "Abandoned puppies",
    category: "Abandoned Animal",
    location: "Indiranagar, Bengaluru",
    submitted: "17 Oct 2026",
    priority: "High",
    status: "Under Review",
    description:
      "Several puppies were found without their mother near a residential building.",
  },
  {
    id: "103",
    reportNumber: "RPT-2026-003",
    animal: "Stray cat",
    category: "Injured Animal",
    location: "Banjara Hills, Hyderabad",
    submitted: "16 Oct 2026",
    priority: "Normal",
    status: "Verified",
    description:
      "A resident reported a stray cat with a minor injury and requested assistance.",
  },
  {
    id: "104",
    reportNumber: "RPT-2026-004",
    animal: "Animal welfare concern",
    category: "Welfare Concern",
    location: "Andheri, Mumbai",
    submitted: "15 Oct 2026",
    priority: "High",
    status: "Pending",
    description:
      "A possible animal welfare concern was reported for further assessment.",
  },
  {
    id: "105",
    reportNumber: "RPT-2026-005",
    animal: "Rescued street dog",
    category: "Rescue Request",
    location: "RS Puram, Coimbatore",
    submitted: "14 Oct 2026",
    priority: "Normal",
    status: "Resolved",
    description:
      "A rescue request was submitted for a street dog requiring assistance.",
  },
  {
    id: "106",
    reportNumber: "RPT-2026-006",
    animal: "Injured bird",
    category: "Injured Animal",
    location: "Koregaon Park, Pune",
    submitted: "13 Oct 2026",
    priority: "High",
    status: "Under Review",
    description:
      "An injured bird was reported near a public walkway.",
  },
  {
    id: "107",
    reportNumber: "RPT-2026-007",
    animal: "Stray animal",
    category: "Rescue Request",
    location: "Kochi, Kerala",
    submitted: "12 Oct 2026",
    priority: "Normal",
    status: "Verified",
    description:
      "A resident requested assistance for a stray animal in their neighbourhood.",
  },
  {
    id: "108",
    reportNumber: "RPT-2026-008",
    animal: "Animal welfare concern",
    category: "Welfare Concern",
    location: "Delhi",
    submitted: "11 Oct 2026",
    priority: "Urgent",
    status: "Pending",
    description:
      "An urgent welfare concern was submitted for review by the appropriate team.",
  },
];

const statusOptions: ReportStatus[] = [
  "Pending",
  "Under Review",
  "Verified",
  "Resolved",
];

export default function AdminReportsPage() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedReport, setSelectedReport] =
    useState<AnimalReport | null>(null);
  const [notice, setNotice] = useState("");

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch = [
        report.id,
        report.reportNumber,
        report.animal,
        report.category,
        report.location,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || report.category === categoryFilter;

      const matchesPriority =
        priorityFilter === "All" || report.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesPriority
      );
    });
  }, [reports, search, statusFilter, categoryFilter, priorityFilter]);

  const pendingCount = reports.filter(
    (report) => report.status === "Pending",
  ).length;

  const resolvedCount = reports.filter(
    (report) => report.status === "Resolved",
  ).length;

  const urgentCount = reports.filter(
    (report) =>
      report.priority === "Urgent" && report.status !== "Resolved",
  ).length;

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setPriorityFilter("All");
    setNotice("");
  }

  function updateReportStatus(id: string, status: ReportStatus) {
    setReports((current) =>
      current.map((report) =>
        report.id === id ? { ...report, status } : report,
      ),
    );

    setSelectedReport((current) =>
      current?.id === id ? { ...current, status } : current,
    );

    setNotice(
      `Report status changed to "${status}". This is a temporary prototype change.`,
    );
  }

  return (
    <main className="admin-reports-page">
      <style jsx>{`
        .admin-reports-page {
          width: 100%;
          min-width: 0;
          color: #2d4033;
        }

        .admin-reports-page *,
        .admin-reports-page *::before,
        .admin-reports-page *::after {
          box-sizing: border-box;
        }

        .reports-notice {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
          padding: 14px 17px;
          border: 1px solid #b8e0c5;
          border-radius: 12px;
          background: #effaf2;
          color: #23673b;
          font-size: 13px;
        }

        .reports-notice button {
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
          font-size: 22px;
        }

        .reports-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 26px;
        }

        .reports-stat-card {
          min-width: 0;
          padding: 22px;
          border: 1px solid #e5ebe6;
          border-radius: 15px;
          background: #fff;
          box-shadow: 0 4px 18px rgba(30, 61, 41, 0.04);
        }

        .reports-stat-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 19px;
          color: #748076;
          font-size: 12px;
          font-weight: 650;
        }

        .reports-stat-icon {
          display: grid;
          width: 39px;
          height: 39px;
          flex-shrink: 0;
          place-items: center;
          border-radius: 11px;
          background: #edf6ee;
          color: #347449;
          font-size: 19px;
        }

        .reports-stat-card strong {
          display: block;
          margin-bottom: 8px;
          color: #263e2e;
          font-size: 31px;
        }

        .reports-stat-card small {
          color: #89938b;
          font-size: 11px;
        }

        .reports-panel {
          min-width: 0;
          overflow: hidden;
          border: 1px solid #e5ebe6;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 20px rgba(30, 61, 41, 0.035);
        }

        .reports-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 24px 25px;
          border-bottom: 1px solid #edf0ed;
        }

        .reports-panel-header h2 {
          margin: 0 0 7px;
          color: #263e2e;
          font-size: 19px;
        }

        .reports-panel-header p {
          margin: 0;
          color: #7b877e;
          font-size: 12px;
          line-height: 1.6;
        }

        .reports-count-pill {
          flex-shrink: 0;
          padding: 9px 12px;
          border: 1px solid #dceade;
          border-radius: 25px;
          background: #f0f7f1;
          color: #347348;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .reports-filters {
          display: grid;
          grid-template-columns: minmax(180px, 1fr) repeat(3, minmax(125px, 160px)) auto;
          align-items: end;
          gap: 12px;
          padding: 20px 25px;
          border-bottom: 1px solid #edf0ed;
          background: #fafcfb;
        }

        .reports-field {
          display: flex;
          flex-direction: column;
          min-width: 0;
          gap: 8px;
        }

        .reports-field label {
          color: #435448;
          font-size: 11px;
          font-weight: 700;
        }

        .reports-field input,
        .reports-field select {
          width: 100%;
          min-width: 0;
          height: 42px;
          padding: 0 10px;
          border: 1px solid #dce5de;
          border-radius: 9px;
          outline: none;
          background: #fff;
          color: #2b4031;
          font: inherit;
          font-size: 11px;
        }

        .reports-field input:focus,
        .reports-field select:focus {
          border-color: #4d9061;
          box-shadow: 0 0 0 3px rgba(77, 144, 97, 0.11);
        }

        .reports-reset {
          min-height: 42px;
          padding: 0 13px;
          border: 1px solid #d8e3da;
          border-radius: 9px;
          background: #fff;
          color: #415548;
          font-size: 11px;
          font-weight: 650;
          white-space: nowrap;
          cursor: pointer;
        }

        .reports-reset:hover {
          background: #f0f7f1;
        }

        .reports-table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        .reports-table {
          width: 100%;
          min-width: 950px;
          border-collapse: collapse;
          text-align: left;
        }

        .reports-table th {
          padding: 15px 17px;
          border-bottom: 1px solid #e9efea;
          background: #f7faf7;
          color: #77837a;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .reports-table td {
          padding: 16px 17px;
          border-bottom: 1px solid #edf1ed;
          color: #566258;
          font-size: 12px;
          vertical-align: middle;
        }

        .reports-table tbody tr:hover {
          background: #fbfdfb;
        }

        .reports-primary-cell {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 145px;
        }

        .reports-primary-cell strong {
          color: #2b4031;
          font-size: 12px;
        }

        .reports-primary-cell small {
          color: #879289;
          font-size: 10px;
        }

        .reports-priority,
        .reports-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 9px;
          border: 1px solid transparent;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .reports-priority-urgent {
          border-color: #f0d2cf;
          background: #fff0ef;
          color: #b13d36;
        }

        .reports-priority-high {
          border-color: #f3e2b7;
          background: #fff7e6;
          color: #99650b;
        }

        .reports-priority-normal {
          border-color: #dce5de;
          background: #f3f7f3;
          color: #617065;
        }

        .reports-status-pending {
          border-color: #f3e2b7;
          background: #fff7e6;
          color: #99650b;
        }

        .reports-status-under-review {
          border-color: #d7def6;
          background: #eff2ff;
          color: #4d5eaa;
        }

        .reports-status-verified {
          border-color: #d6e3f5;
          background: #edf5ff;
          color: #38699e;
        }

        .reports-status-resolved {
          border-color: #cce9d4;
          background: #eaf8ee;
          color: #287445;
        }

        .reports-view-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 34px;
          padding: 0 11px;
          border: 1px solid #d5e6d8;
          border-radius: 8px;
          background: #f1f8f2;
          color: #347448;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
        }

        .reports-view-button:hover {
          background: #e4f2e6;
        }

        .reports-empty {
          padding: 42px 18px !important;
          text-align: center;
        }

        .reports-empty strong {
          display: block;
          color: #304638;
          font-size: 15px;
        }

        .reports-empty p {
          margin: 8px 0 14px;
          color: #849087;
          font-size: 12px;
        }

        .reports-table-footer {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          padding: 16px 24px;
          color: #879188;
          font-size: 11px;
        }

        .reports-modal-backdrop {
          position: fixed;
          z-index: 9999;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-y: auto;
          padding: 20px;
          background: rgba(20, 36, 25, 0.58);
          backdrop-filter: blur(3px);
        }

        .reports-modal {
          width: 100%;
          max-width: 570px;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          padding: 26px;
          border: 1px solid #e3eae4;
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
        }

        .reports-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          padding-bottom: 18px;
          border-bottom: 1px solid #edf0ed;
        }

        .reports-modal-header h2 {
          margin: 0;
          color: #253e2e;
          font-size: 22px;
        }

        .reports-modal-close {
          display: grid;
          width: 35px;
          height: 35px;
          flex-shrink: 0;
          place-items: center;
          border: 0;
          border-radius: 9px;
          background: #f3f6f3;
          color: #536257;
          font-size: 24px;
          cursor: pointer;
        }

        .reports-modal-subtitle {
          margin: 7px 0 0;
          color: #849087;
          font-size: 12px;
        }

        .reports-description {
          margin: 20px 0;
          padding: 16px;
          border: 1px solid #e7eee8;
          border-radius: 11px;
          background: #fafcfb;
          color: #4d5c51;
          font-size: 13px;
          line-height: 1.7;
        }

        .reports-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 17px;
        }

        .reports-detail-grid span {
          display: block;
          margin-bottom: 6px;
          color: #849087;
          font-size: 11px;
        }

        .reports-detail-grid strong {
          display: block;
          color: #304638;
          font-size: 12px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .reports-demo-warning {
          margin-top: 21px;
          padding: 13px 15px;
          border: 1px solid #f0e2c4;
          border-radius: 10px;
          background: #fff9ed;
          color: #79633b;
          font-size: 11px;
          line-height: 1.7;
        }

        .reports-status-editor {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 20px;
        }

        .reports-status-editor label {
          color: #435448;
          font-size: 12px;
          font-weight: 700;
        }

        .reports-status-editor select {
          width: 100%;
          height: 43px;
          padding: 0 12px;
          border: 1px solid #dce5de;
          border-radius: 9px;
          background: #fff;
          color: #2b4031;
          font: inherit;
          font-size: 12px;
        }

        .reports-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 22px;
        }

        .reports-modal-done {
          width: 100%;
          min-height: 42px;
          margin-top: 12px;
          border: 1px solid #dce5de;
          border-radius: 9px;
          background: #fff;
          color: #45574a;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        @media (max-width: 1250px) {
          .reports-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .reports-filters {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .reports-stats-grid {
            gap: 11px;
          }

          .reports-stat-card {
            padding: 15px;
          }

          .reports-stat-card strong {
            font-size: 27px;
          }

          .reports-stat-label {
            align-items: flex-start;
            font-size: 11px;
          }

          .reports-stat-icon {
            width: 32px;
            height: 32px;
            font-size: 16px;
          }

          .reports-panel-header {
            align-items: flex-start;
            flex-direction: column;
            padding: 19px 17px;
          }

          .reports-filters {
            grid-template-columns: minmax(0, 1fr);
            padding: 17px;
          }

          .reports-reset {
            width: 100%;
          }

          .reports-table-footer {
            flex-direction: column;
            padding: 15px 17px;
          }

          .reports-modal-backdrop {
            align-items: flex-start;
            padding: 12px;
          }

          .reports-modal {
            max-height: calc(100vh - 24px);
            margin: auto 0;
            padding: 19px;
          }

          .reports-detail-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .reports-modal-footer {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="admin-page-header">
        <div>
          <p className="admin-eyebrow">PLATFORM MANAGEMENT / REPORTS</p>
          <h1>Reports Management</h1>
          <p className="admin-page-description">
            Review animal welfare reports and monitor their progress.
          </p>
        </div>

        <span className="admin-demo-label">Prototype · Sample data</span>
      </div>

      {notice && (
        <div className="reports-notice" role="status">
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

      <section className="reports-stats-grid" aria-label="Report statistics">
        <article className="reports-stat-card">
          <div className="reports-stat-label">
            <span>Total Reports</span>
            <span className="reports-stat-icon" aria-hidden="true">
              ▤
            </span>
          </div>
          <strong>{reports.length}</strong>
          <small>Illustrative report records</small>
        </article>

        <article className="reports-stat-card">
          <div className="reports-stat-label">
            <span>Pending Review</span>
            <span className="reports-stat-icon" aria-hidden="true">
              ◷
            </span>
          </div>
          <strong>{pendingCount}</strong>
          <small>Awaiting initial review</small>
        </article>

        <article className="reports-stat-card">
          <div className="reports-stat-label">
            <span>Resolved</span>
            <span className="reports-stat-icon" aria-hidden="true">
              ✓
            </span>
          </div>
          <strong>{resolvedCount}</strong>
          <small>Marked as resolved</small>
        </article>

        <article className="reports-stat-card">
          <div className="reports-stat-label">
            <span>Urgent Reports</span>
            <span className="reports-stat-icon" aria-hidden="true">
              !
            </span>
          </div>
          <strong>{urgentCount}</strong>
          <small>Urgent and not resolved</small>
        </article>
      </section>

      <section className="reports-panel">
        <div className="reports-panel-header">
          <div>
            <h2>Submitted Reports</h2>
            <p>
              Search reports, filter results, and inspect report information.
            </p>
          </div>

          <span className="reports-count-pill">
            {filteredReports.length} of {reports.length} reports
          </span>
        </div>

        <div className="reports-filters">
          <div className="reports-field">
            <label htmlFor="reports-search">Search reports</label>
            <input
              id="reports-search"
              type="search"
              placeholder="Search ID, animal, or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="reports-field">
            <label htmlFor="reports-status">Status</label>
            <select
              id="reports-status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="reports-field">
            <label htmlFor="reports-category">Category</label>
            <select
              id="reports-category"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="All">All categories</option>
              <option value="Injured Animal">Injured Animal</option>
              <option value="Abandoned Animal">Abandoned Animal</option>
              <option value="Welfare Concern">Welfare Concern</option>
              <option value="Rescue Request">Rescue Request</option>
            </select>
          </div>

          <div className="reports-field">
            <label htmlFor="reports-priority">Priority</label>
            <select
              id="reports-priority"
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option value="All">All priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
            </select>
          </div>

          <button
            type="button"
            className="reports-reset"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Category</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <div className="reports-primary-cell">
                      <strong>{report.reportNumber}</strong>
                      <small>{report.animal}</small>
                    </div>
                  </td>

                  <td>{report.category}</td>
                  <td>{report.location}</td>

                  <td>
                    <span
                      className={`reports-priority reports-priority-${report.priority.toLowerCase()}`}
                    >
                      {report.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`reports-status reports-status-${report.status.toLowerCase().replaceAll(" ", "-")}`}
                    >
                      {report.status}
                    </span>
                  </td>

                  <td>{report.submitted}</td>

                  <td>
                    <button
                      type="button"
                      className="reports-view-button"
                      onClick={() => setSelectedReport(report)}
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={7} className="reports-empty">
                    <strong>No reports found</strong>
                    <p>Try changing your search or filters.</p>
                    <button
                      type="button"
                      className="reports-view-button"
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

        <div className="reports-table-footer">
          <span>
            Showing {filteredReports.length} report
            {filteredReports.length === 1 ? "" : "s"}
          </span>
          <span>Illustrative records · No backend changes</span>
        </div>
      </section>

      {selectedReport && (
        <div
          className="reports-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedReport(null);
            }
          }}
        >
          <section
            className="reports-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reports-modal-title"
          >
            <div className="reports-modal-header">
              <div>
                <h2 id="reports-modal-title">Report details</h2>
                <p className="reports-modal-subtitle">
                  {selectedReport.reportNumber}
                </p>
              </div>

              <button
                type="button"
                className="reports-modal-close"
                onClick={() => setSelectedReport(null)}
                aria-label="Close report details"
              >
                ×
              </button>
            </div>

            <div className="reports-description">
              {selectedReport.description}
            </div>

            <div className="reports-detail-grid">
              <div>
                <span>Reported animal</span>
                <strong>{selectedReport.animal}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{selectedReport.category}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{selectedReport.location}</strong>
              </div>

              <div>
                <span>Submission date</span>
                <strong>{selectedReport.submitted}</strong>
              </div>

              <div>
                <span>Priority</span>
                <strong>{selectedReport.priority}</strong>
              </div>

              <div>
                <span>Current status</span>
                <strong>{selectedReport.status}</strong>
              </div>
            </div>

            <div className="reports-demo-warning">
              This report is sample data. Status updates are temporary and
              will not change real reports or backend records.
            </div>

            <div className="reports-status-editor">
              <label htmlFor="reports-modal-status">Update report status</label>
              <select
                id="reports-modal-status"
                value={selectedReport.status}
                onChange={(event) =>
                  updateReportStatus(
                    selectedReport.id,
                    event.target.value as ReportStatus,
                  )
                }
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="reports-modal-footer">
              <Link
                href={`/admin/reports/${selectedReport.id}`}
                className="reports-view-button"
              >
                Open report page →
              </Link>
            </div>

            <button
              type="button"
              className="reports-modal-done"
              onClick={() => setSelectedReport(null)}
            >
              Done
            </button>
          </section>
        </div>
      )}
    </main>
  );
}