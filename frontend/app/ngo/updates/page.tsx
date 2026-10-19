"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type CaseUpdate = {
  id: number;
  caseId: string;
  animal: string;
  title: string;
  description: string;
  author: string;
  date: string;
  status: "Submitted" | "Under Review" | "Reviewed";
};

const initialUpdates: CaseUpdate[] = [
  {
    id: 1,
    caseId: "PT-1042",
    animal: "Injured street dog",
    title: "Initial animal assessment",
    description:
      "The rescue team reviewed the report. The animal requires an initial health assessment and appropriate care.",
    author: "NGO Rescue Team",
    date: "Today",
    status: "Submitted",
  },
  {
    id: 2,
    caseId: "PT-1038",
    animal: "Stray kitten",
    title: "Health condition checked",
    description:
      "The kitten has been examined. The team will continue monitoring its recovery.",
    author: "Animal Care Team",
    date: "Yesterday",
    status: "Under Review",
  },
  {
    id: 3,
    caseId: "PT-1031",
    animal: "Injured pigeon",
    title: "Treatment progress",
    description:
      "The bird remains under observation. Further assessment is needed before release.",
    author: "Rescue Coordinator",
    date: "2 days ago",
    status: "Reviewed",
  },
  {
    id: 4,
    caseId: "PT-1024",
    animal: "Injured stray cat",
    title: "Recovery observation",
    description:
      "The care team reports that the animal is responding to the current care plan.",
    author: "NGO Rescue Team",
    date: "3 days ago",
    status: "Submitted",
  },
];

export default function CaseUpdatesPage() {
  const [updates, setUpdates] = useState(initialUpdates);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");

  const [caseId, setCaseId] = useState("PT-1042");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const filteredUpdates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return updates.filter((update) => {
      const matchesSearch =
        !query ||
        update.caseId.toLowerCase().includes(query) ||
        update.animal.toLowerCase().includes(query) ||
        update.title.toLowerCase().includes(query) ||
        update.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || update.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [updates, search, statusFilter]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || !cleanDescription) {
      setMessage("Please enter both a title and a description.");
      return;
    }

    const newUpdate: CaseUpdate = {
      id: Date.now(),
      caseId,
      animal:
        caseId === "PT-1042"
          ? "Injured street dog"
          : caseId === "PT-1038"
            ? "Stray kitten"
            : caseId === "PT-1031"
              ? "Injured pigeon"
              : caseId === "PT-1024"
                ? "Injured stray cat"
                : caseId === "PT-1027"
                  ? "Abandoned puppy"
                  : "Stray dog requiring care",
      title: cleanTitle,
      description: cleanDescription,
      author: "NGO Staff",
      date: "Just now",
      status: "Submitted",
    };

    setUpdates((current) => [newUpdate, ...current]);
    setTitle("");
    setDescription("");
    setMessage("Update added to this page's local preview.");
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
  }

  return (
    <main className="ngo-page">
      <div className="ngo-page-header">
        <div>
          <p className="ngo-eyebrow">CASE COMMUNICATION</p>
          <h1>Case Updates</h1>
          <p className="ngo-page-description">
            Review progress notes and record updates about rescue cases.
          </p>
        </div>

        <span className="ngo-demo-label">Prototype · Sample data</span>
      </div>

      <section className="ngo-update-summary">
        <article className="ngo-update-summary-card">
          <span>Total Updates</span>
          <strong>{updates.length.toString().padStart(2, "0")}</strong>
        </article>

        <article className="ngo-update-summary-card">
          <span>Submitted</span>
          <strong>
            {
              updates.filter((update) => update.status === "Submitted")
                .length
            }
          </strong>
        </article>

        <article className="ngo-update-summary-card">
          <span>Under Review</span>
          <strong>
            {
              updates.filter((update) => update.status === "Under Review")
                .length
            }
          </strong>
        </article>

        <article className="ngo-update-summary-card">
          <span>Reviewed</span>
          <strong>
            {updates.filter((update) => update.status === "Reviewed").length}
          </strong>
        </article>
      </section>

      <section className="ngo-update-panel">
        <div className="ngo-update-panel-heading">
          <div>
            <h2>Add a Case Update</h2>
            <p>Record a progress note for a rescue case.</p>
          </div>
        </div>

        <form className="ngo-update-form" onSubmit={handleSubmit}>
          <label>
            <span>Related Case</span>
            <select
              value={caseId}
              onChange={(event) => setCaseId(event.target.value)}
            >
              <option value="PT-1042">PT-1042 — Injured street dog</option>
              <option value="PT-1038">PT-1038 — Stray kitten</option>
              <option value="PT-1031">PT-1031 — Injured pigeon</option>
              <option value="PT-1027">PT-1027 — Abandoned puppy</option>
              <option value="PT-1024">PT-1024 — Injured stray cat</option>
              <option value="PT-1019">PT-1019 — Stray dog requiring care</option>
            </select>
          </label>

          <label>
            <span>Update Title</span>
            <input
              type="text"
              placeholder="e.g. Follow-up health assessment"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={100}
              required
            />
          </label>

          <label>
            <span>Progress Description</span>
            <textarea
              placeholder="Describe the rescue progress, care provided, or next steps..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              maxLength={1000}
              required
            />
          </label>

          <div className="ngo-update-form-footer">
            <p>Both fields are required.</p>
            <button type="submit" className="ngo-update-submit">
              Add Update
            </button>
          </div>

          {message && (
            <p className="ngo-update-message" role="status">
              {message}
            </p>
          )}
        </form>
      </section>

      <section className="ngo-update-panel ngo-update-history">
        <div className="ngo-update-panel-heading">
          <div>
            <h2>Update History</h2>
            <p>Search and filter the available case progress notes.</p>
          </div>

          <span className="ngo-update-count">
            {filteredUpdates.length}{" "}
            {filteredUpdates.length === 1 ? "update" : "updates"}
          </span>
        </div>

        <div className="ngo-update-filters">
          <label>
            <span>Search updates</span>
            <input
              type="search"
              placeholder="Search case ID, animal, or title..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label>
            <span>Review status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Reviewed">Reviewed</option>
            </select>
          </label>

          <button
            type="button"
            className="ngo-update-reset"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        <div className="ngo-update-list">
          {filteredUpdates.map((update) => (
            <article className="ngo-update-item" key={update.id}>
              <div className="ngo-update-item-top">
                <div>
                  <span className="ngo-update-case-id">
                    <Link href={`/ngo/cases/${update.caseId}`}>
                      {update.caseId}
                    </Link>
                  </span>
                  <h3>{update.title}</h3>
                  <p className="ngo-update-animal">{update.animal}</p>
                </div>

                <span
                  className={`ngo-update-status ngo-update-status-${update.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {update.status}
                </span>
              </div>

              <p className="ngo-update-description">{update.description}</p>

              <div className="ngo-update-meta">
                <span>By {update.author}</span>
                <span>{update.date}</span>
              </div>
            </article>
          ))}

          {filteredUpdates.length === 0 && (
            <div className="ngo-update-empty">
              <strong>No updates found</strong>
              <p>Try a different search term or review status.</p>
              <button
                type="button"
                className="ngo-update-reset"
                onClick={resetFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <p className="ngo-update-note">
          Prototype notice: Updates are kept in page state only. They are not
          saved to the backend and will disappear when the page is refreshed.
        </p>
      </section>

      <div className="ngo-update-back">
        <Link href="/ngo">← Back to NGO Overview</Link>
      </div>
    </main>
  );
}