import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
  { label: "Privacy", href: "/privacy", target: "_blank" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 40px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled || menuOpen ? "rgba(0,0,0,0.95)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link to="/" onClick={() => { window.scrollTo(0, 0); closeMenu(); }} style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.svg" alt="Akshay Bhat" style={{ height: 28, width: "auto" }} />
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links" style={{ display: "flex", listStyle: "none", gap: 40 }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/#") ? (
                <a
                  href={link.href}
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "white")}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.55)")}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  target={link.target}
                  rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    transition: "color 0.2s ease",
                    textDecoration: "none"
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "white")}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.55)")}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="mailto:akshay.bhat93@gmail.com"
          className="nav-cta"
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.06em",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "8px 20px",
            borderRadius: 2,
            color: "white",
            transition: "all 0.2s ease",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "white";
            e.target.style.color = "black";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "white";
          }}
        >
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            width: 40,
            height: 40,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 2,
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span style={{
            display: "block", width: 18, height: 1.5, background: "white",
            transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            transition: "transform 0.25s ease",
          }} />
          <span style={{
            display: "block", width: 18, height: 1.5, background: "white",
            opacity: menuOpen ? 0 : 1,
            transition: "opacity 0.25s ease",
          }} />
          <span style={{
            display: "block", width: 18, height: 1.5, background: "white",
            transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            transition: "transform 0.25s ease",
          }} />
        </button>

        <style>{`
          @media (max-width: 768px) {
            .nav-links { display: none !important; }
            .nav-cta { display: none !important; }
            .nav-hamburger { display: flex !important; }
          }
        `}</style>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 72,
              left: 0,
              right: 0,
              zIndex: 999,
              background: "rgba(0,0,0,0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "24px 40px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {link.href.startsWith("/#") ? (
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    style={{
                      fontSize: 22,
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      color: "rgba(255,255,255,0.7)",
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      display: "block",
                      fontFamily: "var(--font-display)",
                      transition: "color 0.2s ease",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    onClick={closeMenu}
                    target={link.target}
                    rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                    style={{
                      fontSize: 22,
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      color: "rgba(255,255,255,0.7)",
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      display: "block",
                      fontFamily: "var(--font-display)",
                      transition: "color 0.2s ease",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.a
              href="mailto:akshay.bhat93@gmail.com"
              onClick={closeMenu}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: 24,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "12px 24px",
                borderRadius: 2,
                color: "white",
                textAlign: "center",
              }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
