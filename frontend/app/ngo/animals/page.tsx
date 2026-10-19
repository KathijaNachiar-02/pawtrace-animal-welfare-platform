"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Animal = {
  id: string;
  name: string;
  species: string;
  location: string;
  caseId: string;
  status: "Under Treatment" | "Recovering" | "Ready for Adoption";
  health: string;
  lastUpdated: string;
};

const animals: Animal[] = [
  {
    id: "AN-201",
    name: "Buddy",
    species: "Dog",
    location: "North Zone",
    caseId: "PT-1042",
    status: "Under Treatment",
    health: "Needs medical attention",
    lastUpdated: "Today",
  },
  {
    id: "AN-202",
    name: "Mittens",
    species: "Cat",
    location: "Central Zone",
    caseId: "PT-1038",
    status: "Recovering",
    health: "Stable and recovering",
    lastUpdated: "Yesterday",
  },
  {
    id: "AN-203",
    name: "Sky",
    species: "Pigeon",
    location: "South Zone",
    caseId: "PT-1031",
    status: "Under Treatment",
    health: "Under observation",
    lastUpdated: "Today",
  },
  {
    id: "AN-204",
    name: "Coco",
    species: "Dog",
    location: "East Zone",
    caseId: "PT-1027",
    status: "Ready for Adoption",
    health: "Healthy",
    lastUpdated: "2 days ago",
  },
  {
    id: "AN-205",
    name: "Whiskers",
    species: "Cat",
    location: "West Zone",
    caseId: "PT-1024",
    status: "Recovering",
    health: "Responding well to care",
    lastUpdated: "Today",
  },
  {
    id: "AN-206",
    name: "Rocky",
    species: "Dog",
    location: "Central Zone",
    caseId: "PT-1019",
    status: "Under Treatment",
    health: "Care plan in progress",
    lastUpdated: "Yesterday",
  },
];

function statusClass(status: Animal["status"]) {
  if (status === "Under Treatment") return "ngo-animal-status-treatment";
  if (status === "Recovering") return "ngo-animal-status-recovering";
  return "ngo-animal-status-adoption";
}

export default function AnimalsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [speciesFilter, setSpeciesFilter] = useState("All");

  const filteredAnimals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return animals.filter((animal) => {
      const matchesSearch =
        !query ||
        animal.id.toLowerCase().includes(query) ||
        animal.name.toLowerCase().includes(query) ||
        animal.species.toLowerCase().includes(query) ||
        animal.caseId.toLowerCase().includes(query) ||
        animal.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || animal.status === statusFilter;

      const matchesSpecies =
        speciesFilter === "All" || animal.species === speciesFilter;

      return matchesSearch && matchesStatus && matchesSpecies;
    });
  }, [search, statusFilter, speciesFilter]);

  const treatmentCount = animals.filter(
    (animal) => animal.status === "Under Treatment"
  ).length;

  const recoveringCount = animals.filter(
    (animal) => animal.status === "Recovering"
  ).length;

  const adoptionCount = animals.filter(
    (animal) => animal.status === "Ready for Adoption"
  ).length;

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setSpeciesFilter("All");
  }

  return (
    <main className="ngo-page">
      <div className="ngo-page-header">
        <div>
          <p className="ngo-eyebrow">ANIMAL CARE</p>
          <h1>Animal Management</h1>
          <p className="ngo-page-description">
            View animals under your organization&apos;s care and monitor their
            treatment and recovery status.
          </p>
        </div>

        <span className="ngo-demo-label">Prototype · Sample data</span>
      </div>

      <section className="ngo-animal-stats">
        <article className="ngo-animal-stat-card">
          <span>Total Animals</span>
          <strong>{animals.length.toString().padStart(2, "0")}</strong>
          <small>Registered in this preview</small>
        </article>

        <article className="ngo-animal-stat-card">
          <span>Under Treatment</span>
          <strong>{treatmentCount.toString().padStart(2, "0")}</strong>
          <small>Receiving medical care</small>
        </article>

        <article className="ngo-animal-stat-card">
          <span>Recovering</span>
          <strong>{recoveringCount.toString().padStart(2, "0")}</strong>
          <small>Recovery in progress</small>
        </article>

        <article className="ngo-animal-stat-card">
          <span>Ready for Adoption</span>
          <strong>{adoptionCount.toString().padStart(2, "0")}</strong>
          <small>May be ready for a new home</small>
        </article>
      </section>

      <section className="ngo-animal-panel">
        <div className="ngo-animal-panel-heading">
          <div>
            <h2>Animals in Care</h2>
            <p>Search records or narrow the list using the filters.</p>
          </div>

          <span className="ngo-animal-result-count">
            {filteredAnimals.length}{" "}
            {filteredAnimals.length === 1 ? "animal" : "animals"}
          </span>
        </div>

        <div className="ngo-animal-filters">
          <label className="ngo-animal-search">
            <span>Search animals</span>
            <input
              type="search"
              placeholder="Search name, ID, species, case ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label>
            <span>Care status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              <option value="Under Treatment">Under Treatment</option>
              <option value="Recovering">Recovering</option>
              <option value="Ready for Adoption">Ready for Adoption</option>
            </select>
          </label>

          <label>
            <span>Species</span>
            <select
              value={speciesFilter}
              onChange={(event) => setSpeciesFilter(event.target.value)}
            >
              <option value="All">All species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Pigeon">Pigeon</option>
            </select>
          </label>

          <button
            type="button"
            className="ngo-animal-reset"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        <div className="ngo-animal-table-wrap">
          <table className="ngo-animal-table">
            <thead>
              <tr>
                <th>Animal</th>
                <th>Species</th>
                <th>Location</th>
                <th>Related Case</th>
                <th>Care Status</th>
                <th>Health Summary</th>
                <th>Last Updated</th>
              </tr>
            </thead>

            <tbody>
              {filteredAnimals.map((animal) => (
                <tr key={animal.id}>
                  <td>
                    <div className="ngo-animal-identity">
                      <span className="ngo-animal-avatar">
                        {animal.species === "Dog"
                          ? "🐕"
                          : animal.species === "Cat"
                            ? "🐈"
                            : "🐦"}
                      </span>
                      <span>
                        <strong>{animal.name}</strong>
                        <small>{animal.id}</small>
                      </span>
                    </div>
                  </td>

                  <td>{animal.species}</td>
                  <td>{animal.location}</td>

                  <td>
                    <Link
                      className="ngo-animal-case-link"
                      href={`/ngo/cases/${animal.caseId}`}
                    >
                      {animal.caseId}
                    </Link>
                  </td>

                  <td>
                    <span
                      className={`ngo-animal-status ${statusClass(animal.status)}`}
                    >
                      {animal.status}
                    </span>
                  </td>

                  <td>{animal.health}</td>
                  <td>{animal.lastUpdated}</td>
                </tr>
              ))}

              {filteredAnimals.length === 0 && (
                <tr>
                  <td colSpan={7} className="ngo-animal-empty">
                    <strong>No animals found</strong>
                    <p>
                      Try a different search term or change the selected
                      filters.
                    </p>
                    <button
                      type="button"
                      className="ngo-animal-reset"
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

        <p className="ngo-animal-note">
          Prototype notice: These animal records are sample data stored in this
          page. They are not connected to the backend or a live animal database.
        </p>
      </section>

      <div className="ngo-animal-back">
        <Link href="/ngo">← Back to NGO Overview</Link>
      </div>
    </main>
  );
}