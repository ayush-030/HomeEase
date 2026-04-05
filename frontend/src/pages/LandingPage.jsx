import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { FaBolt, FaBroom, FaTools, FaWrench, FaPaintRoller, FaSnowflake } from "react-icons/fa"
import { FaShieldHalved, FaCalendarCheck, FaLocationDot, FaStar } from "react-icons/fa6"

// ── Data ──────────────────────────────────────────────────

const services = [
  { name: "Plumbing",   icon: <FaWrench />,     desc: "Leaks, pipe repairs & installations",   color: "#2563eb" },
  { name: "Electrical", icon: <FaBolt />,        desc: "Wiring, panels & fixture work",         color: "#d97706" },
  { name: "Cleaning",   icon: <FaBroom />,       desc: "Deep cleaning & regular upkeep",        color: "#16a34a" },
  { name: "Carpentry",  icon: <FaTools />,       desc: "Furniture, fixtures & woodwork",        color: "#7c3aed" },
  { name: "Painting",   icon: <FaPaintRoller />, desc: "Interior & exterior painting",          color: "#db2777" },
  { name: "AC Service", icon: <FaSnowflake />,   desc: "Repair, servicing & installation",      color: "#0891b2" },
]

const steps = [
  { number: "01", title: "Choose a Service", desc: "Browse available services and select what you need." },
  { number: "02", title: "Book a Slot",      desc: "Pick a date and time that works for you." },
  { number: "03", title: "Get It Done",      desc: "A verified professional arrives at your location and completes the job." },
]

const features = [
  {
    icon: <FaShieldHalved />,
    title: "Verified Professionals",
    desc: "Every service provider goes through a profile verification process before they can accept bookings.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Easy Scheduling",
    desc: "Book, reschedule, or cancel appointments from your dashboard — no phone calls needed.",
  },
  {
    icon: <FaLocationDot />,
    title: "Location-Based Matching",
    desc: "The platform matches you with providers available at your location, whether it's a single site or multiple.",
  },
  {
    icon: <FaStar />,
    title: "Ratings & Reviews",
    desc: "After a job is done, clients can leave a rating. This helps maintain service quality across the platform.",
  },
]

// ── useFadeIn hook ────────────────────────────────────────
// Attaches an IntersectionObserver to a ref.
// When the element enters the viewport, we add the "visible" class to it,
// which triggers the CSS fade-up animation defined below.

function useFadeIn() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target) // stop watching once visible
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return ref
}

// ── Component ─────────────────────────────────────────────

