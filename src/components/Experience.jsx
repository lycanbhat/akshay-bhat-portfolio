import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "../data/resume";
import SectionLabel from "./SectionLabel";

function ExperienceCard({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: "0 48px",
        paddingBottom: 64,
        position: "relative",
      }}
      className="exp-card"
    >
      {/* Left: Meta */}
      <div style={{ paddingTop: 4 }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 8,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {item.period}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.06em",
          }}
        >
          {item.location}
        </div>
        {item.current && (
          <div
            style={{
              display: "inline-block",
              marginTop: 12,
              padding: "3px 10px",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 2,
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 500,
            }}
          >
            Current
          </div>
        )}
      </div>

      {/* Right: Content */}
      <div
        style={{
          paddingLeft: 32,
          paddingBottom: 64,
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
        }}
      >
        {/* Timeline dot */}
        <div
          style={{
            position: "absolute",
            left: -5,
            top: 6,
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: item.current ? "white" : "rgba(255,255,255,0.2)",
            border: item.current ? "none" : "1px solid rgba(255,255,255,0.3)",
          }}
        />

        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2vw, 26px)",
            fontWeight: 600,
            color: "white",
            letterSpacing: "-0.02em",
            marginBottom: 6,
          }}
        >
          {item.company}
        </div>
        <div
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.04em",
            marginBottom: 24,
            fontStyle: "italic",
          }}
        >
          {item.role}
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {item.bullets.map((bullet, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 12,
                fontSize: 14,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0, marginTop: 2 }}>—</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: "140px 40px",
        maxWidth: 1400,
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <SectionLabel number="03" label="Experience" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "0 80px",
          alignItems: "start",
        }}
        className="exp-layout"
      >
        {/* Sticky header */}
        <div style={{ position: "sticky", top: 120 }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 3.5vw, 52px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "white",
              marginBottom: 24,
            }}
          >
            11+ years
            <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>
              of craft
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.8,
              maxWidth: 280,
            }}
          >
            From web developer to Head of Design and Head of Technology — a decade of growing across the full product stack.
          </motion.p>
        </div>

        {/* Timeline */}
        <div>
          {experience.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .exp-layout {
            grid-template-columns: 1fr !important;
            gap: 48px 0 !important;
          }
          .exp-layout > div:first-child {
            position: static !important;
          }
        }
        @media (max-width: 768px) {
          #experience { padding: 80px 24px !important; }
          .exp-card {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .exp-card > div:first-child {
            margin-bottom: 12px;
          }
        }
      `}</style>
    </section>
  );
}
