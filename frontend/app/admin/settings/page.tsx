"use client";

import { useState } from "react";

type SettingsState = {
  platformName: string;
  contactEmail: string;
  timezone: string;
  emailNotifications: boolean;
  caseNotifications: boolean;
  animalNotifications: boolean;
  securityNotifications: boolean;
  sessionTimeout: string;
  twoFactorPreference: boolean;
  defaultPriority: string;
  followUpDays: string;
};

const initialSettings: SettingsState = {
  platformName: "PawTrace",
  contactEmail: "admin@pawtrace.example",
  timezone: "Asia/Kolkata",
  emailNotifications: true,
  caseNotifications: true,
  animalNotifications: true,
  securityNotifications: true,
  sessionTimeout: "30",
  twoFactorPreference: false,
  defaultPriority: "Medium",
  followUpDays: "7",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    ...initialSettings,
  });
  const [savedSettings, setSavedSettings] = useState<SettingsState>({
    ...initialSettings,
  });
  const [notice, setNotice] = useState("");
  const [activeSection, setActiveSection] = useState("general");

  function updateSetting<K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) {
    setSettings((current) => ({ ...current, [key]: value }));
    setNotice("");
  }

  function saveSettings() {
    setSavedSettings({ ...settings });
    setNotice("Your settings have been saved for this session.");
  }

  function resetSettings() {
    setSettings({ ...savedSettings });
    setNotice("Unsaved changes have been discarded.");
  }

  function restoreDefaults() {
    setSettings({ ...initialSettings });
    setNotice("Default values restored. Select Save Changes to confirm.");
  }

  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(savedSettings);

  return (
    <main className="settings-page">
      <style jsx>{`
        .settings-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px;
          color: #203329;
        }

        .page-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 25px;
        }

        .page-heading h1 {
          margin: 0;
          font-size: 30px;
          font-weight: 750;
        }

        .page-heading p {
          margin-top: 8px;
          color: #748178;
          font-size: 14px;
        }

        .prototype-badge {
          padding: 8px 13px;
          border-radius: 20px;
          background: #e8f5ec;
          color: #267448;
          font-size: 12px;
          font-weight: 700;
        }

        .layout {
          display: grid;
          grid-template-columns: 230px minmax(0, 1fr);
          align-items: start;
          gap: 22px;
        }

        .navigation {
          position: sticky;
          top: 20px;
          padding: 10px;
          border: 1px solid #e2eae4;
          border-radius: 12px;
          background: white;
        }

        .nav-label {
          padding: 12px 10px 8px;
          color: #89938c;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .nav-button {
          display: block;
          width: 100%;
          margin-bottom: 4px;
          padding: 12px 10px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #58665d;
          font-size: 13px;
          text-align: left;
          cursor: pointer;
        }

        .nav-button:hover {
          background: #f3f8f4;
        }

        .nav-button.active {
          background: #e9f5ec;
          color: #267448;
          font-weight: 750;
        }

        .content {
          min-width: 0;
        }

        .settings-card {
          margin-bottom: 20px;
          overflow: hidden;
          border: 1px solid #e2eae4;
          border-radius: 12px;
          background: white;
        }

        .card-heading {
          padding: 22px 24px;
          border-bottom: 1px solid #edf1ee;
        }

        .card-heading h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 750;
        }

        .card-heading p {
          margin: 6px 0 0;
          color: #78847c;
          font-size: 13px;
          line-height: 1.6;
        }

        .card-body {
          padding: 24px;
        }

        .field-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px 18px;
        }

        .field-group {
          min-width: 0;
        }

        .field-group.full {
          grid-column: 1 / -1;
        }

        .field-group label {
          display: block;
          margin-bottom: 8px;
          color: #35483b;
          font-size: 13px;
          font-weight: 700;
        }

        .field-description {
          margin-top: 6px;
          color: #89938c;
          font-size: 11px;
          line-height: 1.6;
        }

        .input,
        .select {
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          padding: 12px;
          border: 1px solid #dce5de;
          border-radius: 8px;
          background: white;
          color: #26372d;
          font-size: 13px;
          outline: none;
        }

        .input:focus,
        .select:focus {
          border-color: #328251;
          box-shadow: 0 0 0 3px #32825112;
        }

        .toggle-list {
          display: grid;
          gap: 0;
        }

        .toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 18px 0;
          border-bottom: 1px solid #edf1ee;
        }

        .toggle-row:first-child {
          padding-top: 0;
        }

        .toggle-row:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }

        .toggle-title {
          font-size: 13px;
          font-weight: 700;
        }

        .toggle-description {
          margin-top: 5px;
          color: #89938c;
          font-size: 12px;
          line-height: 1.5;
        }

        .toggle {
          position: relative;
          flex-shrink: 0;
          width: 44px;
          height: 25px;
        }

        .toggle input {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
        }

        .toggle-track {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: #d6ded8;
          cursor: pointer;
          transition: background 0.2s;
        }

        .toggle-track::after {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: white;
          content: "";
          transition: transform 0.2s;
          box-shadow: 0 1px 3px #0002;
        }

        .toggle input:checked + .toggle-track {
          background: #2f8750;
        }

        .toggle input:checked + .toggle-track::after {
          transform: translateX(19px);
        }

        .toggle input:focus-visible + .toggle-track {
          outline: 3px solid #32825155;
          outline-offset: 3px;
        }

        .notice {
          margin-bottom: 20px;
          padding: 13px 16px;
          border: 1px solid #d8e8dc;
          border-radius: 9px;
          background: #eff8f1;
          color: #286b41;
          font-size: 13px;
          line-height: 1.6;
        }

        .notice.warning {
          border-color: #f0e0b6;
          background: #fff9e9;
          color: #82621b;
        }

        .action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding: 18px 20px;
          border: 1px solid #e2eae4;
          border-radius: 12px;
          background: white;
        }

        .unsaved {
          color: #ad6b13;
          font-size: 12px;
          font-weight: 700;
        }

        .saved {
          color: #287448;
          font-size: 12px;
          font-weight: 700;
        }

        .action-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .button {
          padding: 11px 16px;
          border: 1px solid #dce5de;
          border-radius: 8px;
          background: white;
          color: #405247;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .button:hover {
          background: #f6f9f6;
        }

        .button.primary {
          border-color: #287448;
          background: #287448;
          color: white;
        }

        .button.primary:hover {
          background: #205f3a;
        }

        .button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .footer-note {
          margin-top: 18px;
          color: #89938c;
          font-size: 11px;
          line-height: 1.7;
        }

        @media (max-width: 850px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .navigation {
            position: static;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .nav-label {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 560px) {
          .settings-page {
            padding: 18px 12px;
          }

          .page-heading h1 {
            font-size: 25px;
          }

          .field-grid {
            grid-template-columns: 1fr;
          }

          .field-group.full {
            grid-column: auto;
          }

          .card-body {
            padding: 18px;
          }

          .action-bar {
            align-items: flex-start;
          }

          .action-buttons {
            width: 100%;
          }

          .action-buttons .button {
            flex: 1;
          }
        }
      `}</style>

      <header className="page-heading">
        <div>
          <h1>Admin Settings</h1>
          <p>Manage platform preferences and administrative options.</p>
        </div>
        <span className="prototype-badge">Admin · Prototype Mode</span>
      </header>

      <div className="layout">
        <nav className="navigation" aria-label="Settings sections">
          <div className="nav-label">Settings Menu</div>

          <button
            className={`nav-button ${activeSection === "general" ? "active" : ""}`}
            onClick={() => setActiveSection("general")}
          >
            ⚙️ General Settings
          </button>

          <button
            className={`nav-button ${activeSection === "notifications" ? "active" : ""}`}
            onClick={() => setActiveSection("notifications")}
          >
            🔔 Notifications
          </button>

          <button
            className={`nav-button ${activeSection === "security" ? "active" : ""}`}
            onClick={() => setActiveSection("security")}
          >
            🔐 Security
          </button>

          <button
            className={`nav-button ${activeSection === "welfare" ? "active" : ""}`}
            onClick={() => setActiveSection("welfare")}
          >
            🐾 Animal Welfare
          </button>
        </nav>

        <div className="content">
          {notice && (
            <div className="notice" role="status">
              {notice}
            </div>
          )}

          {activeSection === "general" && (
            <section className="settings-card">
              <header className="card-heading">
                <h2>General Settings</h2>
                <p>Configure the basic identity and regional preferences of the platform.</p>
              </header>

              <div className="card-body">
                <div className="field-grid">
                  <div className="field-group">
                    <label htmlFor="platform-name">Platform Name</label>
                    <input
                      id="platform-name"
                      className="input"
                      value={settings.platformName}
                      onChange={(event) =>
                        updateSetting("platformName", event.target.value)
                      }
                    />
                    <div className="field-description">
                      Name displayed in administrative settings.
                    </div>
                  </div>

                  <div className="field-group">
                    <label htmlFor="contact-email">Contact Email</label>
                    <input
                      id="contact-email"
                      className="input"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(event) =>
                        updateSetting("contactEmail", event.target.value)
                      }
                    />
                    <div className="field-description">
                      Illustrative contact address for this prototype.
                    </div>
                  </div>

                  <div className="field-group full">
                    <label htmlFor="timezone">Timezone</label>
                    <select
                      id="timezone"
                      className="select"
                      value={settings.timezone}
                      onChange={(event) =>
                        updateSetting("timezone", event.target.value)
                      }
                    >
                      <option value="Asia/Kolkata">
                        India Standard Time (Asia/Kolkata)
                      </option>
                      <option value="UTC">Coordinated Universal Time (UTC)</option>
                      <option value="Asia/Singapore">Singapore (Asia/Singapore)</option>
                      <option value="Europe/London">London (Europe/London)</option>
                      <option value="America/New_York">
                        New York (America/New_York)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === "notifications" && (
            <section className="settings-card">
              <header className="card-heading">
                <h2>Notification Preferences</h2>
                <p>Choose which notification categories are enabled in this prototype.</p>
              </header>

              <div className="card-body">
                <div className="toggle-list">
                  {(
                    [
                      [
                        "emailNotifications",
                        "Email Notifications",
                        "General email notification preference.",
                      ],
                      [
                        "caseNotifications",
                        "Rescue Case Updates",
                        "Updates related to case reviews and progress.",
                      ],
                      [
                        "animalNotifications",
                        "Animal Care Alerts",
                        "Alerts about animal care and health records.",
                      ],
                      [
                        "securityNotifications",
                        "Security Alerts",
                        "Illustrative alerts for account and security events.",
                      ],
                    ] as const
                  ).map(([key, title, description]) => (
                    <div className="toggle-row" key={key}>
                      <div>
                        <div className="toggle-title">{title}</div>
                        <div className="toggle-description">{description}</div>
                      </div>

                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={settings[key]}
                          onChange={(event) =>
                            updateSetting(key, event.target.checked)
                          }
                          aria-label={title}
                        />
                        <span className="toggle-track" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeSection === "security" && (
            <>
              <section className="settings-card">
                <header className="card-heading">
                  <h2>Security Preferences</h2>
                  <p>Review illustrative security preferences for the admin interface.</p>
                </header>

                <div className="card-body">
                  <div className="field-grid">
                    <div className="field-group">
                      <label htmlFor="session-timeout">Session Timeout</label>
                      <select
                        id="session-timeout"
                        className="select"
                        value={settings.sessionTimeout}
                        onChange={(event) =>
                          updateSetting("sessionTimeout", event.target.value)
                        }
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">60 minutes</option>
                        <option value="120">120 minutes</option>
                      </select>
                      <div className="field-description">
                        Preference only; it does not change actual session behavior.
                      </div>
                    </div>

                    <div className="field-group">
                      <label>Two-Factor Authentication Preference</label>

                      <div className="toggle-row">
                        <div>
                          <div className="toggle-title">
                            {settings.twoFactorPreference ? "Enabled" : "Disabled"}
                          </div>
                          <div className="toggle-description">
                            Visual preference only. No authentication settings are changed.
                          </div>
                        </div>

                        <label className="toggle">
                          <input
                            type="checkbox"
                            checked={settings.twoFactorPreference}
                            onChange={(event) =>
                              updateSetting(
                                "twoFactorPreference",
                                event.target.checked
                              )
                            }
                            aria-label="Two-factor authentication preference"
                          />
                          <span className="toggle-track" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="notice warning">
                <strong>Security note:</strong> These controls demonstrate the
                interface only. They do not enable two-factor authentication,
                change login sessions, or enforce security policies.
              </div>
            </>
          )}

          {activeSection === "welfare" && (
            <section className="settings-card">
              <header className="card-heading">
                <h2>Animal Welfare Preferences</h2>
                <p>Set illustrative defaults for rescue case follow-up workflows.</p>
              </header>

              <div className="card-body">
                <div className="field-grid">
                  <div className="field-group">
                    <label htmlFor="default-priority">Default Case Priority</label>
                    <select
                      id="default-priority"
                      className="select"
                      value={settings.defaultPriority}
                      onChange={(event) =>
                        updateSetting("defaultPriority", event.target.value)
                      }
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label htmlFor="follow-up-days">Follow-up Interval</label>
                    <select
                      id="follow-up-days"
                      className="select"
                      value={settings.followUpDays}
                      onChange={(event) =>
                        updateSetting("followUpDays", event.target.value)
                      }
                    >
                      <option value="1">Every 1 day</option>
                      <option value="3">Every 3 days</option>
                      <option value="7">Every 7 days</option>
                      <option value="14">Every 14 days</option>
                      <option value="30">Every 30 days</option>
                    </select>
                    <div className="field-description">
                      Illustrative default interval for follow-up reminders.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="action-bar">
            <span className={hasChanges ? "unsaved" : "saved"}>
              {hasChanges ? "● Unsaved changes" : "✓ No unsaved changes"}
            </span>

            <div className="action-buttons">
              <button className="button" onClick={resetSettings}>
                Discard Changes
              </button>

              <button className="button" onClick={restoreDefaults}>
                Restore Defaults
              </button>

              <button className="button primary" onClick={saveSettings}>
                Save Changes
              </button>
            </div>
          </div>

          <p className="footer-note">
            Prototype mode: settings are held in page memory for demonstration.
            They are not persisted to a database and may reset when the page is
            refreshed. Security-related options are visual preferences only.
          </p>
        </div>
      </div>
    </main>
  );
}