export default function LandingPage() {
  const navigate = useNavigate()
  const [activeService, setActiveService] = useState(null)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // Each section gets its own ref for the fade-in animation
  const heroRef     = useFadeIn()
  const servicesRef = useFadeIn()
  const stepsRef    = useFadeIn()
  const featuresRef = useFadeIn()
  const ctaRef      = useFadeIn()

  // Called when user clicks "Book now" on a service card
  function handleBookNow(e, serviceName) {
    e.stopPropagation() // prevent card's onClick from also firing
    setActiveService(serviceName)
    setShowLoginPrompt(true)
  }

  return (
    <div className="lp-root">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&family=DM+Sans:wght@400;500;600&display=swap');

        .lp-root {
          font-family: 'DM Sans', sans-serif;
          background: #f8fafc;
          color: #1e293b;
          overflow-x: hidden;
        }

        /* Fade-up animation — sections start invisible and slide up when .visible is added */
        .lp-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .lp-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Buttons */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #2563eb;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 13px 28px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: #374151;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 13px 28px;
          border-radius: 10px;
          border: 1.5px solid #cbd5e1;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-ghost:hover {
          border-color: #93c5fd;
          background: #eff6ff;
        }

        /* Service cards — hover lifts the card */
        .service-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 24px;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.09);
        }

        /* Feature cards */
        .feature-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 28px 24px;
          transition: box-shadow 0.2s;
        }
        .feature-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
        }

        /* Step cards inside the dark section */
        .step-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 32px 24px;
          text-align: left;
          transition: background 0.2s;
        }
        .step-card:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Login prompt modal overlay */
        .lp-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
        }

        /* Modal box */
        .lp-modal {
          background: #fff;
          border-radius: 16px;
          padding: 36px 32px;
          width: 100%;
          max-width: 380px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.15);
          text-align: center;
        }

        /* Responsive grids */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (max-width: 900px) {
          .hero-layout   { flex-direction: column !important; }
          .hero-card     { display: none !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid    { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar />

      {/* ── HERO ──────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="lp-section"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 90px" }}
      >
        <div className="hero-layout" style={{ display: "flex", alignItems: "center", gap: 48 }}>

          {/* Left: headline and CTA buttons */}
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#0f172a",
              marginBottom: 20,
              letterSpacing: "-0.01em",
            }}>
              Professional Services,<br />
              <span style={{ color: "#2563eb", fontStyle: "italic" }}>Delivered to You</span>
            </h1>

            <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.7, maxWidth: 480, marginBottom: 36 }}>
              Connect with verified professionals for plumbing, electrical, cleaning and more —
              wherever you need them, whenever you need them.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => navigate("/signup")}>
                Get Started
              </button>
              <button className="btn-ghost" onClick={() => navigate("/login")}>
                Log In
              </button>
            </div>
          </div>

          {/* Right: floating services preview card */}
          <div className="hero-card" style={{
            width: 280,
            flexShrink: 0,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 18,
            padding: 20,
            boxShadow: "0 16px 48px rgba(0,0,0,0.09)",
          }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
              Available Services
            </p>
            {services.slice(0, 4).map((s) => (
              <div key={s.name} style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "9px 12px",
                borderRadius: 8,
                marginBottom: 8,
                background: "#f8fafc",
                border: "1px solid #f1f5f9",
                fontSize: 14,
                fontWeight: 500,
                color: "#1e293b",
              }}>
                <span style={{ color: s.color, fontSize: 15 }}>{s.icon}</span>
                {s.name}
              </div>
            ))}
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10, textAlign: "center" }}>
              + more services available
            </p>
          </div>

        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────── */}
      <section
        ref={servicesRef}
        className="lp-section"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}
      >
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", marginBottom: 10 }}>
          What We Offer
        </p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300, color: "#0f172a", marginBottom: 10 }}>
          Services for Every Requirement
        </h2>
        <p style={{ fontSize: "1rem", color: "#64748b", marginBottom: 40, maxWidth: 480 }}>
          From emergency repairs to scheduled maintenance, find the right professional for any facility or property.
        </p>

        <div className="services-grid">
          {services.map((s) => (
            <div
              key={s.name}
              className="service-card"
              onClick={() => setActiveService(s.name)}
              style={{ borderColor: activeService === s.name ? s.color : "#e2e8f0" }}
            >
              {/* Coloured icon box */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: s.color + "18",
                color: s.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                marginBottom: 14,
              }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#0f172a", marginBottom: 6 }}>{s.name}</h3>
              <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6, marginBottom: 14 }}>{s.desc}</p>
              <span
                onClick={(e) => handleBookNow(e, s.name)}
                style={{ fontSize: 13, fontWeight: 600, color: s.color, cursor: "pointer" }}
              >
                Book now →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section style={{ background: "#1e3a5f", padding: "70px 24px" }}>
        <div
          ref={stepsRef}
          className="lp-section"
          style={{ maxWidth: 1100, margin: "0 auto" }}
        >
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#93c5fd", marginBottom: 10 }}>
            How It Works
          </p>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300, color: "#fff", marginBottom: 40 }}>
            Three Simple Steps
          </h2>

          <div className="steps-grid">
            {steps.map((s) => (
              <div key={s.number} className="step-card">
                <span style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "3rem",
                  color: "rgba(255,255,255,0.15)",
                  display: "block",
                  lineHeight: 1,
                  marginBottom: 14,
                }}>
                  {s.number}
                </span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY HOMEEASE ──────────────────────────────── */}
      <section
        ref={featuresRef}
        className="lp-section"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "70px 24px" }}
      >
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", marginBottom: 10 }}>
          Platform Features
        </p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300, color: "#0f172a", marginBottom: 40 }}>
          Why HomeEase?
        </h2>

        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "#eff6ff",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                marginBottom: 16,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ background: "#1d4ed8", padding: "70px 24px", textAlign: "center" }}>
        <div ref={ctaRef} className="lp-section">
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300, color: "#fff", marginBottom: 14 }}>
            Ready to book your first service?
          </h2>
          <p style={{ fontSize: "1rem", color: "#bfdbfe", marginBottom: 32 }}>
            Create an account and connect with verified professionals in minutes.
          </p>
          <button className="btn-primary" onClick={() => navigate("/signup")} style={{ fontSize: 16, padding: "14px 36px" }}>
            Get Started
          </button>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer style={{ background: "#0f172a", padding: "36px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", color: "#fff", marginBottom: 10 }}>HomeEase</p>
        <p style={{ fontSize: 13, color: "#475569", marginBottom: 16 }}>© 2025 HomeEase. All rights reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {["Privacy Policy", "Terms of Service", "Contact Us"].map((link) => (
            <a key={link} href="#" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>{link}</a>
          ))}
        </div>
      </footer>

      {/* ── LOGIN PROMPT MODAL ────────────────────────── */}
      {showLoginPrompt && (
        <div className="lp-modal-overlay" onClick={() => setShowLoginPrompt(false)}>
          <div className="lp-modal" onClick={(e) => e.stopPropagation()}>

            {/* Icon */}
            <div style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#eff6ff",
              color: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              margin: "0 auto 20px",
            }}>
              🔒
            </div>

            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 400, color: "#0f172a", marginBottom: 10 }}>
              Login Required
            </h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 28 }}>
              You need to be logged in to book <strong>{activeService}</strong> service.
              Please log in or create an account to continue.
            </p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="btn-primary"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <button
                className="btn-ghost"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>

            <button
              onClick={() => setShowLoginPrompt(false)}
              style={{ marginTop: 16, background: "none", border: "none", fontSize: 13, color: "#94a3b8", cursor: "pointer" }}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  )
}