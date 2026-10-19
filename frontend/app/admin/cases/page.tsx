"use client";

import { useMemo, useState } from "react";

type CaseStatus =
  | "Reported"
  | "Under Review"
  | "Rescue in Progress"
  | "Resolved";

type CasePriority = "Low" | "Medium" | "High" | "Urgent";

type RescueCase = {
  id: string;
  animal: string;
  type: string;
  location: string;
  priority: CasePriority;
  status: CaseStatus;
  assignedTo: string;
  reportedDate: string;
  description: string;
};

const initialCases: RescueCase[] = [
  {
    id: "CASE-201",
    animal: "Injured street dog",
    type: "Injury",
    location: "Anna Nagar, Chennai",
    priority: "Urgent",
    status: "Reported",
    assignedTo: "Unassigned",
    reportedDate: "2026-10-19",
    description: "Street dog reported with a possible leg injury.",
  },
  {
    id: "CASE-202",
    animal: "Abandoned puppy",
    type: "Rescue",
    location: "T. Nagar, Chennai",
    priority: "High",
    status: "Under Review",
    assignedTo: "Green Paws Rescue",
    reportedDate: "2026-10-18",
    description: "Puppy found alone near a busy road.",
  },
  {
    id: "CASE-203",
    animal: "Community cat",
    type: "Medical Care",
    location: "Adyar, Chennai",
    priority: "Medium",
    status: "Rescue in Progress",
    assignedTo: "Happy Tails Foundation",
    reportedDate: "2026-10-17",
    description: "Community cat requires a veterinary assessment.",
  },
  {
    id: "CASE-204",
    animal: "Abandoned kittens",
    type: "Abandonment",
    location: "Velachery, Chennai",
    priority: "High",
    status: "Reported",
    assignedTo: "Unassigned",
    reportedDate: "2026-10-16",
    description: "Two kittens reported without their mother.",
  },
  {
    id: "CASE-205",
    animal: "Street cat",
    type: "Injury",
    location: "Tambaram, Chennai",
    priority: "Medium",
    status: "Resolved",
    assignedTo: "Animal Aid Network",
    reportedDate: "2026-10-15",
    description: "Reported cat received assistance.",
  },
  {
    id: "CASE-206",
    animal: "Stray dog",
    type: "Vaccination",
    location: "Mylapore, Chennai",
    priority: "Low",
    status: "Under Review",
    assignedTo: "Unassigned",
    reportedDate: "2026-10-14",
    description: "Community dog requires vaccination support.",
  },
];

const statusOptions: CaseStatus[] = [
  "Reported",
  "Under Review",
  "Rescue in Progress",
  "Resolved",
];

const priorityOptions: CasePriority[] = [
  "Low",
  "Medium",
  "High",
  "Urgent",
];

