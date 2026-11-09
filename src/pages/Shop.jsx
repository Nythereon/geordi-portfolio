import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ExternalLink, Sparkles } from "lucide-react";
import LightboxModal from "../components/LightboxModal";

export default function Shop() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchShopItems();
  }, []);

  const fetchShopItems = async () => {
    try {
      const { data, error } = await supabase
        .from("shop")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      if (data) setItems(data);
    } catch (err) {
      console.error("Error fetching shop items:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 position-relative">
      {/* Centered Header */}
      <div className="text-center mb-4">
        <h1
          className="display-5 fw-bold text-light mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Studio Shop
        </h1>
        <p
          className="text-secondary small text-uppercase mb-4"
          style={{ letterSpacing: "0.15em" }}
        >
          Fine art prints and original works
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5 text-secondary">
          <div
            className="spinner-border spinner-border-sm text-info me-2"
            role="status"
          ></div>
          Loading shop items...
        </div>
      )}

      {/* Vertical Scrollable Grid */}
      {!loading && (
        <div
          className="px-2"
          style={{
            maxHeight: "calc(100vh - 250px)",
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            scrollbarColor: "var(--bs-secondary) transparent",
          }}
        >
          <div className="row g-4 m-0">
            {items.map((item) => {
              let parsedLinks = [];
              try {
                parsedLinks = JSON.parse(item.links || "[]");
              } catch {
                parsedLinks = [];
              }

              return (
                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card bg-black border border-secondary rounded-0 h-100 shadow-sm d-flex flex-column">
                    <div
                      style={{
                        height: "300px",
                        overflow: "hidden",
                        position: "relative",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedImage(item)}
                      title="Click to view larger image"
                    >
                      <img
                        src={item.image_url}
                        alt={item.title || "Shop Artwork"}
                        className="w-100 h-100 object-fit-cover"
                        style={{ transition: "transform 0.3s ease" }}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-black border border-secondary text-info rounded-0 small px-2 py-1">
                          {item.category || "Print"}
                        </span>
                      </div>
                    </div>

                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                      <div>
                        {(item.title?.trim() || item.price > 0) && (
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            {item.title?.trim() && (
                              <h3
                                className="h6 fw-bold text-light mb-0"
                                style={{ fontFamily: "var(--font-heading)" }}
                              >
                                {item.title}
                              </h3>
                            )}
                            {item.price > 0 && (
                              <span className="text-info fw-bold ms-auto">
                                ${parseFloat(item.price).toFixed(2)}
                              </span>
                            )}
                          </div>
                        )}

                        {item.description && (
                          <p
                            className="text-secondary small mb-3"
                            style={{ fontSize: "0.85rem" }}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Render compact buttons in a flex-wrap row (at least 2 side-by-side) */}
                      {parsedLinks.length > 0 && (
                        <div className="d-flex flex-wrap gap-2 mt-3">
                          {parsedLinks.map((linkObj, index) => (
                            <a
                              key={index}
                              href={linkObj.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-info rounded-0 fw-bold text-dark text-uppercase d-flex align-items-center justify-content-center gap-1 px-2 py-1 flex-grow-1"
                              style={{ fontSize: "0.72rem", minWidth: "110px" }}
                            >
                              <ExternalLink size={14} /> Buy on {linkObj.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {!loading && items.length === 0 && (
              <div className="col-12 text-center py-5">
                <div className="p-5 bg-black border border-secondary d-inline-block mx-auto">
                  <Sparkles className="text-secondary mb-3" size={32} />
                  <h3 className="h6 text-light fw-bold mb-1">Shop is Empty</h3>
                  <p className="text-secondary small mb-0">
                    No products published yet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <LightboxModal
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
