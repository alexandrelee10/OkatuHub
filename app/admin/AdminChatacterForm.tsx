// app/admin/AdminCharacterForm.tsx
"use client";

import { FormEvent, useState } from "react";
import ImageUploadDropzone from "@/app/components/ImageUploadDropzone";

const AdminCharacterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // NEW: store uploaded image URL
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name")?.toString() || "",
      role: formData.get("role")?.toString() || "",
      // 👇 use the URL from drag & drop, not from a text input
      image: imageUrl,
      desc: formData.get("desc")?.toString() || "",
      stats: formData.get("stats")?.toString() || "",
      abilities: formData.get("abilities")?.toString() || "",
      strength: formData.get("strength")?.toString() || "",
      weakness: formData.get("weakness")?.toString() || "",
    };

    try {
      const res = await fetch("/api/admin/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create character");
        return;
      }

      setMessage(`Character "${data.character.name}" created!`);
      (e.target as HTMLFormElement).reset();
      setImageUrl(""); // clear uploaded image for next character
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 text-white max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Add New Character</h2>
      <p className="text-xs text-zinc-400 mb-4">
        Fill this out to add a character to your database.
      </p>

      <form className="space-y-4 justify-center" onSubmit={handleSubmit}>
        {/* Basic info */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs mb-1" htmlFor="name">
              Name *
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Ichigo Kurosaki"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs mb-1" htmlFor="role">
              Role *
            </label>
            <input
              id="role"
              name="role"
              required
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Main Protagonist"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs mb-1" htmlFor="anime">
              Anime *
            </label>
            <input
              id="anime"
              name="anime"
              required
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Bleach"
            />
          </div>
        </div>
        {/* Image drag and drop*/}
        <ImageUploadDropzone
          label="Character image"
          onUploaded={(url) => setImageUrl(url)}
        />

        {imageUrl && (
          <p className="text-[11px] text-zinc-400">
            Saved image path:{" "}
            <span className="text-red-300">{imageUrl}</span>
          </p>
        )}

        {/* Stats / abilities */}
        <div className="flex gap-4">
          <div className="w-28">
            <label className="block text-xs mb-1" htmlFor="stats">
              Power Level
            </label>
            <input
              id="stats"
              name="stats"
              type="number"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="90"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs mb-1" htmlFor="abilities">
              Abilities
            </label>
            <input
              id="abilities"
              name="abilities"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Getsuga Tenshou, Bankai..."
            />
          </div>
        </div>

        {/* Strength / weakness */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs mb-1" htmlFor="strength">
              Strength
            </label>
            <input
              id="strength"
              name="strength"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="High combat instinct"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs mb-1" htmlFor="weakness">
              Weakness
            </label>
            <input
              id="weakness"
              name="weakness"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Reckless in battle"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs mb-1" htmlFor="desc">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            rows={3}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 resize-none"
            placeholder="Short character summary..."
          />
        </div>

        {/* Messages */}
        {error && (
          <p className="text-xs text-red-400 text-center">{error}</p>
        )}
        {message && (
          <p className="text-xs text-emerald-400 text-center">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 rounded-lg bg-red-700 hover:bg-red-600 disabled:opacity-60 py-2 text-sm font-medium transition-colors"
        >
          {isSubmitting ? "Saving..." : "Add Character"}
        </button>
      </form>
    </div>
  );
};

export default AdminCharacterForm;
