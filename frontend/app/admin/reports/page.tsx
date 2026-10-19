"use client";

import { useMemo, useState } from "react";

type ReportStatus = "Pending" | "Under Review" | "Verified" | "Resolved";
type ReportPriority = "Low" | "Medium" | "High" | "Urgent";

type AnimalReport = {
  id: string;
  animal: string;
  category: string;
  location: string;
  reporter: string;
  description: string;
  status: ReportStatus;
  priority: ReportPriority;
  date: string;
};

const initialReports: AnimalReport[] = [
  {
    id: "RPT-101",
    animal: "Injured stray dog",
    category: "Injury",
    location: "Anna Nagar, Chennai",
    reporter: "Priya Kumar",
    description: "A stray dog has an injured front leg and needs veterinary attention.",
    status: "Pending",
    priority: "Urgent",
    date: "2026-10-19",
  },
  {
    id: "RPT-102",
    animal: "Stray puppy",
    category: "Rescue",
    location: "T. Nagar, Chennai",
    reporter: "Arun Raj",
    description: "A young puppy was found alone near a busy road.",
    status: "Under Review",
    priority: "High",
    date: "2026-10-18",
  },
  {
    id: "RPT-103",
    animal: "Community cat",
    category: "Medical Care",
    location: "Adyar, Chennai",
    reporter: "Meena S",
    description: "A community cat may require a veterinary check-up.",
    status: "Pending",
    priority: "Medium",
    date: "2026-10-17",
  },
  {
    id: "RPT-104",
    animal: "Abandoned kittens",
    category: "Abandonment",
    location: "Velachery, Chennai",
    reporter: "Karthik M",
    description: "Two kittens were found without their mother.",
    status: "Verified",
    priority: "High",
    date: "2026-10-16",
  },
  {
    id: "RPT-105",
    animal: "Injured street cat",
    category: "Injury",
    location: "Tambaram, Chennai",
    reporter: "Divya R",
    description: "A street cat needs assessment after an apparent injury.",
    status: "Resolved",
    priority: "Medium",
    date: "2026-10-15",
  },
  {
    id: "RPT-106",
    animal: "Stray dog",
    category: "Vaccination",
    location: "Mylapore, Chennai",
    reporter: "Vijay P",
    description: "A community dog may need vaccination assistance.",
    status: "Pending",
    priority: "Low",
    date: "2026-10-14",
  },
  {
    id: "RPT-107",
    animal: "Sick puppy",
    category: "Medical Care",
    location: "Porur, Chennai",
    reporter: "Nisha K",
    description: "A puppy appears unwell and needs a medical assessment.",
    status: "Under Review",
    priority: "Urgent",
    date: "2026-10-13",
  },
  {
    id: "RPT-108",
    animal: "Abandoned dog",
    category: "Abandonment",
    location: "Guindy, Chennai",
    reporter: "Ramesh T",
    description: "A dog has been reported without an apparent caregiver.",
    status: "Resolved",
    priority: "Low",
    date: "2026-10-12",
  },
];

const statusOptions: ReportStatus[] = [
  "Pending",
  "Under Review",
  "Verified",
  "Resolved",
];

const priorityOptions: ReportPriority[] = [
  "Low",
  "Medium",
  "High",
  "Urgent",
];

