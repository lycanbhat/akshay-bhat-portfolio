import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personal } from "../data/resume";

const roles = personal.roles;

function TypewriterRoles() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    let timeout;

    if (paused) {
      timeout = setTimeout(() => {
        setDeleting(true);
        setPaused(false);
      }, 1800);
      return () => clearTimeout(timeout);
    }

    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        setPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setDeleting(false);
        setIndex((i) => i + 1);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, paused, index]);

  return (
    <span style={{ color: "rgba(255,255,255,0.55)" }}>
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: "1em",
          background: "rgba(255,255,255,0.7)",
          marginLeft: 3,
          verticalAlign: "text-bottom",
          animation: "blink 1s step-end infinite",
        }}
      />
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "70vw",
          maxWidth: 900,
          maxHeight: 900,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "white",
            }}
          />
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            Senior Product Designer · {personal.yearsExp} Years · {personal.location}
          </span>
        </motion.div>

        {/* Name */}
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(72px, 13vw, 200px)",
              fontWeight: 200,
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              color: "white",
              display: "block",
            }}
          >
            {personal.firstName}
          </motion.h1>
        </div>

        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(72px, 13vw, 200px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              color: "white",
              display: "block",
              marginBottom: 48,
            }}
          >
            {personal.lastName}
          </motion.h1>
        </div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.5vw, 36px)",
            fontWeight: 300,
            marginBottom: 60,
            minHeight: "1.4em",
          }}
        >
          <TypewriterRoles />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          <a
            href="#work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 32px",
              background: "white",
              color: "black",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              borderRadius: 2,
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 32px",
              background: "transparent",
              color: "white",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 2,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
          }}
        />
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 768px) {
          section { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}
