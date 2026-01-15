// app/components/SettingsForm.tsx
"use client";

import { useState, FormEvent } from "react";

interface SettingsFormProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
}

export default function SettingsForm({ user }: SettingsFormProps) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [adminCode, setAdminCode] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
          adminCode: adminCode || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update settings.");
        return;
      }

      setSuccess("Settings updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setAdminCode("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6"
    >
      {/* Basic profile */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm mb-1" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>

      {/* Password change */}
      <div className="border-t border-zinc-800 pt-4 space-y-3">
        <h2 className="text-sm font-semibold text-zinc-200">
          Change password
        </h2>
        <p className="text-xs text-zinc-500">
          To set a new password, enter your current password and a new one.
        </p>

        <div>
          <label className="block text-sm mb-1" htmlFor="currentPassword">
            Current password
          </label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" htmlFor="newPassword">
            New password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Admin code */}
      <div className="border-t border-zinc-800 pt-4 space-y-2">
        <h2 className="text-sm font-semibold text-zinc-200">
          Admin access (optional)
        </h2>
        <p className="text-xs text-zinc-500">
          Enter the admin invite code to become an admin. Keep this secret.
        </p>
        <input
          type="password"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="Admin invite code"
        />
      </div>

      {/* Messages */}
      {error && (
        <p className="text-sm text-red-400 bg-red-950/40 border border-red-800 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-green-400 bg-green-950/40 border border-green-800 rounded-lg px-3 py-2">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-red-700 hover:bg-red-600 disabled:opacity-60 py-2 text-sm font-medium transition-colors"
      >
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
