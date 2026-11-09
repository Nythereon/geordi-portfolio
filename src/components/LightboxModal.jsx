import React from "react";
import { X } from "lucide-react";

export default function LightboxModal({ selectedImage, onClose }) {
  if (!selectedImage) return null;

  const hasContent = Boolean(
    selectedImage.title?.trim() || selectedImage.description?.trim(),
  );

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ backgroundColor: "rgba(5, 5, 8, 0.95)", zIndex: 1080 }}
      onClick={onClose}
    >
      <div
        className="position-relative d-flex flex-column align-items-center justify-content-center p-4 w-100 h-100"
        style={{ maxWidth: "90vw", maxHeight: "95vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="position-absolute top-0 end-0 m-3 btn btn-dark border-secondary text-light rounded-0 p-2 shadow"
          style={{ zIndex: 10 }}
          aria-label="Close lightbox"
        >
          <X size={20} />
        </button>

        {/* Inner wrapper constrained to the image's natural boundaries */}
        <div
          className="d-flex flex-column align-items-start justify-content-center"
          style={{ maxWidth: "100%", maxHeight: "85vh" }}
        >
          {/* Image Container */}
          <div
            className="d-flex align-items-center justify-content-center overflow-hidden mb-2 w-100"
            style={{ minHeight: 0 }}
          >
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title || "Artwork Preview"}
              className="img-fluid object-fit-contain"
              style={{ maxHeight: "72vh", maxWidth: "100%" }}
            />
          </div>

          {/* Title & Description directly under the left side of the image */}
          {hasContent && (
            <div className="text-start w-100 px-1">
              {selectedImage.title?.trim() && (
                <h3
                  className="h6 fw-bold text-light mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {selectedImage.title}
                </h3>
              )}
              {selectedImage.description?.trim() && (
                <p
                  className="text-secondary small mb-0"
                  style={{ fontSize: "0.85rem" }}
                >
                  {selectedImage.description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
