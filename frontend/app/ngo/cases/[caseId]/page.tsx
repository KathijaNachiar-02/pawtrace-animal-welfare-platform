"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type CaseRecord = {
  id: string;
  animal: string;
  animalType: string;
  location: string;
  priority: string;
  status: string;
  reportedOn: string;
  description: string;
  reporter: string;
  assignedTo: string;
};

const sampleCases: Record<string, CaseRecord> = {
  "PT-1042": {
    id: "PT-1042",
    animal: "Injured street dog",
    animalType: "Dog",
    location: "North Zone",
    priority: "Urgent",
    status: "Awaiting Action",
    reportedOn: "19 October 2026",
    description:
      "A street dog has reportedly been injured and requires assessment by an animal rescue team.",
    reporter: "Citizen Reporter",
    assignedTo: "PawTrace NGO Team",
  },
  "PT-1038": {
    id: "PT-1038",
    animal: "Stray kitten",
    animalType: "Cat",
    location: "Central Zone",
    priority: "High",
    status: "Assigned",
    reportedOn: "18 October 2026",
    description:
      "A stray kitten has been reported as needing assistance and an initial welfare assessment.",
    reporter: "Citizen Reporter",
    assignedTo: "PawTrace NGO Team",
  },
  "PT-1031": {
    id: "PT-1031",
    animal: "Injured pigeon",
    animalType: "Bird",
    location: "South Zone",
    priority: "Medium",
    status: "In Progress",
    reportedOn: "17 October 2026",
    description:
      "An injured pigeon has been reported. The rescue team is assessing the next steps for its care.",
    reporter: "Citizen Reporter",
    assignedTo: "PawTrace NGO Team",
  },
  "PT-1027": {
    id: "PT-1027",
    animal: "Abandoned puppy",
    animalType: "Dog",
    location: "East Zone",
    priority: "Low",
    status: "Resolved",
    reportedOn: "16 October 2026",
    description:
      "A puppy was reported abandoned. This sample record is marked as resolved for demonstration.",
    reporter: "Citizen Reporter",
    assignedTo: "PawTrace NGO Team",
  },
  "PT-1024": {
    id: "PT-1024",
    animal: "Injured stray cat",
    animalType: "Cat",
    location: "West Zone",
    priority: "High",
    status: "In Progress",
    reportedOn: "15 October 2026",
    description:
      "An injured stray cat has been reported for assessment and follow-up care.",
    reporter: "Citizen Reporter",
    assignedTo: "PawTrace NGO Team",
  },
  "PT-1019": {
    id: "PT-1019",
    animal: "Stray dog requiring care",
    animalType: "Dog",
    location: "Central Zone",
    priority: "Medium",
    status: "Assigned",
    reportedOn: "14 October 2026",
    description:
      "A stray dog has been reported for an animal welfare assessment and potential rescue support.",
    reporter: "Citizen Reporter",
    assignedTo: "PawTrace NGO Team",
  },
};

type CaseUpdate = {
  id: number;
  date: string;
  title: string;
  description: string;
};