export default function ReportsPage() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedReport, setSelectedReport] =
    useState<AnimalReport | null>(null);

  const categories = Array.from(
    new Set(reports.map((report) => report.category))
  );

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch =
        !query ||
        [
          report.id,
          report.animal,
          report.location,
          report.reporter,
          report.category,
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

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setPriorityFilter("All");
  }

  function updateReportStatus(id: string, status: ReportStatus) {
    setReports((currentReports) =>
      currentReports.map((report) =>
        report.id === id ? { ...report, status } : report
      )
    );

    setSelectedReport((currentReport) =>
      currentReport?.id === id
        ? { ...currentReport, status }
        : currentReport
    );
  }

  const pendingCount = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  const resolvedCount = reports.filter(
    (report) => report.status === "Resolved"
  ).length;

  const urgentCount = reports.filter(
    (report) =>
      report.priority === "Urgent" &&
      report.status !== "Resolved"
  ).length;

  return (
    <main className="reports-page">
      <style jsx>{`
        .reports-page {
          color: #172b24;
          max-width: 1500px;
          margin: 0 auto;
          padding: 30px;
        }

        .reports-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 26px;
        }

        .reports-heading h1 {
          font-size: 30px;
          font-weight: 750;
          margin: 0;
          letter-spacing: -0.7px;
        }

        .reports-heading p {
          margin: 8px 0 0;
          color: #718078;
          font-size: 14px;
        }

        .prototype-tag {
          display: inline-block;
          background: #e8f5ec;
          color: #247347;
          padding: 8px 13px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }

        .report-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 17px;
          margin-bottom: 25px;
        }

        .report-stat {
          background: white;
          border: 1px solid #e6ece8;
          border-radius: 13px;
          padding: 20px;
          box-shadow: 0 3px 12px #193f2910;
        }

        .report-stat-label {
          color: #738078;
          font-size: 13px;
          font-weight: 600;
        }

        .report-stat-value {
          font-size: 31px;
          font-weight: 750;
          margin-top: 12px;
        }

        .report-stat-note {
          color: #87928b;
          font-size: 12px;
          margin-top: 5px;
        }

        .reports-panel {
          background: white;
          border: 1px solid #e5ebe7;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 3px 12px #193f2908;
        }

        .reports-panel-heading {
          padding: 23px 24px;
          border-bottom: 1px solid #edf0ee;
        }

        .reports-panel-heading h2 {
          margin: 0;
          font-size: 19px;
          font-weight: 750;
        }

        .reports-panel-heading p {
          margin: 6px 0 0;
          color: #78847c;
          font-size: 13px;
        }

        .reports-filters {
          display: grid;
          grid-template-columns: minmax(200px, 2fr) repeat(3, minmax(130px, 1fr)) auto;
          gap: 12px;
          padding: 19px 24px;
          background: #fbfcfb;
          border-bottom: 1px solid #edf0ee;
        }

        .reports-input,
        .reports-select {
          width: 100%;
          min-width: 0;
          border: 1px solid #dce5de;
          background: white;
          border-radius: 8px;
          padding: 11px 12px;
          font-size: 13px;
          color: #26372d;
          outline: none;
        }

        .reports-input:focus,
        .reports-select:focus {
          border-color: #338454;
          box-shadow: 0 0 0 3px #33845418;
        }

        .reports-reset {
          padding: 10px 14px;
          border: 1px solid #d8e4db;
          border-radius: 8px;
          background: white;
          color: #326747;
          cursor: pointer;
          font-size: 13px;
          font-weight: 650;
        }

        .reports-reset:hover {
          background: #edf7ef;
        }

        .reports-table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        .reports-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 13px;
        }

        .reports-table th {
          padding: 14px 17px;
          background: #f8faf8;
          color: #77837b;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
          font-weight: 750;
        }

        .reports-table td {
          padding: 17px;
          border-top: 1px solid #edf1ee;
          vertical-align: middle;
        }

        .reports-table tbody tr:hover {
          background: #fbfdfb;
        }

        .report-id {
          color: #27804b;
          font-weight: 750;
          white-space: nowrap;
        }

        .report-animal {
          font-weight: 700;
          color: #26372d;
        }

        .report-location {
          color: #78847c;
          margin-top: 5px;
          font-size: 12px;
        }

        .report-badge {
          display: inline-block;
          border-radius: 20px;
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 750;
          white-space: nowrap;
        }

        .status-pending {
          color: #95600b;
          background: #fff4d8;
        }

        .status-under-review {
          color: #315fb2;
          background: #eaf1ff;
        }

        .status-verified {
          color: #6545a0;
          background: #f0eaff;
        }

        .status-resolved {
          color: #217347;
          background: #e5f6eb;
        }

        .priority-low {
          color: #53665a;
          background: #edf1ee;
        }

        .priority-medium {
          color: #8c680e;
          background: #fff5d6;
        }

        .priority-high {
          color: #b54d23;
          background: #ffede4;
        }

        .priority-urgent {
          color: #b42332;
          background: #ffe8eb;
        }

        .report-view-button {
          background: white;
          border: 1px solid #d8e6dc;
          color: #287347;
          padding: 8px 12px;
          border-radius: 7px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          white-space: nowrap;
        }

        .report-view-button:hover {
          background: #edf7ef;
        }

        .reports-empty {
          padding: 45px 20px;
          text-align: center;
          color: #78847c;
        }

        .reports-count {
          padding: 15px 24px;
          border-top: 1px solid #edf0ee;
          font-size: 12px;
          color: #77837b;
        }

        .report-modal-backdrop {
          position: fixed;
          inset: 0;
          background: #10241bc0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }

        .report-modal {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 590px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 80px #0003;
        }

        .report-modal-header {
          padding: 23px 25px;
          border-bottom: 1px solid #edf0ee;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
        }

        .report-modal-header h2 {
          font-size: 21px;
          font-weight: 750;
          margin: 0;
        }

        .report-modal-header p {
          margin: 6px 0 0;
          font-size: 13px;
          color: #78847c;
        }

        .report-close {
          border: 0;
          background: #f0f4f1;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          font-size: 21px;
          cursor: pointer;
          color: #526158;
        }

        .report-modal-body {
          padding: 24px 25px;
        }

        .report-description {
          background: #f6f9f6;
          padding: 15px;
          border-radius: 10px;
          color: #506057;
          line-height: 1.7;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .report-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 16px;
        }

        .report-detail-label {
          color: #849087;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          font-weight: 700;
        }

        .report-detail-value {
          margin-top: 7px;
          font-size: 14px;
          font-weight: 650;
          overflow-wrap: anywhere;
        }

        .report-status-editor {
          margin-top: 23px;
          padding-top: 20px;
          border-top: 1px solid #e8eee9;
        }

        .report-status-editor label {
          display: block;
          font-weight: 700;
          font-size: 13px;
          margin-bottom: 9px;
        }

        .report-modal-footer {
          padding: 16px 25px;
          border-top: 1px solid #edf0ee;
          display: flex;
          justify-content: flex-end;
        }

        .report-done-button {
          background: #267448;
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .report-prototype-note {
          margin-top: 20px;
          background: #fff9e9;
          border: 1px solid #f3e4b7;
          border-radius: 10px;
          padding: 13px 16px;
          color: #84641b;
          font-size: 12px;
          line-height: 1.6;
        }

        @media (max-width: 1050px) {
          .reports-filters {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .report-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .reports-page {
            padding: 18px 12px;
          }

          .reports-heading h1 {
            font-size: 25px;
          }

          .report-stats {
            gap: 10px;
          }

          .report-stat {
            padding: 15px;
          }

          .report-stat-value {
            font-size: 26px;
          }

          .reports-filters {
            grid-template-columns: 1fr;
            padding: 15px;
          }

          .reports-panel-heading {
            padding: 18px;
          }

          .report-detail-grid {
            grid-template-columns: 1fr;
          }

          .report-modal-header,
          .report-modal-body {
            padding: 18px;
          }
        }
      `}</style>

      <header className="reports-heading">
        <div>
          <h1>Reports Management</h1>
          <p>Review animal welfare reports and monitor their progress.</p>
        </div>

        <span className="prototype-tag">Admin · Prototype Mode</span>
      </header>

      <section className="report-stats">
        <article className="report-stat">
          <div className="report-stat-label">Total Reports</div>
          <div className="report-stat-value">{reports.length}</div>
          <div className="report-stat-note">Reports in this demo</div>
        </article>

        <article className="report-stat">
          <div className="report-stat-label">Pending Review</div>
          <div className="report-stat-value">{pendingCount}</div>
          <div className="report-stat-note">Awaiting initial review</div>
        </article>

        <article className="report-stat">
          <div className="report-stat-label">Resolved</div>
          <div className="report-stat-value">{resolvedCount}</div>
          <div className="report-stat-note">Marked as resolved</div>
        </article>

        <article className="report-stat">
          <div className="report-stat-label">Urgent Reports</div>
          <div className="report-stat-value">{urgentCount}</div>
          <div className="report-stat-note">Urgent and not resolved</div>
        </article>
      </section>

      <section className="reports-panel">
        <div className="reports-panel-heading">
          <h2>Animal Welfare Reports</h2>
          <p>Search, filter, and review submitted reports.</p>
        </div>

        <div className="reports-filters">
          <input
            className="reports-input"
            type="search"
            placeholder="Search ID, animal, reporter, location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search reports"
          />

          <select
            className="reports-select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            className="reports-select"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="reports-select"
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            aria-label="Filter by priority"
          >
            <option value="All">All priorities</option>
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          <button className="reports-reset" onClick={resetFilters}>
            Reset
          </button>
        </div>

        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Animal / Category</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <div className="report-id">{report.id}</div>
                  </td>

                  <td>
                    <div className="report-animal">{report.animal}</div>
                    <div className="report-location">{report.category}</div>
                  </td>

                  <td>{report.location}</td>

                  <td>
                    <span
                      className={`report-badge priority-${report.priority.toLowerCase()}`}
                    >
                      {report.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`report-badge status-${report.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {report.status}
                    </span>
                  </td>

                  <td>{report.date}</td>

                  <td>
                    <button
                      className="report-view-button"
                      onClick={() => setSelectedReport(report)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredReports.length === 0 && (
            <div className="reports-empty">
              <p>No reports match your search or filters.</p>
              <button className="reports-reset" onClick={resetFilters}>
                Clear filters
              </button>
            </div>
          )}
        </div>

        <div className="reports-count">
          Showing {filteredReports.length} of {reports.length} reports
        </div>
      </section>

      <div className="report-prototype-note">
        <strong>Prototype notice:</strong> These are illustrative sample
        reports. Status changes are held in local page state and are not saved
        to the backend or shared with other users.
      </div>

      {selectedReport && (
        <div
          className="report-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedReport(null);
            }
          }}
        >
          <section
            className="report-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
          >
            <header className="report-modal-header">
              <div>
                <h2 id="report-modal-title">Report Details</h2>
                <p>{selectedReport.id} · Submitted by {selectedReport.reporter}</p>
              </div>

              <button
                className="report-close"
                onClick={() => setSelectedReport(null)}
                aria-label="Close report details"
              >
                ×
              </button>
            </header>

            <div className="report-modal-body">
              <div className="report-description">
                {selectedReport.description}
              </div>

              <div className="report-detail-grid">
                <div>
                  <div className="report-detail-label">Animal</div>
                  <div className="report-detail-value">
                    {selectedReport.animal}
                  </div>
                </div>

                <div>
                  <div className="report-detail-label">Category</div>
                  <div className="report-detail-value">
                    {selectedReport.category}
                  </div>
                </div>

                <div>
                  <div className="report-detail-label">Location</div>
                  <div className="report-detail-value">
                    {selectedReport.location}
                  </div>
                </div>

                <div>
                  <div className="report-detail-label">Date Reported</div>
                  <div className="report-detail-value">
                    {selectedReport.date}
                  </div>
                </div>

                <div>
                  <div className="report-detail-label">Priority</div>
                  <div className="report-detail-value">
                    {selectedReport.priority}
                  </div>
                </div>

                <div>
                  <div className="report-detail-label">Reporter</div>
                  <div className="report-detail-value">
                    {selectedReport.reporter}
                  </div>
                </div>
              </div>

              <div className="report-status-editor">
                <label htmlFor="report-status">Update report status</label>

                <select
                  id="report-status"
                  className="reports-select"
                  value={selectedReport.status}
                  onChange={(event) =>
                    updateReportStatus(
                      selectedReport.id,
                      event.target.value as ReportStatus
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
            </div>

            <footer className="report-modal-footer">
              <button
                className="report-done-button"
                onClick={() => setSelectedReport(null)}
              >
                Done
              </button>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
}