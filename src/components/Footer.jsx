import React from "react";
import { Link } from "react-router-dom";
import { Mail, Camera, Share2, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-light border-top border-secondary mt-auto py-3">
      <div className="container">
        <div className="row align-items-center g-2 text-center text-md-start">
          {/* Copyright */}
          <div
            className="col-12 col-md-4 text-secondary extra-small"
            style={{ fontSize: "0.8rem" }}
          >
            © {new Date().getFullYear()} All Rights Reserved.
          </div>

          {/* Centered Name */}
          <div className="col-12 col-md-4 text-center">
            <span
              className="fw-bold small text-light"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.04em",
              }}
            >
              Geordi Robinson
            </span>
          </div>

          {/* Social Icons, Direct Contact Link & Back to Top */}
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-end gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-secondary hover-light"
              aria-label="Instagram"
            >
              <Camera size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-secondary hover-light"
              aria-label="Social"
            >
              <Share2 size={16} />
            </a>
            <Link
              to="/contact"
              className="text-secondary hover-light"
              aria-label="Contact Page"
            >
              <Mail size={16} />
            </Link>
            <span className="text-secondary opacity-25 ms-1">|</span>
            <button
              onClick={scrollToTop}
              className="btn btn-link text-secondary text-decoration-none p-0"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
