"use client";

import { useMemo, useState } from "react";

type AnimalSpecies = "Dog" | "Cat" | "Other";
type CareStatus =
  | "Healthy"
  | "Needs Medical Care"
  | "Recovering"
  | "Under Observation";

type Animal = {
  id: string;
  name: string;
  species: AnimalSpecies;
  age: string;
  gender: string;
  location: string;
  careStatus: CareStatus;
  health: string;
  registeredDate: string;
};

const initialAnimals: Animal[] = [
  {
    id: "AN-301",
    name: "Bruno",
    species: "Dog",
    age: "3 years",
    gender: "Male",
    location: "Anna Nagar, Chennai",
    careStatus: "Needs Medical Care",
    health: "Possible leg injury; veterinary assessment needed.",
    registeredDate: "2026-10-19",
  },
  {
    id: "AN-302",
    name: "Mittens",
    species: "Cat",
    age: "1 year",
    gender: "Female",
    location: "Adyar, Chennai",
    careStatus: "Healthy",
    health: "No current health concerns reported.",
    registeredDate: "2026-10-18",
  },
  {
    id: "AN-303",
    name: "Coco",
    species: "Dog",
    age: "6 months",
    gender: "Female",
    location: "T. Nagar, Chennai",
    careStatus: "Recovering",
    health: "Recovering following a medical assessment.",
    registeredDate: "2026-10-17",
  },
  {
    id: "AN-304",
    name: "Snowy",
    species: "Cat",
    age: "8 months",
    gender: "Male",
    location: "Velachery, Chennai",
    careStatus: "Under Observation",
    health: "Monitoring appetite and general condition.",
    registeredDate: "2026-10-16",
  },
  {
    id: "AN-305",
    name: "Rocky",
    species: "Dog",
    age: "4 years",
    gender: "Male",
    location: "Mylapore, Chennai",
    careStatus: "Healthy",
    health: "Routine care; no current concerns reported.",
    registeredDate: "2026-10-15",
  },
  {
    id: "AN-306",
    name: "Luna",
    species: "Cat",
    age: "2 years",
    gender: "Female",
    location: "Tambaram, Chennai",
    careStatus: "Needs Medical Care",
    health: "Reported skin irritation; veterinary review needed.",
    registeredDate: "2026-10-14",
  },
  {
    id: "AN-307",
    name: "Max",
    species: "Dog",
    age: "2 years",
    gender: "Male",
    location: "Guindy, Chennai",
    careStatus: "Under Observation",
    health: "Observation requested after rescue.",
    registeredDate: "2026-10-13",
  },
  {
    id: "AN-308",
    name: "Milo",
    species: "Other",
    age: "Unknown",
    gender: "Unknown",
    location: "Community care centre",
    careStatus: "Recovering",
    health: "Illustrative record for another animal species.",
    registeredDate: "2026-10-12",
  },
];

const careOptions: CareStatus[] = [
  "Healthy",
  "Needs Medical Care",
  "Recovering",
  "Under Observation",
];

const speciesOptions: AnimalSpecies[] = ["Dog", "Cat", "Other"];

