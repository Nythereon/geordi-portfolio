import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Palette, ShoppingBag, Menu } from "lucide-react";

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    if (category === "all") {
      navigate("/gallery");
    } else {
      navigate(`/gallery?category=${category}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-black border-bottom border-secondary py-3">
      <div className="container">
        {/* Brand Name */}
        <NavLink
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
        >
          <Palette className="text-info" size={22} />
          <span
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.04em",
            }}
          >
            Visual Artist
          </span>
        </NavLink>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 p-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMobileMenu"
          aria-controls="navbarMobileMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <Menu className="text-light" size={24} />
        </button>

        {/* Collapsible Nav Links */}
        <div
          className="collapse navbar-collapse mt-3 mt-md-0"
          id="navbarMobileMenu"
        >
          <div
            className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 gap-md-4 ms-auto small text-uppercase fw-semibold"
            style={{ letterSpacing: "0.08em" }}
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-decoration-none ${isActive ? "text-info border-bottom border-info pb-1" : "text-light opacity-75"}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              end
              className={({ isActive }) =>
                `text-decoration-none ${isActive ? "text-info border-bottom border-info pb-1" : "text-light opacity-75"}`
              }
            >
              About
            </NavLink>

            {/* Gallery Dropdown */}
            <div className="dropdown">
              <button
                className="btn text-light opacity-75 p-0 border-0 bg-transparent text-uppercase fw-semibold dropdown-toggle"
                type="button"
                id="galleryDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: "inherit", letterSpacing: "0.08em" }}
              >
                Gallery
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark bg-black border border-secondary shadow-lg rounded-0 mt-2"
                aria-labelledby="galleryDropdown"
              >
                <li>
                  <button
                    className="dropdown-item small text-uppercase py-2"
                    onClick={() => handleCategorySelect("all")}
                  >
                    All Works
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider border-secondary my-1" />
                </li>
                <li>
                  <button
                    className="dropdown-item small text-uppercase py-2"
                    onClick={() => handleCategorySelect("paintings")}
                  >
                    Paintings
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item small text-uppercase py-2"
                    onClick={() => handleCategorySelect("drawings")}
                  >
                    Drawings & Sketches
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item small text-uppercase py-2"
                    onClick={() => handleCategorySelect("murals")}
                  >
                    Murals & Installations
                  </button>
                </li>
              </ul>
            </div>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `text-decoration-none ${isActive ? "text-info border-bottom border-info pb-1" : "text-light opacity-75"}`
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/contact"
              end
              className={({ isActive }) =>
                `text-decoration-none ${isActive ? "text-info border-bottom border-info pb-1" : "text-light opacity-75"}`
              }
            >
              Contact
            </NavLink>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="btn btn-outline-light btn-sm d-flex align-items-center gap-1 rounded-0 mt-2 mt-md-0"
            >
              <ShoppingBag size={15} /> Cart ({cartCount})
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
