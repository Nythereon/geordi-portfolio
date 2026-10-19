import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Award, Layers, Paintbrush } from "lucide-react";

export default function About() {
  const exhibitions = [
    {
      year: "2026",
      title: "Tactile Dynamics (Group Show)",
      venue: "Lumina Contemporary Art",
      location: "Raleigh, NC",
    },
    {
      year: "2025",
      title: "Chromaplane (Solo Exhibition)",
      venue: "Vanguard Gallery Space",
      location: "Charlotte, NC",
    },
    {
      year: "2024",
      title: "Public Space & Memory (Installation)",
      venue: "Midtown Cultural Center",
      location: "Greensboro, NC",
    },
    {
      year: "2023",
      title: "Paper & Shadow: Observational Works",
      venue: "Studio 101 Arts",
      location: "Asheville, NC",
    },
  ];

  return (
    <div className="container py-5">
      {/* 1. Header Banner */}
      <div className="text-center mb-5 pb-3 border-bottom border-secondary">
        <span className="text-info text-uppercase fw-semibold small tracking-wider mb-2 d-block">
          Biography & Background
        </span>
        <h1
          className="display-4 fw-bold mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          About Geordi Robinson
        </h1>
        <p
          className="text-secondary mx-auto lead"
          style={{ maxWidth: "640px", fontWeight: "300" }}
        >
          Visual artist exploring organic abstraction, line studies, and
          large-scale architectural wall installations.
        </p>
      </div>

      {/* 2. Main Narrative & Portrait */}
      <div className="row g-5 align-items-center mb-5 pb-5 border-bottom border-secondary">
        <div className="col-12 col-lg-5">
          <div className="position-relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              alt="Geordi Robinson in studio"
              className="img-fluid w-100 shadow-lg border border-secondary"
              style={{ objectFit: "cover", maxHeight: "520px" }}
            />
            <div className="position-absolute bottom-0 start-0 m-3 p-3 bg-black border border-secondary text-light">
              <p
                className="small mb-0 text-uppercase tracking-wider fw-semibold"
                style={{ fontSize: "0.75rem" }}
              >
                <MapPin size={14} className="text-info me-1 inline-block" />{" "}
                Studio Based in South Carolina
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7 d-flex flex-column justify-content-center">
          <h2
            className="h3 fw-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Bridging Traditional Studio Art & Public Scale
          </h2>
          <p
            className="text-secondary mb-3"
            style={{ fontWeight: "300", lineHeight: "1.7" }}
          >
            Geordi Robinson is a multi-disciplinary visual artist known for
            juxtaposing raw, organic gestures with deliberate architectural
            structure. With over a decade of continuous studio practice and
            public mural execution, his work examines how physical environments
            and quiet emotional states interact.
          </p>
          <p
            className="text-secondary mb-3"
            style={{ fontWeight: "300", lineHeight: "1.7" }}
          >
            Beginning with rigorous graphite and charcoal draftsmanship,
            Geordi’s practice expanded into heavy oil and acrylic compositions
            on canvas, eventually taking form as expansive site-specific aerosol
            murals across commercial and public spaces in the Southeast.
          </p>
          <p
            className="text-secondary mb-4"
            style={{ fontWeight: "300", lineHeight: "1.7" }}
          >
            Whether working on archival paper or multi-story building exterior
            walls, his objective remains constant: to transform physical spaces
            into contemplative visual experiences through texture, depth, and
            bold field relationships.
          </p>

          <div className="d-flex flex-wrap gap-3">
            <Link
              to="/gallery"
              className="btn btn-outline-info px-4 py-2 text-uppercase fw-semibold small rounded-0"
            >
              Explore Portfolio <ArrowRight size={16} />
            </Link>
            <Link
              to="/shop"
              className="btn btn-info px-4 py-2 text-uppercase fw-semibold small text-dark rounded-0"
            >
              Browse Fine Art Prints
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Core Artistic Mediums & Pillars */}
      <div className="row g-4 mb-5 pb-5 border-bottom border-secondary">
        <div className="col-12 text-center mb-2">
          <h2
            className="h4 fw-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Areas of Specialization
          </h2>
        </div>
        <div className="col-12 col-md-4">
          <div className="p-4 bg-black border border-secondary h-100">
            <Paintbrush className="text-info mb-3" size={28} />
            <h3
              className="h5 fw-bold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Fine Art Painting
            </h3>
            <p
              className="text-secondary small mb-0"
              style={{ fontWeight: "300", lineHeight: "1.6" }}
            >
              Oil and acrylic works focused on color relationships, heavy
              impasto textures, and organic compositions built layer by layer on
              canvas and wood panels.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-4 bg-black border border-secondary h-100">
            <Layers className="text-info mb-3" size={28} />
            <h3
              className="h5 fw-bold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Observational Drawing
            </h3>
            <p
              className="text-secondary small mb-0"
              style={{ fontWeight: "300", lineHeight: "1.6" }}
            >
              Intimate charcoal, fine-line ink, and graphite studies on archival
              paper, emphasizing line weight, shadow depth, and preliminary
              structural studies.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-4 bg-black border border-secondary h-100">
            <Award className="text-info mb-3" size={28} />
            <h3
              className="h5 fw-bold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Public Murals
            </h3>
            <p
              className="text-secondary small mb-0"
              style={{ fontWeight: "300", lineHeight: "1.6" }}
            >
              Large-scale aerosol and acrylic wall installations designed for
              architectural integration, urban revitalization, and private
              interior atriums.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Selected Exhibitions */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          <div className="text-center mb-4">
            <h2
              className="h4 fw-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Selected Exhibitions & Projects
            </h2>
          </div>
          <div className="d-flex flex-column border-top border-secondary">
            {exhibitions.map((item, index) => (
              <div
                key={index}
                className="py-3 border-bottom border-secondary d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-1"
              >
                <div>
                  <h3 className="h6 fw-bold mb-0 text-light">{item.title}</h3>
                  <span
                    className="text-secondary small"
                    style={{ fontWeight: "300" }}
                  >
                    {item.venue} — {item.location}
                  </span>
                </div>
                <span className="badge bg-secondary text-light align-self-start align-self-sm-center rounded-0">
                  {item.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
