import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const categories = [
    {
      id: "paintings",
      title: "Paintings",
      subtitle: "Oil & Acrylic on Canvas",
      description:
        "Explorations of texture, color fields, and expressive brushwork inspired by organic forms.",
      image:
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "drawings",
      title: "Drawings & Sketches",
      subtitle: "Charcoal, Ink & Graphite",
      description:
        "Intimate studies focusing on light, line work, shadow play, and preliminary conceptual sketches.",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "murals",
      title: "Murals & Installations",
      subtitle: "Large Scale Public & Private Works",
      description:
        "Site-specific architectural wall art, aerosol murals, and expansive indoor/outdoor installations.",
      image:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div>
      {/* 1. Artist Hero Section */}
      <section className="py-5 bg-black border-bottom border-secondary">
        <div className="container py-4">
          <div className="row align-items-center g-4 justify-content-center">
            {/* Image Column pushed closer toward center on desktop */}
            <div className="col-12 col-md-5 d-flex justify-content-center justify-content-md-end pe-md-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                alt="Geordi Robinson"
                className="img-fluid rounded-circle border border-secondary shadow"
                style={{ width: "220px", height: "220px", objectFit: "cover" }}
              />
            </div>

            {/* Bio Column */}
            <div className="col-12 col-md-7 text-center text-md-start ps-md-3">
              <span className="badge bg-secondary mb-3 px-3 py-2 text-uppercase tracking-wider">
                Visual Artist
              </span>
              <h1
                className="display-4 fw-bold mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Geordi Robinson
              </h1>
              <p
                className="lead text-secondary mb-4"
                style={{ fontWeight: "300", maxWidth: "520px" }}
              >
                Creating visual experiences across traditional painting, fine
                line drawing, and large-scale public installations.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                <Link
                  to="/about"
                  className="btn btn-primary px-4 py-2 text-uppercase fw-semibold small"
                >
                  Read Full Bio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Artist Statement */}
      <section
        className="py-5 border-bottom border-secondary text-center"
        style={{ backgroundColor: "#12161f" }}
      >
        <div className="container py-3">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <h2
                className="h6 text-info fw-bold text-uppercase mb-3"
                style={{ letterSpacing: "0.12em" }}
              >
                Artist Statement
              </h2>
              <blockquote
                className="blockquote text-light fs-3 fst-italic mb-4"
                style={{ fontFamily: "var(--font-heading)", lineHeight: "1.4" }}
              >
                "My work examines the interplay between organic forms and
                physical space, aiming to translate quiet emotional states into
                bold visuals."
              </blockquote>
              <p
                className="text-secondary mx-auto mb-0"
                style={{ maxWidth: "700px", fontWeight: "300" }}
              >
                Based out of South Carolina, I have spent over a decade
                developing a distinct aesthetic combining traditional studio
                techniques with modern graphic influences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vertical Category Showcase */}
      <section id="categories" className="container py-5">
        <div className="text-center mb-5 border-bottom border-secondary pb-3">
          <h2
            className="h3 fw-bold mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Artistic Mediums
          </h2>
          <p className="text-secondary mb-0">
            Select a category below to explore specific works.
          </p>
        </div>

        <div className="d-flex flex-column gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="card bg-black text-light border-secondary shadow-lg overflow-hidden"
            >
              <div className="row g-0 align-items-center">
                <div className="col-12 col-lg-6">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="img-fluid w-100"
                    style={{ height: "350px", objectFit: "cover" }}
                  />
                </div>

                <div className="col-12 col-lg-6 p-4 p-md-5 d-flex flex-column align-items-center justify-content-center text-center">
                  <span
                    className="text-info text-uppercase fw-semibold small mb-2"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {cat.subtitle}
                  </span>
                  <h3
                    className="h2 fw-bold mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="text-secondary mb-4 mx-auto"
                    style={{ maxWidth: "480px", fontWeight: "300" }}
                  >
                    {cat.description}
                  </p>
                  <Link
                    to={`/gallery?category=${cat.id}`}
                    className="btn btn-outline-info px-4 py-2 d-inline-flex align-items-center gap-2 text-uppercase fw-semibold small"
                  >
                    View {cat.title} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
