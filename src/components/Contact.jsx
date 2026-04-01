import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personal } from "../data/resume";
import SectionLabel from "./SectionLabel";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "160px 40px",
        maxWidth: 1400,
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: 700,
          maxHeight: 700,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <SectionLabel number="05" label="Contact" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 13,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            fontWeight: 500,
            marginBottom: 24,
          }}
        >
          Let's build something great
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 7vw, 100px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "white",
            marginBottom: 16,
          }}
        >
          Get in touch
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <a
            href={`mailto:${personal.email}`}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 3vw, 40px)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "-0.02em",
              transition: "color 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            {personal.email}
          </a>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <a
            href={`mailto:${personal.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 40px",
              background: "white",
              color: "black",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: 2,
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Send Email
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 40px",
              background: "transparent",
              color: "white",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 2,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            LinkedIn
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 1,
            background: "rgba(255,255,255,0.06)",
            marginTop: 80,
            transformOrigin: "center",
          }}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact { padding: 100px 24px !important; }
        }
      `}</style>
    </section>
  );
}
