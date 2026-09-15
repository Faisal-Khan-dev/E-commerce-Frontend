"use client";

import { useState, useRef, useEffect } from "react";
import { X, Star, Upload, Loader2 } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form fields when modal closes
  useEffect(() => {
    if (!isOpen) {
      setComment("");
      setRating(5);
      setImage(null);
      setImagePreview(null);
      setError("");
      setSuccess("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please write a brief comment sharing your experience.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("rating", rating.toString());
      formData.append("comment", comment);
      if (image) {
        formData.append("image", image);
      }

      await onSubmit(formData);

      setSuccess(
        "Thank you! Your testimonial has been successfully published.",
      );

      // Auto-closes the modal after 1.5 seconds
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Shell */}
      <div
        ref={modalRef}
        className="relative bg-[#fcf9f6] w-full max-w-lg rounded-xl border border-zinc-200/60 p-6 sm:p-8 shadow-xl z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="font-serif text-xl sm:text-2xl text-zinc-900 mb-1">
            Refined Testimony
          </h3>
          <p className="text-xs text-zinc-400 font-light">
            Share your pure experience with our product.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          {error && (
            <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md">
              {success}
            </div>
          )}

          {/* Interactive Stars System */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-2">
              Overall Assessment
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  disabled={submitting || !!success}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 -ml-1 transition-transform active:scale-90 disabled:opacity-50"
                >
                  <Star
                    className={`w-6 h-6 transition-colors duration-150 ${star <= (hoverRating ?? rating)
                        ? "fill-zinc-900 stroke-zinc-900"
                        : "fill-none stroke-zinc-300"
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Comment Box */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-2">
              Review Details
            </label>
            <textarea
              rows={4}
              value={comment}
              disabled={submitting || !!success}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What made this organic experience exceptional? Describe the flavor, presentation, or wellness benefits..."
              className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-900 font-light resize-none shadow-2xs disabled:opacity-60"
            />
          </div>

          {/* Media Sandbox Dropzone */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-2">
              Accompanying Photography (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label
                className={`flex flex-col items-center justify-center border border-dashed border-zinc-300 hover:border-zinc-400 bg-white rounded-lg px-4 py-5 transition-all text-center group w-32 aspect-square ${submitting || !!success ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <Upload className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 mb-2 transition-colors" />
                <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-500">
                  Upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={submitting || !!success}
                  onChange={handleImageChange}
                />
              </label>

              {imagePreview && (
                <div className="relative border border-zinc-200/60 rounded-lg overflow-hidden w-32 aspect-square shadow-2xs bg-zinc-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {!(submitting || !!success) && (
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-1 right-1 bg-zinc-950/70 hover:bg-zinc-950 text-white p-1 rounded-full backdrop-blur-xs transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Form Trigger Row */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || !!success}
              className="w-full py-3.5 bg-[#312117] hover:bg-[#432f22] disabled:bg-zinc-400 disabled:cursor-not-allowed text-white text-xs font-semibold uppercase tracking-widest rounded-md shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Publishing
                  Review...
                </>
              ) : success ? (
                "Published ✓"
              ) : (
                "Publish Review"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
