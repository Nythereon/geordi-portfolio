import React from "react";
import { X, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
}) {
  if (!isOpen) return null;

  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div>
      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-black opacity-75"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-black border-start border-secondary text-light p-4 d-flex flex-column shadow-lg"
        style={{ zIndex: 1050, width: "100%", maxWidth: "420px" }}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom border-secondary">
          <div className="d-flex align-items-center gap-2">
            <ShoppingBag className="text-info" size={20} />
            <h2
              className="h5 fw-bold mb-0 text-uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn btn-outline-secondary btn-sm rounded-0 text-light p-1"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-grow-1 overflow-auto pe-1">
          {cart.length === 0 ? (
            <div className="text-center py-5 my-5">
              <ShoppingBag
                size={48}
                className="text-secondary mb-3 opacity-50"
              />
              <p
                className="lead text-secondary mb-2"
                style={{ fontWeight: "300" }}
              >
                Your cart is empty.
              </p>
              <p className="small text-muted mb-0">
                Select fine art prints from the store to fill your bag.
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-dark border border-secondary d-flex gap-3 align-items-center"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h3
                      className="h6 fw-bold mb-1"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="small text-info mb-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Size: {item.size}
                    </p>
                    <p className="small text-light fw-bold mb-0">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="d-flex flex-column align-items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="btn btn-link text-secondary p-0 border-0"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="d-flex align-items-center border border-secondary">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="btn btn-sm btn-dark text-light border-0 px-2 py-0"
                      >
                        -
                      </button>
                      <span className="px-2 small">{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="btn btn-sm btn-dark text-light border-0 px-2 py-0"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="pt-3 mt-3 border-top border-secondary">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span
                className="text-secondary small text-uppercase"
                style={{ letterSpacing: "0.08em" }}
              >
                Estimated Shipping
              </span>
              <span className="small text-info">Calculated at checkout</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span
                className="h6 mb-0 text-uppercase fw-semibold"
                style={{ letterSpacing: "0.08em" }}
              >
                Subtotal
              </span>
              <span
                className="h4 mb-0 fw-bold text-info"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() =>
                alert("Proceeding to checkout... (Mock payment gateway)")
              }
              className="btn btn-info w-100 rounded-0 py-3 text-uppercase fw-bold text-dark d-flex align-items-center justify-content-center gap-2"
              style={{ letterSpacing: "0.08em" }}
            >
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
