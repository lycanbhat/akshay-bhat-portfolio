import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personal } from "../data/resume";
import SectionLabel from "./SectionLabel";

const stats = [
  { value: personal.yearsExp, label: "Years of Experience" },
  { value: personal.projectsCount, label: "Products Shipped" },
  { value: personal.companiesCount, label: "Companies" },
  { value: "6+", label: "Live Apps Built" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "140px 40px",
        maxWidth: 1400,
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <SectionLabel number="01" label="About" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left: Stats */}
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "40px 32px",
                  background: "black",
                  borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(40px, 5vw, 64px)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "white",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: 32 }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {["Figma", "React", "Node.js", "Design Systems", "iOS", "Android", "Web", "Automotive HMI", "SaaS"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    fontWeight: 400,
                    borderRadius: 2,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Bio */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "white",
              marginBottom: 32,
            }}
          >
            I design it.
            <br />
            <span style={{ color: "rgba(255,255,255,0.45)" }}>Then I build it.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.55)",
              marginBottom: 32,
            }}
          >
            {personal.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px 32px",
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              { label: "Specialization", value: "Design & Engineering" },
              { label: "Focus", value: "Mobile, Web & SaaS" },
              { label: "Based in", value: personal.location },
              { label: "Availability", value: "Open to Roles" },
            ].map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 400,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 768px) {
          #about { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
