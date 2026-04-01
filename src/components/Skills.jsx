import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "../data/resume";
import SectionLabel from "./SectionLabel";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const categories = Object.entries(skills);

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: "140px 40px",
        maxWidth: 1400,
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <SectionLabel number="02" label="Skills & Expertise" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 1,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {categories.map(([category, items], catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: catIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: "36px 32px",
              background: "black",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                fontWeight: 600,
                marginBottom: 24,
                fontFamily: "var(--font-display)",
              }}
            >
              {category}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {items.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: catIndex * 0.1 + skillIndex * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.65)",
                    fontWeight: 400,
                    cursor: "default",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
