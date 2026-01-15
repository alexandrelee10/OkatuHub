"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";

interface ImageUploadDropzoneProps {
  label?: string;
  onUploaded: (url: string) => void;  // tells parent “here’s your image URL”
}

export default function ImageUploadDropzone({
  label = "Upload image",
  onUploaded,
}: ImageUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // optional: basic type check
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    setError(null);
    setIsUploading(true);

    // local preview
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      // data.url is something like /uploads/12345-myimage.png
      onUploaded(data.url);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Something went wrong during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-200">{label}</p>

      <div
        className={`
          border-2 border-dashed rounded-xl px-4 py-6 text-center text-sm
          cursor-pointer transition-colors
          ${isDragging ? "border-blue-500 bg-blue-500/10" : "border-zinc-700 bg-zinc-900/50"}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="mb-1 text-zinc-200">
          Drag & drop an image here, or <span className="text-blue-400">browse</span>
        </p>
        <p className="text-xs text-zinc-500">
          PNG, JPG, WEBP – 5MB max (you can adjust this later)
        </p>

        {isUploading && (
          <p className="mt-2 text-xs text-blue-300">Uploading...</p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      {previewUrl && (
        <div className="mt-2">
          <p className="text-xs text-zinc-400 mb-1">Preview</p>
          {/* For preview, simple img is fine */}
          <img
            src={previewUrl}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-xl border border-zinc-700"
          />
        </div>
      )}
    </div>
  );
}
