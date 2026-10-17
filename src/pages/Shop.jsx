import React, { useState } from "react";
import {
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
} from "lucide-react";

export default function Shop({ onAddToCart }) {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedItem, setAddedItem] = useState(null);

  const sizeOptions = [
    { label: '8" x 10"', price: 35 },
    { label: '12" x 18"', price: 60 },
    { label: '18" x 24"', price: 95 },
    { label: '24" x 36"', price: 150 },
  ];

  const prints = [
    {
      id: "print-1",
      title: "Echoes in Cobalt",
      edition: "Open Edition Giclée Print",
      paper: "Archival Matte Cotton Rag (310 gsm)",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "print-2",
      title: "Anatomy & Contour Study",
      edition: "Limited Edition (1 of 50)",
      paper: "Hahnemühle Photo Rag",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "print-3",
      title: "Ochre & Atmosphere",
      edition: "Open Edition Giclée Print",
      paper: "Archival Matte Cotton Rag (310 gsm)",
      image:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "print-4",
      title: "Botanical Line Study",
      edition: "Open Edition Giclée Print",
      paper: "Smooth Fine Art Paper",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "print-5",
      title: "Composition in Crimson",
      edition: "Limited Edition (1 of 30)",
      paper: "Textured Velvet Fine Art Paper",
      image:
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "print-6",
      title: "Architectural Shadow Study",
      edition: "Open Edition Giclée Print",
      paper: "Archival Matte Cotton Rag",
      image:
        "https://images.unsplash.com/photo-1578321272176-b7bbc0679b5d?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const getSelectedSize = (printId) => {
    return selectedSizes[printId] || sizeOptions[1];
  };

  const handleSizeChange = (printId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [printId]: size }));
  };

  const handleAddToCart = (print) => {
    const chosenSize = getSelectedSize(print.id);
    const itemToAdd = {
      id: `${print.id}-${chosenSize.label}`,
      title: print.title,
      size: chosenSize.label,
      price: chosenSize.price,
      image: print.image,
    };

    // Update global cart state in App.jsx
    if (onAddToCart) {
      onAddToCart(itemToAdd);
    }

    // Trigger confirmation toast
    setAddedItem(itemToAdd);
    setTimeout(() => {
      setAddedItem(null);
    }, 3500);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="text-info text-uppercase fw-semibold small tracking-wider mb-2 d-block">
          Official Store
        </span>
        <h1
          className="display-5 fw-bold mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Fine Art Prints
        </h1>
        <p
          className="text-secondary mx-auto"
          style={{ maxWidth: "640px", fontWeight: "300" }}
        >
          Archival-quality museum prints produced on heavyweight cotton rag
          paper using pigment-based inks. Each print is hand-checked before
          shipping.
        </p>
      </div>

      {/* Added to Cart Notification Toast */}
      {addedItem && (
        <div
          className="position-fixed bottom-0 end-0 m-4 p-3 bg-black border border-info shadow-lg rounded-0 text-light d-flex align-items-center gap-3"
          style={{ zIndex: 1050, maxWidth: "380px" }}
        >
          <div className="bg-info text-dark p-2 rounded-circle d-flex align-items-center justify-content-center">
            <Check size={18} />
          </div>
          <div>
            <p className="mb-0 fw-semibold small">Added to Cart!</p>
            <p
              className="mb-0 text-secondary extra-small"
              style={{ fontSize: "0.8rem" }}
            >
              {addedItem.title} ({addedItem.size}) — ${addedItem.price}
            </p>
          </div>
        </div>
      )}

      {/* Feature Highlights */}
      <div className="row g-4 mb-5 pb-3 border-bottom border-secondary text-center text-md-start">
        <div className="col-12 col-md-4 d-flex align-items-center gap-3 justify-content-center justify-content-md-start">
          <ShieldCheck className="text-info flex-shrink-0" size={28} />
          <div>
            <h2
              className="h6 mb-0 fw-semibold text-uppercase"
              style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}
            >
              Museum Quality
            </h2>
            <p
              className="text-secondary small mb-0"
              style={{ fontWeight: "300" }}
            >
              Archival inks rated for 100+ years
            </p>
          </div>
        </div>
        <div className="col-12 col-md-4 d-flex align-items-center gap-3 justify-content-center justify-content-md-start">
          <Truck className="text-info flex-shrink-0" size={28} />
          <div>
            <h2
              className="h6 mb-0 fw-semibold text-uppercase"
              style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}
            >
              Worldwide Shipping
            </h2>
            <p
              className="text-secondary small mb-0"
              style={{ fontWeight: "300" }}
            >
              Protective flat tube packaging
            </p>
          </div>
        </div>
        <div className="col-12 col-md-4 d-flex align-items-center gap-3 justify-content-center justify-content-md-start">
          <RefreshCw className="text-info flex-shrink-0" size={28} />
          <div>
            <h2
              className="h6 mb-0 fw-semibold text-uppercase"
              style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}
            >
              Satisfaction Guarantee
            </h2>
            <p
              className="text-secondary small mb-0"
              style={{ fontWeight: "300" }}
            >
              Full refund within 30 days
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row g-4">
        {prints.map((print) => {
          const currentSize = getSelectedSize(print.id);

          return (
            <div key={print.id} className="col-12 col-md-6 col-lg-4">
              <div className="card bg-black text-light border-secondary h-100 shadow-sm overflow-hidden d-flex flex-column">
                <div
                  className="position-relative overflow-hidden"
                  style={{ height: "320px" }}
                >
                  <img
                    src={print.image}
                    alt={print.title}
                    className="w-100 h-100 card-img-top"
                    style={{ objectFit: "cover" }}
                  />
                  <span
                    className="position-absolute top-0 end-0 bg-black text-info border-start border-bottom border-secondary px-3 py-1 small fw-semibold text-uppercase"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
                  >
                    {print.edition}
                  </span>
                </div>

                <div className="card-body d-flex flex-column p-4">
                  <h3
                    className="h5 fw-bold mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {print.title}
                  </h3>
                  <p
                    className="text-secondary small mb-3"
                    style={{ fontWeight: "300", fontSize: "0.825rem" }}
                  >
                    {print.paper}
                  </p>

                  <div className="mb-4 mt-auto">
                    <label
                      className="form-label text-uppercase small text-muted mb-2"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
                    >
                      Select Dimensions:
                    </label>
                    <div
                      className="d-grid grid-2 gap-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                      }}
                    >
                      {sizeOptions.map((sz) => (
                        <button
                          key={sz.label}
                          type="button"
                          onClick={() => handleSizeChange(print.id, sz)}
                          className={`btn btn-sm rounded-0 border-secondary ${
                            currentSize.label === sz.label
                              ? "btn-info text-dark fw-bold"
                              : "btn-outline-secondary text-light"
                          }`}
                          style={{ fontSize: "0.75rem" }}
                        >
                          {sz.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-3 border-top border-secondary">
                    <div>
                      <span
                        className="text-secondary small d-block"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Price
                      </span>
                      <span
                        className="h4 fw-bold mb-0 text-light"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        ${currentSize.price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(print)}
                      className="btn btn-outline-info rounded-0 text-uppercase fw-semibold small d-flex align-items-center gap-2 px-3 py-2"
                      style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
                    >
                      <ShoppingBag size={15} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
