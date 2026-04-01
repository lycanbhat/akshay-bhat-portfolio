import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { caseStudies } from "../data/resume";
import SectionLabel from "./SectionLabel";
import CaseStudyModal from "./CaseStudyModal";

function ProjectCard({ project, index, inView, onOpenStudy }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "40px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
        background: hovered ? "rgba(255,255,255,0.03)" : "transparent",
        borderRadius: 2,
        cursor: project.hasDetailedStudy ? "pointer" : "default",
        transition: "all 0.3s var(--ease-out)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => project.hasDetailedStudy && onOpenStudy(project.detailedStudy)}
    >
      {/* Corner accent lines */}
      <div style={{ position: "absolute", top: 0, right: 0, width: hovered ? 80 : 0, height: 1, background: "rgba(255,255,255,0.4)", transition: "width 0.4s var(--ease-out)" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 1, height: hovered ? 80 : 0, background: "rgba(255,255,255,0.4)", transition: "height 0.4s var(--ease-out)" }} />

      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: "rgba(255,255,255,0.06)", letterSpacing: "-0.03em", lineHeight: 1 }}>
          {project.id}
        </span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <div style={{ padding: "4px 12px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
            {project.highlight}
          </div>
          {project.hasDetailedStudy && (
            <div style={{ padding: "4px 12px", background: "rgba(255,255,255,0.07)", borderRadius: 2, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.6)", display: "inline-block" }} />
              Case Study
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 1.8vw, 26px)", fontWeight: 600, color: "white", letterSpacing: "-0.02em", marginBottom: 6 }}>
        {project.name}
      </div>

      {/* Company + type */}
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20, display: "flex", gap: 8, alignItems: "center" }}>
        <span>{project.company}</span>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
        <span style={{ fontStyle: "italic" }}>{project.type}</span>
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 28, flex: 1 }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: project.hasDetailedStudy ? 24 : 0 }}>
        {project.platforms.map((p) => (
          <span key={p} style={{ padding: "4px 10px", background: "rgba(255,255,255,0.08)", borderRadius: 2, fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
            {p}
          </span>
        ))}
        {project.tags.map((t) => (
          <span key={t} style={{ padding: "4px 10px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 400 }}>
            {t}
          </span>
        ))}
      </div>

      {/* CTA for detailed studies */}
      {project.hasDetailedStudy && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)", transition: "color 0.2s ease", fontWeight: 500, letterSpacing: "0.04em" }}>
          <span>View Case Study</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.2s ease", transform: hovered ? "translateX(3px)" : "translateX(0)" }}>
            <path d="M1 6H11M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}

export default function CaseStudies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeStudy, setActiveStudy] = useState(null);

  return (
    <>
      <section
        id="work"
        ref={ref}
        style={{ padding: "140px 40px", maxWidth: 1400, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
          <div>
            <SectionLabel number="04" label="Selected Work" />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, color: "white", marginTop: -32 }}
            >
              Products I've shaped
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 360 }}
          >
            A selection of products I've owned end-to-end — from initial concept through shipped product. Cards with a{" "}
            <span style={{ color: "rgba(255,255,255,0.6)" }}>Case Study</span> badge include detailed design documentation.
          </motion.p>
        </div>

        <div className="case-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 16 }}>
          {caseStudies.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              inView={inView}
              onOpenStudy={(study) => setActiveStudy(study)}
            />
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            #work { padding: 80px 24px !important; }
            .case-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      <AnimatePresence>
        {activeStudy && (
          <CaseStudyModal key="modal" study={activeStudy} onClose={() => setActiveStudy(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