export default function AnimalsManagementPage() {
  const [animals, setAnimals] = useState(initialAnimals);
  const [search, setSearch] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [careFilter, setCareFilter] = useState("All");
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const filteredAnimals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return animals.filter((animal) => {
      const matchesSearch =
        !query ||
        [
          animal.id,
          animal.name,
          animal.species,
          animal.location,
          animal.health,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesSpecies =
        speciesFilter === "All" || animal.species === speciesFilter;

      const matchesCare =
        careFilter === "All" || animal.careStatus === careFilter;

      return matchesSearch && matchesSpecies && matchesCare;
    });
  }, [animals, search, speciesFilter, careFilter]);

  const dogCount = animals.filter(
    (animal) => animal.species === "Dog"
  ).length;

  const catCount = animals.filter(
    (animal) => animal.species === "Cat"
  ).length;

  const needsCareCount = animals.filter(
    (animal) => animal.careStatus === "Needs Medical Care"
  ).length;

  function updateCareStatus(id: string, careStatus: CareStatus) {
    setAnimals((current) =>
      current.map((animal) =>
        animal.id === id ? { ...animal, careStatus } : animal
      )
    );

    setSelectedAnimal((current) =>
      current?.id === id ? { ...current, careStatus } : current
    );
  }

  function resetFilters() {
    setSearch("");
    setSpeciesFilter("All");
    setCareFilter("All");
  }

  function careClass(status: CareStatus) {
    switch (status) {
      case "Healthy":
        return "healthy";
      case "Needs Medical Care":
        return "medical";
      case "Recovering":
        return "recovering";
      case "Under Observation":
        return "observation";
    }
  }

  return (
    <main className="animals-admin-page">
      <style jsx>{`
        .animals-admin-page {
          max-width: 1500px;
          margin: 0 auto;
          padding: 30px;
          color: #203329;
        }

        .heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 25px;
        }

        .heading h1 {
          font-size: 30px;
          font-weight: 750;
          margin: 0;
        }

        .heading p {
          margin-top: 8px;
          color: #748178;
          font-size: 14px;
        }

        .prototype {
          display: inline-block;
          padding: 8px 13px;
          border-radius: 20px;
          background: #e8f5ec;
          color: #267448;
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
          padding: 20px;
          background: white;
          border: 1px solid #e4ebe6;
          border-radius: 12px;
          box-shadow: 0 3px 12px #193f2909;
        }

        .stat-label {
          color: #78847c;
          font-size: 13px;
          font-weight: 600;
        }

        .stat-value {
          margin-top: 10px;
          font-size: 30px;
          font-weight: 750;
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
          margin: 0;
          font-size: 19px;
          font-weight: 750;
        }

        .panel-heading p {
          margin: 6px 0 0;
          color: #78847c;
          font-size: 13px;
        }

        .filters {
          display: grid;
          grid-template-columns: minmax(200px, 2fr) repeat(2, minmax(150px, 1fr)) auto;
          gap: 12px;
          padding: 18px 24px;
          background: #fafcfa;
          border-bottom: 1px solid #edf1ee;
        }

        .field {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
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
          padding: 10px 14px;
          border: 1px solid #dce5de;
          border-radius: 8px;
          background: white;
          color: #326747;
          font-weight: 650;
          cursor: pointer;
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
          padding: 14px 16px;
          background: #f7faf7;
          color: #77837b;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
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

        .animal-id {
          color: #28784a;
          font-weight: 750;
          white-space: nowrap;
        }

        .animal-name {
          font-weight: 700;
        }

        .subtext {
          margin-top: 5px;
          color: #7a867e;
          font-size: 12px;
        }

        .badge {
          display: inline-block;
          padding: 6px 9px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 750;
          white-space: nowrap;
        }

        .healthy {
          background: #e5f6eb;
          color: #217347;
        }

        .medical {
          background: #ffe8eb;
          color: #b42332;
        }

        .recovering {
          background: #eaf1ff;
          color: #315fb2;
        }

        .observation {
          background: #fff4d8;
          color: #95600b;
        }

        .view-button {
          padding: 8px 11px;
          border: 1px solid #d8e6dc;
          border-radius: 7px;
          background: white;
          color: #287347;
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
          color: #78847c;
          text-align: center;
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
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: #10241bc0;
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
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 22px 24px;
          border-bottom: 1px solid #edf1ee;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 21px;
        }

        .modal-header p {
          margin: 6px 0 0;
          color: #78847c;
          font-size: 13px;
        }

        .close {
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 8px;
          background: #f0f4f1;
          font-size: 21px;
          cursor: pointer;
        }

        .modal-body {
          padding: 24px;
        }

        .health-box {
          margin-bottom: 22px;
          padding: 15px;
          border-radius: 9px;
          background: #f6f9f6;
          color: #526158;
          font-size: 14px;
          line-height: 1.7;
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
          margin-bottom: 9px;
          font-size: 13px;
          font-weight: 700;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          padding: 16px 24px;
          border-top: 1px solid #edf1ee;
        }

        .done {
          padding: 10px 20px;
          border: 0;
          border-radius: 8px;
          background: #267448;
          color: white;
          font-weight: 700;
          cursor: pointer;
        }

        .notice {
          margin-top: 18px;
          padding: 13px 16px;
          border: 1px solid #f3e4b7;
          border-radius: 9px;
          background: #fff9e9;
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
          .animals-admin-page {
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
          <h1>Animal Management</h1>
          <p>View animal profiles, health information, and care status.</p>
        </div>
        <span className="prototype">Admin · Prototype Mode</span>
      </header>

      <section className="stats">
        <article className="stat">
          <div className="stat-label">Total Animals</div>
          <div className="stat-value">{animals.length}</div>
        </article>

        <article className="stat">
          <div className="stat-label">Dogs</div>
          <div className="stat-value">{dogCount}</div>
        </article>

        <article className="stat">
          <div className="stat-label">Cats</div>
          <div className="stat-value">{catCount}</div>
        </article>

        <article className="stat">
          <div className="stat-label">Need Medical Care</div>
          <div className="stat-value">{needsCareCount}</div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h2>Registered Animals</h2>
          <p>Search profiles and review animal care information.</p>
        </div>

        <div className="filters">
          <input
            className="field"
            type="search"
            placeholder="Search ID, name, location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search animals"
          />

          <select
            className="field"
            value={speciesFilter}
            onChange={(event) => setSpeciesFilter(event.target.value)}
            aria-label="Filter by species"
          >
            <option value="All">All species</option>
            {speciesOptions.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>

          <select
            className="field"
            value={careFilter}
            onChange={(event) => setCareFilter(event.target.value)}
            aria-label="Filter by care status"
          >
            <option value="All">All care statuses</option>
            {careOptions.map((status) => (
              <option key={status} value={status}>
                {status}
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
                <th>Animal ID</th>
                <th>Animal</th>
                <th>Species</th>
                <th>Location</th>
                <th>Care Status</th>
                <th>Registered</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAnimals.map((animal) => (
                <tr key={animal.id}>
                  <td>
                    <div className="animal-id">{animal.id}</div>
                  </td>

                  <td>
                    <div className="animal-name">{animal.name}</div>
                    <div className="subtext">
                      {animal.age} · {animal.gender}
                    </div>
                  </td>

                  <td>{animal.species}</td>
                  <td>{animal.location}</td>

                  <td>
                    <span className={`badge ${careClass(animal.careStatus)}`}>
                      {animal.careStatus}
                    </span>
                  </td>

                  <td>{animal.registeredDate}</td>

                  <td>
                    <button
                      className="view-button"
                      onClick={() => setSelectedAnimal(animal)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAnimals.length === 0 && (
            <div className="empty">
              No animals match your search or filters.
            </div>
          )}
        </div>

        <div className="count">
          Showing {filteredAnimals.length} of {animals.length} animals
        </div>
      </section>

      <div className="notice">
        <strong>Prototype notice:</strong> These are illustrative animal
        profiles. Care status changes are temporary and are not saved to the
        backend.
      </div>

      {selectedAnimal && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedAnimal(null);
            }
          }}
        >
          <section className="modal" role="dialog" aria-modal="true">
            <header className="modal-header">
              <div>
                <h2>Animal Profile</h2>
                <p>{selectedAnimal.id}</p>
              </div>

              <button
                className="close"
                onClick={() => setSelectedAnimal(null)}
                aria-label="Close animal details"
              >
                ×
              </button>
            </header>

            <div className="modal-body">
              <div className="health-box">
                <strong>Health information:</strong> {selectedAnimal.health}
              </div>

              <div className="details">
                <div>
                  <div className="detail-label">Name</div>
                  <div className="detail-value">{selectedAnimal.name}</div>
                </div>

                <div>
                  <div className="detail-label">Species</div>
                  <div className="detail-value">{selectedAnimal.species}</div>
                </div>

                <div>
                  <div className="detail-label">Age</div>
                  <div className="detail-value">{selectedAnimal.age}</div>
                </div>

                <div>
                  <div className="detail-label">Gender</div>
                  <div className="detail-value">{selectedAnimal.gender}</div>
                </div>

                <div>
                  <div className="detail-label">Location</div>
                  <div className="detail-value">{selectedAnimal.location}</div>
                </div>

                <div>
                  <div className="detail-label">Registered Date</div>
                  <div className="detail-value">
                    {selectedAnimal.registeredDate}
                  </div>
                </div>
              </div>

              <div className="editor">
                <label htmlFor="animal-care-status">Update care status</label>
                <select
                  id="animal-care-status"
                  className="field"
                  value={selectedAnimal.careStatus}
                  onChange={(event) =>
                    updateCareStatus(
                      selectedAnimal.id,
                      event.target.value as CareStatus
                    )
                  }
                >
                  {careOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <footer className="modal-footer">
              <button
                className="done"
                onClick={() => setSelectedAnimal(null)}
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