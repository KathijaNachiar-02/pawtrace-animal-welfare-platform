"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type RescueCase = {
  id: string;
  animal: string;
  animalType: string;
  location: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  status:
    | "Awaiting Action"
    | "Assigned"
    | "In Progress"
    | "Resolved";
  reportedOn: string;
};

const sampleCases: RescueCase[] = [
  {
    id: "PT-1042",
    animal: "Injured street dog",
    animalType: "Dog",
    location: "North Zone",
    priority: "Urgent",
    status: "Awaiting Action",
    reportedOn: "19 Oct 2026",
  },
  {
    id: "PT-1038",
    animal: "Stray kitten",
    animalType: "Cat",
    location: "Central Zone",
    priority: "High",
    status: "Assigned",
    reportedOn: "18 Oct 2026",
  },
  {
    id: "PT-1031",
    animal: "Injured pigeon",
    animalType: "Bird",
    location: "South Zone",
    priority: "Medium",
    status: "In Progress",
    reportedOn: "17 Oct 2026",
  },
  {
    id: "PT-1027",
    animal: "Abandoned puppy",
    animalType: "Dog",
    location: "East Zone",
    priority: "Low",
    status: "Resolved",
    reportedOn: "16 Oct 2026",
  },
  {
    id: "PT-1024",
    animal: "Injured stray cat",
    animalType: "Cat",
    location: "West Zone",
    priority: "High",
    status: "In Progress",
    reportedOn: "15 Oct 2026",
  },
  {
    id: "PT-1019",
    animal: "Stray dog requiring care",
    animalType: "Dog",
    location: "Central Zone",
    priority: "Medium",
    status: "Assigned",
    reportedOn: "14 Oct 2026",
  },
];

const priorityClass: Record<RescueCase["priority"], string> = {
  Urgent: "ngo-case-priority-urgent",
  High: "ngo-case-priority-high",
  Medium: "ngo-case-priority-medium",
  Low: "ngo-case-priority-low",
};

const statusClass: Record<RescueCase["status"], string> = {
  "Awaiting Action": "ngo-case-status-awaiting",
  Assigned: "ngo-case-status-assigned",
  "In Progress": "ngo-case-status-progress",
  Resolved: "ngo-case-status-resolved",
};

export default function NgoCasesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filteredCases = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sampleCases.filter((item) => {
      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.animal.toLowerCase().includes(query) ||
        item.animalType.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        item.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [search, statusFilter, priorityFilter]);

  return (
    <div>
      <div className="ngo-page-heading">
        <h2>Rescue Cases</h2>
        <p>
          Review assigned animal rescue reports, monitor priorities,
          and track case progress.
        </p>
      </div>

      <div className="ngo-case-summary">
        <article className="ngo-case-summary-card">
          <span>Total Cases</span>
          <strong>{sampleCases.length}</strong>
        </article>

        <article className="ngo-case-summary-card">
          <span>Awaiting Action</span>
          <strong>
            {
              sampleCases.filter(
                (item) => item.status === "Awaiting Action",
              ).length
            }
          </strong>
        </article>

        <article className="ngo-case-summary-card">
          <span>In Progress</span>
          <strong>
            {
              sampleCases.filter(
                (item) => item.status === "In Progress",
              ).length
            }
          </strong>
        </article>

        <article className="ngo-case-summary-card">
          <span>Resolved</span>
          <strong>
            {
              sampleCases.filter(
                (item) => item.status === "Resolved",
              ).length
            }
          </strong>
        </article>
      </div>

      <section className="ngo-panel ngo-case-filters">
        <div className="ngo-case-filter-search">
          <label htmlFor="case-search">Search cases</label>
          <input
            id="case-search"
            type="search"
            placeholder="Search case ID, animal, or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="ngo-case-filter-field">
          <label htmlFor="case-status">Case status</label>
          <select
            id="case-status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Awaiting Action">Awaiting Action</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="ngo-case-filter-field">
          <label htmlFor="case-priority">Priority</label>
          <select
            id="case-priority"
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
          >
            <option value="All">All priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </section>

      <section className="ngo-panel ngo-case-results">
        <div className="ngo-case-results-heading">
          <div>
            <h3>Case Records</h3>
            <p>
              Showing {filteredCases.length} of {sampleCases.length}{" "}
              sample cases
            </p>
          </div>

          <button
            className="ngo-button ngo-button-secondary"
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setPriorityFilter("All");
            }}
          >
            Clear filters
          </button>
        </div>

        <div className="ngo-table-wrapper">
          <table className="ngo-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Animal</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Reported</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCases.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.id}</strong>
                  </td>

                  <td>
                    <strong>{item.animal}</strong>
                    <div className="ngo-case-secondary-text">
                      {item.animalType}
                    </div>
                  </td>

                  <td>{item.location}</td>

                  <td>
                    <span
                      className={`ngo-case-badge ${priorityClass[item.priority]}`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`ngo-case-badge ${statusClass[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{item.reportedOn}</td>

                  <td>
                    <Link
                      className="ngo-text-link"
                      href={`/ngo/cases/${item.id}`}
                    >
                      View details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCases.length === 0 && (
            <div className="ngo-empty-state">
              <strong>No matching cases found.</strong>
              <p>Try changing your search or filter selections.</p>
            </div>
          )}
        </div>
      </section>

      <aside className="ngo-demo-notice">
        <strong>Prototype data:</strong> these six rescue cases are
        examples for frontend development. Search and filters work
        locally in your browser, but the records are not connected to
        the PawTrace backend.
      </aside>
    </div>
  );
}