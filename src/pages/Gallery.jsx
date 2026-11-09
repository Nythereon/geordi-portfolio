import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Sparkles } from "lucide-react";

import LightboxModal from "../components/LightboxModal";

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Sync activeTab with URL search param '?category=...' (default to 'All')
  const categoryParam = searchParams.get("category");

  const getTabFromParam = (param) => {
    if (!param || param.toLowerCase() === "all") return "All";
    if (param.toLowerCase().includes("draw")) return "Drawings";
    if (param.toLowerCase().includes("paint")) return "Paintings";
    if (param.toLowerCase().includes("mural")) return "Murals";
    if (param.toLowerCase().includes("commission")) return "Commissions";
    return "All";
  };

  const activeTab = getTabFromParam(categoryParam);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      if (data) setItems(data);
    } catch (err) {
      console.error("Error fetching gallery items:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (category) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: category.toLowerCase() });
    }
  };

  // Filter items based on active category tab
  const filteredItems = items.filter((item) => {
    if (activeTab === "All") return true;
    return item.category?.toLowerCase() === activeTab.toLowerCase();
  });

  const categories = ["All", "Drawings", "Paintings", "Murals", "Commissions"];

  return (
    <div className="container py-5 position-relative">
      {/* Centered Gallery Header */}
      <div className="text-center mb-4">
        <h1
          className="display-5 fw-bold text-light mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Studio Gallery
        </h1>
        <p
          className="text-secondary small text-uppercase mb-4"
          style={{ letterSpacing: "0.15em" }}
        >
          Original Works & Custom Commissions
        </p>

        {/* Category Navigation Tabs */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
          {categories.map((category) => {
            const isActive = activeTab === category;
            return (
              <button
                key={category}
                onClick={() => handleTabChange(category)}
                className={`btn rounded-0 text-uppercase fw-semibold px-3 py-2 ${
                  isActive
                    ? "btn-info text-dark border-info"
                    : "btn-dark text-secondary border-secondary"
                }`}
                style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5 text-secondary">
          <div
            className="spinner-border spinner-border-sm text-info me-2"
            role="status"
          ></div>
          Loading gallery items...
        </div>
      )}

      {/* Gallery Grid */}
      {!loading && (
        <div
          className="px-2"
          style={{
            maxHeight: "calc(100vh - 280px)",
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            scrollbarColor: "var(--bs-secondary) transparent",
          }}
        >
          <div className="row g-4 m-0">
            {filteredItems.map((item) => {
              const hasContent = Boolean(
                item.title?.trim() || item.description?.trim(),
              );

              return (
                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card bg-black border border-secondary rounded-0 h-100 shadow-sm overflow-hidden">
                    <div
                      style={{
                        height: "360px",
                        position: "relative",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedImage(item)}
                      title="Click to view larger image"
                    >
                      <img
                        src={item.image_url}
                        alt={item.title || "Gallery Artwork"}
                        className="w-100 h-100 object-fit-cover"
                        style={{ transition: "transform 0.3s ease" }}
                      />

                      {/* Category Badge */}
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-black border border-secondary text-info rounded-0 small px-2 py-1">
                          {item.category || "Artwork"}
                        </span>
                      </div>

                      {/* Compact Bottom Overlay for Title/Description */}
                      {hasContent && (
                        <div
                          className="position-absolute bottom-0 start-0 w-100 p-3"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 70%, transparent 100%)",
                          }}
                        >
                          {item.title?.trim() && (
                            <h3
                              className="h6 fw-bold text-light mb-1 text-truncate"
                              style={{ fontFamily: "var(--font-heading)" }}
                            >
                              {item.title}
                            </h3>
                          )}

                          {item.description?.trim() && (
                            <p
                              className="text-secondary extra-small mb-0 text-truncate"
                              style={{ fontSize: "0.78rem" }}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {!loading && filteredItems.length === 0 && (
              <div className="col-12 text-center py-5">
                <div className="p-5 bg-black border border-secondary d-inline-block mx-auto">
                  <Sparkles className="text-secondary mb-3" size={32} />
                  <h3 className="h6 text-light fw-bold mb-1">
                    No Artwork Found
                  </h3>
                  <p className="text-secondary small mb-0">
                    No items found under the "{activeTab}" category.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      <LightboxModal
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
