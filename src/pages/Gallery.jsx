import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  // Specific artwork data matching categories accurately
  const artworks = [
    // PAINTINGS
    {
      id: 1,
      title: "Echoes in Cobalt",
      category: "paintings",
      medium: "Oil on Stretched Canvas",
      dimensions: '36" x 48"',
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Ochre & Atmosphere",
      category: "paintings",
      medium: "Acrylic & Mixed Media on Wood Panel",
      dimensions: '30" x 40"',
      image:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Composition in Crimson",
      category: "paintings",
      medium: "Oil on Linen",
      dimensions: '24" x 36"',
      image:
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    },

    // DRAWINGS & SKETCHES
    {
      id: 4,
      title: "Anatomy & Contour Study",
      category: "drawings",
      medium: "Charcoal & Graphite on Archival Paper",
      dimensions: '18" x 24"',
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 5,
      title: "Botanical Line Study",
      category: "drawings",
      medium: "Fine Line Ink & Wash",
      dimensions: '12" x 16"',
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 6,
      title: "Architectural Shadow Study",
      category: "drawings",
      medium: "Graphite on Heavyweight Cotton Rag",
      dimensions: '16" x 20"',
      image:
        "https://images.unsplash.com/photo-1578321272176-b7bbc0679b5d?auto=format&fit=crop&w=1000&q=80",
    },

    // MURALS & INSTALLATIONS
    {
      id: 7,
      title: "Urban Reflection Wall",
      category: "murals",
      medium: "Exterior Aerosol & Acrylic Mural",
      dimensions: "14ft x 40ft — Charlotte, NC",
      image:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 8,
      title: "Geometric Horizon",
      category: "murals",
      medium: "Interior Architectural Wall Installation",
      dimensions: "10ft x 22ft — Private Atrium",
      image:
        "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 9,
      title: "Spectral Flora Mural",
      category: "murals",
      medium: "Public Aerosol Installation",
      dimensions: "18ft x 50ft — Raleigh, NC",
      image:
        "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const filteredArtworks =
    activeCategory === "all"
      ? artworks
      : artworks.filter((item) => item.category === activeCategory);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="text-info text-uppercase fw-semibold small tracking-wider mb-2 d-block">
          Portfolio Archive
        </span>
        <h1
          className="display-5 fw-bold mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Selected Works
        </h1>
        <p
          className="text-secondary mx-auto"
          style={{ maxWidth: "600px", fontWeight: "300" }}
        >
          A curated collection of studio paintings, observational drawings, and
          site-specific public mural installations.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
        {[
          { label: "All Works", value: "all" },
          { label: "Paintings", value: "paintings" },
          { label: "Drawings & Sketches", value: "drawings" },
          { label: "Murals & Installations", value: "murals" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() =>
              setSearchParams(
                tab.value === "all" ? {} : { category: tab.value },
              )
            }
            className={`btn btn-sm px-4 py-2 rounded-0 text-uppercase fw-semibold ${
              activeCategory === tab.value
                ? "btn-info text-dark"
                : "btn-outline-secondary text-light"
            }`}
            style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Artwork Grid */}
      <div className="row g-4">
        {filteredArtworks.map((art) => (
          <div key={art.id} className="col-12 col-md-6 col-lg-4">
            <div className="card bg-black text-light border-secondary h-100 shadow-sm overflow-hidden group-hover">
              <div
                className="position-relative overflow-hidden"
                style={{ height: "300px" }}
              >
                <img
                  src={art.image}
                  className="w-100 h-100 card-img-top"
                  alt={art.title}
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.4s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              <div className="card-body d-flex flex-column p-4">
                <span
                  className="text-info text-uppercase fw-semibold mb-1"
                  style={{ letterSpacing: "0.1em", fontSize: "0.7rem" }}
                >
                  {art.category === "paintings"
                    ? "Painting"
                    : art.category === "drawings"
                      ? "Drawing"
                      : "Mural"}
                </span>
                <h2
                  className="h5 fw-bold mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {art.title}
                </h2>
                <p
                  className="text-secondary small mb-1"
                  style={{ fontWeight: "300" }}
                >
                  {art.medium}
                </p>
                <p
                  className="text-muted small mb-0"
                  style={{ fontSize: "0.8rem" }}
                >
                  {art.dimensions}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
