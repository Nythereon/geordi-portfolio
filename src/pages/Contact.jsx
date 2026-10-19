import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Palette,
  AlertCircle,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  // Pulls your secret ID safely from the local .env file
  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus({ submitting: true, submitted: false, error: false });

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus({ submitting: false, submitted: true, error: false });
        setFormData({
          name: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });

        setTimeout(() => {
          setStatus((prev) => ({ ...prev, submitted: false }));
        }, 8000);
      } else {
        setStatus({ submitting: false, submitted: false, error: true });
      }
    } catch (err) {
      setStatus({ submitting: false, submitted: false, error: true });
    }
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5 pb-3 border-bottom border-secondary">
        <span className="text-info text-uppercase fw-semibold small tracking-wider mb-2 d-block">
          Get in Touch
        </span>
        <h1
          className="display-4 fw-bold mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Contact & Commissions
        </h1>
        <p
          className="text-secondary mx-auto lead"
          style={{ maxWidth: "600px", fontWeight: "300" }}
        >
          Have a question about available original works, fine art print orders,
          or interested in commissioning a custom mural? Send a message below.
        </p>
      </div>

      <div className="row g-5 justify-content-between">
        {/* Contact Info & Details Column */}
        <div className="col-12 col-lg-5">
          <div className="p-4 p-md-5 bg-black border border-secondary shadow-lg h-100 d-flex flex-column justify-content-between">
            <div>
              <h2
                className="h4 fw-bold mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Studio Info
              </h2>
              <p
                className="text-secondary mb-4"
                style={{ fontWeight: "300", lineHeight: "1.7" }}
              >
                For gallery inquiries, private commissions, studio visits, or
                print fulfillment support, feel free to reach out directly.
              </p>

              <div className="d-flex flex-column gap-4 my-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 bg-dark border border-secondary text-info flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span
                      className="text-secondary small d-block text-uppercase fw-semibold"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
                    >
                      Email
                    </span>
                    <a
                      href="mailto:studio@geordirobinson.com"
                      className="text-light text-decoration-none fw-semibold"
                    >
                      geordidevante@yahoo.com
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 bg-dark border border-secondary text-info flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span
                      className="text-secondary small d-block text-uppercase fw-semibold"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
                    >
                      Studio Location
                    </span>
                    <span className="text-light fw-semibold">
                      South Carolina, United States
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 bg-dark border border-secondary text-info flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span
                      className="text-secondary small d-block text-uppercase fw-semibold"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
                    >
                      Response Time
                    </span>
                    <span className="text-light fw-semibold">
                      1 – 2 Business Days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Commission Note */}
            <div className="pt-4 border-top border-secondary">
              <div className="d-flex align-items-center gap-2 mb-2 text-info">
                <Palette size={18} />
                <span
                  className="fw-semibold text-uppercase small"
                  style={{ letterSpacing: "0.08em" }}
                >
                  Commission Status
                </span>
              </div>
              <p
                className="text-secondary small mb-0"
                style={{ fontWeight: "300" }}
              >
                Currently accepting select indoor/outdoor mural projects and
                studio painting commissions.
              </p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="col-12 col-lg-7">
          <div className="p-4 p-md-5 bg-black border border-secondary shadow-lg">
            <h2
              className="h4 fw-bold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Send a Message
            </h2>

            {/* Success Notification */}
            {status.submitted && (
              <div className="p-3 mb-4 bg-dark border border-info text-light d-flex align-items-center gap-3">
                <CheckCircle2 className="text-info flex-shrink-0" size={24} />
                <div>
                  <p className="mb-0 fw-semibold small">Message Sent!</p>
                  <p
                    className="mb-0 text-secondary extra-small"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Thank you for reaching out. Your email was successfully
                    delivered to Geordi's studio inbox.
                  </p>
                </div>
              </div>
            )}

            {/* Error Notification */}
            {status.error && (
              <div className="p-3 mb-4 bg-dark border border-danger text-light d-flex align-items-center gap-3">
                <AlertCircle className="text-danger flex-shrink-0" size={24} />
                <div>
                  <p className="mb-0 fw-semibold small text-danger">
                    Delivery Failed
                  </p>
                  <p
                    className="mb-0 text-secondary extra-small"
                    style={{ fontSize: "0.8rem" }}
                  >
                    There was an issue dispatching your message. Please verify
                    your Formspree ID or contact studio@geordirobinson.com
                    directly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="name"
                    className="form-label text-uppercase small text-secondary"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="form-control bg-dark text-light border-secondary rounded-0 py-2"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label
                    htmlFor="email"
                    className="form-label text-uppercase small text-secondary"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="form-control bg-dark text-light border-secondary rounded-0 py-2"
                  />
                </div>

                <div className="col-12">
                  <label
                    htmlFor="subject"
                    className="form-label text-uppercase small text-secondary"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-select bg-dark text-light border-secondary rounded-0 py-2"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Mural Commission">
                      Mural / Wall Installation Commission
                    </option>
                    <option value="Studio Painting Purchase">
                      Studio Painting Purchase
                    </option>
                    <option value="Print Order Support">
                      Print Order Support
                    </option>
                    <option value="Exhibition / Press">
                      Exhibition / Press Opportunity
                    </option>
                  </select>
                </div>

                <div className="col-12">
                  <label
                    htmlFor="message"
                    className="form-label text-uppercase small text-secondary"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please include details regarding dimensions, project timelines, or specific works..."
                    className="form-control bg-dark text-light border-secondary rounded-0 p-3"
                  />
                </div>

                <div className="col-12 pt-2">
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="btn btn-info w-100 rounded-0 py-3 text-uppercase fw-bold text-dark d-flex align-items-center justify-content-center gap-2"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    {status.submitting ? "Sending..." : "Send Message"}{" "}
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