export default function CasesManagementPage() {
  const [cases, setCases] = useState(initialCases);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedCase, setSelectedCase] = useState<RescueCase | null>(null);

  const filteredCases = useMemo(() => {
    const query = search.trim().toLowerCase();

    return cases.filter((item) => {
      const matchesSearch =
        !query ||
        [
          item.id,
          item.animal,
          item.location,
          item.assignedTo,
          item.type,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || item.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [cases, search, statusFilter, priorityFilter]);

  function updateCase(id: string, updates: Partial<RescueCase>) {
    setCases((current) =>
      current.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );

    setSelectedCase((current) =>
      current?.id === id ? { ...current, ...updates } : current
    );
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  }

  const openCount = cases.filter(
    (item) => item.status !== "Resolved"
  ).length;

  const urgentCount = cases.filter(
    (item) =>
      item.priority === "Urgent" && item.status !== "Resolved"
  ).length;

  const resolvedCount = cases.filter(
    (item) => item.status === "Resolved"
  ).length;

  return (
    <main className="cases-page">
      <style jsx>{`
        .cases-page {
          max-width: 1500px;
          margin: auto;
          padding: 30px;
          color: #203329;
        }

        .heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .heading h1 {
          font-size: 30px;
          font-weight: 750;
          margin: 0;
        }

        .heading p {
          margin: 8px 0 0;
          color: #748178;
          font-size: 14px;
        }

        .prototype {
          background: #e8f5ec;
          color: #267448;
          padding: 8px 13px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat {
          background: white;
          border: 1px solid #e4ebe6;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 3px 12px #193f2909;
        }

        .stat-label {
          color: #78847c;
          font-size: 13px;
          font-weight: 600;
        }

        .stat-value {
          font-size: 30px;
          font-weight: 750;
          margin-top: 10px;
        }

        .panel {
          background: white;
          border: 1px solid #e3eae5;
          border-radius: 14px;
          overflow: hidden;
        }

        .panel-heading {
          padding: 22px 24px;
          border-bottom: 1px solid #edf1ee;
        }

        .panel-heading h2 {
          font-size: 19px;
          font-weight: 750;
          margin: 0;
        }

        .panel-heading p {
          font-size: 13px;
          color: #78847c;
          margin: 6px 0 0;
        }

        .filters {
          display: grid;
          grid-template-columns: minmax(180px, 2fr) repeat(2, minmax(150px, 1fr)) auto;
          gap: 12px;
          padding: 18px 24px;
          background: #fafcfa;
          border-bottom: 1px solid #edf1ee;
        }

        .field {
          width: 100%;
          min-width: 0;
          padding: 11px 12px;
          border: 1px solid #dce5de;
          border-radius: 8px;
          background: white;
          color: #26372d;
          font-size: 13px;
          outline: none;
        }

        .field:focus {
          border-color: #328251;
        }

        .reset {
          background: white;
          border: 1px solid #dce5de;
          color: #326747;
          border-radius: 8px;
          padding: 10px 14px;
          cursor: pointer;
          font-weight: 650;
        }

        .table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 13px;
        }

        th {
          background: #f7faf7;
          color: #77837b;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          padding: 14px 16px;
          white-space: nowrap;
        }

        td {
          padding: 16px;
          border-top: 1px solid #edf1ee;
          vertical-align: middle;
        }

        tbody tr:hover {
          background: #fbfdfb;
        }

        .case-id {
          color: #28784a;
          font-weight: 750;
          white-space: nowrap;
        }

        .animal-name {
          font-weight: 700;
        }

        .subtext {
          color: #7a867e;
          font-size: 12px;
          margin-top: 5px;
        }

        .badge {
          display: inline-block;
          padding: 6px 9px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 750;
          white-space: nowrap;
        }

        .low {
          background: #edf1ee;
          color: #53665a;
        }

        .medium {
          background: #fff5d6;
          color: #8c680e;
        }

        .high {
          background: #ffede4;
          color: #b54d23;
        }

        .urgent {
          background: #ffe8eb;
          color: #b42332;
        }

        .reported {
          background: #fff4d8;
          color: #95600b;
        }

        .under-review {
          background: #eaf1ff;
          color: #315fb2;
        }

        .rescue-in-progress {
          background: #f0eaff;
          color: #6545a0;
        }

        .resolved {
          background: #e5f6eb;
          color: #217347;
        }

        .view-button {
          background: white;
          border: 1px solid #d8e6dc;
          color: #287347;
          padding: 8px 11px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .view-button:hover {
          background: #edf7ef;
        }

        .empty {
          padding: 40px 20px;
          text-align: center;
          color: #78847c;
        }

        .count {
          padding: 14px 24px;
          border-top: 1px solid #edf1ee;
          color: #78847c;
          font-size: 12px;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: #10241bc0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }

        .modal {
          width: 100%;
          max-width: 580px;
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border-radius: 15px;
          box-shadow: 0 25px 80px #0003;
        }

        .modal-header {
          padding: 22px 24px;
          border-bottom: 1px solid #edf1ee;
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }

        .modal-header h2 {
          font-size: 21px;
          margin: 0;
        }

        .modal-header p {
          font-size: 13px;
          color: #78847c;
          margin: 6px 0 0;
        }

        .close {
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 8px;
          background: #f0f4f1;
          cursor: pointer;
          font-size: 21px;
        }

        .modal-body {
          padding: 24px;
        }

        .description {
          padding: 15px;
          background: #f6f9f6;
          border-radius: 9px;
          color: #526158;
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 22px;
        }

        .details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 16px;
        }

        .detail-label {
          color: #849087;
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .detail-value {
          margin-top: 7px;
          font-size: 14px;
          font-weight: 650;
          overflow-wrap: anywhere;
        }

        .editor {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e8eee9;
        }

        .editor label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 9px;
        }

        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #edf1ee;
          display: flex;
          justify-content: flex-end;
        }

        .done {
          background: #267448;
          border: 0;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .notice {
          margin-top: 18px;
          padding: 13px 16px;
          background: #fff9e9;
          border: 1px solid #f3e4b7;
          border-radius: 9px;
          color: #84641b;
          font-size: 12px;
          line-height: 1.6;
        }

        @media (max-width: 1000px) {
          .stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .filters {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .cases-page {
            padding: 18px 12px;
          }

          .heading h1 {
            font-size: 25px;
          }

          .filters,
          .details {
            grid-template-columns: 1fr;
          }

          .panel-heading {
            padding: 18px;
          }

          .modal-header,
          .modal-body {
            padding: 18px;
          }
        }
      `}</style>

      <header className="heading">
        <div>
          <h1>Case Management</h1>
          <p>Track rescue cases, priorities, and case progress.</p>
        </div>
        <span className="prototype">Admin · Prototype Mode</span>
      </header>

      <section className="stats">
        <article className="stat">
          <div className="stat-label">Total Cases</div>
          <div className="stat-value">{cases.length}</div>
        </article>

        <article className="stat">
          <div className="stat-label">Open Cases</div>
          <div className="stat-value">{openCount}</div>
        </article>

        <article className="stat">
          <div className="stat-label">Urgent Cases</div>
          <div className="stat-value">{urgentCount}</div>
        </article>

        <article className="stat">
          <div className="stat-label">Resolved Cases</div>
          <div className="stat-value">{resolvedCount}</div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h2>Rescue Cases</h2>
          <p>Search and review animal welfare cases.</p>
        </div>

        <div className="filters">
          <input
            className="field"
            type="search"
            placeholder="Search ID, animal, location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="field"
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

          <select
            className="field"
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option value="All">All priorities</option>
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          <button className="reset" onClick={resetFilters}>
            Reset
          </button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Animal / Type</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned NGO</th>
                <th>Reported</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCases.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="case-id">{item.id}</div>
                  </td>

                  <td>
                    <div className="animal-name">{item.animal}</div>
                    <div className="subtext">{item.type}</div>
                  </td>

                  <td>{item.location}</td>

                  <td>
                    <span className={`badge ${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${item.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{item.assignedTo}</td>
                  <td>{item.reportedDate}</td>

                  <td>
                    <button
                      className="view-button"
                      onClick={() => setSelectedCase(item)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCases.length === 0 && (
            <div className="empty">
              No cases match your search or filters.
            </div>
          )}
        </div>

        <div className="count">
          Showing {filteredCases.length} of {cases.length} cases
        </div>
      </section>

      <div className="notice">
        <strong>Prototype notice:</strong> This page uses sample rescue cases.
        Status, priority, and assignment changes are temporary and are not
        saved to the backend.
      </div>

      {selectedCase && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCase(null);
            }
          }}
        >
          <section className="modal" role="dialog" aria-modal="true">
            <header className="modal-header">
              <div>
                <h2>Case Details</h2>
                <p>{selectedCase.id}</p>
              </div>

              <button
                className="close"
                onClick={() => setSelectedCase(null)}
                aria-label="Close case details"
              >
                ×
              </button>
            </header>

            <div className="modal-body">
              <div className="description">
                {selectedCase.description}
              </div>

              <div className="details">
                <div>
                  <div className="detail-label">Animal</div>
                  <div className="detail-value">{selectedCase.animal}</div>
                </div>

                <div>
                  <div className="detail-label">Case Type</div>
                  <div className="detail-value">{selectedCase.type}</div>
                </div>

                <div>
                  <div className="detail-label">Location</div>
                  <div className="detail-value">{selectedCase.location}</div>
                </div>

                <div>
                  <div className="detail-label">Reported Date</div>
                  <div className="detail-value">{selectedCase.reportedDate}</div>
                </div>
              </div>

              <div className="editor">
                <label htmlFor="case-status">Update case status</label>
                <select
                  id="case-status"
                  className="field"
                  value={selectedCase.status}
                  onChange={(event) =>
                    updateCase(selectedCase.id, {
                      status: event.target.value as CaseStatus,
                    })
                  }
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="editor">
                <label htmlFor="case-priority">Update priority</label>
                <select
                  id="case-priority"
                  className="field"
                  value={selectedCase.priority}
                  onChange={(event) =>
                    updateCase(selectedCase.id, {
                      priority: event.target.value as CasePriority,
                    })
                  }
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <div className="editor">
                <label htmlFor="case-ngo">Assigned NGO</label>
                <select
                  id="case-ngo"
                  className="field"
                  value={selectedCase.assignedTo}
                  onChange={(event) =>
                    updateCase(selectedCase.id, {
                      assignedTo: event.target.value,
                    })
                  }
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Green Paws Rescue">Green Paws Rescue</option>
                  <option value="Happy Tails Foundation">
                    Happy Tails Foundation
                  </option>
                  <option value="Animal Aid Network">
                    Animal Aid Network
                  </option>
                </select>
              </div>
            </div>

            <footer className="modal-footer">
              <button
                className="done"
                onClick={() => setSelectedCase(null)}
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