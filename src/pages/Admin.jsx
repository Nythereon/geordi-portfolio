import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Lock, LogOut, Plus, Trash2, Upload, CheckCircle2 } from "lucide-react";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery"); // 'gallery' | 'shop'

  // Items state
  const [galleryItems, setGalleryItems] = useState([]);
  const [shopItems, setShopItems] = useState([]);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("Paintings");
  const [shopCategory, setShopCategory] = useState("Print");
  const [price, setPrice] = useState("");

  // Dynamic links state for Shop items [{ name: '', url: '' }]
  const [links, setLinks] = useState([{ name: "", url: "" }]);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchItems();
    }
  }, [session]);

  const fetchItems = async () => {
    const { data: galleryData } = await supabase
      .from("gallery")
      .select("*")
      .order("id", { ascending: false });
    const { data: shopData } = await supabase
      .from("shop")
      .select("*")
      .order("id", { ascending: false });
    if (galleryData) setGalleryItems(galleryData);
    if (shopData) setShopItems(shopData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleLinkChange = (index, field, value) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  const addLinkRow = () => {
    setLinks([...links, { name: "", url: "" }]);
  };

  const removeLinkRow = (index) => {
    if (links.length === 1) return;
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (fileToUpload) => {
    const fileExt = fileToUpload.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(filePath, fileToUpload);

    if (uploadError) uploadError;

    const { data } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!file) {
      return alert("Please provide an image file.");
    }

    if (activeTab === "shop") {
      const validLinks = links.filter((l) => l.name.trim() && l.url.trim());
      if (validLinks.length === 0) {
        return alert("Please provide at least one site name and link.");
      }
    }

    setUploading(true);
    try {
      const imageUrl = await handleFileUpload(file);

      if (activeTab === "gallery") {
        const { error } = await supabase.from("gallery").insert([
          {
            title: title.trim(),
            description,
            category: galleryCategory,
            image_url: imageUrl,
          },
        ]);
        if (error) throw error;
      } else {
        const validLinks = links.filter((l) => l.name.trim() && l.url.trim());
        const { error } = await supabase.from("shop").insert([
          {
            title: title.trim(),
            price: parseFloat(price) || 0,
            category: shopCategory,
            description,
            links: JSON.stringify(validLinks),
            image_url: imageUrl,
          },
        ]);
        if (error) throw error;
      }

      setMessage("Item successfully published!");
      setTitle("");
      setDescription("");
      setPrice("");
      setLinks([{ name: "", url: "" }]);
      setFile(null);
      fetchItems();

      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteItem = async (table, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) alert(error.message);
    else fetchItems();
  };

  if (!session) {
    return (
      <div className="container py-5 my-5" style={{ maxWidth: "420px" }}>
        <div className="p-4 bg-black border border-secondary shadow-lg">
          <div className="text-center mb-4">
            <Lock className="text-info mb-2" size={32} />
            <h1
              className="h4 fw-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Studio Admin
            </h1>
            <p className="text-secondary small">
              Sign in to manage gallery and shop items
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-uppercase small text-secondary">
                Email
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary rounded-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-uppercase small text-secondary">
                Password
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary rounded-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-info w-100 rounded-0 fw-bold text-dark text-uppercase"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
        <div>
          <h1
            className="h3 fw-bold mb-0"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Studio Manager
          </h1>
          <span className="text-secondary small">
            Logged in as {session.user.email}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger btn-sm rounded-0 d-flex align-items-center gap-2"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      {message && (
        <div className="alert alert-info bg-dark text-light border-info d-flex align-items-center gap-2 mb-4">
          <CheckCircle2 size={18} /> {message}
        </div>
      )}

      {/* Mode Switcher */}
      <div className="d-flex gap-2 mb-4">
        <button
          className={`btn rounded-0 text-uppercase fw-semibold ${activeTab === "gallery" ? "btn-info text-dark" : "btn-dark text-secondary border-secondary"}`}
          onClick={() => setActiveTab("gallery")}
        >
          Manage Gallery
        </button>
        <button
          className={`btn rounded-0 text-uppercase fw-semibold ${activeTab === "shop" ? "btn-info text-dark" : "btn-dark text-secondary border-secondary"}`}
          onClick={() => setActiveTab("shop")}
        >
          Manage Shop
        </button>
      </div>

      <div className="row g-4">
        {/* Upload Form */}
        <div className="col-12 col-lg-5">
          <div className="p-4 bg-black border border-secondary shadow-lg">
            <h2
              className="h5 fw-bold mb-3 d-flex align-items-center gap-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <Plus size={18} className="text-info" /> Add New{" "}
              {activeTab === "gallery" ? "Gallery Item" : "Shop Product"}
            </h2>

            <form onSubmit={handleAddItem}>
              {activeTab === "gallery" ? (
                <div className="mb-3">
                  <label className="form-label text-uppercase small text-secondary">
                    Gallery Section *
                  </label>
                  <select
                    className="form-select bg-dark text-light border-secondary rounded-0"
                    value={galleryCategory}
                    onChange={(e) => setGalleryCategory(e.target.value)}
                  >
                    <option value="Drawings">Drawings</option>
                    <option value="Paintings">Paintings</option>
                    <option value="Murals">Murals</option>
                    <option value="Commissions">Commissions</option>
                  </select>
                </div>
              ) : (
                <div className="mb-3">
                  <label className="form-label text-uppercase small text-secondary">
                    Product Category
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary rounded-0"
                    value={shopCategory}
                    onChange={(e) => setShopCategory(e.target.value)}
                    placeholder="e.g. Fine Art Print, Original Canvas"
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label text-uppercase small text-secondary">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary rounded-0"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Optional title..."
                />
              </div>

              {/* Description Input */}
              <div className="mb-3">
                <label className="form-label text-uppercase small text-secondary">
                  Description / Subtitle
                </label>
                <textarea
                  rows="2"
                  className="form-control bg-dark text-light border-secondary rounded-0"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Archival pigment print on heavy cotton rag paper"
                />
              </div>

              {/* Shop Specific Inputs */}
              {activeTab === "shop" && (
                <>
                  <div className="mb-3">
                    <label className="form-label text-uppercase small text-secondary">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control bg-dark text-light border-secondary rounded-0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Optional price..."
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-uppercase small text-secondary">
                      Purchase Links *
                    </label>
                    {links.map((link, index) => (
                      <div
                        key={index}
                        className="d-flex gap-2 mb-2 align-items-center"
                      >
                        <input
                          type="text"
                          className="form-control bg-dark text-light border-secondary rounded-0"
                          placeholder="Site (e.g. Etsy)"
                          value={link.name}
                          onChange={(e) =>
                            handleLinkChange(index, "name", e.target.value)
                          }
                          required={index === 0}
                          style={{ flex: "1" }}
                        />
                        <input
                          type="url"
                          className="form-control bg-dark text-light border-secondary rounded-0"
                          placeholder="URL (https://...)"
                          value={link.url}
                          onChange={(e) =>
                            handleLinkChange(index, "url", e.target.value)
                          }
                          required={index === 0}
                          style={{ flex: "2" }}
                        />
                        {links.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLinkRow(index)}
                            className="btn btn-outline-danger btn-sm rounded-0 p-2"
                            title="Remove link"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addLinkRow}
                      className="btn btn-outline-info btn-sm rounded-0 mt-1 d-flex align-items-center gap-1"
                      style={{ fontSize: "0.78rem" }}
                    >
                      <Plus size={14} /> Add Another Link
                    </button>
                  </div>
                </>
              )}

              <div className="mb-4">
                <label className="form-label text-uppercase small text-secondary">
                  Artwork File *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control bg-dark text-light border-secondary rounded-0"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="btn btn-info w-100 rounded-0 fw-bold text-dark text-uppercase d-flex align-items-center justify-content-center gap-2"
              >
                <Upload size={16} />{" "}
                {uploading ? "Uploading..." : "Publish Item"}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Items Table */}
        <div className="col-12 col-lg-7">
          <div className="p-4 bg-black border border-secondary shadow-lg">
            <h2
              className="h5 fw-bold mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Current{" "}
              {activeTab === "gallery" ? "Gallery Items" : "Shop Products"}
            </h2>

            <div className="table-responsive">
              <table className="table table-dark table-hover border-secondary align-middle mb-0">
                <thead>
                  <tr className="text-uppercase small text-secondary">
                    <th>Image</th>
                    <th>Title & Info</th>
                    <th>Category</th>
                    {activeTab === "shop" && <th>Price / Links</th>}
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === "gallery" ? galleryItems : shopItems).map(
                    (item) => (
                      <tr key={item.id}>
                        <td style={{ width: "60px" }}>
                          <img
                            src={item.image_url}
                            alt={item.title || "Artwork Preview"}
                            style={{
                              width: "48px",
                              height: "48px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>
                          {item.title?.trim() ? (
                            <div className="fw-semibold">{item.title}</div>
                          ) : (
                            <div
                              className="text-secondary fst-italic small"
                              style={{ fontSize: "0.82rem" }}
                            >
                              (No Title)
                            </div>
                          )}
                          {item.description && (
                            <div
                              className="text-secondary extra-small"
                              style={{ fontSize: "0.78rem" }}
                            >
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td>
                          <span className="badge bg-dark border border-secondary text-info fw-normal">
                            {item.category}
                          </span>
                        </td>
                        {activeTab === "shop" && (
                          <td>
                            {item.price > 0 && (
                              <div
                                className="text-info mb-1"
                                style={{ fontSize: "0.82rem" }}
                              >
                                ${parseFloat(item.price).toFixed(2)}
                              </div>
                            )}
                            <div
                              className="text-secondary extra-small"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {(() => {
                                try {
                                  const parsed = JSON.parse(item.links || "[]");
                                  return parsed.map((l) => l.name).join(", ");
                                } catch {
                                  return item.links;
                                }
                              })()}
                            </div>
                          </td>
                        )}
                        <td className="text-end">
                          <button
                            onClick={() => handleDeleteItem(activeTab, item.id)}
                            className="btn btn-outline-danger btn-sm rounded-0 p-1"
                            aria-label="Delete item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ),
                  )}
                  {(activeTab === "gallery" ? galleryItems : shopItems)
                    .length === 0 && (
                    <tr>
                      <td
                        colSpan={activeTab === "shop" ? 5 : 4}
                        className="text-center text-secondary py-4"
                      >
                        No items found in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
