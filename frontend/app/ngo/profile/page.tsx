"use client";

import { useState } from "react";
import Link from "next/link";

type OrganizationProfile = {
  organizationName: string;
  registrationNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  serviceArea: string;
  description: string;
};

const initialProfile: OrganizationProfile = {
  organizationName: "PawTrace Animal Rescue NGO",
  registrationNumber: "NGO-DEMO-001",
  contactPerson: "NGO Coordinator",
  email: "contact@pawtrace-demo.org",
  phone: "+91 98765 43210",
  address: "12 Animal Care Road",
  city: "Chennai, Tamil Nadu",
  serviceArea: "Chennai and surrounding areas",
  description:
    "An animal welfare organization focused on rescue coordination, medical care, rehabilitation, and responsible adoption.",
};

export default function OrganizationProfilePage() {
  const [profile, setProfile] =
    useState<OrganizationProfile>(initialProfile);

  const [form, setForm] =
    useState<OrganizationProfile>(initialProfile);

  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setProfile({ ...form });
    setEditing(false);

    setMessage(
      "Profile updated in this local preview. Changes are not saved to the backend."
    );
  }

  function handleCancel() {
    setForm({ ...profile });
    setEditing(false);
    setMessage("");
  }

  function handleEdit() {
    setForm({ ...profile });
    setEditing(true);
    setMessage("");
  }

  return (
    <main className="ngo-page">
      <div className="ngo-page-header">
        <div>
          <p className="ngo-eyebrow">ORGANIZATION SETTINGS</p>
          <h1>Organization Profile</h1>
          <p className="ngo-page-description">
            View and manage your organization information and contact details.
          </p>
        </div>

        <span className="ngo-demo-label">
          Prototype · Sample data
        </span>
      </div>

      <section className="ngo-profile-banner">
        <div className="ngo-profile-avatar" aria-hidden="true">
          🐾
        </div>

        <div className="ngo-profile-banner-info">
          <span className="ngo-profile-label">
            NGO ORGANIZATION
          </span>
          <h2>{profile.organizationName}</h2>
          <p>{profile.serviceArea}</p>
        </div>

        <span className="ngo-profile-status">
          Demo profile
        </span>
      </section>

      <div className="ngo-profile-layout">
        <section className="ngo-profile-card">
          <div className="ngo-profile-card-heading">
            <div>
              <h2>Organization Information</h2>
              <p>
                Basic information about your animal welfare organization.
              </p>
            </div>

            {!editing && (
              <button
                type="button"
                className="ngo-profile-button"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form
              className="ngo-profile-form"
              onSubmit={handleSave}
            >
              <label>
                <span>Organization Name</span>
                <input
                  type="text"
                  name="organizationName"
                  value={form.organizationName}
                  onChange={handleChange}
                  maxLength={120}
                  required
                />
              </label>

              <label>
                <span>Registration Number</span>
                <input
                  type="text"
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  maxLength={80}
                  required
                />
              </label>

              <label>
                <span>Contact Person</span>
                <input
                  type="text"
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </label>

              <label>
                <span>Email Address</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  maxLength={150}
                  required
                />
              </label>

              <label>
                <span>Phone Number</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={30}
                  required
                />
              </label>

              <label>
                <span>Street Address</span>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  maxLength={180}
                  required
                />
              </label>

              <label>
                <span>City and State</span>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  maxLength={120}
                  required
                />
              </label>

              <label>
                <span>Service Area</span>
                <input
                  type="text"
                  name="serviceArea"
                  value={form.serviceArea}
                  onChange={handleChange}
                  maxLength={180}
                  required
                />
              </label>

              <label className="ngo-profile-full-width">
                <span>Organization Description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  maxLength={1000}
                  required
                />
              </label>

              <div className="ngo-profile-form-actions ngo-profile-full-width">
                <button
                  type="button"
                  className="ngo-profile-button ngo-profile-button-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="ngo-profile-button ngo-profile-button-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="ngo-profile-details">
              <div className="ngo-profile-detail">
                <span>Registration Number</span>
                <strong>{profile.registrationNumber}</strong>
              </div>

              <div className="ngo-profile-detail">
                <span>Contact Person</span>
                <strong>{profile.contactPerson}</strong>
              </div>

              <div className="ngo-profile-detail">
                <span>Email Address</span>
                <strong>{profile.email}</strong>
              </div>

              <div className="ngo-profile-detail">
                <span>Phone Number</span>
                <strong>{profile.phone}</strong>
              </div>

              <div className="ngo-profile-detail">
                <span>Street Address</span>
                <strong>{profile.address}</strong>
              </div>

              <div className="ngo-profile-detail">
                <span>City and State</span>
                <strong>{profile.city}</strong>
              </div>

              <div className="ngo-profile-detail ngo-profile-full-width">
                <span>Service Area</span>
                <strong>{profile.serviceArea}</strong>
              </div>

              <div className="ngo-profile-detail ngo-profile-full-width">
                <span>About the Organization</span>
                <p>{profile.description}</p>
              </div>
            </div>
          )}

          {message && (
            <p className="ngo-profile-message" role="status">
              {message}
            </p>
          )}
        </section>

        <aside className="ngo-profile-side">
          <section className="ngo-profile-card">
            <h2>Profile Checklist</h2>

            <p className="ngo-profile-side-description">
              Information displayed in this prototype.
            </p>

            <div className="ngo-profile-checklist-item">
              <span className="ngo-profile-check-icon" aria-hidden="true">
                ✓
              </span>
              <span>
                <strong>Organization details</strong>
                <small>Name and registration</small>
              </span>
            </div>

            <div className="ngo-profile-checklist-item">
              <span className="ngo-profile-check-icon" aria-hidden="true">
                ✓
              </span>
              <span>
                <strong>Contact information</strong>
                <small>Email and phone</small>
              </span>
            </div>

            <div className="ngo-profile-checklist-item">
              <span className="ngo-profile-check-icon" aria-hidden="true">
                ✓
              </span>
              <span>
                <strong>Service coverage</strong>
                <small>Location and service area</small>
              </span>
            </div>

            <p className="ngo-profile-side-note">
              This checklist is illustrative. It does not verify official
              registration or confirm that the organization has been approved.
            </p>
          </section>

          <section className="ngo-profile-help">
            <h3>Need to update organization details?</h3>
            <p>
              Select Edit Profile, update the fields, and save your changes.
              This preview uses local page state and does not save information
              to the backend.
            </p>
          </section>
        </aside>
      </div>

      <div className="ngo-profile-back">
        <Link href="/ngo">
          ← Back to NGO Overview
        </Link>
      </div>
    </main>
  );
}