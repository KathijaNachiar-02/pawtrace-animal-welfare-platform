"use client";

import { useMemo, useState } from "react";

type UserStatus = "Active" | "Pending" | "Suspended";

type PlatformUser = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "NGO Member" | "Volunteer" | "Public User";
  location: string;
  joined: string;
  status: UserStatus;
};

const initialUsers: PlatformUser[] = [
  {
    id: "USR-001",
    name: "Arun Kumar",
    email: "arun@example.com",
    role: "Admin",
    location: "Chennai",
    joined: "18 Oct 2026",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "NGO Member",
    location: "Bengaluru",
    joined: "16 Oct 2026",
    status: "Active",
  },
  {
    id: "USR-003",
    name: "Rahul Verma",
    email: "rahul@example.com",
    role: "Volunteer",
    location: "Hyderabad",
    joined: "15 Oct 2026",
    status: "Pending",
  },
  {
    id: "USR-004",
    name: "Meera Nair",
    email: "meera@example.com",
    role: "Public User",
    location: "Mumbai",
    joined: "12 Oct 2026",
    status: "Active",
  },
  {
    id: "USR-005",
    name: "Karthik Raj",
    email: "karthik@example.com",
    role: "Volunteer",
    location: "Coimbatore",
    joined: "10 Oct 2026",
    status: "Suspended",
  },
  {
    id: "USR-006",
    name: "Ananya Das",
    email: "ananya@example.com",
    role: "NGO Member",
    location: "Pune",
    joined: "08 Oct 2026",
    status: "Active",
  },
  {
    id: "USR-007",
    name: "Vikram Singh",
    email: "vikram@example.com",
    role: "Public User",
    location: "Delhi",
    joined: "06 Oct 2026",
    status: "Pending",
  },
  {
    id: "USR-008",
    name: "Divya Menon",
    email: "divya@example.com",
    role: "Volunteer",
    location: "Kochi",
    joined: "04 Oct 2026",
    status: "Active",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<PlatformUser[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null);
  const [notice, setNotice] = useState("");

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      const matchesRole = roleFilter === "All" || user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, search, statusFilter, roleFilter]);

  const activeCount = users.filter((user) => user.status === "Active").length;
  const pendingCount = users.filter((user) => user.status === "Pending").length;
  const suspendedCount = users.filter(
    (user) => user.status === "Suspended",
  ).length;

  function updateUserStatus(id: string, status: UserStatus) {
    const user = users.find((item) => item.id === id);

    if (!user) return;

    setUsers((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    );

    setSelectedUser((current) =>
      current?.id === id ? { ...current, status } : current,
    );

    setNotice(
      `${user.name} marked as ${status.toLowerCase()}. This is a temporary demo change.`,
    );
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setRoleFilter("All");
    setNotice("");
  }

  return (
    <main className="admin-users-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-eyebrow">PLATFORM MANAGEMENT / USERS</p>
          <h1>User Management</h1>
          <p className="admin-page-description">
            View platform accounts, review user roles, and manage account
            statuses.
          </p>
        </div>

        <span className="admin-demo-label">Prototype · Sample data</span>
      </div>

      {notice && (
        <div className="users-notice" role="status">
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

      <section className="users-stats-grid" aria-label="User statistics">
        <article className="users-stat-card">
          <div className="users-stat-heading">
            <span>Total Users</span>
            <span aria-hidden="true">👥</span>
          </div>
          <strong>{users.length}</strong>
          <small>Sample platform accounts</small>
        </article>

        <article className="users-stat-card">
          <div className="users-stat-heading">
            <span>Active Users</span>
            <span aria-hidden="true">✓</span>
          </div>
          <strong>{activeCount}</strong>
          <small>Active sample accounts</small>
        </article>

        <article className="users-stat-card">
          <div className="users-stat-heading">
            <span>Pending</span>
            <span aria-hidden="true">◷</span>
          </div>
          <strong>{pendingCount}</strong>
          <small>Awaiting activation</small>
        </article>

        <article className="users-stat-card">
          <div className="users-stat-heading">
            <span>Suspended</span>
            <span aria-hidden="true">⊘</span>
          </div>
          <strong>{suspendedCount}</strong>
          <small>Suspended sample accounts</small>
        </article>
      </section>

      <section className="admin-panel users-management-panel">
        <div className="users-panel-header">
          <div>
            <h2>Platform Users</h2>
            <p>Search accounts, filter by role, and inspect user details.</p>
          </div>

          <span className="users-result-count">
            {filteredUsers.length} of {users.length} users
          </span>
        </div>

        <div className="users-filter-bar">
          <div className="users-search-field">
            <label htmlFor="users-search">Search users</label>
            <input
              id="users-search"
              type="search"
              placeholder="Search name, ID, email, or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="users-filter-field">
            <label htmlFor="users-status">Account status</label>
            <select
              id="users-status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div className="users-filter-field">
            <label htmlFor="users-role">User role</label>
            <select
              id="users-role"
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
            >
              <option value="All">All roles</option>
              <option value="Admin">Admin</option>
              <option value="NGO Member">NGO Member</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Public User">Public User</option>
            </select>
          </div>

          <button
            className="users-reset-button"
            type="button"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>

        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Location</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="users-identity-cell">
                      <span className="users-avatar" aria-hidden="true">
                        {user.name.charAt(0)}
                      </span>
                      <span>
                        <strong>{user.name}</strong>
                        <small>{user.id}</small>
                        <small>{user.email}</small>
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="users-role-badge">{user.role}</span>
                  </td>

                  <td>{user.location}</td>
                  <td>{user.joined}</td>

                  <td>
                    <span
                      className={`users-status-badge users-status-${user.status.toLowerCase()}`}
                    >
                      <span aria-hidden="true">●</span>
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="users-review-button"
                      type="button"
                      onClick={() => setSelectedUser(user)}
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="users-empty-state">
                    <span aria-hidden="true">🔎</span>
                    <strong>No users found</strong>
                    <p>Try another search term, status, or role.</p>
                    <button
                      type="button"
                      className="users-review-button"
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

        <div className="users-table-footer">
          <span>
            Showing {filteredUsers.length} user
            {filteredUsers.length === 1 ? "" : "s"}
          </span>
          <span>Prototype records only</span>
        </div>
      </section>

      {selectedUser && (
        <div
          className="users-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedUser(null);
            }
          }}
        >
          <section
            className="users-review-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="users-review-title"
          >
            <div className="users-modal-header">
              <div>
                <p className="admin-eyebrow">ACCOUNT REVIEW</p>
                <h2 id="users-review-title">User details</h2>
              </div>

              <button
                type="button"
                className="users-modal-close"
                onClick={() => setSelectedUser(null)}
                aria-label="Close user details"
              >
                ×
              </button>
            </div>

            <div className="users-modal-identity">
              <span className="users-modal-avatar" aria-hidden="true">
                {selectedUser.name.charAt(0)}
              </span>
              <div>
                <h3>{selectedUser.name}</h3>
                <p>{selectedUser.id}</p>
              </div>
            </div>

            <div className="users-detail-list">
              <div>
                <span>Email address</span>
                <strong>{selectedUser.email}</strong>
              </div>
              <div>
                <span>User role</span>
                <strong>{selectedUser.role}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>{selectedUser.location}</strong>
              </div>
              <div>
                <span>Joined</span>
                <strong>{selectedUser.joined}</strong>
              </div>
              <div>
                <span>Account status</span>
                <strong>{selectedUser.status}</strong>
              </div>
            </div>

            <div className="users-prototype-warning">
              These are illustrative records. Account status changes are
              temporary and do not affect real accounts or backend data.
            </div>

            <div className="users-modal-actions">
              <button
                type="button"
                className="users-action-secondary"
                onClick={() =>
                  updateUserStatus(selectedUser.id, "Suspended")
                }
                disabled={selectedUser.status === "Suspended"}
              >
                Suspend account
              </button>

              <button
                type="button"
                className="users-action-primary"
                onClick={() => updateUserStatus(selectedUser.id, "Active")}
                disabled={selectedUser.status === "Active"}
              >
                Activate account
              </button>
            </div>

            <button
              type="button"
              className="users-done-button"
              onClick={() => setSelectedUser(null)}
            >
              Done
            </button>
          </section>
        </div>
      )}

      <style jsx>{`
        .admin-users-page {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .admin-users-page *,
        .admin-users-page *::before,
        .admin-users-page *::after {
          box-sizing: border-box;
        }

        .admin-users-page .users-notice {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          padding: 14px 18px;
          border: 1px solid #b8e0c5;
          border-radius: 12px;
          background: #effaf2;
          color: #23673b;
          font-size: 13px;
        }

        .admin-users-page .users-notice button {
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
          font-size: 23px;
        }

        .admin-users-page .users-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          width: 100%;
          margin-bottom: 28px;
        }

        .admin-users-page .users-stat-card {
          min-width: 0;
          padding: 23px;
          border: 1px solid #e5ebe6;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 18px rgba(30, 61, 41, 0.045);
        }

        .admin-users-page .users-stat-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 20px;
          color: #68786c;
          font-size: 13px;
          font-weight: 600;
        }

        .admin-users-page .users-stat-heading span:last-child {
          display: grid;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          place-items: center;
          border-radius: 12px;
          background: #edf6ee;
          color: #347449;
          font-size: 20px;
        }

        .admin-users-page .users-stat-card > strong {
          display: block;
          margin-bottom: 9px;
          color: #243e2d;
          font-size: 32px;
        }

        .admin-users-page .users-stat-card > small {
          color: #879289;
          font-size: 11px;
        }

        .admin-users-page .users-management-panel {
          width: 100%;
          min-width: 0;
          overflow: hidden;
          border: 1px solid #e6ebe7;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 20px rgba(30, 61, 41, 0.035);
        }

        .admin-users-page .users-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 25px 26px;
          border-bottom: 1px solid #edf0ed;
        }

        .admin-users-page .users-panel-header h2 {
          margin: 0 0 8px;
          color: #253e2e;
          font-size: 19px;
        }

        .admin-users-page .users-panel-header p {
          margin: 0;
          color: #7a867d;
          font-size: 13px;
          line-height: 1.6;
        }

        .admin-users-page .users-result-count {
          flex-shrink: 0;
          padding: 9px 13px;
          border: 1px solid #dceade;
          border-radius: 24px;
          background: #f0f7f1;
          color: #347348;
          font-size: 12px;
          font-weight: 650;
          white-space: nowrap;
        }

        .admin-users-page .users-filter-bar {
          display: grid;
          grid-template-columns: minmax(180px, 1fr) minmax(145px, 185px) minmax(145px, 185px) auto;
          align-items: end;
          gap: 15px;
          padding: 22px 26px;
          border-bottom: 1px solid #edf0ed;
          background: #fafcfb;
        }

        .admin-users-page .users-search-field,
        .admin-users-page .users-filter-field {
          display: flex;
          flex-direction: column;
          min-width: 0;
          gap: 9px;
        }

        .admin-users-page .users-search-field label,
        .admin-users-page .users-filter-field label {
          color: #435448;
          font-size: 12px;
          font-weight: 700;
        }

        .admin-users-page .users-search-field input,
        .admin-users-page .users-filter-field select {
          width: 100%;
          min-width: 0;
          height: 44px;
          padding: 0 12px;
          border: 1px solid #dce5de;
          border-radius: 9px;
          outline: none;
          background: #fff;
          color: #2b4031;
          font: inherit;
          font-size: 12px;
        }

        .admin-users-page .users-search-field input:focus,
        .admin-users-page .users-filter-field select:focus {
          border-color: #4d9061;
          box-shadow: 0 0 0 3px rgba(77, 144, 97, 0.12);
        }

        .admin-users-page .users-reset-button {
          min-height: 44px;
          padding: 0 15px;
          border: 1px solid #d8e3da;
          border-radius: 9px;
          background: #fff;
          color: #415548;
          font-size: 12px;
          font-weight: 650;
          white-space: nowrap;
          cursor: pointer;
        }

        .admin-users-page .users-reset-button:hover {
          background: #f0f7f1;
        }

        .admin-users-page .users-table-wrap {
          width: 100%;
          min-width: 0;
          overflow-x: auto;
        }

        .admin-users-page .users-table {
          width: 100%;
          min-width: 800px;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-users-page .users-table th {
          padding: 16px 18px;
          border-bottom: 1px solid #e9efea;
          background: #f7faf7;
          color: #77837a;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .admin-users-page .users-table td {
          padding: 17px 18px;
          border-bottom: 1px solid #edf1ed;
          color: #536157;
          font-size: 12px;
          vertical-align: middle;
        }

        .admin-users-page .users-table tbody tr:hover {
          background: #fbfdfb;
        }

        .admin-users-page .users-identity-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 220px;
        }

        .admin-users-page .users-identity-cell > span:last-child {
          display: flex;
          flex-direction: column;
          min-width: 0;
          gap: 3px;
        }

        .admin-users-page .users-identity-cell strong {
          color: #2b4031;
          font-size: 12px;
          overflow-wrap: anywhere;
        }

        .admin-users-page .users-identity-cell small {
          color: #89948c;
          font-size: 11px;
          overflow-wrap: anywhere;
        }

        .admin-users-page .users-avatar,
        .admin-users-page .users-modal-avatar {
          display: grid;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #dcebdd;
          background: #edf6ee;
          color: #347449;
          font-weight: 750;
        }

        .admin-users-page .users-avatar {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          font-size: 16px;
        }

        .admin-users-page .users-role-badge {
          display: inline-flex;
          align-items: center;
          padding: 7px 10px;
          border: 1px solid #e0e8e1;
          border-radius: 20px;
          background: #f5f8f5;
          color: #4c6252;
          font-size: 11px;
          font-weight: 650;
          white-space: nowrap;
        }

        .admin-users-page .users-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 10px;
          border: 1px solid transparent;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .admin-users-page .users-status-active {
          border-color: #cce9d4;
          background: #eaf8ee;
          color: #287445;
        }

        .admin-users-page .users-status-pending {
          border-color: #f3e2b7;
          background: #fff7e6;
          color: #99650b;
        }

        .admin-users-page .users-status-suspended {
          border-color: #f0d2cf;
          background: #fff0ef;
          color: #b13d36;
        }

        .admin-users-page .users-review-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 35px;
          padding: 0 12px;
          border: 1px solid #d5e6d8;
          border-radius: 8px;
          background: #f1f8f2;
          color: #347448;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
        }

        .admin-users-page .users-review-button:hover {
          background: #e4f2e6;
        }

        .admin-users-page .users-empty-state {
          padding: 45px 20px;
          color: #6e7c71;
          text-align: center;
          white-space: normal;
        }

        .admin-users-page .users-empty-state > span,
        .admin-users-page .users-empty-state > strong {
          display: block;
        }

        .admin-users-page .users-empty-state > span {
          margin-bottom: 12px;
          font-size: 28px;
        }

        .admin-users-page .users-empty-state > strong {
          color: #304638;
          font-size: 16px;
        }

        .admin-users-page .users-empty-state p {
          margin: 8px 0 16px;
          color: #849087;
          font-size: 13px;
        }

        .admin-users-page .users-table-footer {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 17px 25px;
          border-top: 1px solid #edf0ed;
          color: #879188;
          font-size: 11px;
        }

        .admin-users-page .users-modal-backdrop {
          position: fixed;
          z-index: 9999;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-y: auto;
          padding: 24px;
          background: rgba(20, 36, 25, 0.58);
          backdrop-filter: blur(3px);
        }

        .admin-users-page .users-review-modal {
          width: 100%;
          max-width: 560px;
          max-height: calc(100vh - 48px);
          overflow-y: auto;
          padding: 27px;
          border: 1px solid #e3eae4;
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
        }

        .admin-users-page .users-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          padding-bottom: 20px;
          border-bottom: 1px solid #edf0ed;
        }

        .admin-users-page .users-modal-header h2 {
          margin: 8px 0 0;
          color: #253e2e;
          font-size: 23px;
        }

        .admin-users-page .users-modal-close {
          display: grid;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          place-items: center;
          border: 0;
          border-radius: 9px;
          background: #f3f6f3;
          color: #536257;
          font-size: 25px;
          cursor: pointer;
        }

        .admin-users-page .users-modal-identity {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 22px 0;
        }

        .admin-users-page .users-modal-avatar {
          width: 54px;
          height: 54px;
          border-radius: 15px;
          font-size: 22px;
        }

        .admin-users-page .users-modal-identity h3 {
          margin: 0 0 5px;
          color: #2c4232;
          font-size: 17px;
          overflow-wrap: anywhere;
        }

        .admin-users-page .users-modal-identity p {
          margin: 0;
          color: #849087;
          font-size: 12px;
        }

        .admin-users-page .users-detail-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          padding: 20px 0;
          border-top: 1px solid #edf0ed;
          border-bottom: 1px solid #edf0ed;
        }

        .admin-users-page .users-detail-list > div {
          min-width: 0;
        }

        .admin-users-page .users-detail-list span {
          display: block;
          margin-bottom: 7px;
          color: #849087;
          font-size: 11px;
        }

        .admin-users-page .users-detail-list strong {
          display: block;
          color: #304638;
          font-size: 13px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .admin-users-page .users-prototype-warning {
          margin-top: 20px;
          padding: 14px 16px;
          border: 1px solid #f0e2c4;
          border-radius: 10px;
          background: #fff9ed;
          color: #79633b;
          font-size: 12px;
          line-height: 1.7;
        }

        .admin-users-page .users-modal-actions {
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }

        .admin-users-page .users-action-secondary,
        .admin-users-page .users-action-primary {
          min-height: 42px;
          padding: 0 15px;
          border: 1px solid transparent;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .admin-users-page .users-action-secondary {
          border-color: #f0d5d2;
          background: #fff4f3;
          color: #ad4038;
        }

        .admin-users-page .users-action-primary {
          background: #2f7445;
          color: #fff;
        }

        .admin-users-page .users-action-primary:disabled,
        .admin-users-page .users-action-secondary:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .admin-users-page .users-done-button {
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

        @media (max-width: 1200px) {
          .admin-users-page .users-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .admin-users-page .users-filter-bar {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .admin-users-page .users-reset-button {
            min-height: 44px;
          }
        }

        @media (max-width: 640px) {
          .admin-users-page .users-stats-grid {
            gap: 11px;
          }

          .admin-users-page .users-stat-card {
            padding: 15px;
          }

          .admin-users-page .users-stat-heading {
            align-items: flex-start;
            margin-bottom: 14px;
          }

          .admin-users-page .users-stat-heading span:last-child {
            width: 33px;
            height: 33px;
            font-size: 17px;
          }

          .admin-users-page .users-stat-card > strong {
            font-size: 27px;
          }

          .admin-users-page .users-panel-header {
            align-items: flex-start;
            flex-direction: column;
            padding: 20px 17px;
          }

          .admin-users-page .users-filter-bar {
            grid-template-columns: minmax(0, 1fr);
            padding: 18px 17px;
          }

          .admin-users-page .users-reset-button {
            width: 100%;
          }

          .admin-users-page .users-table-footer {
            flex-direction: column;
            padding: 15px 17px;
          }

          .admin-users-page .users-modal-backdrop {
            align-items: flex-start;
            padding: 14px;
          }

          .admin-users-page .users-review-modal {
            max-height: calc(100vh - 28px);
            margin: auto 0;
            padding: 20px;
          }

          .admin-users-page .users-detail-list {
            grid-template-columns: minmax(0, 1fr);
            gap: 15px;
          }

          .admin-users-page .users-modal-actions {
            flex-direction: column;
          }

          .admin-users-page .users-action-secondary,
          .admin-users-page .users-action-primary {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