export default function NgoCaseDetailsPage() {
  const params = useParams<{ caseId: string }>();
  const caseId = params.caseId;
  const record = sampleCases[caseId];

  const [updates, setUpdates] = useState<CaseUpdate[]>([
    {
      id: 1,
      date: "19 October 2026 · 10:30 AM",
      title: "Case received",
      description:
        "The sample rescue report was recorded in the portal.",
    },
    {
      id: 2,
      date: "19 October 2026 · 11:15 AM",
      title: "Case reviewed",
      description:
        "The case was reviewed by the sample NGO team.",
    },
  ]);

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [notice, setNotice] = useState("");

  if (!record) {
    return (
      <section className="ngo-panel">
        <h2>Case not found</h2>
        <p>
          No sample case exists for ID <strong>{caseId}</strong>.
        </p>
        <p>
          <Link className="ngo-text-link" href="/ngo/cases">
            ← Back to rescue cases
          </Link>
        </p>
      </section>
    );
  }

  function handleAddUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!updateTitle.trim() || !updateDescription.trim()) {
      setNotice("Please enter both an update title and description.");
      return;
    }

    const newUpdate: CaseUpdate = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      title: updateTitle.trim(),
      description: updateDescription.trim(),
    };

    setUpdates((previous) => [newUpdate, ...previous]);
    setUpdateTitle("");
    setUpdateDescription("");
    setNotice(
      "Update added to this local preview. It has not been saved to the backend.",
    );
  }

  return (
    <div>
      <div className="ngo-case-detail-back">
        <Link className="ngo-text-link" href="/ngo/cases">
          ← Back to rescue cases
        </Link>
      </div>

      <div className="ngo-page-heading ngo-detail-heading">
        <div>
          <span className="ngo-detail-case-id">{record.id}</span>
          <h2>{record.animal}</h2>
          <p>
            Reported on {record.reportedOn} · {record.location}
          </p>
        </div>

        <span className="ngo-case-badge ngo-case-status-progress">
          {record.status}
        </span>
      </div>

      <div className="ngo-case-detail-grid">
        <div className="ngo-case-detail-main">
          <section className="ngo-panel">
            <h3>Case information</h3>

            <div className="ngo-detail-info-grid">
              <div>
                <span>Case ID</span>
                <strong>{record.id}</strong>
              </div>

              <div>
                <span>Animal type</span>
                <strong>{record.animalType}</strong>
              </div>

              <div>
                <span>Priority</span>
                <strong>{record.priority}</strong>
              </div>

              <div>
                <span>Current status</span>
                <strong>{record.status}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{record.location}</strong>
              </div>

              <div>
                <span>Reported on</span>
                <strong>{record.reportedOn}</strong>
              </div>
            </div>

            <div className="ngo-detail-description">
              <h4>Report description</h4>
              <p>{record.description}</p>
            </div>
          </section>

          <section className="ngo-panel ngo-detail-timeline">
            <h3>Case timeline and updates</h3>

            {updates.length === 0 ? (
              <div className="ngo-empty-state">
                No updates have been added yet.
              </div>
            ) : (
              <div className="ngo-timeline-list">
                {updates.map((update) => (
                  <article
                    className="ngo-timeline-item"
                    key={update.id}
                  >
                    <span className="ngo-timeline-dot" />

                    <div>
                      <span className="ngo-timeline-date">
                        {update.date}
                      </span>
                      <h4>{update.title}</h4>
                      <p>{update.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="ngo-case-detail-side">
          <section className="ngo-panel">
            <h3>Assignment details</h3>

            <div className="ngo-detail-side-item">
              <span>Assigned organization</span>
              <strong>{record.assignedTo}</strong>
            </div>

            <div className="ngo-detail-side-item">
              <span>Reported by</span>
              <strong>{record.reporter}</strong>
            </div>

            <div className="ngo-detail-side-item">
              <span>Animal type</span>
              <strong>{record.animalType}</strong>
            </div>
          </section>

          <section className="ngo-panel">
            <h3>Add a progress update</h3>

            <form
              className="ngo-detail-update-form"
              onSubmit={handleAddUpdate}
            >
              <div className="ngo-form-field">
                <label htmlFor="update-title">Update title</label>
                <input
                  id="update-title"
                  value={updateTitle}
                  onChange={(event) =>
                    setUpdateTitle(event.target.value)
                  }
                  placeholder="e.g. Initial assessment"
                  maxLength={100}
                  required
                />
              </div>

              <div className="ngo-form-field">
                <label htmlFor="update-description">
                  Description
                </label>
                <textarea
                  id="update-description"
                  value={updateDescription}
                  onChange={(event) =>
                    setUpdateDescription(event.target.value)
                  }
                  placeholder="Describe the rescue progress..."
                  maxLength={1000}
                  required
                />
              </div>

              <button className="ngo-button" type="submit">
                Add update
              </button>

              {notice && (
                <p className="ngo-detail-notice" role="status">
                  {notice}
                </p>
              )}
            </form>
          </section>
        </aside>
      </div>

      <aside className="ngo-demo-notice">
        <strong>Frontend prototype:</strong> case details and timeline
        entries are sample data. New updates are stored only in the
        current page state and are not sent to the PawTrace backend.
      </aside>
    </div>
  );
}